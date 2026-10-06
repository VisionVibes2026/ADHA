import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  Languages, 
  Quote, 
  Code2, 
  CheckCircle2, 
  GitFork, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FastForward,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
  FileCheck,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { DOCUMENT_DETAIL_DATA, HANDWRITTEN_DOC_DATA } from '../data/mockRecords';
import CitationModal from '../components/common/CitationModal';

export default function DocumentReaderView() {
  const { id } = useParams();
  const isHandwrittenDoc = id === 'ADHA-MSS-1915-BUD';
  const doc = isHandwrittenDoc ? HANDWRITTEN_DOC_DATA : DOCUMENT_DETAIL_DATA;

  // Active page state defaults to page 99 if handwritten doc, else 168
  const [activePage, setActivePage] = useState(isHandwrittenDoc ? 99 : 168);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isUvIrMode, setIsUvIrMode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState('diplomatic'); // diplomatic | normalized | diff
  const [translationLanguage, setTranslationLanguage] = useState(null); // null | 'Marathi' | 'Hindi'
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [showTeiXml, setShowTeiXml] = useState(false);
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [htrSearchTerm, setHtrSearchTerm] = useState('');
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // Audio narration state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    if (id === 'ADHA-MSS-1915-BUD') {
      setActivePage(99);
    }
  }, [id]);

  // Get data for the active page
  const currentPageData = doc.pagesData[activePage] || doc.pagesData[99] || doc.pagesData[168] || doc.pagesData[1];
  const tx = currentPageData.transcription;

  // Cleanup speech synthesis on unmount or page change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When active page changes, stop any previous narration
  useEffect(() => {
    if (isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setAudioProgress(0);
    }
  }, [activePage]);

  // Handle Real Speech Synthesis
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browser speech synthesis is not supported in this environment.');
      return;
    }

    if (isPlayingAudio) {
      if (isAudioPaused) {
        window.speechSynthesis.resume();
        setIsAudioPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsAudioPaused(true);
      }
    } else {
      window.speechSynthesis.cancel(); // Reset previous speech

      // Formulate text to read based on translation or original text
      let textToRead = `${currentPageData.title}. `;
      if (currentPageData.normalizedText) {
        textToRead += currentPageData.normalizedText;
      } else if (translationLanguage === 'Marathi') {
        textToRead += "माझे विचार स्पष्ट आहेत. धर्म किंवा शास्त्रांच्या नावाखाली चालणारा हा विषमतावादी प्रकार मोडून काढल्याशिवाय सामाजिक समता प्रस्थापित होऊ शकत नाही.";
      } else if (translationLanguage === 'Hindi') {
        textToRead += "मेरा विचार स्पष्ट है। धर्म या शास्त्रों के नाम पर चलने वाले इस वैषम्यवादी ताने-बाने को तोड़े बिना सामाजिक समता स्थापित नहीं हो सकती।";
      } else {
        textToRead += `${tx.clause1?.body || ''}. ${tx.clause2?.body || ''}. ${tx.doctrinalFramework?.quote || ''}`;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = playbackSpeed;

      // Select natural English/Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onboundary = (event) => {
        if (textToRead.length > 0) {
          const progress = Math.min(Math.round((event.charIndex / textToRead.length) * 100), 100);
          setAudioProgress(progress);
        }
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
        setAudioProgress(100);
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      setIsAudioPaused(false);
      setAudioProgress(5);
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
    setAudioProgress(0);
  };

  const handleCycleSpeed = () => {
    const nextSpeed = playbackSpeed === 1.0 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1.0;
    setPlaybackSpeed(nextSpeed);
    if (isPlayingAudio && 'speechSynthesis' in window) {
      handleStopAudio();
      setTimeout(() => {
        handleToggleAudio();
      }, 150);
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 60));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleNextPage = () => {
    const currentIndex = doc.pagesList.findIndex(p => p.pageNum === activePage);
    if (currentIndex < doc.pagesList.length - 1) {
      setActivePage(doc.pagesList[currentIndex + 1].pageNum);
    }
  };

  const handlePrevPage = () => {
    const currentIndex = doc.pagesList.findIndex(p => p.pageNum === activePage);
    if (currentIndex > 0) {
      setActivePage(doc.pagesList[currentIndex - 1].pageNum);
    }
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(
      `Ambedkar, B. R. (1936/2014). Annihilation of Caste: The Annotated Critical Edition (Ed. S. Anand, Intro. Arundhati Roy). New Delhi: Navayana / London: Verso. ADHA Accession DOI: 10.5072/adha.1936.aoc.p${activePage}.`
    );
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Top Status & Navigation Header */}
      <div className="saas-card p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono text-[11px] overflow-x-auto">
          <Link to="/archive" className="hover:text-adha-navy dark:hover:text-blue-400 font-bold transition-colors">ADHA Core Catalogue</Link>
          <span className="text-slate-300 dark:text-slate-600">&gt;</span>
          <span>Writings & Speeches</span>
          <span className="text-slate-300 dark:text-slate-600">&gt;</span>
          <span>Ambedkar Primary Folios (1936)</span>
          <span className="text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="font-bold text-slate-900 dark:text-white">{doc.shortTitle}</span>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-bold">
            Accession #{doc.accessionNumber}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Quick Exhibit Demo Toggle Button */}
          <button 
            onClick={() => setActivePage(99)}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              activePage === 99
                ? 'bg-amber-600 text-white shadow-md font-bold ring-2 ring-amber-400'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-400/50 hover:bg-amber-200 dark:hover:bg-amber-900/80'
            }`}
            title="Exhibition Demo: Show Real Handwritten Page & HTR Result"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
            <span>★ Real Handwritten Doc (HTR Demo)</span>
          </button>

          <span className="badge-success text-[11px] font-mono flex items-center gap-1.5 py-1 px-2.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            CURATORIAL SIGN-OFF: {doc.curatorSignoff}
          </span>
          <button 
            onClick={() => setShowCitationModal(true)}
            className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-200" />
            <span>Cite Folio & Metadata</span>
          </button>
        </div>
      </div>

      {/* Main Three-Panel Archival Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

        {/* LEFT PANEL: Original Archival Scan Viewer (5 cols) */}
        <div className="lg:col-span-5 saas-card overflow-hidden flex flex-col justify-between min-h-[740px]">
          {/* Scan Controls Toolbar */}
          <div className="p-3 bg-slate-50 dark:bg-[#111A2E] border-b border-slate-200 dark:border-[#23324E] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleZoomOut} 
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors" 
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-800 dark:text-slate-200 min-w-[42px] text-center">{zoomLevel}%</span>
              <button 
                onClick={handleZoomIn} 
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors" 
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={handleRotate} 
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors ml-1" 
                title="Rotate"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => {
                  setIsHighContrast(!isHighContrast);
                  setIsUvIrMode(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  isHighContrast 
                    ? 'bg-[#123B63] dark:bg-blue-600 text-white font-bold shadow-xs' 
                    : 'bg-white dark:bg-[#1A263D] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Toggle High-Contrast Binarization Filter (Pre-HTR Optical Mode)"
              >
                High Contrast
              </button>
              <button 
                onClick={() => {
                  setIsUvIrMode(!isUvIrMode);
                  setIsHighContrast(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  isUvIrMode 
                    ? 'bg-purple-800 text-white font-bold shadow-xs' 
                    : 'bg-white dark:bg-[#1A263D] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Toggle UV / IR Spectral Inversion"
              >
                UV/IR Scan
              </button>
            </div>
          </div>

          {/* Document Scan Canvas Container */}
          <div className="p-4 archival-scan-bg flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[520px]">
            {/* Real Page Canvas Rendering */}
            <div 
              style={{ 
                transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className={`w-full max-w-[410px] shadow-2xl p-4 sm:p-5 relative transition-all rounded-sm border-2 ${
                currentPageData.sectionType === 'handwritten'
                  ? 'bg-[#1a140e] border-amber-900/60 text-amber-100 font-serif'
                  : currentPageData.sectionType === 'cover'
                  ? 'bg-[#009ee3] border-sky-800 text-white font-sans'
                  : currentPageData.sectionType === 'facsimile'
                  ? 'bg-[#EAE4D7] border-[#B8AE9C] text-amber-950 font-serif'
                  : 'bg-[#FAF6EE] border-[#D3CBBF] text-amber-950 font-serif'
              } ${isHighContrast ? 'high-contrast-mode' : ''} ${isUvIrMode ? 'uv-ir-mode' : ''}`}
            >
              {/* Scan Header Imprint */}
              <div className="text-center border-b border-current/20 pb-2 mb-2.5">
                <p className="text-[9px] font-bold tracking-wider uppercase opacity-80">{currentPageData.header}</p>
                <h4 className="text-[13px] font-bold mt-0.5 uppercase tracking-tight">
                  {currentPageData.title}
                </h4>
                {currentPageData.subtitle && (
                  <p className="font-bold text-[10.5px] italic opacity-90 mt-0.5">{currentPageData.subtitle}</p>
                )}
                {currentPageData.extraHeader && (
                  <p className="text-[9.5px] font-mono mt-0.5 opacity-75">{currentPageData.extraHeader}</p>
                )}
              </div>

              {/* Scan Body Content */}
              <div className="space-y-3 text-[11px] leading-relaxed text-justify">
                {currentPageData.sectionType === 'handwritten' ? (
                  <div className="space-y-3 font-serif">
                    {/* Archival Callout Quote Required by User */}
                    <div className="bg-amber-950/90 border-l-4 border-amber-500 p-3 rounded-r-lg text-amber-100 text-left shadow-md">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[9.5px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Original Archival Manuscript Page
                      </div>
                      <p className="text-[12.5px] italic font-serif leading-snug text-amber-100 font-medium">
                        “This is an original handwritten archival page. Old handwritten documents are difficult to search directly.”
                      </p>
                    </div>

                    {/* High-Resolution Scan of Dr. Ambedkar's Real Autograph Page */}
                    <div className="relative group rounded-md overflow-hidden border border-amber-700/50 bg-black shadow-2xl">
                      <img 
                        src={currentPageData.imageUrl || '/ambedkar-handwritten-dharmapala.jpg'} 
                        alt="Dr. B.R. Ambedkar Original Handwritten Manuscript - The Buddhist Review" 
                        className={`w-full h-auto object-contain transition-all duration-300 ${
                          isHighContrast ? 'contrast-[1.9] brightness-[1.1] grayscale filter' : ''
                        } ${isUvIrMode ? 'invert hue-rotate-180 contrast-200' : ''}`}
                      />
                      <div className="absolute top-2 right-2 bg-black/85 backdrop-blur-xs text-amber-300 text-[8px] font-mono px-2 py-0.5 rounded border border-amber-500/30">
                        1200 DPI Master Scan
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-xs text-slate-200 text-[8px] font-mono px-2 py-0.5 rounded border border-white/20">
                        Ambedkar Autograph • Maharashtra State Archives
                      </div>
                    </div>

                    <div className="p-2 border border-amber-800/40 bg-amber-950/60 rounded text-[9.5px] font-mono flex items-center justify-between text-amber-200">
                      <span className="font-bold text-amber-400">Archival Medium:</span>
                      <span className="italic">Iron-gall ink on laid rag paper (Recto)</span>
                    </div>
                  </div>
                ) : currentPageData.sectionType === 'cover' ? (
                  <div className="py-6 space-y-4 text-center">
                    <div className="w-28 h-36 mx-auto bg-black border border-white/20 flex flex-col justify-end p-2 relative rounded-md shadow-inner">
                      <div className="absolute top-2 left-2 right-2 text-[8px] text-sky-400 font-bold uppercase text-left">
                        NAVAYANA / VERSO
                      </div>
                      <div className="w-16 h-20 bg-sky-500 rounded-t-full mx-auto flex items-end justify-center pb-1">
                        <div className="w-8 h-10 bg-black rounded-t-full"></div>
                      </div>
                    </div>
                    <div className="border-t border-b border-white/30 py-2">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-yellow-300">Annotated Critical Edition</p>
                      <p className="text-[12px] font-bold mt-1">Edited & Annotated by S. Anand</p>
                      <p className="text-[10px] opacity-80">Introduction by Arundhati Roy</p>
                    </div>
                  </div>
                ) : currentPageData.sectionType === 'facsimile' ? (
                  <div className="space-y-4 py-3 font-serif">
                    <div className="border-2 border-dashed border-amber-900/40 p-4 text-center space-y-2 bg-amber-50/50 rounded-md">
                      <p className="text-[14px] font-bold tracking-wider uppercase text-amber-950">ANNIHILATION OF CASTE</p>
                      <p className="text-[10px] font-mono">SPEECH PREPARED BY</p>
                      <p className="text-[12px] font-bold text-amber-900">Dr. B. R. Ambedkar</p>
                      <p className="text-[9px] font-mono">M.A., Ph.D., D.Sc., Barrister-at-Law</p>
                      <div className="border-t border-amber-900/30 pt-2 text-[9.5px]">
                        <p className="font-bold">FOR The Annual Conference of the</p>
                        <p className="font-bold text-amber-900 uppercase">JAT-PAT-TODAK MANDAL OF LAHORE</p>
                        <p className="italic text-amber-800 font-bold mt-1">BUT NOT DELIVERED</p>
                      </div>
                    </div>
                    <p className="text-[9.5px] italic text-center text-amber-900">
                      Owing to the cancellation of the Conference on the ground that the views expressed in the speech would be unbearable to the Conference.
                    </p>
                    <div className="flex justify-between text-[10px] font-mono border-t border-amber-900/20 pt-1 text-amber-900 font-bold">
                      <span>15th May 1936</span>
                      <span>Price As. 8/-</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 font-serif text-[11px] text-slate-900">
                    <pre className="whitespace-pre-wrap font-serif text-[10.5px] leading-relaxed text-slate-900 border-l-2 border-amber-900/30 pl-2.5 py-1">
                      {currentPageData.scanBody}
                    </pre>

                    <div className="p-2.5 border border-amber-800/20 bg-amber-100/50 rounded-md text-[9px] font-mono flex items-center justify-between">
                      <span className="font-bold text-amber-900">Official Archival Seal:</span>
                      <span className="italic">NAI Master Collection • Acc #ADHA-DOC-001</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Stamp Badge */}
              <div className="mt-5 pt-2 border-t border-current/20 flex justify-between text-[8px] font-mono opacity-80">
                <span>ADHA Preservation Copy • Leaf {currentPageData.pageNum}</span>
                <span>rec/1915-BUD-P{currentPageData.pageNum}</span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[9.5px] font-mono px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
              ADHA Preservation Copy • Leaf {currentPageData.pageNum} / 389
            </div>
          </div>

          {/* Foliation Sequence (Bottom Thumbnail Strip) */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#111A2E] border-t border-slate-200 dark:border-[#23324E]">
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-2.5">
              <span className="font-bold uppercase flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-adha-navy dark:text-blue-400" /> Real Page Sequence
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  className="px-2.5 py-1 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3" /> Prev
                </button>
                <span>Page <strong className="text-slate-900 dark:text-white">{activePage}</strong> of 389</span>
                <button 
                  onClick={handleNextPage}
                  className="px-2.5 py-1 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Page selection strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {doc.pagesList.map((p) => (
                <button
                  key={p.pageNum}
                  onClick={() => setActivePage(p.pageNum)}
                  className={`w-14 h-16 rounded-lg border text-[9.5px] font-mono flex flex-col items-center justify-between p-1.5 shrink-0 transition-all cursor-pointer ${
                    activePage === p.pageNum
                      ? 'border-[#123B63] dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-[#123B63] dark:ring-blue-500 shadow-xs font-bold'
                      : 'border-slate-200 dark:border-[#23324E] bg-white dark:bg-[#151F32] hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                  title={p.title}
                >
                  <div className="w-full h-8 bg-amber-100/60 dark:bg-amber-950/40 rounded border border-amber-900/20 dark:border-amber-700/30 flex items-center justify-center text-[7px] italic text-amber-950 dark:text-amber-200 font-bold px-0.5 text-center leading-tight">
                    {p.label}
                  </div>
                  <span className={`text-[8.5px] truncate w-full text-center ${activePage === p.pageNum ? 'text-adha-navy dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                    p. {p.pageNum}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER PANEL: Scholarly Transcription (4 cols) */}
        <div className="lg:col-span-4 saas-card p-5 flex flex-col justify-between min-h-[740px] space-y-4">
          <div>
            {/* Header Metadata & Layer info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-[#23324E] pb-3">
              <div>
                <h2 className="text-base font-serif font-bold text-slate-900 dark:text-white">Scholarly Transcription</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {tx.engine} • Confidence: <strong className="text-emerald-600 dark:text-emerald-400">{tx.confidence}</strong>
                </p>
              </div>
              <span className="badge-neutral font-mono text-[10px] self-start">
                {tx.layer}
              </span>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-1.5 my-3.5 bg-slate-100 dark:bg-[#111A2E] p-1 rounded-xl border border-slate-200 dark:border-[#23324E]">
              <button
                onClick={() => setActiveTab('diplomatic')}
                className={`flex-1 py-1.5 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'diplomatic' 
                    ? 'bg-white dark:bg-[#151F32] text-adha-navy dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Diplomatic Folio
              </button>
              <button
                onClick={() => setActiveTab('normalized')}
                className={`flex-1 py-1.5 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'normalized' 
                    ? 'bg-white dark:bg-[#151F32] text-adha-navy dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Normalized
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                className={`flex-1 py-1.5 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'diff' 
                    ? 'bg-white dark:bg-[#151F32] text-adha-navy dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Side-by-Side Diff
              </button>
            </div>

            {/* If this page has diplomatic handwriting lines, show live HTR search filter */}
            {currentPageData.diplomaticLines && (
              <div className="mb-3 relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text"
                  value={htrSearchTerm}
                  onChange={(e) => setHtrSearchTerm(e.target.value)}
                  placeholder="Live search handwritten notes (e.g. 'cosmic', 'soul', 'sensations', 'heretics', 'God')..."
                  className="w-full pl-8 pr-16 py-1.5 bg-slate-50 dark:bg-[#111A2E] border border-slate-200 dark:border-[#23324E] rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 font-sans"
                />
                {htrSearchTerm && (
                  <button 
                    onClick={() => setHtrSearchTerm('')}
                    className="absolute right-2 top-1.5 text-[10px] font-mono bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Transcription Content Area */}
            <div className="space-y-4 text-xs font-sans text-slate-800 dark:text-slate-200 pt-1">
              {/* Headings */}
              <div className="text-center font-serif space-y-1 bg-slate-50 dark:bg-[#111A2E] p-3 rounded-xl border border-slate-200 dark:border-[#23324E]">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                  {tx.header}
                </p>
                <h3 className="text-sm font-bold text-adha-navy dark:text-blue-300 tracking-tight uppercase">
                  {tx.chapter} – {tx.sectionTitle}
                </h3>
              </div>

              {/* HANDWRITTEN MANUSCRIPT SPECIAL TRANSCRIPTION DISPLAY */}
              {currentPageData.diplomaticLines ? (
                <div className="space-y-3">
                  {/* Tab 1: Diplomatic Lines View */}
                  {activeTab === 'diplomatic' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-800">
                        <span>Original Cursive Line Breakdown ({currentPageData.diplomaticLines.length} lines)</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">HTR Confidence: {tx.confidence}</span>
                      </div>

                      <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                        {currentPageData.diplomaticLines
                          .filter(line => !htrSearchTerm || line.text.toLowerCase().includes(htrSearchTerm.toLowerCase()) || line.note?.toLowerCase().includes(htrSearchTerm.toLowerCase()))
                          .map((line) => {
                            const isMatched = htrSearchTerm && (line.text.toLowerCase().includes(htrSearchTerm.toLowerCase()) || line.note?.toLowerCase().includes(htrSearchTerm.toLowerCase()));
                            return (
                              <div 
                                key={line.num} 
                                className={`p-2 rounded-lg border transition-all text-xs font-serif ${
                                  isMatched 
                                    ? 'bg-amber-100/70 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 ring-1 ring-amber-400' 
                                    : 'bg-slate-50 dark:bg-[#111A2E] border-slate-200 dark:border-[#23324E] hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2 mb-1 font-mono text-[9.5px]">
                                  <span className="font-bold text-adha-navy dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-1.5 py-0.2 rounded">
                                    L{String(line.num).padStart(2, '0')}
                                  </span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                    {line.confidence}
                                  </span>
                                </div>
                                <div className="text-[12px] leading-relaxed text-slate-900 dark:text-slate-100 font-serif">
                                  {line.text.split(/(~[^~]+~|\^[^^]+\^)/g).map((part, pIdx) => {
                                    if (part.startsWith('~') && part.endsWith('~')) {
                                      return (
                                        <del key={pIdx} className="bg-red-500/15 text-red-600 dark:text-red-400 line-through px-1 rounded mr-1 font-mono text-[11px]" title="Struck out by Ambedkar">
                                          {part.slice(1, -1)}
                                        </del>
                                      );
                                    }
                                    if (part.startsWith('^') && part.endsWith('^')) {
                                      return (
                                        <ins key={pIdx} className="bg-blue-500/15 text-blue-600 dark:text-blue-300 no-underline font-bold px-1 rounded mr-1 text-[11px]" title="Superscript insertion above line">
                                          ^{part.slice(1, -1)}^
                                        </ins>
                                      );
                                    }
                                    if (htrSearchTerm && part.toLowerCase().includes(htrSearchTerm.toLowerCase())) {
                                      const sub = part.split(new RegExp(`(${htrSearchTerm})`, 'gi'));
                                      return sub.map((s, sIdx) => 
                                        s.toLowerCase() === htrSearchTerm.toLowerCase() ? (
                                          <mark key={sIdx} className="bg-amber-300 dark:bg-amber-400 text-slate-950 font-bold px-0.5 rounded">
                                            {s}
                                          </mark>
                                        ) : s
                                      );
                                    }
                                    return part;
                                  })}
                                </div>
                                {line.note && (
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans italic mt-1 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                                    Curatorial Note: {line.note}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Normalized Archival Text */}
                  {activeTab === 'normalized' && (
                    <div className="space-y-3 font-serif">
                      <div className="flex justify-between items-center bg-slate-50 dark:bg-[#111A2E] p-2.5 rounded-xl border border-slate-200 dark:border-[#23324E]">
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">Searchable Normalized Scholarly Transcription</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(currentPageData.normalizedText);
                            setCopiedTranscript(true);
                            setTimeout(() => setCopiedTranscript(false), 2000);
                          }}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[10.5px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedTranscript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedTranscript ? 'Copied!' : 'Copy Clean Text'}</span>
                        </button>
                      </div>
                      <div className="p-4 bg-amber-50/40 dark:bg-[#152033] border border-amber-900/20 dark:border-[#23324E] rounded-xl whitespace-pre-wrap font-serif text-[12px] leading-relaxed text-slate-800 dark:text-slate-100 max-h-[360px] overflow-y-auto scrollbar-thin">
                        {currentPageData.normalizedText}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Side-by-Side Diff Table */}
                  {activeTab === 'diff' && (
                    <div className="space-y-2 font-sans">
                      <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
                        Line-by-Line Autograph vs Normalized Reading
                      </p>
                      <div className="max-h-[360px] overflow-y-auto border border-slate-200 dark:border-[#23324E] rounded-xl scrollbar-thin">
                        <table className="w-full text-left text-[11px] border-collapse">
                          <thead className="bg-slate-100 dark:bg-[#111A2E] text-slate-600 dark:text-slate-300 font-mono text-[10px] sticky top-0">
                            <tr>
                              <th className="p-2 border-b border-slate-200 dark:border-slate-800">Line</th>
                              <th className="p-2 border-b border-slate-200 dark:border-slate-800">Raw Autograph Line</th>
                              <th className="p-2 border-b border-slate-200 dark:border-slate-800">Confidence</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {currentPageData.diplomaticLines.map((l) => (
                              <tr key={l.num} className="hover:bg-slate-50 dark:hover:bg-[#152033]">
                                <td className="p-2 font-mono font-bold text-adha-navy dark:text-blue-400">L{l.num}</td>
                                <td className="p-2 font-serif text-slate-900 dark:text-slate-100">{l.text}</td>
                                <td className="p-2 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{l.confidence}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard printed edition view */
                <>
                  {/* Curatorial Note Box */}
                  <div className="bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-[#123B63] dark:border-blue-400 p-3.5 rounded-xl text-slate-700 dark:text-slate-300 text-xs flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#123B63] dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-adha-navy dark:text-blue-300 block text-[11px]">Curatorial Context Note:</span>
                      <p className="text-[11.5px] leading-relaxed mt-0.5">{doc.curatorialNote}</p>
                    </div>
                  </div>

                  {/* Clause 1 */}
                  <div className="space-y-1.5 leading-relaxed font-serif bg-slate-50/50 dark:bg-[#111A2E]/50 p-3 border border-slate-200 dark:border-[#23324E] rounded-xl">
                    <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">{tx.clause1?.title}</p>
                    <p className="text-[12.5px] text-slate-900 dark:text-slate-100 leading-normal">
                      {translationLanguage === 'Marathi' ? (
                        "माझे विचार स्पष्ट आहेत. धर्म किंवा शास्त्रांच्या नावाखाली चालणारा हा विषमतावादी प्रकार मोडून काढल्याशिवाय सामाजिक समता प्रस्थापित होऊ शकत नाही."
                      ) : translationLanguage === 'Hindi' ? (
                        "मेरा विचार स्पष्ट है। धर्म या शास्त्रों के नाम पर चलने वाले इस वैषम्यवादी ताने-बाने को तोड़े बिना सामाजिक समता स्थापित नहीं हो सकती।"
                      ) : (
                        tx.clause1?.body
                      )}
                    </p>
                  </div>
                </>
              )}

              {/* Doctrinal Framework / Core Quote Card */}
              {tx.doctrinalFramework && (
                <div className="bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3.5 space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Quote className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <h4 className="font-serif font-bold text-slate-900 dark:text-amber-100 text-xs">
                        {tx.doctrinalFramework.title}
                      </h4>
                    </div>
                    <span className="bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-300 font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-md">
                      {tx.doctrinalFramework.badge}
                    </span>
                  </div>
                  <p className="font-serif italic text-slate-900 dark:text-amber-100/90 text-[12px] leading-relaxed">
                    {tx.doctrinalFramework.quote}
                  </p>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-amber-300/80 text-right font-medium">
                    {tx.doctrinalFramework.citation}
                  </p>
                </div>
              )}

              {/* Clause 2 if available */}
              {tx.clause2 && (
                <div className="space-y-1.5 leading-relaxed font-serif bg-slate-50/50 dark:bg-[#111A2E]/50 p-3 border border-slate-200 dark:border-[#23324E] rounded-xl">
                  <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">{tx.clause2.title}</p>
                  <p className="text-[12.5px] text-slate-900 dark:text-slate-100 leading-normal">
                    {tx.clause2.body}
                  </p>
                </div>
              )}

              {/* Curatorial Apparatus & Footnotes */}
              {tx.footnotes && tx.footnotes.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-[#23324E] space-y-2">
                  <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    CURATORIAL APPARATUS & ANNOTATIONS
                  </p>
                  {tx.footnotes.map((fn) => (
                    <div key={fn.num} className="text-[11px] text-slate-700 dark:text-slate-300 font-sans flex items-start gap-1.5 bg-slate-50 dark:bg-[#111A2E] p-2.5 rounded-xl border border-slate-200 dark:border-[#23324E]">
                      <span className="font-bold text-adha-navy dark:text-blue-400">{fn.num}.</span>
                      <span><strong>{fn.title}</strong> {fn.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Panel Audio & Action Bar */}
          <div className="pt-3 border-t border-slate-200 dark:border-[#23324E] space-y-2.5">
            {/* REAL AUDIO CONTROLS PANEL */}
            {isPlayingAudio && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl p-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-amber-950 dark:text-amber-200">
                  <span className="font-bold flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-400 animate-pulse" />
                    {isAudioPaused ? 'Audio Paused' : `Narrating Page ${activePage}`}
                  </span>
                  <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold">
                    {audioProgress}% Played
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-amber-200/80 dark:bg-amber-900/60 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-700 dark:bg-amber-400 h-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handleToggleAudio} 
                      className="px-3 py-1 bg-amber-700 dark:bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-800 flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      {isAudioPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                      <span>{isAudioPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                    <button 
                      onClick={handleStopAudio} 
                      className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <Square className="w-3 h-3" />
                      <span>Stop</span>
                    </button>
                  </div>

                  <button 
                    onClick={handleCycleSpeed}
                    className="px-2.5 py-1 bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-mono text-[10.5px] font-bold rounded-lg hover:bg-amber-300 dark:hover:bg-amber-800 flex items-center gap-1 cursor-pointer"
                    title="Change Speech Speed"
                  >
                    <FastForward className="w-3 h-3" /> Speed: {playbackSpeed}x
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-2 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlayingAudio 
                      ? 'bg-amber-700 dark:bg-amber-600 text-white shadow-xs font-bold' 
                      : 'bg-white dark:bg-[#111A2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#23324E]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? (isAudioPaused ? 'Resume Audio' : 'Pause Audio') : 'Audio Read'}</span>
                </button>

                <button 
                  onClick={() => {
                    if (!translationLanguage) setTranslationLanguage('Marathi');
                    else if (translationLanguage === 'Marathi') setTranslationLanguage('Hindi');
                    else setTranslationLanguage(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                    translationLanguage 
                      ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold' 
                      : 'bg-white dark:bg-[#111A2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-[#23324E]'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{translationLanguage ? `Lang: ${translationLanguage}` : 'Translate'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyCitation}
                  className="px-3 py-1.5 bg-white dark:bg-[#111A2E] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#23324E] rounded-xl font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Quote className="w-3.5 h-3.5" /> {copiedCitation ? 'Copied!' : 'Citation'}
                </button>
                <button 
                  onClick={() => setShowTeiXml(!showTeiXml)}
                  className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" /> TEI-XML
                </button>
              </div>
            </div>
          </div>

          {showTeiXml && (
            <div className="bg-slate-900 text-emerald-400 font-mono text-[10px] p-3 rounded-xl max-h-48 overflow-y-auto border border-emerald-500/20">
              <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt><title>${doc.title}</title></titleStmt>
      <publicationStmt><publisher>ADHA Archives / Navayana</publisher></publicationStmt>
    </fileDesc>
  </teiHeader>
  <text>
    <body>
      <div type="chapter" n="${activePage}">
        <head>${tx.sectionTitle}</head>
        <p>${tx.clause1.body}</p>
      </div>
    </body>
  </text>
</TEI>`}</pre>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Archival Metadata & Heritage Graph (3 cols) */}
        <div className="lg:col-span-3 saas-card p-5 flex flex-col justify-between min-h-[740px] space-y-4">
          <div className="space-y-4">
            {/* Archival Record Header */}
            <div className="border-b border-slate-200 dark:border-[#23324E] pb-3">
              <div className="flex justify-between items-start mb-1.5">
                <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">ARCHIVAL CATALOGUE RECORD</p>
                <span className="badge-teal text-[9.5px] font-mono">
                  Public Domain
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-adha-navy dark:text-blue-300">{doc.title}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">Acc: {doc.accessionNumber}</p>
            </div>

            {/* CATALOG METADATA */}
            <div className="space-y-3 text-xs font-sans">
              <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">CATALOG METADATA</p>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">Formal Imprint Title</p>
                <p className="font-serif font-bold text-slate-900 dark:text-white leading-tight text-[12px]">{doc.metadata.formalTitle}</p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">Author & Jurist</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">{doc.metadata.author}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Date of Imprint</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{doc.metadata.dateOfImprint}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Extent / Format</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{doc.metadata.extentFormat}</p>
                </div>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">Publisher & Press</p>
                <p className="text-slate-700 dark:text-slate-300">{doc.metadata.publisherPress}</p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">Preservation Specification</p>
                <p className="text-[10.5px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#111A2E] p-2 rounded-lg border border-slate-200 dark:border-[#23324E]">
                  {doc.metadata.preservationSpec}
                </p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">Cryptographic Checksum</p>
                <p className="text-[9.5px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#111A2E] p-2 rounded-lg border border-slate-200 dark:border-[#23324E] break-all">
                  {doc.metadata.cryptographicChecksum}
                </p>
              </div>
            </div>

            {/* HERITAGE GRAPH */}
            <div className="pt-3 border-t border-slate-200 dark:border-[#23324E] space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" /> HERITAGE GRAPH
                </p>
                <Link to="/knowledge-graph" className="text-[10px] font-mono text-[#0F766E] dark:text-teal-400 hover:underline font-bold">
                  View Node →
                </Link>
              </div>

              {/* Interlinked Speeches */}
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">INTERLINKED HISTORICAL SPEECHES</p>
                <div className="space-y-1.5">
                  {doc.heritageGraph.interlinkedSpeeches.map((sp, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 dark:bg-[#111A2E] rounded-xl border border-slate-200 dark:border-[#23324E] text-xs">
                      <p className="font-serif font-bold text-slate-900 dark:text-white leading-tight">{sp.title}</p>
                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{sp.date} • {sp.context}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contemporary Figures */}
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">CONTEMPORANEOUS FIGURES & EDITORS</p>
                <div className="flex flex-wrap gap-1.5">
                  {doc.heritageGraph.contemporaryFigures.map((fig, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      {fig}
                    </span>
                  ))}
                </div>
              </div>

              {/* Custodial Repositories */}
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">CUSTODIAL REPOSITORIES</p>
                <div className="space-y-1.5 text-xs">
                  {doc.heritageGraph.custodialRepositories.map((repo, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 dark:bg-[#111A2E] rounded-xl border border-slate-200 dark:border-[#23324E]">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{repo.name}</p>
                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{repo.identifier}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* National Archives Permanent DOI Footer */}
          <div className="p-3 bg-slate-50 dark:bg-[#111A2E] rounded-xl border border-slate-200 dark:border-[#23324E] text-[10.5px] font-mono text-slate-600 dark:text-slate-400 space-y-1 text-center">
            <p className="font-bold text-slate-800 dark:text-slate-200">NATIONAL ARCHIVES OF INDIA</p>
            <p className="text-[9.5px] text-slate-500 dark:text-slate-400">Permanent Archival Record DOI:</p>
            <p className="font-bold text-[#123B63] dark:text-blue-400 text-[10px]">10.5072/adha.1936.aoc.p{activePage}</p>
          </div>
        </div>

      </div>

      {/* Scholarly Citation & Metadata Schemas Modal */}
      {showCitationModal && (
        <CitationModal 
          record={{
            id: doc.accessionNumber,
            title: `${doc.shortTitle} — Folio ${activePage}`,
            institution: doc.repositoryHeld,
            year: '1936',
            type: 'Annotated Monograph Folio',
            medium: 'Typescript & First Edition Print'
          }} 
          onClose={() => setShowCitationModal(false)} 
        />
      )}
    </div>
  );
}

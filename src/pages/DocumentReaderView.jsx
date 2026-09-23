import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Volume2, 
  VolumeX,
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
  FastForward
} from 'lucide-react';
import { DOCUMENT_DETAIL_DATA } from '../data/mockRecords';

export default function DocumentReaderView() {
  const { id } = useParams();
  const doc = DOCUMENT_DETAIL_DATA;

  // Active page state defaults to page 168 (Speech Section 1)
  const [activePage, setActivePage] = useState(168);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isUvIrMode, setIsUvIrMode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState('diplomatic'); // diplomatic | normalized | diff
  const [translationLanguage, setTranslationLanguage] = useState(null); // null | 'Marathi' | 'Hindi'
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [showTeiXml, setShowTeiXml] = useState(false);

  // REAL AUDIO STATE (Web Speech API Text-To-Speech)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [audioProgress, setAudioProgress] = useState(0);

  // Get data for the active page
  const currentPageData = doc.pagesData[activePage] || doc.pagesData[168] || doc.pagesData[1];
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
      if (translationLanguage === 'Marathi') {
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
    <div className="space-y-4 pb-12">
      {/* Top Status & Navigation Header */}
      <div className="bg-white border border-adha-border rounded-xs p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px] overflow-x-auto">
          <Link to="/archive" className="hover:text-adha-navy hover:underline font-bold">ADHA Core Catalogue</Link>
          <span>&gt;</span>
          <span>Writings & Speeches</span>
          <span>&gt;</span>
          <span>Ambedkar Primary Folios (1936)</span>
          <span>&gt;</span>
          <span className="font-bold text-slate-900">{doc.shortTitle}</span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-xs border border-slate-300 font-bold">
            Accession #{doc.accessionNumber}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-xs text-[11px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            CURATORIAL SIGN-OFF: {doc.curatorSignoff}
          </span>
          <button 
            onClick={handleCopyCitation}
            className="px-3 py-1 bg-slate-100 border border-slate-300 text-slate-700 rounded-xs text-xs font-semibold hover:bg-slate-200"
          >
            {copiedCitation ? '✓ Copied Citation!' : 'Cite Folio'}
          </button>
        </div>
      </div>

      {/* Main Three-Panel Archival Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">

        {/* LEFT PANEL: Original Archival Scan Viewer (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-adha-border rounded-xs flex flex-col justify-between min-h-[720px]">
          {/* Scan Controls Toolbar */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1">
              <button onClick={handleZoomOut} className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-800 min-w-[40px] text-center">{zoomLevel}%</span>
              <button onClick={handleZoomIn} className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={handleRotate} className="p-1 hover:bg-slate-200 rounded text-slate-700 ml-1" title="Rotate">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  setIsHighContrast(!isHighContrast);
                  setIsUvIrMode(false);
                }}
                className={`px-2 py-0.5 rounded text-[10.5px] font-semibold transition-colors ${
                  isHighContrast ? 'bg-adha-navy text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                High Contrast
              </button>
              <button 
                onClick={() => {
                  setIsUvIrMode(!isUvIrMode);
                  setIsHighContrast(false);
                }}
                className={`px-2 py-0.5 rounded text-[10.5px] font-semibold transition-colors ${
                  isUvIrMode ? 'bg-purple-800 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
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
                transition: 'transform 0.2s ease-out'
              }}
              className={`w-full max-w-[360px] shadow-xl p-5 relative transition-all border-2 ${
                currentPageData.sectionType === 'cover'
                  ? 'bg-[#009ee3] border-sky-800 text-white font-sans'
                  : currentPageData.sectionType === 'facsimile'
                  ? 'bg-[#EAE4D7] border-[#B8AE9C] text-amber-950 font-serif'
                  : 'bg-[#FAF6EE] border-[#D3CBBF] text-amber-950 font-serif'
              } ${isHighContrast ? 'high-contrast-mode' : ''} ${isUvIrMode ? 'uv-ir-mode' : ''}`}
            >
              {/* Scan Header Imprint */}
              <div className="text-center border-b border-current/20 pb-2.5 mb-3">
                <p className="text-[9px] font-bold tracking-wider uppercase opacity-80">{currentPageData.header}</p>
                <h4 className="text-[13px] font-bold mt-1 uppercase tracking-tight">
                  {currentPageData.title}
                </h4>
                {currentPageData.subtitle && (
                  <p className="font-bold text-[10.5px] italic opacity-90 mt-0.5">{currentPageData.subtitle}</p>
                )}
                {currentPageData.extraHeader && (
                  <p className="text-[9.5px] font-mono mt-1 opacity-75">{currentPageData.extraHeader}</p>
                )}
              </div>

              {/* Scan Body Content */}
              <div className="space-y-3 text-[11px] leading-relaxed text-justify">
                {currentPageData.sectionType === 'cover' ? (
                  <div className="py-6 space-y-4 text-center">
                    <div className="w-28 h-36 mx-auto bg-black border border-white/20 flex flex-col justify-end p-2 relative rounded-xs shadow-inner">
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
                    <div className="border-2 border-dashed border-amber-900/40 p-4 text-center space-y-2 bg-amber-50/50">
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

                    <div className="p-2 border border-amber-800/20 bg-amber-100/40 rounded-xs text-[9px] font-mono flex items-center justify-between">
                      <span className="font-bold text-amber-900">Official Archival Seal:</span>
                      <span className="italic">NAI Master Collection • Acc #ADHA-DOC-001</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Stamp Badge */}
              <div className="mt-5 pt-2 border-t border-current/20 flex justify-between text-[8px] font-mono opacity-80">
                <span>ADHA Preservation Copy • Leaf {currentPageData.pageNum} / 389</span>
                <span>rec/1936-AOC-P{currentPageData.pageNum}</span>
              </div>
            </div>

            <div className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[9.5px] font-mono px-2 py-0.5 rounded-xs">
              ADHA Preservation Copy • Leaf {currentPageData.pageNum} / 389
            </div>
          </div>

          {/* Foliation Sequence (Bottom Thumbnail Strip) */}
          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <div className="flex justify-between items-center text-[10.5px] font-mono text-slate-600 mb-2">
              <span className="font-bold uppercase flex items-center gap-1 text-slate-800">
                <BookOpen className="w-3.5 h-3.5 text-adha-navy" /> Real Page Sequence
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  className="px-2 py-0.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xs text-[10px] font-bold flex items-center gap-0.5"
                >
                  <ChevronLeft className="w-3 h-3" /> Prev
                </button>
                <span>Page <strong>{activePage}</strong> of 389</span>
                <button 
                  onClick={handleNextPage}
                  className="px-2 py-0.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xs text-[10px] font-bold flex items-center gap-0.5"
                >
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Page selection strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {doc.pagesList.map((p) => (
                <button
                  key={p.pageNum}
                  onClick={() => setActivePage(p.pageNum)}
                  className={`w-14 h-16 rounded-xs border text-[9.5px] font-mono flex flex-col items-center justify-between p-1 shrink-0 transition-all ${
                    activePage === p.pageNum
                      ? 'border-adha-navy bg-amber-50 ring-2 ring-adha-navy shadow-xs font-bold'
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                  title={p.title}
                >
                  <div className="w-full h-8 bg-amber-100/60 rounded-xs border border-amber-900/20 flex items-center justify-center text-[7px] italic text-amber-950 font-bold px-0.5 text-center leading-tight">
                    {p.label}
                  </div>
                  <span className={`text-[8.5px] truncate w-full text-center ${activePage === p.pageNum ? 'text-adha-navy font-bold' : 'text-slate-600'}`}>
                    p. {p.pageNum}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER PANEL: Scholarly Transcription (4.5 cols) */}
        <div className="lg:col-span-4 bg-white border border-adha-border rounded-xs p-4 flex flex-col justify-between min-h-[720px] space-y-4">
          <div>
            {/* Header Metadata & Layer info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-serif font-bold text-adha-navy">Scholarly Transcription</h2>
                <p className="text-[11px] text-slate-500 font-mono">
                  {tx.engine} • Confidence: <strong className="text-emerald-700">{tx.confidence}</strong>
                </p>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border border-slate-300 self-start">
                {tx.layer}
              </span>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-1 my-3 bg-slate-100 p-1 rounded-xs border border-slate-200">
              <button
                onClick={() => setActiveTab('diplomatic')}
                className={`flex-1 py-1 text-center rounded-xs text-xs font-semibold transition-colors ${
                  activeTab === 'diplomatic' ? 'bg-white text-adha-navy shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Diplomatic Folio
              </button>
              <button
                onClick={() => setActiveTab('normalized')}
                className={`flex-1 py-1 text-center rounded-xs text-xs font-semibold transition-colors ${
                  activeTab === 'normalized' ? 'bg-white text-adha-navy shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Normalized
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                className={`flex-1 py-1 text-center rounded-xs text-xs font-semibold transition-colors ${
                  activeTab === 'diff' ? 'bg-white text-adha-navy shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Side-by-Side Diff
              </button>
            </div>

            {/* Transcription Content Area */}
            <div className="space-y-4 text-xs font-sans text-slate-800 pt-1">
              {/* Headings */}
              <div className="text-center font-serif space-y-1 bg-slate-50 p-2.5 rounded-xs border border-slate-200">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                  {tx.header}
                </p>
                <h3 className="text-base font-bold text-adha-navy tracking-tight uppercase">
                  {tx.chapter} – {tx.sectionTitle}
                </h3>
              </div>

              {/* Curatorial Note Box */}
              <div className="bg-blue-50/70 border-l-4 border-adha-navy p-3 rounded-xs text-slate-700 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-adha-navy shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-adha-navy block text-[11px]">Curatorial Context Note:</span>
                  <p className="text-[11.5px] leading-relaxed">{doc.curatorialNote}</p>
                </div>
              </div>

              {/* Clause 1 */}
              <div className="space-y-1.5 leading-relaxed font-serif bg-white p-2.5 border border-slate-200 rounded-xs">
                <p className="text-[11px] font-mono font-bold text-slate-600">{tx.clause1.title}</p>
                <p className="text-[12.5px] text-slate-900 leading-normal">
                  {translationLanguage === 'Marathi' ? (
                    "माझे विचार स्पष्ट आहेत. धर्म किंवा शास्त्रांच्या नावाखाली चालणारा हा विषमतावादी प्रकार मोडून काढल्याशिवाय सामाजिक समता प्रस्थापित होऊ शकत नाही."
                  ) : translationLanguage === 'Hindi' ? (
                    "मेरा विचार स्पष्ट है। धर्म या शास्त्रों के नाम पर चलने वाले इस वैषम्यवादी ताने-बाने को तोड़े बिना सामाजिक समता स्थापित नहीं हो सकती।"
                  ) : (
                    tx.clause1.body
                  )}
                </p>
              </div>

              {/* Doctrinal Framework / Core Quote Card */}
              {tx.doctrinalFramework && (
                <div className="bg-amber-50/90 border border-amber-200 rounded-xs p-3.5 space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Quote className="w-4 h-4 text-amber-800" />
                      <h4 className="font-serif font-bold text-slate-900 text-xs">
                        {tx.doctrinalFramework.title}
                      </h4>
                    </div>
                    <span className="bg-amber-200 text-amber-950 font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-xs">
                      {tx.doctrinalFramework.badge}
                    </span>
                  </div>
                  <p className="font-serif italic text-slate-900 text-[12px] leading-relaxed">
                    {tx.doctrinalFramework.quote}
                  </p>
                  <p className="text-[10px] font-mono text-slate-600 text-right font-medium">
                    {tx.doctrinalFramework.citation}
                  </p>
                </div>
              )}

              {/* Clause 2 */}
              {tx.clause2 && (
                <div className="space-y-1.5 leading-relaxed font-serif bg-white p-2.5 border border-slate-200 rounded-xs">
                  <p className="text-[11px] font-mono font-bold text-slate-600">{tx.clause2.title}</p>
                  <p className="text-[12.5px] text-slate-900 leading-normal">
                    {tx.clause2.body}
                  </p>
                </div>
              )}

              {/* Curatorial Apparatus & Footnotes */}
              {tx.footnotes && tx.footnotes.length > 0 && (
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    CURATORIAL APPARATUS & ANNOTATIONS (S. ANAND)
                  </p>
                  {tx.footnotes.map((fn) => (
                    <div key={fn.num} className="text-[11px] text-slate-700 font-sans flex items-start gap-1.5 bg-slate-50 p-2 rounded-xs border border-slate-200">
                      <span className="font-bold text-adha-navy">{fn.num}.</span>
                      <span><strong>{fn.title}</strong> {fn.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Panel Audio & Action Bar */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            {/* REAL AUDIO CONTROLS PANEL */}
            {isPlayingAudio && (
              <div className="bg-amber-50 border border-amber-300 rounded-xs p-2.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-950">
                  <span className="font-bold flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                    {isAudioPaused ? 'Audio Paused' : `Narrating Page ${activePage}`}
                  </span>
                  <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded font-bold">
                    {audioProgress}% Played
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-amber-200/80 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-700 h-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handleToggleAudio} 
                      className="px-2.5 py-1 bg-amber-700 text-white rounded-xs font-bold hover:bg-amber-800 flex items-center gap-1 text-[11px]"
                    >
                      {isAudioPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                      <span>{isAudioPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                    <button 
                      onClick={handleStopAudio} 
                      className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded-xs font-bold hover:bg-slate-300 flex items-center gap-1 text-[11px]"
                    >
                      <Square className="w-3 h-3" />
                      <span>Stop</span>
                    </button>
                  </div>

                  <button 
                    onClick={handleCycleSpeed}
                    className="px-2 py-0.5 bg-amber-200/80 text-amber-900 font-mono text-[10.5px] font-bold rounded hover:bg-amber-300 flex items-center gap-1"
                    title="Change Speech Speed"
                  >
                    <FastForward className="w-3 h-3" /> Speed: {playbackSpeed}x
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-xs font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                    isPlayingAudio 
                      ? 'bg-amber-700 text-white shadow-xs font-bold' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
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
                  className={`px-3 py-1.5 rounded-xs font-semibold text-xs flex items-center gap-1.5 border border-slate-300 transition-colors ${
                    translationLanguage ? 'bg-adha-teal text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{translationLanguage ? `Lang: ${translationLanguage}` : 'Translate'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyCitation}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xs font-semibold text-xs flex items-center gap-1"
                >
                  <Quote className="w-3.5 h-3.5" /> Citation
                </button>
                <button 
                  onClick={() => setShowTeiXml(!showTeiXml)}
                  className="px-3 py-1.5 bg-adha-navy text-white rounded-xs font-semibold text-xs hover:bg-adha-navy-dark flex items-center gap-1"
                >
                  <Code2 className="w-3.5 h-3.5" /> TEI-XML
                </button>
              </div>
            </div>
          </div>

          {showTeiXml && (
            <div className="bg-slate-900 text-emerald-400 font-mono text-[10px] p-3 rounded-xs max-h-48 overflow-y-auto">
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
        <div className="lg:col-span-3 bg-white border border-adha-border rounded-xs p-4 flex flex-col justify-between min-h-[720px] space-y-3">
          <div className="space-y-4">
            {/* Archival Record Header */}
            <div className="border-b border-slate-100 pb-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">ARCHIVAL CATALOGUE RECORD</p>
                <span className="bg-emerald-100 text-emerald-800 text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-xs border border-emerald-300">
                  Public Domain
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-adha-navy">{doc.title}</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Acc: {doc.accessionNumber}</p>
            </div>

            {/* CATALOG METADATA */}
            <div className="space-y-2.5 text-xs font-sans">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">CATALOG METADATA</p>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500">Formal Imprint Title</p>
                <p className="font-serif font-bold text-slate-900 leading-tight text-[12px]">{doc.metadata.formalTitle}</p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500">Author & Jurist</p>
                <p className="font-medium text-slate-800">{doc.metadata.author}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <p className="text-slate-500">Date of Imprint</p>
                  <p className="font-bold text-slate-800">{doc.metadata.dateOfImprint}</p>
                </div>
                <div>
                  <p className="text-slate-500">Extent / Format</p>
                  <p className="font-bold text-slate-800">{doc.metadata.extentFormat}</p>
                </div>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500">Publisher & Press</p>
                <p className="text-slate-700">{doc.metadata.publisherPress}</p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500">Preservation Specification</p>
                <p className="text-[10.5px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded-xs border border-slate-200">
                  {doc.metadata.preservationSpec}
                </p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500">Cryptographic Checksum</p>
                <p className="text-[9.5px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded-xs border border-slate-200 break-all">
                  {doc.metadata.cryptographicChecksum}
                </p>
              </div>
            </div>

            {/* HERITAGE GRAPH */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-adha-teal inline" /> HERITAGE GRAPH
                </p>
                <Link to="/knowledge-graph" className="text-[10px] font-mono text-adha-teal hover:underline font-bold">
                  View Node →
                </Link>
              </div>

              {/* Interlinked Speeches */}
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 mb-1">INTERLINKED HISTORICAL SPEECHES</p>
                <div className="space-y-1.5">
                  {doc.heritageGraph.interlinkedSpeeches.map((sp, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 rounded-xs border border-slate-200 text-xs">
                      <p className="font-serif font-bold text-slate-900 leading-tight">{sp.title}</p>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">{sp.date} • {sp.context}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contemporary Figures */}
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 mb-1">CONTEMPORANEOUS FIGURES & EDITORS</p>
                <div className="flex flex-wrap gap-1">
                  {doc.heritageGraph.contemporaryFigures.map((fig, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 text-[10.5px] font-semibold px-2 py-0.5 rounded-xs border border-slate-200">
                      {fig}
                    </span>
                  ))}
                </div>
              </div>

              {/* Custodial Repositories */}
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 mb-1">CUSTODIAL REPOSITORIES</p>
                <div className="space-y-1.5 text-xs">
                  {doc.heritageGraph.custodialRepositories.map((repo, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 rounded-xs border border-slate-200">
                      <p className="font-bold text-slate-800">{repo.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{repo.identifier}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* National Archives Permanent DOI Footer */}
          <div className="p-3 bg-slate-50 rounded-xs border border-slate-200 text-[10.5px] font-mono text-slate-600 space-y-1 text-center">
            <p className="font-bold text-slate-800">NATIONAL ARCHIVES OF INDIA</p>
            <p className="text-[9.5px] text-slate-500">Permanent Archival Record DOI:</p>
            <p className="font-bold text-adha-navy text-[10px]">10.5072/adha.1936.aoc.p{activePage}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

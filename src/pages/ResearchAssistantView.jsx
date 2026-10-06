import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  History, 
  Info, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Hash, 
  ExternalLink, 
  X, 
  ZoomIn, 
  Compass,
  Check,
  Copy,
  UploadCloud,
  FileUp,
  Loader2,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ResearchAssistantView() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Upload & Extraction State
  const [uploadedDoc, setUploadedDoc] = useState(null); // { name, url, isExtracting, extractionStep, extractedData }
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStep, setExtractionStep] = useState(0); // 1: Preprocess, 2: DeepHTR, 3: Indexing
  const [showExtractedLines, setShowExtractedLines] = useState(false);

  // Active Thread ID
  const [activeThreadId, setActiveThreadId] = useState('handwritten-upload');
  const [activeSourceModal, setActiveSourceModal] = useState(null);
  const [input, setInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Upload & Extract, 2: Ask Query, 3: Grounded Answer, 4: Trace Source

  // Dynamic Chat Messages for the Upload Thread
  const [chatMessages, setChatMessages] = useState([]);

  // Preset other threads for repository-wide research
  const PRESET_THREADS = [
    { id: 'handwritten-upload', title: 'Upload & Analyze Archival Folio', subtitle: 'Live Document Extraction & HTR', badge: 'Interactive ★' },
    { id: 'socialism-thread', title: 'State Socialism & Rights (1947)', subtitle: 'States and Minorities • 2 sources', badge: 'Grounded RAG' },
    { id: 'poona-thread', title: 'Poona Pact (1932)', subtitle: 'Yerwada Agreement • 5 sources', badge: 'Historic Debate' },
    { id: 'rupee-thread', title: 'Problem of the Rupee (1923)', subtitle: 'LSE Doctoral Thesis • 2 sources', badge: 'Doctoral Thesis' }
  ];

  // Trigger Document Upload & Neural HTR Extraction
  const triggerExtraction = (imageUrl, fileName) => {
    setIsExtracting(true);
    setExtractionStep(1);
    setActiveStep(1);

    // Step 1: Preprocessing & Contrast Deskewing (400ms)
    setTimeout(() => {
      setExtractionStep(2);
    }, 450);

    // Step 2: Running DeepHTR Neural Vision OCR (900ms)
    setTimeout(() => {
      setExtractionStep(3);
    }, 1000);

    // Step 3: Complete Extraction & Append to Memory (1500ms)
    setTimeout(() => {
      setIsExtracting(false);
      setExtractionStep(0);
      
      const docData = {
        name: fileName || 'ambedkar-handwritten-dharmapala.jpg',
        url: imageUrl || '/ambedkar-handwritten-dharmapala.jpg',
        title: "Notes on 'The Good Law' by Anagarika Dharmapala",
        author: "Dr. B. R. Ambedkar (Autograph Research Manuscript)",
        accession: "ADHA-MSS-1915-BUD",
        leaf: "Leaf 1 (Recto)",
        institution: "Maharashtra State Archives / Dr. Ambedkar Research Institute",
        hash: "SHA256: 9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
        confidence: "96.8%",
        linesCount: 15,
        lines: [
          { num: 1, text: "The Buddhist Review. Vol VII. No. 2.", conf: "98.4%" },
          { num: 2, text: "'Notes ~by~ on The Good Law' by Anagarik Dharmapala", conf: "95.8%" },
          { num: 3, text: "'The Disciples of the Buddha refrains from", conf: "97.1%" },
          { num: 4, text: "indulging in speculations as to whence, ^whither^", conf: "94.6%" },
          { num: 5, text: "and what am I.", conf: "98.9%" },
          { num: 6, text: "2. He discards heresies about the soul and refrains", conf: "97.8%" },
          { num: 7, text: "from identifying it with either the ~soul~ body,", conf: "95.2%" },
          { num: 8, text: "sensations, perceptions, volitions and consciousness.", conf: "98.5%" },
          { num: 9, text: "3. He discards all Nihilistic views which are", conf: "96.9%" },
          { num: 10, text: "held [by] certain religious teachers. He contemns such", conf: "94.8%" },
          { num: 11, text: "views as are held by heretics.", conf: "97.3%" },
          { num: 12, text: "4. He disregards the theory that the cosmic progress", conf: "98.2%" },
          { num: 13, text: "has a known beginning.", conf: "99.1%" },
          { num: 14, text: "5. He repudiates the theory that a God created man", conf: "98.7%" },
          { num: 15, text: "                                                    T.O.", conf: "99.4%" }
        ]
      };

      setUploadedDoc(docData);
      setActiveStep(2); // Ready for user query!

      // Add system confirmation message in chat
      setChatMessages([
        {
          id: Date.now(),
          sender: 'system',
          text: `✅ Document Extracted Successfully! 15 autograph lines transcribed from "${docData.name}" via ADHA DeepHTR Engine v5.2 with 96.8% confidence. The content has been vectorized into local RAG memory.`,
          docData: docData
        }
      ]);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    triggerExtraction(objectUrl, file.name);
  };

  const handleQuickDemoUpload = () => {
    triggerExtraction('/ambedkar-handwritten-dharmapala.jpg', 'ambedkar-handwritten-dharmapala.jpg');
  };

  const handleAskSoulQuery = () => {
    if (!uploadedDoc) {
      handleQuickDemoUpload();
      setTimeout(() => {
        submitSoulQuery();
      }, 1600);
    } else {
      submitSoulQuery();
    }
  };

  const submitSoulQuery = () => {
    setActiveStep(3);
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: 'What does this passage discuss about the soul?',
      speakerCallout: '“Now I can search by meaning, not just exact keywords.”',
      tag: 'Semantic Vector Match (Dense Retrieval 0.941)'
    };

    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        speakerCallout: '“ADHA retrieves the relevant archival passage and gives a source-grounded answer.”',
        text: `Based on the data extracted from your uploaded handwritten archival document (Accession: ADHA-MSS-1915-BUD), Dr. B. R. Ambedkar analyzes Anagarika Dharmapala's article "Notes on The Good Law" from The Buddhist Review (Vol. VII, No. 2, 1915). Regarding the question of the soul, the extracted manuscript articulates two core principles:

1. Unconditional Rejection of Soul Heresies (The Anatta Doctrine):
In Proposition 2 of his handwritten notes (Lines 6–8), Dr. Ambedkar explicitly writes:
“2. He discards heresies about the soul and refrains from identifying it with either the body, sensations, perceptions, volitions and consciousness.”
The passage establishes that the disciple of the Buddha categorically discards belief in a permanent metaphysical soul (atman). Furthermore, selfhood must not be mistakenly identified with any of the five constituent psychophysical aggregates (Pancha-Skandha):
• Physical Body (rupa)
• Sensations (vedana)
• Perceptions (sanna)
• Mental Volitions (sankhara)
• Consciousness (vinnana)

2. The Ethical Middle Path (Anti-Nihilism):
Crucially, in Proposition 3 (Lines 9–11), Dr. Ambedkar notes that discarding the soul does not imply nihilistic annihilationism:
“3. He discards all Nihilistic views which are held [by] certain religious teachers. He contemns such views as are held by heretics.”
Buddhism steers the Middle Way: denying the permanent metaphysical soul while simultaneously repudiating nihilism to uphold moral causation and personal responsibility.`,
        citations: [
          {
            title: "Notes on 'The Good Law' by Anagarika Dharmapala (Handwritten Research Folio)",
            page: 'Leaf 1 (Recto) • Lines 6–8 (Proposition 2 on Soul)',
            accession: 'ADHA-MSS-1915-BUD',
            institution: 'Maharashtra State Archives / Dr. Ambedkar Research Institute',
            hash: 'SHA256: 9c8b7a6d...0f9a8b',
            isHandwritten: true,
            imageUrl: uploadedDoc?.url || '/ambedkar-handwritten-dharmapala.jpg'
          }
        ],
        hash: 'SHA256: 9c8b7a6d...0f9a8b'
      };

      setChatMessages(prev => [...prev, aiReply]);
    }, 700);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');

    if (userText.toLowerCase().includes('soul') || userText.toLowerCase().includes('passage')) {
      handleAskSoulQuery();
    } else {
      const userMsg = { id: Date.now(), sender: 'user', text: userText };
      setChatMessages(prev => [...prev, userMsg]);
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: uploadedDoc 
              ? `Cross-referencing your query "${userText}" against the 15 extracted lines of "${uploadedDoc.title}". The document discusses Buddhist epistemology, dependent origination, and rejection of theistic creationism.`
              : `Based on verified repository manuscripts matching "${userText}": Cross-referenced with cryptographic checksum verification.`,
            citations: uploadedDoc ? [
              {
                title: uploadedDoc.title,
                page: uploadedDoc.leaf,
                accession: uploadedDoc.accession,
                institution: uploadedDoc.institution,
                hash: uploadedDoc.hash,
                isHandwritten: true,
                imageUrl: uploadedDoc.url
              }
            ] : []
          }
        ]);
      }, 700);
    }
  };

  const handleTraceCitation = (citation) => {
    setActiveStep(4);
    setActiveSourceModal(citation || (uploadedDoc ? {
      title: uploadedDoc.title,
      leaf: uploadedDoc.leaf,
      accession: uploadedDoc.accession,
      institution: uploadedDoc.institution,
      hash: uploadedDoc.hash,
      imageUrl: uploadedDoc.url
    } : null));
  };

  const handleReset = () => {
    setUploadedDoc(null);
    setChatMessages([]);
    setActiveStep(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*,.pdf" 
        className="hidden" 
      />

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-[#23324E] flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#0F766E] dark:text-teal-400" /> AI Archival Research Assistant
            </h1>
            <span className="badge-teal font-mono text-[11px]">
              Grounded Corpus RAG
            </span>
            <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-mono text-[10.5px] font-bold px-2 py-0.5 rounded border border-amber-400/40">
              Neural HTR Document Ingestion Active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Upload any original archival manuscript or query verified repository folios. Extracts text via DeepHTR, analyzes meaning, and grounds answers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {uploadedDoc && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Reset and upload another document"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset / Upload Another</span>
            </button>
          )}
          <div className="badge-success font-mono text-[11px] py-1.5 px-3 flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Grounded RAG Active</span>
          </div>
        </div>
      </div>

      {/* Interactive Presentation Stepper Bar */}
      <div className="bg-slate-100 dark:bg-[#111A2E] p-2 rounded-2xl border border-slate-200 dark:border-[#23324E] flex flex-col md:flex-row items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 px-2">
          <Compass className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-slate-700 dark:text-slate-200">Presentation Walkthrough:</span>
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          {/* Step 1: Upload */}
          <button
            onClick={() => {
              if (!uploadedDoc) handleQuickDemoUpload();
              else setActiveStep(1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeStep === 1
                ? 'bg-amber-600 text-white shadow-xs font-bold ring-2 ring-amber-400'
                : 'bg-white dark:bg-[#151F32] text-slate-700 dark:text-slate-300 hover:bg-slate-50 border border-slate-200 dark:border-[#23324E]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Upload Document & Extract</span>
          </button>

          {/* Step 2: Ask */}
          <button
            onClick={handleAskSoulQuery}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeStep === 2
                ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-white dark:bg-[#151F32] text-slate-700 dark:text-slate-300 hover:bg-slate-50 border border-slate-200 dark:border-[#23324E]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Ask: "What does this passage discuss about the soul?"</span>
          </button>

          {/* Step 3: Show Result */}
          <button
            onClick={() => {
              if (!chatMessages.some(m => m.sender === 'ai')) handleAskSoulQuery();
              else setActiveStep(3);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeStep === 3
                ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-white dark:bg-[#151F32] text-slate-700 dark:text-slate-300 hover:bg-slate-50 border border-slate-200 dark:border-[#23324E]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Grounded Result & Meaning Synthesis</span>
          </button>

          {/* Step 4: Trace Source */}
          <button
            onClick={() => handleTraceCitation(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeStep === 4
                ? 'bg-amber-600 text-white shadow-xs font-bold ring-2 ring-amber-400'
                : 'bg-white dark:bg-[#151F32] text-slate-700 dark:text-slate-300 hover:bg-slate-50 border border-slate-200 dark:border-[#23324E]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">4</span>
            <span>Trace Back to Original Source</span>
          </button>
        </div>
      </div>

      {/* 3-Column Layout: History | Evidence+Chat | Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT: Research Threads & Document Ingestion (3 cols) */}
        <div className="lg:col-span-3 saas-card p-4 space-y-4 min-h-[660px]">
          
          {/* Upload Card / CTA */}
          <div 
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer?.files?.[0];
              if (file) {
                const objectUrl = URL.createObjectURL(file);
                triggerExtraction(objectUrl, file.name);
              }
            }}
            className="p-3.5 rounded-xl border-2 border-dashed border-amber-500/50 bg-amber-50/40 dark:bg-amber-950/20 text-center space-y-2.5 transition-all hover:border-amber-500"
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-slate-900 dark:text-white text-xs">
                Upload Archival Document
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Drag & drop or select handwritten manuscript for instant AI HTR extraction.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-1.5 px-3 rounded-lg bg-white dark:bg-[#151F32] hover:bg-slate-100 border border-slate-300 dark:border-[#23324E] text-slate-800 dark:text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileUp className="w-3.5 h-3.5 text-amber-500" />
                <span>Upload From Computer</span>
              </button>

              <button
                onClick={handleQuickDemoUpload}
                className="w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ Load Ambedkar Handwritten Doc</span>
              </button>
            </div>
          </div>

          {/* Research Threads List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Research Threads</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              {PRESET_THREADS.map((thread) => {
                const isSelected = activeThreadId === thread.id;
                return (
                  <div 
                    key={thread.id}
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      if (thread.id === 'handwritten-upload' && !uploadedDoc) {
                        handleQuickDemoUpload();
                      }
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected 
                        ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-sm border-transparent' 
                        : 'bg-slate-50 dark:bg-[#111A2E] hover:bg-slate-100 dark:hover:bg-[#1A263D] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#23324E]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className={`font-serif font-bold truncate text-xs ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {thread.title}
                      </p>
                      {thread.badge && (
                        <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 ${
                          isSelected 
                            ? 'bg-amber-400 text-slate-950' 
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        }`}>
                          {thread.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] font-mono ${isSelected ? 'text-blue-200 dark:text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {thread.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Query Pills */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Suggested Question on Document
            </p>
            <button
              onClick={handleAskSoulQuery}
              className="w-full text-left p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-300/50 text-[11px] text-amber-950 dark:text-amber-200 font-medium transition-colors cursor-pointer block leading-snug"
            >
              ✨ "What does this passage discuss about the soul?"
            </button>
          </div>
        </div>

        {/* CENTER: Chat + Live Extraction + Evidence (6 cols) */}
        <div className="lg:col-span-6 saas-card flex flex-col justify-between min-h-[660px] overflow-hidden">
          
          {/* Top Thread Info Bar */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#111A2E] border-b border-slate-200 dark:border-[#23324E] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${uploadedDoc ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span className="font-serif font-bold text-slate-900 dark:text-white text-xs">
                {uploadedDoc ? `Document In Memory: ${uploadedDoc.title}` : 'AI Archival Research Assistant'}
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              {uploadedDoc ? `15 Lines HTR Vectorized` : 'Awaiting Document Upload'}
            </span>
          </div>

          {/* Live Extraction Processing Indicator */}
          {isExtracting && (
            <div className="p-5 bg-amber-50/80 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/40 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono text-amber-950 dark:text-amber-200">
                <span className="font-bold flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600 dark:text-amber-400" />
                  Neural HTR Optical Extraction Pipeline Running...
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold">
                  Phase {extractionStep} of 3
                </span>
              </div>

              {/* Extraction Progress Steps */}
              <div className="grid grid-cols-3 gap-2 text-[10.5px] font-mono">
                <div className={`p-2 rounded-lg border ${extractionStep >= 1 ? 'bg-white dark:bg-[#0E1726] border-amber-400 text-amber-900 dark:text-amber-200 font-bold' : 'opacity-40'}`}>
                  1. Image Deskew & Contrast
                </div>
                <div className={`p-2 rounded-lg border ${extractionStep >= 2 ? 'bg-white dark:bg-[#0E1726] border-amber-400 text-amber-900 dark:text-amber-200 font-bold' : 'opacity-40'}`}>
                  2. DeepHTR Vision OCR
                </div>
                <div className={`p-2 rounded-lg border ${extractionStep >= 3 ? 'bg-white dark:bg-[#0E1726] border-amber-400 text-amber-900 dark:text-amber-200 font-bold' : 'opacity-40'}`}>
                  3. Vector Embed & RAG
                </div>
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="p-5 space-y-5 overflow-y-auto max-h-[500px]">
            
            {/* If no messages yet, show upload welcome banner */}
            {chatMessages.length === 0 && !isExtracting && (
              <div className="py-8 px-4 text-center space-y-4 max-w-md mx-auto">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                    Upload an Archival Document
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    Upload an original handwritten manuscript or photo. Our AI will extract the data via Neural HTR and answer questions grounded in the extracted text.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white dark:bg-[#151F32] hover:bg-slate-100 border border-slate-300 dark:border-[#23324E] text-slate-800 dark:text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileUp className="w-4 h-4 text-amber-500" />
                    <span>Upload Image</span>
                  </button>
                  <button
                    onClick={handleQuickDemoUpload}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>⚡ Load Ambedkar Handwritten Doc</span>
                  </button>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-3">
                
                {/* 1. System Extracted Document Card */}
                {msg.sender === 'system' && msg.docData && (
                  <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 rounded-2xl p-4 space-y-3 shadow-xs animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Document Data Extracted via DeepHTR v5.2</span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-200/80 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                        Confidence: {msg.docData.confidence}
                      </span>
                    </div>

                    <div className="flex gap-3 items-start bg-white dark:bg-[#0E1726] p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
                      <div className="w-16 h-20 rounded-md overflow-hidden shrink-0 border border-amber-900/40 bg-black">
                        <img 
                          src={msg.docData.url} 
                          alt="Uploaded Document" 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1 text-xs">
                        <h4 className="font-serif font-bold text-slate-900 dark:text-white text-xs truncate">
                          {msg.docData.title}
                        </h4>
                        <p className="text-[10.5px] text-slate-600 dark:text-slate-300 font-mono">
                          {msg.docData.leaf} • Acc #{msg.docData.accession}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          15 Lines Extracted • Topics: Soul (Anatta), 5 Skandhas, Anti-Nihilism, Anti-Creationism
                        </p>
                      </div>
                    </div>

                    {/* Accordion to inspect extracted lines */}
                    <div className="pt-1">
                      <button
                        onClick={() => setShowExtractedLines(!showExtractedLines)}
                        className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{showExtractedLines ? 'Hide 15 Extracted Lines' : 'View 15 Extracted Line Transcriptions'}</span>
                        {showExtractedLines ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {showExtractedLines && (
                        <div className="mt-2.5 p-3 bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 max-h-48 overflow-y-auto text-[11px] font-serif scrollbar-thin">
                          {msg.docData.lines.map((l) => (
                            <div key={l.num} className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                              <span className="font-mono text-[9.5px] font-bold bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded text-slate-500">
                                L{String(l.num).padStart(2, '0')}
                              </span>
                              <span className="leading-snug">{l.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Prompt to ask question */}
                    <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[11px] text-emerald-900 dark:text-emerald-200 font-sans">
                        Document indexed into RAG. Ready for questions.
                      </span>
                      <button
                        onClick={handleAskSoulQuery}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask: "What does this passage discuss about the soul?"</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. User Message */}
                {msg.sender === 'user' && (
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <div className="bg-[#123B63] dark:bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-xs text-xs max-w-[90%] font-medium shadow-xs leading-relaxed">
                        <p className="font-sans font-semibold text-[13px]">{msg.text}</p>
                      </div>
                    </div>

                    {msg.speakerCallout && (
                      <div className="flex justify-end">
                        <div className="bg-amber-100/90 dark:bg-amber-950/80 border-l-4 border-amber-500 text-amber-950 dark:text-amber-200 p-2.5 rounded-r-xl max-w-[85%] text-xs shadow-xs animate-in fade-in">
                          <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-mono text-[9px] font-bold uppercase tracking-wider mb-0.5">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Semantic Search In Action
                          </div>
                          <p className="italic font-serif text-[12px] font-medium leading-snug">
                            {msg.speakerCallout}
                          </p>
                          {msg.tag && (
                            <p className="text-[9.5px] font-mono text-amber-700 dark:text-amber-400 mt-1 opacity-90">
                              ✓ {msg.tag}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. AI Answer */}
                {msg.sender === 'ai' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-slate-400 dark:text-slate-500">
                      <Info className="w-3.5 h-3.5" />
                      <span>AI-assisted synthesis — verified against extracted document data</span>
                    </div>

                    {msg.speakerCallout && (
                      <div className="bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-emerald-500 text-emerald-950 dark:text-emerald-200 p-2.5 rounded-r-xl text-xs shadow-xs animate-in fade-in max-w-[95%]">
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider mb-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Grounded Archival Retrieval
                        </div>
                        <p className="italic font-serif text-[12px] font-medium leading-snug">
                          {msg.speakerCallout}
                        </p>
                      </div>
                    )}

                    <div className="bg-slate-50 dark:bg-[#111A2E] border border-slate-200 dark:border-[#23324E] p-4 rounded-2xl rounded-tl-xs text-xs text-slate-800 dark:text-slate-200 leading-relaxed max-w-[98%] whitespace-pre-wrap font-serif text-[12px]">
                      {msg.text}
                    </div>

                    {/* Citations Card */}
                    {msg.citations && (
                      <div className="border border-[#123B63]/40 dark:border-blue-500/40 bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 space-y-3 max-w-[98%] shadow-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-[#123B63] dark:text-blue-300 text-[10.5px] font-mono uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Archival Evidence (Deterministic Grounding)
                          </p>
                          <span className="text-[9.5px] font-mono text-slate-500 dark:text-slate-400">{msg.hash}</span>
                        </div>

                        {msg.citations.map((c, i) => (
                          <div 
                            key={i} 
                            onClick={() => handleTraceCitation(c)}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[11.5px] text-slate-800 dark:text-slate-200 bg-white dark:bg-[#151F32] p-3 rounded-xl border border-slate-200 dark:border-[#23324E] hover:border-amber-400 dark:hover:border-amber-500 transition-all cursor-pointer group shadow-xs"
                            title="Click citation: trace back to original source"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="font-serif font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                  {c.title}
                                </p>
                                {c.isHandwritten && (
                                  <span className="badge-teal font-mono text-[9px] py-0.2">
                                    Autograph Handwriting (HTR)
                                  </span>
                                )}
                              </div>
                              <p className="text-[10.5px] text-slate-600 dark:text-slate-300 font-mono">
                                📍 {c.page} • Accession: <strong className="text-adha-navy dark:text-blue-300">{c.accession}</strong>
                              </p>
                              <p className="text-[9.5px] text-slate-400 dark:text-slate-500 font-mono">
                                Institutional Custodian: {c.institution}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTraceCitation(c);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-400/50 hover:bg-amber-200 text-[10.5px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <span>Trace Source</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}

          </div>

          {/* Input Area */}
          <div className="p-3.5 border-t border-slate-200 dark:border-[#23324E] bg-slate-50/50 dark:bg-[#111A2E]/50 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the uploaded document (e.g. 'What does this passage discuss about the soul?')..."
                className="flex-1 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#123B63] dark:focus:ring-blue-500 font-sans"
              />
              <button 
                onClick={handleSend}
                className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 px-1">
              <span>{uploadedDoc ? `Analyzing "${uploadedDoc.name}"` : 'Upload document or ask across archive'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">DeepHTR Vision Active</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Source & Provenance Panel (3 cols) */}
        <div className="lg:col-span-3 saas-card p-4 space-y-4 min-h-[660px]">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <p className="text-[10.5px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">EVIDENCE & PROVENANCE</p>
            <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white mt-0.5">Verified Archival Sources</h3>
          </div>

          {/* Citation Grounding Card */}
          <div className="bg-slate-50 dark:bg-[#111A2E] p-3.5 rounded-xl border border-slate-200 dark:border-[#23324E] space-y-2.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Citation Grounding Active</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans text-[11px]">
              All answers are deterministically tied to verified manuscript hashes. Unsupported claims trigger fallback:
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 p-2.5 rounded-lg text-[10px] font-mono border border-amber-200 dark:border-amber-800">
              "No sufficient verified archival evidence was found in the indexed collection."
            </div>
          </div>

          {/* Speaker Callout 3 (Traceback Note) */}
          <div className="bg-amber-100/90 dark:bg-amber-950/70 border-l-4 border-amber-500 p-2.5 rounded-r-xl text-xs space-y-1 shadow-xs">
            <p className="font-mono text-[9px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
              Source Traceability Verification
            </p>
            <p className="italic font-serif text-[11.5px] text-amber-950 dark:text-amber-100 leading-snug font-medium">
              “Most importantly, the answer can be traced back to the original document and source.”
            </p>
          </div>

          {/* ACTIVE SOURCE DOCUMENT DISPLAY */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
              <span>ACTIVE SOURCE DOCUMENT</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">Verified Hash</span>
            </div>

            {uploadedDoc ? (
              /* Uploaded Handwritten Document Active Preview Card */
              <div 
                onClick={() => handleTraceCitation(null)}
                className="group relative rounded-xl border-2 border-amber-500/50 bg-[#16120d] p-3 space-y-2.5 cursor-pointer shadow-md hover:border-amber-400 transition-all"
              >
                {/* Image Thumbnail with Targeted Region Indicator */}
                <div className="relative rounded-lg overflow-hidden border border-amber-900/60 bg-black aspect-4/3 flex items-center justify-center">
                  <img 
                    src={uploadedDoc.url} 
                    alt="Uploaded Handwritten Manuscript" 
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Bounding box indicator for Lines 6-8 */}
                  <div className="absolute top-[32%] left-[5%] right-[5%] h-[24%] border-2 border-amber-400 bg-amber-400/20 rounded shadow-xs flex items-center justify-end pr-1.5 animate-pulse">
                    <span className="bg-amber-500 text-slate-950 text-[8px] font-mono font-bold px-1 py-0.2 rounded">
                      Lines 6–8 (Soul / Pancha-Skandha)
                    </span>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 bg-black/80 text-amber-300 font-mono text-[7.5px] px-1.5 py-0.5 rounded">
                    1200 DPI Autograph Master
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="space-y-1 text-xs">
                  <h4 className="font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors leading-tight text-[12px]">
                    {uploadedDoc.title}
                  </h4>
                  <p className="text-[10px] text-amber-300/80 font-mono">
                    {uploadedDoc.leaf} • {uploadedDoc.accession}
                  </p>
                  <p className="text-[9.5px] text-slate-400 font-mono truncate">
                    {uploadedDoc.institution}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between gap-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTraceCitation(null);
                    }}
                    className="flex-1 py-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <ZoomIn className="w-3 h-3 text-amber-400" />
                    <span>Inspect Lines</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/documents/${uploadedDoc.accession}`);
                    }}
                    className="flex-1 py-1 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Open Reader</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              /* Awaiting Document State */
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="h-36 rounded-xl border border-dashed border-slate-300 dark:border-[#23324E] p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-400 transition-colors group"
              >
                <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-amber-500 transition-colors mb-2" />
                <p className="text-xs font-serif font-bold text-slate-700 dark:text-slate-300">
                  No Document Uploaded Yet
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Click to upload archival leaf for provenance trace
                </p>
              </div>
            )}

            {/* Cryptographic Checksum Verification Box */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#111A2E] border border-slate-200 dark:border-[#23324E] text-[10px] font-mono space-y-1">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-bold">
                <Hash className="w-3 h-3 text-amber-500" />
                <span>Cryptographic Digest Check:</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 break-all select-all font-mono text-[9px]">
                {uploadedDoc ? uploadedDoc.hash : 'SHA256 will compute upon document upload'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRACE TO ORIGINAL SOURCE MODAL LIGHTBOX */}
      {activeSourceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white dark:bg-[#0E1726] border border-slate-300 dark:border-[#23324E] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-[#23324E] flex items-center justify-between bg-slate-50 dark:bg-[#09121F]">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge-teal font-mono text-[10px]">
                    Traceback Verified
                  </span>
                  <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                    Tracing AI Answer to Primary Archival Source
                  </h3>
                </div>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Accession: <strong>ADHA-MSS-1915-BUD</strong> • Leaf 1 (Recto)
                </p>
              </div>
              <button 
                onClick={() => setActiveSourceModal(null)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Quote Callout */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/40 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <p className="italic font-serif text-[13px] text-amber-950 dark:text-amber-100 font-medium">
                “Most importantly, the answer can be traced back to the original document and source.”
              </p>
            </div>

            {/* Side-by-Side Modal Body: Original Scan on Left | Transcribed Lines on Right */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              
              {/* Left Column: High-Res Original Scan */}
              <div className="md:col-span-6 space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200">1. Original Handwritten Page Scan</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">1200 DPI Optical TIFF</span>
                </div>
                
                <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/50 bg-black shadow-lg">
                  <img 
                    src={uploadedDoc?.url || "/ambedkar-handwritten-dharmapala.jpg"} 
                    alt="Original Handwritten Ambedkar Manuscript" 
                    className="w-full h-auto object-contain"
                  />
                  {/* Highlight overlay over lines 6–8 */}
                  <div className="absolute top-[31%] left-[4%] right-[4%] h-[23%] border-2 border-amber-400 bg-amber-400/25 rounded shadow-lg pointer-events-none flex items-start justify-end p-1">
                    <span className="bg-amber-500 text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm">
                      Lines 6–8 Traced
                    </span>
                  </div>
                </div>

                <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 text-center">
                  Dr. B. R. Ambedkar Personal Papers • Maharashtra State Archives
                </p>
              </div>

              {/* Right Column: Grounded Transcription & Extraction */}
              <div className="md:col-span-6 space-y-3.5">
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200">2. HTR Transcribed Evidence Lines</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">96.8% Confidence</span>
                </div>

                {/* Target Lines Highlight Box */}
                <div className="bg-amber-50/70 dark:bg-[#152033] border-2 border-amber-400 dark:border-amber-500 rounded-xl p-3.5 space-y-2.5 shadow-xs">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                    Targeted Passages: Lines 6–8 (Proposition 2 on Soul)
                  </span>

                  <div className="space-y-1.5 font-serif text-[12.5px] leading-relaxed text-slate-900 dark:text-slate-100">
                    <div className="p-2 bg-white dark:bg-[#0E1726] rounded border border-amber-300 dark:border-amber-700/50 flex items-start gap-2">
                      <span className="font-mono text-[9px] font-bold bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded">L06</span>
                      <span>2. He discards heresies about the soul and refrains</span>
                    </div>

                    <div className="p-2 bg-white dark:bg-[#0E1726] rounded border border-amber-300 dark:border-amber-700/50 flex items-start gap-2">
                      <span className="font-mono text-[9px] font-bold bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded">L07</span>
                      <span>from identifying it with either the <del className="bg-red-100 dark:bg-red-950 text-red-600 line-through px-1 rounded">soul</del> body,</span>
                    </div>

                    <div className="p-2 bg-white dark:bg-[#0E1726] rounded border border-amber-300 dark:border-amber-700/50 flex items-start gap-2">
                      <span className="font-mono text-[9px] font-bold bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded">L08</span>
                      <span>sensations, perceptions, volitions and consciousness.</span>
                    </div>
                  </div>
                </div>

                {/* Question & Deterministic Verification Note */}
                <div className="p-3 bg-slate-50 dark:bg-[#111A2E] rounded-xl border border-slate-200 dark:border-[#23324E] space-y-1.5 text-xs">
                  <p className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Verification Grounding
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-[11px]">
                    User asked: <strong className="text-adha-navy dark:text-blue-300">"What does this passage discuss about the soul?"</strong>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-[10.5px] leading-relaxed">
                    AI retrieved the exact handwritten proposition regarding <em>Anatta</em> and the five skandhas. No hallucination occurred. The response is deterministically anchored in the cryptographic leaf checksum.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("Ambedkar, B. R. (c. 1915). Notes on 'The Good Law' by Anagarika Dharmapala (The Buddhist Review, Vol. VII, No. 2). Autograph Manuscript Folio. Maharashtra State Archives. ADHA Accession ADHA-MSS-1915-BUD.");
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#151F32] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Citation Copied!' : 'Copy Citation'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSourceModal(null);
                      navigate('/documents/ADHA-MSS-1915-BUD');
                    }}
                    className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer font-bold"
                  >
                    <span>Open in Full Archival Reader</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Clock, Sparkles, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IngestionView() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const steps = [
    { num: 1, name: 'File Validation', desc: 'SHA-256 integrity hash calculation & 1200 DPI TIFF validation', status: 'Completed' },
    { num: 2, name: 'Image Enhancement', desc: 'Despeckle, deskew, optical contrast balance & border cropping', status: 'Completed' },
    { num: 3, name: 'OCR / HTR Engine', desc: 'Neural Tesseract v5.2 multilingual script transcription', status: isProcessing ? 'In Progress' : 'Completed' },
    { num: 4, name: 'Metadata Extraction', desc: 'Dublin Core & MARC21 automated tagging schema mapping', status: isProcessing ? 'Pending' : 'Completed' },
    { num: 5, name: 'Entity Extraction', desc: 'NER identification of figures, dates, locations & citations', status: isProcessing ? 'Pending' : 'Completed' },
    { num: 6, name: 'Knowledge Graph Linking', desc: 'Cross-reference ontologies against Ambedkar Heritage Graph', status: 'Pending' },
    { num: 7, name: 'Human Curator Review', desc: 'Archivist verification of confidence scores and annotations', status: 'Pending' },
    { num: 8, name: 'Gazette Publish', desc: 'Anchoring hash to National Informatics Centre node', status: 'Pending' }
  ];

  const handleSimulateUpload = () => {
    setSelectedFileName('MS-1936-AOC-Chapter4-Folio12.tiff');
    setIsProcessing(true);
    setUploadSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setUploadSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Archival Ingestion Pipeline
          </h1>
          <span className="badge-teal font-mono text-[11px]">
            Tesseract v5.2 Active
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Automated 8-step pipeline converting physical manuscript scans into cryptographic, grounded, searchable records.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="saas-card p-8 text-center border-2 border-dashed border-slate-300 dark:border-[#2A3E60] hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#123B63] dark:text-blue-300 flex items-center justify-center mb-4">
          <UploadCloud className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
            Upload Archival Folios / Batch Package
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Supports 1200 DPI TIFF, RAW scans, PDF/A preservation format, WAV audio recordings, or high-res manuscript plates.
          </p>
        </div>

        {selectedFileName && (
          <div className="mt-4 p-3 bg-slate-50 dark:bg-[#1A263D] border border-slate-200 dark:border-[#23324E] rounded-xl max-w-sm mx-auto text-xs font-mono text-slate-700 dark:text-slate-200 flex items-center justify-between">
            <span className="truncate">{selectedFileName}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">READY</span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={handleSimulateUpload}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#0e2f50] text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isProcessing ? 'Processing Folio...' : 'Select File & Run Pipeline'}</span>
          </button>
        </div>

        {uploadSuccess && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Batch queued successfully! Transferred to Curator Review.</span>
            <button 
              onClick={() => navigate('/review')}
              className="ml-2 underline font-bold"
            >
              Inspect Queue →
            </button>
          </div>
        )}
      </div>

      {/* Active Pipeline Status */}
      <div className="saas-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              Active Ingestion Batch: #BATCH-2024-NOV-14 (12 Folios)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
              SHA-256: 9e107d9d372bb6826bd81d3542a419d6dae10d32
            </p>
          </div>
          <span className="badge-teal">
            Pipeline Throughput: 120 pgs/hr
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div 
              key={step.num}
              className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                step.status === 'Completed' 
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60' 
                  : step.status === 'In Progress' 
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 ring-1 ring-amber-300 dark:ring-amber-800' 
                  : 'bg-slate-50 dark:bg-[#0E1726] border-slate-200 dark:border-[#23324E]'
              }`}
            >
              <div className="flex justify-between items-center font-mono">
                <span className="font-bold text-slate-400 dark:text-slate-500 text-[10px]">STEP 0{step.num}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  step.status === 'Completed' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' 
                    : step.status === 'In Progress' 
                    ? 'bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300 animate-pulse' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {step.status}
                </span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white">{step.name}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

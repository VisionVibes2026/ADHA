import React from 'react';
import { FileCode2, UploadCloud, RefreshCw } from 'lucide-react';

export default function IngestionView() {
  const steps = [
    { num: 1, name: 'File Validation', desc: 'SHA-256 integrity hash calculation & 1200 DPI TIFF validation', status: 'Completed' },
    { num: 2, name: 'Image Enhancement', desc: 'Despeckle, deskew, optical contrast balance & border cropping', status: 'Completed' },
    { num: 3, name: 'OCR / HTR Engine', desc: 'Neural Tesseract v5.2 multilingual script transcription', status: 'In Progress' },
    { num: 4, name: 'Metadata Extraction', desc: 'Dublin Core & MARC21 automated tagging schema mapping', status: 'Pending' },
    { num: 5, name: 'Entity Extraction', desc: 'NER identification of figures, dates, locations & citations', status: 'Pending' },
    { num: 6, name: 'Knowledge Graph Linking', desc: 'Cross-reference ontologies against Ambedkar Heritage Graph', status: 'Pending' },
    { num: 7, name: 'Human Curator Review', desc: 'Archivist verification of confidence scores and annotations', status: 'Pending' },
    { num: 8, name: 'Gazette Publish', desc: 'Anchoring hash to National Informatics Centre node', status: 'Pending' }
  ];

  return (
    <div className="space-y-5 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">Archival Ingestion Pipeline</h1>
        <p className="text-xs text-slate-600 mt-1">
          Automated 8-step pipeline converting physical scans into cryptographic, grounded, searchable records.
        </p>
      </div>

      {/* Upload */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-sm p-8 text-center space-y-3">
        <UploadCloud className="w-9 h-9 text-adha-navy mx-auto" />
        <div>
          <h3 className="font-serif font-bold text-sm text-slate-900">Upload New Archival Folio / Batch</h3>
          <p className="text-xs text-slate-500 mt-0.5">Supports 1200 DPI TIFF, RAW, PDF/A, WAV, or high-res JPEG scans</p>
        </div>
        <button className="antd-btn-primary py-2 px-5">Select Files for Ingestion</button>
      </div>

      {/* Pipeline Steps */}
      <div className="bg-white border border-slate-200 rounded-xs p-5 space-y-4">
        <h3 className="font-serif font-bold text-base text-adha-navy border-b border-slate-100 pb-3">
          Current Active Batch: #BATCH-2024-NOV-14 (12 Folios)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => (
            <div 
              key={step.num}
              className={`p-3 rounded-xs border text-xs space-y-1.5 ${
                step.status === 'Completed' ? 'bg-emerald-50/50 border-emerald-300' :
                step.status === 'In Progress' ? 'bg-amber-50/50 border-amber-400 ring-1 ring-amber-300' :
                'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center font-mono">
                <span className="font-bold text-slate-400 text-[10px]">STEP 0{step.num}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs ${
                  step.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                  step.status === 'In Progress' ? 'bg-amber-200 text-amber-900' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  {step.status}
                </span>
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-[13px]">{step.name}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

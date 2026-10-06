import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Code2, 
  ShieldCheck, 
  ExternalLink,
  FileText,
  Layers
} from 'lucide-react';

export default function CitationModal({ record, onClose }) {
  const [activeTab, setActiveTab] = useState('apa'); // 'apa' | 'chicago' | 'mla' | 'bibtex' | 'dublincore' | 'marc21'
  const [copied, setCopied] = useState(false);

  if (!record) return null;

  const year = record.year || record.date?.match(/\d{4}/)?.[0] || '1936';
  const title = record.title || 'Archival Record';
  const id = record.id || 'ADHA-DOC-001';
  const institution = record.institution || 'National Archives & Memorial Repository';
  const author = 'Ambedkar, B. R.';

  // Citations
  const citations = {
    apa: `${author} (${year}). ${title}. ${institution}. ADHA Accession No. ${id}. https://adha.gov.in/records/${id}`,
    chicago: `${author} "${title}." Archival document, ${year}. Accession No. ${id}, ${institution}. https://adha.gov.in/records/${id}.`,
    mla: `${author} "${title}." ${year}. ${institution}, Accession No. ${id}, adha.gov.in/records/${id}.`,
    bibtex: `@misc{adha_${id.toLowerCase().replace(/[^a-z0-9]/g, '_')},
  author       = {Ambedkar, Bhimrao Ramji},
  title        = {${title}},
  year         = {${year}},
  howpublished = {National Archival Repository of India (ADHA)},
  note         = {Accession No. ${id}},
  institution  = {${institution}},
  url          = {https://adha.gov.in/records/${id}},
  oais_urn     = {urn:oais:aip:in.gov.adha:${id}}
}`,
    dublincore: `<?xml version="1.0" encoding="UTF-8"?>
<metadata
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/">
  <dc:title>${title}</dc:title>
  <dc:creator>Ambedkar, B. R. (Dr. Bhimrao Ramji)</dc:creator>
  <dc:date>${record.date || year}</dc:date>
  <dc:identifier>${id}</dc:identifier>
  <dc:type>${record.type || 'Text'}</dc:type>
  <dc:format>${record.medium || 'Manuscript'}</dc:format>
  <dc:language>${record.language || 'English'}</dc:language>
  <dc:publisher>Government of India • ADHA</dc:publisher>
  <dc:source>${institution}</dc:source>
  <dc:rights>Public Domain / Cultural Heritage Exemption (India Copyright Act 1957)</dc:rights>
  <dcterms:conformsTo>http://www.loc.gov/standards/marcxml/</dcterms:conformsTo>
</metadata>`,
    marc21: `=LDR  01428nam a2200385 i 4500
=001  ${id}
=008  ${year}0101s${year}    ii                  eng d
=100  1#$aAmbedkar, B. R.$d1891-1956
=245  10$a${title}
=260  ##$aBombay ;$aNew Delhi :$bNational Archival Repository,$c${year}
=500  ##$aArchival original preserved at ${institution}.
=520  ##$a${record.subtitle || 'Historic address and monograph on social reform and caste.'}
=856  40$uhttps://adha.gov.in/records/${id}$yADHA Digital Master`
  };

  const currentContent = citations[activeTab] || citations.apa;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const ext = activeTab === 'bibtex' ? 'bib' : activeTab === 'dublincore' ? 'xml' : activeTab === 'marc21' ? 'mrc' : 'txt';
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${id}_citation.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-2xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#111A2E]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-adha-navy dark:text-blue-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Academic Citation & Metadata Record
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ISO 14721 OAIS, Dublin Core, and MARC21 Bibliographic Schemas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selectors */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'apa', label: 'APA (7th)' },
            { id: 'chicago', label: 'Chicago (17th)' },
            { id: 'mla', label: 'MLA (9th)' },
            { id: 'bibtex', label: 'BibTeX (.bib)' },
            { id: 'dublincore', label: 'Dublin Core XML' },
            { id: 'marc21', label: 'MARC21 Standard' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 border-b-2 font-mono whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-adha-navy dark:border-blue-400 text-adha-navy dark:text-blue-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Citation Box */}
        <div className="p-5 space-y-4">
          <div className="relative">
            <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl overflow-x-auto max-h-64 whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner">
              {currentContent}
            </pre>
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1 border border-white/10 backdrop-blur-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono border border-white/10 backdrop-blur-xs transition-colors"
                title="Download file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Institutional Compliance Notice */}
          <div className="p-3 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-slate-600 dark:text-slate-400">
                OAIS AIP Hash: <code className="font-mono text-slate-900 dark:text-white font-bold">SHA256:9e107d...</code>
              </span>
            </div>
            <span className="badge-primary font-mono text-[10px]">
              IIIF v3.0 Compliant
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#111A2E] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Published under National Heritage Open Archival License</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

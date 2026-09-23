import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  ArrowUpRight,
  Building2,
  GitFork,
  Search,
  Filter,
  Check,
  BookOpen
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { DASHBOARD_METRICS, CONNECTED_INSTITUTIONS } from '../data/mockRecords';

export default function DashboardView() {
  const navigate = useNavigate();
  const { reviewQueue, handleApproveReview, handleSignOffReview, records } = useArchive();
  const [aiQuestion, setAiQuestion] = useState('');
  const [hashValidationStatus, setHashValidationStatus] = useState(null);

  const handleRunHashValidation = () => {
    setHashValidationStatus('Running SHA-256 verification across repository nodes...');
    setTimeout(() => {
      setHashValidationStatus(`✓ All ${records.length} sample records verified — 0 corrupted blocks.`);
    }, 1500);
  };

  // Derive collection summary from actual records
  const collectionSummary = [
    {
      type: 'Digital Documents',
      count: records.filter(r => ['Printed Monograph', 'Academic Thesis', 'Parliamentary Record', 'Legal Memorandum', 'Constitutional Folio', 'Field Declaration'].includes(r.type)).length,
      description: DASHBOARD_METRICS.digitalDocuments.description
    },
    {
      type: 'Manuscripts & Drafts',
      count: records.filter(r => r.type.includes('Manuscript')).length,
      description: DASHBOARD_METRICS.manuscripts.description
    },
    {
      type: 'Audio / Video',
      count: records.filter(r => r.type.includes('Audio') || r.type.includes('Video')).length,
      description: DASHBOARD_METRICS.audioVideo.description
    },
    {
      type: 'Photographs',
      count: records.filter(r => r.type.includes('Print') || r.type.includes('Photograph')).length,
      description: DASHBOARD_METRICS.photographs.description
    }
  ];

  // Featured record from actual data
  const featuredRecord = records.find(r => r.id === 'ADHA-DOC-1936-AOC') || records[0];

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Archive Status Strip */}
      <div className="bg-white border border-slate-200 rounded-xs p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-bold text-slate-800 font-mono text-[11px] uppercase tracking-wide">Archive System Online</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-sans">Last synchronized 2 minutes ago</span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Checksum Integrity: <strong className="text-emerald-700">Verified</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleRunHashValidation} className="antd-btn-default">
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Run Hash Validation</span>
          </button>
          <button className="antd-btn-primary">
            <Download className="w-3.5 h-3.5" />
            <span>Export Manifest</span>
          </button>
        </div>
      </div>

      {hashValidationStatus && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs px-4 py-2 rounded-xs font-mono flex items-center justify-between">
          <span>{hashValidationStatus}</span>
          <button onClick={() => setHashValidationStatus(null)} className="text-emerald-700 font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {/* Institutional Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">
          Digital Heritage Overview
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed font-sans">
          Manage, preserve, and explore Dr. B. R. Ambedkar's digital heritage collection. This overview presents the current state of the repository holdings, pending curatorial actions, and recently catalogued records.
        </p>
      </div>

      {/* Collection Summary Table */}
      <div className="bg-white border border-slate-200 rounded-xs">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase font-bold text-slate-400">REPOSITORY HOLDINGS</p>
            <h2 className="text-base font-serif font-bold text-adha-navy">Collection Summary</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {records.length} records in sample dataset
          </span>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
              <th className="p-3 font-semibold">Collection Type</th>
              <th className="p-3 font-semibold">Records</th>
              <th className="p-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {collectionSummary.map((item) => (
              <tr key={item.type} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 font-semibold text-slate-800">{item.type}</td>
                <td className="p-3 font-mono font-bold text-adha-navy">{item.count}</td>
                <td className="p-3 text-slate-600">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Grid: Curator Queue & Featured Record */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) - Pending Curator Review Queue */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xs">
          <div className="px-5 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <h2 className="text-base font-serif font-bold text-adha-navy">Curatorial Work Queue</h2>
              </div>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Records requiring archivist review before publication to the catalogue.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/review" className="antd-btn-default text-xs">View Full Queue</Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="p-2.5 font-semibold">ACCESSION ID</th>
                  <th className="p-2.5 font-semibold">TITLE</th>
                  <th className="p-2.5 font-semibold">ISSUE</th>
                  <th className="p-2.5 font-semibold">SEVERITY</th>
                  <th className="p-2.5 font-semibold">ASSIGNED CURATOR</th>
                  <th className="p-2.5 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reviewQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="p-2.5 font-mono font-bold text-adha-navy">{item.id}</td>
                    <td className="p-2.5">
                      <p className="font-serif font-bold text-slate-900">{item.title}</p>
                      <p className="text-[10.5px] text-slate-500 font-sans">{item.details}</p>
                    </td>
                    <td className="p-2.5">
                      <span className="antd-tag-orange">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        {item.issue}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span className={item.severity === 'High' ? 'antd-tag-red' : item.severity === 'Medium' ? 'antd-tag-orange' : 'antd-tag-green'}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="p-2.5 font-medium text-slate-700">{item.assignedCurator}</td>
                    <td className="p-2.5 text-right space-x-1.5">
                      <button 
                        onClick={() => navigate('/documents/ADHA-DOC-001')}
                        className="antd-btn-primary text-[11px] py-1 px-2.5"
                      >
                        Review
                      </button>
                      {item.status === 'Pending' ? (
                        <button 
                          onClick={() => item.id === 'DOC-V3' ? handleSignOffReview(item.id) : handleApproveReview(item.id)}
                          className="antd-btn-teal text-[11px] py-1 px-2.5"
                        >
                          {item.id === 'DOC-V3' ? 'Sign Off' : 'Approve'}
                        </button>
                      ) : (
                        <span className="antd-tag-green">
                          <Check className="w-3 h-3" /> {item.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols) - Featured Archival Record */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xs flex flex-col justify-between">
          <div className="p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-adha-teal">FEATURED RECORD</span>
              <span className="antd-tag-orange">{featuredRecord.id}</span>
            </div>

            {/* Archival Thumbnail */}
            <div className="mb-3 border border-slate-300 rounded-xs overflow-hidden">
              <div className="h-40 archival-scan-bg flex items-center justify-center p-3">
                <div className="w-full h-full bg-[#FAF6EE] border border-amber-900/30 p-3 font-serif text-[9.5px] text-amber-950 flex flex-col justify-between select-none">
                  <div className="text-center border-b border-amber-800/20 pb-1">
                    <p className="font-bold text-[9px]">{featuredRecord.institution}</p>
                    <p className="italic text-[8px]">{featuredRecord.location} • {featuredRecord.date}</p>
                  </div>
                  <div className="my-2 leading-tight italic">
                    <p className="font-bold text-[9px] text-center text-amber-900">{featuredRecord.title}</p>
                  </div>
                  <div className="flex justify-between text-[7px] font-mono border-t border-amber-800/20 pt-1 text-slate-600">
                    <span>{featuredRecord.id}</span>
                    <span>{featuredRecord.medium}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalogue Entry */}
            <h3 className="text-sm font-serif font-bold text-adha-navy leading-tight">
              {featuredRecord.title}
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-sans">
              {featuredRecord.subtitle}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] font-mono text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-slate-800">{featuredRecord.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-slate-800">{featuredRecord.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="font-semibold text-slate-800">{featuredRecord.institution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[180px]">{featuredRecord.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rights:</span>
                <span className="font-semibold text-slate-800">{featuredRecord.rights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="antd-tag-green">{featuredRecord.verificationState}</span>
              </div>
            </div>
          </div>

          <div className="p-5 pt-0">
            <button 
              onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
              className="w-full antd-btn-primary py-2 justify-center"
            >
              <span>Open in Document Reader</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Research Search — Compact */}
      <div className="bg-[#123B63] text-white rounded-xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-serif font-bold tracking-tight">AI Archival Research</h2>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-mono px-1.5 py-0.5 rounded-xs font-semibold">
              Grounded RAG
            </span>
          </div>
          <p className="text-[10px] text-slate-300 font-mono">
            Answers cited against verified repository manuscripts only
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Ask an evidence-based question about Dr. Ambedkar's writings, speeches, or constitutional debates..."
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            className="w-full bg-slate-900/70 border border-white/20 rounded-xs py-2 pl-4 pr-28 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-sans"
          />
          <button 
            onClick={() => navigate('/research-assistant')}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 antd-btn-teal py-1 px-3 text-xs"
          >
            <span>Search</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recently Catalogued Records */}
      <div className="bg-white border border-slate-200 rounded-xs">
        <div className="px-5 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-serif font-bold text-adha-navy">Recent Archival Records</h2>
            <p className="text-[10.5px] text-slate-500 font-sans">Most recently catalogued holdings in the repository.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/archive" className="antd-btn-primary text-xs">
              View Full Catalogue →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
                <th className="p-2.5 font-semibold">ACCESSION ID</th>
                <th className="p-2.5 font-semibold">TITLE</th>
                <th className="p-2.5 font-semibold">FORMAT</th>
                <th className="p-2.5 font-semibold">DATE</th>
                <th className="p-2.5 font-semibold">LANGUAGE</th>
                <th className="p-2.5 font-semibold">STATUS</th>
                <th className="p-2.5 font-semibold">INSTITUTION</th>
                <th className="p-2.5 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.slice(0, 5).map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="p-2.5 font-mono font-bold text-adha-navy">{rec.id}</td>
                  <td className="p-2.5 max-w-xs">
                    <p className="font-serif font-bold text-slate-900 truncate">{rec.title}</p>
                    <p className="text-[10.5px] text-slate-500 font-sans truncate">{rec.subtitle}</p>
                  </td>
                  <td className="p-2.5 font-mono text-slate-700">{rec.type}</td>
                  <td className="p-2.5 font-mono text-slate-600">{rec.date}</td>
                  <td className="p-2.5 font-mono text-slate-600">{rec.language}</td>
                  <td className="p-2.5">
                    <span className="antd-tag-green">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {rec.verificationState}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-700 font-medium font-sans">{rec.institution}</td>
                  <td className="p-2.5 text-right">
                    <button 
                      onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                      className="antd-btn-default text-[11px] py-0.5 px-2"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom: Connections & Preservation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preservation Status */}
        <div className="bg-white border border-slate-200 rounded-xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-sm text-adha-navy">Preservation Status</h3>
            <span className="antd-tag-green">Operational</span>
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-600">
            <div className="flex justify-between">
              <span>Cryptographic Hash:</span>
              <span className="font-bold text-slate-800">SHA-256</span>
            </div>
            <div className="flex justify-between">
              <span>Last integrity scrub:</span>
              <span className="font-bold text-slate-800">Today, 03:00 IST</span>
            </div>
            <div className="flex justify-between">
              <span>Corrupted blocks:</span>
              <span className="font-bold text-emerald-700">0 detected</span>
            </div>
            <div className="flex justify-between">
              <span>Offsite tape mirror:</span>
              <span className="font-bold text-slate-800">Completed</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/preservation')}
            className="w-full mt-2 antd-btn-default py-1.5 justify-center text-xs"
          >
            View Preservation Logs
          </button>
        </div>

        {/* Connected Institutions */}
        <div className="bg-white border border-slate-200 rounded-xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-sm text-adha-navy">Connected Institutions</h3>
            <span className="text-[10px] font-mono text-slate-500">{CONNECTED_INSTITUTIONS.length} active nodes</span>
          </div>
          <div className="space-y-2 text-xs">
            {CONNECTED_INSTITUTIONS.map((inst, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-xs border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800 font-sans">{inst.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{inst.location} • {inst.lastSync}</p>
                </div>
                <span className="antd-tag-green text-[10px]">{inst.status}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/institutions')}
            className="w-full mt-2 antd-btn-default py-1.5 justify-center text-xs"
          >
            Manage Institutions
          </button>
        </div>
      </div>
    </div>
  );
}

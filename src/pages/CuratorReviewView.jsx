import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, AlertTriangle, ArrowUpRight, CheckCircle2, Clock, Eye, XCircle } from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';

export default function CuratorReviewView() {
  const navigate = useNavigate();
  const { reviewQueue, handleApproveReview, handleSignOffReview } = useArchive();
  const [activeTab, setActiveTab] = useState('Pending');
  const [auditMessage, setAuditMessage] = useState('');

  const filtered = reviewQueue.filter(item => {
    if (activeTab === 'Pending') return item.status === 'Pending';
    if (activeTab === 'Approved') return item.status === 'Approved' || item.status === 'Signed Off';
    return true;
  });

  const onApprove = (id, title) => {
    handleApproveReview(id);
    setAuditMessage(`Approved ${id}: "${title}"`);
    setTimeout(() => setAuditMessage(''), 3500);
  };

  const onSignOff = (id, title) => {
    handleSignOffReview(id);
    setAuditMessage(`Signed off ${id}: "${title}" into live catalog`);
    setTimeout(() => setAuditMessage(''), 3500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Curator Review & Approval Queue
            </h1>
            <span className="badge-warning font-mono text-[11px]">
              {reviewQueue.filter(r => r.status === 'Pending').length} Pending Audit
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Audit OCR confidence, metadata completeness, entity links, and rights clearances before public catalog indexing.
          </p>
        </div>

        {auditMessage && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium animate-in fade-in flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{auditMessage}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {['Pending', 'Approved', 'All Records'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
              activeTab === tab
                ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Modern Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111A2E] border-b border-slate-200 dark:border-[#23324E] font-mono text-[10.5px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">ACCESSION ID</th>
                <th className="p-3.5">DOCUMENT TITLE</th>
                <th className="p-3.5">AUDIT ISSUE</th>
                <th className="p-3.5">SEVERITY</th>
                <th className="p-3.5">ASSIGNED CURATOR</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No items in this queue tab.
                  </td>
                </tr>
              ) : (
                filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1A263D]/60 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-adha-navy dark:text-blue-300">{item.id}</td>
                    <td className="p-3.5 max-w-sm">
                      <p className="font-serif font-bold text-slate-900 dark:text-white text-xs">{item.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.type} • {item.details}</p>
                    </td>
                    <td className="p-3.5 text-amber-700 dark:text-amber-300 font-medium">
                      {item.issue}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        item.severity === 'High' 
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800' 
                          : item.severity === 'Medium'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">
                      {item.assignedCurator}
                    </td>
                    <td className="p-3.5">
                      <span className={item.status === 'Approved' || item.status === 'Signed Off' ? 'badge-success' : 'badge-warning'}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {item.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onApprove(item.id, item.title)}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 text-[#0F766E] dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" /> Approve
                          </button>
                          <button
                            onClick={() => onSignOff(item.id, item.title)}
                            className="px-2.5 py-1 rounded-lg bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ShieldCheck className="w-3 h-3" /> Sign Off
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          Completed ✓
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';

export default function CuratorReviewView() {
  const navigate = useNavigate();
  const { reviewQueue, handleApproveReview, handleSignOffReview } = useArchive();
  const [activeTab, setActiveTab] = useState('Pending');

  const filtered = reviewQueue.filter(item => {
    if (activeTab === 'Pending') return item.status === 'Pending';
    return item.status !== 'Pending';
  });

  return (
    <div className="space-y-5 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">Curator Review & Approval Queue</h1>
        <p className="text-xs text-slate-600 mt-1">
          Audit OCR confidence, metadata completeness, entity links, and rights clearances before public catalogue indexing.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {['Pending', 'In Review', 'Approved', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-xs text-xs font-semibold font-mono transition-colors ${
              activeTab === tab
                ? 'bg-adha-navy text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[10.5px] text-slate-500 uppercase">
              <th className="p-3">ACCESSION ID</th>
              <th className="p-3">TITLE</th>
              <th className="p-3">ISSUE</th>
              <th className="p-3">SEVERITY</th>
              <th className="p-3">ASSIGNED CURATOR</th>
              <th className="p-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-adha-navy">{item.id}</td>
                <td className="p-3">
                  <p className="font-serif font-bold text-slate-900">{item.title}</p>
                  <p className="text-[10.5px] text-slate-500">{item.details}</p>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 antd-tag-orange">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    {item.issue}
                  </span>
                </td>
                <td className="p-3 font-mono">
                  <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                    item.severity === 'High' ? 'bg-red-100 text-red-800' :
                    item.severity === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.severity}
                  </span>
                </td>
                <td className="p-3 font-medium text-slate-700">{item.assignedCurator}</td>
                <td className="p-3 text-right space-x-2">
                  <button 
                    onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                    className="antd-btn-primary text-[11px] py-1 px-2.5"
                  >
                    Review Record
                  </button>
                  {item.status === 'Pending' ? (
                    <>
                      <button 
                        onClick={() => item.id === 'DOC-V3' ? handleSignOffReview(item.id) : handleApproveReview(item.id)}
                        className="antd-btn-teal text-[11px] py-1 px-2.5"
                      >
                        {item.id === 'DOC-V3' ? 'Sign Off' : 'Approve'}
                      </button>
                      <button className="antd-btn-default text-[11px] py-1 px-2.5">
                        Request Correction
                      </button>
                    </>
                  ) : (
                    <span className="text-emerald-700 font-bold font-mono">✓ {item.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

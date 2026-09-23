import React from 'react';
import { Building2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CONNECTED_INSTITUTIONS } from '../data/mockRecords';

export default function ConnectedInstitutionsView() {
  return (
    <div className="space-y-5 pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">Connected Partner Institutions</h1>
          <p className="text-xs text-slate-600 mt-1">
            Federated node synchronization across state archives, university special collections, and memorial repositories.
          </p>
        </div>
        <button className="antd-btn-primary">
          <RefreshCw className="w-3.5 h-3.5" /> Force Sync All Nodes
        </button>
      </div>

      {/* Dense Institutional Registry Table */}
      <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
              <th className="p-3 font-semibold">INSTITUTION</th>
              <th className="p-3 font-semibold">TYPE</th>
              <th className="p-3 font-semibold">LOCATION</th>
              <th className="p-3 font-semibold">COLLECTIONS</th>
              <th className="p-3 font-semibold">RECORDS</th>
              <th className="p-3 font-semibold">PENDING</th>
              <th className="p-3 font-semibold">ACCESS</th>
              <th className="p-3 font-semibold">LAST SYNC</th>
              <th className="p-3 font-semibold text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CONNECTED_INSTITUTIONS.map((inst, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="p-3">
                  <p className="font-serif font-bold text-slate-900">{inst.name}</p>
                </td>
                <td className="p-3 text-slate-700 font-mono">{inst.type}</td>
                <td className="p-3 text-slate-600 font-mono">{inst.location}</td>
                <td className="p-3 font-mono font-bold text-slate-800">{inst.collections}</td>
                <td className="p-3 font-mono font-bold text-slate-800">{inst.records}</td>
                <td className="p-3">
                  {inst.pending > 0 ? (
                    <span className="antd-tag-orange">{inst.pending}</span>
                  ) : (
                    <span className="antd-tag-green">0</span>
                  )}
                </td>
                <td className="p-3 font-mono text-slate-700">{inst.accessStatus}</td>
                <td className="p-3 font-mono text-slate-600">{inst.lastSync}</td>
                <td className="p-3 text-right">
                  <span className="antd-tag-green flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {inst.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Configure Protocol link */}
      <div className="text-xs text-slate-500 font-mono text-right">
        <button className="text-adha-teal hover:underline font-bold">Configure Sync Protocol →</button>
      </div>
    </div>
  );
}

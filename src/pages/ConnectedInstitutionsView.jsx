import React, { useState } from 'react';
import { 
  Building2, 
  RefreshCw, 
  CheckCircle2, 
  Globe, 
  Server, 
  Activity, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Database,
  Terminal,
  Settings
} from 'lucide-react';
import { CONNECTED_INSTITUTIONS } from '../data/mockRecords';

export default function ConnectedInstitutionsView() {
  const [syncing, setSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');
  const [selectedInst, setSelectedInst] = useState(null);

  const handleForceSync = () => {
    setSyncing(true);
    setSyncNotice('Connecting to federated OAI-PMH endpoints across Delhi, Columbia, London...');

    setTimeout(() => {
      setSyncing(false);
      setSyncNotice('✓ All 6 federated repository nodes successfully synchronized. 42 new metadata records indexed.');
      setTimeout(() => setSyncNotice(''), 4500);
    }, 2200);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Federated Partner Archives & Memorial Nodes
            </h1>
            <span className="badge-teal font-mono text-[11px]">
              OAI-PMH v2.0 Synchronous
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Federated node synchronization across state archives, university special collections, and memorial repositories in India and abroad.
          </p>
        </div>

        <button 
          onClick={handleForceSync}
          disabled={syncing}
          className="px-4 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Synchronizing Cluster...' : 'Force Sync All Nodes'}</span>
        </button>
      </div>

      {syncNotice && (
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 text-[#123B63] dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <Activity className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Node Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Connected Repositories</span>
            <Building2 className="w-4 h-4 text-adha-navy dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            6 Nodes
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All online & responsive
          </p>
        </div>

        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Federated Record Pool</span>
            <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            2,987 Records
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Shared through Dublin Core XML
          </p>
        </div>

        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Average Sync Latency</span>
            <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            24ms
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Fast cross-institution peering
          </p>
        </div>

        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Protocol Compatibility</span>
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            IIIF / OAI
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Full metadata schema compliance
          </p>
        </div>

      </div>

      {/* Dense Institutional Registry Table */}
      <div className="saas-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#111A2E]/50">
          <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
            Federated Institutional Node Registry
          </h3>
          <span className="text-[10px] font-mono text-slate-500">
            Protocols: OAI-PMH v2.0 • IIIF Image API v3.0 • SPARQL 1.1
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111A2E] border-b border-slate-200 dark:border-[#23324E] text-[10.5px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-3.5 font-semibold">INSTITUTION</th>
                <th className="p-3.5 font-semibold">FACILITY TYPE</th>
                <th className="p-3.5 font-semibold">LOCATION</th>
                <th className="p-3.5 font-semibold">COLLECTIONS</th>
                <th className="p-3.5 font-semibold">RECORDS</th>
                <th className="p-3.5 font-semibold">ACCESS STATUS</th>
                <th className="p-3.5 font-semibold">LAST HARVEST</th>
                <th className="p-3.5 font-semibold text-right">CLUSTER NODE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {CONNECTED_INSTITUTIONS.map((inst, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-[#1A263D]/60 transition-colors">
                  <td className="p-3.5">
                    <p className="font-serif font-bold text-slate-900 dark:text-white text-xs">{inst.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Endpoint: https://{inst.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}.gov.in/oai</p>
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 font-mono text-[11px]">{inst.type}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">{inst.location}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-800 dark:text-slate-200">{inst.collections}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-800 dark:text-slate-200">{inst.records}</td>
                  <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                    <span className="badge-primary">{inst.accessStatus}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">{inst.lastSync}</td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <span className="badge-success flex items-center gap-1 justify-end ml-auto">
                      <CheckCircle2 className="w-3 h-3" /> {inst.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

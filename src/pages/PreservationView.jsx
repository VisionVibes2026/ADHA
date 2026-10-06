import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  HardDrive, 
  FileCheck, 
  Clock, 
  Server, 
  Activity, 
  Download, 
  AlertTriangle,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';

export default function PreservationView() {
  const [scrubbing, setScrubbing] = useState(false);
  const [activeLog, setActiveLog] = useState([]);
  const [selectedTier, setSelectedTier] = useState('all');

  const initialLogs = [
    { time: '15:02:18', hash: '9e107d9d372bb6826bd81d3542a419d6dae10d32', status: 'VALID', block: 'BLK-049182', file: 'MS-1936-AOC-Folio-12.tiff' },
    { time: '14:45:01', hash: '8f43c114ae3901b8e43810f2c418290310214a11', status: 'VALID', block: 'BLK-049181', file: 'CAD-1946-DEC-Speech-Draft.pdf' },
    { time: '14:30:22', hash: '3e19a419082bc01481f9a2e38c11928014820a44', status: 'VALID', block: 'BLK-049180', file: 'COL-1916-Castes-India-Print.tiff' },
    { time: '14:15:10', hash: '7c40a182901c238b14a9018e47c19401b81923aa', status: 'VALID', block: 'BLK-049179', file: 'PHOTO-1931-London-RTC-Delegation.raw' },
  ];

  const [logs, setLogs] = useState(initialLogs);

  const handleRunScrubbing = () => {
    setScrubbing(true);
    const newLogs = [
      { time: 'Just now', hash: '0a81f9024c180918b41728c0193481a8b1938a19', status: 'VERIFYING', block: 'BLK-049183', file: 'RTC-1932-Minorities-Memo.tiff' },
      ...logs
    ];
    setLogs(newLogs);

    setTimeout(() => {
      setLogs(prev => prev.map(l => l.block === 'BLK-049183' ? { ...l, status: 'VALID' } : l));
      setScrubbing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              ISO 14721 OAIS Digital Preservation Health
            </h1>
            <span className="badge-success font-mono text-[11px]">
              Merkle Root Anchored
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Continuous bitstream integrity monitoring, fixity scrubbing, and multi-tier geo-replicated preservation vaults.
          </p>
        </div>

        <button 
          onClick={handleRunScrubbing}
          disabled={scrubbing}
          className="px-4 py-2.5 rounded-xl bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${scrubbing ? 'animate-spin' : ''}`} />
          <span>{scrubbing ? 'Recalculating Merkle Hash...' : 'Trigger Parity Scrub'}</span>
        </button>
      </div>

      {/* Storage Architecture Metrics (3 Tiers) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Tier 1 */}
        <div className="saas-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Hot Cache Tier
            </span>
            <span className="badge-primary">NVMe Flash</span>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">5.2 TB / 10 TB</p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '52%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
            <span>Latency: 0.8ms</span>
            <span>IIIF Deep Zoom & Vector Cache</span>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="saas-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Nearline Master AIP
            </span>
            <span className="badge-teal">Ceph Object</span>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">36.0 TB / 80 TB</p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
            <span>Triple Geo-Replicated</span>
            <span>Uncompressed 1200 DPI TIFFs</span>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="saas-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Cold Airgap Vault
            </span>
            <span className="badge-success">LTO-9 Tape</span>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">120.0 TB WORM</p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
            <span>Air-gapped Bunker</span>
            <span>50-Year Magnetic Retention</span>
          </div>
        </div>

      </div>

      {/* Geographic Replication Nodes Grid */}
      <div className="saas-card p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <span>Active Geographic Archival Mirrors</span>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-normal">
            4 / 4 Nodes Synchronous
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { city: 'New Delhi Primary', facility: 'NIC National Datacenter', ping: '12ms', sync: '0s (Master)', status: 'Master' },
            { city: 'Pune Disaster Recovery', facility: 'C-DAC High Performance Lab', ping: '26ms', sync: '0.4s lag', status: 'Replica' },
            { city: 'Hyderabad Vault', facility: 'Airgapped Disaster Recovery Site', ping: '31ms', sync: '1m lag', status: 'Replica' },
            { city: 'Columbia Univ Collaborative', facility: 'Rare Book & Manuscript Library', ping: '142ms', sync: 'Hourly OAI', status: 'Federated' },
          ].map((node, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-xs">{node.city}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{node.facility}</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400">
                <span>RTT: {node.ping}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{node.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Merkle Bitstream Fixity Log Table */}
      <div className="saas-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#111A2E]/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-adha-navy dark:text-blue-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Real-Time SHA-256 Fixity Audit Ledger
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Algorithm: FIPS 180-4 SHA-256
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111A2E] border-b border-slate-200 dark:border-[#23324E] font-mono text-[10.5px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">TIMESTAMP</th>
                <th className="p-3.5">STORAGE BLOCK</th>
                <th className="p-3.5">TARGET FOLIO</th>
                <th className="p-3.5">COMPUTED SHA-256 DIGEST</th>
                <th className="p-3.5 text-right">PARITY VERIFICATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-[#1A263D]/60 transition-colors">
                  <td className="p-3.5 text-slate-500 dark:text-slate-400">{log.time}</td>
                  <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">{log.block}</td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 truncate max-w-xs">{log.file}</td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400">
                    <code>{log.hash.slice(0, 24)}...</code>
                  </td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      log.status === 'VALID' 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse'
                    }`}>
                      {log.status === 'VALID' ? 'PASS ✓' : 'COMPUTING...'}
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

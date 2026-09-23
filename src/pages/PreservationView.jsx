import React, { useState } from 'react';
import { Database, ShieldCheck, CheckCircle2, RefreshCw, HardDrive, FileCheck, Clock } from 'lucide-react';

export default function PreservationView() {
  const [scrubbing, setScrubbing] = useState(false);
  const [logMessage, setLogMessage] = useState(null);

  const handleRunScrubbing = () => {
    setScrubbing(true);
    setLogMessage('Initiating integrity scrub across storage tiers...');
    setTimeout(() => {
      setScrubbing(false);
      setLogMessage('✓ Preservation scrub complete — all records verified against SHA-256 tree. 0 errors.');
    }, 1800);
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">Digital Preservation Health</h1>
          <p className="text-xs text-slate-600 mt-1">
            Bitstream integrity monitors, geographic mirror logs, and cryptographic hash verification.
          </p>
        </div>
        <button 
          onClick={handleRunScrubbing}
          disabled={scrubbing}
          className="antd-btn-primary disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${scrubbing ? 'animate-spin' : ''}`} />
          <span>{scrubbing ? 'Scrubbing...' : 'Run Integrity Scrub'}</span>
        </button>
      </div>

      {logMessage && (
        <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-3 rounded-xs border border-slate-700 flex justify-between items-center">
          <span>{logMessage}</span>
          <button onClick={() => setLogMessage(null)} className="text-slate-400 hover:text-white font-bold ml-3">✕</button>
        </div>
      )}

      {/* Storage, Integrity, Checksum — compact table */}
      <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-base font-serif font-bold text-adha-navy">Storage & Integrity Status</h2>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
              <th className="p-3 font-semibold">PARAMETER</th>
              <th className="p-3 font-semibold">VALUE</th>
              <th className="p-3 font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            <tr>
              <td className="p-3 text-slate-700">Bitstream Capacity</td>
              <td className="p-3 font-bold text-slate-900">41.2 TB / 80 TB (51.5%)</td>
              <td className="p-3"><span className="antd-tag-green">Operational</span></td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Geographic Mirrors</td>
              <td className="p-3 font-bold text-slate-900">4 active mirrors</td>
              <td className="p-3"><span className="antd-tag-green">Synchronized</span></td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Integrity Scrub</td>
              <td className="p-3 font-bold text-slate-900">Last completed: Today at 03:00 IST</td>
              <td className="p-3"><span className="antd-tag-green">100% Pass</span></td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Corrupted Blocks</td>
              <td className="p-3 font-bold text-emerald-700">0 detected</td>
              <td className="p-3"><span className="antd-tag-green">Clean</span></td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Cryptographic Hash Algorithm</td>
              <td className="p-3 font-bold text-slate-900">SHA-256</td>
              <td className="p-3"><span className="antd-tag-green">Verified</span></td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Offsite Tape Mirror</td>
              <td className="p-3 font-bold text-slate-900">Dr. Ambedkar National Memorial Vault</td>
              <td className="p-3"><span className="antd-tag-green">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Version History */}
      <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-base font-serif font-bold text-adha-navy">Version History</h2>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
              <th className="p-3 font-semibold">VERSION</th>
              <th className="p-3 font-semibold">DATE</th>
              <th className="p-3 font-semibold">CHANGE</th>
              <th className="p-3 font-semibold text-right">AUTHOR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            <tr><td className="p-3">v5.2</td><td className="p-3">2024-11-22</td><td className="p-3 font-sans">Updated HTR transcription engine to Tesseract v5.2</td><td className="p-3 text-right">System</td></tr>
            <tr><td className="p-3">v5.1</td><td className="p-3">2024-10-15</td><td className="p-3 font-sans">Added Columbia University federated node sync</td><td className="p-3 text-right">Admin</td></tr>
            <tr><td className="p-3">v5.0</td><td className="p-3">2024-09-01</td><td className="p-3 font-sans">Major schema migration — Dublin Core & MARC21 compliance</td><td className="p-3 text-right">System</td></tr>
          </tbody>
        </table>
      </div>

      {/* Preservation Audit Logs */}
      <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-base font-serif font-bold text-adha-navy">Preservation Event Log</h2>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[10.5px] text-slate-500 uppercase">
              <th className="p-2.5">TIMESTAMP</th>
              <th className="p-2.5">TARGET NODE</th>
              <th className="p-2.5">OPERATION</th>
              <th className="p-2.5">SHA-256 CHECKSUM</th>
              <th className="p-2.5 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {[
              { time: '2024-11-22 03:00:14', node: 'New Delhi Main Node', op: 'Daily Bitrot Scrub', hash: 'a9b2c3d4e5f67890...', status: 'Verified' },
              { time: '2024-11-21 23:45:00', node: 'Ambedkar Memorial Vault', op: 'Offsite Tape Mirror', hash: 'f8e7d6c5b4a39281...', status: 'Verified' },
              { time: '2024-11-21 18:20:10', node: 'Columbia Univ Node', op: 'Federation Hash Sync', hash: '1234567890abcdef...', status: 'Verified' },
            ].map((log, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2.5 text-slate-600">{log.time}</td>
                <td className="p-2.5 font-bold text-slate-800">{log.node}</td>
                <td className="p-2.5 text-slate-700">{log.op}</td>
                <td className="p-2.5 text-slate-500 text-[10px]">{log.hash}</td>
                <td className="p-2.5 text-right">
                  <span className="antd-tag-green">{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

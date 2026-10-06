import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Key, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  UserPlus, 
  Search, 
  MoreVertical, 
  FileCheck,
  ShieldCheck,
  ShieldAlert,
  Terminal
} from 'lucide-react';

export default function AdminRegistryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState('');

  const [curators, setCurators] = useState([
    {
      id: 'USR-001',
      name: 'Prof. R. B. Ambedkar',
      email: 'curator.director@adha.gov.in',
      role: 'Chief Curator & Director',
      badge: 'Admin',
      department: 'National Archival Board',
      clearance: 'Level 4 (Cryptographic Sign-off)',
      keyFingerprint: '9A4F:8821:CC30:5E92',
      status: 'Active',
      lastActive: 'Now'
    },
    {
      id: 'USR-002',
      name: 'Dr. K. G. Ramarao',
      email: 'kg.ramarao@adha.gov.in',
      role: 'Senior Manuscript Conservator',
      badge: 'Editor',
      department: 'Rare Folios & Conservation Lab',
      clearance: 'Level 3 (Metadata & Transliteration)',
      keyFingerprint: '41C0:B792:02E4:D119',
      status: 'Active',
      lastActive: '14m ago'
    },
    {
      id: 'USR-003',
      name: 'P. R. Deshmukh',
      email: 'pr.deshmukh@adha.gov.in',
      role: 'Legal Records Archivist',
      badge: 'Editor',
      department: 'Constituent Assembly Records',
      clearance: 'Level 3 (Gazette Sign-off)',
      keyFingerprint: '76D2:EE49:8812:330F',
      status: 'Active',
      lastActive: '2h ago'
    },
    {
      id: 'USR-004',
      name: 'Ananya S. Kulkarni',
      email: 'ananya.kulkarni@adha.gov.in',
      role: 'AI / OCR Ingestion Specialist',
      badge: 'Specialist',
      department: 'Computational Archival Lab',
      clearance: 'Level 2 (Pipeline Execution)',
      keyFingerprint: '38F1:0091:A123:B544',
      status: 'Active',
      lastActive: '5h ago'
    },
    {
      id: 'USR-005',
      name: 'Prof. Christopher Queen',
      email: 'c.queen@harvard.edu',
      role: 'Visiting Research Fellow',
      badge: 'Viewer',
      department: 'International Scholar Delegation',
      clearance: 'Level 1 (Deep Access & High-Res Scans)',
      keyFingerprint: 'E821:4490:9910:CC44',
      status: 'Active',
      lastActive: '1d ago'
    }
  ]);

  const filteredCurators = curators.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || c.role.includes(filterRole);
    return matchesSearch && matchesRole;
  });

  const handleRevoke = (id, name) => {
    setCurators(prev => prev.filter(c => c.id !== id));
    setNotice(`Credentials revoked for ${name} (${id})`);
    setTimeout(() => setNotice(''), 3500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Archivist Credentials & RBAC Registry
            </h1>
            <span className="badge-primary font-mono text-[11px]">
              {curators.length} Certified Officials
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Role-Based Access Control (RBAC), GPG cryptographic key certification, and security clearance management for repository personnel.
          </p>
        </div>

        {notice && (
          <div className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-medium animate-in fade-in">
            {notice}
          </div>
        )}
      </div>

      {/* Security Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Sessions</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">5 Concurrent</p>
          <p className="text-[11px] text-slate-500 mt-1">mTLS Certificate Authenticated</p>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Dual Sign-off Quorum</span>
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">Enforced</p>
          <p className="text-[11px] text-slate-500 mt-1">All gazetted records require 2 keys</p>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Hardware Tokens (FIDO2)</span>
            <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">100% Issued</p>
          <p className="text-[11px] text-slate-500 mt-1">YubiKey Bio 5.4 certified</p>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Security Audit Log</span>
            <Terminal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">Clean</p>
          <p className="text-[11px] text-slate-500 mt-1">0 unauthorized elevation attempts</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="saas-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search curator name, email, credentials ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="All">All Clearance Levels</option>
            <option value="Chief">Chief Curators</option>
            <option value="Senior">Senior Conservators</option>
            <option value="Legal">Legal Archivists</option>
            <option value="Fellow">Research Fellows</option>
          </select>
        </div>
      </div>

      {/* Registry Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111A2E] border-b border-slate-200 dark:border-[#23324E] font-mono text-[10.5px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">OFFICIAL / CURATOR</th>
                <th className="p-3.5">ROLE & DEPARTMENT</th>
                <th className="p-3.5">CLEARANCE LEVEL</th>
                <th className="p-3.5">GPG KEY FINGERPRINT</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCurators.map((curator) => (
                <tr key={curator.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1A263D]/60 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#123B63] text-white font-bold font-mono text-xs flex items-center justify-center shrink-0">
                        {curator.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white leading-tight">{curator.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{curator.email} • {curator.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{curator.role}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{curator.department}</p>
                  </td>

                  <td className="p-3.5">
                    <span className="badge-primary font-mono text-[11px]">
                      {curator.clearance}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    <code>{curator.keyFingerprint}</code>
                  </td>

                  <td className="p-3.5">
                    <span className="badge-success">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{curator.status}</span>
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleRevoke(curator.id, curator.name)}
                      className="px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors"
                    >
                      Revoke
                    </button>
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

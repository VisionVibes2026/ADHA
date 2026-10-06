import React, { useState } from 'react';
import { 
  Settings, 
  Server, 
  Database, 
  ShieldCheck, 
  Key, 
  Globe, 
  Save, 
  CheckCircle2, 
  RefreshCw,
  HardDrive,
  Cpu,
  Layers,
  Copy,
  Check
} from 'lucide-react';

export default function SystemSettingsView() {
  const [activeTab, setActiveTab] = useState('oais'); // 'oais' | 'api' | 'iiif' | 'security'
  const [fixityInterval, setFixityInterval] = useState('daily');
  const [rateLimit, setRateLimit] = useState(120);
  const [ocrEngine, setOcrEngine] = useState('tesseract-v5.2-neural');
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const apiKey = 'adha_live_sec_99f2b8a7c10447d28e019ab928c';

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Institutional System Parameters
            </h1>
            <span className="badge-teal font-mono text-[11px]">
              Production Node DL-01
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Configure ISO 14721 OAIS repository parameters, IIIF endpoints, API tokens, and automated fixity scrubbing schedules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Policy Parameters</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>System configuration successfully anchored and propagated across cluster nodes!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#23324E] pb-2">
        {[
          { id: 'oais', label: 'ISO 14721 OAIS Preservation', icon: Database },
          { id: 'iiif', label: 'IIIF v3.0 & OAI-PMH Protocols', icon: Globe },
          { id: 'api', label: 'API Keys & Rate Limiting', icon: Key },
          { id: 'security', label: 'Cryptographic Security & Merkle Tree', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: OAIS Preservation Settings */}
      {activeTab === 'oais' && (
        <div className="space-y-5">
          <div className="saas-card p-6 space-y-5">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              OAIS Archival Information Package (AIP) Retention Policy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="font-semibold text-slate-800 dark:text-slate-200">
                  Automated Merkle Hash Fixity Scrub Schedule
                </label>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Specifies the cycle frequency for SHA-256 bitstream corruption checks.
                </p>
                <select
                  value={fixityInterval}
                  onChange={(e) => setFixityInterval(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] text-xs font-medium text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="hourly">Continuous (Hourly Background Daemon)</option>
                  <option value="daily">Daily at 03:00 IST (Recommended)</option>
                  <option value="weekly">Weekly Full Parity Check</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-800 dark:text-slate-200">
                  Primary OCR & Handwriting Recognition (HTR) Engine
                </label>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Multilingual neural models trained on archival Modi, Devanagari, and colonial English type.
                </p>
                <select
                  value={ocrEngine}
                  onChange={(e) => setOcrEngine(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] text-xs font-medium text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="tesseract-v5.2-neural">Neural Tesseract 5.2.0 (Custom Indic Archival Weightings)</option>
                  <option value="trocr-base-printed">TrOCR Transformer Base (Handwriting Transliteration)</option>
                  <option value="paddle-ocr-multilingual">PaddleOCR Multilingual Mobile v4</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] text-xs space-y-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Physical Storage Geographies</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white">New Delhi (NIC Main)</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Tier-4 Datacenter • Active Primary</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white">Pune (CDAC Replica)</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Synchronous Mirror • 0ms lag</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white">Hyderabad (Cold Tape)</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">LTO-9 Airgapped Tape Vault</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: IIIF & OAI-PMH Protocol Settings */}
      {activeTab === 'iiif' && (
        <div className="saas-card p-6 space-y-5">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Open Standards & Interoperability Endpoints
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">IIIF Image & Presentation API v3.0</span>
                <span className="badge-success">Active Endpoint</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Enables deep-zoom inspection in Mirador, Universal Viewer, and digital scholarship tools worldwide.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                https://adha.gov.in/api/iiif/v3/manifest/&#123;accession_id&#125;.json
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">OAI-PMH v2.0 Harvester Target</span>
                <span className="badge-primary">Open Metadata Harvester</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Open Archives Initiative Protocol for Metadata Harvesting used by Columbia University and British Library.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                https://adha.gov.in/oai/request?verb=Identify
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: API Keys */}
      {activeTab === 'api' && (
        <div className="saas-card p-6 space-y-5">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Academic & Partner Institution API Access
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <label className="font-semibold text-slate-800 dark:text-slate-200">
                Active Repository API Secret Token
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] font-mono text-slate-800 dark:text-slate-200 text-xs">
                  {apiKey}
                </div>
                <button
                  onClick={handleCopyKey}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1A263D] hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-slate-800 dark:text-slate-200">
                Scholarly Query Rate Limit (Requests per minute)
              </label>
              <input
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(Number(e.target.value))}
                className="w-44 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
              />
              <p className="text-[11px] text-slate-500">Tier 1 institutional research throughput threshold.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Security */}
      {activeTab === 'security' && (
        <div className="saas-card p-6 space-y-4 text-xs">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Cryptographic Integrity & Digital Timestamping
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Every ingested folio is hashed with SHA-256 and aggregated into an hourly Merkle Root. The Merkle root is anchored into the National Informatics Centre digital notary ledger to guarantee immutability against historical tampering.
          </p>
          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl space-y-1">
            <p>ROOT HASH: 0x9b14f828a1c900e2384a1e944bf29041a77e1c8d8b99201a4e5021fa</p>
            <p>ALGORITHM: NIST FIPS 180-4 SHA-256 • ECC secp256k1</p>
            <p>LAST TIME-STAMP CERT: 2026-10-01T15:00:00Z (NIC-CERT-VALIDATED)</p>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Image as ImageIcon, 
  Volume2, 
  Users, 
  ArrowUpRight, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  UploadCloud,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';
import { useArchive } from '../context/ArchiveContext';

// Import local assets
import heroPortrait from '../assets/hero_portrait.png';
import thumbArchiveBooks from '../assets/thumb_archive_books.png';
import thumbKnowledgeGraph from '../assets/thumb_knowledge_graph.png';
import thumbTimelineNodes from '../assets/thumb_timeline_nodes.png';
import thumbAiAssistant from '../assets/thumb_ai_assistant.png';

// Chart sample data for Digitization trends
const INGESTION_TREND_DATA = [
  { month: 'Jan', digitized: 420, verified: 390, citations: 210 },
  { month: 'Feb', digitized: 580, verified: 510, citations: 340 },
  { month: 'Mar', digitized: 890, verified: 780, citations: 520 },
  { month: 'Apr', digitized: 1120, verified: 990, citations: 680 },
  { month: 'May', digitized: 1450, verified: 1280, citations: 910 },
  { month: 'Jun', digitized: 1780, verified: 1590, citations: 1140 },
  { month: 'Jul', digitized: 2150, verified: 1980, citations: 1420 },
];

// Category breakdown data
const CATEGORY_DATA = [
  { category: 'Monographs & Books', count: 1840, target: 2000 },
  { category: 'Legislative Speeches', count: 1260, target: 1500 },
  { category: 'Manuscript Folios', count: 980, target: 1200 },
  { category: 'Correspondence', count: 740, target: 900 },
  { category: 'Rare Photographs', count: 520, target: 600 },
  { category: 'Audio Recordings', count: 320, target: 450 },
];

export default function DashboardView() {
  const navigate = useNavigate();
  const { reviewQueue, theme, setIsCommandOpen } = useArchive();
  const [trendPeriod, setTrendPeriod] = useState('7m');

  const pendingReviewCount = reviewQueue.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-8 font-sans pb-12">
      
      {/* 1. Hero Showcase Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#123B63] via-[#0E2C4B] to-[#091C30] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-white/10">
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-teal-300 border border-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              National Archival Intelligence Repository • SIH26096
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              Preserve. Connect. Inspire.
            </h1>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Explore the critical writings, constitutional debates, letters, and rare archival audio of 
              <strong className="text-white font-semibold"> Dr. B. R. Ambedkar </strong> 
              through deep AI semantic discovery, OCR transcription, and high-fidelity knowledge graphs.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/archive')}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all shadow-sm hover:shadow inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Master Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/research-assistant')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all border border-white/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Research Assistant</span>
              </button>

              <button
                onClick={() => setIsCommandOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-all border border-white/10 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
                <span>Command Menu</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Portrait & Quote */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <div className="relative w-64 sm:w-72 lg:w-80 h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/20 bg-white/5 shadow-2xl">
              <img 
                src={heroPortrait} 
                alt="Dr. B. R. Ambedkar Archival Portrait" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091C30] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-xs italic font-serif text-slate-200">
                  “Life should be great rather than long.”
                </p>
                <p className="text-[10px] font-sans font-semibold text-teal-300 uppercase tracking-wider mt-0.5">
                  Dr. B. R. Ambedkar • 1891–1956
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stat KPI Cards Grid (4 Cards with Linear/Stripe styling) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Documents */}
        <div 
          onClick={() => navigate('/archive')}
          className="saas-card-interactive p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#123B63] dark:text-blue-300 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/40 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="badge-success">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Indexed Documents
            </p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              5,428
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span>Writings, speeches, legal drafts</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Rare Photographs & Scans */}
        <div 
          onClick={() => navigate('/archive?type=Photograph')}
          className="saas-card-interactive p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/40 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="badge-success">
              <ArrowUpRight className="w-3 h-3" /> +8.5%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Photographic Folios
            </p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              1,236
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              High-res silver gelatin & press scans
            </p>
          </div>
        </div>

        {/* KPI 3: Audio & Oral History */}
        <div 
          onClick={() => navigate('/archive?type=Audio')}
          className="saas-card-interactive p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center border border-amber-200/50 dark:border-amber-800/40 group-hover:scale-105 transition-transform">
              <Volume2 className="w-5 h-5" />
            </div>
            <span className="badge-primary">
              <ArrowUpRight className="w-3 h-3" /> +5.1%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Audio & Speeches
            </p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              423 hrs
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              BBC, AIR, & Parliament debates
            </p>
          </div>
        </div>

        {/* KPI 4: Historical Entities in Graph */}
        <div 
          onClick={() => navigate('/knowledge-graph')}
          className="saas-card-interactive p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-300 flex items-center justify-center border border-teal-200/50 dark:border-teal-800/40 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="badge-teal">
              <TrendingUp className="w-3 h-3" /> 98.4% linked
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Knowledge Graph Entities
            </p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              3,840
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Leaders, movements, bills & treaties
            </p>
          </div>
        </div>

      </div>

      {/* 3. Interactive Analytics & Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Archival Growth & Verification Trends (7 Cols) */}
        <div className="lg:col-span-7 saas-card p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Archival Ingestion & Verification Velocity
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Cumulative historical items scanned, OCR transcribed, and curator verified
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#1A263D] p-0.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
              {['3m', '7m', '1y'].map(period => (
                <button
                  key={period}
                  onClick={() => setTrendPeriod(period)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    trendPeriod === period 
                      ? 'bg-white dark:bg-[#151F32] text-slate-900 dark:text-white font-semibold shadow-xs' 
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INGESTION_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDigitized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#123B63" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#123B63" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#23324E' : '#E2E8F0'} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke={theme === 'dark' ? '#64748B' : '#94A3B8'} 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#64748B' : '#94A3B8'} 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#151F32' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#23324E' : '#E2E8F0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: theme === 'dark' ? '#F1F5F9' : '#0F172A' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="digitized" 
                  name="Digitized Items" 
                  stroke="#123B63" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorDigitized)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="verified" 
                  name="Curator Verified" 
                  stroke="#0F766E" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorVerified)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#123B63]" />
              <span>Digitized Artifacts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#0F766E]" />
              <span>Curator Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">92.1% Accuracy</span>
            </div>
          </div>
        </div>

        {/* Right Chart: Category Distribution (5 Cols) */}
        <div className="lg:col-span-5 saas-card p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Collection Distribution
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Item count by archival medium & legal status
                </p>
              </div>
              <button 
                onClick={() => navigate('/archive')}
                className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View Catalog <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_DATA} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme === 'dark' ? '#23324E' : '#E2E8F0'} />
                  <XAxis type="number" stroke={theme === 'dark' ? '#64748B' : '#94A3B8'} fontSize={10} tickLine={false} />
                  <YAxis dataKey="category" type="category" stroke={theme === 'dark' ? '#64748B' : '#94A3B8'} fontSize={10} width={110} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#151F32' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#23324E' : '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px'
                    }}
                  />
                  <Bar dataKey="count" fill="#123B63" radius={[0, 4, 4, 0]} name="Archived Items" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Catalog Volume: <strong className="text-slate-900 dark:text-white font-mono">5,660</strong> items</span>
            <span className="badge-teal">Active Repository</span>
          </div>
        </div>

      </div>

      {/* 4. Curator Review Queue & Ingestion Status Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pending Curator Queue (8 cols) */}
        <div className="lg:col-span-8 saas-card p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Archivist Verification Queue
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pendingReviewCount} items requiring expert transcribing validation
                </p>
              </div>
            </div>
            <Link 
              to="/review" 
              className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open Full Queue <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
            {reviewQueue.slice(0, 4).map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#1A263D]/50 px-2 rounded-lg transition-colors">
                <div className="min-w-0 flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 shrink-0">
                    {item.id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {item.details} • <span className="text-amber-600 dark:text-amber-400 font-medium">{item.issue}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                    item.severity === 'High' 
                      ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-800' 
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  }`}>
                    {item.severity}
                  </span>
                  <button 
                    onClick={() => navigate('/review')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Review record"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Ingestion & Archival Engine Status (4 cols) */}
        <div className="lg:col-span-4 saas-card p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <UploadCloud className="w-4 h-4 text-adha-teal dark:text-teal-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Archival Ingestion Engine
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A263D] border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span>OCR Pipeline Status</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Operational
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: '84%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Queue: 14 folios</span>
                  <span>Throughput: 120 pgs/hr</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A263D] border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span>Multilingual Indexer</span>
                  <span className="badge-primary">English / Marathi / Hindi</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Automatic cross-script transliteration and named-entity recognition active.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => navigate('/ingestion')}
              className="w-full py-2.5 rounded-xl bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Ingest New Manuscript Batch</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5. Interactive Explorer Cards (Archive, Knowledge Graph, Timeline, AI Assistant) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-bold text-slate-900 dark:text-white">
              Explore Archival Dimensions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive modes to investigate Dr. Ambedkar's historical legacy
            </p>
          </div>
          <Link 
            to="/archive" 
            className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            All Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Master Archive */}
          <div 
            onClick={() => navigate('/archive')}
            className="saas-card-interactive overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-36 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
              <img 
                src={thumbArchiveBooks} 
                alt="Archive Collections" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                5,428 Items
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-xs">Master Archive Catalog</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Filter by era, medium, script and verification status.</p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-[#123B63] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Knowledge Graph */}
          <div 
            onClick={() => navigate('/knowledge-graph')}
            className="saas-card-interactive overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-36 overflow-hidden bg-slate-950 relative">
              <img 
                src={thumbKnowledgeGraph} 
                alt="Knowledge Graph" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-900/80 text-teal-200 backdrop-blur-sm border border-teal-500/30">
                Connected Nodes
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-xs">Knowledge Graph</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Explore relationships between historical entities and debates.</p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-[#123B63] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Timeline */}
          <div 
            onClick={() => navigate('/timeline')}
            className="saas-card-interactive overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-36 overflow-hidden bg-slate-900 relative">
              <img 
                src={thumbTimelineNodes} 
                alt="Historical Timeline" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-900/80 text-blue-200 backdrop-blur-sm border border-blue-500/30">
                1891 – 1956
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-xs">Historical Timeline</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Chronological milestones across key biographical eras.</p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-[#123B63] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 4: AI Research Assistant */}
          <div 
            onClick={() => navigate('/research-assistant')}
            className="saas-card-interactive overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-36 overflow-hidden bg-[#0A1628] relative">
              <img 
                src={thumbAiAssistant} 
                alt="AI Assistant" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/80 text-white backdrop-blur-sm border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> RAG Powered
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-xs">AI Research Assistant</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Ask questions and generate citations backed by original folios.</p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-[#123B63] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Database, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Download,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useArchive } from '../context/ArchiveContext';

const COLORS = ['#123B63', '#0F766E', '#F97316', '#8B5CF6', '#10B981', '#EC4899'];

const ERA_DATA = [
  { era: '1916–1925', count: 18, label: 'Columbia & LSE Formative' },
  { era: '1926–1935', count: 32, label: 'Mahad & Round Table Conf' },
  { era: '1936–1945', count: 48, label: 'Annihilation & Labour Dept' },
  { era: '1946–1956', count: 64, label: 'Constitution & Deekshabhoomi' },
];

export default function AnalyticsView() {
  const { records, theme } = useArchive();
  const [activeMetricTab, setActiveMetricTab] = useState('distribution');

  // Derive category data
  const categoryMap = records.reduce((acc, r) => {
    const cat = r.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // Language data
  const langMap = records.reduce((acc, r) => {
    const lang = (r.language || 'English').split(' / ')[0];
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const languageData = Object.entries(langMap).map(([language, count]) => ({ language, count }));

  // Medium data
  const mediumMap = records.reduce((acc, r) => {
    const m = r.type || 'Monograph';
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {});

  const mediumData = Object.entries(mediumMap).map(([medium, count]) => ({ medium, count }));

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Archival Analytics & Statistical Intelligence
            </h1>
            <span className="badge-primary font-mono text-[11px]">
              Live Corpus Metrics
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Quantitative analysis of holdings across historical epochs, linguistic mediums, and institutional partners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>OAIS Corpus Verified</span>
          </span>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Master Records</span>
            <Database className="w-4 h-4 text-adha-navy dark:text-blue-400" />
          </div>
          <p className="text-3xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            5,428
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% catalogued this quarter
          </p>
        </div>

        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Multilingual Scripts</span>
            <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-3xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            5 Scripts
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            English, Marathi, Devanagari, Pali, Gujarati
          </p>
        </div>

        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Historical Span</span>
            <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-3xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            40 Years
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            1916 (Columbia Thesis) – 1956 (Nagpur)
          </p>
        </div>

        <div className="saas-card p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Verification Ratio</span>
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-3xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            96.8%
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Curator verified with OCR bounding tags
          </p>
        </div>

      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Category Distribution (Donut / Pie) (6 cols) */}
        <div className="lg:col-span-6 saas-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Holdings Composition by Category
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Proportional share across parliamentary debates, monographs & folios
                </p>
              </div>
              <PieIcon className="w-4 h-4 text-slate-400" />
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#151F32' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#23324E' : '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Primary Focus: Legislative Debates & Monographs</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">100% Indexed</span>
          </div>
        </div>

        {/* Chart 2: Historical Epoch Velocity (6 cols) */}
        <div className="lg:col-span-6 saas-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Chronological Epoch Density
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Density of indexed works across key biographical milestones
                </p>
              </div>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ERA_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#23324E' : '#E2E8F0'} />
                  <XAxis dataKey="era" stroke={theme === 'dark' ? '#64748B' : '#94A3B8'} fontSize={11} tickLine={false} />
                  <YAxis stroke={theme === 'dark' ? '#64748B' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#151F32' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#23324E' : '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" name="Archived Publications" fill="#0F766E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Peak Activity: 1946–1956 Drafting Assembly & Dhamma Tour</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">Highest Volume Era</span>
          </div>
        </div>

      </div>

      {/* Script & Format Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language scripts */}
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Linguistic Medium Distribution
          </h3>
          <div className="space-y-3">
            {languageData.map(item => (
              <div key={item.language} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-800 dark:text-slate-200">{item.language}</span>
                  <span className="font-mono text-slate-500">{item.count} documents</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#123B63] dark:bg-blue-600 h-full rounded-full" 
                    style={{ width: `${Math.min((item.count / records.length) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Breakdown */}
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Physical Archival Formats
          </h3>
          <div className="space-y-3">
            {mediumData.slice(0, 5).map(item => (
              <div key={item.medium} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-800 dark:text-slate-200">{item.medium}</span>
                  <span className="font-mono text-slate-500">{item.count} items</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#0F766E] h-full rounded-full" 
                    style={{ width: `${Math.min((item.count / records.length) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  Table as TableIcon, 
  Clock, 
  Download, 
  CheckCircle2, 
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';

export default function ArchiveView() {
  const navigate = useNavigate();
  const { 
    records, 
    searchQuery, 
    setSearchQuery,
    activeTab, 
    setActiveTab,
    selectedType,
    setSelectedType,
    selectedSpan,
    setSelectedSpan,
    selectedScript,
    setSelectedScript,
    verifiedOnly,
    setVerifiedOnly,
    viewMode,
    setViewMode
  } = useArchive();

  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedItems, setSelectedItems] = useState([]);

  // Filter records
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.language.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = 
      activeTab === 'All' || 
      (activeTab === 'Writings & Speeches' && record.category === 'Writings & Speeches') ||
      (activeTab === 'Constituent Assembly Debates' && record.category === 'Constituent Assembly Debates') ||
      (activeTab === 'Legal Manuscripts' && record.category === 'Legal Manuscripts');

    const matchesType = selectedType === 'All Artifacts' || record.type.includes(selectedType);
    const matchesVerified = !verifiedOnly || record.verified;

    return matchesSearch && matchesTab && matchesType && matchesVerified;
  });

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Derive tab counts from actual data
  const tabCounts = {
    'All': records.length,
    'Writings & Speeches': records.filter(r => r.category === 'Writings & Speeches').length,
    'Constituent Assembly Debates': records.filter(r => r.category === 'Constituent Assembly Debates').length,
    'Legal Manuscripts': records.filter(r => r.category === 'Legal Manuscripts').length,
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">
          Digital Archive Repository
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Browse, filter, and examine digitized historical records held within the ADHA repository.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xs p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, person, subject, accession ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xs text-xs focus:outline-none focus:border-adha-navy focus:bg-white text-slate-800"
            />
          </div>

          {/* Type Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xs">
            <span className="text-[10px] font-mono font-bold text-slate-500">TYPE:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 outline-none text-xs cursor-pointer"
            >
              <option value="All Artifacts">All Types</option>
              <option value="Printed Monograph">Monograph</option>
              <option value="Academic Thesis">Thesis</option>
              <option value="Parliamentary Record">Parliamentary</option>
              <option value="Legal Memorandum">Legal</option>
              <option value="Annotated Manuscript">Manuscript</option>
              <option value="Audio Recording">Audio</option>
            </select>
          </div>

          {/* Date Span */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xs">
            <span className="text-[10px] font-mono font-bold text-slate-500">DATE:</span>
            <select
              value={selectedSpan}
              onChange={(e) => setSelectedSpan(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 outline-none text-xs cursor-pointer"
            >
              <option value="1916 – 1956">1916 – 1956</option>
              <option value="1916 – 1925">1916 – 1925</option>
              <option value="1926 – 1935">1926 – 1935</option>
              <option value="1936 – 1945">1936 – 1945</option>
              <option value="1946 – 1956">1946 – 1956</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xs">
            <span className="text-[10px] font-mono font-bold text-slate-500">LANG:</span>
            <select
              value={selectedScript}
              onChange={(e) => setSelectedScript(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 outline-none text-xs cursor-pointer"
            >
              <option value="All Scripts">All</option>
              <option value="English">English</option>
              <option value="Marathi">Marathi</option>
              <option value="Hindustani">Hindustani</option>
              <option value="Pali Gloss">Pali</option>
            </select>
          </div>

          {/* Verified */}
          <label className="flex items-center gap-1.5 cursor-pointer font-mono font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xs hover:bg-slate-100 transition-colors text-xs">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded border-slate-300 text-adha-navy focus:ring-adha-navy"
            />
            <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" /> Verified
          </label>
        </div>

        {/* Category Tabs & View Switcher */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {Object.entries(tabCounts).map(([id, count]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-3 py-1 rounded-xs text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === id
                    ? 'bg-adha-navy text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {id} ({count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xs border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2 py-1 rounded-xs text-xs font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-white text-adha-navy font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Table
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2 py-1 rounded-xs text-xs font-semibold transition-colors ${
                viewMode === 'grid' ? 'bg-white text-adha-navy font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Grid
            </button>
          </div>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 px-1">
        <span>
          Showing <strong>{filteredRecords.length}</strong> of <strong>{records.length}</strong> records in sample dataset
        </span>
        <button 
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-1 font-bold text-slate-800 hover:text-adha-navy bg-white border border-slate-200 px-2 py-0.5 rounded-xs"
        >
          Date {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="p-2.5 w-8 text-center">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredRecords.map(r => r.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                      checked={selectedItems.length === filteredRecords.length && filteredRecords.length > 0}
                    />
                  </th>
                  <th className="p-2.5 font-semibold">ACCESSION ID</th>
                  <th className="p-2.5 font-semibold">DOCUMENT</th>
                  <th className="p-2.5 font-semibold">DATE</th>
                  <th className="p-2.5 font-semibold">FORMAT</th>
                  <th className="p-2.5 font-semibold">LANGUAGE</th>
                  <th className="p-2.5 font-semibold">COLLECTION</th>
                  <th className="p-2.5 font-semibold">INSTITUTION</th>
                  <th className="p-2.5 font-semibold text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/90 transition-colors group">
                    <td className="p-2.5 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedItems.includes(record.id)}
                        onChange={() => toggleSelectItem(record.id)}
                      />
                    </td>
                    <td className="p-2.5 font-mono font-bold text-adha-navy whitespace-nowrap">{record.id}</td>
                    <td className="p-2.5 max-w-sm">
                      <Link 
                        to={`/documents/${record.id}`} 
                        className="font-serif text-[13px] font-bold text-slate-900 hover:text-adha-navy hover:underline leading-snug block"
                      >
                        {record.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans line-clamp-1">{record.subtitle}</p>
                    </td>
                    <td className="p-2.5">
                      <p className="font-mono text-slate-800 whitespace-nowrap">{record.date}</p>
                      <p className="text-[10px] text-slate-500">{record.location}</p>
                    </td>
                    <td className="p-2.5">
                      <p className="text-slate-800">{record.type}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{record.medium}</p>
                    </td>
                    <td className="p-2.5 font-mono text-slate-700 whitespace-nowrap">{record.language}</td>
                    <td className="p-2.5 text-slate-700">{record.category}</td>
                    <td className="p-2.5 text-slate-700">{record.institution}</td>
                    <td className="p-2.5 text-right">
                      <span className={record.verificationState === 'Verified' ? 'antd-tag-green' : 'antd-tag-orange'}>
                        {record.verificationState}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer & Pagination */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-600 font-mono">
              <span>Showing <strong>1–{filteredRecords.length}</strong> of <strong>{records.length}</strong></span>
              <div className="flex items-center gap-1">
                <span>Per page:</span>
                <select className="bg-white border border-slate-300 rounded-xs px-1.5 py-0.5 text-xs font-mono">
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-300 rounded-xs bg-white overflow-hidden text-xs font-mono font-semibold">
                <button className="p-1.5 hover:bg-slate-100 border-r border-slate-200 text-slate-600"><ChevronLeft className="w-3.5 h-3.5" /></button>
                <button className="px-3 py-1 bg-adha-navy text-white">1</button>
                <button className="p-1.5 hover:bg-slate-100 text-slate-600"><ChevronRight className="w-3.5 h-3.5" /></button>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1 bg-slate-100 border border-slate-300 rounded-xs hover:bg-slate-200 font-semibold text-slate-700 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Export Catalogue
                </button>
                <button className="px-3 py-1 bg-slate-100 border border-slate-300 rounded-xs hover:bg-slate-200 font-semibold text-slate-700">
                  Finding Aid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRecords.map(record => (
            <div key={record.id} className="bg-white border border-slate-200 rounded-xs p-4 flex flex-col justify-between hover:border-adha-navy transition-colors">
              <div>
                <div className="archival-scan-bg h-32 rounded-xs border border-slate-300 flex items-center justify-center p-2 relative mb-3">
                  <div className="w-full h-full bg-amber-50 border border-amber-900/30 p-2 text-[8px] font-serif text-amber-950 flex flex-col justify-between">
                    <p className="font-bold text-[8px] border-b border-amber-900/20 pb-0.5">{record.type}</p>
                    <p className="italic font-bold text-[8.5px] leading-tight text-amber-900 line-clamp-2">{record.title}</p>
                    <p className="text-[7px] font-mono text-slate-600">{record.date}</p>
                  </div>
                  <span className="absolute top-1.5 right-1.5 bg-slate-900 text-white font-mono text-[8px] px-1 py-0.5 rounded-xs">
                    {record.year}
                  </span>
                </div>
                <p className="font-mono text-[10px] font-bold text-adha-navy">{record.id}</p>
                <h3 className="font-serif font-bold text-[13px] text-slate-900 leading-tight mt-1 line-clamp-2">{record.title}</h3>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{record.institution}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs border ${
                  record.verificationState === 'Verified' 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}>
                  {record.verificationState}
                </span>
                <button 
                  onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                  className="text-xs font-semibold text-adha-teal hover:underline"
                >
                  Inspect →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

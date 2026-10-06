import React, { useState, useMemo } from 'react';
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
  ChevronRight,
  Eye,
  X,
  FileText,
  Sparkles,
  ExternalLink,
  BookOpen,
  Share2,
  Calendar,
  Layers,
  Check
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import CitationModal from '../components/common/CitationModal';

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
  const [sortField, setSortField] = useState('date');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inspectDrawerRecord, setInspectDrawerRecord] = useState(null);
  const [citationModalRecord, setCitationModalRecord] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [exportNotice, setExportNotice] = useState('');

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        record.title?.toLowerCase().includes(q) ||
        record.id?.toLowerCase().includes(q) ||
        record.subtitle?.toLowerCase().includes(q) ||
        record.language?.toLowerCase().includes(q) ||
        record.institution?.toLowerCase().includes(q);

      const matchesTab = 
        activeTab === 'All' || 
        (activeTab === 'Writings & Speeches' && record.category === 'Writings & Speeches') ||
        (activeTab === 'Constituent Assembly Debates' && record.category === 'Constituent Assembly Debates') ||
        (activeTab === 'Legal Manuscripts' && record.category === 'Legal Manuscripts');

      const matchesType = selectedType === 'All Artifacts' || record.type?.includes(selectedType);
      const matchesVerified = !verifiedOnly || record.verified || record.verificationState === 'Verified';

      return matchesSearch && matchesTab && matchesType && matchesVerified;
    }).sort((a, b) => {
      if (sortField === 'date') {
        const yearA = parseInt(a.year || '1900', 10);
        const yearB = parseInt(b.year || '1900', 10);
        return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
      }
      if (sortField === 'title') {
        return sortOrder === 'asc' 
          ? (a.title || '').localeCompare(b.title || '')
          : (b.title || '').localeCompare(a.title || '');
      }
      return 0;
    });
  }, [records, searchQuery, activeTab, selectedType, verifiedOnly, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredRecords.map(r => r.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Derive tab counts from actual data
  const tabCounts = {
    'All': records.length,
    'Writings & Speeches': records.filter(r => r.category === 'Writings & Speeches').length,
    'Constituent Assembly Debates': records.filter(r => r.category === 'Constituent Assembly Debates').length,
    'Legal Manuscripts': records.filter(r => r.category === 'Legal Manuscripts').length,
  };

  // Export functions
  const handleExportCSV = () => {
    const itemsToExport = selectedItems.length > 0 
      ? records.filter(r => selectedItems.includes(r.id))
      : filteredRecords;

    const headers = ['Accession_ID', 'Title', 'Date', 'Medium', 'Language', 'Category', 'Institution', 'Status'];
    const rows = itemsToExport.map(r => [
      `"${r.id}"`,
      `"${(r.title || '').replace(/"/g, '""')}"`,
      `"${r.date || ''}"`,
      `"${r.medium || r.type || ''}"`,
      `"${r.language || ''}"`,
      `"${r.category || ''}"`,
      `"${(r.institution || '').replace(/"/g, '""')}"`,
      `"${r.verificationState || 'Verified'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adha-catalog-export-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Exported ${itemsToExport.length} records to CSV!`);
    setTimeout(() => setExportNotice(''), 4000);
  };

  const handleExportJSON = () => {
    const itemsToExport = selectedItems.length > 0 
      ? records.filter(r => selectedItems.includes(r.id))
      : filteredRecords;

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(itemsToExport, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `adha-catalog-export-${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Exported ${itemsToExport.length} records to JSON!`);
    setTimeout(() => setExportNotice(''), 4000);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Master Archival Catalog
            </h1>
            <span className="badge-primary font-mono text-[11px]">
              {records.length} Holdings
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Browse, filter, examine, and export verified manuscripts, speeches, legislative debates, and photographs.
          </p>
        </div>

        {/* Global Export & Action buttons */}
        <div className="flex items-center gap-2">
          {exportNotice && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
              {exportNotice}
            </span>
          )}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#151F32] hover:bg-slate-50 dark:hover:bg-[#1A263D] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#151F32] hover:bg-slate-50 dark:hover:bg-[#1A263D] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Filter & Search Box */}
      <div className="saas-card p-4 sm:p-5 space-y-4">
        
        {/* Top Controls Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, person, subject, accession ID, institution..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Medium / Type Selector */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] px-3 py-2 rounded-xl">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">TYPE:</span>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 dark:text-slate-200 outline-none text-xs cursor-pointer"
            >
              <option value="All Artifacts">All Artifacts</option>
              <option value="Printed Monograph">Printed Monograph</option>
              <option value="Academic Thesis">Academic Thesis</option>
              <option value="Parliamentary Record">Parliamentary Record</option>
              <option value="Legal Memorandum">Legal Memorandum</option>
              <option value="Annotated Manuscript">Annotated Manuscript</option>
              <option value="Audio Recording">Audio Recording</option>
            </select>
          </div>

          {/* Date Span */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] px-3 py-2 rounded-xl">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">ERA:</span>
            <select
              value={selectedSpan}
              onChange={(e) => {
                setSelectedSpan(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-medium text-slate-700 dark:text-slate-200 outline-none text-xs cursor-pointer"
            >
              <option value="1916 – 1956">1916 – 1956 (All Eras)</option>
              <option value="1916 – 1925">1916 – 1925 (Early Formative)</option>
              <option value="1926 – 1935">1926 – 1935 (Mahad & RTC)</option>
              <option value="1936 – 1945">1936 – 1945 (Annihilation & Labour)</option>
              <option value="1946 – 1956">1946 – 1956 (Constitution & Dhamma)</option>
            </select>
          </div>

          {/* Verified Toggle */}
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1A263D] transition-colors select-none">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => {
                setVerifiedOnly(e.target.checked);
                setCurrentPage(1);
              }}
              className="rounded border-slate-300 dark:border-slate-600 text-adha-navy focus:ring-blue-500"
            />
            <span className="flex items-center gap-1 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" /> Verified Only
            </span>
          </label>

        </div>

        {/* Category Tabs & View Switcher */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {Object.entries(tabCounts).map(([id, count]) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === id
                    ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1A263D] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {id} <span className="ml-1 opacity-70 font-mono text-[11px]">({count})</span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Table or Grid */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#1A263D] p-1 rounded-xl border border-slate-200 dark:border-[#23324E] shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-[#151F32] text-[#123B63] dark:text-white shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> 
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-[#151F32] text-[#123B63] dark:text-white shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> 
              <span>Grid</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. Batch Selection Toolbar (When items selected) */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 dark:bg-[#15233C] border border-blue-200 dark:border-blue-900 rounded-xl p-3 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#123B63] dark:text-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{selectedItems.length} records selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3150] text-[#123B63] dark:text-blue-200 border border-blue-200 dark:border-blue-800 text-xs font-medium hover:bg-blue-50 transition-colors"
            >
              Export Selected
            </button>
            <button
              onClick={() => setSelectedItems([])}
              className="text-xs text-slate-500 hover:underline px-2"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* 4. Table View (Enterprise SaaS Table with hover states & pill badges) */}
      {viewMode === 'table' && (
        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-[#111A2E]/80 border-b border-slate-200 dark:border-[#23324E] text-[10.5px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="p-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={selectedItems.length === filteredRecords.length && filteredRecords.length > 0}
                      className="rounded border-slate-300 dark:border-slate-600 text-adha-navy"
                    />
                  </th>
                  <th 
                    onClick={() => {
                      setSortField('title');
                      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                    }}
                    className="p-3 font-semibold cursor-pointer hover:text-slate-800 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>DOCUMENT & CITATION</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th className="p-3 font-semibold">ACCESSION ID</th>
                  <th 
                    onClick={() => {
                      setSortField('date');
                      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                    }}
                    className="p-3 font-semibold cursor-pointer hover:text-slate-800 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>DATE / ERA</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th className="p-3 font-semibold">FORMAT / MEDIUM</th>
                  <th className="p-3 font-semibold">LANGUAGE</th>
                  <th className="p-3 font-semibold">INSTITUTION</th>
                  <th className="p-3 font-semibold text-center">STATUS</th>
                  <th className="p-3 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {paginatedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        <p className="text-sm font-semibold">No archival records match your filter criteria</p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedType('All Artifacts');
                            setVerifiedOnly(false);
                            setActiveTab('All');
                          }}
                          className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((record) => (
                    <tr 
                      key={record.id} 
                      className="hover:bg-slate-50/80 dark:hover:bg-[#1A263D]/60 transition-colors group"
                    >
                      <td className="p-3 text-center">
                        <input 
                          type="checkbox"
                          checked={selectedItems.includes(record.id)}
                          onChange={() => toggleSelectItem(record.id)}
                          className="rounded border-slate-300 dark:border-slate-600 text-adha-navy"
                        />
                      </td>

                      {/* Title & Subtitle */}
                      <td className="p-3 max-w-md">
                        <Link 
                          to={`/documents/${record.id}`} 
                          className="font-serif text-[13px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline leading-snug block"
                        >
                          {record.title}
                        </Link>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-sans line-clamp-1">
                          {record.subtitle}
                        </p>
                      </td>

                      {/* Accession ID */}
                      <td className="p-3 font-mono font-bold text-adha-navy dark:text-blue-300 whitespace-nowrap">
                        {record.id}
                      </td>

                      {/* Date */}
                      <td className="p-3 whitespace-nowrap">
                        <p className="font-mono text-slate-800 dark:text-slate-200">{record.date}</p>
                        <p className="text-[10px] text-slate-400">{record.location}</p>
                      </td>

                      {/* Format */}
                      <td className="p-3">
                        <p className="text-slate-800 dark:text-slate-200 font-medium">{record.type}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{record.medium}</p>
                      </td>

                      {/* Language */}
                      <td className="p-3 font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {record.language}
                      </td>

                      {/* Institution */}
                      <td className="p-3 text-slate-600 dark:text-slate-400 truncate max-w-[160px]">
                        {record.institution}
                      </td>

                      {/* Status */}
                      <td className="p-3 text-center whitespace-nowrap">
                        <span className={record.verificationState === 'Verified' ? 'badge-success' : 'badge-warning'}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{record.verificationState || 'Verified'}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setCitationModalRecord(record)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#123B63] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A263D] transition-colors"
                            title="Scholarly Citation & MARC21 / BibTeX"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setInspectDrawerRecord(record)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#123B63] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A263D] transition-colors"
                            title="Quick Inspector Drawer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/documents/${record.id}`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#123B63] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A263D] transition-colors"
                            title="Open Full Reader"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#111A2E]/70 border-t border-slate-200 dark:border-[#23324E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-mono">
              <span>
                Showing <strong>{filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredRecords.length)}</strong> of <strong>{filteredRecords.length}</strong> records
              </span>
              <div className="flex items-center gap-1.5">
                <span>Per page:</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white dark:bg-[#151F32] border border-slate-300 dark:border-[#23324E] rounded-md px-2 py-0.5 text-xs font-mono outline-none text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-200 dark:border-[#23324E] rounded-xl bg-white dark:bg-[#151F32] overflow-hidden text-xs font-mono font-semibold">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-[#1A263D] border-r border-slate-200 dark:border-[#23324E] text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3.5 py-1 text-slate-800 dark:text-slate-200">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-[#1A263D] text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {paginatedRecords.map(record => (
            <div 
              key={record.id} 
              className="saas-card-interactive p-4 flex flex-col justify-between group"
            >
              <div>
                <div className="archival-scan-bg h-36 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center p-3 relative mb-3 overflow-hidden">
                  <div className="w-full h-full bg-amber-50/90 dark:bg-amber-950/40 border border-amber-900/20 p-2.5 text-[8.5px] font-serif text-amber-950 dark:text-amber-200 flex flex-col justify-between rounded-lg shadow-xs">
                    <p className="font-bold border-b border-amber-900/20 pb-0.5 uppercase tracking-wider">{record.type}</p>
                    <p className="italic font-bold text-[9px] leading-tight text-amber-950 dark:text-amber-100 line-clamp-2">{record.title}</p>
                    <p className="text-[7.5px] font-mono text-slate-600 dark:text-slate-400">{record.date}</p>
                  </div>
                  <span className="absolute top-2 right-2 bg-slate-900/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                    {record.year}
                  </span>
                </div>

                <span className="font-mono text-[10px] font-bold text-adha-navy dark:text-blue-300">
                  {record.id}
                </span>
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white leading-tight mt-1 line-clamp-2">
                  {record.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {record.institution}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className={record.verificationState === 'Verified' ? 'badge-success' : 'badge-warning'}>
                  {record.verificationState || 'Verified'}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setInspectDrawerRecord(record)}
                    className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    title="Quick inspect"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/documents/${record.id}`}
                    className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline flex items-center"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Quick Inspector Drawer Modal (Glassmorphic Backdrop Blur) */}
      {inspectDrawerRecord && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setInspectDrawerRecord(null)}
        >
          <div 
            className="w-full max-w-lg bg-white dark:bg-[#151F32] h-full shadow-2xl border-l border-slate-200 dark:border-[#23324E] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#151F32]/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-adha-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                    {inspectDrawerRecord.id}
                  </span>
                  <span className={inspectDrawerRecord.verificationState === 'Verified' ? 'badge-success' : 'badge-warning'}>
                    {inspectDrawerRecord.verificationState || 'Verified'}
                  </span>
                </div>
                <button
                  onClick={() => setInspectDrawerRecord(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {inspectDrawerRecord.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {inspectDrawerRecord.subtitle}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Format</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{inspectDrawerRecord.type}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Year / Era</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{inspectDrawerRecord.date}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Language</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{inspectDrawerRecord.language}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">OCR Quality</span>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">99.2% Confidence</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Institution Repository</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{inspectDrawerRecord.institution}</p>
                  </div>
                </div>

                {/* Archival Preview Canvas */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Folio Transliteration Preview</span>
                    <span className="text-[10px] font-mono text-slate-400">Folio 1 of 42</span>
                  </div>
                  <div className="archival-scan-bg p-4 rounded-xl border border-slate-300 dark:border-slate-700 min-h-[140px] text-xs font-serif leading-relaxed text-slate-800 shadow-inner">
                    <p className="italic">
                      “It is not possible to build up a nation, is not possible to build up anything upon the foundation of caste. Whatever you build on the foundations of caste is cracking and will never be a whole.”
                    </p>
                    <p className="text-[10px] font-mono text-slate-600 mt-3 pt-2 border-t border-slate-400/30">
                      — Authorial Annotation, English Typewritten Folio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#111A2E] flex items-center justify-between gap-3">
              <button
                onClick={() => setCitationModalRecord(inspectDrawerRecord)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-[#1A263D] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Scholarly Citation & MARC21</span>
              </button>

              <button
                onClick={() => navigate(`/documents/${inspectDrawerRecord.id}`)}
                className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open Full Document Reader</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. Academic Citation & Metadata Schemas Modal */}
      {citationModalRecord && (
        <CitationModal 
          record={citationModalRecord} 
          onClose={() => setCitationModalRecord(null)} 
        />
      )}

    </div>
  );
}

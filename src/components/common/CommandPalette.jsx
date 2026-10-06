import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  LayoutDashboard, 
  Archive, 
  Sparkles, 
  GitFork, 
  Clock, 
  FileText, 
  Sun, 
  Moon, 
  Upload, 
  CheckSquare, 
  X,
  ArrowRight,
  CornerDownLeft
} from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

export default function CommandPalette() {
  const { isCommandOpen, setIsCommandOpen, records, theme, toggleTheme } = useArchive();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Listen for Cmd+K / Ctrl+K / '/' keybinding
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsCommandOpen(true);
      } else if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandOpen]);

  useEffect(() => {
    if (isCommandOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandOpen]);

  if (!isCommandOpen) return null;

  const defaultNavigation = [
    { id: 'nav-kiosk', label: 'Launch DAIC Memorial Touch Kiosk & Smart Display Mode', icon: Sparkles, category: 'Memorial Interactive Kiosk', action: () => navigate('/kiosk') },
    { id: 'nav-audio', label: 'Audio-Visual Archival System (AIR & BBC Sound Vault)', icon: Archive, category: 'Audio-Visual Knowledge', action: () => navigate('/audiovisual') },
    { id: 'nav-dash', label: 'Go to Executive Dashboard', icon: LayoutDashboard, category: 'Navigation', action: () => navigate('/dashboard') },
    { id: 'nav-arch', label: 'Explore Archival Records Table & Catalog', icon: Archive, category: 'Navigation', action: () => navigate('/archive') },
    { id: 'nav-search', label: 'Semantic AI Search Engine', icon: Search, category: 'Navigation', action: () => navigate('/ai-search') },
    { id: 'nav-kg', label: 'Inspect Knowledge Graph', icon: GitFork, category: 'Navigation', action: () => navigate('/knowledge-graph') },
    { id: 'nav-time', label: 'Historical Timeline & Eras', icon: Clock, category: 'Navigation', action: () => navigate('/timeline') },
    { id: 'nav-assist', label: 'Dr. Ambedkar AI Research Assistant', icon: Sparkles, category: 'Navigation', action: () => navigate('/research-assistant') },
    { id: 'nav-ingest', label: 'Ingest New Manuscript / Folio', icon: Upload, category: 'Curator Actions', action: () => navigate('/ingestion') },
    { id: 'nav-review', label: 'Curator Verification Queue', icon: CheckSquare, category: 'Curator Actions', action: () => navigate('/review') },
    { id: 'nav-users', label: 'Archivist RBAC Registry & Key Certification', icon: CheckSquare, category: 'Administration', action: () => navigate('/users') },
    { id: 'nav-settings', label: 'System Parameters & OAIS Storage Policy', icon: LayoutDashboard, category: 'Administration', action: () => navigate('/settings') },
    { 
      id: 'cmd-theme', 
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
      icon: theme === 'dark' ? Sun : Moon, 
      category: 'Preferences', 
      action: () => toggleTheme() 
    },
  ];

  const matchedRecords = query.trim()
    ? records.filter(r => 
        r.title?.toLowerCase().includes(query.toLowerCase()) || 
        r.id?.toLowerCase().includes(query.toLowerCase()) ||
        r.type?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5).map(r => ({
        id: r.id,
        label: `${r.title} (${r.id})`,
        icon: FileText,
        category: 'Archive Documents',
        action: () => navigate(`/documents/${r.id}`)
      }))
    : [];

  const filteredCommands = query.trim()
    ? [
        ...matchedRecords,
        ...defaultNavigation.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()))
      ]
    : defaultNavigation;

  const handleSelect = (item) => {
    item.action();
    setIsCommandOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      onClick={() => setIsCommandOpen(false)}
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search documents (e.g. Annihilation, Ingest, Theme)..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching records or actions found for "{query}"
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id || idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-[#1A2A46] text-[#123B63] dark:text-blue-300' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A263D]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-100 dark:bg-blue-900/50 text-[#123B63] dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="font-medium truncate">{item.label}</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#111A2E] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">↵</kbd>
              Select
            </span>
          </div>
          <span className="font-medium text-slate-400">Ambedkar Digital Heritage Archive</span>
        </div>
      </div>
    </div>
  );
}

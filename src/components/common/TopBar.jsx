import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Globe, 
  Bell, 
  UserCheck, 
  Landmark, 
  Sun, 
  Moon, 
  ChevronRight, 
  Check, 
  X,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import logoImg from '../../assets/logo.png';

export default function TopBar() {
  const { 
    selectedRepository, 
    setSelectedRepository, 
    selectedLanguage, 
    setSelectedLanguage, 
    searchQuery, 
    setSearchQuery,
    theme,
    toggleTheme,
    notifications,
    markAllNotificationsRead,
    records,
    setIsCommandOpen
  } = useArchive();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return [{ label: 'Dashboard', path: '/dashboard' }];
    if (path.startsWith('/archive')) return [{ label: 'Dashboard', path: '/dashboard' }, { label: 'Archive Catalog', path: '/archive' }];
    if (path.startsWith('/documents/')) return [{ label: 'Archive', path: '/archive' }, { label: 'Document Viewer', path: path }];
    if (path.startsWith('/ai-search')) return [{ label: 'Discovery', path: '/dashboard' }, { label: 'AI Search Engine', path: '/ai-search' }];
    if (path.startsWith('/research-assistant')) return [{ label: 'AI Suite', path: '/dashboard' }, { label: 'Research Assistant', path: '/research-assistant' }];
    if (path.startsWith('/knowledge-graph')) return [{ label: 'Graph', path: '/dashboard' }, { label: 'Knowledge Graph', path: '/knowledge-graph' }];
    if (path.startsWith('/timeline')) return [{ label: 'Chronology', path: '/dashboard' }, { label: 'Historical Timeline', path: '/timeline' }];
    if (path.startsWith('/ingestion')) return [{ label: 'Archival Management', path: '/dashboard' }, { label: 'Manuscript Ingestion', path: '/ingestion' }];
    if (path.startsWith('/review')) return [{ label: 'Archival Management', path: '/dashboard' }, { label: 'Curator Review Queue', path: '/review' }];
    if (path.startsWith('/institutions')) return [{ label: 'Network', path: '/dashboard' }, { label: 'Connected Institutions', path: '/institutions' }];
    if (path.startsWith('/analytics')) return [{ label: 'System', path: '/dashboard' }, { label: 'Archival Analytics', path: '/analytics' }];
    if (path.startsWith('/preservation')) return [{ label: 'Security', path: '/dashboard' }, { label: 'Digital Preservation', path: '/preservation' }];
    return [{ label: 'Dashboard', path: '/dashboard' }, { label: 'Overview', path: path }];
  };

  const breadcrumbs = getBreadcrumbs();
  const unreadCount = notifications.filter(n => n.unread).length;

  // Live search matched records
  const query = searchQuery.trim().toLowerCase();
  const searchResults = query
    ? records.filter(r => 
        r.title?.toLowerCase().includes(query) || 
        r.id?.toLowerCase().includes(query) || 
        r.type?.toLowerCase().includes(query) ||
        r.languages?.some(l => l.toLowerCase().includes(query))
      ).slice(0, 5)
    : [];

  const handleSearchResultClick = (id) => {
    navigate(`/documents/${id}`);
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 dark:bg-[#111A2E]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#23324E] px-4 sm:px-6 flex items-center justify-between font-sans transition-colors duration-200">
      
      {/* Left: Breadcrumb Navigation & Brand Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0 md:hidden">
          <img src={logoImg} alt="ADHA Logo" className="h-7 w-auto object-contain" />
        </Link>

        {/* Dynamic Breadcrumbs with Lucide Icon dividers */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
          <Link 
            to="/dashboard" 
            className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            ADHA
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path + idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Global Search Bar with Keyboard Shortcut Hint */}
      <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search records, citations, accession ID..."
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchFocused(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/archive?q=${encodeURIComponent(searchQuery)}`);
                setIsSearchFocused(false);
              }
            }}
            className="w-full pl-9 pr-14 py-1.5 bg-slate-50 dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-[#18243A] transition-all"
          />
          {/* Keyboard shortcut hint badge */}
          <button 
            type="button"
            onClick={() => setIsCommandOpen(true)}
            title="Open Command Palette"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-[#1C2840] border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 shadow-xs hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>⌘</span>K
          </button>
        </div>

        {/* Live Search Instant Dropdown Results Popover */}
        {isSearchFocused && query.length > 0 && (
          <div className="absolute left-0 right-0 mt-1.5 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl shadow-xl py-2 z-50 text-xs overflow-hidden">
            <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Archival Matches ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <div className="px-4 py-4 text-center text-slate-500 dark:text-slate-400 text-xs">
                No matching archival records found for "{searchQuery}"
              </div>
            ) : (
              searchResults.map(record => (
                <div
                  key={record.id}
                  onClick={() => handleSearchResultClick(record.id)}
                  className="px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-[#1C2A44] cursor-pointer flex items-center justify-between gap-3 transition-colors border-b border-slate-50 dark:border-slate-800/60 last:border-0"
                >
                  <div className="flex items-start gap-2.5 truncate">
                    <div className="p-1 rounded bg-blue-50 dark:bg-blue-900/30 text-adha-navy dark:text-blue-300 mt-0.5 shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{record.title}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{record.id} • {record.type} ({record.year || 'Circa 1930s'})</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded shrink-0">
                    Verified
                  </span>
                </div>
              ))
            )}
            <div className="pt-2 px-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <span>Press <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">↵ Enter</kbd> for full catalog view</span>
              <button 
                onClick={() => {
                  navigate('/ai-search');
                  setIsSearchFocused(false);
                }}
                className="text-adha-navy dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                Semantic AI Search <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Controls: Repo, Language, Theme, Notifications, User */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Repository Selector Dropdown */}
        <div className="relative hidden xl:block">
          <button
            onClick={() => setShowRepoDropdown(prev => !prev)}
            className="flex items-center gap-2 bg-slate-50 dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1A263D] transition-colors"
          >
            <Landmark className="w-3.5 h-3.5 text-adha-navy dark:text-blue-400" />
            <span className="max-w-[140px] truncate">{selectedRepository}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {showRepoDropdown && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl shadow-lg py-1.5 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Federated Repositories
              </div>
              {[
                'National Archives & Memorial Repository',
                'Parliament of India Digital Library',
                'Columbia University Rare Books',
                'Maharashtra State Archives'
              ].map(repo => (
                <button
                  key={repo}
                  onClick={() => {
                    setSelectedRepository(repo);
                    setShowRepoDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#1A263D] transition-colors ${
                    selectedRepository === repo ? 'text-adha-navy dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{repo}</span>
                  {selectedRepository === repo && <Check className="w-3.5 h-3.5 text-adha-navy dark:text-blue-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(prev => !prev)}
            className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1A263D] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">{selectedLanguage}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl shadow-lg py-1.5 z-50 text-xs">
              {[
                { name: 'English', label: 'English' },
                { name: 'Marathi', label: 'मराठी (Marathi)' },
                { name: 'Hindi', label: 'हिन्दी (Hindi)' },
                { name: 'Tamil', label: 'தமிழ் (Tamil)' },
              ].map(lang => (
                <button
                  key={lang.name}
                  onClick={() => {
                    setSelectedLanguage(lang.name);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#1A263D] transition-colors ${
                    selectedLanguage === lang.name ? 'text-adha-navy dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{lang.label}</span>
                  {selectedLanguage === lang.name && <Check className="w-3.5 h-3.5 text-adha-navy dark:text-blue-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-lg transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        {/* Notification Bell with Badge and Interactive Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            aria-label="Notifications"
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-[#111A2E]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-2xl shadow-xl py-2 z-50 overflow-hidden text-xs">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">Curator Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-adha-navy dark:text-blue-400 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.map(item => (
                  <div 
                    key={item.id} 
                    className={`p-3.5 hover:bg-slate-50 dark:hover:bg-[#1A263D] transition-colors ${item.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50 dark:bg-[#111A2E]">
                <button
                  onClick={() => {
                    navigate('/review');
                    setShowNotifications(false);
                  }}
                  className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline"
                >
                  View Curator Review Queue →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill with Role Badge */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(prev => !prev)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700/80 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-adha-navy text-white font-bold text-xs flex items-center justify-center font-mono ring-2 ring-blue-500/20">
              RA
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Prof. R. B. Ambedkar</p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                <span>Chief Curator</span>
              </div>
            </div>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl shadow-xl py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">Prof. R. B. Ambedkar</p>
                <p className="text-[10px] text-slate-400">curator@adha.gov.in</p>
              </div>
              <button 
                onClick={() => {
                  navigate('/users');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A263D]"
              >
                Archivist Credentials & Roles
              </button>
              <button 
                onClick={() => {
                  navigate('/settings');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A263D]"
              >
                System & API Settings
              </button>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
              <button 
                onClick={() => setShowProfileMenu(false)}
                className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

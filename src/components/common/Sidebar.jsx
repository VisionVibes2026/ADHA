import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Archive, 
  Sparkles, 
  GitFork, 
  Clock, 
  FileText, 
  BookOpen, 
  Video, 
  Image as ImageIcon, 
  Languages, 
  Building2, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  FileCode2,
  Database
} from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

export default function Sidebar() {
  const location = useLocation();
  const { reviewQueue } = useArchive();
  const pendingCount = reviewQueue.filter(item => item.status === 'Pending').length;

  const mainCatalogue = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Archive', path: '/archive', icon: Archive },
    { name: 'AI Search', path: '/ai-search', icon: Sparkles },
    { name: 'Knowledge Graph', path: '/knowledge-graph', icon: GitFork },
    { name: 'Timeline', path: '/timeline', icon: Clock },
  ];

  const contentFolios = [
    { name: 'Documents', path: '/documents/ADHA-DOC-001', icon: FileText },
    { name: 'Manuscripts', path: '/archive?type=Manuscript', icon: BookOpen },
    { name: 'Audio & Video', path: '/archive?type=Audio', icon: Video },
    { name: 'Photographs', path: '/archive?type=Photograph', icon: ImageIcon },
    { name: 'Languages', path: '/archive?type=Languages', icon: Languages },
  ];

  const managementRegistry = [
    { name: 'Institutions', path: '/institutions', icon: Building2 },
    { name: 'Users & Roles', path: '/users', icon: Users },
    { name: 'Review & Approval', path: '/review', icon: ShieldCheck, badge: pendingCount },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const systemAdministration = [
    { name: 'Preservation', path: '/preservation', icon: Database },
    { name: 'Ingestion Pipeline', path: '/ingestion', icon: FileCode2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[244px] min-w-[244px] bg-[#123B63] text-white flex flex-col justify-between h-screen sticky top-0 left-0 z-40 border-r border-[#0C2A48] select-none font-sans text-xs">
      <div>
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs border border-white/20 bg-white/10 flex items-center justify-center font-bold tracking-wider text-sm font-serif text-amber-400">
            A
          </div>
          <div>
            <h1 className="font-bold tracking-wide text-[13px] leading-tight text-white font-serif">
              ADHA
            </h1>
            <p className="text-[9.5px] text-slate-300 tracking-wider font-mono leading-tight">
              Ambedkar Digital Heritage Archive
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 py-3 space-y-4 overflow-y-auto max-h-[calc(100vh-170px)]">
          {/* Main Catalogue */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1 font-mono">
              MAIN CATALOGUE
            </p>
            <nav className="space-y-0.5">
              {mainCatalogue.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xs transition-colors text-[12.5px] ${
                      isActive 
                        ? 'bg-[#1A4D7E] text-white font-medium border-l-2 border-amber-400 pl-2' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Content Folios */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1 font-mono">
              CONTENT FOLIOS
            </p>
            <nav className="space-y-0.5">
              {contentFolios.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith('/documents') && item.name === 'Documents';
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xs transition-colors text-[12.5px] ${
                      isActive 
                        ? 'bg-[#1A4D7E] text-white font-medium border-l-2 border-amber-400 pl-2' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Management & Registry */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1 font-mono">
              MANAGEMENT & REGISTRY
            </p>
            <nav className="space-y-0.5">
              {managementRegistry.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xs transition-colors text-[12.5px] ${
                      isActive 
                        ? 'bg-[#1A4D7E] text-white font-medium border-l-2 border-amber-400 pl-2' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono leading-none">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* System Administration */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1 font-mono">
              SYSTEM ADMINISTRATION
            </p>
            <nav className="space-y-0.5">
              {systemAdministration.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xs transition-colors text-[12.5px] ${
                      isActive 
                        ? 'bg-[#1A4D7E] text-white font-medium border-l-2 border-amber-400 pl-2' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Status Panel */}
      <div className="p-3 border-t border-white/10 bg-[#0C2A48] m-2 rounded-xs text-[11px]">
        <div className="flex items-center gap-1.5 mb-1 text-emerald-400 font-semibold font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>ARCHIVE ONLINE</span>
        </div>
        <p className="text-slate-400 text-[10px] font-mono">Checksum: SHA-256 Verified</p>
        <p className="text-slate-500 text-[9.5px] font-mono mt-0.5">Last sync: 2 min ago</p>
      </div>
    </aside>
  );
}

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Archive, 
  Search, 
  Sparkles, 
  GitFork, 
  Clock, 
  Video, 
  FolderKanban, 
  Info as InfoIcon
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Archive', path: '/archive', icon: Archive },
    { name: 'Search', path: '/ai-search', icon: Search },
    { name: 'AI Research Assistant', path: '/research-assistant', icon: Sparkles },
    { name: 'Knowledge Graph', path: '/knowledge-graph', icon: GitFork },
    { name: 'Timeline', path: '/timeline', icon: Clock },
    { name: 'Audiovisual', path: '/archive?type=Audio', icon: Video },
    { name: 'Collections', path: '/archive?tab=collections', icon: FolderKanban },
    { name: 'About', path: '/institutions', icon: InfoIcon },
  ];

  return (
    <aside className="w-[250px] min-w-[250px] bg-[#12243E] text-white flex flex-col justify-between h-screen sticky top-0 left-0 z-40 border-r border-[#0D1B30] select-none font-sans">
      <div>
        {/* Sidebar Brand Header with Official Logo */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0D1B30]/40">
          <img 
            src={logoImg} 
            alt="ADHA Official Logo" 
            className="w-11 h-11 object-contain drop-shadow-sm bg-white/90 p-1 rounded-sm" 
          />
          <div>
            <h1 className="font-serif font-bold text-base tracking-tight text-white leading-tight">
              ADHA
            </h1>
            <p className="text-[10px] text-slate-300 font-sans tracking-wide leading-tight">
              Ambedkar Digital<br />Heritage Archive
            </p>
          </div>
        </div>

        {/* Main Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all text-[13px] ${
                  isActive 
                    ? 'bg-[#1C365C] text-white font-semibold shadow-xs border-l-3 border-amber-400 pl-3' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white font-normal'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'opacity-70'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Quote */}
      <div className="p-5 font-serif border-t border-white/10 bg-[#0E1C33]/60">
        <p className="text-base italic leading-tight text-slate-100 font-serif">
          “Educate<br />Agitate<br />Organize”
        </p>
        <p className="text-xs font-sans text-slate-400 mt-2 font-medium">
          — B. R. Ambedkar
        </p>
      </div>
    </aside>
  );
}

import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Archive, 
  Search, 
  Sparkles, 
  GitFork, 
  Clock, 
  UploadCloud, 
  CheckSquare, 
  BarChart3, 
  ShieldCheck, 
  Landmark,
  Radio,
  Settings,
  Users,
  Tv,
  ExternalLink
} from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import logoImg from '../../assets/logo.png';

export default function Sidebar() {
  const location = useLocation();
  const { reviewQueue } = useArchive();

  const pendingCount = reviewQueue.filter(r => r.status === 'Pending').length;

  const discoveryNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Archive Catalog', path: '/archive', icon: Archive },
    { name: 'AI Search Engine', path: '/ai-search', icon: Search },
    { name: 'AI Research Assistant', path: '/research-assistant', icon: Sparkles, badge: 'AI' },
    { name: 'Audio-Visual Media', path: '/audiovisual', icon: Radio, badge: 'AIR' },
    { name: 'Knowledge Graph', path: '/knowledge-graph', icon: GitFork },
    { name: 'Historical Timeline', path: '/timeline', icon: Clock },
  ];

  const curatorNav = [
    { name: 'Ingestion Pipeline', path: '/ingestion', icon: UploadCloud },
    { name: 'Verification Queue', path: '/review', icon: CheckSquare, count: pendingCount },
    { name: 'Archival Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Digital Preservation', path: '/preservation', icon: ShieldCheck },
    { name: 'Connected Archives', path: '/institutions', icon: Landmark },
    { name: 'Archivist Registry', path: '/users', icon: Users },
    { name: 'System Parameters', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[265px] min-w-[265px] bg-[#0E1726] dark:bg-[#070D18] text-slate-300 flex flex-col justify-between h-screen sticky top-0 left-0 z-40 border-r border-[#1B293E] dark:border-[#152033] select-none font-sans transition-colors duration-200">
      
      {/* Top Header / Branding */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-[#09121F]/80 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-white/95 p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/20">
            <img 
              src={logoImg} 
              alt="ADHA Official Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-bold text-base tracking-tight text-white leading-none">
                ADHA
              </h1>
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                GOV.IN
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-wide truncate mt-0.5">
              Dr. Ambedkar Digital Heritage Archive
            </p>
          </div>
        </div>

        {/* SIH Memorial Touch Kiosk Callout Button */}
        <div className="p-3 pb-1">
          <Link
            to="/kiosk"
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-200 flex items-center justify-between transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Tv className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">DAIC Memorial Kiosk</p>
                <p className="text-[10px] text-amber-300/80 font-mono">Touch Screen Display</p>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              OPEN
            </span>
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="p-3 space-y-5">
          
          {/* Group 1: Discovery & Exploration */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              Discovery & Exploration
            </div>
            <div className="space-y-0.5">
              {discoveryNav.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs font-medium ${
                      isActive 
                        ? 'bg-[#1E3354] text-white shadow-xs' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Group 2: Archival Operations */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              Institutional Archival Operations
            </div>
            <div className="space-y-0.5">
              {curatorNav.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs font-medium ${
                      isActive 
                        ? 'bg-[#1E3354] text-white shadow-xs' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Quote Card */}
      <div className="p-4 border-t border-white/5 bg-[#09121F]/60">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-xs italic text-slate-200 font-serif leading-snug">
            “Educate, Agitate, Organize.”
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
            <span className="text-[10px] font-sans text-slate-400 font-medium">Dr. B. R. Ambedkar</span>
            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              DAIC Server 200 OK
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}

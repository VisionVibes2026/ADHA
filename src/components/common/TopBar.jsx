import React from 'react';
import { Search, ChevronDown, Globe, Bell, UserCheck, Landmark } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import logoImg from '../../assets/logo.png';

export default function TopBar() {
  const { selectedRepository, setSelectedRepository, selectedLanguage, setSelectedLanguage, searchQuery, setSearchQuery } = useArchive();

  return (
    <header className="h-[56px] min-h-[56px] bg-white border-b border-adha-border px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Brand Logo & Search Input */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <img src={logoImg} alt="ADHA Logo" className="h-9 w-auto object-contain" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-adha-navy text-base leading-none tracking-tight">ADHA</span>
              <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-1 py-0.5 rounded-xs border border-amber-200">
                GOV.IN
              </span>
            </div>
            <span className="text-[9.5px] font-mono tracking-wider text-slate-500 uppercase">
              NATIONAL ARCHIVAL REPOSITORY
            </span>
          </div>
        </div>

        <div className="relative ml-2">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search title, person, subject, accession ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-1.5 w-64 bg-slate-50 border border-slate-200 rounded-xs text-xs focus:outline-none focus:border-adha-navy focus:bg-white text-slate-800 transition-colors"
          />
        </div>
      </div>

      {/* Middle Repository Selector */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xs cursor-pointer hover:bg-slate-100 transition-colors">
        <Landmark className="w-3.5 h-3.5 text-adha-navy" />
        <select
          value={selectedRepository}
          onChange={(e) => setSelectedRepository(e.target.value)}
          className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer pr-2"
        >
          <option value="National Archives & Memorial Repository">National Archives & Memorial Repository</option>
          <option value="Parliament of India Digital Library">Parliament of India Digital Library</option>
          <option value="Columbia University Rare Books">Columbia University Rare Books</option>
          <option value="Maharashtra State Archives">Maharashtra State Archives</option>
        </select>
        <ChevronDown className="w-3 h-3 text-slate-500" />
      </div>

      {/* Right Action Icons & User Profile */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-xs border border-slate-200">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-700 outline-none cursor-pointer"
          >
            <option value="English / हिन्दी / தமிழ் / मराठी">English / हिन्दी / தமிழ் / मराठी</option>
            <option value="English">English</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xs transition-colors" title="Curator Notifications">
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-1 right-1"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img src={logoImg} alt="Avatar" className="w-7 h-7 rounded-xs object-cover border border-slate-200" />
          <div className="hidden lg:block leading-tight">
            <p className="text-[11px] font-semibold text-slate-800">PROF. R. B. AMBEDKAR</p>
            <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-600 inline" /> Chief Curator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

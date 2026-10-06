import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Globe, Eye, Server, Clock } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

export default function GovHeaderStrip() {
  const { theme } = useArchive();
  const [currentTime, setCurrentTime] = useState('');
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#091626] text-slate-300 text-[11px] font-sans border-b border-[#142338] px-4 sm:px-6 py-1 flex flex-wrap items-center justify-between gap-2 select-none z-30">
      
      {/* Official Government Identity */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 font-medium tracking-tight">
          <span className="text-amber-400 font-bold">भारत सरकार</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-200">Government of India</span>
        </div>
        <span className="hidden md:inline text-slate-500">•</span>
        <span className="hidden md:inline text-slate-400">
          Ministry of Social Justice & Empowerment
        </span>
      </div>

      {/* Live Industrial Telemetry & Standards Strip */}
      <div className="flex items-center gap-4 text-[10.5px] font-mono text-slate-400">
        
        {/* Node Cluster */}
        <div className="hidden lg:flex items-center gap-1.5">
          <Server className="w-3 h-3 text-teal-400" />
          <span>Node: <strong className="text-slate-200 font-semibold">NIC-DELHI-01</strong></span>
        </div>

        {/* Security / Fixity */}
        <div className="hidden sm:flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>OAIS ISO-14721: <strong className="text-emerald-400 font-semibold">VERIFIED</strong></span>
        </div>

        {/* Latency */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{latency}ms</span>
        </div>

        {/* Archival Clock */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="font-semibold">{currentTime || '15:30:00 IST'}</span>
        </div>

        {/* Accessibility Tag */}
        <div className="hidden xl:inline-block px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[9.5px] text-slate-400">
          GIGW & WCAG 2.1 AA
        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowUpRight, Calendar, Bookmark, Landmark } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/mockRecords';

export default function TimelineView() {
  const navigate = useNavigate();
  const [selectedEra, setSelectedEra] = useState('All');
  const events = TIMELINE_EVENTS;

  const filteredEvents = events.filter(evt => {
    if (selectedEra === 'All') return true;
    const yr = parseInt(evt.year, 10);
    if (selectedEra === '1916–1930') return yr >= 1916 && yr <= 1930;
    if (selectedEra === '1931–1945') return yr >= 1931 && yr <= 1945;
    if (selectedEra === '1946–1956') return yr >= 1946 && yr <= 1956;
    return true;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-[#23324E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#0F766E] dark:text-teal-400" /> Heritage Timeline
            </h1>
            <span className="badge-teal font-mono text-[11px]">
              1916 – 1956 Historical Scope
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Chronological milestones of Dr. B. R. Ambedkar's publications, constitutional interventions, and social movements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">Era:</span>
          {['All', '1916–1930', '1931–1945', '1946–1956'].map(era => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                selectedEra === era
                  ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-[#123B63]/25 dark:border-blue-500/30 ml-4 md:ml-32 space-y-6 py-3">
        {filteredEvents.map((evt, idx) => (
          <div key={idx} className="relative pl-6 md:pl-9 group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white dark:bg-[#0B1120] border-[3px] border-[#123B63] dark:border-blue-500 group-hover:scale-125 group-hover:border-amber-500 transition-all shadow-xs"></div>

            {/* Year (Desktop Left Label) */}
            <div className="hidden md:block absolute -left-32 top-1.5 w-24 text-right">
              <span className="font-serif font-bold text-base text-adha-navy dark:text-blue-300 block">{evt.year}</span>
              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{evt.date}</p>
            </div>

            {/* Event Card */}
            <div className="saas-card p-5 hover:border-[#123B63]/60 dark:hover:border-blue-500/60 transition-all hover:shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="md:hidden font-mono font-bold text-xs text-adha-navy dark:text-blue-300">{evt.date} •</span>
                  <span className="badge-neutral font-mono text-[10.5px]">{evt.type}</span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white leading-tight">{evt.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{evt.description}</p>

              <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono border-t border-slate-100 dark:border-slate-800">
                <div className="text-slate-500 dark:text-slate-400 space-y-0.5">
                  <span>Related Record: <strong className="text-adha-navy dark:text-blue-300 font-bold">{evt.relatedRecordId}</strong></span>
                  {evt.source && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Source: {evt.source}</p>
                  )}
                </div>
                <button 
                  onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                  className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3 cursor-pointer"
                >
                  <span>Inspect Record</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

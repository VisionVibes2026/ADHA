import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/mockRecords';

export default function TimelineView() {
  const navigate = useNavigate();
  const [selectedEra, setSelectedEra] = useState('All');
  const events = TIMELINE_EVENTS;

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">Heritage Timeline</h1>
          <p className="text-xs text-slate-600 mt-1">
            Chronological milestones of Dr. B. R. Ambedkar's publications, constitutional interventions, and social movements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 font-bold">Era:</span>
          {['All', '1916–1930', '1931–1945', '1946–1956'].map(era => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1 rounded-xs text-xs font-semibold transition-colors ${
                selectedEra === era
                  ? 'bg-adha-navy text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-adha-navy/30 ml-4 md:ml-28 space-y-6 py-2">
        {events.map((evt, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8 group">
            {/* Dot */}
            <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-[3px] border-adha-navy group-hover:border-amber-500 transition-colors"></div>

            {/* Year (Desktop) */}
            <div className="hidden md:block absolute -left-28 top-0.5 w-20 text-right">
              <span className="font-serif font-bold text-base text-adha-navy">{evt.year}</span>
              <p className="text-[9px] font-mono text-slate-500">{evt.date}</p>
            </div>

            {/* Event */}
            <div className="bg-white border border-slate-200 rounded-xs p-4 hover:border-adha-navy transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="md:hidden font-mono font-bold text-xs text-adha-navy">{evt.date} •</span>
                  <span className="antd-tag">{evt.type}</span>
                </div>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {evt.location}
                </span>
              </div>

              <h3 className="font-serif font-bold text-[14px] text-slate-900">{evt.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{evt.description}</p>

              <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-xs font-mono">
                <div className="text-slate-500 space-y-0.5">
                  <span>Related Record: <strong className="text-adha-navy">{evt.relatedRecordId}</strong></span>
                  {evt.source && (
                    <p className="text-[10px] text-slate-400">Source: {evt.source}</p>
                  )}
                </div>
                <button 
                  onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                  className="text-adha-teal hover:underline font-bold flex items-center gap-1"
                >
                  Inspect Record <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

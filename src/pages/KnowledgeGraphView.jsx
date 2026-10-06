import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitFork, ArrowUpRight, Search, ZoomIn, ZoomOut, Sparkles, Layers, Info } from 'lucide-react';
import { KNOWLEDGE_GRAPH_NODES } from '../data/mockRecords';

export default function KnowledgeGraphView() {
  const navigate = useNavigate();
  const graph = KNOWLEDGE_GRAPH_NODES;
  const [selectedEntity, setSelectedEntity] = useState({
    name: 'States and Minorities (1947)',
    type: 'Document / Legal Draft',
    date: 'April 1947',
    description: 'Comprehensive memorandum on the safeguards for minorities submitted to the Constituent Assembly.',
    relations: ['Dr. B. R. Ambedkar (Author)', 'Sardar Vallabhbhai Patel (Recipient)', 'Article 15 (Cross-reference)', 'Article 32 (Cross-reference)'],
    accession: 'ADHA-DOC-1947-SM-0014'
  });

  const nodeColors = {
    'Document': { 
      border: 'border-[#0F766E]/40 dark:border-teal-700/60', 
      text: 'text-[#0F766E] dark:text-teal-300', 
      bg: 'bg-teal-50/70 dark:bg-teal-950/30' 
    },
    'Speech': { 
      border: 'border-amber-500/40 dark:border-amber-700/60', 
      text: 'text-amber-700 dark:text-amber-300', 
      bg: 'bg-amber-50/70 dark:bg-amber-950/30' 
    },
    'Event': { 
      border: 'border-blue-500/40 dark:border-blue-700/60', 
      text: 'text-blue-700 dark:text-blue-300', 
      bg: 'bg-blue-50/70 dark:bg-blue-950/30' 
    },
    'Legislative': { 
      border: 'border-emerald-500/40 dark:border-emerald-700/60', 
      text: 'text-emerald-700 dark:text-emerald-300', 
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/30' 
    },
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-[#23324E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <GitFork className="w-6 h-6 text-[#0F766E] dark:text-teal-400" /> Heritage Knowledge Graph
            </h1>
            <span className="badge-teal font-mono text-[11px]">
              RDF/OWL Linked Data
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Cross-linked network mapping historical figures, speeches, constitutional debates, and institutions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter graph nodes..."
              className="pl-9 pr-3.5 py-1.5 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#123B63] dark:focus:ring-blue-500 w-52 text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Graph + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Graph Canvas (9 cols) */}
        <div className="lg:col-span-9 saas-card p-6 min-h-[640px] flex flex-col justify-between relative overflow-hidden">
          {/* Controls */}
          <div className="flex justify-between items-center text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#111A2E] p-2.5 rounded-xl border border-slate-200 dark:border-[#23324E] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Central Node: <strong className="text-adha-navy dark:text-blue-300 font-bold">{graph.center.label}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors" title="Zoom In">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors" title="Zoom Out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center relative py-8">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }}>
              <line x1="50%" y1="42%" x2="25%" y2="18%" stroke="#0F766E" strokeWidth="1.5" strokeDasharray="4" />
              <line x1="50%" y1="42%" x2="75%" y2="18%" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4" />
              <line x1="50%" y1="42%" x2="25%" y2="76%" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4" />
              <line x1="50%" y1="42%" x2="75%" y2="76%" stroke="#15803D" strokeWidth="1.5" strokeDasharray="4" />
            </svg>

            {/* Central Node */}
            <div className="z-10 bg-white dark:bg-[#151F32] border-2 border-[#123B63] dark:border-blue-500 text-adha-navy dark:text-blue-300 p-5 rounded-2xl text-center max-w-xs cursor-pointer shadow-lg hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#123B63] dark:bg-blue-600 text-white font-serif font-bold text-sm flex items-center justify-center mx-auto mb-2.5 shadow-xs">
                BA
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white">{graph.center.label}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 leading-tight">{graph.center.details}</p>
            </div>

            {/* Category Node Groups */}
            <div className="w-full max-w-3xl grid grid-cols-2 gap-y-14 gap-x-8 mt-10 z-10">
              {graph.categories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-2.5">
                  <p className="text-[10.5px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{cat.name}</p>
                  {cat.nodes.map((node) => {
                    const colors = nodeColors[node.type] || nodeColors['Document'];
                    const isSelected = selectedEntity.name === node.label;
                    return (
                      <div 
                        key={node.id}
                        onClick={() => setSelectedEntity({
                          name: node.label,
                          type: `${cat.name} / ${node.type}`,
                          date: node.date,
                          description: `Record from the ${cat.name} collection.`,
                          relations: [`Dr. B. R. Ambedkar (Related)`, `${cat.name} (Collection)`],
                          accession: node.id
                        })}
                        className={`${colors.bg} border ${colors.border} p-3 rounded-xl text-xs cursor-pointer transition-all hover:scale-[1.02] shadow-xs ${
                          isSelected ? 'ring-2 ring-[#123B63] dark:ring-blue-400 font-bold' : ''
                        }`}
                      >
                        <span className={`text-[9.5px] font-mono ${colors.text} font-bold uppercase`}>{node.type}</span>
                        <p className="font-serif font-bold text-slate-900 dark:text-white text-[12px] leading-tight mt-0.5">{node.label}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{node.date}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-[#23324E] pt-3.5 mt-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span> Documents</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Speeches</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Events</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Legislative</span>
          </div>
        </div>

        {/* Entity Detail Panel (3 cols) */}
        <div className="lg:col-span-3 saas-card p-5 space-y-4 min-h-[640px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="badge-teal font-mono text-[10px]">SELECTED ENTITY</span>
              <h2 className="font-serif font-bold text-base text-slate-900 dark:text-white mt-1.5 leading-tight">{selectedEntity.name}</h2>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{selectedEntity.type} • {selectedEntity.date}</p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Description</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans mt-1">{selectedEntity.description}</p>
              </div>

              <div>
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1.5">Relationships</p>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {selectedEntity.relations.map((rel, i) => (
                    <div key={i} className="p-2 bg-slate-50 dark:bg-[#111A2E] rounded-lg border border-slate-200 dark:border-[#23324E] text-slate-800 dark:text-slate-200">
                      • {rel}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Accession</p>
                <p className="font-mono text-adha-navy dark:text-blue-300 font-bold text-xs mt-0.5">{selectedEntity.accession}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
            className="w-full btn-primary py-2.5 justify-center text-xs flex items-center gap-1.5 cursor-pointer mt-4"
          >
            <span>Open Record</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitFork, ArrowUpRight, Search, ZoomIn, ZoomOut } from 'lucide-react';
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
    'Document': { border: 'border-adha-teal', text: 'text-adha-teal', bg: 'bg-adha-teal/5' },
    'Speech': { border: 'border-amber-600', text: 'text-amber-700', bg: 'bg-amber-50' },
    'Event': { border: 'border-blue-600', text: 'text-blue-700', bg: 'bg-blue-50' },
    'Legislative': { border: 'border-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-serif font-bold text-adha-navy">Heritage Knowledge Graph</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Cross-linked network mapping historical figures, speeches, constitutional debates, and institutions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter graph nodes..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-xs outline-none focus:border-adha-navy w-48"
            />
          </div>
        </div>
      </div>

      {/* Graph + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        
        {/* Graph Canvas (9 cols) — Light background, restrained style */}
        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-xs p-5 min-h-[600px] flex flex-col justify-between relative overflow-hidden">
          {/* Controls */}
          <div className="flex justify-between items-center text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-xs border border-slate-200 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Central Node: <strong className="text-adha-navy">{graph.center.label}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-200 rounded-xs"><ZoomIn className="w-3.5 h-3.5" /></button>
              <button className="p-1 hover:bg-slate-200 rounded-xs"><ZoomOut className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center relative py-6">
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
              <line x1="50%" y1="45%" x2="25%" y2="20%" stroke="#0F766E" strokeWidth="1" strokeDasharray="4" />
              <line x1="50%" y1="45%" x2="75%" y2="20%" stroke="#D97706" strokeWidth="1" strokeDasharray="4" />
              <line x1="50%" y1="45%" x2="25%" y2="75%" stroke="#2563EB" strokeWidth="1" strokeDasharray="4" />
              <line x1="50%" y1="45%" x2="75%" y2="75%" stroke="#15803D" strokeWidth="1" strokeDasharray="4" />
            </svg>

            {/* Central Node */}
            <div className="z-10 bg-white border-2 border-adha-navy text-adha-navy p-4 rounded-xs text-center max-w-xs cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-xs bg-adha-navy text-white font-serif font-bold text-sm flex items-center justify-center mx-auto mb-2">
                BA
              </div>
              <h3 className="font-serif font-bold text-sm text-adha-navy">{graph.center.label}</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-1 leading-tight">{graph.center.details}</p>
            </div>

            {/* Category Node Groups */}
            <div className="w-full max-w-3xl grid grid-cols-2 gap-y-16 gap-x-8 mt-10 z-10">
              {graph.categories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-2">
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{cat.name}</p>
                  {cat.nodes.map((node) => {
                    const colors = nodeColors[node.type] || nodeColors['Document'];
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
                        className={`${colors.bg} border ${colors.border} p-2.5 rounded-xs text-xs cursor-pointer hover:bg-slate-50 transition-colors`}
                      >
                        <span className={`text-[9px] font-mono ${colors.text} font-bold uppercase`}>{node.type}</span>
                        <p className="font-serif font-bold text-slate-900 text-[12px] leading-tight mt-0.5">{node.label}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{node.date}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-[11px] font-mono text-slate-500 border-t border-slate-200 pt-3 mt-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-adha-teal"></span> Documents</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-600"></span> Speeches</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Events</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> Legislative</span>
          </div>
        </div>

        {/* Entity Detail Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xs p-4 space-y-3 min-h-[600px]">
          <div className="border-b border-slate-100 pb-2">
            <span className="text-[10px] font-mono font-bold text-adha-teal uppercase">SELECTED ENTITY</span>
            <h2 className="font-serif font-bold text-sm text-adha-navy mt-1 leading-tight">{selectedEntity.name}</h2>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedEntity.type} • {selectedEntity.date}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">Description</p>
              <p className="text-slate-700 leading-relaxed font-sans mt-0.5">{selectedEntity.description}</p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase mb-1">Relationships</p>
              <div className="space-y-1 font-mono text-[11px]">
                {selectedEntity.relations.map((rel, i) => (
                  <div key={i} className="p-1.5 bg-slate-50 rounded-xs border border-slate-200 text-slate-800">
                    • {rel}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">Accession</p>
              <p className="font-mono text-adha-navy font-bold text-xs mt-0.5">{selectedEntity.accession}</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
            className="w-full mt-3 antd-btn-primary py-2 justify-center text-xs"
          >
            Open Record <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

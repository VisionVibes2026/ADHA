import React from 'react';
import { Settings, Shield, Users } from 'lucide-react';

export default function AdminPlaceholder({ title, description }) {
  return (
    <div className="bg-white border border-adha-border rounded p-8 shadow-2xs space-y-4 max-w-2xl">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="p-2 bg-slate-100 rounded text-adha-navy">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-xl text-adha-navy">{title}</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{description}</p>
        </div>
      </div>
      <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 font-mono">
        <p className="font-bold text-slate-800 mb-1">Institutional Administration Active</p>
        <p>This folio module is configured for National Archival Administrators. All policy updates require multi-signature approval.</p>
      </div>
    </div>
  );
}

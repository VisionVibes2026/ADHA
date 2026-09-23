import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { CONNECTED_INSTITUTIONS } from '../data/mockRecords';

export default function AnalyticsView() {
  const { records } = useArchive();

  // Derive collection distribution from actual data
  const collectionDist = records.reduce((acc, record) => {
    const cat = record.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const typeDist = records.reduce((acc, record) => {
    acc[record.type] = (acc[record.type] || 0) + 1;
    return acc;
  }, {});

  const languageDist = records.reduce((acc, record) => {
    const lang = record.language.split(' / ')[0];
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const verificationDist = records.reduce((acc, record) => {
    const state = record.verificationState || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const institutionDist = records.reduce((acc, record) => {
    acc[record.institution] = (acc[record.institution] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-5 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-adha-navy tracking-tight">Repository Statistics</h1>
        <p className="text-xs text-slate-600 mt-1">
          Composition analysis of the current repository dataset. All figures reflect the sample data loaded in this prototype.
        </p>
      </div>

      {/* Summary Stats — derived from data */}
      <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-base font-serif font-bold text-adha-navy">Dataset Summary</h2>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">
              <th className="p-3 font-semibold">METRIC</th>
              <th className="p-3 font-semibold">VALUE</th>
              <th className="p-3 font-semibold">NOTE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            <tr>
              <td className="p-3 text-slate-700">Total Records</td>
              <td className="p-3 font-bold text-adha-navy text-base">{records.length}</td>
              <td className="p-3 text-slate-500">Sample dataset</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Verified Records</td>
              <td className="p-3 font-bold text-emerald-700">{records.filter(r => r.verificationState === 'Verified').length}</td>
              <td className="p-3 text-slate-500">{((records.filter(r => r.verificationState === 'Verified').length / records.length) * 100).toFixed(0)}% of dataset</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Unique Languages</td>
              <td className="p-3 font-bold text-slate-900">{Object.keys(languageDist).length}</td>
              <td className="p-3 text-slate-500">{Object.keys(languageDist).join(', ')}</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-700">Connected Institutions</td>
              <td className="p-3 font-bold text-slate-900">{CONNECTED_INSTITUTIONS.length}</td>
              <td className="p-3 text-slate-500">All active</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Distribution Tables Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Collection Distribution */}
        <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-serif font-bold text-adha-navy">Collection Distribution</h3>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase">
                <th className="p-2.5">COLLECTION</th>
                <th className="p-2.5 text-right">RECORDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(collectionDist).map(([key, val]) => (
                <tr key={key} className="hover:bg-slate-50">
                  <td className="p-2.5 font-sans text-slate-800">{key}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-adha-navy">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Document Type Distribution */}
        <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-serif font-bold text-adha-navy">Document Type Distribution</h3>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase">
                <th className="p-2.5">TYPE</th>
                <th className="p-2.5 text-right">RECORDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(typeDist).map(([key, val]) => (
                <tr key={key} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono text-slate-800">{key}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-adha-navy">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Institution Distribution */}
        <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-serif font-bold text-adha-navy">Records by Institution</h3>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase">
                <th className="p-2.5">INSTITUTION</th>
                <th className="p-2.5 text-right">RECORDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(institutionDist).map(([key, val]) => (
                <tr key={key} className="hover:bg-slate-50">
                  <td className="p-2.5 font-sans text-slate-800">{key}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-adha-navy">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verification Distribution */}
        <div className="bg-white border border-slate-200 rounded-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-serif font-bold text-adha-navy">Verification Status</h3>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-mono text-slate-500 uppercase">
                <th className="p-2.5">STATUS</th>
                <th className="p-2.5 text-right">RECORDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(verificationDist).map(([key, val]) => (
                <tr key={key} className="hover:bg-slate-50">
                  <td className="p-2.5 font-sans text-slate-800">{key}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-adha-navy">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

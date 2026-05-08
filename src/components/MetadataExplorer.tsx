/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Network, Database, ChevronRight, ChevronDown, List, Info, DatabaseZap } from 'lucide-react';
import { MOCK_ORG_UNITS, MOCK_DATA_ELEMENTS } from '../constants';
import { OrgUnit } from '../types';

export default function MetadataExplorer() {
  const [expandedOU, setExpandedOU] = useState<Record<string, boolean>>({ 'ou1': true });

  const toggleOU = (id: string) => {
    setExpandedOU(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderOrgUnit = (ou: OrgUnit) => (
    <div key={ou.id} className="ml-4">
      <div 
        className="flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 rounded-md cursor-pointer group transition-colors"
        onClick={() => ou.children && toggleOU(ou.id)}
      >
        {ou.children ? (
          expandedOU[ou.id] ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />
        ) : (
          <div className="w-3.5" />
        )}
        <Network size={16} className={`group-hover:text-blue-500 transition-colors ${ou.level === 1 ? 'text-blue-600' : 'text-slate-400'}`} />
        <span className={`text-sm ${ou.level === 1 ? 'font-bold' : 'font-medium'} text-slate-800`}>{ou.name}</span>
        <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 uppercase font-bold tracking-tighter">Level {ou.level}</span>
      </div>
      {ou.children && expandedOU[ou.id] && (
        <div className="border-l border-slate-200 ml-2 mt-1">
          {ou.children.map(renderOrgUnit)}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="p-6 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <DatabaseZap className="text-blue-600" />
          Metadata Explorer
        </h2>
        <p className="text-sm text-slate-500 mt-1">Simulated DHIS2 hierarchy and data element configuration.</p>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Org Unit Tree */}
        <div className="w-1/3 border-r border-slate-200 p-6 overflow-y-auto bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Network size={14} />
              Organisation Units
            </h3>
          </div>
          <div className="-ml-4">
            {MOCK_ORG_UNITS.map(renderOrgUnit)}
          </div>
        </div>

        {/* Data Elements Table */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <List size={14} />
              Data Elements
            </h3>
            <span className="text-[10px] text-slate-500 italic">Showing {MOCK_DATA_ELEMENTS.length} records</span>
          </div>

          <div className="grid gap-4">
            {MOCK_DATA_ELEMENTS.map(de => (
              <div key={de.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Database size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{de.name}</h4>
                      <p className="text-xs text-blue-600 font-mono mt-0.5">{de.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-100 uppercase">
                      {de.valueType}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100 uppercase">
                      {de.aggregationType}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                  <Info size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">{de.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Info Box */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-slate-400 border border-slate-800 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <DatabaseZap size={18} className="text-blue-500" />
                Interoperability Tip
              </h4>
              <p className="text-sm leading-relaxed">
                When fetching metadata via the API, always use <code className="text-blue-400 bg-blue-900/40 px-1 rounded">fields=id,name,displayName</code> to optimize response size. For tracked entities, ensure the <code className="text-blue-400">programUid</code> is correctly mapped in your request body.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-slate-800 opacity-50 group-hover:text-blue-900 group-hover:opacity-30 transition-all duration-700">
              <Database size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

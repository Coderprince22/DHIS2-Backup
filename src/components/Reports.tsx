/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  Printer, 
  Mail, 
  Share2,
  Table as TableIcon,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

const REPORT_TEMPLATES = [
  { id: 'rep1', title: 'Monthly Facility Performance Report', type: 'Standard Report', updated: '2h ago', category: 'Routine' },
  { id: 'rep2', title: 'Malaria Surveillance Summary', type: 'Dataset Report', updated: '1d ago', category: 'Surveillance' },
  { id: 'rep3', title: 'HIV Program Outcome Indicators', type: 'Custom XML Report', updated: '3h ago', category: 'Programs' },
  { id: 'rep4', title: 'Vaccine Inventory & Cold Chain', type: 'Standard Report', updated: '5d ago', category: 'Logistics' },
  { id: 'rep5', title: 'ANC Dropout Rate Analysis', type: 'Pivot Table Export', updated: '12h ago', category: 'MCH' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <header className="p-6 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="text-blue-600" />
          Reporting Center
        </h2>
        <p className="text-sm text-slate-500 mt-1">Generate, schedule, and distribute official health system reports.</p>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Reports Navigation */}
        <div className="w-96 bg-white border-r border-slate-200 flex flex-col overflow-hidden shrink-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find report template..." 
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 pl-10 text-xs shadow-inner focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            </div>
            <div className="flex gap-2 mt-4">
               <button className="flex-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-200 uppercase tracking-widest">
                 Standard
               </button>
               <button className="flex-1 px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-widest hover:bg-slate-100 transition-colors">
                 Datasets
               </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {REPORT_TEMPLATES.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border group ${
                  selectedReport === report.id 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20 translate-x-1' 
                    : 'bg-white text-slate-700 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                   <div className={`p-1.5 rounded-lg ${selectedReport === report.id ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
                      <FileText size={16} />
                   </div>
                   <span className={`text-[10px] uppercase font-black tracking-widest ${selectedReport === report.id ? 'text-blue-100' : 'text-slate-400'}`}>
                     {report.category}
                   </span>
                </div>
                <h4 className={`text-sm font-bold leading-tight line-clamp-2 ${selectedReport === report.id ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {report.title}
                </h4>
                <div className="mt-3 flex items-center justify-between">
                   <span className={`text-[9px] font-bold uppercase tracking-tight ${selectedReport === report.id ? 'text-blue-100' : 'text-slate-500'}`}>
                     {report.type}
                   </span>
                   <span className={`text-[9px] ${selectedReport === report.id ? 'text-blue-200' : 'text-slate-400 font-medium'}`}>
                     Refreshed {report.updated}
                   </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Preview */}
        <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden">
          {selectedReport ? (
            <>
              <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
                <div>
                   <h3 className="text-xl font-bold text-slate-900">
                     {REPORT_TEMPLATES.find(r => r.id === selectedReport)?.title}
                   </h3>
                   <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar size={14} className="text-blue-500" /> Apr 01, 2026 - Apr 30, 2026
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Activity size={14} className="text-emerald-500" /> Org Unit: National Level
                      </div>
                   </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200 bg-white">
                    <Printer size={18} />
                  </button>
                  <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200 bg-white">
                    <Mail size={18} />
                  </button>
                  <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200 bg-white">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 overflow-x-hidden">
                {/* Simulated Report Page */}
                <div className="max-w-4xl mx-auto bg-white shadow-2xl border border-slate-200 rounded-sm p-12 min-h-[1000px] flex flex-col relative overflow-hidden ring-8 ring-slate-100">
                  <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center text-white text-3xl font-black">M</div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Health Integration System</h4>
                          <h3 className="text-2xl font-black text-slate-900 uppercase">Monthly Performance Digest</h3>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xs font-bold text-slate-500">Report ID: R-2026-04-12</p>
                        <p className="text-xs font-bold text-slate-500">Generated: May 08, 2026</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 mb-12">
                     <div className="space-y-6">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 pb-2 border-b border-blue-100 flex items-center gap-2">
                          <Activity size={14} /> Vital Statistics
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-slate-50 p-4 rounded-xl">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Live Births</p>
                              <p className="text-2xl font-black text-slate-900">4,102</p>
                           </div>
                           <div className="bg-slate-50 p-4 rounded-xl">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Infant Mortality</p>
                              <p className="text-2xl font-black text-red-600">12.1 <span className="text-sm font-bold text-red-400">/1k</span></p>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 pb-2 border-b border-emerald-100 flex items-center gap-2">
                          <TableIcon size={14} /> Coverage Summary
                        </h5>
                         <table className="w-full text-left text-xs font-medium">
                            <tbody>
                               <tr className="border-b border-slate-100">
                                  <td className="py-2 text-slate-500">DTP3 Coverage</td>
                                  <td className="py-2 text-right font-black">87.4%</td>
                               </tr>
                               <tr className="border-b border-slate-100">
                                  <td className="py-2 text-slate-500">Measles 1st Dose</td>
                                  <td className="py-2 text-right font-black">91.2%</td>
                               </tr>
                               <tr className="border-b border-slate-100">
                                  <td className="py-2 text-slate-500">ART Retention (12m)</td>
                                  <td className="py-2 text-right font-black">78.5%</td>
                               </tr>
                            </tbody>
                         </table>
                     </div>
                  </div>

                  <div className="flex-1 space-y-8">
                     <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <PieChartIcon size={14} /> Analytical Narrative
                     </h5>
                     <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-4">
                        <p>
                           During the reporting period of April 2026, the national health system showed a significant stabilization in routine immunization services. DTP3 coverage reached 87.4%, representing a 2.1% increase from the previous quarter. However, the ANC dropout rate between 1st and 4th visits remains a concern in Region B (currently at 24%).
                        </p>
                        <p>
                          Malaria surveillance data indicates a temporary spike in positive RDT cases in the border districts, likely correlated with the extended seasonal rains. Emergency stock of ACT has been dispatched to Districts 1 and 4.
                        </p>
                     </div>
                  </div>

                  <div className="mt-12 pt-8 border-t-2 border-slate-900 flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Official Verification</p>
                        <div className="w-48 h-12 bg-slate-50 rounded border border-slate-200 border-dashed flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase tracking-widest italic">
                          Digitally Signed
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-900 uppercase">DHIS2 Reporting Gateway</p>
                        <p className="text-[9px] font-medium text-slate-500">Generated by System Admin (JD)</p>
                     </div>
                  </div>
                  
                  {/* Watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 select-none pointer-events-none opacity-[0.03] text-[120px] font-black text-slate-900 whitespace-nowrap">
                     OFFICIAL DHIS2 REPORT
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-300 mb-6 shadow-sm border border-blue-100">
                 <FileText size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">No Report Selected</h3>
              <p className="text-slate-500 max-w-md text-center leading-relaxed font-medium">
                Select a report template from the left pane to view details, generate new instances, or manage distribution.
              </p>
              <div className="flex gap-4 mt-8">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div> 12 Active Templates
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> 24 Scheduled Jobs
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

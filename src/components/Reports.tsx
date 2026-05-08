/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Calendar, 
  Printer, 
  Mail, 
  Share2,
  Table as TableIcon,
  PieChart as PieChartIcon,
  Activity,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { reportService, ReportData } from '../services/reportService';
import { REPORT_TYPES, MOCK_ORG_UNITS } from '../constants';

const DATA_SETS = [
  { id: 'ds_malaria', name: 'Malaria Health Facility Report' },
  { id: 'ds_anc', name: 'ANC Monthly Report' },
  { id: 'ds_cbmnc', name: 'CBMNC Report' },
  { id: 'ds_cmam', name: 'CMAM Stock Report' },
];

export default function Reports() {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [selectedDataSet, setSelectedDataSet] = useState<string>(DATA_SETS[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2026-04');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (selectedReportType) {
      loadReportData();
    }
  }, [selectedReportType, selectedDataSet, selectedPeriod]);

  const loadReportData = async () => {
    setIsLoading(true);
    try {
      const reports = await reportService.getAllReportsByDataSet(selectedDataSet, selectedPeriod);
      setReportData(reports);
      
      if (selectedReportType === 'reporting_rate') {
        const expected = MOCK_ORG_UNITS.length;
        const actual = reports.length;
        const complete = reports.filter(r => r.status === 'COMPLETE').length;
        setSummary({
          expected,
          actual,
          complete,
          rate: (actual / expected) * 100,
          completeRate: (complete / expected) * 100
        });
      } else if (selectedReportType === 'dataset_report' || selectedReportType === 'standard_report') {
        // Aggregate values
        const aggregated: Record<string, number> = {};
        reports.forEach(r => {
          Object.entries(r.values || {}).forEach(([key, val]) => {
            const num = parseInt(val as string) || 0;
            aggregated[key] = (aggregated[key] || 0) + num;
          });
        });
        setSummary(aggregated);
      }
    } catch (err) {
      console.error("Failed to load report data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderReportingRate = () => {
    if (!summary) return null;
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Expected Reports</p>
            <p className="text-4xl font-black text-blue-900">{summary.expected}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Reports Received</p>
            <p className="text-4xl font-black text-emerald-900">{summary.actual}</p>
            <p className="text-xs font-bold text-emerald-600 mt-2">{summary.rate.toFixed(1)}% Reporting Rate</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Complete Reports</p>
            <p className="text-4xl font-black text-purple-900">{summary.complete}</p>
            <p className="text-xs font-bold text-purple-600 mt-2">{summary.completeRate.toFixed(1)}% Completeness</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Facility Name</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORG_UNITS.map(ou => {
                const report = reportData.find(r => r.orgUnitId === ou.id);
                return (
                  <tr key={ou.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{ou.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {report ? (
                          report.status === 'COMPLETE' ? (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-tighter flex items-center gap-1">
                              <CheckCircle2 size={12} /> Received
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded uppercase tracking-tighter flex items-center gap-1">
                              <Loader2 size={12} className="animate-spin" /> Incomplete
                            </span>
                          )
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded uppercase tracking-tighter flex items-center gap-1">
                            <AlertCircle size={12} /> Missing
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 text-right font-medium">
                      {report ? 'Recent' : 'N/A'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAggregatedData = (isStandard: boolean) => {
    if (!summary) return null;
    const entries = Object.entries(summary);
    if (entries.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
           <AlertCircle size={48} className="text-slate-300 mb-4" />
           <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No data found for this selection</p>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {isStandard && (
           <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center bg-gradient-to-br from-slate-900 to-blue-900">
              <div>
                 <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-center md:text-left">Performance Snapshot</p>
                 <h4 className="text-2xl font-black uppercase tracking-tight text-center md:text-left">System-wide Aggregation</h4>
              </div>
              <div className="hidden md:flex gap-8">
                 <div className="text-center">
                    <p className="text-blue-300 text-[9px] font-black uppercase tracking-widest mb-1">Total Indicators</p>
                    <p className="text-2xl font-black">{entries.length}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-blue-300 text-[9px] font-black uppercase tracking-widest mb-1">Facilities Reporting</p>
                    <p className="text-2xl font-black">{reportData.length}</p>
                 </div>
              </div>
           </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Data Element ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Aggregated Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.sort((a, b) => b[1] as number - (a[1] as number)).map(([key, val]) => (
                <tr key={key} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-700 font-mono">{key}</td>
                  <td className="px-6 py-4 text-lg font-black text-blue-600 text-right">
                    {(val as number).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <header className="p-6 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="text-blue-600" />
                Reporting Center
              </h2>
              <p className="text-sm text-slate-500 mt-1">Generate official health system summaries from real-time facility data.</p>
           </div>
           <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                 <label className="text-[9px] font-black text-slate-400 border border-slate-200 uppercase tracking-widest text-center">Data Set</label>
                 <select 
                   value={selectedDataSet}
                   onChange={(e) => setSelectedDataSet(e.target.value)}
                   className="bg-white border border-slate-200 rounded-lg py-1 px-3 text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                 >
                   {DATA_SETS.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
                 </select>
              </div>
              <div className="flex flex-col gap-1">
                 <label className="text-[9px] font-black text-slate-400 border border-slate-200 uppercase tracking-widest text-center">Period</label>
                 <select 
                   value={selectedPeriod}
                   onChange={(e) => setSelectedPeriod(e.target.value)}
                   className="bg-white border border-slate-200 rounded-lg py-1 px-3 text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                 >
                   <option value="2026-04">April 2026</option>
                   <option value="2026-03">March 2026</option>
                   <option value="2026-05">May 2026</option>
                 </select>
              </div>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Reports Navigation */}
        <div className="w-96 bg-white border-r border-slate-200 flex flex-col overflow-hidden shrink-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Filter report types..." 
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 pl-10 text-xs shadow-inner focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {REPORT_TYPES.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReportType(report.id)}
                className={`w-full text-left p-6 rounded-2xl transition-all border group ${
                  selectedReportType === report.id 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20 translate-x-1' 
                    : 'bg-white text-slate-700 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                   <div className={`p-2 rounded-xl ${selectedReportType === report.id ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
                      {report.id === 'reporting_rate' ? <Activity size={20} /> : <FileText size={20} />}
                   </div>
                </div>
                <h4 className={`text-sm font-black leading-tight mb-2 ${selectedReportType === report.id ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {report.name}
                </h4>
                <p className={`text-[10px] font-bold leading-relaxed ${selectedReportType === report.id ? 'text-blue-100' : 'text-slate-400'}`}>
                   {report.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Report Preview Area */}
        <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden">
          {selectedReportType ? (
            <div className="flex-1 flex flex-col min-h-0">
               <div className="p-8 pb-0 shrink-0">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                          {REPORT_TYPES.find(r => r.id === selectedReportType)?.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                           <div className="flex items-center gap-1.5 text-xs text-slate-500 font-black uppercase tracking-widest">
                             <Calendar size={14} className="text-blue-500" /> {selectedPeriod}
                           </div>
                           <div className="flex items-center gap-1.5 text-xs text-slate-500 font-black uppercase tracking-widest">
                             <CheckCircle2 size={14} className="text-emerald-500" /> {DATA_SETS.find(d => d.id === selectedDataSet)?.name}
                           </div>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button className="p-3 text-slate-500 hover:text-blue-600 hover:bg-white rounded-2xl transition-all border border-slate-200 shadow-sm">
                          <Printer size={20} />
                        </button>
                        <button className="p-3 text-slate-500 hover:text-blue-600 hover:bg-white rounded-2xl transition-all border border-slate-200 shadow-sm">
                          <Share2 size={20} />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-8 pt-0">
                  {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4">
                       <Loader2 className="animate-spin text-blue-600" size={40} />
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consulting Data Repository...</p>
                    </div>
                  ) : (
                    <>
                      {selectedReportType === 'reporting_rate' && renderReportingRate()}
                      {selectedReportType === 'dataset_report' && renderAggregatedData(false)}
                      {selectedReportType === 'standard_report' && renderAggregatedData(true)}
                    </>
                  )}
               </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
              <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-300 mb-8 shadow-xl shadow-blue-500/5 border border-blue-100 rotate-3">
                 <FileText size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Analytical Engine Ready</h3>
              <p className="text-slate-500 max-w-md text-center leading-relaxed font-bold uppercase tracking-widest text-[10px]">
                Select a report module from the left navigation to initiate data aggregation across the health system levels.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

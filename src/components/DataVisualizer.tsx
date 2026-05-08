/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Settings2, 
  Filter, 
  Download, 
  RefreshCw,
  LayoutGrid
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  Legend
} from 'recharts';

const SAMPLE_DATA = [
  { month: 'Jan', coverage: 78, target: 85, visits: 1200 },
  { month: 'Feb', coverage: 82, target: 85, visits: 1450 },
  { month: 'Mar', coverage: 85, target: 85, visits: 1100 },
  { month: 'Apr', coverage: 80, target: 85, visits: 1600 },
  { month: 'May', coverage: 88, target: 85, visits: 1300 },
  { month: 'Jun', coverage: 92, target: 85, visits: 1550 },
];

export default function DataVisualizer() {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={SAMPLE_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '20px' }} />
            <Bar dataKey="coverage" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} name="Coverage (%)" />
            <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} name="Target (%)" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={SAMPLE_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '20px' }} />
            <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} name="OPD Visits" />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={SAMPLE_DATA}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
            <Area type="monotone" dataKey="coverage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorArea)" name="Performance Trend" />
          </AreaChart>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <header className="p-6 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-blue-600" />
              Data Visualizer
            </h2>
            <p className="text-sm text-slate-500 mt-1">Transform analytical dimensions into rich, interactive charts.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleRefresh}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
              <Download size={14} /> Export SVG
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Dimensions Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 p-6 overflow-y-auto shrink-0 shadow-sm flex flex-col gap-8">
           <section>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <LayoutGrid size={14} /> Visualization Type
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setChartType('bar')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${chartType === 'bar' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <BarChart3 size={20} />
                  <span className="text-[9px] font-bold uppercase">Bar</span>
                </button>
                <button 
                  onClick={() => setChartType('line')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${chartType === 'line' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <LineChartIcon size={20} />
                  <span className="text-[9px] font-bold uppercase">Line</span>
                </button>
                <button 
                  onClick={() => setChartType('area')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${chartType === 'area' ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <LineChartIcon size={20} />
                  <span className="text-[9px] font-bold uppercase">Area</span>
                </button>
              </div>
           </section>

           <section className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Filter size={14} /> Dimensions
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Data Items</label>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-wrap gap-1.5">
                    <span className="px-1.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded flex items-center gap-1 opacity-90">
                      ANC 1st Visit <Settings2 size={10} />
                    </span>
                    <span className="px-1.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded flex items-center gap-1 opacity-90">
                      Target 2026 <Settings2 size={10} />
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Periods</label>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    Last 6 Months
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Organisation Units</label>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    National Level » Region A
                  </div>
                </div>
              </div>
           </section>

           <div className="mt-auto p-4 rounded-xl bg-slate-900 text-white shadow-xl shadow-blue-900/10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Visualization Tip</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Use Stacked Area charts for comparing trends over long durations when individual fluctuations matter less than the collective total.
              </p>
           </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 p-8 bg-slate-50/50 flex flex-col overflow-hidden">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none">Maternal Health Performance</h3>
                    <p className="text-sm text-slate-500 mt-2">Aggregated monthly coverage vs system targets.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Peak</p>
                       <p className="text-xl font-black text-emerald-500">92.4%</p>
                    </div>
                    <div className="w-px h-10 bg-slate-100"></div>
                     <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last 6m Avg</p>
                       <p className="text-xl font-black text-blue-600">84.1%</p>
                    </div>
                 </div>
              </div>

              <div className="flex-1 min-h-0 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   {renderChart()}
                </ResponsiveContainer>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                     <span className="text-[10px] font-bold text-slate-500">Actual Performance</span>
                   </div>
                    <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                     <span className="text-[10px] font-bold text-slate-500">System Target</span>
                   </div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Data source: Integrated HMIS 2026 Monthly Extracts</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

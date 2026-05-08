/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  Settings2, 
  Filter, 
  Download, 
  RefreshCw,
  LayoutGrid,
  Loader2,
  Calendar
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
import { reportService } from '../services/reportService';
import { MOCK_ORG_UNITS } from '../constants';

const DATA_SETS = [
  { id: 'ds_malaria', name: 'Malaria Health Facility Report' },
  { id: 'ds_anc', name: 'ANC Monthly Report' },
  { id: 'ds_cbmnc', name: 'CBMNC Report' },
  { id: 'ds_cmam', name: 'CMAM Stock Report' },
];

export default function DataVisualizer() {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDataSet, setSelectedDataSet] = useState(DATA_SETS[1].id); // ANC
  const [selectedPeriod, setSelectedPeriod] = useState('2026-04');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedDataSet, selectedPeriod]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const reports = await reportService.getAllReportsByDataSet(selectedDataSet, selectedPeriod);
      
      // Process data for Recharts: Show data by Org Unit
      const processed = reports.map(r => {
        const item: any = { name: r.orgUnitName.split(' ')[0] }; // Short name
        Object.entries(r.values).forEach(([key, val]) => {
          item[key] = parseInt(val as string) || 0;
        });
        return item;
      });
      
      setChartData(processed);
    } catch (err) {
      console.error("Failed to load visualizer data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData().finally(() => setIsRefreshing(false));
  };

  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-slate-100 rounded-3xl">
          No data available for this selection
        </div>
      );
    }

    // Get top 2-3 fields to display
    const firstItem = chartData[0];
    const keys = Object.keys(firstItem).filter(k => k !== 'name').slice(0, 3);
    const colors = ["#3b82f6", "#10b981", "#f59e0b"];

    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '11px' }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600, paddingTop: '20px' }} />
            {keys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={colors[i]} radius={[4, 4, 0, 0]} barSize={30} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '11px' }} />
            <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600, paddingTop: '20px' }} />
            {keys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[i]} strokeWidth={3} dot={{ r: 4, fill: colors[i], strokeWidth: 2, stroke: '#fff' }} />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '11px' }} />
            <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600, paddingTop: '20px' }} />
            {keys.map((key, i) => (
              <Area key={key} type="monotone" dataKey={key} stroke={colors[i]} fill={colors[i]} fillOpacity={0.1} />
            ))}
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
              <RefreshCw size={18} className={isRefreshing || isLoading ? 'animate-spin' : ''} />
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

           <section className="space-y-6">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Filter size={14} /> Dimensions
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Data Set</label>
                  <select 
                    value={selectedDataSet}
                    onChange={(e) => setSelectedDataSet(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/10"
                  >
                    {DATA_SETS.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Calendar size={14} className="text-blue-500" /> Reporting Period
                  </label>
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/10"
                  >
                    <option value="2026-04">April 2026</option>
                    <option value="2026-03">March 2026</option>
                    <option value="2026-05">May 2026</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Organisation Units</label>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[10px] font-bold text-slate-500 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Blantyre District (All Facilities)
                    </div>
                    <p className="text-[9px] font-medium leading-relaxed italic text-slate-400">
                      Visualization will display comparison between all facilities assigned to this dataset.
                    </p>
                  </div>
                </div>
              </div>
           </section>

           <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Visualization Insight</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Switch between Bar and Line charts to identify outliers in facility performance versus longitudinal trends.
              </p>
           </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 p-8 bg-slate-50/50 flex flex-col overflow-hidden">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/20 p-8 flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                       {DATA_SETS.find(ds => ds.id === selectedDataSet)?.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 mt-3 flex items-center gap-2">
                       <Calendar size={14} /> Analytics for period: {selectedPeriod}
                    </p>
                 </div>
                 {chartData.length > 0 && (
                   <div className="flex gap-6">
                      <div className="text-right">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Value</p>
                         <p className="text-xl font-black text-blue-600">
                            {Math.max(...chartData.flatMap(d => Object.values(d).filter(v => typeof v === 'number') as number[])).toLocaleString()}
                         </p>
                      </div>
                      <div className="w-px h-10 bg-slate-100"></div>
                       <div className="text-right">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Facilities</p>
                         <p className="text-xl font-black text-slate-900">{chartData.length}</p>
                      </div>
                   </div>
                 )}
              </div>

              <div className="flex-1 min-h-0 w-full">
                {isLoading ? (
                   <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                      <Loader2 className="animate-spin" size={48} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Aggregating analytical dimensions...</p>
                   </div>
                ) : renderChart()}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Live Performance Data</span>
                   </div>
                </div>
                <div className="text-[9px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-2">
                   <Settings2 size={12} /> Data source: HMIS Cloud / {selectedPeriod}
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import MetadataExplorer from './components/MetadataExplorer';
import TopicGuide from './components/TopicGuide';
import DataEntry from './components/DataEntry';
import DataVisualizer from './components/DataVisualizer';
import Reports from './components/Reports';
import { 
  ShieldCheck, 
  Activity, 
  LineChart, 
  Tag, 
  AlertTriangle,
  Search,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="grid grid-cols-12 gap-6 p-6 flex-1 overflow-hidden">
             {/* Main Dashboard Stats */}
             <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">DTP3 Coverage</div>
                    <div className="text-2xl font-bold text-blue-600 mt-1">87.4%</div>
                    <div className="text-[10px] text-green-500 flex items-center mt-2 font-bold uppercase">
                      <span className="mr-1">▲</span> +2.1% from Q1
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">ANC 1st Visit</div>
                    <div className="text-2xl font-bold text-slate-800 mt-1">14,202</div>
                    <div className="text-[10px] text-red-500 flex items-center mt-2 font-bold uppercase">
                       <span className="mr-1">▼</span> -0.4% from Q1
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reporting Rate</div>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">94.2%</div>
                    <div className="text-[10px] text-slate-400 flex items-center mt-2 font-bold uppercase">Stable vs Period</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col min-h-[300px] shadow-sm">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="font-bold text-slate-700">Program Data: HIV Viral Load Suppression Rate</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Monthly</span>
                        <span className="px-2 py-1 bg-blue-600 rounded text-[10px] font-bold text-white">Tracker Data</span>
                      </div>
                   </div>
                   <div className="flex-1 flex items-end gap-3 px-4 pb-4 border-l-2 border-b-2 border-slate-100">
                      {[40, 55, 70, 65, 85, 95].map((h, i) => (
                        <div key={i} className="w-full bg-blue-100 rounded-t relative group overflow-hidden" style={{ height: `${h}%` }}>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="w-full bg-blue-500 rounded-t" 
                          />
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 px-4">
                      <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Recent Metadata Changes</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                         <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> 
                         <p className="text-xs text-slate-600 leading-normal hover:text-slate-900 cursor-default transition-colors">
                            <span className="font-bold text-slate-800">New Data Element:</span> Malaria RDT Positives added to dataset.
                         </p>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0"></div> 
                         <p className="text-xs text-slate-600 leading-normal hover:text-slate-900 cursor-default transition-colors">
                            <span className="font-bold text-slate-800">Modified Set:</span> Facility Service (Outpatient) version updated.
                         </p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">System Health</h4>
                    <div className="flex items-center justify-between text-[11px] mb-2">
                       <span className="text-slate-500 font-medium">Analytics Cache Status</span>
                       <span className="text-emerald-500 font-bold">FRESH (10m ago)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[98%] shadow-sm"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 italic">Uptime: 99.99% across all API nodes.</p>
                  </div>
                </div>
             </div>

             {/* AI Sidebar Panel */}
             <div className="col-span-12 lg:col-span-4 h-full">
                <ChatInterface />
             </div>
          </div>
        );
      case 'explorer':
        return <MetadataExplorer />;
      case 'guides':
        return <TopicGuide />;
      case 'data-entry':
        return <DataEntry />;
      case 'data-visualizer':
        return <DataVisualizer />;
      case 'reports':
        return <Reports />;
      case 'administration':
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-12 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 font-bold text-2xl">
              A
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">System Administration</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Manage user roles, organisation units, and system settings. This section is restricted to superusers.
            </p>
            <button 
               onClick={() => setActiveTab('chat')}
               className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              Consult AI for Admin tasks
            </button>
          </div>
        );
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <div>
            <h1 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              DHIS2 Health Workspace
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full uppercase tracking-widest border border-blue-200">v2.40.1</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">System Administration & Health Analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative group">
              <input 
                type="text" 
                placeholder="Search metadata..." 
                className="bg-slate-100 border border-slate-200 rounded-lg py-1.5 px-4 pl-10 text-xs w-64 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              />
              <div className="absolute left-3 top-2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={14} />
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Activity size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 relative overflow-hidden flex flex-col">
          {renderContent()}

          <div className="fixed bottom-6 right-6 z-50">
            <div className="group relative">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-slate-900 transition-all active:scale-95">
                <AlertTriangle size={20} />
              </div>
              <div className="absolute bottom-full right-0 mb-4 w-72 bg-slate-900 text-white p-5 rounded-2xl shadow-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-slate-700">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-3 text-amber-500">
                   System Notice
                 </h4>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                   This workspace utilizes experimental AI models for metadata generation. Always verify configurations in your <span className="text-blue-400">staging environment</span> before production deployment.
                 </p>
                 <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                    <span>Model: Gemini 3 Flash</span>
                    <span className="text-emerald-500">Live</span>
                 </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


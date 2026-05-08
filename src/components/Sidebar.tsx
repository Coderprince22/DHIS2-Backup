/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart3, 
  Settings, 
  Database, 
  Users, 
  ChevronRight, 
  Activity,
  Search,
  MessageSquare,
  BookOpen,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'chat', label: 'System Assistant', icon: MessageSquare },
  { id: 'data-entry', label: 'Data Entry', icon: Database },
  { id: 'data-visualizer', label: 'Data Visualizer', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'explorer', label: 'Metadata Explorer', icon: Search },
  { id: 'guides', label: 'Health Topic Guides', icon: BookOpen },
  { id: 'administration', label: 'System Admin', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-8 shrink-0 border-r border-slate-800">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/40 shrink-0">
        D2
      </div>

      <nav className="flex-1 flex flex-col gap-6 px-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`p-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-slate-800 text-blue-400 border-l-4 border-blue-500 rounded-l-none' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-500'
              }`}
            >
              <Icon size={24} className={isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'} />
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-glow"
                  className="absolute inset-0 bg-blue-500/5 rounded-xl -z-10"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto mb-2">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
          JD
        </div>
      </div>
    </aside>
  );
}

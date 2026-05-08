/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Activity, 
  CheckCircle2, 
  Tag, 
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  LineChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS } from '../constants';
import { Topic } from '../types';

export default function TopicGuide() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Configuration': return <ShieldCheck size={20} className="text-blue-500" />;
      case 'Data Management': return <Activity size={20} className="text-emerald-500" />;
      case 'Analysis': return <LineChart size={20} className="text-orange-500" />;
      case 'Administration': return <Tag size={20} className="text-purple-500" />;
      default: return <BookOpen size={20} className="text-slate-500" />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 overflow-hidden flex flex-col">
      <header className="p-8 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <BookOpen className="text-blue-600" />
          Health Topic Guides
        </h2>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Curated configuration and workflow guides for common public health interventions. Use these templates as a baseline for your DHIS2 implementation.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-8 pt-4">
        {!selectedTopic ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTopic(topic)}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                    {getCategoryIcon(topic.category)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">
                    {topic.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{topic.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{topic.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {topic.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">#{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  View Guide <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="p-8 border-b border-slate-100 flex items-start justify-between">
              <div>
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="text-xs font-bold text-blue-600 mb-4 hover:underline flex items-center gap-1"
                >
                  <ChevronRight size={14} className="rotate-180" /> Back to Guides
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-blue-50">{getCategoryIcon(selectedTopic.category)}</div>
                  <h3 className="text-3xl font-bold text-slate-900 leading-tight">{selectedTopic.title}</h3>
                </div>
                <p className="text-slate-500 mt-2 text-lg leading-relaxed">{selectedTopic.description}</p>
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-4">Implementation Overview</h4>
                  <p className="text-slate-700 leading-relaxed text-lg">{selectedTopic.content}</p>
                </div>

                {selectedTopic.steps && (
                  <div>
                    <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-6">Step-by-Step Configuration</h4>
                    <div className="space-y-4">
                      {selectedTopic.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            {idx + 1}
                          </div>
                          <p className="text-slate-800 text-base font-medium pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
                  <h5 className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-3">
                    <CheckCircle2 size={18} />
                    Quality Checklist
                  </h5>
                   <ul className="space-y-2 text-xs text-amber-700 font-medium">
                     <li className="flex gap-2"><span>•</span> Verify Org Unit assignments</li>
                     <li className="flex gap-2"><span>•</span> Check category combos</li>
                     <li className="flex gap-2"><span>•</span> Validate period boundaries</li>
                     <li className="flex gap-2"><span>•</span> Test user permissions</li>
                   </ul>
                </div>

                <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                  <h5 className="font-bold mb-2 flex items-center gap-2">
                    <Stethoscope size={18} />
                    Expert Review
                  </h5>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Need specific adjustments for your local policy? Ask the AI Assistant to rewrite these steps for your unique context.
                  </p>
                  <button 
                    className="w-full mt-4 py-2 bg-white text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
                  >
                    Discuss with AI
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

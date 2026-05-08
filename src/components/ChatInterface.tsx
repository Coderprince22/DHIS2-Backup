/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAI } from '../services/geminiService';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your DHIS2 Expert Assistant. How can I help you with your health information system today? Whether it is configuring a tracker program, troubleshooting data quality issues, or designing dashboards, I am here to help.',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Format history for Gemini
      const history = messages.slice(1).map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }]
      }));

      const aiResponse = await chatWithAI(input, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse || "I am sorry, I couldn't generate a response. Please try again.",
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError("I encountered an issue connecting to my knowledge base. Please check your connectivity and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shadow-inner">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">DHIS2 Expert AI</h2>
            <p className="text-[10px] text-blue-100 flex items-center gap-1 opacity-80">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              Online • metadata-trained
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
           <span className="px-2 py-0.5 bg-blue-500 rounded text-[9px] font-bold text-white uppercase border border-blue-400">v2.41 AI Core</span>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-slate-50 text-[11px]"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-3.5 rounded-xl shadow-sm leading-relaxed max-w-[90%] ${
                message.role === 'user'
                  ? 'bg-blue-50 text-blue-900 border border-blue-100'
                  : 'bg-white text-slate-600 border border-slate-100'
              }`}>
                <div className="prose prose-xs max-w-none prose-slate">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <div className={`text-[9px] mt-1.5 opacity-40 font-medium ${message.role === 'user' ? 'text-right' : ''}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-2 items-center bg-white border border-slate-100 px-3 py-2 rounded-xl shadow-sm">
              <Loader2 size={12} className="text-blue-600 animate-spin" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Analyzing Metadata...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about Tracker, SQL, or metadata..."
            className="flex-1 bg-transparent border-none text-xs focus:ring-0 px-2 py-1 placeholder-slate-400 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="flex justify-between mt-3 px-1">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Presets:</span>
          <div className="flex gap-2">
             <button 
               onClick={() => setInput('Configure a new Tracker program for HIV')}
               className="text-[9px] px-2 py-0.5 bg-slate-100 rounded text-slate-500 hover:bg-slate-200 cursor-pointer border border-slate-200 font-medium"
             >
               Tracker Setup
             </button>
             <button 
               onClick={() => setInput('Write a SQL view for Malaria weekly totals')}
               className="text-[9px] px-2 py-0.5 bg-slate-100 rounded text-slate-500 hover:bg-slate-200 cursor-pointer border border-slate-200 font-medium"
             >
               SQL Pivot
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

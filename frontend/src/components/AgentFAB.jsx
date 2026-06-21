import React, { useState } from 'react';
import { Sparkles, X, Bot } from 'lucide-react';
import ChatWidget from './ChatWidget';

export default function AgentFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-450 via-teal-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_30px_rgba(20,184,166,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none"
        aria-label="Chat con IA"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="h-6 w-6 text-slate-100" />
          ) : (
            <>
              <Bot className="h-6 w-6 text-slate-100 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-2 h-4 w-4 text-teal-200" />
            </>
          )}
        </span>
      </button>

      {/* Floating Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-md bg-transparent transition-all duration-500 transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        } p-6 flex flex-col justify-end`}
      >
        {/* Backdrop for click outside */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 -z-10 bg-slate-950/40 backdrop-blur-sm cursor-pointer"
          ></div>
        )}

        {/* Chat Wrapper */}
        <div className="relative h-[550px] shadow-2xl rounded-3xl">
          {/* Header Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4.5 right-4.5 z-10 p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 hover:border-teal-500 text-slate-300 hover:text-white transition-all focus:outline-none cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          
          <ChatWidget isCompact={true} />
        </div>
      </div>
    </>
  );
}

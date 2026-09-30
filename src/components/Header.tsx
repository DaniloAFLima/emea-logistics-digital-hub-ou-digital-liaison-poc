import React from 'react';
import { Anchor, ShieldCheck, Terminal, Layers, Presentation } from 'lucide-react';

interface HeaderProps {
  activeTab: 'presentation' | 'dashboard' | 'streamlit' | 'architecture' | 'code';
  onTabChange: (tab: 'presentation' | 'dashboard' | 'streamlit' | 'architecture' | 'code') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="border-b border-slate-200 bg-white">
      {/* Top utility bar */}
      <div className="bg-[#07192F] text-slate-300 px-6 py-2 text-xs flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider text-cyan-400">GLOBAL RORO LOGISTICS</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-300 font-mono">EMEA LOGISTICS ARCHITECTURE</span>
          <span className="text-slate-500 hidden sm:inline">·</span>
          <span className="text-slate-400 hidden sm:inline">RoRo Terminal Gateway PoC</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Azure APIM Gateway: Online
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline font-mono">ENV: EMEA-PROD-STAGE</span>
        </div>
      </div>

      {/* Main Brand & Title Header */}
      <div className="px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[#0B2545] text-white flex items-center justify-center shadow-xs">
              <Anchor className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                EMEA Logistics Digital Integration Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Proof of Concept for API Governance · Fleet Visibility & Telematics Ingestion
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: Presentation Deck vs Operations Hub vs Streamlit vs Architecture vs Code */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded border border-slate-200 text-xs font-medium overflow-x-auto">
          <button
            type="button"
            onClick={() => onTabChange('presentation')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'presentation'
                ? 'bg-[#0B2545] text-white shadow-xs font-semibold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Presentation className={`w-3.5 h-3.5 ${activeTab === 'presentation' ? 'text-cyan-400' : 'text-cyan-700'}`} />
            <span>Executive Pitch Deck</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeTab === 'presentation' ? 'bg-cyan-900 text-cyan-200' : 'bg-slate-200 text-slate-700'
            }`}>
              5 Slides
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-700" />
            <span>Operations Hub</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('streamlit')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'streamlit'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-rose-500 font-bold">streamlit</span>
            <span>App Preview</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('architecture')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Azure APIM Specs</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('code')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-700" />
            <span className="font-mono">app.py</span>
          </button>
        </div>
      </div>
    </header>
  );
};

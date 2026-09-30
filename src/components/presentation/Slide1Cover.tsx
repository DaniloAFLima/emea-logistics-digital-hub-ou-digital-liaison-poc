import React, { useState } from 'react';
import { RoRoGraphic } from './RoRoGraphic';
import { Anchor, ArrowRight, Edit3, Shield, Network, Ship } from 'lucide-react';

interface Slide1CoverProps {
  authorName: string;
  onUpdateAuthorName: (name: string) => void;
  onNextSlide: () => void;
}

export const Slide1Cover: React.FC<Slide1CoverProps> = ({
  authorName,
  onUpdateAuthorName,
  onNextSlide,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(authorName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateAuthorName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[640px] bg-gradient-to-br from-[#07192F] via-[#0B2545] to-[#0A192F] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden rounded-xl shadow-2xl border border-slate-800">
      {/* Background Graphic Illustration */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen">
        <RoRoGraphic className="w-full h-full object-cover scale-105" />
      </div>

      {/* Subtle Grid & Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07192F] via-transparent to-transparent pointer-events-none" />

      {/* Slide Top Metadata Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#134074]/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <Anchor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
              GLOBAL RORO LOGISTICS
            </div>
            <div className="text-[11px] text-slate-300">
              Solutions Architecture & Digital Strategy
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px]">SLIDE 01 / 05</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px] hidden md:inline">
            Executive Pitch Deck
          </span>
        </div>
      </div>

      {/* Slide Main Center Content */}
      <div className="relative z-10 my-auto py-8 max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide">
          <Ship className="w-3.5 h-3.5" />
          <span>EMEA RoRo Maritime & Terrestrial Fleet Integration</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
            Bridging the Gap in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              EMEA Logistics
            </span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-200 font-light tracking-wide max-w-2xl">
            Digital Integration Hub - Proof of Concept
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-700/60">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>Azure APIM Gateway Ingestion</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-700/60">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Management by Exception</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-700/60">
            <Anchor className="w-3.5 h-3.5 text-sky-400" />
            <span>Multi-Port Telemetry: Bremerhaven &middot; Zeebrugge &middot; Antwerp &middot; Rotterdam</span>
          </div>
        </div>
      </div>

      {/* Slide Bottom Footer with Author Name (Editable) and Next CTA */}
      <div className="relative z-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Author / Candidate Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-cyan-300 text-sm">
            {authorName.charAt(0) || 'D'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Presented by</span>
              {!isEditingName && (
                <button
                  type="button"
                  onClick={() => {
                    setTempName(authorName);
                    setIsEditingName(true);
                  }}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Customize candidate name"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              )}
            </div>

            {isEditingName ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  placeholder="e.g. Danilo Lima"
                  className="bg-slate-900 border border-cyan-400 text-white px-2 py-0.5 rounded text-xs focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveName}
                  className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-0.5 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-sm font-semibold text-white tracking-wide">
                Created by {authorName} <span className="text-slate-400 font-normal">|</span>{' '}
                <span className="text-cyan-300 font-medium">Digital Liaison Candidate</span>
              </div>
            )}
          </div>
        </div>

        {/* Start Presentation Button */}
        <button
          type="button"
          onClick={onNextSlide}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg hover:shadow-cyan-500/25 shrink-0"
        >
          <span>Begin Presentation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

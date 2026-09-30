import React from 'react';
import { TrendingUp, Globe, Clock, Anchor, CheckCircle2, ArrowRight, RotateCcw, HeartHandshake, ShieldCheck } from 'lucide-react';

interface Slide5ImpactProps {
  authorName: string;
  onPrevSlide: () => void;
  onRestartPresentation: () => void;
  onOpenLiveDashboard: () => void;
}

export const Slide5Impact: React.FC<Slide5ImpactProps> = ({
  authorName,
  onPrevSlide,
  onRestartPresentation,
  onOpenLiveDashboard,
}) => {
  return (
    <div className="w-full h-full min-h-[580px] lg:min-h-[660px] bg-white text-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-xl shadow-xl border border-slate-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Phase 04 · Strategic Value
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500">Expected Impact & Alignment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Expected Business Value & Next Steps
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-[11px] text-slate-600 font-semibold">
            SLIDE 05 / 05
          </span>
        </div>
      </div>

      {/* 3 Simple, High-Impact Cards (TrendingUp, Globe, Clock) */}
      <div className="my-auto py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Operational Efficiency (Upward trend metric) */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Pillar 01 · Execution
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Operational Efficiency
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Drastically reduces manual data entry and reactive phone calls across regional hubs by proactively isolating communications exceptions.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Shift from data chaser to exception manager</span>
            </div>
          </div>

          {/* Card 2: Global IT Alignment (Globe) */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 font-bold">
                  Pillar 02 · Enterprise IT
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Global IT Alignment
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Avoids purchasing new local SaaS tools by reusing enterprise platforms (API Governance via Azure APIM), standardizing integration practices.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
              <span>Centralized policies, no shadow software</span>
            </div>
          </div>

          {/* Card 3: Scalability (Clock) */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-sky-700 font-bold">
                  Pillar 03 · Expansion
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Scalability
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A standardized data contract allows rapid onboarding of new EMEA carriers in days rather than months, supporting network growth.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0" />
              <span>Plug-and-play carrier webhook ingestion</span>
            </div>
          </div>
        </div>

        {/* CLOSING STATEMENT & CALLOUT (Executive Alignment) */}
        <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#07192F] to-[#0B2545] text-white border border-slate-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Closing Statement & Alignment</span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                &ldquo;Thank you for reviewing this conceptual exercise. I look forward to discussing how this mindset can support enterprise global digital strategy.&rdquo;
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:items-end">
              <span className="text-xs text-slate-400">Candidate Signature</span>
              <span className="text-sm font-bold text-white">{authorName}</span>
              <span className="text-xs text-cyan-300">Digital Liaison Candidate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav Controls */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <button
          type="button"
          onClick={onPrevSlide}
          className="px-3.5 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
        >
          &larr; Slide 04: Business to Tech
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRestartPresentation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Presentation (Slide 1)</span>
          </button>

          <button
            type="button"
            onClick={onOpenLiveDashboard}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-cyan-700 hover:bg-cyan-800 text-white font-semibold transition-colors shadow-2xs"
          >
            <span>Explore Live Interactive App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

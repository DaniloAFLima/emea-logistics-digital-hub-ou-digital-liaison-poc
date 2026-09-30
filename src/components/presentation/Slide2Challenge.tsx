import React from 'react';
import { TruckData } from '../../types';
import { PortDelayChart } from '../PortDelayChart';
import { AppPrintFrame } from './AppPrintFrame';
import { AlertCircle, Database, FileSpreadsheet, EyeOff, Quote, ArrowRight } from 'lucide-react';

interface Slide2ChallengeProps {
  trucks: TruckData[];
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

export const Slide2Challenge: React.FC<Slide2ChallengeProps> = ({
  trucks,
  onNextSlide,
  onPrevSlide,
}) => {
  return (
    <div className="w-full h-full min-h-[580px] lg:min-h-[640px] bg-white text-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-xl shadow-xl border border-slate-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 font-mono">
              Phase 01 · Problem Statement
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500">The Business Challenge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            The Current Landscape: Data Silos & Manual Processes
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-[11px] text-slate-600 font-semibold">
            SLIDE 02 / 05
          </span>
        </div>
      </div>

      {/* Main Grid: Left Column (Narrative & Callout) + Right Column (App Print / Port Delay Chart) */}
      <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Business Bottlenecks & Callout Box */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Operating a large-scale regional logistics network across EMEA often encounters a critical bottleneck:
          </p>

          {/* 3 Core Pain Points (Natural editorial flow, anti-slop) */}
          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5 text-rose-600">
                <Database className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Fragmented Systems</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Terrestrial carriers use local, disconnected legacy systems with incompatible protocols and missing data standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5 text-amber-600">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Manual Hand-offs</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over-reliance on emails, spreadsheets, and manual data entry to track vehicle transit between inland plants and ports.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                <EyeOff className="w-4 h-4 text-slate-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Lack of Real-Time Visibility</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Port operators lack proactive alerts, leading to reactive decision-making and potential vessel loading delays.
                </p>
              </div>
            </div>
          </div>

          {/* REQUIRED CALLOUT BOX: Core Guiding Principle */}
          <div className="relative p-5 rounded-lg bg-[#0B2545] text-white border-l-4 border-cyan-400 shadow-md">
            <Quote className="w-6 h-6 text-cyan-400/40 absolute top-3 right-3" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 font-mono mb-1">
              Guiding Principle
            </div>
            <p className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug">
              &ldquo;The goal is to stop managing data and start managing exceptions.&rdquo;
            </p>
            <p className="text-xs text-slate-300 mt-2">
              Transforming raw telemetry chaos into decisive, actionable terminal governance.
            </p>
          </div>
        </div>

        {/* Right Column: App Print (image_8a4d71.png - Port Delay Analysis) */}
        <div className="lg:col-span-6 space-y-2">
          <AppPrintFrame
            title="Maritime Port Delay Impact Visualization"
            imageFileName="image_8a4d71.png"
            subtitle="Live App Snapshot: Aggregated Delay_Minutes grouped by Destination_Port"
            heightClass="max-h-[460px]"
          >
            <div className="scale-95 origin-top">
              <PortDelayChart trucks={trucks} />
            </div>
          </AppPrintFrame>
          <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
            <span>Illustrates operational latency accumulated prior to terminal gate-in</span>
            <span className="font-semibold text-rose-600">Threshold: 60m SLA Risk</span>
          </div>
        </div>
      </div>

      {/* Footer Nav Controls */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <button
          type="button"
          onClick={onPrevSlide}
          className="px-3.5 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
        >
          &larr; Slide 01: Cover
        </button>

        <div className="text-slate-400 hidden sm:block">
          EMEA RoRo Maritime & Terrestrial Digital Integration Hub
        </div>

        <button
          type="button"
          onClick={onNextSlide}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#0B2545] hover:bg-[#134074] text-white font-semibold transition-colors"
        >
          <span>Slide 03: The Proposed Solution</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TruckData } from '../../types';
import { KpiCards } from '../KpiCards';
import { ActionableTable } from '../ActionableTable';
import { AppPrintFrame } from './AppPrintFrame';
import { Layers, Activity, ShieldAlert, Sparkles, ArrowRight, Play, Eye } from 'lucide-react';

interface Slide3SolutionProps {
  trucks: TruckData[];
  onSyncTruck: (truckId: string) => void;
  onSyncAllActionable: () => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onOpenLiveDashboard: () => void;
}

export const Slide3Solution: React.FC<Slide3SolutionProps> = ({
  trucks,
  onSyncTruck,
  onSyncAllActionable,
  onNextSlide,
  onPrevSlide,
  onOpenLiveDashboard,
}) => {
  const [interactiveMode, setInteractiveMode] = useState(true);

  return (
    <div className="w-full h-full min-h-[620px] lg:min-h-[720px] bg-slate-50 text-slate-900 flex flex-col justify-between p-5 sm:p-8 lg:p-10 rounded-xl shadow-xl border border-slate-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3 bg-white -m-5 sm:-m-8 lg:-m-10 mb-4 p-5 sm:p-8 lg:p-10 rounded-t-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 font-mono">
              Phase 02 · Flagship Showcase
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Core Deliverable
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Introducing the Digital Integration Hub (PoC)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            A centralized dashboard demonstrating how integrated APIs can transform regional operations:
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenLiveDashboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Open in Full Operations Hub</span>
          </button>
          <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-[11px] text-slate-600 font-semibold">
            SLIDE 03 / 05
          </span>
        </div>
      </div>

      {/* 3 Executive Solution Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-cyan-50 flex items-center justify-center text-cyan-700 shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Real-Time Telemetry</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Consolidates carrier data into one unified view across 8 factories and 4 maritime terminals.
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Managing by Exception</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Automatically isolates and flags trucks with API failures (<span className="font-semibold text-amber-800">"Manual Entry"</span> or <span className="font-semibold text-rose-700">"API Error"</span>).
          </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Proactive Operations</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Empowers regional managers to address critical delays before they impact terminal flow and vessel loading.
          </p>
        </div>
      </div>

      {/* CORE SPEC: FLAGSHIP SOLUTION SLIDE */}
      {/* Top: image_8a4cb4.png (KPIs and Header) */}
      {/* Bottom: image_8a503d.png (Actionable Alerts Table) */}
      <div className="space-y-4 my-auto">
        {/* TOP PRINT: image_8a4cb4.png (KPIs and App Header) */}
        <AppPrintFrame
          title="Executive Fleet KPIs & Telemetry Status"
          imageFileName="image_8a4cb4.png"
          subtitle="Top Banner: Live Fleet Volume, APIM Success Rate SLA, and Critical Delay Cut-Off Counters"
          heightClass="max-h-[220px]"
        >
          {/* Simulated App Header Snippet + KPI Cards */}
          <div className="space-y-3">
            <div className="hidden sm:flex items-center justify-between px-3 py-1.5 bg-[#0B2545] text-white rounded text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wider text-cyan-400 font-mono">GLOBAL RORO LOGISTICS</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-200">EMEA Logistics Digital Integration Hub (PoC)</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-300">
                <span className="text-emerald-300 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Azure APIM: Active
                </span>
              </div>
            </div>
            <KpiCards trucks={trucks} />
          </div>
        </AppPrintFrame>

        {/* BOTTOM PRINT: image_8a503d.png (Actionable Alerts Table) */}
        <AppPrintFrame
          title="Actionable Disrupted Telemetry & Silo Exceptions"
          imageFileName="image_8a503d.png"
          subtitle="Exception Management View: Automatically flags 'API Error' and 'Manual Entry' with 1-click APIM remediation"
          heightClass="max-h-[380px]"
        >
          <div className="text-xs">
            <ActionableTable
              trucks={trucks}
              onSyncTruck={onSyncTruck}
              onSyncAllActionable={onSyncAllActionable}
            />
          </div>
        </AppPrintFrame>
      </div>

      {/* Slide Navigation Footer */}
      <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-xs text-slate-500">
        <button
          type="button"
          onClick={onPrevSlide}
          className="px-3.5 py-1.5 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
        >
          &larr; Slide 02: Challenge
        </button>

        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="font-semibold text-slate-700">Flagship Slide</span>
          <span>·</span>
          <span>Click "Trigger Azure APIM Bulk Sync" in the table above to demo live recovery!</span>
        </div>

        <button
          type="button"
          onClick={onNextSlide}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#0B2545] hover:bg-[#134074] text-white font-semibold transition-colors"
        >
          <span>Slide 04: Business to Tech</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

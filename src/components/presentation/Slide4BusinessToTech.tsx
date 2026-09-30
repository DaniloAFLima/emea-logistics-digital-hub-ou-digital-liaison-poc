import React, { useState } from 'react';
import { TruckData } from '../../types';
import { AppPrintFrame } from './AppPrintFrame';
import { FullFleetTable } from '../FullFleetTable';
import {
  ArrowRight,
  ArrowDown,
  UserCheck,
  Cpu,
  Layers,
  Database,
  Cloud,
  FileCode2,
  CheckCircle2,
  ExternalLink,
  Table as TableIcon
} from 'lucide-react';

interface Slide4BusinessToTechProps {
  trucks: TruckData[];
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

export const Slide4BusinessToTech: React.FC<Slide4BusinessToTechProps> = ({
  trucks,
  onNextSlide,
  onPrevSlide,
}) => {
  const [showRawDataModal, setShowRawDataModal] = useState(false);

  return (
    <div className="w-full h-full min-h-[580px] lg:min-h-[660px] bg-white text-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-xl shadow-xl border border-slate-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 font-mono">
              Phase 03 · Solutions Alignment
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500">Business-to-Tech Translation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Turning Operational Needs into Technical Requirements
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-[11px] text-slate-600 font-semibold">
            SLIDE 04 / 05
          </span>
        </div>
      </div>

      {/* Main Two-Column Side-by-Side Flow */}
      <div className="my-auto py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          {/* Box 1: The Business Need (User Story) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white rounded-xl border-2 border-slate-200 p-6 flex flex-col justify-between relative shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-sky-800 font-bold">
                      Box 1 · Operational Perspective
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      The Business Need (User Story)
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200">
                  Persona: Terminal Manager
                </span>
              </div>

              {/* Exact prompt quote */}
              <div className="p-4 rounded-lg bg-white border border-sky-200/80 shadow-xs relative">
                <p className="text-sm sm:text-base text-slate-800 font-medium italic leading-relaxed">
                  &ldquo;As a Terminal Manager, I need the system to automatically filter out standard on-time deliveries and only flag trucks with failed communications, so my team can focus strictly on resolving high-risk exceptions.&rdquo;
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eliminate visual clutter from hundreds of routine on-time trucks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Immediate alerts when carrier telematics fail before gate cut-off</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Clear accountability between factory dispatch and maritime stevedores</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Goal: Operational Focus</span>
              <span className="font-semibold text-sky-700">Zero-Noise Triage</span>
            </div>
          </div>

          {/* Central Transformation Arrow */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 lg:py-0">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#0B2545] text-cyan-300 flex items-center justify-center shadow-lg border border-cyan-400/40">
                <ArrowRight className="w-6 h-6 hidden lg:block" />
                <ArrowDown className="w-6 h-6 lg:hidden" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 text-center">
                Digital Liaison <br className="hidden lg:block" /> Bridge
              </span>
              <span className="text-[10px] text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                Azure APIM Gateway
              </span>
            </div>
          </div>

          {/* Box 2: The Technical Requirement (Architecture) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#07192F] to-[#0B2545] text-white rounded-xl border-2 border-cyan-500/40 p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Box 2 · Technical Architecture
                    </div>
                    <h3 className="text-base font-bold text-white">
                      The Technical Requirement (Architecture)
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">
                  Azure Cloud
                </span>
              </div>

              {/* Exact prompt requirement */}
              <div className="p-4 rounded-lg bg-slate-900/80 border border-cyan-500/30 shadow-inner">
                <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed font-mono">
                  Deploy Azure API Management as a gateway to ingest standardized JSON webhooks (Truck_ID, Status, Delay) from regional carriers, synchronizing directly with the global database to prevent localized shadow IT.
                </p>
              </div>

              {/* Technical Enablers & Policies */}
              <div className="space-y-2 pt-1 text-xs text-slate-300 font-mono text-[11px]">
                <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60 border border-slate-700">
                  <FileCode2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Payload Contract: <code className="text-cyan-300">{`{ Truck_ID, Status, Delay_Minutes }`}</code></span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60 border border-slate-700">
                  <Cloud className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Inbound Gateway Policy: Retry on 5xx & Backoff Transform</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60 border border-slate-700">
                  <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Elimination of Localized Shadow IT & Fragmented Spreadsheets</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Standardized Integration Contract</span>
              <span className="font-semibold text-cyan-300">Single Source of Truth</span>
            </div>
          </div>
        </div>

        {/* Optional Prompt Feature: Corner snapshot of 'image_8a50b2.png' (Full Database) */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <TableIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-800">
                  Underlying Raw Ingest Database
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                  image_8a50b2.png
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                20 inland carrier records across 8 factory origins feeding the central integration hub
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowRawDataModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-2xs transition-colors shrink-0"
          >
            <span>Inspect Full Fleet Table (image_8a50b2.png)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Raw Data Modal when requested */}
      {showRawDataModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="bg-[#07192F] text-white px-5 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-cyan-400 font-bold">image_8a50b2.png</span>
                <span className="text-slate-400">·</span>
                <span>Full EMEA Fleet Telemetry Baseline (20 Trucks)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowRawDataModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded"
              >
                Close [✕]
              </button>
            </div>
            <div className="overflow-auto p-4 flex-1">
              <FullFleetTable trucks={trucks} onReset={() => {}} />
            </div>
          </div>
        </div>
      )}

      {/* Footer Nav Controls */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <button
          type="button"
          onClick={onPrevSlide}
          className="px-3.5 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
        >
          &larr; Slide 03: The Proposed Solution
        </button>

        <div className="text-slate-400 hidden sm:block">
          Translating Operational Needs into Technical Requirements
        </div>

        <button
          type="button"
          onClick={onNextSlide}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#0B2545] hover:bg-[#134074] text-white font-semibold transition-colors"
        >
          <span>Slide 05: Expected Impact & Alignment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

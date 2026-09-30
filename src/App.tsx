/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { PortDelayChart } from './components/PortDelayChart';
import { ActionableTable } from './components/ActionableTable';
import { FullFleetTable } from './components/FullFleetTable';
import { StreamlitView } from './components/StreamlitView';
import { ArchitectureView } from './components/ArchitectureView';
import { CodeViewer } from './components/CodeViewer';
import { PresentationView } from './components/presentation/PresentationView';
import { INITIAL_TRUCKS } from './data/mockTrucks';
import { APP_PY_CODE } from './data/appPyCode';
import { TruckData } from './types';
import { CheckCircle2, Shield, Info, ArrowRight } from 'lucide-react';

export default function App() {
  const [trucks, setTrucks] = useState<TruckData[]>(INITIAL_TRUCKS);
  const [activeTab, setActiveTab] = useState<'presentation' | 'dashboard' | 'streamlit' | 'architecture' | 'code'>('presentation');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSyncTruck = (truckId: string) => {
    setTrucks((prev) =>
      prev.map((t) => {
        if (t.Truck_ID === truckId) {
          // Normalize delay slightly upon successful gateway retry
          return {
            ...t,
            API_Integration_Status: 'Synced',
            Delay_Minutes: Math.max(0, t.Delay_Minutes - 15),
          };
        }
        return t;
      })
    );
    showToast(`Remediated unit ${truckId}: Azure APIM policy executed retry & reconciled telemetry into Synced.`);
  };

  const handleSyncAllActionable = () => {
    setTrucks((prev) =>
      prev.map((t) => ({
        ...t,
        API_Integration_Status: 'Synced',
        Delay_Minutes: Math.min(t.Delay_Minutes, 30),
      }))
    );
    showToast('All 8 legacy silo units successfully ingested into Azure APIM. Fleet API Success Rate is now 100%.');
  };

  const handleReset = () => {
    setTrucks(INITIAL_TRUCKS);
    showToast('Dataset reset to initial 20-truck baseline state.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2545] text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Corporate Header */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'presentation' && (
          <PresentationView
            trucks={trucks}
            onSyncTruck={handleSyncTruck}
            onSyncAllActionable={handleSyncAllActionable}
            onOpenLiveDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Architect Context Alert */}
            <div className="bg-[#0B2545] text-white p-4 sm:p-5 rounded-lg border-l-4 border-cyan-400 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs uppercase font-bold tracking-wider text-cyan-300">
                    Solutions Architect Evaluation Note
                  </span>
                </div>
                <p className="text-xs text-slate-200 max-w-3xl leading-relaxed">
                  Demonstrating RoRo inland carrier telemetry reconciliation. Units with API errors or manual entries risk missing vessel cut-off windows at Bremerhaven and Zeebrugge. Azure API Management provides automated retry policies, rate-limiting, and EDI-to-JSON transforms.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('presentation')}
                  className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>Open Pitch Deck</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('streamlit')}
                  className="px-3 py-1.5 rounded bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>Streamlit Mode</span>
                </button>
              </div>
            </div>

            {/* 1. KPI Cards (st.columns equivalent) */}
            <section aria-label="Key Performance Indicators">
              <KpiCards trucks={trucks} />
            </section>

            {/* 2. Visuals: Bar Chart of Average Delay_Minutes grouped by Destination_Port */}
            <section aria-label="Port Transit Performance Visuals">
              <PortDelayChart trucks={trucks} />
            </section>

            {/* 3. Actionable Data: Table showing ONLY "API Error" and "Manual Entry" */}
            <section aria-label="Actionable Disrupted Telemetry Units">
              <ActionableTable
                trucks={trucks}
                onSyncTruck={handleSyncTruck}
                onSyncAllActionable={handleSyncAllActionable}
              />
            </section>

            {/* 4. Full Fleet Reference */}
            <section aria-label="Full Fleet Dataset">
              <FullFleetTable trucks={trucks} onReset={handleReset} />
            </section>
          </div>
        )}

        {activeTab === 'streamlit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded border border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Streamlit Interactive Replica</span>
                <span>· Executing <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">streamlit run app.py</code></span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className="text-cyan-700 hover:underline font-semibold"
              >
                Inspect python script &rarr;
              </button>
            </div>
            <StreamlitView trucks={trucks} />
          </div>
        )}

        {activeTab === 'architecture' && <ArchitectureView />}

        {activeTab === 'code' && <CodeViewer code={APP_PY_CODE} />}
      </main>

      {/* Corporate Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Global RoRo Logistics</span>
            <span>·</span>
            <span>EMEA Logistics Digital Integration Hub (PoC)</span>
            <span>·</span>
            <span>Azure APIM Migration Track</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Dataset: 20 Inland Units</span>
            <span>·</span>
            <span>Ports: Bremerhaven, Zeebrugge, Antwerp, Rotterdam</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

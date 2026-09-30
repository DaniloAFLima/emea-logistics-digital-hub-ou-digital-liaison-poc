import React, { useState } from 'react';
import { TruckData } from '../types';

interface StreamlitViewProps {
  trucks: TruckData[];
}

export const StreamlitView: React.FC<StreamlitViewProps> = ({ trucks }) => {
  const [selectedPorts, setSelectedPorts] = useState<string[]>([
    'Port of Bremerhaven',
    'Port of Zeebrugge',
    'Port of Antwerp',
    'Port of Rotterdam',
  ]);
  const [isExpanderOpen, setIsExpanderOpen] = useState(false);

  const allPorts = Array.from(new Set(trucks.map((t) => t.Destination_Port))).sort();

  const togglePort = (port: string) => {
    if (selectedPorts.includes(port)) {
      if (selectedPorts.length > 1) {
        setSelectedPorts(selectedPorts.filter((p) => p !== port));
      }
    } else {
      setSelectedPorts([...selectedPorts, port]);
    }
  };

  const filteredTrucks = trucks.filter((t) => selectedPorts.includes(t.Destination_Port));
  const totalTrucks = trucks.length;
  const syncedTrucks = trucks.filter((t) => t.API_Integration_Status === 'Synced').length;
  const apiSuccessRate = totalTrucks > 0 ? (syncedTrucks / totalTrucks) * 100 : 0;
  const criticalDelays = trucks.filter((t) => t.Delay_Minutes > 60).length;

  // Group by Destination_Port for the bar chart
  const portAverages = selectedPorts.map((port) => {
    const portUnits = filteredTrucks.filter((t) => t.Destination_Port === port);
    const avg =
      portUnits.length > 0
        ? Number((portUnits.reduce((acc, t) => acc + t.Delay_Minutes, 0) / portUnits.length).toFixed(1))
        : 0;
    return { port, avg };
  });

  const actionableTrucks = filteredTrucks
    .filter((t) => t.API_Integration_Status === 'API Error' || t.API_Integration_Status === 'Manual Entry')
    .sort((a, b) => b.Delay_Minutes - a.Delay_Minutes);

  return (
    <div className="bg-[#FFFFFF] min-h-[800px] border border-slate-300 rounded-lg shadow-sm font-sans flex flex-col md:flex-row overflow-hidden text-slate-800">
      {/* Streamlit Sidebar */}
      <aside className="w-full md:w-72 bg-[#F0F2F6] border-r border-slate-200 p-5 shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <span>🚢 Global RoRo Logistics</span>
          </div>
          <div className="text-xs font-semibold text-slate-600">Enterprise Architecture & Integration</div>

          <div className="h-px bg-slate-300 my-2" />

          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800 block mb-1">Solutions Architect Note:</span>
            This dashboard represents the target integration pattern for RoRo carrier logistics across European corridors.
            By unifying carrier telematics and factory dispatch into <strong className="text-slate-900">Azure API Management</strong>, we eliminate legacy CSV/EDI drop-offs and prevent vessel loading bottlenecks at RoRo port hubs.
          </div>

          <div className="h-px bg-slate-300 my-2" />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Filter by Destination Port
            </label>
            <div className="space-y-1 bg-white p-2 rounded border border-slate-200">
              {allPorts.map((port) => (
                <label key={port} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPorts.includes(port)}
                    onChange={() => togglePort(port)}
                    className="rounded text-rose-500 focus:ring-rose-400"
                  />
                  <span>{port}</span>
                </label>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Select one or more port hubs</p>
          </div>

          <div className="pt-4 text-[11px] text-slate-500 font-mono">
            EMEA Fleet Operations · Telematics v2.4
          </div>
        </div>
      </aside>

      {/* Streamlit Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Streamlit Brand Custom Header */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] text-white p-6 rounded-md mb-6 border-l-6 border-[#00A3E0] shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            EMEA Logistics Digital Integration Hub
          </h1>
          <p className="text-sm text-cyan-100 font-normal">
            Proof of Concept for API Governance · Fleet Visibility & Telematics Gateway
          </p>
        </div>

        {/* 3 KPI Metric Cards using st.columns(3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded p-4">
            <div className="text-xs font-medium text-slate-500">Total Trucks in Transit</div>
            <div className="text-3xl font-bold text-[#0B2545] mt-1 font-mono">{totalTrucks} Units</div>
            <div className="text-xs text-slate-500 mt-1">Monitored EMEA Fleet</div>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded p-4">
            <div className="text-xs font-medium text-slate-500">API Success Rate</div>
            <div className="text-3xl font-bold text-[#0B2545] mt-1 font-mono">{apiSuccessRate.toFixed(1)}%</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">
              ↑ {syncedTrucks}/{totalTrucks} Synced
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded p-4">
            <div className="text-xs font-medium text-slate-500">Critical Delays (&gt;60 min)</div>
            <div className="text-3xl font-bold text-[#0B2545] mt-1 font-mono">{criticalDelays} Trucks</div>
            <div className="text-xs text-rose-600 font-semibold mt-1">
              - High Risk cut-off window
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 my-6" />

        {/* Visuals: Bar Chart of average Delay_Minutes grouped by Destination_Port */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Transit Performance by Destination RoRo Port</h2>
          <p className="text-xs text-slate-500 mb-4">
            Average inland carrier delay (minutes) across European receiving terminals.
          </p>

          <div className="bg-[#F8FAFC] p-4 rounded border border-slate-200">
            <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
              Destination_Port vs. mean(Delay_Minutes)
            </div>

            <div className="space-y-4">
              {portAverages.map(({ port, avg }) => {
                const widthPercent = Math.min(100, (avg / 120) * 100);
                return (
                  <div key={port}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>{port}</span>
                      <span className="font-mono font-bold text-[#0B2545]">{avg} mins avg</span>
                    </div>
                    <div className="w-full bg-slate-200 h-7 rounded overflow-hidden relative flex items-center">
                      <div
                        className="bg-[#0B2545] h-full transition-all duration-500"
                        style={{ width: `${widthPercent}%` }}
                      />
                      <span className="absolute left-3 text-xs font-bold text-white drop-shadow-xs font-mono">
                        {avg}m
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 my-6" />

        {/* Actionable Data: Interactive Table showing ONLY "API Error" or "Manual Entry" */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Disrupted Telemetry & Manual Silo Exceptions</h2>

          {/* EXACT TEXT NOTE REQUIRED BY BRIEF */}
          <div className="bg-[#FEF3C7] border-l-4 border-[#D97706] p-4 rounded-r text-[#92400E] text-xs font-medium mb-4 leading-relaxed">
            Action Required: The following units require manual follow-up due to legacy system silos. Migrating these to the new Azure API Management layer will automate this workflow.
          </div>

          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead className="bg-[#F0F2F6] text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Truck Identifier</th>
                  <th className="py-2.5 px-3">Origin Plant</th>
                  <th className="py-2.5 px-3">Destination RoRo Terminal</th>
                  <th className="py-2.5 px-3">Integration Status</th>
                  <th className="py-2.5 px-3">Transit Delay (min)</th>
                  <th className="py-2.5 px-3">Est. CO₂ (Kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {actionableTrucks.map((truck) => (
                  <tr key={truck.Truck_ID} className="hover:bg-slate-50 font-mono text-[11.5px]">
                    <td className="py-2 px-3 font-bold text-slate-900">{truck.Truck_ID}</td>
                    <td className="py-2 px-3 font-sans text-slate-700">{truck.Origin_Factory}</td>
                    <td className="py-2 px-3 font-sans text-slate-700">{truck.Destination_Port}</td>
                    <td className="py-2 px-3 font-sans">
                      <span
                        className={`font-semibold ${
                          truck.API_Integration_Status === 'API Error'
                            ? 'text-rose-600'
                            : 'text-amber-700'
                        }`}
                      >
                        {truck.API_Integration_Status}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={truck.Delay_Minutes > 60 ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                        {truck.Delay_Minutes} min
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600 font-mono">
                      {truck.CO2_Emissions_Kg.toFixed(1)} kg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Collapsible Expander for Full Fleet */}
        <div className="border border-slate-200 rounded mb-6">
          <button
            type="button"
            onClick={() => setIsExpanderOpen(!isExpanderOpen)}
            className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-slate-800 flex items-center justify-between"
          >
            <span>🔍 View Complete EMEA Fleet Dataset ({trucks.length} Monitored Units)</span>
            <span className="text-slate-500 font-normal">{isExpanderOpen ? '▲ Collapse' : '▼ Expand'}</span>
          </button>

          {isExpanderOpen && (
            <div className="p-3 border-t border-slate-200 max-h-72 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-1.5">Truck_ID</th>
                    <th className="p-1.5">Origin_Factory</th>
                    <th className="p-1.5">Destination_Port</th>
                    <th className="p-1.5">API_Integration_Status</th>
                    <th className="p-1.5">Delay_Minutes</th>
                    <th className="p-1.5">CO2_Emissions_Kg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trucks.map((t) => (
                    <tr key={t.Truck_ID}>
                      <td className="p-1.5 text-slate-900 font-bold">{t.Truck_ID}</td>
                      <td className="p-1.5 font-sans">{t.Origin_Factory}</td>
                      <td className="p-1.5 font-sans">{t.Destination_Port}</td>
                      <td className="p-1.5 font-sans">{t.API_Integration_Status}</td>
                      <td className="p-1.5">{t.Delay_Minutes}m</td>
                      <td className="p-1.5">{t.CO2_Emissions_Kg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-400 mt-8 pt-4 border-t border-slate-100">
          Global RoRo Logistics EMEA Digital Logistics Hub · Solutions Architecture PoC · Azure API Management Migration Track
        </div>
      </main>
    </div>
  );
};

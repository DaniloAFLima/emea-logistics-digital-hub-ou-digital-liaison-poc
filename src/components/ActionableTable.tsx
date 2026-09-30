import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Zap, Search, ArrowUpDown, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react';
import { TruckData } from '../types';

interface ActionableTableProps {
  trucks: TruckData[];
  onSyncTruck: (truckId: string) => void;
  onSyncAllActionable: () => void;
}

export const ActionableTable: React.FC<ActionableTableProps> = ({
  trucks,
  onSyncTruck,
  onSyncAllActionable,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'Delay_Minutes' | 'CO2_Emissions_Kg'>('Delay_Minutes');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // STRICT REQUIREMENT: Only trucks where API_Integration_Status is "API Error" or "Manual Entry"
  const actionableTrucks = trucks.filter(
    (t) => t.API_Integration_Status === 'API Error' || t.API_Integration_Status === 'Manual Entry'
  );

  const filteredTrucks = actionableTrucks
    .filter(
      (t) =>
        t.Truck_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.Origin_Factory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.Destination_Port.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortAsc ? diff : -diff;
    });

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      onSyncAllActionable();
      setIsSyncingAll(false);
    }, 600);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              Disrupted Telemetry & Manual Silo Exceptions
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Filtered view: Units requiring manual governance or Azure APIM gateway remediation
          </p>
        </div>

        <div className="flex items-center gap-2">
          {actionableTrucks.length > 0 && (
            <button
              type="button"
              onClick={handleSyncAll}
              disabled={isSyncingAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[#0B2545] text-white hover:bg-[#134074] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
              <span>Trigger Azure APIM Bulk Sync ({actionableTrucks.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* REQUIRED CALLOUT NOTE - EXACT TEXT FROM SPEC */}
      <div className="mt-4 p-4 rounded-md bg-amber-50 border-l-4 border-amber-500 text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Governance Alert · Legacy Silo Intervention
            </div>
            <p className="text-sm font-medium mt-0.5 text-amber-900">
              Action Required: The following units require manual follow-up due to legacy system silos. Migrating these to the new Azure API Management layer will automate this workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by Truck ID, Factory or Port..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0B2545]"
          />
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <span>Sort by:</span>
          <button
            type="button"
            onClick={() => {
              if (sortField === 'Delay_Minutes') setSortAsc(!sortAsc);
              else {
                setSortField('Delay_Minutes');
                setSortAsc(false);
              }
            }}
            className={`px-2 py-1 rounded border flex items-center gap-1 ${
              sortField === 'Delay_Minutes' ? 'bg-slate-100 font-semibold text-slate-900' : 'border-slate-200'
            }`}
          >
            Delay (Mins)
            <ArrowUpDown className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (sortField === 'CO2_Emissions_Kg') setSortAsc(!sortAsc);
              else {
                setSortField('CO2_Emissions_Kg');
                setSortAsc(false);
              }
            }}
            className={`px-2 py-1 rounded border flex items-center gap-1 ${
              sortField === 'CO2_Emissions_Kg' ? 'bg-slate-100 font-semibold text-slate-900' : 'border-slate-200'
            }`}
          >
            CO₂ (Kg)
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="mt-4 overflow-x-auto border border-slate-200 rounded-lg">
        {filteredTrucks.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 text-slate-500 text-sm">
            <CheckCircle className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
            <p className="font-semibold text-slate-700">No Exception Units Pending Follow-Up</p>
            <p className="text-xs text-slate-500 mt-1">
              All trucks are currently successfully synchronized via Azure API Management or matching filters.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Truck ID</th>
                <th className="py-3 px-4">Origin Factory</th>
                <th className="py-3 px-4">Destination Port</th>
                <th className="py-3 px-4">API Integration Status</th>
                <th className="py-3 px-4">Delay (Mins)</th>
                <th className="py-3 px-4">CO₂ Emissions (Kg)</th>
                <th className="py-3 px-4 text-right">APIM Remediation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredTrucks.map((truck) => {
                const isCriticalDelay = truck.Delay_Minutes > 60;
                const isError = truck.API_Integration_Status === 'API Error';

                return (
                  <tr
                    key={truck.Truck_ID}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedTruck(truck)}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-800">{truck.Truck_ID}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {truck.Origin_Factory}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {truck.Destination_Port}
                    </td>
                    <td className="py-3 px-4">
                      {/* Zero-pill style: unboxed text with semantic indicator */}
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isError ? 'bg-rose-500' : 'bg-amber-500'
                          }`}
                        />
                        <span className={isError ? 'text-rose-700 font-semibold' : 'text-amber-800 font-semibold'}>
                          {truck.API_Integration_Status}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            isCriticalDelay ? 'text-rose-600 font-bold' : 'text-slate-700'
                          }`}
                        >
                          {truck.Delay_Minutes} min
                        </span>
                        {isCriticalDelay && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500">
                            Critical
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {truck.CO2_Emissions_Kg.toFixed(1)} kg
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onSyncTruck(truck.Truck_ID)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors shadow-2xs"
                        title="Simulate automated gateway retry & APIM sync"
                      >
                        <Zap className="w-3 h-3 text-cyan-600" />
                        <span>APIM Sync</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredTrucks.length} unsynchronized logistics units requiring governance</span>
        <span className="text-slate-400">Click any row to inspect telemetry envelope & APIM migration policy</span>
      </div>

      {/* Telemetry Detail Drawer / Modal */}
      {selectedTruck && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-slate-900">
                  {selectedTruck.Truck_ID}
                </span>
                <span className="text-xs text-slate-400 font-mono">Telemetry Inspector</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTruck(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Origin Plant</span>
                  <span className="font-semibold text-slate-800 text-sm">
                    {selectedTruck.Origin_Factory}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Destination Port</span>
                  <span className="font-semibold text-slate-800 text-sm">
                    {selectedTruck.Destination_Port}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Current Status</span>
                  <span className="font-semibold text-rose-600">
                    {selectedTruck.API_Integration_Status}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Reported Transit Delay</span>
                  <span className="font-semibold font-mono text-slate-800">
                    {selectedTruck.Delay_Minutes} minutes
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Root Cause Analysis (Legacy Silo):
                </span>
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-amber-900 font-mono text-[11px] leading-relaxed">
                  {selectedTruck.API_Integration_Status === 'API Error' ? (
                    <>
                      [HTTP 502 / Gate Timeout] Carrier sub-contractor telematic endpoint timed out after 30s. No exponential backoff policy in place. Legacy EDI flat file ingestion failed at port gateway.
                    </>
                  ) : (
                    <>
                      [Manual Dispatch Log] Factory operator submitted dispatch via offline spreadsheet portal. No webhook or real-time event-driven telematics ingestion stream configured.
                    </>
                  )}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Azure API Management (APIM) Target Fix:
                </span>
                <div className="p-3 bg-slate-900 text-cyan-300 font-mono text-[11px] rounded overflow-x-auto">
                  {`<!-- Inbound Policy: Auto-Retry & Schema Transform -->
<policies>
  <inbound>
    <retry condition="@(context.Response.StatusCode >= 500)" count="3" interval="5" />
    <validate-jwt header-name="Authorization" failed-validation-httpcode="401" />
  </inbound>
  <backend>
    <forward-request timeout="15" />
  </backend>
</policies>`}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedTruck(null)}
                className="px-3 py-1.5 rounded border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 font-medium"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSyncTruck(selectedTruck.Truck_ID);
                  setSelectedTruck(null);
                }}
                className="px-3 py-1.5 rounded bg-[#0B2545] text-white text-xs font-semibold hover:bg-[#134074] flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Trigger Azure APIM Gateway Remediation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Download, Filter, Table, RefreshCw } from 'lucide-react';
import { TruckData } from '../types';

interface FullFleetTableProps {
  trucks: TruckData[];
  onReset: () => void;
}

export const FullFleetTable: React.FC<FullFleetTableProps> = ({ trucks, onReset }) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [portFilter, setPortFilter] = useState<string>('ALL');

  const filtered = trucks.filter((t) => {
    if (statusFilter !== 'ALL' && t.API_Integration_Status !== statusFilter) return false;
    if (portFilter !== 'ALL' && t.Destination_Port !== portFilter) return false;
    return true;
  });

  const exportCSV = () => {
    const headers = ['Truck_ID', 'Origin_Factory', 'Destination_Port', 'API_Integration_Status', 'Delay_Minutes', 'CO2_Emissions_Kg'];
    const rows = trucks.map((t) => [
      t.Truck_ID,
      t.Origin_Factory,
      `"${t.Destination_Port}"`,
      t.API_Integration_Status,
      t.Delay_Minutes,
      t.CO2_Emissions_Kg,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'emea_logistics_hub_fleet.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ports = Array.from(new Set(trucks.map((t) => t.Destination_Port))).sort();

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">
            Complete EMEA Fleet Dataset (20 Telematics Units)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 font-medium transition-colors"
            title="Reset telemetry mock data to original state"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Dataset</span>
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1 text-slate-500 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded border border-slate-200">
          {['ALL', 'Synced', 'API Error', 'Manual Entry'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Port filter dropdown */}
        <select
          value={portFilter}
          onChange={(e) => setPortFilter(e.target.value)}
          aria-label="Filter by destination port"
          className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 text-xs focus:ring-1 focus:ring-[#0B2545]"
        >
          <option value="ALL">All Destination Ports</option>
          {ports.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <span className="ml-auto text-slate-400 font-mono text-[11px]">
          Showing {filtered.length} of {trucks.length} total units
        </span>
      </div>

      <div className="mt-4 overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-3">Truck_ID</th>
              <th className="py-2.5 px-3">Origin_Factory</th>
              <th className="py-2.5 px-3">Destination_Port</th>
              <th className="py-2.5 px-3">API_Integration_Status</th>
              <th className="py-2.5 px-3">Delay_Minutes</th>
              <th className="py-2.5 px-3">CO2_Emissions_Kg</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((truck) => (
              <tr key={truck.Truck_ID} className="hover:bg-slate-50/60 font-mono text-[11.5px]">
                <td className="py-2 px-3 font-bold text-slate-900">{truck.Truck_ID}</td>
                <td className="py-2 px-3 text-slate-700 font-sans">{truck.Origin_Factory}</td>
                <td className="py-2 px-3 text-slate-700 font-sans">{truck.Destination_Port}</td>
                <td className="py-2 px-3 font-sans">
                  <span
                    className={`inline-block font-medium ${
                      truck.API_Integration_Status === 'Synced'
                        ? 'text-emerald-700 font-semibold'
                        : truck.API_Integration_Status === 'API Error'
                        ? 'text-rose-700 font-semibold'
                        : 'text-amber-700 font-semibold'
                    }`}
                  >
                    {truck.API_Integration_Status}
                  </span>
                </td>
                <td className="py-2 px-3 text-slate-800 font-semibold">{truck.Delay_Minutes}m</td>
                <td className="py-2 px-3 text-slate-600">{truck.CO2_Emissions_Kg.toFixed(1)} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

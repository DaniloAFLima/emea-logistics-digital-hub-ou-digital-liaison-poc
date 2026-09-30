import React from 'react';
import { Truck, Activity, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { TruckData } from '../types';

interface KpiCardsProps {
  trucks: TruckData[];
}

export const KpiCards: React.FC<KpiCardsProps> = ({ trucks }) => {
  const totalTrucks = trucks.length;
  const syncedTrucks = trucks.filter((t) => t.API_Integration_Status === 'Synced').length;
  const apiSuccessRate = totalTrucks > 0 ? (syncedTrucks / totalTrucks) * 100 : 0;
  const criticalDelays = trucks.filter((t) => t.Delay_Minutes > 60).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Metric 1: Total Trucks in Transit */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Trucks in Transit
          </span>
          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-700">
            <Truck className="w-4 h-4 text-[#0B2545]" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {totalTrucks}
          </span>
          <span className="text-xs text-slate-500 font-medium">EMEA Fleet Units</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Active routes across 8 factory hubs</span>
          <span className="text-[#0B2545] font-semibold">100% Monitored</span>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#0B2545]" />
      </div>

      {/* Metric 2: API Success Rate */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            API Success Rate
          </span>
          <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {apiSuccessRate.toFixed(1)}%
          </span>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {syncedTrucks} of {totalTrucks} Synced
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Target SLA: &gt; 98.5% with Azure APIM</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Direct REST
          </span>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
      </div>

      {/* Metric 3: Critical Delays (>60 mins) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Critical Delays (&gt; 60 mins)
          </span>
          <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center text-rose-700">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {criticalDelays}
          </span>
          <span className="text-xs font-medium text-rose-600">
            At-Risk Units
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Vessel cut-off window risk</span>
          <span className="text-rose-700 font-medium">High Attention</span>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
      </div>
    </div>
  );
};

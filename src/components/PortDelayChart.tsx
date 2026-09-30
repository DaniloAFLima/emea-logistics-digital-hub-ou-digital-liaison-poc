import React, { useState } from 'react';
import { BarChart3, Clock, Ship, Info } from 'lucide-react';
import { TruckData, PortDelayAggregate } from '../types';

interface PortDelayChartProps {
  trucks: TruckData[];
}

export const PortDelayChart: React.FC<PortDelayChartProps> = ({ trucks }) => {
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  // Group by Destination_Port and calculate average Delay_Minutes
  const portMap = new Map<string, { totalDelay: number; count: number; errorCount: number }>();

  trucks.forEach((truck) => {
    const existing = portMap.get(truck.Destination_Port) || { totalDelay: 0, count: 0, errorCount: 0 };
    existing.totalDelay += truck.Delay_Minutes;
    existing.count += 1;
    if (truck.API_Integration_Status !== 'Synced') {
      existing.errorCount += 1;
    }
    portMap.set(truck.Destination_Port, existing);
  });

  const portAggregates: PortDelayAggregate[] = Array.from(portMap.entries())
    .map(([port, data]) => ({
      port,
      avgDelay: Number((data.totalDelay / (data.count || 1)).toFixed(1)),
      truckCount: data.count,
      errorCount: data.errorCount,
    }))
    .sort((a, b) => b.avgDelay - a.avgDelay); // Sort descending by average delay

  const maxDelay = Math.max(...portAggregates.map((p) => p.avgDelay), 60);
  const chartHeight = 220;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0B2545]" />
            <h2 className="text-base font-bold text-slate-900">
              Average Transit Delay by Destination RoRo Port
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Grouped by maritime receiving terminal (Delay_Minutes mean across inland truck carriers)
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#0B2545]" />
            <span>Avg Delay (Minutes)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-400 border border-dashed border-rose-500" />
            <span className="text-rose-600 font-medium">Critical SLA (60m)</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart Container */}
      <div className="mt-6 relative">
        {/* Critical SLA Threshold reference line label */}
        <div className="text-[11px] text-slate-400 mb-1 flex justify-between font-mono">
          <span>MINUTES DELAY</span>
          <span>THRESHOLD: 60 MIN MAX</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {portAggregates.map((item) => {
            const percentage = Math.min(100, Math.round((item.avgDelay / 120) * 100));
            const isHigh = item.avgDelay >= 60;
            const isHovered = hoveredPort === item.port;

            return (
              <div
                key={item.port}
                onMouseEnter={() => setHoveredPort(item.port)}
                onMouseLeave={() => setHoveredPort(null)}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? 'border-[#00A3E0] bg-cyan-50/30 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {item.port.replace('Port of ', '')}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {item.avgDelay} min
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 mb-3 flex items-center justify-between">
                  <span>{item.port}</span>
                  <span className="font-mono">{item.truckCount} trucks</span>
                </div>

                {/* Progress Visualizer */}
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
                  {/* Critical 60 min marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                    style={{ left: '50%' }}
                    title="60 min SLA line"
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHigh
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                        : 'bg-gradient-to-r from-[#0B2545] to-[#134074]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Max: 120m scale
                  </span>
                  <span>
                    {item.errorCount > 0 ? (
                      <span className="text-amber-700 font-semibold">{item.errorCount} unsynced</span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">100% Synced</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Horizontal Breakdown Bar representation (matching Streamlit st.bar_chart) */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Terminal Load & Gate-In Delay Comparison (Altair / Streamlit Equivalent View)</span>
            <span className="text-slate-400 font-mono text-[11px]">Aggregated Metric: mean(Delay_Minutes)</span>
          </div>

          <div className="space-y-3">
            {portAggregates.map((item) => {
              const widthPct = Math.min(100, (item.avgDelay / 120) * 100);
              return (
                <div key={item.port} className="flex items-center gap-3">
                  <div className="w-44 text-xs font-medium text-slate-700 truncate" title={item.port}>
                    {item.port}
                  </div>
                  <div className="flex-1 bg-slate-200 h-6 rounded relative overflow-hidden flex items-center">
                    <div
                      className="h-full bg-[#0B2545] rounded-l transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                    <span className="absolute left-2 text-xs font-mono font-bold text-white drop-shadow-xs">
                      {item.avgDelay}m
                    </span>
                  </div>
                  <div className="w-20 text-right text-xs text-slate-500 font-mono">
                    {item.truckCount} units
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

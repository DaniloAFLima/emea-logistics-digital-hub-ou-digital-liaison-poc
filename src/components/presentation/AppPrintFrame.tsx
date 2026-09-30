import React, { useState } from 'react';
import { Maximize2, Minimize2, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface AppPrintFrameProps {
  title: string;
  imageFileName: string;
  subtitle?: string;
  children: React.ReactNode;
  heightClass?: string;
  className?: string;
  allowZoom?: boolean;
}

export const AppPrintFrame: React.FC<AppPrintFrameProps> = ({
  title,
  imageFileName,
  subtitle,
  children,
  heightClass = 'max-h-[380px]',
  className = '',
  allowZoom = true,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className={`bg-white rounded-lg border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all ${className}`}
      >
        {/* App Chrome Header */}
        <div className="bg-[#07192F] text-slate-300 px-3.5 py-2 flex items-center justify-between text-[11px] border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-500 font-mono text-[10px]">|</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-200 truncate">
              <span className="text-cyan-400 font-bold">EMEA Hub</span>
              <span className="text-slate-500">/</span>
              <span className="truncate">{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tag identifying the exact screenshot referenced in user prompt */}
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 text-[10px] text-cyan-300 font-mono">
              <ImageIcon className="w-2.5 h-2.5" />
              {imageFileName}
            </span>

            {allowZoom && (
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                title={isZoomed ? 'Shrink print' : 'Expand full-fidelity view'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Container (Scrollable if content overflows) */}
        <div className={`overflow-auto p-3 sm:p-4 bg-slate-50/70 text-slate-900 ${heightClass}`}>
          {children}
        </div>

        {subtitle && (
          <div className="px-3.5 py-1.5 bg-slate-100/90 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
            <span>{subtitle}</span>
            <span className="font-mono text-slate-400">Logistics Integration PoC Asset</span>
          </div>
        )}
      </div>

      {/* Expanded Modal View for ultra-detailed inspection */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="bg-[#07192F] text-slate-200 px-5 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded">
                  {imageFileName}
                </span>
                <span className="font-bold text-sm text-white">{title}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 font-semibold"
              >
                Close View [Esc]
              </button>
            </div>
            <div className="overflow-auto p-6 bg-slate-50 flex-1">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

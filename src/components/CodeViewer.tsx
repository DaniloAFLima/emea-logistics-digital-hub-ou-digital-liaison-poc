import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, Play } from 'lucide-react';

interface CodeViewerProps {
  code: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'app.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#0B2545]" />
            <h2 className="text-base font-bold text-slate-900 font-mono">app.py</h2>
            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
              Self-contained Streamlit Script
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Production-ready Python code with embedded 20-truck dataset, st.columns KPIs, bar chart, and actionable filter
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B2545] text-white text-xs font-semibold hover:bg-[#134074] transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download app.py</span>
          </button>
        </div>
      </div>

      {/* Execution instructions banner */}
      <div className="p-3 bg-slate-900 text-slate-300 rounded-md text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-800">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Quick Run:</span>
          <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
            streamlit run app.py
          </code>
        </div>
        <span className="text-[11px] text-slate-400">
          Requires: <code className="text-slate-300">pip install streamlit pandas numpy</code>
        </span>
      </div>

      {/* Code container */}
      <div className="relative">
        <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed max-h-[600px] border border-slate-800 selection:bg-cyan-900 selection:text-white">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

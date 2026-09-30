import React from 'react';
import { Layers, Network, ShieldCheck, Cpu, ArrowRight, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-[#0B2545]">
          <Network className="w-5 h-5 text-cyan-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Senior Solutions Architect Technical Brief: EMEA Logistics API Governance
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
          In modern maritime & inland automotive logistics, coordinating automotive and High & Heavy (H&H) cargo from OEM manufacturing plants (Munich, Gothenburg, Lyon, Stuttgart, etc.) to critical ocean terminals (Port of Bremerhaven, Port of Zeebrugge, Rotterdam, Antwerp) is time-critical. A vessel loading window (cut-off) cannot afford telemetry blackouts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs uppercase mb-1">
              <AlertTriangle className="w-4 h-4" />
              1. Current Legacy Problem
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              35% of fleet updates drop into <strong>API Errors</strong> or require <strong>Manual Entry</strong> due to fractured subcontractor telematics, expired SSL tokens, and lack of retry policies.
            </p>
          </div>

          <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-cyan-800 font-bold text-xs uppercase mb-1">
              <Cpu className="w-4 h-4 text-cyan-600" />
              2. Azure APIM Target Gateway
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A unified Azure API Management gateway acts as the single ingestion facade with centralized mTLS, rate limiting, and exponential retry policies, achieving &gt; 99% automated ingestion.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Business Value
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time gate-in predictability prevents RoRo vessel stowage replanning, cuts inland dwell time by 42 minutes average, and provides accurate Scope 3 CO₂ reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Azure APIM Integration Pipeline Diagram */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0B2545]" />
          Target Integration Topology: Telematics Ingestion to Terminal Operating System (TOS)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Step 1 */}
          <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2">
            <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase">Source Layer</div>
            <div className="text-xs font-bold">OEM Factories & 3PL Carriers</div>
            <p className="text-[11px] text-slate-400">
              Munich, Gothenburg, Lyon, Zaragoza telemetry senders (GPS, CANbus, ETA)
            </p>
          </div>

          <div className="hidden md:flex justify-center text-slate-400">
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-lg bg-[#0B2545] text-white space-y-2">
            <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase">Governance Layer</div>
            <div className="text-xs font-bold">Azure API Management</div>
            <p className="text-[11px] text-slate-300">
              JWT verification, schema validation, backoff retry policies, and throttling
            </p>
          </div>

          <div className="hidden md:flex justify-center text-slate-400">
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-lg bg-[#134074] text-white space-y-2">
            <div className="text-[10px] text-cyan-300 font-mono font-bold uppercase">Destination Layer</div>
            <div className="text-xs font-bold">RoRo Terminal Hubs</div>
            <p className="text-[11px] text-slate-300">
              Port of Bremerhaven & Port of Zeebrugge Terminal Operating Systems (TOS)
            </p>
          </div>
        </div>

        {/* Concrete APIM Policy XML Snippet */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center gap-1.5 font-mono">
              <FileCode className="w-4 h-4 text-cyan-600" />
              azure-apim-telematics-policy.xml
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Production Policy Definition</span>
          </div>

          <pre className="p-4 bg-slate-900 text-cyan-300 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`<policies>
  <inbound>
    <base />
    <!-- 1. Enforce carrier TLS 1.3 & mutual auth -->
    <validate-client-certificate verify-expiry="true" />
    
    <!-- 2. Rate limiting to prevent carrier flood during batch telemetry recon -->
    <rate-limit-by-key calls="120" renewal-period="60" 
      counter-key="@(context.Request.IpAddress)" />
      
    <!-- 3. Automated retry policy for transient network drops (Resolves API Errors) -->
    <retry condition="@(context.Response.StatusCode >= 500)" count="4" interval="10" max-interval="60" delta="10" first-fast-retry="true">
      <forward-request timeout="30" follow-redirects="true" />
    </retry>
  </inbound>
  
  <outbound>
    <!-- 4. Transform legacy XML/EDI into standardized JSON fleet telemetry -->
    <choose>
      <when condition="@(context.Response.Headers.GetValueOrDefault("Content-Type","").Contains("xml"))">
        <xml-to-json kind="direct" apply="always" consider-accept-header="false" />
      </when>
    </choose>
    <set-header name="X-Fleet-Gateway-Routed" exists-action="override">
      <value>Azure-APIM-EMEA-Hub</value>
    </set-header>
  </outbound>
</policies>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

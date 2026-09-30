import React, { useState, useEffect, useCallback } from 'react';
import { TruckData } from '../../types';
import { Slide1Cover } from './Slide1Cover';
import { Slide2Challenge } from './Slide2Challenge';
import { Slide3Solution } from './Slide3Solution';
import { Slide4BusinessToTech } from './Slide4BusinessToTech';
import { Slide5Impact } from './Slide5Impact';
import { PRESENTATION_CONFIG } from '../../data/presentationConfig';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Printer,
  FileText,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface PresentationViewProps {
  trucks: TruckData[];
  onSyncTruck: (truckId: string) => void;
  onSyncAllActionable: () => void;
  onOpenLiveDashboard: () => void;
}

const TOTAL_SLIDES = 5;

// Professional Speaker Notes for Danilo's executive presentation
const SPEAKER_NOTES: Record<number, { title: string; bullets: string[]; keyQuote: string }> = {
  1: {
    title: 'Slide 1: Title & Strategic Context',
    bullets: [
      'Welcome the evaluation committee and state the core objective: demonstrate strategic vision and technical execution capability as a Digital Liaison candidate.',
      'Highlight that modern automotive shipping operates at the heart of the global RoRo maritime logistics chain, and inland terrestrial carrier integration is where the biggest visibility bottlenecks occur.',
      'Introduce this project as a conceptual Digital Integration Hub demonstrating enterprise API governance and proactive management by exception.',
    ],
    keyQuote: '"Technology only creates true value when it solves daily operational friction on the terminal dock."',
  },
  2: {
    title: 'Slide 2: The Business Challenge (Pain Points)',
    bullets: [
      'Frame the operational bottleneck: regional terrestrial carriers heading to Bremerhaven, Zeebrugge, Antwerp, and Rotterdam operate on isolated legacy systems and rely on manual spreadsheet emails.',
      'Walk through the port delay chart (image_8a4d71.png) illustrating how transit delays accumulate and risk missing vessel loading cut-off windows.',
      'Emphasize the guiding principle: shift the operational paradigm from managing fragmented data to managing critical exceptions.',
    ],
    keyQuote: '"The goal is to stop managing data and start managing exceptions."',
  },
  3: {
    title: 'Slide 3: The Proposed Solution (Integration Hub)',
    bullets: [
      'Flagship slide: introduce the solution as a unified, real-time operational visibility layer.',
      'Highlight the top 3 executive KPIs: total fleet volume, APIM success rate SLA, and critical cut-off delay counters (>60m).',
      'Demonstrate the actionable exception table: routine on-time trucks are filtered out, isolating telematics failures with 1-click Azure APIM automated remediation.',
    ],
    keyQuote: '"We automate standard operational flows so human teams can focus strictly on high-risk exceptions."',
  },
  4: {
    title: 'Slide 4: Translating Business to Tech',
    bullets: [
      'Emphasize the primary value of the Digital Liaison: bridging the operational vocabulary of terminal managers with cloud enterprise architecture.',
      'Business side: Terminal Managers need automated filtering that isolates failed communications to protect terminal flow without drowning in noise.',
      'Technical side: deploy Azure API Management as an ingestion gateway with standardized JSON webhooks ({ Truck_ID, Status, Delay_Minutes }), eliminating localized shadow IT.',
    ],
    keyQuote: '"We build the bridge connecting dock-side operational pain to scalable cloud architecture."',
  },
  5: {
    title: 'Slide 5: Expected Business Value & Closing',
    bullets: [
      'Synthesize the 3 core strategic pillars: Operational Efficiency (eliminating manual tracking calls), Global IT Alignment (reusing enterprise Azure APIM governance), and Scalability (rapid onboarding of new EMEA carriers).',
      'Deliver the closing commitment and express enthusiasm to support enterprise global digital transformation strategy.',
      'Invite the committee to ask questions or interact directly with the live operational hub prototype.',
    ],
    keyQuote: '"Thank you for reviewing this conceptual exercise. I look forward to discussing how this mindset can support enterprise global digital strategy."',
  },
};

export const PresentationView: React.FC<PresentationViewProps> = ({
  trucks,
  onSyncTruck,
  onSyncAllActionable,
  onOpenLiveDashboard,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Author name state with fallback to global presentation config
  const [authorName, setAuthorName] = useState(() => {
    const saved = localStorage.getItem('candidate_author_name') || localStorage.getItem('ww_candidate_name');
    if (saved && !saved.includes('[') && !saved.includes('Sobrenome') && !saved.includes('Last Name')) {
      return saved;
    }
    return PRESENTATION_CONFIG.authorName;
  });

  const handleUpdateAuthorName = (name: string) => {
    setAuthorName(name);
    localStorage.setItem('candidate_author_name', name);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(TOTAL_SLIDES);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 300);
  };

  // If print mode is triggered, render all 5 slides sequentially for PDF / print
  if (isPrintMode) {
    return (
      <div className="space-y-12 p-8 bg-white text-slate-900">
        <div className="print:hidden p-4 bg-slate-900 text-white rounded mb-6 flex items-center justify-between">
          <span>Printing all 5 presentation slides...</span>
          <button
            type="button"
            onClick={() => setIsPrintMode(false)}
            className="px-3 py-1 bg-slate-700 rounded text-xs"
          >
            Cancel Print Preview
          </button>
        </div>

        <div className="border border-slate-300 rounded-lg p-6 page-break-after">
          <Slide1Cover
            authorName={authorName}
            onUpdateAuthorName={handleUpdateAuthorName}
            onNextSlide={() => {}}
          />
        </div>

        <div className="border border-slate-300 rounded-lg p-6 page-break-after">
          <Slide2Challenge trucks={trucks} onNextSlide={() => {}} onPrevSlide={() => {}} />
        </div>

        <div className="border border-slate-300 rounded-lg p-6 page-break-after">
          <Slide3Solution
            trucks={trucks}
            onSyncTruck={onSyncTruck}
            onSyncAllActionable={onSyncAllActionable}
            onNextSlide={() => {}}
            onPrevSlide={() => {}}
            onOpenLiveDashboard={onOpenLiveDashboard}
          />
        </div>

        <div className="border border-slate-300 rounded-lg p-6 page-break-after">
          <Slide4BusinessToTech trucks={trucks} onNextSlide={() => {}} onPrevSlide={() => {}} />
        </div>

        <div className="border border-slate-300 rounded-lg p-6">
          <Slide5Impact
            authorName={authorName}
            onPrevSlide={() => {}}
            onRestartPresentation={() => {}}
            onOpenLiveDashboard={onOpenLiveDashboard}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Presentation Control Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Slide Indicator & Thumbnails */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900 font-mono">
            Slide {currentSlide} of {TOTAL_SLIDES}:
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`w-7 h-7 rounded text-xs font-mono font-semibold transition-all ${
                  currentSlide === idx
                    ? 'bg-[#0B2545] text-cyan-300 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Jump to Slide ${idx}`}
              >
                0{idx}
              </button>
            ))}
          </div>

          <span className="hidden md:inline text-xs text-slate-500 font-medium ml-2">
            {currentSlide === 1 && 'Cover: Bridging the Gap'}
            {currentSlide === 2 && 'Challenge: Data Silos'}
            {currentSlide === 3 && 'Solution: Integration Hub'}
            {currentSlide === 4 && 'Business to Tech: Architecture'}
            {currentSlide === 5 && 'Impact: Expected Value'}
          </span>
        </div>

        {/* Center: Slide Switcher arrows */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="p-1.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Slide [Left Arrow]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-slate-700 px-2">
            {currentSlide} / {TOTAL_SLIDES}
          </span>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES}
            className="p-1.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Slide [Right Arrow / Space]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions (Speaker Notes, Fullscreen, PDF Print, Live Demo) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              showNotes
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
            title="Toggle Speaker Presentation Notes [N]"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold transition-colors"
            title="Export all slides to PDF / Print"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold transition-colors"
            title="Fullscreen Pitch Mode [F]"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-slate-700" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-slate-700" />
            )}
            <span className="hidden md:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenLiveDashboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B2545] text-white hover:bg-[#134074] text-xs font-semibold shadow-xs transition-colors"
          >
            <Play className="w-3 h-3 fill-current text-cyan-400" />
            <span className="hidden sm:inline">Live App Hub</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="relative w-full transition-all duration-300">
        {currentSlide === 1 && (
          <Slide1Cover
            authorName={authorName}
            onUpdateAuthorName={handleUpdateAuthorName}
            onNextSlide={nextSlide}
          />
        )}

        {currentSlide === 2 && (
          <Slide2Challenge
            trucks={trucks}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />
        )}

        {currentSlide === 3 && (
          <Slide3Solution
            trucks={trucks}
            onSyncTruck={onSyncTruck}
            onSyncAllActionable={onSyncAllActionable}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
            onOpenLiveDashboard={onOpenLiveDashboard}
          />
        )}

        {currentSlide === 4 && (
          <Slide4BusinessToTech
            trucks={trucks}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />
        )}

        {currentSlide === 5 && (
          <Slide5Impact
            authorName={authorName}
            onPrevSlide={prevSlide}
            onRestartPresentation={() => setCurrentSlide(1)}
            onOpenLiveDashboard={onOpenLiveDashboard}
          />
        )}
      </div>

      {/* Collapsible Speaker Notes Drawer */}
      {showNotes && (
        <div className="bg-amber-50/90 border border-amber-300/80 rounded-lg p-5 shadow-md animate-in slide-in-from-top-2 duration-150 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="font-bold text-amber-950 text-sm">
                Speaker Notes & Talking Points · {SPEAKER_NOTES[currentSlide]?.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowNotes(false)}
              className="text-amber-800 hover:text-amber-950 font-bold text-xs"
            >
              Hide Notes [✕]
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 space-y-2">
              <span className="font-semibold text-amber-900 block">Key talking points for this slide:</span>
              <ul className="space-y-1.5 list-disc list-inside text-amber-900 leading-relaxed">
                {SPEAKER_NOTES[currentSlide]?.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 p-3 bg-white/80 rounded border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="font-semibold text-amber-900 block text-[11px] uppercase tracking-wider mb-1">
                  Key Quote / Punchline:
                </span>
                <p className="italic text-slate-800 font-medium leading-normal">
                  {SPEAKER_NOTES[currentSlide]?.keyQuote}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-200/60 text-[10px] text-amber-800">
                Tip: Use keyboard arrows [&larr;] [&rarr;] to navigate.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

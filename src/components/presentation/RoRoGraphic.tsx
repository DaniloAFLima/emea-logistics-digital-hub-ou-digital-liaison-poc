import React from 'react';

interface RoRoGraphicProps {
  className?: string;
  variant?: 'hero' | 'minimal' | 'route-map';
}

export const RoRoGraphic: React.FC<RoRoGraphicProps> = ({ className = '', variant = 'hero' }) => {
  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 800 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B2545" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#07192F" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="hullGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="neonPulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </linearGradient>

          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
        </defs>

        {/* Ambient Grid */}
        <rect width="800" height="450" fill="url(#grid)" />

        {/* European Maritime Route Corridors (Bremerhaven, Zeebrugge, Antwerp, Rotterdam) */}
        <g opacity="0.6">
          {/* North Sea connection arcs */}
          <path
            d="M 120 280 Q 240 210 380 230 T 640 180"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <path
            d="M 180 320 Q 320 250 460 270 T 700 210"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            opacity="0.7"
          />

          {/* Connected European Logistics Nodes */}
          {/* Zeebrugge */}
          <g transform="translate(260, 240)">
            <circle r="4" fill="#38BDF8" />
            <circle r="8" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.8" />
            <text x="12" y="4" fill="#93C5FD" fontSize="10" fontFamily="sans-serif" fontWeight="600">
              Zeebrugge
            </text>
          </g>

          {/* Antwerp */}
          <g transform="translate(300, 275)">
            <circle r="4" fill="#38BDF8" />
            <circle r="8" stroke="#38BDF8" strokeWidth="0.75" opacity="0.8" />
            <text x="12" y="4" fill="#93C5FD" fontSize="10" fontFamily="sans-serif" fontWeight="600">
              Antwerp
            </text>
          </g>

          {/* Rotterdam */}
          <g transform="translate(340, 220)">
            <circle r="5" fill="#38BDF8" />
            <circle r="10" stroke="#38BDF8" strokeWidth="1" opacity="0.9" />
            <text x="12" y="4" fill="#E0F2FE" fontSize="10" fontFamily="sans-serif" fontWeight="700">
              Rotterdam Hub
            </text>
          </g>

          {/* Bremerhaven */}
          <g transform="translate(460, 190)">
            <circle r="5" fill="#06B6D4" />
            <circle r="11" stroke="#06B6D4" strokeWidth="1" opacity="0.9" />
            <text x="12" y="4" fill="#E0F2FE" fontSize="10" fontFamily="sans-serif" fontWeight="700">
              Bremerhaven Terminal
            </text>
          </g>

          {/* Gothenburg / Nordic link */}
          <g transform="translate(560, 110)">
            <circle r="3.5" fill="#38BDF8" opacity="0.8" />
            <text x="10" y="3" fill="#93C5FD" fontSize="9" fontFamily="sans-serif">
              Gothenburg
            </text>
          </g>

          {/* Feeder line to Southampton */}
          <g transform="translate(150, 245)">
            <circle r="3.5" fill="#38BDF8" opacity="0.8" />
            <text x="-75" y="4" fill="#93C5FD" fontSize="9" fontFamily="sans-serif">
              Southampton
            </text>
          </g>
        </g>

        {/* RoRo Carrier Silhouette & Vehicle Deck Geometry */}
        <g transform="translate(80, 20)">
          {/* Waterline Glow */}
          <ellipse cx="400" cy="380" rx="340" ry="8" fill="url(#neonPulse)" />

          {/* Main Vessel Hull */}
          <path
            d="M 120 365 
               L 660 365 
               L 695 320 
               L 680 270 
               L 160 270 
               L 100 325 
               Z"
            fill="#0F2D54"
            stroke="#0284C7"
            strokeWidth="1.75"
          />

          {/* Upper Superstructure (RoRo Pure Car & Truck Carrier) */}
          <path
            d="M 175 270 
               L 645 270 
               L 645 205 
               L 560 205 
               L 540 160 
               L 480 160 
               L 475 205 
               L 210 205 
               L 175 250 
               Z"
            fill="#091E38"
            stroke="#38BDF8"
            strokeWidth="1.25"
            strokeOpacity="0.8"
          />

          {/* Bridge / Navigation Tower */}
          <rect x="495" y="168" width="40" height="28" rx="2" fill="#133E68" stroke="#38BDF8" strokeWidth="1" />
          <line x1="500" y1="176" x2="530" y2="176" stroke="#67E8F9" strokeWidth="2" strokeDasharray="3 2" />

          {/* Stern Ramp (RoRo signature roll-on roll-off ramp) */}
          <line x1="120" y1="365" x2="70" y2="385" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="125" y1="355" x2="80" y2="378" stroke="#0284C7" strokeWidth="1.5" />

          {/* Vehicle Deck Rows (Car transit levels) */}
          <line x1="190" y1="295" x2="650" y2="295" stroke="#1E40AF" strokeWidth="1.2" strokeDasharray="14 4" />
          <line x1="180" y1="320" x2="665" y2="320" stroke="#1E40AF" strokeWidth="1.2" strokeDasharray="14 4" />
          <line x1="150" y1="345" x2="655" y2="345" stroke="#1E40AF" strokeWidth="1.2" strokeDasharray="14 4" />

          {/* RoRo Carrier Hull Accent Line */}
          <path
            d="M 115 350 L 675 350"
            stroke="#00A3E0"
            strokeWidth="2.5"
          />

          {/* Subtle Radar & Telemetry Signal Emission */}
          <path
            d="M 515 155 Q 525 140 540 145"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 510 148 Q 528 128 550 135"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Ambient telemetry indicators */}
        <g transform="translate(620, 40)" opacity="0.75">
          <rect width="140" height="48" rx="4" fill="#0A2240" stroke="#0284C7" strokeWidth="0.8" />
          <text x="12" y="18" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="600">
            EMEA RORO TELEMETRY
          </text>
          <text x="12" y="34" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif" fontWeight="700">
            Live Gateway Ingest
          </text>
          <circle cx="125" cy="24" r="3.5" fill="#10B981" />
        </g>
      </svg>
    </div>
  );
};

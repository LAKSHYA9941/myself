// components/SubtleGrid.jsx
import React, { useEffect, useState } from 'react';

export default function SubtleGrid({ cellSize = 40 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // fallback for SSR
  const vw = mounted ? window.innerWidth : 1200;
  const vh = mounted ? window.innerHeight : 800;

  const cols = Math.ceil(vw / cellSize);
  const rows = Math.ceil(vh / cellSize);

  return (
    <div className="fixed inset-0 bg-slate-950 -z-20 pointer-events-none">
      <svg
        width={vw}
        height={vh}
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 4-corner fade mask */}
          <mask id="fadeMask">
            <rect
              x="0"
              y="0"
              width={vw}
              height={vh}
              fill="url(#fadeGradient)"
            />
            <defs>
              <linearGradient id="fadeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" />
                <stop offset="40%" stopColor="black" />
                <stop offset="75%" stopColor="black" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
          </mask>
        </defs>

        <g mask="url(#fadeMask)">
          {/* vertical lines */}
          {[...Array(cols)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * cellSize}
              y1={0}
              x2={i * cellSize}
              y2={vh}
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          ))}
          {/* horizontal lines */}
          {[...Array(rows)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * cellSize}
              x2={vw}
              y2={i * cellSize}
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
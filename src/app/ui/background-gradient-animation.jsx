"use client";
import React from "react";

/*
  BackgroundGradientAnimation (Aceternity-like)
  - Fullscreen animated gradient glows
  - Accepts CSS variables set by parent for colors: --c1, --c2, --c3, --c4
  - Pointer focal point supported via --mx, --my
  - Speed control via --bg-speed (1 = default)
*/
export const BackgroundGradientAnimation = React.forwardRef(function BackgroundGradientAnimation(
  { children, className = "", style = {} },
  ref
) {
  return (
    <div
      ref={ref}
      className={["absolute inset-0 overflow-hidden", className].join(" ")}
      style={{
        // fallback colors
        ['--c1']: "#22d3ee",
        ['--c2']: "#a78bfa",
        ['--c3']: "#f472b6",
        ['--c4']: "#0b1020",
        ['--mx']: "50%",
        ['--my']: "50%",
        ['--bg-speed']: 1,
        // dark base to preserve contrast
        backgroundColor: "#0b0f1a",
        ...style,
      }}
    >
      <style jsx>{`
        @keyframes floatA {
          0%   { transform: translate3d(-10%, -5%, 0) rotate(0deg); }
          25%  { transform: translate3d(15%, -10%, 0) rotate(60deg); }
          50%  { transform: translate3d(25%, 10%, 0) rotate(120deg); }
          75%  { transform: translate3d(-5%, 15%, 0) rotate(240deg); }
          100% { transform: translate3d(-10%, -5%, 0) rotate(360deg); }
        }
        @keyframes floatB {
          0%   { transform: translate3d(10%, 5%, 0) rotate(0deg); }
          25%  { transform: translate3d(-15%, 10%, 0) rotate(-60deg); }
          50%  { transform: translate3d(-25%, -10%, 0) rotate(-120deg); }
          75%  { transform: translate3d(5%, -15%, 0) rotate(-240deg); }
          100% { transform: translate3d(10%, 5%, 0) rotate(-360deg); }
        }
      `}</style>

      {/* Layered animated gradient glows (increased blur & richness) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[22%] opacity-60 blur-[80px] will-change-transform"
        style={{
          background:
            "radial-gradient(40vw 40vh at var(--mx) var(--my), var(--c1), transparent 60%), radial-gradient(35vw 35vh at 80% 20%, var(--c2), transparent 70%)",
          animation: "floatA calc(38s / var(--bg-speed)) linear infinite",
          mixBlendMode: "screen",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[28%] opacity-45 blur-[110px] will-change-transform"
        style={{
          background:
            "radial-gradient(52vw 52vh at 20% 80%, var(--c3), transparent 65%), radial-gradient(46vw 46vh at 70% 70%, var(--c2), transparent 60%)",
          animation: "floatB calc(48s / var(--bg-speed)) linear infinite",
          mixBlendMode: "screen",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[36%] opacity-35 blur-[140px] will-change-transform"
        style={{
          background:
            "radial-gradient(60vw 60vh at 50% 50%, var(--c4), transparent 72%)",
          animation: "floatA calc(60s / var(--bg-speed)) linear infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* Subtle film overlay & vignette to enrich */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.035),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.025),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.25)_100%)]" />

      {children}
    </div>
  );
});

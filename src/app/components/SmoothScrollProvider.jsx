"use client";
import React, { useEffect } from "react";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis = null;
    let rafId = null;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip Lenis to honor user preference and reduce CPU.
      return () => {};
    }

    (async () => {
      try {
        const mod = await import("@studio-freight/lenis");
        const Lenis = mod.default || mod;
        lenis = new Lenis({
          duration: 0.5,
          smoothWheel: true,
          smoothTouch: false,
          gestureOrientation: "vertical",
          easing: (t) => t, // linear easing = cheaper
          autoRaf: false, // we’ll run our own RAF loop only when needed
        });

        // Expose globally for in-page anchor navigation helpers
        try { window.lenis = lenis; } catch {}

        const raf = (time) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const onVis = () => {
          if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
          } else {
            if (!rafId) rafId = requestAnimationFrame(raf);
          }
        };
        document.addEventListener('visibilitychange', onVis);

        // Clean up visibility listener on unmount
        return () => document.removeEventListener('visibilitychange', onVis);
      } catch (e) {
        // Lenis not installed yet; no-op fallback
        // Scrolling will still work normally.
      }
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try { lenis?.destroy?.(); } catch {}
    };
  }, []);

  return <>{children}</>;
}

"use client";
import React, { useEffect } from "react";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis = null;
    let rafId = null;
    let isRunning = false;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Honor accessibility preference and skip smooth scrolling
      return () => {};
    }

    (async () => {
      try {
        const mod = await import("@studio-freight/lenis");
        const Lenis = mod.default || mod;
        lenis = new Lenis({
          duration: 0.7, // feels smoother & snappier
          smoothWheel: true,
          smoothTouch: false,
          gestureOrientation: "vertical",
          easing: (t) => 1 - Math.pow(2, -10 * t), // easeOutExpo for a nice snap
          autoRaf: false,
        });

        // Expose globally for debugging / manual control
        try {
          window.lenis = lenis;
        } catch {}

        const raf = (time) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        // Start RAF only when needed
        const startRaf = () => {
          if (!isRunning) {
            isRunning = true;
            rafId = requestAnimationFrame(raf);
          }
        };

        const stopRaf = () => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
          isRunning = false;
        };

        // Start RAF immediately to ensure smooth scrolling works on page load
        startRaf();
        
        // Detect scroll activity to start/stop raf
        lenis.on("scroll", () => startRaf());

        // Visibility optimization
        const onVis = () => {
          if (document.hidden) {
            stopRaf();
          } else {
            startRaf();
          }
        };
        document.addEventListener("visibilitychange", onVis);

        // Clean up visibility listener on unmount
        return () => {
          document.removeEventListener("visibilitychange", onVis);
          stopRaf();
        };
      } catch (e) {
        // Lenis not installed yet; fail silently
      }
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        lenis?.destroy?.();
      } catch {}
    };
  }, []);

  return <>{children}</>;
}

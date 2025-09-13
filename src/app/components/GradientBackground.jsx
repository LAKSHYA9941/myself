"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  GradientBackground
  - Single, fixed animated gradient background inspired by modern UI kits
  - Smoothly morphs colors per-section using GSAP ScrollTrigger
  - Also parallax-reacts to pointer position for subtle depth
*/
export default function GradientBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    // default colors
    const palettes = {
      home: ["#22d3ee", "#8b5cf6", "#020617"], // cyan -> violet -> near-black
      about: ["#60a5fa", "#34d399", "#0b1020"], // blue -> emerald
      tech: ["#06b6d4", "#f59e0b", "#0b0f1a"], // cyan -> amber
      projects: ["#a78bfa", "#ec4899", "#0a0a1a"], // violet -> pink
      contact: ["#f472b6", "#22d3ee", "#0b1020"], // pink -> cyan
    };

    // Helper to tween CSS variables for gradient stops
    const setPalette = (key) => {
      const [c1, c2, c3] = palettes[key] || palettes.home;
      gsap.to(el, {
        duration: 1.2,
        "--c1": c1,
        "--c2": c2,
        "--c3": c3,
        ease: "power2.out",
      });
    };

    // ScrollTriggers for each section with data-theme
    const sections = Array.from(document.querySelectorAll("section[data-theme]"));
    const triggers = sections.map((sec) => {
      const theme = sec.getAttribute("data-theme");
      return ScrollTrigger.create({
        trigger: sec,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setPalette(theme),
        onEnterBack: () => setPalette(theme),
      });
    });

    // Pointer parallax for gradient focal point
    const move = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      gsap.to(el, { "--mx": `${x}%`, "--my": `${y}%`, duration: 0.5, ease: "power2.out" });
    };
    window.addEventListener("pointermove", move);

    // Initial palette
    setPalette("home");

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      style={{
        /* Animated via CSS variables set by GSAP */
        /* --mx/--my control focal point, --c1/--c2/--c3 control colors */
        // @ts-ignore - CSS variables
        background:
          "radial-gradient(80vw 80vh at var(--mx, 50%) var(--my, 50%), var(--c1, #22d3ee) 0%, var(--c2, #8b5cf6) 55%, var(--c3, #020617) 100%)",
        filter: "saturate(110%) blur(0px)",
      }}
    >
      {/* Optional subtle overlay to enrich the colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.03),transparent_35%)]" />
    </div>
  );
}

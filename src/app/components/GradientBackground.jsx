"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

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

    // Tuned palettes (4 colors + speed) for Aceternity-like background
    const palettes = {
        home:     { c1: "#090040", c2: "#471396", c3: "#B13BFF", c4: "#111827", speed: 1.0 },
        about:    { c1: "#0D0A1A", c2: "#2C1B69", c3: "#5E2BFF", c4: "#0F0F23", speed: 0.9 },
        tech:     { c1: "#0A0A0A", c2: "#2D0A69", c3: "#7C3AED", c4: "#1E1B4B", speed: 1.15 },
        projects: { c1: "#0F0F23", c2: "#3B0764", c3: "#8B5CF6", c4: "#0A0A0A", speed: 1.25 },
        contact:  { c1: "#0D0A1A", c2: "#471396", c3: "#B13BFF", c4: "#111827", speed: 1.0 },
      };

    // Helper to tween CSS variables for gradient stops and speed
    const setPalette = (key) => {
      const { c1, c2, c3, c4, speed } = palettes[key] || palettes.home;
      gsap.to(el, {
        duration: 1.2,
        "--c1": c1,
        "--c2": c2,
        "--c3": c3,
        "--c4": c4,
        "--bg-speed": speed,
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
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <BackgroundGradientAnimation ref={bgRef} />
    </div>
  );
}

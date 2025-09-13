"use client";
import React, { useEffect, useRef, useState } from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

/*
  GradientBackground
  - Single, fixed animated gradient background inspired by modern UI kits
  - Smoothly morphs colors autonomously with random palettes cycling on an interval
*/
export default function GradientBackground() {
  const bgRef = useRef(null);
  const [palette, setPalette] = useState({ c1: "#090040", c2: "#471396", c3: "#B13BFF", c4: "#111827", speed: 1.0 });

  useEffect(() => {
    const options = [
      { c1: "#090040", c2: "#471396", c3: "#B13BFF", c4: "#111827", speed: 1.0 },
      { c1: "#0D0A1A", c2: "#2C1B69", c3: "#5E2BFF", c4: "#0F0F23", speed: 0.9 },
      { c1: "#0A0A0A", c2: "#2D0A69", c3: "#7C3AED", c4: "#1E1B4B", speed: 1.15 },
      { c1: "#0F0F23", c2: "#3B0764", c3: "#8B5CF6", c4: "#0A0A0A", speed: 1.25 },
      { c1: "#0D0A1A", c2: "#471396", c3: "#B13BFF", c4: "#111827", speed: 1.0 },
      { c1: "#001524", c2: "#15616D", c3: "#FFECD1", c4: "#0B0F1A", speed: 0.95 },
    ];

    let mounted = true;
    const id = setInterval(() => {
      if (!mounted) return;
      const next = options[Math.floor(Math.random() * options.length)];
      setPalette(next);
    }, 14000); // change every ~14s
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <BackgroundGradientAnimation
        ref={bgRef}
        style={{
          ['--c1']: palette.c1,
          ['--c2']: palette.c2,
          ['--c3']: palette.c3,
          ['--c4']: palette.c4,
          ['--bg-speed']: palette.speed,
        }}
      />
    </div>
  );
}

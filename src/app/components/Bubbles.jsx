"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Bubbles({ count = 12, maxSize = 88, minSize = 28, opacity = 0.25 }) {
  const containerRef = useRef(null);
  const tweensRef = useRef([]);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // honor reduced motion

    const container = containerRef.current;
    if (!container) return;

    const makeColor = () => {
      const h1 = Math.floor(Math.random() * 360);
      const h2 = (h1 + 50 + Math.random() * 100) % 360;
      return `radial-gradient(circle at 30% 30%, hsla(${h1},95%,65%,0.9), hsla(${h2},95%,60%,0.5))`;
    };

    const bubbles = [];
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.round(minSize + Math.random() * (maxSize - minSize));
      Object.assign(el.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: '0px',
        top: '0px',
        borderRadius: '9999px',
        filter: 'blur(2px)',
        opacity: String(opacity),
        background: makeColor(),
        mixBlendMode: 'screen',
        willChange: 'transform',
        pointerEvents: 'none',
      });
      container.appendChild(el);
      bubbles.push(el);

      // initial position
      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        x: Math.random() * cw,
        y: Math.random() * ch,
        scale: 1,
      });

      // gentle autonomous drift
      const tween = gsap.to(el, {
        x: `+=${gsap.utils.random(-140, 140)}`,
        y: `+=${gsap.utils.random(-100, 100)}`,
        duration: gsap.utils.random(10, 18),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      tweensRef.current.push(tween);
    }

    // Pause/resume on tab visibility
    const onVis = () => {
      tweensRef.current.forEach(t => (document.hidden ? t.pause() : t.resume()));
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      tweensRef.current.forEach(t => t.kill());
      tweensRef.current = [];
      try { container.innerHTML = ''; } catch {}
    };
  }, [count, maxSize, minSize, opacity]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden />
  );
}

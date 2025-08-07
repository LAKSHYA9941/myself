"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function MouseGradientBG({ children }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const gradient = useTransform(
    [x, y],
    ([a, b]) =>
      `conic-gradient(from 0deg at ${a * 100}% ${b * 100}%, #0d1117, #0d1117, #070F2B, #27374D, #521477, #000000, #060930, #400082)`
  );

  useEffect(() => {
    const handle = (e) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-50 pointer-events-none "
        style={{ background: gradient }}
      />
      {children}
    </>
  );
}
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight]),
    { stiffness: 400, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 400, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={twMerge("relative w-full", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          className="ml-1 hidden md:block h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800 shadow-sm"
        />
        <motion.svg
          aria-hidden="true"
          width="20"
          height="100%"
          viewBox={`0 0 20 ${svgHeight}`}
          className="ml-4 hidden md:block absolute"
        >
          <motion.path
            d={`M 1 0V ${svgHeight}`}
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="1"
          />
          <motion.path
            d={`M 1 ${y1.get()} L 1 ${y2.get()}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B13BFF" />
              <stop offset="100%" stopColor="#471396" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

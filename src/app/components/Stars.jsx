"use client";
// Stars.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const STAR_COLORS = ["#F0F8FF", "#E6F3FF", "#CCE5FF"];
const SIZES = [3, 4, 6]; // px

export default function Stars() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const makeStar = () => {
      const star = document.createElement("div");
      const size = SIZES[Math.floor(Math.random() * SIZES.length)];
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

      star.className = "absolute rounded-full";
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = color;
      star.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`;
      star.style.filter = "blur(0.5px)";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = "-10vh"; // start ABOVE the screen
      container.appendChild(star);

      // drift DOWNWARD
      gsap.to(star, {
        y: "110vh", // off screen bottom
        duration: 5 + Math.random() * 10,
        ease: "none",
        onComplete: () => star.remove(),
      });
    };

    // create a new star every 150 ms
    const tl = gsap.timeline({ repeat: -1 });
    tl.call(makeStar, null, "+=0.15");

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
      }}
    />
  );
}
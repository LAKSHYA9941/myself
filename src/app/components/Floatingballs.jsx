"use client";

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function FloatingBalls({ count = 12 }) {
  const container = useRef(null);

  /* generate random gradient sphere */
  const createBall = (id) => {
    const ball = document.createElement('div');
    ball.className =
      'absolute rounded-full filter blur-2xl opacity-60 pointer-events-none';
    const size = 60 + Math.random() * 140; // 60–200 px
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;

    /* random pastel gradient */
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 60 + Math.random() * 120) % 360;
    ball.style.background = `radial-gradient(circle, hsla(${hue1},100%,70%,0.8) 0%, hsla(${hue2},100%,70%,0.4) 100%)`;

    /* initial random position */
    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });

    /* infinite gentle float */
    gsap.to(ball, {
      x: `+=${gsap.utils.random(-300, 300)}`,
      y: `+=${gsap.utils.random(-300, 300)}`,
      duration: gsap.utils.random(10, 30),
      repeat: -1,
      yoyo: true,
      ease: 'elastic.inOut',
    });

    container.current.appendChild(ball);
  };

  /* create spheres once */
  useEffect(() => {
    if (!container.current) return;
    for (let i = 0; i < count; i++) createBall(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div
      ref={container}
      className="fixed inset-0 bg-black -z-10 overflow-hidden"
    />
  );
}
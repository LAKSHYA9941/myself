"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function PageReveal({ children }) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      { clipPath: 'circle(150% at 50% 50%)', duration: 1.2, ease: 'power4.inOut' },
    );
  }, [children]);

  return (
    <div ref={ref} className="w-full h-full  ">
      {children}
    </div>
  );
}
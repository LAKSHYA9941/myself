"use client";
// Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);
  const drawer = useRef(null);
  const [active, setActive] = useState('home');
  const ratiosRef = useRef({});

  const links = [
    { path: 'about',     label: 'About' },
    { path: 'techstack', label: 'Tech Stack' },
    { path: 'skills',    label: 'Skills' },
    { path: 'projects',  label: 'Projects' },
    { path: 'contact',   label: 'Contact' },
  ];

  /* ---------- burger / drawer ---------- */
  const toggleMenu = () => setOpen(prev => !prev);

  // simple click-away
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      const el = menuRef.current;
      if (el && !el.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  // Observe sections to highlight active link
  useEffect(() => {
    const allTopSections = Array.from(document.querySelectorAll('main > section[id]'));
    const sections = allTopSections.filter(sec => links.some(l => l.path === sec.id));
    if (!sections.length) return;

    // initialize ratios map
    ratiosRef.current = Object.fromEntries(sections.map(s => [s.id, 0]));

    // set initial active based on closest to viewport center
    const pickByCenter = () => {
      const centerY = window.innerHeight / 2;
      let bestId = null;
      let bestDist = Infinity;
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const secCenter = rect.top + rect.height / 2;
        const dist = Math.abs(secCenter - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = sec.id;
        }
      });
      if (bestId) setActive(bestId);
    };
    pickByCenter();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          const id = e.target.id;
          if (!id) return;
          ratiosRef.current[id] = e.isIntersecting ? e.intersectionRatio : 0;
        });
        let bestId = null;
        let bestRatio = -1;
        for (const id of Object.keys(ratiosRef.current)) {
          const r = ratiosRef.current[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        root: null,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
        rootMargin: '-45% 0px -45% 0px',
      }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e, href, closeAfter = false) => {
    // Use Lenis smooth scroll if available; else allow default behavior
    try {
      const hash = typeof href === 'string' && href.includes('#') ? href.split('#')[1] : '';
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(target, { offset: -88 });
        // update URL hash without jumping
        history.replaceState(null, '', `/#${hash}`);
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, '', `/#${hash}`);
      }
      if (closeAfter && open) toggleMenu();
    } catch {}
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <nav ref={menuRef} className="px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link href="/"  className="flex items-center" prefetch>
            <Image
              src="/LOGO.png"
              width={48}
              height={48}
              className="mr-3 h-12 w-auto rounded-lg border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-1 shadow-[0_4px_12px_#00000040,0_0_15px_#ffffff40] backdrop-blur-sm antialiased"
              alt="Logo"
              quality={90}
            />
          </Link>

          {/* Desktop links (≥ 700 px) */}
          <ul className="hidden md:flex flex-row space-x-2 md:space-x-4">
            {links.map(({ path, label }) => {
              const href = `/#${path}`;
              const isActive = active === path;
              const linkClass = [
                'relative px-3 py-2 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-2xl outline-none transition-all duration-300 ease-out',
                'before:absolute before:inset-0 before:rounded-2xl before:-z-10 before:bg-cyan-400/0 before:blur-sm before:transition-all before:duration-300',
                isActive
                  ? 'text-white before:scale-100 before:opacity-100 before:bg-cyan-400/60 border border-cyan-400'
                  : 'text-slate-400 border border-transparent hover:text-white hover:before:scale-100 hover:before:opacity-100 hover:before:bg-[#B13BFF]/50',
                'transform-gpu',
              ].join(' ');
              return (
                <li key={path}>
                  <Link id="desktopNav" href={href} className={linkClass} prefetch onClick={(e) => handleAnchorClick(e, href)}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Burger (< 700 px) */}
          <button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span ref={bar1} className={`w-6 h-0.5 bg-white rounded transform transition-transform duration-300 ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span ref={bar2} className={`w-6 h-0.5 bg-white rounded transform transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
            <span ref={bar3} className={`w-6 h-0.5 bg-white rounded transform transition-transform duration-300 ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile drawer (< 700 px) */}
        <div
          ref={drawer}
          className={`fixed top-0 right-0 h-screen w-64 bg-[#0d1117]/90 backdrop-blur-xl border-l border-[#0d1117]/60 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-8">
            {links.map(({ path, label }) => {
              const href = `/#${path}`;
              return (
                <li key={path}>
                  <Link
                    id="mobileLink"
                    href={href}
                    onClick={(e) => handleAnchorClick(e, href, true)}
                    className="text-lg uppercase text-slate-300 hover:text-white"
                    prefetch
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
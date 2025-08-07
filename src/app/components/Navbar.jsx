"use client";
// Navbar.jsx
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { useClickAway } from 'react-use';
import gsap from 'gsap';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);
  const drawer = useRef(null);
  const pathname = usePathname();

  const links = [
    { path: 'about',     label: 'About' },
    { path: 'techstack', label: 'Tech Stack' },
    { path: 'projects',  label: 'Projects' },
    { path: 'contacts',   label: 'Contact' },
  ];

  /* ---------- desktop stagger ---------- */
  useGSAP(() => {
    const items = gsap.utils.toArray('#desktopNav');
    const mid = Math.floor(items.length / 2);
    gsap.fromTo(
      items,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: { amount: 0.4, from: mid }, ease: 'back.out(1.4)' }
    );
  });

  /* ---------- burger / drawer ---------- */
  const toggleMenu = () => {
    const next = !open;
    setOpen(next);
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    if (next) {
      tl.to(bar1.current, { y: 6, rotate: 45, duration: 0.3 })
        .to(bar2.current, { scaleX: 0, duration: 0.2 }, 0)
        .to(bar3.current, { y: -6, rotate: -45, duration: 0.3 }, 0)
        .set(drawer.current, { display: 'block' })
        .fromTo(drawer.current, { x: '100%' }, { x: '0%', duration: 0.4 })
        .fromTo(
          '#mobileLink',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, stagger: 0.06, duration: 0.3 },
          '-=0.2'
        );
    } else {
      tl.to(bar1.current, { y: 0, rotate: 0, duration: 0.3 })
        .to(bar2.current, { scaleX: 1, duration: 0.2 }, 0)
        .to(bar3.current, { y: 0, rotate: 0, duration: 0.3 }, 0)
        .to(drawer.current, { x: '100%', duration: 0.35 })
        .set(drawer.current, { display: 'none' });
    }
  };

  useClickAway(menuRef, () => open && toggleMenu());

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <nav ref={menuRef} className="px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/LOGO.png"
              width={48}
              height={48}
              className="mr-3 h-12 w-auto rounded-lg border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-1 shadow-[0_4px_12px_#00000040,0_0_15px_#ffffff40] backdrop-blur-sm antialiased"
              alt="Logo"
            />
          </Link>

          {/* Desktop links (≥ 700 px) */}
          <ul className="hidden md:flex flex-row space-x-2 md:space-x-4">
            {links.map(({ path, label }) => {
              const href = path === 'projects' ? '/projects' : `/${path}`;
              const isActive = pathname === href;
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
                  <Link id="desktopNav" href={href} className={linkClass}>
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
            <span ref={bar1} className="w-6 h-0.5 bg-white rounded" />
            <span ref={bar2} className="w-6 h-0.5 bg-white rounded" />
            <span ref={bar3} className="w-6 h-0.5 bg-white rounded" />
          </button>
        </div>

        {/* Mobile drawer (< 700 px) */}
        <div
          ref={drawer}
          className="fixed top-0 right-0 h-screen w-64 bg-[#0d1117]/90 backdrop-blur-xl border-l border-[#0d1117]/60 hidden lg:hidden"
          style={{ display: 'none' }}
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-8">
            {links.map(({ path, label }) => {
              const href = path === 'projects' ? '/projects' : `/${path}`;
              return (
                <li key={path}>
                  <Link
                    id="mobileLink"
                    href={href}
                    onClick={toggleMenu}
                    className="text-lg uppercase text-slate-300 hover:text-white"
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
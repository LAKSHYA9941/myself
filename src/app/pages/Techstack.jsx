"use client";
// Techstack.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SubtleGrid from '../components/Subtlegrid';
gsap.registerPlugin(ScrollTrigger);

/* ---------- split lists ---------- */
const stripTop = [
    /* Languages */
    { name: 'JavaScript', file: 'js.svg', color: '#f7df1e' },
    { name: 'TypeScript', file: 'ts.svg', color: '#007acc' },
    { name: 'Python', file: 'python.svg', color: '#3776ab' },
    { name: 'HTML', file: 'html.svg', color: '#e34f26' },
    { name: 'CSS', file: 'css.svg', color: '#1572b6' },
    { name: 'SQL', file: 'sql.svg', color: '#336791' },

    /* Frontend */
    { name: 'React', file: 'react.svg', color: '#61dafb' },
    { name: 'Next', file: 'nextjs.svg', color: '#ffffff' },
    { name: 'Tailwind', file: 'tailwind.svg', color: '#06b6d4' },
    { name: 'Vite', file: 'vite.svg', color: '#a855f7' },
    { name: 'Redux', file: 'redux.svg', color: '#764abc' },
];

const stripBottom = [
    /* Backend */
    { name: 'Node', file: 'nodejs.svg', color: '#339933' },
    { name: 'Express', file: 'express.svg', color: '#7F8CAA' },
    { name: 'MongoDB', file: 'mongodb.svg', color: '#47a248' },
    { name: 'Firebase', file: 'firebase.svg', color: '#ffca28' },
    { name: 'REST', file: 'rest.svg', color: '#6366f1' },

    /* Tools */
    { name: 'Git', file: 'git.svg', color: '#f05032' },
    { name: 'GitHub', file: 'github.svg', color: '#ffffff' },
    { name: 'Axios', file: 'axios.svg', color: '#5a29e4' },
    { name: 'Postman', file: 'postman.svg', color: '#ff6c37' },
];


/* ---------- Logo ---------- */
// const Logo = ({ src, color, name }) => (
//     <motion.div
//         className="w-12 h-48 md:w-24 md:h-16 mx-2 md:mx-4 flex-shrink-0 cursor-pointer"
//         whileHover={{ scale: 1.15, rotate: 5, y: -6, filter: `drop-shadow(0 0 12px ${color})` }}
//         transition={{ type: 'spring', stiffness: 300, damping: 10 }}
//     >
//         <img
//             src={`/${src}`}
//             alt={name}
//             className="w-full h-full object-contain"
//             onError={(e) => (e.target.style.display = 'none')}
//         />
//     </motion.div>
// );

const Logo = ({ src, color, name }) => (
    <motion.div
        className="
      w-16 h-16  
      md:w-28 md:h-28      
      mx-2 md:mx-4 flex-shrink-0 cursor-pointer"
        whileHover={{ scale: 1, rotate: 5, y: -6, filter: `drop-shadow(0 0 8px ${color})` }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
        <img
            src={`/${src}`}
            alt={name}
            className="w-full h-full object-contain"
            onError={(e) => (e.target.style.display = 'none')}
        />
    </motion.div>
);


/* ---------- Pre-filled Strip (no blank space) ---------- */
const Strip = ({ direction, logos }) => {
    const stripRef = useRef(null);
    // mirror the list so the strip is full on first paint
    const mirrored = [...logos, ...logos, ...logos, ...logos];

    const LOGO_W = 96;
    const GAP = 32;
    const distance = mirrored.length * (LOGO_W + GAP);

    useGSAP(() => {
        if (!stripRef.current) return;
        const tl = gsap.timeline({ repeat: -1 });

        if (direction === 'rtl') {
            tl.fromTo(stripRef.current, { x: 0 }, { x: -distance, duration: 90, ease: 'none' });
        } else {
            tl.fromTo(stripRef.current, { x: -distance }, { x: 0, duration: 90, ease: 'none' });
        }

        const pause = () => tl.pause();
        const play = () => tl.play();
        stripRef.current.addEventListener('mouseenter', pause);
        stripRef.current.addEventListener('mouseleave', play);
        return () => tl.kill();
    }, [direction, distance]);

    return (
        <div className="w-full h-40 md:h-48 overflow-hidden py-4 md:py-6">
            <div
                ref={stripRef}
                className="flex whitespace-nowrap"
                style={{ width: direction === 'rtl' ? '400%' : '400%' }}
            >
                {mirrored.map((t, i) => (
                    <Logo key={`${direction}-${t.name}-${i}`} src={t.file} color={t.color} name={t.name} />
                ))}
            </div>
        </div>
    );
};
/* ---------- Main ---------- */
export default function Techstack() {
    return (
        <div className=" min-h-full overflow-hidden">
            <SubtleGrid cellSize={40} />
            <Strip direction="ltr" logos={stripTop} />
            {/* existing content */}
            <div className="relative z-10 flex items-center justify-center py-20">
                {/* …your existing grid… */}
            </div>
            <Strip direction="rtl" logos={stripBottom} />
        </div>
    );
}
"use client";
// Techstack.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SubtleGrid from '../components/Subtlegrid';
import { useRevealer } from '../Hooks/useRevealer';
gsap.registerPlugin(ScrollTrigger);

/* ---------- split lists ---------- */
const stripTop = [
    /* Languages */
    { name: 'JavaScript', file: 'js.svg', color: '#f7df1e', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839920/js_mg6btj.svg" },
    { name: 'TypeScript', file: 'ts.svg', color: '#007acc', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839919/ts_rgke55.svg" },
    { name: 'Python', file: 'python.svg', color: '#3776ab', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839919/python_in6uz5.svg" },
    { name: 'HTML', file: 'html.svg', color: '#e34f26', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839919/html_ig7xle.svg" },
    { name: 'CSS', file: 'css.svg', color: '#1572b6', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839918/css_twcrfz.svg" },
    { name: 'SQL', file: 'sql.svg', color: '#336791', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839917/sql_i03nrn.svg" },
    { name: 'GSAP', file: 'gsap.svg', color: '#B4E50D', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839914/gsap_mjec9s.svg" },

    /* Frontend */
    { name: 'React', file: 'react.svg', color: '#61dafb', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839920/react_xqwzfz.svg" },
    { name: 'Next', file: 'nextjs.svg', color: '#ffffff', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839916/nextjs_faikal.svg" },
    { name: 'Tailwind', file: 'tailwind.svg', color: '#06b6d4', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839920/tailwind_ih4trd.svg" },
    { name: 'Vite', file: 'vite.svg', color: '#a855f7', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839922/vite_eq3hos.svg" },
    { name: 'Redux', file: 'redux.svg', color: '#764abc', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839917/redux_u2tetl.svg" },
];

const stripBottom = [
    /* Backend */
    { name: 'Node', file: 'nodejs.svg', color: '#339933', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839915/nodejs_x2lom9.svg" },
    { name: 'Express', file: 'express.svg', color: '#7F8CAA', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839915/express_lvxcbe.svg" },
    { name: 'MongoDB', file: 'mongodb.svg', color: '#47a248', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839917/mongodb_rbghwp.svg" },
    { name: 'Firebase', file: 'firebase.svg', color: '#ffca28', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839913/firebase_phrmjv.svg" },
    { name: 'REST', file: 'rest.svg', color: '#6366f1', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839915/rest_bozily.svg" },

    /* Tools */
    { name: 'Git', file: 'git.svg', color: '#f05032', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839916/git_i6jdjm.svg" },
    { name: 'GitHub', file: 'github.svg', color: '#ffffff', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839913/github_yve9di.svg" },
    { name: 'Axios', file: 'axios.svg', color: '#5a29e4', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839913/axios_mvdcgw.svg" },
    { name: 'Postman', file: 'postman.svg', color: '#ff6c37', src: "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839917/postman_t2zc8t.svg" },
];



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
    useRevealer();
    return (
        <>
            <div className="revealer" />
            <div className=" min-h-full overflow-hidden">
                <SubtleGrid cellSize={40} />
                <Strip direction="ltr" logos={stripTop} />
                {/* existing content */}
                <div className="relative z-10 flex items-center justify-center py-20">
                    <h1 className='text-4xl font-bold text-center text-slate-100'>Techstack</h1>
                </div>
                <Strip direction="rtl" logos={stripBottom} />
            </div>
        </>
    );
}
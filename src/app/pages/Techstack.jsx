"use client";
// Techstack.jsx
import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
        {(() => {
            const finalSrc = src?.startsWith('http') ? src : `/${src}`;
            return (
                <img
                    src={finalSrc}
                    alt={name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                />
            );
        })()}
    </motion.div>
);

/* ---------- Pre-filled Strip (no blank space) ---------- */
const Strip = ({ direction, logos }) => {
    const stripRef = useRef(null);
    // mirror the list so the strip is full on first paint (reduced duplicates for performance)
    const mirrored = useMemo(() => [...logos, ...logos], [logos]);

    const LOGO_W = 88;
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
        const el = stripRef.current;
        el.addEventListener('mouseenter', pause);
        el.addEventListener('mouseleave', play);
        return () => {
            el.removeEventListener('mouseenter', pause);
            el.removeEventListener('mouseleave', play);
            tl.kill();
        };
    }, [direction, distance]);

    return (
        <div className="w-full h-40 md:h-48 overflow-hidden py-4 md:py-6">
            <div
                ref={stripRef}
                className="flex whitespace-nowrap will-change-transform"
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
        <>
            <div className=" min-h-full overflow-hidden">
                <Strip direction="ltr" logos={stripTop} />
                {/* existing content */}
                <div className="relative z-10 flex items-center justify-center py-10">
                    <h1 className='text-4xl font-bold text-center text-slate-100'>Techstack</h1>
                </div>
                <Strip direction="rtl" logos={stripBottom} />

                {/* AI-related skills */}
                <div className="relative z-10 flex items-center justify-center py-8">
                    <h2 className='text-2xl font-semibold text-center text-slate-200'>AI · Agents · RAG</h2>
                </div>
                <Strip
                  direction="ltr"
                  logos={[
                    { name: 'RAG', file: 'https://api.iconify.design/material-symbols/generating-tokens.svg?color=%23f59e0b', color: '#f59e0b' },
                    { name: 'Generative AI', file: 'https://api.iconify.design/mdi/creation.svg?color=%23e879f9', color: '#e879f9' },
                    { name: 'AI Agents', file: 'https://api.iconify.design/mdi/robot-outline.svg?color=%23a3e635', color: '#a3e635' },
                    { name: 'Agentic Workflows', file: 'https://api.iconify.design/mdi/graph-outline.svg?color=%238b5cf6', color: '#8b5cf6' },
                    { name: 'MCP', file: 'https://api.iconify.design/mdi/api.svg?color=%236ee7b7', color: '#6ee7b7' },
                    { name: 'LangChain', file: 'https://api.iconify.design/simple-icons/langchain.svg?color=%2300bf8f', color: '#00bf8f' },
                    { name: 'LangGraph', file: 'https://api.iconify.design/mdi/chart-graph.svg?color=%23f43f5e', color: '#f43f5e' },
                    { name: 'Model Finetuning', file: 'https://api.iconify.design/mdi/tune-variant.svg?color=%23f97316', color: '#f97316' },
                    { name: 'Qdrant', file: 'https://api.iconify.design/simple-icons/qdrant.svg?color=%238256d1', color: '#8256d1' },
                    { name: 'Mem0', file: 'https://api.iconify.design/mdi/memory.svg?color=%23fde047', color: '#fde047' },
                    { name: 'Neo4j', file: 'https://api.iconify.design/simple-icons/neo4j.svg?color=%2300A3E0', color: '#00A3E0' },
                  ]}
                />
            </div>
        </>
    );
}
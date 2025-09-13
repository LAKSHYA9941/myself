"use client";
// Techstack.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

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

const TechLogo = ({ file, color, name }) => {
  const finalSrc = file?.startsWith('http') ? file : `/${file}`;
  const elRef = useRef(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !elRef.current) return;

    gsap.set(elRef.current, { scale: 1, rotate: 0 });
    const onEnter = () => gsap.to(elRef.current, { scale: 1.08, rotate: 2, duration: 0.25, ease: "power2.out" });
    const onLeave = () => gsap.to(elRef.current, { scale: 1, rotate: 0, duration: 0.25, ease: "power2.out" });
    const node = elRef.current;
    node.addEventListener('mouseenter', onEnter);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="w-16 h-16 md:w-24 md:h-24 mx-2 md:mx-3 flex items-center justify-center rounded-xl cursor-pointer"
      style={{ filter: `drop-shadow(0 0 6px ${color}50)` }}
      title={name}
    >
      <img
        src={finalSrc}
        alt={name}
        className="w-full h-full object-contain"
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </div>
  );
};

const LogoGrid = ({ logos }) => (
  <div className="w-full py-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 place-items-center">
    {logos.map((t) => (
      <TechLogo key={t.name} file={t.file} color={t.color} name={t.name} />
    ))}
  </div>
);

/* ---------- Main ---------- */
export default function Techstack() {
  return (
    <>
      <div className="relative min-h-full overflow-hidden">
        {/* animated gradient title */}
        <div className="relative z-10 flex items-center justify-center py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">
            Techstack
          </h1>
        </div>

        {/* staggered fade-in grids */}
        <div className="animate-fadeInUp stagger-100">
          <LogoGrid logos={stripTop} />
        </div>

        {/* AI section with glow title */}
        <div className="relative z-10 flex items-center justify-center py-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse">
            AI · Agents · RAG
          </h2>
        </div>
        <div className="animate-fadeInUp stagger-200">
          <LogoGrid
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
      </div>

      {/* global fade-in keyframes (inline) */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .stagger-100 { animation-delay: 0.1s; }
        .stagger-200 { animation-delay: 0.2s; }
      `}</style>
    </>
  );
}
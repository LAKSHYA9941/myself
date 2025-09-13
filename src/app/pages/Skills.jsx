"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Skills() {
  const beamRef = useRef(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    if (!beamRef.current) return;
    gsap.fromTo(
      beamRef.current,
      { yPercent: -100, opacity: 0 },
      {
        yPercent: 100,
        opacity: 1,
        duration: 3,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      }
    );
  }, []);

  const stages = [
    {
      id: "frontend",
      title: "Frontend Foundations",
      emoji: "🎨",
      blurb:
        "Built solid UI fundamentals and ergonomics to ship fast, clean experiences.",
      points: [
        "HTML, CSS, JavaScript — the bedrock",
        "React, Next.js, Vite — modern SPA/SSR",
        "Tailwind CSS — utility-first styling",
        "State mgmt (Redux basics, hooks), forms, routing",
        "Accessibility, responsive design"
      ],
    },
    {
      id: "backend",
      title: "Backend Essentials",
      emoji: "🛠️",
      blurb:
        "Learned how to design, build and secure APIs and data models.",
      points: [
        "Node.js + Express — REST APIs",
        "MongoDB — schema design, indexing",
        "AuthN/AuthZ — JWT sessions, hashing",
        "API validation, error handling",
        "Basic deployment & logging"
      ],
    },
    {
      id: "fullstack",
      title: "Fullstack Integration",
      emoji: "🔗",
      blurb:
        "Closed the loop between UI and data with quality, tooling and DX.",
      points: [
        "End-to-end flows (auth → data → UI)",
        "Fetching, caching, optimistic updates",
        "Testing mindset, debugging workflows",
        "Basic CI/CD and environment configs",
        "Perf profiling and UX polish"
      ],
    },
    {
      id: "fullstack-ai",
      title: "Fullstack AI Developer",
      emoji: "🤖",
      blurb:
        "Brought intelligence into apps with safe, reliable agentic patterns.",
      points: [
        "RAG fundamentals (chunking, embeddings, retrieval)",
        "Agents & tool-use strategies",
        "Vector stores (Qdrant), graphs (Neo4j)",
        "LangChain / LangGraph building blocks",
        "Evaluation, tracing, prompt hygiene"
      ],
    },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      <Bubbles count={12} maxSize={88} minSize={24} opacity={0.16} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-white">Skills & Journey</h2>
        <p className="text-center text-slate-300 mt-2">
          How I grew from frontend → backend → fullstack → fullstack AI developer
        </p>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* vertical line with tracing beam */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#471396] via-[#B13BFF] to-transparent rounded-full opacity-30" />
          <div
            ref={beamRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-6 bg-gradient-to-b from-white via-[#B13BFF] to-white rounded-full shadow-[0_0_12px_#B13BFF,0_0_24px_#B13BFF] z-10"
          />

          <div className="space-y-10">
            {stages.map((s, idx) => (
              <div
                id={s.id}
                key={s.id}
                className={`flex flex-col md:flex-row items-stretch gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Card */}
                <div className="md:w-1/2"></div>
                <div className="md:w-1/2"></div>
                <div className={`relative md:w-1/2 ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  {/* connector dot */}
                  <div className="hidden md:block absolute top-6 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#B13BFF] shadow-[0_0_15px_#B13BFF]" />

                  <div className="bg-[#0d1117]/60 border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_-5px_#B13BFF40] hover:shadow-[0_0_35px_-5px_#B13BFF66] transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{s.emoji}</div>
                      <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-slate-300 text-sm">{s.blurb}</p>
                    <ul className="mt-4 list-disc list-inside text-slate-400 space-y-1 text-sm">
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

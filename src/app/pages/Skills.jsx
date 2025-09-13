"use client";
import React from "react";
import { TracingBeam } from "../ui/tracing-beam";

export default function Skills() {
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
    <TracingBeam className="px-6">
      <div className="max-w-5xl mx-auto antialiased pt-4 relative">
        <h2 className="text-4xl font-bold text-center text-white mb-2">Skills & Journey</h2>
        <p className="text-center text-slate-300 mb-10">
          How I grew from frontend → backend → fullstack → fullstack AI developer
        </p>

        {stages.map((s, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {s.emoji} {s.title}
            </h2>
            <p className="text-xl mb-4 font-semibold text-white">{s.title}</p>
            <div className="text-sm prose prose-sm dark:prose-invert text-slate-300">
              <p className="mb-2">{s.blurb}</p>
              <ul className="list-disc list-inside space-y-1">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

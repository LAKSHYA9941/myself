"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverEffect from "./Hoverit";   // your earlier component
import ResumeDownloadButton from "./ResumeDownloadButton";

export default function LandingSection() {
  const lines = [
    "I'm a full-stack developer",
    "Still thinking what to add in my skill arsenal",
    "Writing code that’s 90% elegance, 10% duct tape, and 100% ‘don’t touch that part'"
  ];

  /* highlight chosen words with HoverEffect */
  function highlightWords(text) {
    return text.split(/(\s+)/).map((word, idx) => {
      const w = word.toLowerCase();
      if (w === "full-stack" || w === "developer")
        return <HoverEffect key={idx} color1="#93c5fd" color2="#f87171" src="/developer.gif">{word}</HoverEffect>;
      if (w === "arsenal")
        return <HoverEffect key={idx} color1="#86efac" color2="#eab308" src="/arsenal.gif">{word}</HoverEffect>;
      if (w.includes("don’t") || w.includes("don't"))
        return <HoverEffect key={idx} color1="#facc15" color2="#fb923c" src="/dont.gif">{word}</HoverEffect>;
      return word;
    });
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* left */}
        <div className="flex-1 md:ml-8 space-y-6 text-center md:text-left z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-slate-50 drop-shadow-[0_0_8px_#fff]">Lakshya</span>{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>

          <div className="text-lg sm:text-xl text-zinc-50 space-y-1">
            {lines.map((line, i) => (
              <p key={i}>{highlightWords(line)}</p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <Link href="/#contact">
              <span className="gradient-wrapper fire">
                <button className="gradient-btn">Contact Me</button>
              </span>
            </Link>
            <Link href="/#projects">
              <span className="gradient-wrapper sky">
                <button className="gradient-btn">Explore Projects</button>
              </span>
            </Link>
            <span className="gradient-wrapper">
              <ResumeDownloadButton />
            </span>
          </div>
        </div>

        {/* right */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <Image
            src="/mine2.jpeg"
            width={400}
            height={400}
            alt="Lakshya"
            className="h-[50vh] md:h-[75vh] w-auto object-contain rounded-3xl drop-shadow-[0_0_8px_#fff]"
          />
        </div>
      </div>
    </section>
  );
}
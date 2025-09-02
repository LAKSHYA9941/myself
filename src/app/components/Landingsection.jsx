"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import Image from "next/image";
import Link from "next/link";
import HoverEffect from "./Hoverit";   // your earlier component

gsap.registerPlugin(TextPlugin);

export default function LandingSection() {
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const [animatedText, setAnimatedText] = useState("");

  const lines = [
    "I'm a full-stack developer",
    "Still thinking what to add in my skill arsenal",
    "Writing code that’s 90% elegance, 10% duct tape, and 100% ‘don’t touch that part'"
  ];

  /* typewriter effect */
  useEffect(() => {
    const joined = lines.join("\n");
    gsap.to({}, {
      duration: joined.length * 0.05,
      onUpdate() {
        const chars = Math.floor(joined.length * this.progress());
        setAnimatedText(joined.slice(0, chars));
      }
    });
  }, []);

  /* image animation */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.5, rotate: -15, y: 100, filter: "blur(10px)" },
      { opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)", duration: 1.8, ease: "back.out(1.7)" }
    ).to(imgRef.current, { y: "+=8", repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" }, ">-0.5");
  }, []);

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

          <p className="text-lg sm:text-xl text-zinc-50 min-h-[4rem]" style={{ whiteSpace: "pre-line" }}>
            {animatedText.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {highlightWords(line)}
                <br />
              </React.Fragment>
            ))}
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <Link href="/contacts">
              <span className="gradient-wrapper fire">
                <button className="gradient-btn">Contact Me</button>
              </span>
            </Link>
            <Link href="/projects">
              <span className="gradient-wrapper sky">
                <button className="gradient-btn">Explore Projects</button>
              </span>
            </Link>
          </div>
        </div>

        {/* right */}
        <div ref={imgRef} className="flex-shrink-0 w-full md:w-auto flex justify-center">
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
"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import Image from 'next/image';
import Link from "next/link";
gsap.registerPlugin(TextPlugin);

const LandingSection = () => {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  /* ---------- TEXT TYPEWRITER ---------- */
  useEffect(() => {
    const lines = [
      "I'm a full-stack developer",
      "I'm passionate about creating innovative solutions",
      "The code I write is not just functional, but also elegant and efficient."
    ];

    gsap.to(textRef.current, {
      duration: lines.join(" ").length * 0.05,
      text: { value: lines.join("\n"), delimiter: "" },
      ease: "none"
    });
  }, []);

  /* ---------- IMAGE GSAP MAGIC ---------- */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.5, rotate: -15, y: 100, filter: "blur(10px)" },
      { opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)", duration: 1.8, ease: "back.out(1.7)" }
    )
      .to(imgRef.current, { y: "+=8", repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" }, ">-0.5");
  }, []);

  return (
    <>
      <section className="min-h-full flex items-center justify-center px-6 py-6">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12">
          {/* LEFT SIDE */}
          <div className="flex-1 md:ml-8 space-y-6 text-center md:text-left z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-slate-50 drop-shadow-[0_0_8px_#fff]">
                Lakshya
              </span>{" "}
              <span className="inline-block animate-wave">👋</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-zinc-50 min-h-[4rem]"
              ref={textRef}
              style={{ whiteSpace: "pre-line" }}
            />

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Link href="/contacts">
                <StyledWrapper>
                  <div className="container">
                    <button className="button">Contact Me</button>
                  </div>
                </StyledWrapper>
              </Link>
              <Link href="/projects">
                <StyledWrapper2>
                  <div className="container">
                    <button className="button">Explore Projects</button>
                  </div>
                </StyledWrapper2>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE – GSAP ENHANCED */}
          <div ref={imgRef} className="flex-shrink-0 w-full md:w-auto flex justify-center">
            <Image
              src="/herowithbg.png"
              width={400}
              height={400}
              alt="Lakshya Developer Illustration"
              className="h-[50vh] md:h-[75vh] w-auto object-contain rounded-3xl drop-shadow-[0_0_8px_#fff]"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingSection;

/* ---------------------------------- */
/* BUTTON STYLES – UNCHANGED */
const StyledWrapper = styled.div`
  button {
    font-size: 1.4em;
    padding: 0.6em 0.8em;
    border-radius: 0.5em;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    box-shadow: 2px 2px 3px #000000b4;
    position: relative;
    z-index: 2;
  }
  .container {
    position: relative;
    padding: 3px;
    background: linear-gradient(90deg, #900C3F,#C70039,#F94C10,#799EFF);
    border-radius: 0.9em;
    transition: all 0.4s ease;
  }
  .container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #900C3F,#C70039,#F94C10,#799EFF);
    border-radius: 0.9em;
    z-index: -1;
    filter: blur(0);
    transition: filter 0.4s ease;
    opacity: 0;
  }
  .container:hover::before {
    filter: blur(1.2em);
    opacity: 0.8;
  }
  .container:active::before {
    filter: blur(0.2em);
    opacity: 1;
  }
`;

const StyledWrapper2 = styled.div`
  button {
    font-size: 1.4em;
    padding: 0.6em 0.8em;
    border-radius: 0.5em;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    box-shadow: 2px 2px 3px #000000b4;
    position: relative;
    z-index: 2;
  }
  .container {
    position: relative;
    padding: 3px;
    background: linear-gradient(90deg, #AED2FF,#344CB7,#577BC1,#FFEB00);
    border-radius: 0.9em;
    transition: all 0.4s ease;
  }
  .container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #AED2FF,#344CB7,#577BC1,#FFEB00);
    border-radius: 0.9em;
    z-index: -1;
    filter: blur(0);
    transition: filter 0.4s ease;
    opacity: 0;
  }
  .container:hover::before {
    filter: blur(1.2em);
    opacity: 0.8;
  }
  .container:active::before {
    filter: blur(0.2em);
    opacity: 1;
  }
`;
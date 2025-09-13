"use client";
import './globals.css';
import GradientBackground from "./components/GradientBackground";
import { useRevealer } from "./Hooks/useRevealer";

// Sections (existing components composed into one page)
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Techstack from "./pages/Techstack";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";

export default function Page() {
  useRevealer();
  return (
    <>
      {/* one-time page reveal overlay */}
      <div className="revealer" />
      {/* global, interactive gradient background */}
      <GradientBackground />

      <main className="relative">
        <section id="home" data-theme="home" className="min-h-screen">
          <LandingPage />
        </section>

        <section id="about" data-theme="about" className="min-h-screen flex items-center">
          <About />
        </section>

        <section id="techstack" data-theme="tech" className="min-h-screen flex items-center">
          <Techstack />
        </section>

        <section id="projects" data-theme="projects" className="min-h-screen">
          <Projects />
        </section>

        <section id="contact" data-theme="contact" className="min-h-screen flex items-center">
          <Contacts />
        </section>
      </main>
    </>
  );
}

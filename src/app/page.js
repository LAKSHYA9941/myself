"use client";
import './globals.css';
import GradientBackground from "./components/GradientBackground";

// Sections (existing components composed into one page)
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Techstack from "./pages/Techstack";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Skills from "./pages/Skills";

export default function Page() {
  return (
    <>
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

        <section id="skills" className="min-h-screen flex items-center">
          <Skills />
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

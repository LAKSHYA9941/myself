"use client";
import './globals.css';
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Techstack from "./pages/Techstack";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Skills from "./pages/Skills";
import Navbar from './components/Navbar';
import Aurora from './components/Aurora';

export default function Page() {
  return (
    <>
      <main className="relative bg-black">
        <Aurora
          colorStops={["#08CB00", "#00CAFF", "#FF2DD1"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <Navbar />

        <section id="home" data-theme="home" className="min-h-screen">
          <LandingPage />
        </section>

        <section id="about" data-theme="about" className="min-h-screen flex items-center">
          <About />
        </section>

        <section id="techstack" data-theme="tech" className="min-h-screen flex items-center">
          <Techstack />
        </section>

        <section id="skills" data-theme="skills" className="min-h-screen flex items-center">
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

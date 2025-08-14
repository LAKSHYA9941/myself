"use client";
import LandingSection from "../components/Landingsection";
import Navbar from "../components/Navbar";
import Stars from "../components/Stars";
import { useRevealer } from "../Hooks/useRevealer";

export default function LandingPage() {
  useRevealer();

  return (
    <>
      <div className="revealer"/>
      <Stars />
      {/* <Navbar /> */}
      <LandingSection />
    </>
  );
}



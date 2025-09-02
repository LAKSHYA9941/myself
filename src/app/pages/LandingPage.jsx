"use client";
import LandingSection from "../components/Landingsection";
import Stars from "../components/Stars";
import { useRevealer } from "../Hooks/useRevealer";

export default function LandingPage() {
  useRevealer();

  return (
    <>
      <div className="revealer"/>
      <Stars />
      <LandingSection />
    </>
  );
}



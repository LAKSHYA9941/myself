"use client";
import React from "react";

/*
  ResumeDownloadButton
  - Ask user for permission before downloading
  - Attempts to download /resume.pdf from public/ when available
  - Safe default: if the file is missing, shows an alert instead of breaking UI
*/
export default function ResumeDownloadButton({ filePath = "/nodejs.svg" }) {
  const handleDownload = async () => {
    const ok = typeof window !== "undefined" && window.confirm("Download resume to your device?");
    if (!ok) return;

    try {
      // Try HEAD first to avoid triggering a broken download
      const res = await fetch(filePath, { method: "HEAD" });
      if (!res.ok) throw new Error("Missing file");

      const a = document.createElement("a");
      a.href = filePath;
      a.download = filePath.split("/").pop() || "nodejs.svg";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Resume file not found yet. Please try again later.");
    }
  };

  return (
    <button onClick={handleDownload} className="gradient-btn">
      Download Resume
    </button>
  );
}

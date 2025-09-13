"use client";
import Navbar from "./components/Navbar";
import './globals.css'
import SmoothScrollProvider from "./components/SmoothScrollProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
        
      </body>
    </html>
  );
}


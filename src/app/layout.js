"use client";
import './globals.css'
import SmoothScrollProvider from "./components/SmoothScrollProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <SmoothScrollProvider>



          {children}


        </SmoothScrollProvider>
      </body>
    </html>
  );
}


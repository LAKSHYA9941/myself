"use client";
// About.jsx (cleaned & working)
import React from 'react';
import Certis from '../components/Certis';
import Education from '../components/Education';
import Image from 'next/image';
import { TracingBeam } from '../ui/tracing-beam';

export default function About() {

    /* sentences for easy stagger */
    const sentences = [
        'I am a Full Stack Developer with a passion for building dynamic and responsive web applications.',
        'My expertise lies in JavaScript, React.js, Node.js, and MongoDB, and I am proficient in using React Native for cross-platform mobile app development. I am also familiar with popular libraries and frameworks such as Redux, React Router, and Axios.',
        'I have experience in building web applications using various technologies, including HTML, CSS, and JavaScript. I am skilled in creating responsive and user-friendly interfaces that meet the needs of my clients.',
        'I am a self-motivated and hardworking individual who thrives in a dynamic and fast-paced environment. I am always looking for new opportunities to expand my skills and knowledge in web development.',
        'I enjoy working on challenging projects that require innovative problem-solving and collaboration. My goal is to continuously learn and grow in the field of web development.',
    ];

    return (
        <TracingBeam className="px-4">
            <div className="relative min-h-screen overflow-hidden text-white">
                <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto px-6 py-12 text-center pl-6 md:pl-10">
                {/* text */}
                <div className="space-y-6 leading-relaxed">
                    <h1 className="text-3xl font-bold border-b border-white/20 pb-2">About Me</h1>
                    {sentences.map((s, i) => (
                        <p key={i}>{s}</p>
                    ))}
                </div>

                {/* SVG */}
                <div className="w-full max-w-md">
                    <Image src="/about.svg" alt="about" width={400} height={400} className="w-full h-auto drop-shadow-xl mx-auto" />
                </div>

                {/* children */}
                <section><Certis /></section>
                <section><Education /></section>
                </div>
            </div>
        </TracingBeam>
    );
}
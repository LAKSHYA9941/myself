"use client";
// About.jsx (cleaned & working)
import React from 'react';
import Certis from '../components/Certis';
import Education from '../components/Education';
import Image from 'next/image';

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
        <div className="relative min-h-screen overflow-hidden text-white">
            <div className="flex flex-col lg:flex-row items-start gap-10 max-w-7xl mx-auto px-6 py-12">
                {/* animated text */}
                <div className="flex-1 space-y-6 text-left text-base leading-relaxed">
                    <h1 className="text-3xl font-bold border-b border-white/20 pb-2">About Me</h1>
                    {sentences.map((s, i) => (
                        <p key={i}>{s}</p>
                    ))}
                </div>

                {/* animated SVG */}
                <div className="flex-shrink-0 w-full lg:w-1/3">
                    <Image src="/about.svg" alt="about" width={400} height={400} className="w-full h-auto drop-shadow-xl" />
                </div>
            </div>

            {/* scroll-triggered children */}
            <section><Certis /></section>
            <section><Education /></section>
        </div>
    );
}
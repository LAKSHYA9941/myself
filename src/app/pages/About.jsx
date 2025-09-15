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
        <div className="min-h-screen text-white flex flex-col justify-center z-10">
            {/* heading stays centred */}
            <h1 className="text-3xl font-bold border-b border-white/20 pb-2 text-center">
                About Me
            </h1>

            {/* content row: left text | right svg */}
            <div className="w-full grow grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 px-6 py-12">
                {/* LEFT: text block – hard-left, max-width for readability */}
                <div className=" text-center max-w-full space-y-6">
                    {sentences.map((s, i) => (
                        <p key={i} className="leading-relaxed">
                            {s}
                        </p>
                    ))}
                </div>

                {/* RIGHT: SVG – hard-right, never overflow */}
                <div className="justify-self-end">
                    <Image
                        src="/about.svg"
                        alt="about"
                        width={400}
                        height={400}
                        className="w-full h-auto max-w-md drop-shadow-xl"
                    />
                </div>
                {/* children stay stacked below */}
                <section className="mt-12">
                    <Certis />
                </section>
                <section className="mt-8">
                    <Education />
                </section>
            </div >
        </div >


    );
}
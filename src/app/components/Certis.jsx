'use client';

import React from 'react';
import Image from 'next/image';

const certs = [
    { title: 'Crash Course on Python', img: '/pythoncert.png', link: 'https://www.coursera.org/account/accomplishments/verify/DHGSPUGQXRAA' },
    { title: 'Netflix Clone – Devtown', img: '/devtown.png', link: 'https://www.cert.devtown.in/verify/Z2vLEuG' },
    { title: 'HackerRank React (Basic)', img: '/reactcert.png', link: 'https://www.hackerrank.com/certificates/9dcb7bbc43df' },
];

export default function Certis() {
    const [active, setActive] = React.useState(certs[0]);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl mx-auto p-8 h-96">
            {/* LEFT – certificate */}
            <div className="flex-1 flex justify-center items-center">
                <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[400px] h-[240px] overflow-hidden rounded-xl shadow-2xl"
                >
                    <Image
                        src={active.img}
                        alt={active.title}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover transition-transform duration-200 hover:scale-[1.01]"
                    />
                    <h3 className="text-xl font-semibold mt-2 text-center">{active.title}</h3>
                </a>
            </div>

            {/* RIGHT – list */}
            <ul className="flex-1 space-y-4 overflow-y-auto">
                {certs.map((c) => (
                    <li
                        key={c.title}
                        onMouseEnter={() => setActive(c)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${active.title === c.title ? 'bg-slate-700/80' : 'bg-slate-800/60 hover:bg-slate-700/70'}`}
                        onClick={() => setActive(c)}
                    >
                        <span className="font-medium">{c.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
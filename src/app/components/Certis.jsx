// // Certis.jsx
// import React, { useState } from 'react';
// import Image from 'next/image';

// const certs = [
//     {
//         title: 'Crash Course on Python',
//         img: '/pythoncert.png',
//         link: 'https://www.coursera.org/account/accomplishments/verify/DHGSPUGQXRAA',
//     },
//     {
//         title: 'Netflix Clone – Devtown',
//         img: '/devtown.png',
//         link: 'https://www.cert.devtown.in/verify/Z2vLEuG',
//     },
//     {
//         title: 'HackerRank React (Basic)',
//         img: '/reactcert.png',
//         link: 'https://www.hackerrank.com/certificates/9dcb7bbc43df',
//     },
// ];
// // Certis.jsx
// export default function Certis() {
//     const [active, setActive] = useState(certs[0]);

//     return (
//         <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl mx-auto p-8 h-96"> {/* ✅ fixed height */}
//             {/* LEFT – fixed 400×240 box */}
//             <div className="flex-1 flex justify-center items-center">
//                 <a
//                     href={active.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block w-[400px] h-[240px] transition-transform duration-300 ease-out"
//                 >
//                     <Image
//                         src={active.img}
//                         alt={active.title}
//                         width={400}
//                         height={240}
//                         className="w-full h-full object-cover rounded-xl shadow-2xl"
//                     />
//                     <h3 className="text-xl font-semibold mt-2 text-center">{active.title}</h3>
//                 </a>
//             </div>

//             {/* RIGHT – list inside same height */}
//             <ul className="flex-1 space-y-4 overflow-y-auto">
//                 {certs.map((c) => (
//                     <li
//                         key={c.title}
//                         onMouseEnter={() => setActive(c)}
//                         className="p-4 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 cursor-pointer transition-all duration-300"
//                     >
//                         <span className="font-medium">{c.title}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }





'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const certs = [
    { title: 'Crash Course on Python', img: '/pythoncert.png', link: 'https://www.coursera.org/account/accomplishments/verify/DHGSPUGQXRAA' },
    { title: 'Netflix Clone – Devtown', img: '/devtown.png', link: 'https://www.cert.devtown.in/verify/Z2vLEuG' },
    { title: 'HackerRank React (Basic)', img: '/reactcert.png', link: 'https://www.hackerrank.com/certificates/9dcb7bbc43df' },
];

export default function Certis() {
    const imgRef = useRef(null);
    const listRefs = useRef([]);
    listRefs.current = [];

    const addToRefs = (el) => el && listRefs.current.push(el);
    const [active, setActive] = React.useState(certs[0]);

    /* ---------- GSAP timeline ---------- */
    const animateTo = (index) => {
        gsap.timeline()
            .to(imgRef.current, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out',
            })
            .to(imgRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => setActive(certs[index]),
            })
            .to(imgRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });

        // highlight list
        listRefs.current.forEach((li, i) =>
            gsap.to(li, {
                backgroundColor: i === index ? '#334155' : '#1e293b',
                duration: 0.3,
            })
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl mx-auto p-8 h-96">
            {/* LEFT – animated certificate */}
            <div className="flex-1 flex justify-center items-center">
                <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[400px] h-[240px] overflow-hidden rounded-xl shadow-2xl"
                >
                    <Image
                        ref={imgRef}
                        src={active.img}
                        alt={active.title}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover"
                    />
                    <h3 className="text-xl font-semibold mt-2 text-center">{active.title}</h3>
                </a>
            </div>

            {/* RIGHT – GSAP-driven list */}
            <ul className="flex-1 space-y-4 overflow-y-auto">
                {certs.map((c, idx) => (
                    <li
                        key={c.title}
                        ref={addToRefs}
                        onMouseEnter={() => animateTo(idx)}
                        className="p-4 rounded-lg cursor-pointer"
                        style={{ backgroundColor: idx === 0 ? '#334155' : '#1e293b' }}
                    >
                        <span className="font-medium">{c.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function Certis() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}

            className="w-full max-w-2xl mx-auto p-8 "
        >
            <section>
                <h2 className="text-2xl font-bold mb-4 text-center">Certifications</h2>
                <div className="overflow-x-auto scrollbar-hide whitespace-nowrap">
                    <div className="inline-block mr-8">
                        <a href="https://www.coursera.org/account/accomplishments/verify/DHGSPUGQXRAA" target="_blank" rel="noopener noreferrer">
                            <Image src="/pythoncert.png" width={320} height={192} alt="Google Python Certification" className="w-80 h-48 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
                        </a>
                        <h3 className="text-xl font-semibold mt-2 text-center">Crash Course on Python</h3>
                    </div>
                    <div className="inline-block mr-8">
                        <a href="https://www.cert.devtown.in/verify/Z2vLEuG" target="_blank" rel="noopener noreferrer">
                            <Image src="/devtown.png" width={320} height={192} alt="DevTown Netflix Clone Certification" className="w-80 h-48 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
                        </a>
                        <h3 className="text-xl font-semibold mt-2 text-center">Netflix Clone – Devtown</h3>
                    </div>
                    <div className="inline-block mr-8">
                        <a href="https://www.hackerrank.com/certificates/9dcb7bbc43df" target="_blank" rel="noopener noreferrer">
                            <Image src="/reactcert.png" width={320} height={192} alt="HackerRank React Basic Certification" className="w-80 h-48 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
                        </a>
                        <h3 className="text-xl font-semibold mt-2 text-center">HackerRank React (Basic)</h3>
                    </div>
                </div>
            </section>

        </motion.div>
    );
}

export default Certis;
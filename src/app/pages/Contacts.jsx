"use client";
// Contacts.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Button from '../components/Socials';
import { TracingBeam } from '../ui/tracing-beam';

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending…');
    emailjs
      .send('service_xyzslbc', 'template_uduuos4', form, '1MALs8pHBNOO1FLv4')
      .then(() => {
        setStatus('Sent! I’ll reply soon 👍');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => setStatus('Could not send. Try again?'));
  };
  return (
    <TracingBeam className="px-4">
      <section className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="pl-6 md:pl-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-[#0d1117]/60 backdrop-blur-lg border border-[#27374D]/40 rounded-2xl p-8 shadow-[0_0_25px_-5px_#B13BFF40]"
        >
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B13BFF] to-[#ff0088]">
            Contact me
          </h2>

          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#1c1f26] text-gray-100 placeholder-gray-400 border border-[#27374D]/60 focus:border-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/70 transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1c1f26] text-gray-100 placeholder-gray-400 border border-[#27374D]/60 focus:border-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/70 transition"
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Message"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1c1f26] text-gray-100 placeholder-gray-400 border border-[#27374D]/60 focus:border-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/70 transition resize-none"
          />

          <button
            type="submit"
            disabled={status === 'Sending…'}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#B13BFF] to-[#ff0088] text-white font-semibold hover:shadow-[0_0_15px_#ff0088] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'Sending…' ? 'Sending…' : 'Send Message'}
          </button>

          {status && <p className="text-center text-sm text-gray-300 pt-2">{status}</p>}
          <Button />
        </form>
        </div>
      </section>
    </TracingBeam>
  );
};

export default Contacts;
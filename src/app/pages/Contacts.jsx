"use client";
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [focusedField, setFocusedField] = useState(null);

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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT: image side (hidden on mobile) */}
      <div className="hidden md:flex md:flex-1 items-center justify-center p-8">
        <div className="w-full max-h-[500px] rounded-2xl overflow-hidden">
          <img
            src="contactsvg.png"
            alt="Contact illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT: form side */}
      <div className="flex-1  flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md border border-neutral-700 rounded-2xl p-8 md:p-10 shadow-[0_0_25px_-5px_#B13BFF40]">
          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white">
              Contact me
            </h1>
            <p className="text-neutral-400 text-base mt-2">Send me a message and I’ll reply ASAP.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-orange-500' : 'text-neutral-500'}`} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Jane Doe"
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 rounded-xl text-white placeholder-neutral-500 outline-none border-2 transition-colors ${focusedField === 'name' ? 'border-orange-500' : 'border-neutral-600 hover:border-neutral-500'}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-orange-500' : 'text-neutral-500'}`} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 rounded-xl text-white placeholder-neutral-500 outline-none border-2 transition-colors ${focusedField === 'email' ? 'border-orange-500' : 'border-neutral-600 hover:border-neutral-500'}`}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
              <div className="relative">
                <MessageSquare className={`absolute left-3 top-4 w-5 h-5 transition-colors ${focusedField === 'message' ? 'text-orange-500' : 'text-neutral-500'}`} />
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 rounded-xl text-white placeholder-neutral-500 outline-none border-2 resize-none transition-colors ${focusedField === 'message' ? 'border-orange-500' : 'border-neutral-600 hover:border-neutral-500'}`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'Sending…'}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B13BFF] to-[#ff0088] text-white font-semibold hover:shadow-[0_0_15px_#ff0088] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {status === 'Sending…' ? 'Sending…' : 'Send Message'}
            </button>

            {status && <p className="text-center text-sm text-neutral-300 pt-2">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
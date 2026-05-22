import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactSettings } from '../lib/contactSettings';

export default function CTA({ title = 'Ready To Grow Your Hospitality Brand?', text = 'Talk to Digital Boost for marketing, AI review management, GMB setup, Meta ads and website development.' }) {
  const contact = useContactSettings();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-boost-yellow/30 bg-boost-yellow p-6 text-black shadow-glow sm:p-10">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-black/75">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-5 py-4 text-sm font-black text-white">
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-4 text-sm font-black text-black">
              <MessageCircle size={18} />
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useMemo, useState } from 'react';
import { ArrowRight, Globe2, MessageCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { PageHero } from '../components/Sections';
import { brand } from '../data';
import { apiRequest } from '../lib/api';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const serviceOptions = useMemo(() => ['Hospitality Digital Marketing', 'AI Review System', 'Website Development', 'Landing Page Development', 'Meta Ads', 'GMB Setup', 'Influencer Marketing'], []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'),
      businessName: form.get('businessName'),
      mobileNumber: form.get('mobileNumber'),
      email: form.get('email'),
      serviceInterested: form.get('serviceInterested'),
      message: form.get('message'),
    };
    try {
      await apiRequest('/inquiries', { method: 'POST', body: JSON.stringify(payload) });
    } catch {
      // Keep the public form friendly if the CMS API is offline.
    }
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <SEO
        title="Contact Digital Boost | Hospitality Marketing And Website Development"
        description="Contact Digital Boost for hotel marketing, restaurant digital marketing, Google My Business setup, Meta ads, AI review management and website development in Lucknow."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Start Your Digital Boost Growth Plan"
        text="Send your business details and our team will connect with you for hospitality digital marketing, AI review management, GMB setup, Meta ads or website development."
      />
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Digital Boost</h2>
            <p className="mt-2 text-sm font-bold text-boost-yellow">A Digital Unit of Yash Infosystems</p>
            <div className="mt-8 space-y-4">
              <a href={brand.phoneHref} className="flex items-center gap-3 text-sm font-bold text-white">
                <Phone className="text-boost-yellow" size={19} />
                {brand.phone}
              </a>
              <a href={`https://${brand.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-bold text-white">
                <Globe2 className="text-boost-yellow" size={19} />
                {brand.website}
              </a>
              <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black transition hover:bg-white">
                <MessageCircle size={18} />
                WhatsApp Direct
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" className="rounded-md border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-boost-yellow" placeholder="Name" required />
              <input name="businessName" className="rounded-md border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-boost-yellow" placeholder="Business Name" required />
              <input name="mobileNumber" className="rounded-md border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-boost-yellow" placeholder="Mobile Number" required />
              <input name="email" className="rounded-md border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-boost-yellow" placeholder="Email" />
              <select name="serviceInterested" className="rounded-md border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition focus:border-boost-yellow" defaultValue="" required>
                <option value="" disabled>
                  Service Interested In
                </option>
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <textarea name="message" className="min-h-32 rounded-md border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-boost-yellow sm:col-span-2" placeholder="Message" />
            </div>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-boost-yellow px-5 py-4 text-sm font-black text-black transition hover:bg-white sm:w-auto">
              Submit Inquiry
              <ArrowRight size={18} />
            </button>
            {submitted && <p className="mt-4 rounded-md border border-boost-yellow/35 bg-boost-yellow/10 px-4 py-3 text-sm font-bold text-white">Thank you! Digital Boost team will contact you soon.</p>}
          </form>
        </div>
      </section>
      <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-boost-yellow">Location</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Find Digital Boost On Google Maps</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Visit or locate Digital Boost, a digital unit of Yash Infosystems, using the embedded Google Map below.
            </p>
          </div>
          <div className="glass overflow-hidden rounded-2xl p-2">
            <iframe
              title="Digital Boost Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.2517055678886!2d80.9151396!3d26.8319454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc81b59bfcf%3A0xf0bd1fc52e663df0!2sDigital%20Boost!5e0!3m2!1sen!2sin!4v1779213792582!5m2!1sen!2sin"
              className="h-[360px] w-full rounded-xl border-0 sm:h-[450px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides, stats } from '../data';
import { useContactSettings } from '../lib/contactSettings';

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const contact = useContactSettings();
  const slide = heroSlides[active];
  const Icon = slide.icon;

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden pt-28">
      <div className="shape shape-one" />
      <div className="shape shape-two" />
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-boost-yellow/30 bg-boost-yellow/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-boost-yellow">
                <Icon size={16} />
                {slide.eyebrow}
              </div>
              <h1 className="text-balance text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{slide.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{slide.text}</p>
            </motion.div>
          </AnimatePresence>
          <p className="mt-5 max-w-2xl text-sm font-bold uppercase tracking-[0.12em] text-boost-yellow">
            Powered by AWS, Google, Meta Advertising, AI Automation and latest digital technology.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-boost-yellow px-6 py-4 text-sm font-black text-black shadow-glow transition hover:bg-white">
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-boost-yellow/40 px-6 py-4 text-sm font-black text-white transition hover:bg-boost-yellow hover:text-black">
              <MessageCircle size={18} />
              WhatsApp Now
            </a>
          </div>
          <div className="mt-6 flex gap-2" aria-label="Hero slider controls">
            {heroSlides.map((item, index) => (
              <button key={item.eyebrow} onClick={() => setActive(index)} className={`h-2.5 rounded-full transition-all ${active === index ? 'w-11 bg-boost-yellow' : 'w-2.5 bg-white/30 hover:bg-white/60'}`} aria-label={`Show ${item.eyebrow}`} />
            ))}
          </div>
        </div>

        <motion.div className="agency-panel glass relative overflow-hidden rounded-[1.7rem] p-5 sm:p-7" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <img src="/assets/digital-boost-logo.png" alt="Digital Boost" className="mb-10 h-16 w-auto max-w-[280px] object-contain sm:h-20" />
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur">
                <div className="text-2xl font-black text-boost-yellow">{value}</div>
                <p className="mt-2 text-sm font-bold text-white">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-boost-yellow/30 bg-black/55 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-boost-yellow">Digital Growth Stack</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-boost-yellow" initial={{ width: 0 }} animate={{ width: '88%' }} transition={{ duration: 1.2, delay: 0.4 }} />
            </div>
            <p className="mt-3 text-sm font-bold text-zinc-200">AWS + Google + Meta + AI Automation</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

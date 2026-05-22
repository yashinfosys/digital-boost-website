import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Quote, Star } from 'lucide-react';
import { useState } from 'react';
import { faqs, portfolio, processSteps, reasons, services, testimonials } from '../data';
import { usePublicData } from '../lib/usePublicData';

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export function PageHero({ eyebrow, title, text, children }) {
  const slug = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
  const { data: page } = usePublicData(`/pages/public/${slug}`, null);
  const displayTitle = page?.h1 || title;
  const displayText = page?.content && !page.content.includes('CMS content managed') ? page.content : text;

  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="shape shape-one" />
      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-4xl" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }}>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-boost-yellow">{eyebrow}</p>
          <h1 className="text-balance text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{displayTitle}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">{displayText}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, children }) {
  return (
    <motion.div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.55 }}>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-boost-yellow">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {children && <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">{children}</p>}
    </motion.div>
  );
}

export function ServiceGrid({ items = services }) {
  const { data } = usePublicData('/services/public', items);
  const displayItems = data.map((item) => (Array.isArray(item) ? item : [item.title, SparklesFallback, item.shortDescription || item.fullDescription]));
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {displayItems.map(([title, Icon, text], index) => (
        <motion.article key={title} className="glass group rounded-lg p-5 transition hover:-translate-y-2 hover:border-boost-yellow/50 hover:shadow-glow" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.035 }}>
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-boost-yellow/15 text-boost-yellow transition group-hover:bg-boost-yellow group-hover:text-black">
            <Icon size={24} />
          </div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
        </motion.article>
      ))}
    </div>
  );
}

function SparklesFallback(props) {
  return <Star {...props} />;
}

export function WhyChoose() {
  return (
    <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why Choose Us" title="Technology, Creativity And Hospitality Marketing Focus" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(([title, Icon], index) => (
            <motion.div key={title} className="glass rounded-lg p-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.04 }}>
              <Icon className="mb-5 text-boost-yellow" size={30} />
              <h3 className="text-xl font-black text-white">{title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Process" title="A Clear Growth Process For Hospitality Brands" />
        <div className="grid gap-5 md:grid-cols-4">
          {processSteps.map(([title, text], index) => (
            <div key={title} className="glass rounded-lg p-5">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-md bg-boost-yellow text-black">{index + 1}</div>
              <h3 className="text-lg font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioGrid({ limit }) {
  const { data } = usePublicData('/portfolio/public', portfolio);
  const source = data.map((item) => (Array.isArray(item) ? item : [item.title, item.description]));
  const items = limit ? source.slice(0, limit) : source;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([title, text]) => (
        <article key={title} className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-card">
          <div className="relative h-36 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.5),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,0,0,0.2))]" />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-black text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { data } = usePublicData('/testimonials/public', testimonials);
  const items = data.map((item) => (Array.isArray(item) ? item : [item.reviewText, item.clientName]));
  return (
    <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Testimonials" title="Trusted By Local Business Owners" />
        <div className="grid gap-5 lg:grid-cols-3">
          {items.map(([text, name]) => (
            <article key={name} className="glass rounded-lg p-6">
              <Quote className="mb-5 text-boost-yellow" />
              <p className="text-sm leading-7 text-zinc-200">{text}</p>
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-boost-yellow">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </div>
              <h3 className="mt-3 font-black text-white">{name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ items = faqs }) {
  const [active, setActive] = useState(0);
  const { data } = usePublicData('/faqs/public', items);
  const displayItems = data.map((item) => (Array.isArray(item) ? item : [item.question, item.answer]));
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="Common Questions" />
        <div className="space-y-3">
          {displayItems.map(([question, answer], index) => (
            <div key={question} className="glass overflow-hidden rounded-lg">
              <button onClick={() => setActive(active === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-black text-white">
                {question}
                <ChevronDown className={`shrink-0 text-boost-yellow transition ${active === index ? 'rotate-180' : ''}`} />
              </button>
              {active === index && <p className="px-5 pb-5 text-sm leading-7 text-zinc-300">{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureList({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="glass rounded-lg p-5">
          <Check className="mb-4 text-boost-yellow" />
          <h3 className="font-black text-white">{item}</h3>
        </div>
      ))}
    </div>
  );
}

export function LearnMore({ to, children = 'Explore More' }) {
  return (
    <Link to={to} className="mt-7 inline-flex items-center gap-2 rounded-md border border-boost-yellow/40 px-5 py-3 text-sm font-black text-boost-yellow transition hover:bg-boost-yellow hover:text-black">
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

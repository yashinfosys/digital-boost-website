import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Quote, Star, X } from 'lucide-react';
import { useState } from 'react';
import { faqs, portfolio, processSteps, reasons, serviceDetails, services, technologyStack, testimonials } from '../data';
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
  const [selected, setSelected] = useState(null);
  const { data } = usePublicData('/services/public', items);
  const displayItems = data.map((item) => (Array.isArray(item) ? item : [item.title, SparklesFallback, item.shortDescription || item.fullDescription]));
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayItems.map(([title, Icon, text], index) => {
          const details = serviceDetails[title] || serviceDetails[title?.replace('Meta/Facebook/Instagram Ads', 'Meta Ads')];
          return (
            <motion.article key={title} className="glass group relative cursor-pointer rounded-lg p-5 transition hover:-translate-y-2 hover:border-boost-yellow/50 hover:shadow-glow" onClick={() => setSelected({ title, Icon, text, details })} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.035 }} tabIndex={0} role="button" onKeyDown={(event) => event.key === 'Enter' && setSelected({ title, Icon, text, details })}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-boost-yellow/15 text-boost-yellow transition group-hover:bg-boost-yellow group-hover:text-black">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
              <div className="pointer-events-none absolute left-5 right-5 top-4 z-20 translate-y-2 rounded-md border border-boost-yellow/30 bg-black/90 p-3 text-xs leading-5 text-zinc-200 opacity-0 shadow-glow backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
                {details?.intro || 'Click to view benefits, features, process and CTA details.'}
              </div>
            </motion.article>
          );
        })}
      </div>
      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function SparklesFallback(props) {
  return <Star {...props} />;
}

function ServiceModal({ service, onClose }) {
  const { title, Icon, text, details } = service;
  const content = details || {
    seoTitle: title,
    intro: text,
    benefits: ['Improved visibility', 'Better inquiry quality', 'Premium digital presence'],
    features: ['Strategy', 'Execution', 'Reporting'],
    process: ['Plan', 'Build', 'Optimize'],
    related: ['Hospitality Digital Marketing'],
  };

  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 px-4 py-6 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={title}>
      <motion.div className="glass max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-xl p-5 sm:p-7" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.22 }}>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-boost-yellow text-black">
              <Icon size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-boost-yellow">Service Detail</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">{content.seoTitle || title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{content.intro}</p>
            </div>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 text-white transition hover:bg-boost-yellow hover:text-black" aria-label="Close service details">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {[
            ['Benefits', content.benefits],
            ['Features', content.features],
            ['Process', content.process],
          ].map(([heading, list]) => (
            <div key={heading} className="rounded-lg border border-white/10 bg-black/35 p-4">
              <h3 className="text-lg font-black text-white">{heading}</h3>
              <div className="mt-4 grid gap-3">
                {list.map((item) => (
                  <p key={item} className="flex gap-2 text-sm leading-6 text-zinc-300">
                    <Check className="mt-1 shrink-0 text-boost-yellow" size={16} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-boost-yellow/30 bg-boost-yellow/10 p-5">
          <h3 className="text-xl font-black text-white">Why Choose Digital Boost?</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            Digital Boost combines hospitality industry context, AI-powered workflows, Google visibility, Meta performance campaigns, smart CMS systems and Yash Infosystems technology experience to create a practical digital growth ecosystem.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(content.related || []).map((item) => (
              <span key={item} className="rounded-md border border-white/10 px-3 py-2 text-xs font-bold text-boost-yellow">{item}</span>
            ))}
          </div>
          <Link to="/contact" onClick={onClose} className="mt-5 inline-flex items-center gap-2 rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black transition hover:bg-white">
            Get Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WhyChoose() {
  return (
    <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why Choose Us" title="AI, Cloud Technology And Hospitality Marketing Expertise">
          Digital Boost combines 14+ years of Yash Infosystems technology experience with hospitality SEO services, Google review management, Meta Ads and smart QR based marketing.
        </SectionTitle>
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

export function AboutPremium() {
  const highlights = [
    'AI Review Management',
    'Google Business Optimization',
    'Meta Ads & Lead Generation',
    'SEO & Website Development',
    'QR Based Smart Marketing',
    'Smart CMS Solutions',
    'Cloud Based Business Automation',
    'Smart Analytics & Performance Tracking',
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div className="glass rounded-lg p-6 sm:p-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-boost-yellow">About Digital Boost</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">A Premium Hospitality Digital Marketing And Technology Unit</h2>
          <p className="mt-5 text-sm leading-7 text-zinc-300 sm:text-base">
            Digital Boost is a Digital Unit of Yash Infosystems helping hotels, restaurants, cafes, resorts, rooftop bars, banquet halls and local businesses grow digitally using AI, cloud technology, automation, branding and performance marketing.
          </p>
          <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
            Backed by 14+ years of industry experience, we build modern digital systems that improve Google visibility, direct inquiries, guest trust, lead generation, review performance and long-term brand recall.
          </p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black transition hover:bg-white">
            Explore Our Approach
            <ArrowRight size={16} />
          </Link>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <motion.div key={item} className="glass group rounded-lg p-5 transition hover:-translate-y-1 hover:border-boost-yellow/50 hover:shadow-glow" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.035 }}>
              <Check className="mb-4 text-boost-yellow" />
              <h3 className="font-black text-white">{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologyStack() {
  const { data } = usePublicData('/settings/public', {});
  const cmsItems = data?.technologyStack?.itemsText
    ?.split('\n')
    .map((line) => line.split('|').map((part) => part.trim()))
    .filter((item) => item.length === 3 && item.every(Boolean));
  const items = cmsItems?.length ? cmsItems : technologyStack;

  return (
    <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Technology We Use" title="Modern Cloud, AI And Marketing Technology Stack">
          We combine proven engineering platforms with AI automation and performance marketing tools to build enterprise-level hospitality growth systems.
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map(([name, logo, text], index) => (
            <motion.article key={name} className="tech-card glass group rounded-lg p-5 transition hover:-translate-y-2 hover:border-boost-yellow/50 hover:shadow-glow" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={fadeUp} transition={{ delay: index * 0.025 }}>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md border border-white/10 bg-black/45 p-3 transition group-hover:border-boost-yellow/60">
                <img src={logo} alt={`${name} official logo`} className="h-9 w-9 object-contain" loading="lazy" />
              </div>
              <h3 className="text-lg font-black text-white">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InfographicDashboard() {
  const kpis = [
    ['14+', 'Years IT Experience'],
    ['3.8x', 'Growth Funnel Focus'],
    ['60%', 'Faster Review Response'],
    ['24/7', 'Smart Lead Capture'],
  ];
  const funnel = ['Google Visibility', 'Trust & Reviews', 'Campaign Traffic', 'WhatsApp Inquiry', 'Booking Lead'];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Interactive Growth System" title="Hospitality Marketing As A Smart Infographic Dashboard">
          See how Digital Boost connects SEO, reviews, ads, content, WhatsApp and automation into a measurable growth workflow.
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {kpis.map(([value, label], index) => (
              <motion.div key={label} className="glass rounded-lg p-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.05 }}>
                <p className="text-4xl font-black text-boost-yellow">{value}</p>
                <p className="mt-2 text-sm font-bold text-zinc-300">{label}</p>
              </motion.div>
            ))}
            <div className="glass rounded-lg p-5 sm:col-span-2">
              <h3 className="text-lg font-black text-white">Before / After Digital Growth</h3>
              <div className="mt-5 grid gap-4">
                {[
                  ['Before', 'Low visibility, scattered leads, delayed review replies', '35%'],
                  ['After', 'Optimized SEO, review workflows, AI automation and tracked leads', '88%'],
                ].map(([label, text, width]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm font-bold text-zinc-300"><span>{label}</span><span>{width}</span></div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div className="h-full rounded-full bg-boost-yellow" initial={{ width: 0 }} whileInView={{ width }} viewport={{ once: true }} transition={{ duration: 1 }} />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-5">
            <h3 className="text-xl font-black text-white">Conversion Funnel</h3>
            <div className="mt-6 grid gap-3">
              {funnel.map((item, index) => (
                <motion.div key={item} className="relative rounded-lg border border-white/10 bg-black/35 p-4" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-black text-white">{item}</p>
                    <span className="rounded-md bg-boost-yellow px-2 py-1 text-xs font-black text-black">0{index + 1}</span>
                  </div>
                  {index < funnel.length - 1 && <div className="mx-auto mt-3 h-5 w-px bg-boost-yellow/50" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UpcomingAIFeatures() {
  const platforms = ['Google', 'Booking.com', 'Agoda', 'MakeMyTrip', 'Goibibo', 'Airbnb', 'Zomato', 'Swiggy', 'OTA'];
  const features = ['AI-generated personalized replies', 'Multi-language support', 'Smart sentiment analysis', 'Negative review escalation', 'Brand tone customization', 'Auto-categorization', 'Hotel-specific reply intelligence', 'Restaurant review automation', 'Dashboard analytics', 'Review response templates'];

  return (
    <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex rounded-md border border-boost-yellow/40 bg-boost-yellow/10 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-boost-yellow">Coming Soon</span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl">DBOOST AI Review Reply System</h2>
          <p className="mt-5 text-base leading-8 text-zinc-300">
            Digital Boost is building an advanced AI-powered review management engine capable of generating smart, human-like, hospitality-focused replies for Google Reviews, OTA platforms, food delivery apps and restaurant review platforms.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {platforms.map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold text-zinc-200">{item}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((item) => (
              <p key={item} className="flex gap-2 text-sm leading-6 text-zinc-300">
                <Check className="mt-1 shrink-0 text-boost-yellow" size={16} />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="glass relative overflow-hidden rounded-xl p-5">
          <div className="ai-grid-bg opacity-40" />
          <div className="relative mx-auto grid h-56 w-56 place-items-center rounded-full border border-boost-yellow/30 bg-boost-yellow/10 shadow-glow">
            <div className="h-32 w-32 rounded-full border border-white/15 bg-black/50 p-5">
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.75),rgba(250,204,21,0.08))] animate-pulse" />
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-black/55 p-4 font-mono text-sm text-zinc-200">
            <p className="text-boost-yellow">AI Reply Preview</p>
            <p className="mt-3 leading-7 typing-line">Thank you for your valuable feedback. We are delighted you enjoyed your stay and our hospitality team looks forward to welcoming you again.</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Sentiment', 'Escalation', 'Templates'].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/35 p-3 text-center">
                <p className="text-xs font-bold text-zinc-400">{item}</p>
                <p className="mt-1 text-lg font-black text-boost-yellow">Active</p>
              </div>
            ))}
          </div>
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

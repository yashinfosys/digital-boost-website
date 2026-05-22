import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { AboutPremium, PageHero, Process, SectionTitle, TechnologyStack, WhyChoose } from '../components/Sections';

const skills = [
  ['Hospitality Digital Marketing', 95],
  ['Technology Adoption', 92],
  ['AI Tools Strategy', 98],
  ['Brand Growth Planning', 90],
];

export default function About() {
  return (
    <>
      <SEO
        title="About Digital Boost | AI Hospitality Digital Marketing By Yash Infosystems"
        description="Digital Boost is a Digital Unit of Yash Infosystems helping hotels, restaurants, cafes, resorts and local businesses grow with AI, cloud technology, automation, SEO and performance marketing."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="Digital Boost Is Built For AI-Powered Hospitality Digital Transformation"
        text="Digital Boost is a Digital Unit of Yash Infosystems helping hotels, restaurants, cafes, resorts, rooftop bars, banquet halls and local businesses grow digitally using AI, cloud technology, automation, branding and performance marketing."
      />
      <AboutPremium />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-boost-yellow">Co-Founder</p>
            <h2 className="mt-3 text-3xl font-black text-white">Rohit Srivastava</h2>
            <p className="mt-2 font-bold text-boost-yellow">Co-Founder, Digital Boost</p>
            <p className="mt-1 text-sm font-semibold text-zinc-400">A Digital Unit of Yash Infosystems</p>
            <p className="mt-5 text-sm leading-7 text-zinc-300">
              Rohit Srivastava works on hospitality digital transformation, brand growth, technology adoption, AI tools and digital marketing strategy. His focus is to help hotels, restaurants, cafes, resorts, rooftop bars and banquet halls create better digital systems for visibility, trust and lead generation.
            </p>
          </div>
          <div className="space-y-5">
            {skills.map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold text-white">
                  <span>{label}</span>
                  <span className="text-boost-yellow">{value}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-boost-yellow" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TechnologyStack />
      <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Parent Company" title="Backed By Yash Infosystems">
            Yash Infosystems brings 14+ years of IT experience, giving Digital Boost a technology-first foundation for AWS cloud technology, automation, websites and performance-oriented digital systems.
          </SectionTitle>
        </div>
      </section>
      <Process />
      <WhyChoose />
      <CTA />
    </>
  );
}

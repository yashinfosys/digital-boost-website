import React from 'react';
import SEO from '../components/SEO';
import HeroSlider from '../components/HeroSlider';
import CTA from '../components/CTA';
import { AboutPremium, FAQ, PortfolioGrid, Process, SectionTitle, ServiceGrid, TechnologyStack, Testimonials, WhyChoose } from '../components/Sections';
import { seoFaqs, services } from '../data';

export default function Home() {
  return (
    <>
      <SEO
        title="Hotel Digital Marketing Company | AI Hospitality Marketing Agency | Digital Boost"
        description="Digital Boost is an AI-powered hospitality marketing agency for hotels, restaurants, resorts and local brands. Get hotel SEO, Meta Ads, Google review management, website development and smart QR review systems."
        path="/"
        faqs={seoFaqs}
      />
      <HeroSlider />
      <AboutPremium />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Core Services" title="Hospitality Digital Marketing, SEO, Reviews And Website Growth">
            Enterprise-ready services for hotel digital marketing, restaurant social media marketing, resort lead generation, Google review management and hospitality SEO.
          </SectionTitle>
          <ServiceGrid items={services.slice(0, 6)} />
        </div>
      </section>
      <WhyChoose />
      <TechnologyStack />
      <Process />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Portfolio" title="Sample Digital Boost Project Categories" />
          <PortfolioGrid limit={4} />
        </div>
      </section>
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

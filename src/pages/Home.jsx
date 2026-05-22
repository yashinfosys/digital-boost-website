import React from 'react';
import SEO from '../components/SEO';
import HeroSlider from '../components/HeroSlider';
import CTA from '../components/CTA';
import { FAQ, PortfolioGrid, Process, SectionTitle, ServiceGrid, Testimonials, WhyChoose } from '../components/Sections';
import { services } from '../data';

export default function Home() {
  return (
    <>
      <SEO
        title="Digital Boost | Hospitality Digital Marketing By Yash Infosystems"
        description="Digital Boost helps hospitality brands grow with AI-powered marketing, AWS cloud technology, Google tools, Meta advertising, GMB setup, SEO, review management and websites."
        path="/"
      />
      <HeroSlider />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Core Services" title="Digital Growth Services For Hotels, Restaurants And Local Brands" />
          <ServiceGrid items={services.slice(0, 6)} />
        </div>
      </section>
      <WhyChoose />
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

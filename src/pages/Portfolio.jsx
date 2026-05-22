import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { PageHero, PortfolioGrid, SectionTitle } from '../components/Sections';

export default function Portfolio() {
  return (
    <>
      <SEO
        title="Portfolio | Digital Boost Hospitality Marketing Projects"
        description="Explore Digital Boost sample project categories including hotel websites, restaurant campaigns, cafe branding, rooftop bar promotion, AI review systems, GMB setup and Meta ads."
        path="/portfolio"
      />
      <PageHero
        eyebrow="Portfolio"
        title="Sample Project Categories For Hospitality And Local Brands"
        text="Explore the types of campaigns, websites, AI review systems and marketing assets Digital Boost creates for visibility, trust and lead generation."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Work Types" title="Digital Boost Portfolio Areas" />
          <PortfolioGrid />
        </div>
      </section>
      <CTA />
    </>
  );
}

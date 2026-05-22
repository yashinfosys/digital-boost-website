import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { FAQ, FeatureList, PageHero, SectionTitle } from '../components/Sections';

const features = ['Mobile responsive', 'Fast loading', 'SEO friendly', 'WhatsApp button', 'Contact form', 'Google Map', 'Gallery', 'Service sections'];

export default function WebsiteDevelopment() {
  return (
    <>
      <SEO
        title="Website Development In Lucknow | Landing Page Design Rs. 1,999"
        description="Professional website development for hotels, restaurants, cafes, local businesses and service providers. Landing pages start at just Rs. 1,999."
        path="/website-development"
      />
      <PageHero
        eyebrow="Website Development"
        title="Professional Websites For Hotels, Restaurants, Cafes And Local Businesses"
        text="Digital Boost builds mobile responsive, fast loading and SEO friendly websites with WhatsApp buttons, contact forms, Google Maps, galleries and service sections."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Offer" title="Landing Page Starting At Just Rs. 1,999" />
          <FeatureList items={features} />
        </div>
      </section>
      <FAQ />
      <CTA title="Book Your Landing Page Website" text="Start with a premium one-page website designed for inquiries, trust and fast customer action." />
    </>
  );
}

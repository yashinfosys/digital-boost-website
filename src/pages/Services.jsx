import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { FAQ, PageHero, SectionTitle, ServiceGrid, Testimonials } from '../components/Sections';
import { services } from '../data';

export default function Services() {
  return (
    <>
      <SEO
        title="Services | Digital Marketing For Hotels, Restaurants And Local Businesses"
        description="Explore Digital Boost services including hospitality digital marketing, Meta ads, Google My Business setup, AI review management, SEO, WhatsApp marketing and website development."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title="SEO-Friendly Digital Marketing Services For Hospitality Brands"
        text="Digital Boost combines Google tools, Meta advertising, AI automation, GMB setup, SEO keyword strategy and modern website development for hospitality and local businesses."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="What We Do" title="Services Built For Visibility, Trust And Leads" />
          <ServiceGrid items={services} />
        </div>
      </section>
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

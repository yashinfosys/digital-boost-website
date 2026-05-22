import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { FAQ, FeatureList, PageHero, SectionTitle, Testimonials } from '../components/Sections';

const features = ['Digital presence', 'Online reputation', 'Google Business Profile', 'Meta ads', 'SEO', 'AI automation', 'Website and landing pages', 'Lead generation'];

export default function HospitalityMarketing() {
  return (
    <>
      <SEO
        title="Hospitality Digital Marketing | Hotel And Restaurant Marketing Agency"
        description="Digital Boost provides hotel digital marketing, restaurant marketing, resort marketing, cafe promotion, rooftop bar marketing and banquet lead generation services."
        path="/hospitality-marketing"
      />
      <PageHero
        eyebrow="Hospitality Marketing"
        title="Hotel, Restaurant, Resort, Cafe And Banquet Lead Generation"
        text="Digital Boost helps hospitality businesses improve digital presence, online reputation, Google Business Profile visibility, Meta ads performance, SEO, AI automation and direct leads."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Hospitality Growth" title="Digital Marketing For Hotels, Restaurants And Local Hospitality Brands">
            We support hotel digital marketing, restaurant marketing, resort marketing, cafe promotion, rooftop bar marketing and banquet lead generation with practical digital systems.
          </SectionTitle>
          <FeatureList items={features} />
        </div>
      </section>
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

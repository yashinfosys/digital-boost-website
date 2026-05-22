import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { FAQ, FeatureList, PageHero, SectionTitle } from '../components/Sections';

const features = ['QR based feedback', 'Google review support', 'AI reply suggestions', 'Negative feedback alert', 'Admin dashboard', 'Customer feedback tracking'];

export default function AIReviewSystem() {
  return (
    <>
      <SEO
        title="AI Review Management System | Digital Boost"
        description="Digital Boost AI Review Management System helps hospitality brands collect genuine feedback, support Google reviews, track customers and generate AI reply suggestions."
        path="/ai-review-system"
      />
      <PageHero
        eyebrow="AI Review System"
        title="AI Review Management For Genuine Customer Feedback"
        text="Improve guest feedback collection, Google review support and online reputation with a QR based AI review management system for hospitality brands."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle eyebrow="Features" title="Review Tools That Build Trust" />
          </div>
          <FeatureList items={features} />
        </div>
      </section>
      <section className="bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-boost-yellow/35 bg-boost-yellow/10 p-6 sm:p-8">
          <h2 className="text-2xl font-black text-white">Compliance First</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-200">
            No fake reviews, no auto posting, no review gating. Every review is genuine and customer-approved. Digital Boost helps businesses manage feedback ethically and professionally.
          </p>
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}

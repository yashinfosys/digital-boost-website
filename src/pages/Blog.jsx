import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { PageHero, SectionTitle } from '../components/Sections';
import { blogs } from '../data';
import { usePublicData } from '../lib/usePublicData';

export default function Blog() {
  const { data } = usePublicData('/blogs/public', blogs);
  const posts = data.map((item) => (Array.isArray(item) ? item : [item.title, item.shortDescription]));

  return (
    <>
      <SEO
        title="Blog | Hospitality Digital Marketing Tips By Digital Boost"
        description="Read Digital Boost SEO blogs about hotel direct bookings, Google My Business for restaurants, AI review systems, Meta ads and landing pages for local businesses."
        path="/blog"
      />
      <PageHero
        eyebrow="Blog"
        title="SEO Guides For Hospitality And Local Business Growth"
        text="Helpful ideas for hotels, restaurants, cafes, resorts, rooftop bars, banquet halls and local businesses using digital marketing, GMB, SEO, Meta ads and AI tools."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Articles" title="Digital Marketing Blog Topics" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(([title, text]) => (
              <article key={title} className="glass rounded-lg p-6">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-boost-yellow">Digital Boost Blog</p>
                <h2 className="text-xl font-black text-white">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

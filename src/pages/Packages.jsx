import React from 'react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';
import { FAQ, PageHero, SectionTitle } from '../components/Sections';
import { packages } from '../data';
import { usePublicData } from '../lib/usePublicData';

export default function Packages() {
  const { data } = usePublicData('/packages/public', packages);
  const cmsPackages = data.map((item) => (Array.isArray(item) ? item : [item.name, item.recommended ? undefined : undefined, item.features?.join(', ') || item.offerPrice || item.price || '', item]));

  return (
    <>
      <SEO
        title="Packages | Digital Boost Marketing, AI Review And Website Plans"
        description="Choose Digital Boost packages for digital marketing, AI review system, influencer marketing, website development and landing page websites starting at Rs. 1,999."
        path="/packages"
      />
      <PageHero
        eyebrow="Packages"
        title="Digital Boost Packages For Every Hospitality Growth Stage"
        text="Select from marketing, AI review management, influencer campaigns, website development and landing page website packages designed for local business growth."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Plans" title="Landing Page Website Starting Rs. 1,999" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {cmsPackages.map(([title, Icon, text, raw], index) => {
              const PackageIcon = Icon || (() => null);
              return (
              <article key={title} className={`glass flex h-full flex-col rounded-lg p-6 ${index === 4 ? 'border-boost-yellow/60 shadow-glow' : ''}`}>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-boost-yellow text-black">
                  <PackageIcon size={24} />
                </div>
                <h2 className="text-xl font-black text-white">{title}</h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-300">{Array.isArray(raw?.features) ? raw.features.join(', ') : text}</p>
                <a href="/contact" className="mt-6 inline-flex items-center justify-center rounded-md border border-boost-yellow/40 px-4 py-3 text-sm font-black text-boost-yellow transition hover:bg-boost-yellow hover:text-black">
                  {raw?.ctaText || 'Choose Package'}
                </a>
              </article>
            );})}
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}

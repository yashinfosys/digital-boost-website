import React from 'react';
import { Helmet } from 'react-helmet-async';
import { keywords as defaultKeywords, services as defaultServices } from '../data';
import { useContactSettings } from '../lib/contactSettings';

export default function SEO({ title, description, keywords = defaultKeywords, path = '/', faqs = [] }) {
  const contact = useContactSettings();
  const baseUrl = contact.websiteUrl || 'https://dboost.yashinfosystem.in';
  const url = `${baseUrl}${path}`;
  const image = `${baseUrl}/assets/digital-boost-logo.png`;
  const breadcrumbs = path === '/' ? [['Home', '/']] : [['Home', '/'], [title.split('|')[0].trim(), path]];
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Digital Boost',
      url: baseUrl,
      logo: image,
      email: contact.email || 'info@yashinfosystem.in',
      telephone: contact.phone || '+91 522 4060841',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Yash Infosystems',
        url: 'https://yashinfosystem.in',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      name: 'Digital Boost',
      description,
      image,
      url: baseUrl,
      telephone: contact.phone || '+91 522 4060841',
      email: contact.email || 'info@yashinfosystem.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lucknow',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
        streetAddress: contact.address || 'Lucknow, Uttar Pradesh, India',
      },
      areaServed: ['Lucknow', 'Uttar Pradesh', 'India'],
      serviceType: 'Hospitality Digital Marketing & Technology',
      industry: 'Hospitality Digital Marketing & Technology',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Digital Boost',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(([name, item], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: `${baseUrl}${item === '/' ? '' : item}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Digital Boost Hospitality Marketing Services',
      itemListElement: defaultServices.slice(0, 8).map(([name, , serviceDescription], index) => ({
        '@type': 'Service',
        position: index + 1,
        name,
        description: serviceDescription,
        provider: {
          '@type': 'Organization',
          name: 'Digital Boost',
        },
      })),
    },
  ];

  if (faqs.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Digital Boost" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

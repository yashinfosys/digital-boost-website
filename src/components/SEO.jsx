import React from 'react';
import { Helmet } from 'react-helmet-async';
import { keywords as defaultKeywords } from '../data';

export default function SEO({ title, description, keywords = defaultKeywords, path = '/' }) {
  const url = `https://yashinfosystem.in${path}`;

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
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Digital Boost',
          description,
          telephone: '+91 5224060841',
          url: 'https://yashinfosystem.in',
          parentOrganization: {
            '@type': 'Organization',
            name: 'Yash Infosystems',
          },
        })}
      </script>
    </Helmet>
  );
}

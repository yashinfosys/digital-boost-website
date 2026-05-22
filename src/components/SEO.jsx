import React from 'react';
import { Helmet } from 'react-helmet-async';
import { keywords as defaultKeywords } from '../data';
import { useContactSettings } from '../lib/contactSettings';

export default function SEO({ title, description, keywords = defaultKeywords, path = '/' }) {
  const contact = useContactSettings();
  const baseUrl = contact.websiteUrl || 'https://dboost.yashinfosystem.in';
  const url = `${baseUrl}${path}`;

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
          telephone: contact.phone,
          email: contact.email || undefined,
          address: contact.address || undefined,
          url: baseUrl,
          parentOrganization: {
            '@type': 'Organization',
            name: 'Yash Infosystems',
          },
        })}
      </script>
    </Helmet>
  );
}

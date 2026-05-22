import 'dotenv/config';
import { connectDB } from './config/db.js';
import Admin from './models/Admin.js';
import Page from './models/Page.js';
import Service from './models/Service.js';
import Package from './models/Package.js';
import Portfolio from './models/Portfolio.js';
import Blog from './models/Blog.js';
import FAQ from './models/FAQ.js';
import Testimonial from './models/Testimonial.js';
import Setting from './models/Setting.js';

await connectDB();

const seoKeywords =
  'Digital marketing for hotels, hotel marketing agency, restaurant digital marketing, Google My Business setup, Meta ads for hotels, AI review management, website development in Lucknow, landing page design, hospitality digital marketing, Yash Infosystems, Digital Boost';

await Admin.findOneAndUpdate(
  { email: process.env.SUPER_ADMIN_EMAIL || 'admin@yashinfosystem.in' },
  {
    name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@yashinfosystem.in',
    password: process.env.SUPER_ADMIN_PASSWORD || 'ChangeMe@12345',
    role: 'super_admin',
    status: 'active',
  },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);

const pages = [
  ['home', 'Home', 'Helping Hospitality Brands Grow Their Digital Presence Since 14+ Years'],
  ['about', 'About', 'Digital Boost Is Built For Hospitality Digital Transformation'],
  ['services', 'Services', 'SEO-Friendly Digital Marketing Services For Hospitality Brands'],
  ['packages', 'Packages', 'Digital Boost Packages For Every Hospitality Growth Stage'],
  ['ai-review-system', 'AI Review System', 'AI Review Management For Genuine Customer Feedback'],
  ['hospitality-marketing', 'Hospitality Marketing', 'Hotel, Restaurant, Resort, Cafe And Banquet Lead Generation'],
  ['website-development', 'Website Development', 'Professional Websites For Hotels, Restaurants, Cafes And Local Businesses'],
  ['portfolio', 'Portfolio', 'Sample Project Categories For Hospitality And Local Brands'],
  ['blog', 'Blog', 'SEO Guides For Hospitality And Local Business Growth'],
  ['contact', 'Contact', 'Start Your Digital Boost Growth Plan'],
];

for (const [slug, title, h1] of pages) {
  await Page.findOneAndUpdate(
    { slug },
    {
      slug,
      title,
      seoTitle: `${title} | Digital Boost`,
      seoDescription: `Digital Boost ${title.toLowerCase()} content for hospitality digital marketing, AI automation, GMB setup, Meta ads and website development.`,
      seoKeywords,
      h1,
      content: `${title} CMS content managed from admin panel.`,
      ctaText: 'Get Free Consultation',
      ctaButtonText: 'Contact Digital Boost',
      ctaButtonLink: '/contact',
      status: 'active',
    },
    { upsert: true },
  );
}

const services = [
  ['Hospitality Digital Marketing', 'hospitality-digital-marketing'],
  ['Meta/Facebook/Instagram Ads', 'meta-facebook-instagram-ads'],
  ['Google My Business Setup', 'google-my-business-setup'],
  ['AI Review Management System', 'ai-review-management-system'],
  ['Website Development', 'website-development'],
  ['Landing Page Development', 'landing-page-development'],
  ['SEO Keyword Strategy', 'seo-keyword-strategy'],
  ['Social Media Management', 'social-media-management'],
  ['WhatsApp Marketing', 'whatsapp-marketing'],
  ['Influencer Marketing', 'influencer-marketing'],
  ['Lead Generation Campaigns', 'lead-generation-campaigns'],
  ['Branding & Creative Design', 'branding-creative-design'],
];

for (const [title, slug] of services) {
  await Service.findOneAndUpdate(
    { slug },
    {
      title,
      slug,
      icon: 'Sparkles',
      shortDescription: `${title} for hotels, restaurants and local businesses.`,
      fullDescription: `${title} managed by Digital Boost with strategy, technology and performance focus.`,
      seoTitle: `${title} | Digital Boost`,
      seoDescription: `${title} services by Digital Boost, a digital unit of Yash Infosystems.`,
      seoKeywords,
      status: 'active',
    },
    { upsert: true },
  );
}

const packages = [
  ['Digital Boost', 'digital-boost', '', ''],
  ['AI Review System', 'ai-review-system', '', ''],
  ['Influencer Marketing', 'influencer-marketing', '', ''],
  ['Website Development', 'website-development', '', ''],
  ['Landing Page Website Starting Rs. 1,999', 'landing-page-website-1999', '1999', '1999'],
];

for (const [name, slug, price, offerPrice] of packages) {
  await Package.findOneAndUpdate(
    { slug },
    {
      name,
      slug,
      price,
      offerPrice,
      features: ['Strategy planning', 'Premium design direction', 'WhatsApp support', 'Lead focused execution'],
      recommended: slug === 'landing-page-website-1999',
      ctaText: 'Choose Package',
      status: 'active',
    },
    { upsert: true },
  );
}

for (const title of ['Hotel Website', 'Restaurant Campaign', 'Cafe Branding', 'Rooftop Bar Promotion', 'AI Review System', 'Landing Page Website', 'GMB Setup', 'Meta Ads Campaign']) {
  await Portfolio.findOneAndUpdate({ title }, { title, category: 'Digital Marketing', description: `${title} sample portfolio item.`, status: 'active' }, { upsert: true });
}

for (const title of ['How Hotels Can Increase Direct Bookings', 'Why Google My Business Is Important For Restaurants', 'How AI Review System Helps Hospitality Brands', 'Meta Ads Strategy For Hotels And Cafes', 'Why Every Local Business Needs A Landing Page']) {
  await Blog.findOneAndUpdate(
    { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
    {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      shortDescription: `${title} by Digital Boost.`,
      content: `<p>${title} content can be edited from the CMS rich text field.</p>`,
      seoTitle: `${title} | Digital Boost Blog`,
      seoDescription: `${title} for hospitality digital marketing and local business growth.`,
      seoKeywords,
      publishDate: new Date(),
      status: 'published',
    },
    { upsert: true },
  );
}

for (const [question, answer] of [
  ['Do you create fake reviews?', 'No. Digital Boost supports genuine customer-approved feedback only.'],
  ['What is the landing page price?', 'Landing page websites start at Rs. 1,999/-.'],
  ['Can you set up Google My Business?', 'Yes. We help with Google Business Profile setup and local visibility direction.'],
]) {
  await FAQ.findOneAndUpdate({ question }, { question, answer, pageCategory: 'general', status: 'active' }, { upsert: true });
}

for (const [clientName, businessName, reviewText] of [
  ['Cafe Owner', 'Local Cafe', 'Digital Boost improved our online presence and WhatsApp inquiries.'],
  ['Hotel Manager', 'Hotel Brand', 'The AI review system helped our team manage feedback professionally.'],
  ['Business Founder', 'Local Business', 'Our landing page looked premium and worked well on mobile.'],
]) {
  await Testimonial.findOneAndUpdate({ clientName }, { clientName, businessName, reviewText, rating: 5, status: 'active' }, { upsert: true });
}

await Setting.findOneAndUpdate(
  { key: 'website' },
  {
    key: 'website',
    value: {
      logo: '/assets/digital-boost-logo.png',
      favicon: '',
      brandColor: '#facc15',
      phone: '+91 5224060841',
      whatsapp: '915224060841',
      email: '',
      website: 'yashinfosystem.in',
      address: '',
      googleMapLink: '',
      whatsappFloatingButton: true,
      callFloatingButton: true,
      footerText: '© 2026 Digital Boost. A Digital Unit of Yash Infosystems. All Rights Reserved.',
      developerCredit: 'Designed & Developed by Yash Infosystems',
      developerWebsite: 'yashinfosystem.in',
    },
  },
  { upsert: true },
);

console.log('Seed completed');
process.exit(0);

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
  ['home', 'Home', 'AI-Powered Digital Growth for Hotels, Restaurants & Hospitality Brands'],
  ['about', 'About', 'Digital Boost Is Built For AI-Powered Hospitality Digital Transformation'],
  ['services', 'Services', 'Hospitality Digital Marketing, SEO, Reviews And Website Growth'],
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
      content:
        slug === 'about'
          ? 'Digital Boost is a Digital Unit of Yash Infosystems helping hotels, restaurants, cafes, resorts, rooftop bars, banquet halls and local businesses grow digitally using AI, cloud technology, automation, branding and performance marketing. Our work includes AI review management, Google Business optimization, Meta Ads, hospitality SEO, hotel website development, QR based smart marketing, smart CMS solutions, cloud based business automation and analytics tracking.'
          : slug === 'home'
            ? 'From Google Visibility to Viral Branding, Digital Boost helps hospitality businesses grow with AI marketing, cloud technology, automation and performance campaigns.'
            : `${title} CMS content managed from admin panel.`,
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
  ['What services does Digital Boost provide?', 'Digital Boost provides hospitality digital marketing, hotel website development, restaurant social media marketing, Google Business optimization, Meta Ads, SEO, AI review management, QR review systems, smart CMS solutions and cloud based automation.'],
  ['How does AI Review Management work?', 'Our AI review management workflow uses QR based feedback capture, internal negative feedback alerts, review response suggestions and analytics to help hotels and restaurants improve reputation without creating fake reviews.'],
  ['Why do hotels need digital marketing?', 'Hotels need digital marketing to increase Google visibility, direct inquiries, room bookings, banquet leads, restaurant footfall, brand trust and repeat guest engagement across search, social and review platforms.'],
  ['Do you provide hotel website development?', 'Yes. Digital Boost builds fast, mobile responsive and SEO-ready hotel websites with inquiry forms, WhatsApp CTA, gallery, service pages, Google Map, booking flows and CMS management.'],
  ['How can Digital Boost improve Google reviews?', 'Digital Boost improves Google review performance through guest-friendly QR feedback, response templates, AI reply suggestions, review monitoring, staff alerts and genuine customer experience workflows.'],
  ['Do you provide Meta Ads services?', 'Yes. We plan and manage Meta Ads campaigns for hotels, restaurants, cafes, resorts, rooftops and banquet halls with lead generation, offer campaigns, retargeting and creative strategy.'],
  ['What industries do you support?', 'We support hotels, restaurants, cafes, resorts, rooftop bars, banquet halls, local service businesses, shops, consultants and growing brands that need stronger digital visibility.'],
  ['Do you create custom CMS systems?', 'Yes. Backed by Yash Infosystems, Digital Boost creates custom CMS dashboards, smart inquiry systems, cloud automation tools, analytics panels and business workflow software.'],
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
      phone: '+91 522 4060841',
      whatsapp: '919554589777',
      email: 'info@yashinfosystem.in',
      website: 'dboost.yashinfosystem.in',
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

await Setting.findOneAndUpdate(
  { key: 'contact' },
  {
    key: 'contact',
    value: {
      phone: '+91 522 4060841',
      phoneNumber: '915224060841',
      alternatePhone: '',
      alternatePhoneNumber: '',
      whatsappNumber: '919554589777',
      whatsappMessage: 'Hello Digital Boost, I want to know more about your services.',
      email: 'info@yashinfosystem.in',
      website: 'dboost.yashinfosystem.in',
      address: '',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.2517055678886!2d80.9151396!3d26.8319454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc81b59bfcf%3A0xf0bd1fc52e663df0!2sDigital%20Boost!5e0!3m2!1sen!2sin!4v1779213792582!5m2!1sen!2sin',
    },
  },
  { upsert: true },
);

await Setting.findOneAndUpdate(
  { key: 'seoSchema' },
  {
    key: 'seoSchema',
    value: {
      metaTitle: 'Hotel Digital Marketing Company | AI Hospitality Marketing Agency | Digital Boost',
      metaDescription:
        'Digital Boost helps hotels, restaurants and resorts grow with AI marketing, Google review management, Meta Ads, SEO, website development and smart QR review systems.',
      keywords:
        'Hotel Digital Marketing Company, Hospitality Marketing Agency, AI Review Management System, Hotel Website Development, Restaurant Social Media Marketing, Google Review Management, Resort Lead Generation, Hospitality SEO Services, Smart QR Review System, Hotel Branding Agency',
      ogImage: '/assets/digital-boost-logo.png',
      schemaJson: '{"industry":"Hospitality Digital Marketing & Technology","location":"Lucknow, Uttar Pradesh, India"}',
    },
  },
  { upsert: true },
);

await Setting.findOneAndUpdate(
  { key: 'socialLinks' },
  {
    key: 'socialLinks',
    value: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      googleBusiness: '',
    },
  },
  { upsert: true },
);

console.log('Seed completed');
process.exit(0);

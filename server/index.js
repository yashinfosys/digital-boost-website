import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admins.js';
import dashboardRoutes from './routes/dashboard.js';
import inquiryRoutes from './routes/inquiries.js';
import mediaRoutes from './routes/media.js';
import settingsRoutes from './routes/settings.js';
import { crudRouter } from './routes/crud.js';
import Page from './models/Page.js';
import Service from './models/Service.js';
import Package from './models/Package.js';
import Portfolio from './models/Portfolio.js';
import Blog from './models/Blog.js';
import Gallery from './models/Gallery.js';
import Testimonial from './models/Testimonial.js';
import FAQ from './models/FAQ.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://127.0.0.1:5173', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Digital Boost CMS API' }));
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/pages', crudRouter(Page, { slugField: 'slug' }));
app.use('/api/services', crudRouter(Service, { slugField: 'slug' }));
app.use('/api/packages', crudRouter(Package, { slugField: 'slug' }));
app.use('/api/portfolio', crudRouter(Portfolio));
app.use('/api/blogs', crudRouter(Blog, { publicFilter: { status: 'published' }, slugField: 'slug' }));
app.use('/api/gallery', crudRouter(Gallery));
app.use('/api/testimonials', crudRouter(Testimonial));
app.use('/api/faqs', crudRouter(FAQ));
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/media', mediaRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || 'Server error' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Digital Boost CMS API running on port ${port}`));

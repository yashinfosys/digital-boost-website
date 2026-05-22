import express from 'express';
import { protect } from '../middleware/auth.js';
import Blog from '../models/Blog.js';
import Inquiry from '../models/Inquiry.js';
import Package from '../models/Package.js';
import Portfolio from '../models/Portfolio.js';
import Service from '../models/Service.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const [totalInquiries, newInquiries, totalBlogs, totalServices, totalPackages, totalPortfolioItems, recentInquiries] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'New' }),
    Blog.countDocuments(),
    Service.countDocuments(),
    Package.countDocuments(),
    Portfolio.countDocuments(),
    Inquiry.find().sort({ createdAt: -1 }).limit(6),
  ]);

  res.json({ totalInquiries, newInquiries, totalBlogs, totalServices, totalPackages, totalPortfolioItems, recentInquiries });
});

export default router;

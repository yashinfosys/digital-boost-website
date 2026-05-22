import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    seoKeywords: { type: String, trim: true },
    h1: { type: String, trim: true },
    bannerImage: String,
    content: { type: String, default: '' },
    ctaText: String,
    ctaButtonText: String,
    ctaButtonLink: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    sections: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export default mongoose.model('Page', pageSchema);

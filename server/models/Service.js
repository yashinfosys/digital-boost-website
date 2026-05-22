import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, default: 'Sparkles' },
    shortDescription: String,
    fullDescription: String,
    image: String,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

export default mongoose.model('Service', serviceSchema);

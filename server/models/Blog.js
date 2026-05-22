import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    featuredImage: String,
    shortDescription: String,
    content: String,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    publishDate: Date,
    status: { type: String, enum: ['draft', 'published', 'inactive'], default: 'draft' },
  },
  { timestamps: true },
);

export default mongoose.model('Blog', blogSchema);

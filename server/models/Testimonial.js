import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    businessName: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    reviewText: { type: String, required: true },
    image: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

export default mongoose.model('Testimonial', testimonialSchema);

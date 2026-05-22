import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    price: String,
    offerPrice: String,
    features: [{ type: String }],
    recommended: { type: Boolean, default: false },
    ctaText: { type: String, default: 'Choose Package' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

export default mongoose.model('Package', packageSchema);

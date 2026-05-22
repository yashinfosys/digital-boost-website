import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: String,
    category: {
      type: String,
      enum: ['Hotels', 'Restaurants', 'Cafes', 'Resorts', 'Rooftop Bars', 'Events', 'Digital Marketing', 'Website Work'],
      required: true,
    },
    image: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

export default mongoose.model('Gallery', gallerySchema);

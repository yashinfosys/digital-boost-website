import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: String,
    path: { type: String, required: true },
    mimetype: String,
    size: Number,
    used: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model('Media', mediaSchema);

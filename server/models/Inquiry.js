import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    businessName: String,
    mobileNumber: { type: String, required: true },
    email: String,
    serviceInterested: String,
    message: String,
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Rejected'], default: 'New' },
    adminNotes: String,
  },
  { timestamps: true },
);

export default mongoose.model('Inquiry', inquirySchema);

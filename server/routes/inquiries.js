import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  res.status(201).json({ message: 'Inquiry received', inquiry });
});

router.get('/', protect, async (req, res) => {
  res.json(await Inquiry.find().sort({ createdAt: -1 }));
});

router.put('/:id', protect, async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
  res.json(inquiry);
});

router.delete('/:id', protect, async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
  res.json({ message: 'Inquiry deleted' });
});

export default router;

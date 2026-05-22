import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

function signToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (admin.status !== 'active') return res.status(403).json({ message: 'Account inactive' });
  const token = signToken(admin);
  return res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
});

router.get('/me', protect, (req, res) => {
  res.json({ admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email, role: req.admin.role } });
});

router.post('/forgot-password', async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    admin.resetToken = crypto.randomBytes(24).toString('hex');
    admin.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
    await admin.save();
  }
  res.json({ message: 'If the email exists, a reset token has been generated.' });
});

router.post('/reset-password', async (req, res) => {
  const admin = await Admin.findOne({
    resetToken: req.body.token,
    resetTokenExpires: { $gt: new Date() },
  }).select('+password');
  if (!admin) return res.status(400).json({ message: 'Invalid reset token' });
  admin.password = req.body.password;
  admin.resetToken = undefined;
  admin.resetTokenExpires = undefined;
  await admin.save();
  res.json({ message: 'Password reset successfully' });
});

router.post('/change-password', protect, async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(req.body.currentPassword))) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }
  admin.password = req.body.newPassword;
  await admin.save();
  res.json({ message: 'Password changed successfully' });
});

export default router;

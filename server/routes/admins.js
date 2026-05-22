import express from 'express';
import Admin from '../models/Admin.js';
import { protect, requireSuperAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, requireSuperAdmin);

router.get('/', async (req, res) => {
  res.json(await Admin.find().sort({ createdAt: -1 }));
});

router.post('/', async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(201).json({ id: admin._id, name: admin.name, email: admin.email, role: admin.role });
});

router.put('/:id', async (req, res) => {
  const target = await Admin.findById(req.params.id);
  if (!target) return res.status(404).json({ message: 'Admin not found' });
  if (target.role === 'super_admin' && String(target._id) !== String(req.admin._id)) {
    return res.status(403).json({ message: 'Cannot edit another super admin' });
  }
  Object.assign(target, req.body);
  await target.save();
  res.json(target);
});

router.delete('/:id', async (req, res) => {
  const target = await Admin.findById(req.params.id);
  if (!target) return res.status(404).json({ message: 'Admin not found' });
  if (target.role === 'super_admin') {
    return res.status(403).json({ message: 'Cannot delete super admin' });
  }
  await target.deleteOne();
  res.json({ message: 'Admin deleted' });
});

export default router;

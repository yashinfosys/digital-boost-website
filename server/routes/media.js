import express from 'express';
import fs from 'fs';
import Media from '../models/Media.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  res.json(await Media.find().sort({ createdAt: -1 }));
});

router.post('/', upload.single('file'), async (req, res) => {
  const media = await Media.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: `/uploads/${req.file.filename}`,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
  res.status(201).json(media);
});

router.delete('/:id', async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) return res.status(404).json({ message: 'Media not found' });
  if (media.used) return res.status(400).json({ message: 'Cannot delete media marked as used' });
  const filepath = `server/uploads/${media.filename}`;
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  await media.deleteOne();
  res.json({ message: 'Media deleted' });
});

export default router;

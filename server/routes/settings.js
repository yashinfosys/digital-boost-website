import express from 'express';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

function enforceCredit(value = {}) {
  return {
    ...value,
    developerCredit: 'Designed & Developed by Yash Infosystems',
    developerWebsite: 'yashinfosystem.in',
  };
}

router.get('/public', async (req, res) => {
  const settings = await Setting.find();
  res.json(Object.fromEntries(settings.map((item) => [item.key, item.value])));
});

router.get('/', protect, async (req, res) => {
  res.json(await Setting.find().sort({ key: 1 }));
});

router.put('/:key', protect, async (req, res) => {
  const value = req.params.key === 'website' ? enforceCredit(req.body.value) : req.body.value;
  const setting = await Setting.findOneAndUpdate({ key: req.params.key }, { value }, { upsert: true, new: true });
  res.json(setting);
});

export default router;

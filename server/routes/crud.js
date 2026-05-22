import express from 'express';
import slugify from 'slugify';
import { protect } from '../middleware/auth.js';

export function crudRouter(Model, options = {}) {
  const router = express.Router();
  const { publicFilter = { status: 'active' }, slugField } = options;

  router.get('/public', async (req, res) => {
    const docs = await Model.find(publicFilter).sort({ createdAt: -1 });
    res.json(docs);
  });

  router.get('/public/:slug', async (req, res) => {
    const query = slugField ? { [slugField]: req.params.slug, ...publicFilter } : { _id: req.params.slug, ...publicFilter };
    const doc = await Model.findOne(query);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    return res.json(doc);
  });

  router.get('/', protect, async (req, res) => {
    const docs = await Model.find().sort({ createdAt: -1 });
    res.json(docs);
  });

  router.post('/', protect, async (req, res) => {
    const body = { ...req.body };
    if (slugField && !body[slugField] && (body.title || body.name)) {
      body[slugField] = slugify(body.title || body.name, { lower: true, strict: true });
    }
    const doc = await Model.create(body);
    res.status(201).json(doc);
  });

  router.get('/:id', protect, async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  });

  router.put('/:id', protect, async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  });

  router.delete('/:id', protect, async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  });

  return router;
}

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'server/uploads',
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname).toLowerCase()}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'].includes(file.mimetype)) {
      return cb(new Error('Only image uploads are allowed'));
    }
    return cb(null, true);
  },
});

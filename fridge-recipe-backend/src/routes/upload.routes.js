import express from 'express';
import { uploadAndAnalyze, uploadImage } from '../controllers/uploadController.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// TEST ROUTE - Simple test to verify routes work
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Upload routes are working! ✅',
    timestamp: new Date().toISOString()
  });
});

// Upload and analyze (full flow)
router.post('/analyze', upload.single('image'), uploadAndAnalyze);

// Upload image only
router.post('/image', upload.single('image'), uploadImage);

export default router;
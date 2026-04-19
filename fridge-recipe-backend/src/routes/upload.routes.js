import express from 'express';
import { 
  uploadAndAnalyze,
  uploadImage, generateRecipesWithConfirmedIngredients 
} from '../controllers/uploadController.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.middleware.js';

const router = express.Router();

// Step 1: Upload and get AI suggestions
router.post('/analyze', uploadSingle, handleUploadError, uploadAndAnalyze);

// Step 2: Generate recipes with confirmed ingredients
router.post('/generate-recipes', generateRecipesWithConfirmedIngredients);

// Upload only (optional)
router.post('/image', uploadSingle, handleUploadError, uploadImage);

export default router;
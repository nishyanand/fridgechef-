import express from 'express';
import {
  saveRecipe,
  getSavedRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipeStats,
} from '../controllers/recipeController.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Recipe CRUD
router.post('/save', saveRecipe);
router.get('/', getSavedRecipes);
router.get('/stats', getRecipeStats);
router.get('/:id', getRecipeById);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
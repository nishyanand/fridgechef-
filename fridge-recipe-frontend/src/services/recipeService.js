import api from './api';

// Save a recipe
export const saveRecipe = async (recipeData) => {
  const response = await api.post('/recipes/save', recipeData);
  return response.data;
};

// Get all saved recipes
export const getSavedRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data;
};

// Get single recipe
export const getRecipe = async (recipeId) => {
  const response = await api.get(`/recipes/${recipeId}`);
  return response.data;
};

// Update recipe
export const updateRecipe = async (recipeId, updateData) => {
  const response = await api.put(`/recipes/${recipeId}`, updateData);
  return response.data;
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
  const response = await api.delete(`/recipes/${recipeId}`);
  return response.data;
};

// Get recipe statistics
export const getRecipeStats = async () => {
  const response = await api.get('/recipes/stats');
  return response.data;
};
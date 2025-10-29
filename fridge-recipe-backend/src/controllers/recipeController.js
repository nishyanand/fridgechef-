import Recipe from '../models/Recipe.js';

// @desc    Save a recipe
// @route   POST /api/recipes/save
// @access  Private
export const saveRecipe = async (req, res) => {
  try {
    const {
      name,
      description,
      cookingTime,
      difficulty,
      servings,
      ingredients,
      instructions,
      calories,
      sourceImage,
      tags,
      notes,
    } = req.body;

    // Validate required fields
    if (!name || !cookingTime || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, cookingTime, ingredients, and instructions',
      });
    }

    // Create recipe
    const recipe = await Recipe.create({
      userId: req.userId, // From auth middleware
      name,
      description,
      cookingTime,
      difficulty,
      servings,
      ingredients,
      instructions,
      calories,
      sourceImage,
      tags,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Recipe saved successfully',
      recipe,
    });

  } catch (error) {
    console.error('Save recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save recipe',
      error: error.message,
    });
  }
};

// @desc    Get all saved recipes for current user
// @route   GET /api/recipes
// @access  Private
export const getSavedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId })
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });

  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recipes',
      error: error.message,
    });
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
// @access  Private
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    // Check if recipe belongs to user
    if (recipe.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this recipe',
      });
    }

    res.status(200).json({
      success: true,
      recipe,
    });

  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recipe',
      error: error.message,
    });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    // Check if recipe belongs to user
    if (recipe.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe',
      });
    }

    // Update recipe
    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      recipe,
    });

  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message,
    });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    // Check if recipe belongs to user
    if (recipe.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe',
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
    });

  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete recipe',
      error: error.message,
    });
  }
};

// @desc    Get recipe statistics
// @route   GET /api/recipes/stats
// @access  Private
export const getRecipeStats = async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments({ userId: req.userId });
    
    // Get recipes by difficulty
    const easyCount = await Recipe.countDocuments({ 
      userId: req.userId, 
      difficulty: 'Easy' 
    });
    
    const mediumCount = await Recipe.countDocuments({ 
      userId: req.userId, 
      difficulty: 'Medium' 
    });
    
    const hardCount = await Recipe.countDocuments({ 
      userId: req.userId, 
      difficulty: 'Hard' 
    });

    res.status(200).json({
      success: true,
      stats: {
        totalRecipes,
        byDifficulty: {
          Easy: easyCount,
          Medium: mediumCount,
          Hard: hardCount,
        },
      },
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: error.message,
    });
  }
};
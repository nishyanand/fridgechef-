import { uploadToCloudinary } from '../services/cloudinaryService.js';
import { analyzeImageForIngredients, generateRecipes } from '../services/geminiService.js';
import { generateRecipesFromIngredients } from '../services/geminiService.js';

// @desc    Upload image and get AI-suggested ingredients (Step 1)
// @route   POST /api/upload/analyze
// @access  Public
export const uploadAndAnalyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    console.log('📤 File received:', req.file.originalname);

    // Upload to Cloudinary
    console.log('☁️  Uploading to Cloudinary...');
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname
    );
    console.log('✅ Image uploaded to Cloudinary');

    // Analyze with AI (get suggestions)
    const aiSuggestedIngredients = await analyzeImageForIngredients(uploadResult.secure_url);

    // Return AI suggestions for user confirmation
    res.status(200).json({
      success: true,
      message: 'Image analyzed. Please review and confirm ingredients.',
      data: {
        imageUrl: uploadResult.secure_url,
        imageId: uploadResult.public_id,
        suggestedIngredients: aiSuggestedIngredients,
        needsConfirmation: true // Flag to show confirmation screen
      },
    });

  } catch (error) {
    console.error('Upload and analyze error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze image',
      error: error.message,
    });
  }
};

// @desc    Generate recipes with user-confirmed ingredients (Step 2)
// @route   POST /api/upload/generate-recipes
// @access  Public
export const generateRecipesWithConfirmedIngredients = async (req, res) => {
  try {
    const { confirmedIngredients, dietaryPreferences, imageUrl, imageId } = req.body;

    // Validate input
    if (!confirmedIngredients || !Array.isArray(confirmedIngredients) || confirmedIngredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one confirmed ingredient',
      });
    }

    console.log('👨‍🍳 Generating recipes with confirmed ingredients...');
    console.log('📝 Confirmed ingredients:', confirmedIngredients);

    // Extract ingredient names - FIX THIS PART
    const ingredientNames = confirmedIngredients.map(ing => {
      if (typeof ing === 'string') {
        return ing;
      } else if (ing && ing.name) {
        return ing.name;
      } else {
        console.warn('⚠️ Invalid ingredient format:', ing);
        return null;
      }
    }).filter(name => name !== null && name !== ''); // Remove null/empty

    console.log('📋 Extracted ingredient names:', ingredientNames);

    if (ingredientNames.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid ingredient names found',
      });
    }

    // Generate recipes
    const recipes = await generateRecipesFromIngredients(
      ingredientNames,
      dietaryPreferences || {}
    );

    res.status(200).json({
      success: true,
      message: 'Recipes generated successfully',
      data: {
        imageUrl,
        imageId,
        ingredients: confirmedIngredients,
        recipes: recipes,
      },
    });

  } catch (error) {
    console.error('❌ Recipe generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recipes',
      error: error.message,
    });
  }
};

// @desc    Upload image only (without analysis)
// @route   POST /api/upload/image
// @access  Public
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: uploadResult.secure_url,
        imageId: uploadResult.public_id,
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message,
    });
  }
};
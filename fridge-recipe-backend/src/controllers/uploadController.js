import { uploadImageToCloudinary } from '../services/cloudinaryService.js';
import { analyzeImageForIngredients } from '../services/geminiService.js';
import { generateRecipesFromIngredients } from '../services/recipeService.js';

// @desc    Upload image and get full analysis (ingredients + recipes)
// @route   POST /api/upload/analyze
// @access  Public
export const uploadAndAnalyze = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    console.log('📤 File received:', req.file.originalname);

    // Step 1: Upload to Cloudinary
    console.log('☁️  Uploading to Cloudinary...');
    const uploadResult = await uploadImageToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    console.log('✅ Image uploaded to Cloudinary');

    // Step 2: Analyze with Gemini Vision
    const ingredients = await analyzeImageForIngredients(uploadResult.secure_url);

    // Step 3: Generate recipes with Gemini
    const recipes = await generateRecipesFromIngredients(ingredients);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Analysis complete',
      data: {
        imageUrl: uploadResult.secure_url,
        imageId: uploadResult.public_id,
        ingredients: ingredients,
        recipes: recipes,
      },
    });

  } catch (error) {
    console.error('Upload and analyze error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process image',
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

    const uploadResult = await uploadImageToCloudinary(
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
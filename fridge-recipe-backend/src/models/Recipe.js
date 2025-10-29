import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  // User who saved this recipe
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Recipe details
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true,
  },
  
  description: {
    type: String,
    trim: true,
  },
  
  cookingTime: {
    type: Number, // in minutes
    required: true,
  },
  
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  
  servings: {
    type: Number,
    default: 2,
  },
  
  // Ingredients array
  ingredients: [{
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
  }],
  
  // Cooking instructions
  instructions: [{
    type: String,
    required: true,
  }],
  
  // Nutrition info
  calories: {
    type: Number,
  },
  
  // Original image that generated this recipe (optional)
  sourceImage: {
    type: String,
  },
  
  // Tags for filtering
  tags: [{
    type: String,
  }],
  
  // User notes
  notes: {
    type: String,
  },
  
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Index for faster queries
recipeSchema.index({ userId: 1, createdAt: -1 });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
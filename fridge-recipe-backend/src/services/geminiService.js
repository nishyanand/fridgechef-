import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

export const analyzeImageForIngredients = async (imageUrl) => {
  try {
    console.log("🤖 Analyzing image with OpenRouter...");

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "List all food ingredients visible in this fridge image. Return only JSON array."
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ]
    });

    const text = response.choices[0].message.content;
    console.log("📄 AI response:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    const ingredients = JSON.parse(cleaned);

    return ingredients.map(item => ({
      name: item.toLowerCase(),
      confidence: 90
    }));

  } catch (error) {
    console.error("❌ AI Error:", error.message);
    throw new Error(`Image analysis failed: ${error.message}`);
  }
};
/**
 * Generate recipes based on ingredients
 */
export const generateRecipes = async (ingredients, dietaryPreferences = {}) => {
  try {
    console.log('👨‍🍳 Generating recipes...');
    console.log('📝 Available ingredients:', ingredients.join(', '));

    // Build dietary restrictions
    const dietaryInfo = [];
    if (dietaryPreferences.isVegetarian) dietaryInfo.push('vegetarian');
    if (dietaryPreferences.isVegan) dietaryInfo.push('vegan');
    if (dietaryPreferences.isGlutenFree) dietaryInfo.push('gluten-free');
    if (dietaryPreferences.isDairyFree) dietaryInfo.push('dairy-free');

    const dietaryText = dietaryInfo.length > 0 
      ? `\n\nDIETARY RESTRICTIONS (MANDATORY):\n- All recipes MUST be: ${dietaryInfo.join(', ')}` 
      : '';

    const prompt = `You are a professional chef and recipe creator.

AVAILABLE INGREDIENTS:
${ingredients.join(', ')}

YOUR TASK:
Create 5 delicious, practical recipes using PRIMARILY these ingredients.${dietaryText}

REQUIREMENTS:
✓ Each recipe uses AT LEAST 3-4 of the available ingredients
✓ Assume basic pantry items: salt, pepper, oil, butter, flour, sugar, eggs, milk, garlic, onion
✓ Realistic for home cooks
✓ Variety: mix of meals/snacks/sides
✓ Different cooking methods

For each recipe provide:
1. name: Clear recipe name
2. description: One sentence about the dish
3. prepTime: Minutes (number)
4. cookTime: Minutes (number)
5. difficulty: "Easy", "Medium", or "Hard"
6. servings: 1-6
7. ingredients: Array with amounts (e.g., "2 cups flour")
8. instructions: Array of steps
9. tags: Array of 3-5 tags
10. usedIngredients: Array of available ingredients used

Return ONLY valid JSON array with 5 recipes. No markdown.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional chef. You always return valid JSON arrays with practical recipes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3500,
      temperature: 0.8
    });

    const content = response.choices[0].message.content.trim();
    
    // Parse JSON
    let recipes;
    try {
      let jsonContent = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      recipes = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ Recipe Parse Error:', parseError.message);
      throw new Error('Invalid recipe format');
    }

    if (!Array.isArray(recipes) || recipes.length === 0) {
      throw new Error('No recipes generated');
    }

    // Validate recipes have required fields
    recipes = recipes.filter(recipe => {
      const isValid = recipe.name && recipe.ingredients && recipe.instructions;
      if (!isValid) {
        console.warn('⚠️  Skipping invalid recipe:', recipe.name || 'unnamed');
      }
      return isValid;
    });

    console.log(`✅ Generated ${recipes.length} valid recipes`);
    
    return recipes;

  } catch (error) {
    console.error('❌ Error generating recipes:', error.message);
    throw new Error(`Recipe generation failed: ${error.message}`);
  }
};

// Export for recipeService.js compatibility
export const generateRecipesFromIngredients = generateRecipes;

export default {
  analyzeImageForIngredients,
  generateRecipes,
  generateRecipesFromIngredients
};

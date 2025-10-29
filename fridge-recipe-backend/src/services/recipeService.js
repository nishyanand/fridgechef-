import dotenv from 'dotenv';

dotenv.config();

export const generateRecipesFromIngredients = async (ingredients) => {
  try {
    console.log('👨‍🍳 Generating dynamic recipes...');

    const ingredientNames = ingredients.map(ing => ing.name).join(', ');
    console.log(`📝 Available ingredients: ${ingredientNames}`);

    // Generate recipes dynamically
    const recipes = generateDynamicRecipes(ingredients);

    console.log(`✅ Generated ${recipes.length} recipes`);
    return recipes;

  } catch (error) {
    console.error('Recipe generation error:', error);
    throw new Error(`Failed to generate recipes: ${error.message}`);
  }
};

function generateDynamicRecipes(ingredients) {
  const recipes = [];
  const mainIngredients = ingredients.slice(0, 3);

  // Recipe 1: Main ingredient focused
  recipes.push({
    name: `Fresh ${capitalize(mainIngredients[0].name)} Delight`,
    description: `A delicious recipe showcasing ${mainIngredients[0].name} with complementary flavors`,
    cookingTime: 20,
    difficulty: "Easy",
    servings: 2,
    ingredients: [
      { name: mainIngredients[0].name, amount: "2 cups", available: true },
      { name: mainIngredients[1]?.name || "olive oil", amount: "2 tbsp", available: !!mainIngredients[1] },
      { name: "salt", amount: "to taste", available: false },
      { name: "pepper", amount: "to taste", available: false }
    ],
    instructions: [
      `Prepare the ${mainIngredients[0].name} by washing and cutting as needed`,
      "Heat a pan over medium heat",
      `Cook the ${mainIngredients[0].name} for 10-12 minutes until tender`,
      "Season with salt and pepper to taste",
      "Serve hot and enjoy"
    ],
    calories: 180
  });

  // Recipe 2: Combination dish
  if (mainIngredients.length >= 2) {
    recipes.push({
      name: `${capitalize(mainIngredients[0].name)} and ${capitalize(mainIngredients[1].name)} Stir-Fry`,
      description: `A quick and healthy stir-fry combining ${mainIngredients[0].name} and ${mainIngredients[1].name}`,
      cookingTime: 15,
      difficulty: "Easy",
      servings: 2,
      ingredients: [
        { name: mainIngredients[0].name, amount: "1.5 cups", available: true },
        { name: mainIngredients[1].name, amount: "1.5 cups", available: true },
        { name: "soy sauce", amount: "2 tbsp", available: false },
        { name: "garlic", amount: "2 cloves", available: false },
        { name: "ginger", amount: "1 tsp", available: false }
      ],
      instructions: [
        "Heat oil in a wok over high heat",
        `Add ${mainIngredients[0].name} and ${mainIngredients[1].name}`,
        "Stir-fry for 5-7 minutes",
        "Add soy sauce, garlic, and ginger",
        "Cook for another 3 minutes and serve"
      ],
      calories: 220
    });
  }

  // Recipe 3: Salad/Fresh option
  recipes.push({
    name: `Garden Fresh ${capitalize(mainIngredients[0].name)} Salad`,
    description: `A crisp and refreshing salad featuring ${mainIngredients[0].name}`,
    cookingTime: 10,
    difficulty: "Easy",
    servings: 2,
    ingredients: [
      { name: mainIngredients[0].name, amount: "2 cups", available: true },
      { name: mainIngredients[1]?.name || "lettuce", amount: "1 cup", available: !!mainIngredients[1] },
      { name: mainIngredients[2]?.name || "cucumber", amount: "1/2 cup", available: !!mainIngredients[2] },
      { name: "olive oil", amount: "2 tbsp", available: false },
      { name: "lemon juice", amount: "1 tbsp", available: false }
    ],
    instructions: [
      "Wash and chop all vegetables",
      "Combine in a large bowl",
      "Drizzle with olive oil and lemon juice",
      "Toss well and season to taste",
      "Serve immediately"
    ],
    calories: 150
  });

  // Recipe 4: Roasted/Baked option
  recipes.push({
    name: `Herb-Roasted ${capitalize(mainIngredients[0].name)}`,
    description: `Perfectly roasted ${mainIngredients[0].name} with aromatic herbs`,
    cookingTime: 30,
    difficulty: "Medium",
    servings: 3,
    ingredients: [
      { name: mainIngredients[0].name, amount: "3 cups", available: true },
      { name: "olive oil", amount: "3 tbsp", available: false },
      { name: "rosemary", amount: "1 tsp", available: false },
      { name: "thyme", amount: "1 tsp", available: false },
      { name: "garlic powder", amount: "1/2 tsp", available: false }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      `Prepare ${mainIngredients[0].name} and place in baking dish`,
      "Drizzle with olive oil and sprinkle with herbs",
      "Roast for 25-30 minutes until golden",
      "Serve warm"
    ],
    calories: 200
  });

  // Recipe 5: Soup/Stew option
  recipes.push({
    name: `Hearty ${capitalize(mainIngredients[0].name)} Soup`,
    description: `A comforting soup featuring ${mainIngredients[0].name} and vegetables`,
    cookingTime: 25,
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      { name: mainIngredients[0].name, amount: "2 cups", available: true },
      { name: mainIngredients[1]?.name || "carrots", amount: "1 cup", available: !!mainIngredients[1] },
      { name: "vegetable broth", amount: "4 cups", available: false },
      { name: "onion", amount: "1 medium", available: false },
      { name: "herbs", amount: "to taste", available: false }
    ],
    instructions: [
      "Sauté onions in a large pot until soft",
      `Add ${mainIngredients[0].name} and other vegetables`,
      "Pour in vegetable broth",
      "Simmer for 20 minutes",
      "Season with herbs and serve hot"
    ],
    calories: 160
  });

  return recipes;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
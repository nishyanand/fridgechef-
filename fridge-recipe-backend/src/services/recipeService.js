import dotenv from 'dotenv';

dotenv.config();

export const generateRecipesFromIngredients = async (ingredients) => {
  try {
    console.log('👨‍🍳 Generating recipes...');

    const ingredientNames = ingredients.map(ing => ing.name).join(', ');
    console.log(`📝 Available ingredients: ${ingredientNames}`);

    // Generate dynamic recipes based on detected ingredients
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
      { name: mainIngredients[1]?.name || "vegetables", amount: "1 cup", available: !!mainIngredients[1] },
      { name: "olive oil", amount: "2 tbsp", available: false },
      { name: "salt and pepper", amount: "to taste", available: false }
    ],
    instructions: [
      `Prepare the ${mainIngredients[0].name} by washing and cutting as needed`,
      "Heat olive oil in a pan over medium heat",
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
        { name: "garlic", amount: "2 cloves minced", available: false },
        { name: "ginger", amount: "1 tsp grated", available: false }
      ],
      instructions: [
        "Heat oil in a wok over high heat",
        `Add ${mainIngredients[0].name} and ${mainIngredients[1].name}`,
        "Stir-fry for 5-7 minutes until crisp-tender",
        "Add soy sauce, garlic, and ginger",
        "Cook for another 2-3 minutes and serve over rice"
      ],
      calories: 220
    });
  }

  // Recipe 3: Fresh salad
  recipes.push({
    name: `Garden Fresh ${capitalize(mainIngredients[0].name)} Salad`,
    description: `A crisp and refreshing salad featuring ${mainIngredients[0].name}`,
    cookingTime: 10,
    difficulty: "Easy",
    servings: 2,
    ingredients: [
      { name: mainIngredients[0].name, amount: "2 cups chopped", available: true },
      { name: mainIngredients[1]?.name || "lettuce", amount: "1 cup", available: !!mainIngredients[1] },
      { name: mainIngredients[2]?.name || "cucumber", amount: "1/2 cup sliced", available: !!mainIngredients[2] },
      { name: "olive oil", amount: "2 tbsp", available: false },
      { name: "lemon juice", amount: "1 tbsp", available: false }
    ],
    instructions: [
      "Wash and chop all vegetables into bite-sized pieces",
      "Combine in a large bowl",
      "Drizzle with olive oil and lemon juice",
      "Toss well and season to taste",
      "Serve immediately for best freshness"
    ],
    calories: 150
  });

  // Recipe 4: Roasted option
  recipes.push({
    name: `Herb-Roasted ${capitalize(mainIngredients[0].name)}`,
    description: `Perfectly roasted ${mainIngredients[0].name} with aromatic herbs`,
    cookingTime: 30,
    difficulty: "Medium",
    servings: 3,
    ingredients: [
      { name: mainIngredients[0].name, amount: "3 cups", available: true },
      { name: "olive oil", amount: "3 tbsp", available: false },
      { name: "fresh rosemary", amount: "1 tsp", available: false },
      { name: "fresh thyme", amount: "1 tsp", available: false },
      { name: "garlic powder", amount: "1/2 tsp", available: false }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      `Prepare ${mainIngredients[0].name} and place in a baking dish`,
      "Drizzle with olive oil and sprinkle with herbs and garlic powder",
      "Toss to coat evenly",
      "Roast for 25-30 minutes until golden and tender",
      "Serve warm as a side dish or main course"
    ],
    calories: 200
  });

  // Recipe 5: Soup option
  recipes.push({
    name: `Hearty ${capitalize(mainIngredients[0].name)} Soup`,
    description: `A comforting soup featuring ${mainIngredients[0].name} and vegetables`,
    cookingTime: 25,
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      { name: mainIngredients[0].name, amount: "2 cups chopped", available: true },
      { name: mainIngredients[1]?.name || "carrots", amount: "1 cup diced", available: !!mainIngredients[1] },
      { name: "vegetable broth", amount: "4 cups", available: false },
      { name: "onion", amount: "1 medium diced", available: false },
      { name: "dried herbs", amount: "1 tsp", available: false }
    ],
    instructions: [
      "Sauté diced onions in a large pot until soft and translucent",
      `Add ${mainIngredients[0].name} and other vegetables`,
      "Pour in vegetable broth and bring to a boil",
      "Reduce heat and simmer for 20 minutes",
      "Season with herbs, salt, and pepper to taste",
      "Serve hot with crusty bread"
    ],
    calories: 160
  });

  return recipes;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

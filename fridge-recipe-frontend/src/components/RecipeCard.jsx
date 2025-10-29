import { useState } from 'react';
import { Clock, Users, Flame, ChefHat } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const [showDetails, setShowDetails] = useState(false);

  const missingIngredients = recipe.ingredients?.filter(ing => !ing.available) || [];

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Recipe Icon */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <ChefHat className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {recipe.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {recipe.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {recipe.difficulty}
            </span>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Serves: {recipe.servings}
          </div>

          {/* Missing Ingredients Alert */}
          {missingIngredients.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-xs font-medium text-orange-800 mb-1">Missing:</p>
              <p className="text-xs text-orange-600">
                {missingIngredients.map(ing => ing.name).join(', ')}
              </p>
            </div>
          )}

          {/* Calories */}
          <div className="flex items-center gap-1 text-orange-600 text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            <span>{recipe.calories} calories</span>
          </div>

          {/* View Recipe Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Recipe
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Recipe Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
                  <p className="text-pink-100">{recipe.description}</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.cookingTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span>{recipe.calories} cal</span>
                </div>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                  {recipe.difficulty}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="bg-pink-100 text-pink-600 p-2 rounded-lg">🥘</span>
                  Ingredients
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {recipe.ingredients?.map((ingredient, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 ${
                          ingredient.available ? 'text-gray-700' : 'text-orange-600'
                        }`}
                      >
                        <span className="mt-1">
                          {ingredient.available ? '✓' : '○'}
                        </span>
                        <span>
                          <strong>{ingredient.amount}</strong> {ingredient.name}
                          {!ingredient.available && (
                            <span className="text-xs ml-2 text-orange-500">(need to buy)</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg">👨‍🍳</span>
                  Instructions
                </h3>
                <div className="space-y-4">
                  {recipe.instructions?.map((instruction, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDetails(false)}
                className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
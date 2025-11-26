import { MixRecipe } from '../types';

/**
 * Parses a serving string to extract the number
 * Handles formats like "8 servings", "8", "8-10 servings"
 */
const parseServings = (servings: string): number => {
  const match = servings.match(/(\d+)/);
  return match ? parseInt(match[1]!, 10) : 1;
};

/**
 * Scales an ingredient quantity based on serving ratio
 */
const scaleIngredient = (ingredient: string, ratio: number): string => {
  // Match common measurement patterns
  const patterns = [
    // Fractions: 1/2, 1/4, 3/4
    /(\d+\/\d+|\d+\.\d+|\d+)\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|pound|pounds|stick|sticks|box|boxes|bag|bags|package|packages|can|cans|jar|jars|clove|cloves|head|heads|bunch|bunches)/gi,
    // Whole numbers with units
    /(\d+)\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|pound|pounds|stick|sticks|box|boxes|bag|bags|package|packages|can|cans|jar|jars|clove|cloves|head|heads|bunch|bunches)/gi,
  ];

  for (const pattern of patterns) {
    const match = ingredient.match(pattern);
    if (match) {
      return ingredient.replace(pattern, (match) => {
        // Extract number
        const numberMatch = match.match(/(\d+\/\d+|\d+\.\d+|\d+)/);
        if (!numberMatch) return match;

        const numberStr = numberMatch[1]!;
        let number: number;

        // Handle fractions
        if (numberStr.includes('/')) {
          const parts = numberStr.split('/');
          const num = parts[0] ? Number(parts[0]) : 0;
          const den = parts[1] ? Number(parts[1]) : 1;
          number = num / den;
        } else {
          number = parseFloat(numberStr);
        }

        // Scale the number
        const scaled = number * ratio;

        // Format the result (round to 2 decimals, remove trailing zeros)
        const formatted = scaled.toFixed(2).replace(/\.?0+$/, '');

        return match.replace(numberStr, formatted);
      });
    }
  }

  // If no pattern matches, return original
  return ingredient;
};

/**
 * Scales a recipe to a new number of servings
 */
export const scaleRecipe = (recipe: MixRecipe, newServings: number): MixRecipe => {
  const currentServings = parseServings(recipe.servings);
  if (currentServings === newServings) return recipe;

  const ratio = newServings / currentServings;

  return {
    ...recipe,
    servings: `${newServings} servings`,
    originalServings: recipe.originalServings || recipe.servings,
    ingredients: recipe.ingredients.map((ing) => scaleIngredient(ing, ratio)),
    // Scale nutrition if available
    nutrition: recipe.nutrition
      ? {
          ...recipe.nutrition,
          calories: scaleNutritionValue(recipe.nutrition.calories, ratio),
          totalFat: scaleNutritionValue(recipe.nutrition.totalFat, ratio),
          saturatedFat: recipe.nutrition.saturatedFat
            ? scaleNutritionValue(recipe.nutrition.saturatedFat, ratio)
            : undefined,
          sodium: scaleNutritionValue(recipe.nutrition.sodium, ratio),
          totalCarbohydrate: scaleNutritionValue(recipe.nutrition.totalCarbohydrate, ratio),
          protein: scaleNutritionValue(recipe.nutrition.protein, ratio),
        }
      : undefined,
  };
};

/**
 * Scales a nutrition value string
 */
const scaleNutritionValue = (value: string, ratio: number): string => {
  const match = value.match(/(\d+\.?\d*)/);
  if (!match) return value;

  const number = parseFloat(match[1]!);
  const scaled = number * ratio;
  return value.replace(match[1]!, scaled.toFixed(1));
};

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
  // Match common measurement patterns - single comprehensive pattern
  // Matches: numbers (including fractions and decimals) followed by units
  const pattern = /(\d+\/\d+|\d+\.\d+|\d+)\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|pound|pounds|stick|sticks|box|boxes|bag|bags|package|packages|can|cans|jar|jars|clove|cloves|head|heads|bunch|bunches|piece|pieces|item|items|container|containers|bottle|bottles|packet|packets)/gi;

  // Check if pattern matches (create a new regex to avoid lastIndex issues)
  const testPattern = /(\d+\/\d+|\d+\.\d+|\d+)\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|pound|pounds|stick|sticks|box|boxes|bag|bags|package|packages|can|cans|jar|jars|clove|cloves|head|heads|bunch|bunches|piece|pieces|item|items|container|containers|bottle|bottles|packet|packets)/i;
  if (!testPattern.test(ingredient)) {
    return ingredient;
  }

  // Replace all matches
  return ingredient.replace(pattern, (match) => {
    // Extract number from the match
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

    // Format the result
    let formatted: string;
    if (scaled < 1 && scaled > 0) {
      // For values less than 1, try to use fractions
      const fraction = getFraction(scaled);
      formatted = fraction || scaled.toFixed(2).replace(/\.?0+$/, '');
    } else {
      // Round to 2 decimals, remove trailing zeros
      formatted = scaled.toFixed(2).replace(/\.?0+$/, '');
    }

    // Replace the number in the match with the scaled value
    return match.replace(numberStr, formatted);
  });
};

/**
 * Converts a decimal to a common fraction (for values < 1)
 */
const getFraction = (decimal: number): string | null => {
  const commonFractions: Array<[number, string]> = [
    [0.125, '1/8'],
    [0.25, '1/4'],
    [0.33, '1/3'],
    [0.375, '3/8'],
    [0.5, '1/2'],
    [0.625, '5/8'],
    [0.67, '2/3'],
    [0.75, '3/4'],
    [0.875, '7/8'],
  ];

  for (const [value, fraction] of commonFractions) {
    if (Math.abs(decimal - value) < 0.01) {
      return fraction;
    }
  }

  return null;
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

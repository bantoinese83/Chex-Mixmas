import { MixPreferences, MixRecipe } from '../types';
import { generateRecipeFromAI } from './gemini';

/**
 * Generates multiple recipes in batch
 */
export const generateBatchRecipes = async (
  prefs: MixPreferences,
  count: number = 3
): Promise<MixRecipe[]> => {
  const promises = Array.from({ length: count }, () => generateRecipeFromAI(prefs));
  return Promise.all(promises);
};

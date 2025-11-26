import { MixPreferences, MixRecipe } from '../types';
import { generateRecipeFromAI } from './gemini';

/**
 * Action state type for useActionState
 */
export type GenerateMixState = {
  error: string | null;
  recipe: MixRecipe | null;
} | null;

/**
 * Action function for useActionState
 * Separated from context to maintain separation of concerns
 * Business logic for recipe generation
 */
export const generateMixAction = async (
  _prevState: GenerateMixState,
  prefs: MixPreferences
): Promise<GenerateMixState> => {
  try {
    const recipe = await generateRecipeFromAI(prefs);
    return { error: null, recipe };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong in the workshop.';
    return { error: errorMessage, recipe: null };
  }
};

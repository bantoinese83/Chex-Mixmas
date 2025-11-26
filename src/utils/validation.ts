import { MixRecipe, MixPreferences } from '../types';

/**
 * Validates that a recipe object has the required structure
 * Centralized validation to eliminate duplication (DRY)
 */
export const isValidRecipe = (recipe: unknown): recipe is MixRecipe => {
  if (!recipe || typeof recipe !== 'object') return false;
  const r = recipe as Record<string, unknown>;
  return (
    typeof r['id'] === 'string' &&
    typeof r['title'] === 'string' &&
    typeof r['description'] === 'string' &&
    Array.isArray(r['ingredients']) &&
    Array.isArray(r['instructions']) &&
    typeof r['prepTime'] === 'string' &&
    typeof r['servings'] === 'string' &&
    typeof r['createdAt'] === 'number'
  );
};

/**
 * Validates that preferences object has the required structure
 */
export const isValidPreferences = (prefs: unknown): prefs is MixPreferences => {
  if (!prefs || typeof prefs !== 'object') return false;
  const p = prefs as Record<string, unknown>;
  return (
    typeof p['vibe'] === 'string' &&
    Array.isArray(p['baseIngredients']) &&
    Array.isArray(p['mixIns']) &&
    Array.isArray(p['dietary']) &&
    typeof p['spiceLevel'] === 'number' &&
    typeof p['christmasSpirit'] === 'boolean' &&
    typeof p['thcInfused'] === 'boolean'
  );
};

import { MixRecipe, MixPreferences } from '../types';
import { isValidRecipe, isValidPreferences } from '../utils/validation';

// Storage keys with versioning
const STORAGE_KEYS = {
  RECIPES: 'mixmas_saved_recipes_v2',
  PREFERENCES: 'mixmas_form_preferences_v1',
  VIEW_STATE: 'mixmas_view_state_v1',
} as const;

// Storage version for migration support
const STORAGE_VERSION = 2;

/**
 * Attempts to free storage space by removing legacy keys
 * Single responsibility: only handles cleanup
 */
const freeStorageSpace = (): void => {
  try {
    localStorage.removeItem('mixmas_saved_recipes_v1');
  } catch {
    // Ignore cleanup errors
  }
};

/**
 * Logs storage errors with context
 * Single responsibility: only handles error reporting
 */
const logStorageError = (error: unknown, operation: string): void => {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    console.warn('Storage quota exceeded. Attempting to free space...');
    freeStorageSpace();
    console.error(`Failed to ${operation}: Storage quota exceeded. Please free up space.`);
  } else {
    console.error(`Failed to ${operation}:`, error);
  }
};

/**
 * Safely gets an item from localStorage with error handling
 */
const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    logStorageError(error, 'read from storage');
    return null;
  }
};

/**
 * Safely sets an item in localStorage with error handling and quota management
 */
const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    logStorageError(error, 'write to storage');
    return false;
  }
};

/**
 * Saves recipes to localStorage with validation and error handling
 */
export const saveRecipesToStorage = (recipes: MixRecipe[]): void => {
  // Validate all recipes before saving
  const validRecipes = recipes.filter(isValidRecipe);

  if (validRecipes.length !== recipes.length) {
    console.warn(
      `Filtered out ${recipes.length - validRecipes.length} invalid recipes before saving.`
    );
  }

  try {
    const data = JSON.stringify({
      version: STORAGE_VERSION,
      recipes: validRecipes,
      timestamp: Date.now(),
    });
    safeSetItem(STORAGE_KEYS.RECIPES, data);
  } catch (error) {
    logStorageError(error, 'save recipes');
  }
};

/**
 * Loads recipes from localStorage with validation and migration support
 */
export const loadRecipesFromStorage = (): MixRecipe[] => {
  try {
    const data = safeGetItem(STORAGE_KEYS.RECIPES);
    if (!data) return [];

    const parsed = JSON.parse(data);

    // Handle versioned storage format
    if (parsed && typeof parsed === 'object' && 'recipes' in parsed) {
      const recipes = Array.isArray(parsed.recipes) ? parsed.recipes : [];
      const validRecipes = recipes.filter(isValidRecipe);

      if (validRecipes.length !== recipes.length) {
        console.warn(
          `Filtered out ${recipes.length - validRecipes.length} invalid recipes on load.`
        );
      }

      return validRecipes;
    }

    // Handle legacy format (array directly)
    if (Array.isArray(parsed)) {
      const validRecipes = parsed.filter(isValidRecipe);
      // Migrate to new format
      if (validRecipes.length > 0) {
        saveRecipesToStorage(validRecipes);
      }
      return validRecipes;
    }

    return [];
  } catch (error) {
    logStorageError(error, 'load recipes');
    return [];
  }
};

/**
 * Saves form preferences to localStorage
 */
export const savePreferencesToStorage = (preferences: MixPreferences): void => {
  if (!isValidPreferences(preferences)) {
    console.warn('Invalid preferences object, not saving to storage');
    return;
  }

  try {
    const data = JSON.stringify({
      version: 1,
      preferences,
      timestamp: Date.now(),
    });
    safeSetItem(STORAGE_KEYS.PREFERENCES, data);
  } catch (error) {
    logStorageError(error, 'save preferences');
  }
};

/**
 * Loads form preferences from localStorage
 */
export const loadPreferencesFromStorage = (): MixPreferences | null => {
  try {
    const data = safeGetItem(STORAGE_KEYS.PREFERENCES);
    if (!data) return null;

    const parsed = JSON.parse(data);

    if (parsed && typeof parsed === 'object' && 'preferences' in parsed) {
      const prefs = parsed.preferences;
      if (isValidPreferences(prefs)) {
        return prefs;
      }
    }

    return null;
  } catch (error) {
    logStorageError(error, 'load preferences');
    return null;
  }
};

/**
 * Saves view state to localStorage
 */
export const saveViewStateToStorage = (view: string): void => {
  try {
    safeSetItem(STORAGE_KEYS.VIEW_STATE, JSON.stringify({ view, timestamp: Date.now() }));
  } catch (error) {
    logStorageError(error, 'save view state');
  }
};

/**
 * Loads view state from localStorage
 */
export const loadViewStateFromStorage = (): string | null => {
  try {
    const data = safeGetItem(STORAGE_KEYS.VIEW_STATE);
    if (!data) return null;

    const parsed = JSON.parse(data);
    if (parsed && typeof parsed === 'object' && typeof parsed.view === 'string') {
      return parsed.view;
    }

    return null;
  } catch (error) {
    logStorageError(error, 'load view state');
    return null;
  }
};

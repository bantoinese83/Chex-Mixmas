import { MixRecipe } from '../types';

export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc' | 'rating';

export interface RecipeFilters {
  searchTerm: string;
  tags: string[];
  flavorProfile?: string;
  dietary?: string[];
  isFavorite?: boolean;
  collection?: string;
  difficulty?: string;
  minRating?: number;
}

/**
 * Searches recipes by title, description, and ingredients
 */
export const searchRecipes = (recipes: MixRecipe[], searchTerm: string): MixRecipe[] => {
  if (!searchTerm.trim()) return recipes;

  const lowerSearch = searchTerm.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerSearch) ||
      recipe.description.toLowerCase().includes(lowerSearch) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(lowerSearch)) ||
      recipe.tags?.some((tag) => tag.toLowerCase().includes(lowerSearch))
  );
};

/**
 * Filters recipes based on criteria
 */
export const filterRecipes = (recipes: MixRecipe[], filters: RecipeFilters): MixRecipe[] => {
  let filtered = recipes;

  // Search term
  if (filters.searchTerm) {
    filtered = searchRecipes(filtered, filters.searchTerm);
  }

  // Tags
  if (filters.tags.length > 0) {
    filtered = filtered.filter((recipe) => filters.tags.every((tag) => recipe.tags?.includes(tag)));
  }

  // Flavor profile (from preferences)
  if (filters.flavorProfile) {
    filtered = filtered.filter((recipe) => recipe.preferences?.vibe === filters.flavorProfile);
  }

  // Dietary restrictions
  if (filters.dietary && filters.dietary.length > 0) {
    filtered = filtered.filter((recipe) =>
      filters.dietary!.some((diet) => recipe.preferences?.dietary.includes(diet))
    );
  }

  // Favorites
  if (filters.isFavorite !== undefined) {
    filtered = filtered.filter((recipe) => recipe.isFavorite === filters.isFavorite);
  }

  // Collection
  if (filters.collection) {
    filtered = filtered.filter((recipe) => recipe.collection === filters.collection);
  }

  // Difficulty
  if (filters.difficulty) {
    filtered = filtered.filter((recipe) => recipe.difficulty === filters.difficulty);
  }

  // Minimum rating
  if (filters.minRating !== undefined) {
    filtered = filtered.filter((recipe) => (recipe.rating ?? 0) >= filters.minRating!);
  }

  return filtered;
};

/**
 * Sorts recipes based on option
 */
export const sortRecipes = (recipes: MixRecipe[], sortBy: SortOption): MixRecipe[] => {
  const sorted = [...recipes];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating':
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default:
      return sorted;
  }
};

/**
 * Filters ingredients based on a search term
 */
export const filterIngredients = (ingredients: readonly string[], searchTerm: string): string[] => {
  if (!searchTerm.trim()) {
    return [...ingredients];
  }

  const lowerSearch = searchTerm.toLowerCase();
  return ingredients.filter((item) => item.toLowerCase().includes(lowerSearch));
};

/**
 * Extracts ingredient names from recipe ingredients by removing measurements
 * Used for generating search queries
 */
export const extractIngredientNames = (ingredients: string[], limit: number = 5): string[] => {
  return ingredients
    .slice(0, limit)
    .map((item) => {
      // Remove common measurements and quantities
      return item
        .replace(
          /^[\d./\-\s]+(cup|cups|tbsp|tsp|tablespoon|teaspoon|oz|ounce|lb|pound|stick|box|bag|package|can|jar)s?\.?\s+/gi,
          ''
        )
        .replace(/\(.*?\)/g, '') // Remove parentheticals
        .trim();
    })
    .filter(Boolean);
};

/**
 * Creates an Amazon search URL from ingredient names
 */
export const createAmazonSearchUrl = (ingredientNames: string[]): string => {
  const searchQuery = ingredientNames.join(' ');
  return `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;
};

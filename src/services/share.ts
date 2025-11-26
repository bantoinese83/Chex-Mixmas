import { MixRecipe } from '../types';
import { isValidRecipe } from '../utils/validation';

const MAX_URL_LENGTH = 10000; // Prevent DoS attacks with extremely long URLs

export const generateShareUrl = (recipe: MixRecipe): string => {
  try {
    const json = JSON.stringify(recipe);
    // Encode to base64, handling UTF-8 characters (emojis, etc.)
    const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(json)));

    // Validate encoded length to prevent URL length issues
    if (encoded.length > MAX_URL_LENGTH) {
      throw new Error('Recipe data too large to share via URL');
    }

    const url = new URL(window.location.href);
    url.searchParams.set('r', encoded);
    return url.toString();
  } catch (e) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error generating share URL', e);
    }
    return window.location.href;
  }
};

export const getRecipeFromUrl = (): MixRecipe | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('r');
    if (!encoded) return null;

    // Validate length to prevent DoS attacks
    if (encoded.length > MAX_URL_LENGTH) {
      return null;
    }

    // Decode from base64 back to UTF-8
    const json = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
    const recipe = JSON.parse(json);

    // Validate recipe structure before returning
    if (isValidRecipe(recipe)) {
      return recipe;
    }

    return null;
  } catch (e) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error parsing recipe from URL', e);
    }
    return null;
  }
};

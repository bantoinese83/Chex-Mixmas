import { MixRecipe } from '../types';
import { generateShareUrl } from '../services/share';

/**
 * Shares recipe to Twitter/X
 */
export const shareToTwitter = (recipe: MixRecipe): void => {
  const url = generateShareUrl(recipe);
  const text = `Check out this amazing recipe: ${recipe.title}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
};

/**
 * Shares recipe to Facebook
 */
export const shareToFacebook = (recipe: MixRecipe): void => {
  const url = generateShareUrl(recipe);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
};

/**
 * Shares recipe to Pinterest
 */
export const shareToPinterest = (recipe: MixRecipe): void => {
  const url = generateShareUrl(recipe);
  const description = `${recipe.title} - ${recipe.description}`;
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`;
  window.open(pinterestUrl, '_blank', 'width=550,height=420');
};

/**
 * Exports recipe as PDF (using browser print)
 */
export const exportToPDF = (): void => {
  window.print();
};

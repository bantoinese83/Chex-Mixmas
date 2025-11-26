import { useCallback } from 'react';
import { MixRecipe } from '../types';
import { generateShareUrl } from '../services/share';
import { extractIngredientNames, createAmazonSearchUrl } from '../utils/ingredients';
import { useTimeoutState } from './useTimeoutState';
import { useToastContext } from '../context/ToastContext';
import { TIMEOUTS } from '../constants/theme';

interface UseRecipeActionsReturn {
  copySuccess: boolean;
  saveSuccess: boolean;
  handleShare: (recipe: MixRecipe) => Promise<void>;
  handleSave: (recipe: MixRecipe, onSave: (recipe: MixRecipe) => void) => void;
  handleBuyIngredients: (recipe: MixRecipe) => void;
}

/**
 * Custom hook for recipe actions (share, save, buy ingredients)
 * Separates business logic from UI components
 * Uses useTimeoutState to eliminate setTimeout duplication (DRY)
 */
export const useRecipeActions = (): UseRecipeActionsReturn => {
  const [copySuccess, setCopySuccess] = useTimeoutState(false, TIMEOUTS.COPY_SUCCESS);
  const [saveSuccess, setSaveSuccess] = useTimeoutState(false, TIMEOUTS.SUCCESS_MESSAGE);
  const { success, error: showError } = useToastContext();

  const handleShare = useCallback(
    async (recipe: MixRecipe) => {
      const url = generateShareUrl(recipe);
      try {
        await navigator.clipboard.writeText(url);
        setCopySuccess(true);
        success('Recipe link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy', err);
        showError('Failed to copy link. Please try again.');
      }
    },
    [setCopySuccess, success, showError]
  );

  const handleSave = useCallback(
    (recipe: MixRecipe, onSave: (recipe: MixRecipe) => void) => {
      onSave(recipe);
      setSaveSuccess(true);
      success('Recipe saved! You can find it in "My Recipes".');
    },
    [setSaveSuccess, success]
  );

  const handleBuyIngredients = useCallback((recipe: MixRecipe) => {
    const ingredientNames = extractIngredientNames(recipe.ingredients);
    const url = createAmazonSearchUrl(ingredientNames);
    window.open(url, '_blank');
    success('Opening shopping list in a new tab...');
  }, [success]);

  return {
    copySuccess,
    saveSuccess,
    handleShare,
    handleSave,
    handleBuyIngredients,
  };
};

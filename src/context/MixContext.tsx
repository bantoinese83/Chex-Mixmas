import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useActionState,
  useOptimistic,
  useTransition,
  startTransition,
  ReactNode,
} from 'react';
import { MixContextType, MixPreferences, MixRecipe, ViewState } from '../types';
import {
  loadRecipesFromStorage,
  saveRecipesToStorage,
  loadViewStateFromStorage,
  saveViewStateToStorage,
} from '../services/storage';
import { getRecipeFromUrl } from '../services/share';
import { generateMixAction } from '../services/recipeActions';
import { TIMEOUTS } from '../constants/theme';

const MixContext = createContext<MixContextType | undefined>(undefined);

// Debounce utility for storage operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const MixProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setView] = useState<ViewState>('generator');
  const [generatedRecipe, setGeneratedRecipe] = useState<MixRecipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<MixRecipe[]>([]);
  const [actionState, generateMixActionDispatch, isPending] = useActionState(
    generateMixAction,
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isPendingSave, startTransitionSave] = useTransition();

  // Optimistic updates for saved recipes
  const [optimisticRecipes, addOptimisticRecipe] = useOptimistic(
    savedRecipes,
    (state: MixRecipe[], newRecipe: MixRecipe) => {
      // Check if recipe already exists
      if (state.find((r) => r.id === newRecipe.id)) {
        return state;
      }
      return [newRecipe, ...state];
    }
  );

  // Use Set for O(1) recipe ID lookups instead of O(n) array.find()
  const savedRecipeIds = useMemo(
    () => new Set(optimisticRecipes.map((r) => r.id)),
    [optimisticRecipes]
  );

  // Debounced storage save to prevent excessive writes
  const debouncedSave = useRef(
    debounce((recipes: MixRecipe[]) => {
      saveRecipesToStorage(recipes);
    }, TIMEOUTS.DEBOUNCE_SAVE)
  ).current;

  // Load persisted data and check for shared link on mount
  useEffect(() => {
    // 1. Load saved recipes
    const loaded = loadRecipesFromStorage();
    setSavedRecipes(loaded);

    // 2. Load and restore view state
    const savedView = loadViewStateFromStorage();
    // Type guard for safe view state validation
    const isValidView = (view: string): view is ViewState => {
      return ['generator', 'recipe', 'saved', 'notFound', 'edit'].includes(view);
    };
    if (savedView && isValidView(savedView)) {
      setView(savedView);
    }

    // 3. Check for shared recipe in URL (takes priority over saved view)
    const sharedRecipe = getRecipeFromUrl();
    if (sharedRecipe) {
      setGeneratedRecipe(sharedRecipe);
      setView('recipe');
      // Clean URL to prevent clutter without refreshing
      window.history.replaceState({}, '', window.location.pathname);
    } else if (window.location.search.includes('r=')) {
      // Invalid shared recipe link - show 404
      setView('notFound');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Debounced save to storage whenever recipes change
  // Note: debouncedSave is stable from useRef, doesn't need to be in deps
  useEffect(() => {
    debouncedSave(savedRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedRecipes]);

  // Sync optimistic recipes with actual saved recipes
  useEffect(() => {
    if (!isPendingSave && optimisticRecipes.length !== savedRecipes.length) {
      // If transition is complete and counts don't match, sync them
      // This handles the case where optimistic update was rolled back
      setSavedRecipes(optimisticRecipes);
    }
  }, [isPendingSave, optimisticRecipes, savedRecipes]);

  // Persist view state changes
  useEffect(() => {
    saveViewStateToStorage(currentView);
  }, [currentView]);

  // Handle action state updates
  useEffect(() => {
    if (actionState?.recipe) {
      setGeneratedRecipe(actionState.recipe);
      setView('recipe');
    }
    if (actionState?.error) {
      setError(actionState.error);
    }
  }, [actionState]);

  // Wrapper for generateMix to match existing API
  // Wrap in startTransition to properly handle async action state
  const generateMix = useCallback(
    (prefs: MixPreferences): Promise<void> => {
      startTransition(() => {
        generateMixActionDispatch(prefs);
      });
      return Promise.resolve();
    },
    [generateMixActionDispatch]
  );

  // Add recipe to state (single responsibility: only updates state)
  const addRecipeToState = useCallback((recipe: MixRecipe) => {
    setSavedRecipes((prev) => {
      if (!prev.find((r) => r.id === recipe.id)) {
        return [recipe, ...prev];
      }
      return prev;
    });
  }, []);

  // Save recipe with optimistic updates
  // Single responsibility: orchestrates optimistic update and state save
  const saveRecipe = useCallback(
    (recipe: MixRecipe) => {
      if (savedRecipeIds.has(recipe.id)) {
        return; // Already saved
      }

      // Optimistically add to UI immediately
      addOptimisticRecipe(recipe);

      // Actually save in background transition
      startTransitionSave(() => {
        addRecipeToState(recipe);
      });
    },
    [savedRecipeIds, addOptimisticRecipe, addRecipeToState, startTransitionSave]
  );

  // Optimized: Direct filter without find() - already O(n) but cleaner
  // Also updates optimistic state
  const deleteRecipe = useCallback((id: string) => {
    // Update both optimistic and actual state
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
    // Optimistic state will sync via useEffect
  }, []);

  // Update recipe with partial updates
  const updateRecipe = useCallback((id: string, updates: Partial<MixRecipe>) => {
    setSavedRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((id: string) => {
    setSavedRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  }, []);

  // Add tag to recipe
  const addTag = useCallback((id: string, tag: string) => {
    setSavedRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const tags = r.tags || [];
          if (!tags.includes(tag)) {
            return { ...r, tags: [...tags, tag] };
          }
        }
        return r;
      })
    );
  }, []);

  // Remove tag from recipe
  const removeTag = useCallback((id: string, tag: string) => {
    setSavedRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id && r.tags) {
          return { ...r, tags: r.tags.filter((t) => t !== tag) };
        }
        return r;
      })
    );
  }, []);

  // Set collection for recipe
  const setCollection = useCallback((id: string, collection: string | null) => {
    setSavedRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, collection: collection || undefined } : r))
    );
  }, []);

  // Set rating for recipe
  const setRating = useCallback((id: string, rating: number) => {
    setSavedRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, rating } : r)));
  }, []);

  const clearError = useCallback(() => setError(null), []);

  // Memoize context value to prevent unnecessary re-renders
  // Note: setView and setGeneratedRecipe are stable from useState, don't need to be in deps
  const contextValue = useMemo<MixContextType>(
    () => ({
      currentView,
      setView,
      generatedRecipe,
      setGeneratedRecipe,
      savedRecipes: optimisticRecipes,
      isGenerating: isPending,
      error,
      generateMix,
      saveRecipe,
      updateRecipe,
      deleteRecipe,
      clearError,
      toggleFavorite,
      addTag,
      removeTag,
      setCollection,
      setRating,
    }),
    [
      currentView,
      generatedRecipe,
      optimisticRecipes,
      isPending,
      error,
      generateMix,
      saveRecipe,
      updateRecipe,
      deleteRecipe,
      clearError,
      toggleFavorite,
      addTag,
      removeTag,
      setCollection,
      setRating,
    ]
  );

  return <MixContext.Provider value={contextValue}>{children}</MixContext.Provider>;
};

export const useMix = () => {
  const context = useContext(MixContext);
  if (!context) {
    throw new Error('useMix must be used within a MixProvider');
  }
  return context;
};

import React, { useCallback, useEffect, useRef, useEffectEvent, useState } from 'react';
import { useMix } from '../../context/MixContext';
import { MixRecipe } from '../../types';
import { SavedRecipes } from '../SavedRecipes';
import { useRecipeActions } from '../../hooks/useRecipeActions';
import { RecipeHeader } from './RecipeHeader';
import { RecipeInfoBar } from './RecipeInfoBar';
import { IngredientsList } from './IngredientsList';
import { InstructionsSection } from './InstructionsSection';
import { RecipeEditor } from './RecipeEditor';
import { RecipeActions } from './RecipeActions';
import { TIMEOUTS } from '../../constants/theme';

export const RecipeCard: React.FC = () => {
  const { generatedRecipe, saveRecipe, updateRecipe } = useMix();
  const [isEditing, setIsEditing] = useState(false);
  const { copySuccess, saveSuccess, handleShare, handleSave, handleBuyIngredients } =
    useRecipeActions();
  const recipeRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to recipe when it's generated
  useEffect(() => {
    if (generatedRecipe && recipeRef.current) {
      setTimeout(() => {
        recipeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, TIMEOUTS.SCROLL_DELAY);
    }
  }, [generatedRecipe]);

  // Create stable event handlers using useEffectEvent
  // These always have access to the latest values without causing re-subscriptions
  const onSaveEvent = useEffectEvent((recipe: MixRecipe) => {
    handleSave(recipe, saveRecipe);
  });

  const onPrintEvent = useEffectEvent(() => {
    window.print();
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && generatedRecipe) {
        e.preventDefault();
        onSaveEvent(generatedRecipe); // Always has latest recipe
      }
      // Ctrl/Cmd + P to print
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        onPrintEvent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatedRecipe]); // Only re-subscribe when recipe changes - useEffectEvent handlers are stable

  // Memoize event handlers to prevent unnecessary re-renders
  // Must be called before early return to follow React hooks rules
  const onSave = useCallback(() => {
    if (generatedRecipe) handleSave(generatedRecipe, saveRecipe);
  }, [generatedRecipe, saveRecipe, handleSave]);
  const onShare = useCallback(() => {
    if (generatedRecipe) {
      void handleShare(generatedRecipe);
    }
  }, [generatedRecipe, handleShare]);
  const onBuyIngredients = useCallback(() => {
    if (generatedRecipe) handleBuyIngredients(generatedRecipe);
  }, [generatedRecipe, handleBuyIngredients]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSaveEdit = useCallback(
    (updated: MixRecipe) => {
      updateRecipe(generatedRecipe!.id, updated);
      setIsEditing(false);
    },
    [generatedRecipe, updateRecipe]
  );

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  if (!generatedRecipe) return null;

  if (isEditing) {
    return (
      <div className="w-full bg-white animate-fade-in-up">
        <RecipeEditor
          recipe={generatedRecipe}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div ref={recipeRef} className="w-full bg-white animate-fade-in-up print:animate-none">
      <RecipeHeader
        recipe={generatedRecipe}
        onShare={onShare}
        onSave={onSave}
        copySuccess={copySuccess}
        saveSuccess={saveSuccess}
      />

      <RecipeInfoBar recipe={generatedRecipe} onBuyIngredients={onBuyIngredients} />

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-12 print:grid-cols-12 print:gap-8 print:py-8">
        <IngredientsList recipe={generatedRecipe} />
        <InstructionsSection recipe={generatedRecipe} />
        <div className="md:col-span-12 print:hidden">
          <RecipeActions recipe={generatedRecipe} onEdit={handleEdit} />
        </div>
      </div>

      <div className="bg-[#fafafa] py-16 border-t border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-center font-bold text-slate-800 mb-12">
            You may also like
          </h2>
          <SavedRecipes isGrid={true} />
        </div>
      </div>
    </div>
  );
};

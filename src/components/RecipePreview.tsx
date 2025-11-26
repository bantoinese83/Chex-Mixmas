import React from 'react';
import { MixRecipe } from '../types';
import { RecipeHeader } from './RecipeCard/RecipeHeader';
import { RecipeInfoBar } from './RecipeCard/RecipeInfoBar';
import { IngredientsList } from './RecipeCard/IngredientsList';
import { InstructionsSection } from './RecipeCard/InstructionsSection';

interface RecipePreviewProps {
  recipe: MixRecipe;
  onSave: () => void;
  onCancel: () => void;
}

export const RecipePreview: React.FC<RecipePreviewProps> = ({ recipe, onSave, onCancel }) => {
  return (
    <div className="w-full bg-white">
      <div className="sticky top-0 bg-white border-b border-slate-200 p-4 z-10 flex items-center justify-between shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Preview Recipe</h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#D31212] text-white rounded-sm hover:bg-red-800 transition-colors"
          >
            Save Recipe
          </button>
        </div>
      </div>

      <RecipeHeader
        recipe={recipe}
        onShare={() => {}}
        onSave={onSave}
        copySuccess={false}
        saveSuccess={false}
      />

      <RecipeInfoBar recipe={recipe} onBuyIngredients={() => {}} />

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-12">
        <IngredientsList recipe={recipe} />
        <InstructionsSection recipe={recipe} />
      </div>
    </div>
  );
};

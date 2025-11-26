import React from 'react';
import { MixRecipe } from '../../types';

interface RecipeInfoBarProps {
  recipe: MixRecipe;
  onBuyIngredients: () => void;
}

export const RecipeInfoBar: React.FC<RecipeInfoBarProps> = ({ recipe, onBuyIngredients }) => {
  return (
    <div className="bg-[#f3f4f6] border-y border-slate-200 print:bg-transparent print:border-black print:border-y-2 print:py-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row print:flex-row">
        <div className="flex-1 py-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 print:border-none print:py-2 print:justify-start print:flex-none print:mr-8">
          <span className="text-slate-500 uppercase text-sm tracking-wider mr-2 print:text-black">
            Servings:
          </span>
          <span className="font-bold text-slate-900 text-lg print:text-black">
            {recipe.servings}
          </span>
        </div>
        <div className="flex-1 py-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 print:border-none print:py-2 print:justify-start print:flex-none">
          <span className="text-slate-500 uppercase text-sm tracking-wider mr-2 print:text-black">
            Time:
          </span>
          <span className="font-bold text-slate-900 text-lg print:text-black">
            {recipe.prepTime}
          </span>
        </div>
        {recipe.difficulty && (
          <div className="flex-1 py-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 print:border-none print:py-2 print:justify-start print:flex-none">
            <span className="text-slate-500 uppercase text-sm tracking-wider mr-2 print:text-black">
              Difficulty:
            </span>
            <span className="font-bold text-slate-900 text-lg print:text-black capitalize">
              {recipe.difficulty}
            </span>
          </div>
        )}
        <button
          onClick={onBuyIngredients}
          className="flex-1 bg-[#D31212] py-6 flex items-center justify-center cursor-pointer hover:bg-red-800 transition-all group print:hidden shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Buy ingredients online"
        >
          <span className="text-white font-bold uppercase tracking-wide flex items-center gap-2">
            Buy Ingredients
            <span className="bg-white text-[#D31212] text-[10px] px-2 py-0.5 rounded font-black transform group-hover:scale-110 transition-transform">
              ONE CLICK
            </span>
          </span>
          <span className="ml-2 text-white transform group-hover:translate-x-1 transition-transform">
            ▶
          </span>
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { MixRecipe } from '../../types';
import { scaleRecipe } from '../../utils/recipeScaling';
import { Icon } from '../ui/Icon';

interface RecipeScalingProps {
  recipe: MixRecipe;
  onScaled: (scaledRecipe: MixRecipe) => void;
}

export const RecipeScaling: React.FC<RecipeScalingProps> = ({ recipe, onScaled }) => {
  const parseServingsFromRecipe = (servingsStr: string): number => {
    const match = servingsStr.match(/(\d+)/);
    return match ? parseInt(match[1]!, 10) : 8;
  };

  const [servings, setServings] = useState(() => parseServingsFromRecipe(recipe.servings));
  const [isOpen, setIsOpen] = useState(false);

  // Update servings when recipe changes
  useEffect(() => {
    const currentServings = parseServingsFromRecipe(recipe.servings);
    setServings(currentServings);
  }, [recipe.servings]);

  const handleScale = () => {
    if (servings < 1 || servings > 100) {
      return;
    }
    const scaled = scaleRecipe(recipe, servings);
    onScaled(scaled);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-[#D31212] font-semibold hover:text-red-800 transition-colors"
      >
        <Icon name="users" size={16} />
        Scale Recipe
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-sm shadow-lg p-4 z-50 min-w-[250px]">
          <h4 className="font-bold text-slate-800 mb-3">Adjust Servings</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Number of Servings</label>
              <input
                type="number"
                min="1"
                max="100"
                value={servings}
                onChange={(e) => setServings(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleScale}
                className="flex-1 bg-[#D31212] text-white font-semibold py-2 px-4 rounded-sm hover:bg-red-800 transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-sm hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useCallback } from 'react';
import { MixRecipe } from '../../types';
import { FormattedText } from '../../utils/textFormatting';
import { NutritionFactsComponent } from './NutritionFacts';
import { Icon } from '../ui/Icon';
import { useTimeoutState } from '../../hooks/useTimeoutState';
import { TIMEOUTS } from '../../constants/theme';

interface IngredientsListProps {
  recipe: MixRecipe;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({ recipe }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [copySuccess, setCopySuccess] = useTimeoutState(false, TIMEOUTS.SUCCESS_MESSAGE);

  const toggleIngredient = useCallback((index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const copyIngredients = useCallback(async () => {
    const ingredientsText = recipe.ingredients.join('\n');
    try {
      await navigator.clipboard.writeText(ingredientsText);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy ingredients:', err);
    }
  }, [recipe.ingredients, setCopySuccess]);

  return (
    <div className="md:col-span-4 print:col-span-4 animate-slide-in-left">
      <div className="mb-8 print:mb-4">
        <div className="flex items-start justify-between gap-4 mb-2 print:block">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 print:text-black print:border-black flex-1">
            Ingredients
          </h2>
          <button
            onClick={copyIngredients}
            className="hidden md:flex items-center gap-2 text-sm text-[#D31212] font-semibold hover:text-red-800 transition-colors print:hidden whitespace-nowrap mt-1"
            title="Copy ingredients to clipboard"
          >
            {copySuccess ? (
              <>
                <Icon name="sparkles" size={16} />
                Copied!
              </>
            ) : (
              <>
                <Icon name="clipboard" size={16} />
                Copy List
              </>
            )}
          </button>
        </div>
      </div>
      <ul className="space-y-3 print:space-y-2">
        {recipe.ingredients.map((ing, i) => {
          const isChecked = checkedIngredients.has(i);
          return (
            <li
              key={i}
              className={`flex items-start text-slate-700 leading-relaxed print:text-black transition-all duration-200 ${
                isChecked ? 'opacity-60 line-through' : ''
              }`}
            >
              <button
                onClick={() => toggleIngredient(i)}
                className="mr-3 mt-1 flex-shrink-0 print:hidden focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 rounded"
                aria-label={isChecked ? `Uncheck ${ing}` : `Check ${ing}`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                    isChecked
                      ? 'bg-[#D31212] border-[#D31212]'
                      : 'border-slate-300 hover:border-[#D31212]'
                  }`}
                >
                  {isChecked && <Icon name="check" size={14} className="text-white" />}
                </div>
              </button>
              <span className="hidden print:inline mr-3 text-[#D31212] font-bold">•</span>
              <span className="flex-1">
                <FormattedText text={ing} />
              </span>
            </li>
          );
        })}
      </ul>

      {recipe.nutrition && <NutritionFactsComponent nutrition={recipe.nutrition} />}
    </div>
  );
};

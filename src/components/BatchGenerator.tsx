import React, { useState } from 'react';
import { useMix } from '../context/MixContext';
import { MixRecipe } from '../types';
import { generateBatchRecipes } from '../services/batchRecipeActions';

export const BatchGenerator: React.FC = () => {
  const { savedRecipes, saveRecipe, isGenerating } = useMix();
  const [count, setCount] = useState(3);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<
    Array<{ recipe: MixRecipe; saved: boolean }>
  >([]);

  const handleBatchGenerate = async () => {
    // Get current preferences
    const saved = localStorage.getItem('mixmas_form_preferences_v1');
    if (!saved) {
      alert('Please configure your preferences first');
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (parsed.preferences) {
        setIsGeneratingBatch(true);
        const recipes = await generateBatchRecipes(parsed.preferences, count);
        setGeneratedRecipes(
          recipes.map((recipe) => ({
            recipe,
            saved: savedRecipes.some((r) => r.id === recipe.id),
          }))
        );
        setIsGeneratingBatch(false);
      }
    } catch (error) {
      console.error('Batch generation failed:', error);
      setIsGeneratingBatch(false);
    }
  };

  const handleSaveRecipe = (recipe: MixRecipe) => {
    saveRecipe(recipe);
    setGeneratedRecipes((prev) =>
      prev.map((item) => (item.recipe.id === recipe.id ? { ...item, saved: true } : item))
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8 text-center">
        Batch Recipe Generator
      </h1>

      <div className="bg-white border border-slate-200 rounded-sm p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <label className="font-semibold text-slate-700">Generate</label>
          <input
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1)))}
            className="w-20 px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
          />
          <span className="text-slate-600">recipes at once</span>
        </div>
        <button
          onClick={handleBatchGenerate}
          disabled={isGeneratingBatch || isGenerating}
          className="w-full px-6 py-3 bg-[#D31212] text-white font-bold rounded-sm hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingBatch ? 'Generating Recipes...' : 'Generate Batch'}
        </button>
      </div>

      {generatedRecipes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Generated Recipes</h2>
          {generatedRecipes.map(({ recipe, saved }) => (
            <div
              key={recipe.id}
              className="bg-white border border-slate-200 rounded-sm p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{recipe.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{recipe.description}</p>
                </div>
                <button
                  onClick={() => handleSaveRecipe(recipe)}
                  disabled={saved}
                  className={`ml-4 px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${
                    saved
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-[#D31212] text-white hover:bg-red-800'
                  }`}
                >
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>
              <div className="text-xs text-slate-500">
                {recipe.servings} • {recipe.prepTime} • {recipe.ingredients.length} ingredients
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

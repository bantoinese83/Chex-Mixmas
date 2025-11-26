import React, { useState, useEffect } from 'react';
import { useMix } from '../context/MixContext';
import { MixRecipe } from '../types';
import { Icon } from './ui/Icon';
import { SearchAndFilter } from './SavedRecipes/SearchAndFilter';

interface SavedRecipesProps {
  isGrid?: boolean;
}

export const SavedRecipes: React.FC<SavedRecipesProps> = ({ isGrid = false }) => {
  const { savedRecipes, deleteRecipe, setView, setGeneratedRecipe, toggleFavorite } = useMix();
  const [filteredRecipes, setFilteredRecipes] = useState<MixRecipe[]>(savedRecipes);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());

  // Update filtered recipes when saved recipes change
  useEffect(() => {
    setFilteredRecipes(savedRecipes);
  }, [savedRecipes]);

  const handleRecipeClick = (recipe: MixRecipe) => {
    setGeneratedRecipe(recipe);
    setView('recipe');
  };

  if (savedRecipes.length === 0) {
    return (
      <div className={`text-center py-16 ${!isGrid ? 'w-full max-w-4xl mx-auto px-4' : 'py-8'}`}>
        {!isGrid && (
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">My Recipes</h2>
        )}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 mb-6">
            <Icon name="gift" size={48} className="text-[#D31212]" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">
            No Recipes Saved Yet
          </h3>
          <p className="text-slate-600 mb-2 max-w-md mx-auto">
            Your saved recipes will appear here. Start creating delicious holiday mixes!
          </p>
        </div>
        {!isGrid && (
          <button
            onClick={() => setView('generator')}
            className="bg-[#D31212] text-white font-bold py-3 px-8 uppercase tracking-wide text-sm hover:bg-red-800 transition-colors rounded-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            Create Your First Mix
          </button>
        )}
      </div>
    );
  }

  const displayRecipes = isGrid ? filteredRecipes.slice(0, 3) : filteredRecipes;

  return (
    <div className={!isGrid ? 'w-full max-w-7xl mx-auto py-12 px-4' : ''}>
      {!isGrid && (
        <>
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              My Recipes
            </h1>
            <p className="text-lg text-slate-600">
              {filteredRecipes.length} of {savedRecipes.length}{' '}
              {savedRecipes.length === 1 ? 'recipe' : 'recipes'}
            </p>
          </div>
          <SearchAndFilter recipes={savedRecipes} onFiltered={setFilteredRecipes} />
        </>
      )}

      {displayRecipes.length === 0 && !isGrid ? (
        <div className="text-center py-16">
          <p className="text-slate-600">No recipes match your filters.</p>
        </div>
      ) : (
        <div
          className={`grid ${
            isGrid
              ? 'grid-cols-1 sm:grid-cols-3 gap-8'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
          }`}
        >
          {displayRecipes.map((recipe) => (
            <div
              key={recipe.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRecipeClick(recipe);
                }
              }}
              aria-label={`View recipe: ${recipe.title}`}
              className={`group cursor-pointer flex flex-col bg-white border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 ${
                selectedRecipes.has(recipe.id) ? 'border-[#D31212] border-2' : 'border-slate-200'
              }`}
              onClick={() => {
                if (!isGrid) {
                  const newSelected = new Set(selectedRecipes);
                  if (newSelected.has(recipe.id)) {
                    newSelected.delete(recipe.id);
                  } else {
                    newSelected.add(recipe.id);
                  }
                  setSelectedRecipes(newSelected);
                } else {
                  handleRecipeClick(recipe);
                }
              }}
            >
              {/* Recipe Image */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/chex-mix-recipe.jpeg"
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Action Buttons (only visible on hover) */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="bg-white/90 p-2 rounded-full text-yellow-500 hover:bg-white shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    aria-label={`${recipe.isFavorite ? 'Remove from' : 'Add to'} favorites`}
                    title={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <svg
                      className="w-4 h-4"
                      fill={recipe.isFavorite ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecipe(recipe.id);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="bg-white/90 p-2 rounded-full text-red-500 hover:bg-white shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label={`Delete recipe: ${recipe.title}`}
                    title="Remove recipe"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-[#D31212] transition-colors line-clamp-2">
                  {recipe.title}
                </h3>

                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    {recipe.prepTime} • {recipe.servings}
                  </div>
                  {recipe.rating && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold">{recipe.rating}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-600 line-clamp-2">{recipe.description}</p>

                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

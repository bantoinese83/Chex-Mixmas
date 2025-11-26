import React, { useState } from 'react';
import { MixRecipe } from '../../types';
import { useMix } from '../../context/MixContext';
import { Icon } from '../ui/Icon';
import { RecipeScaling } from './RecipeScaling';

interface RecipeActionsProps {
  recipe: MixRecipe;
  onEdit: () => void;
}

export const RecipeActions: React.FC<RecipeActionsProps> = ({ recipe, onEdit }) => {
  const { toggleFavorite, addTag, removeTag, setCollection, setRating, updateRecipe } = useMix();
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showCollectionInput, setShowCollectionInput] = useState(false);
  const [newCollection, setNewCollection] = useState(recipe.collection || '');

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(recipe.id, newTag.trim());
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleSetCollection = () => {
    setCollection(recipe.id, newCollection.trim() || null);
    setShowCollectionInput(false);
  };

  const handleRating = (rating: number) => {
    setRating(recipe.id, rating);
  };

  const handleScale = (scaledRecipe: MixRecipe) => {
    updateRecipe(recipe.id, scaledRecipe);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Recipe Actions</h3>
        <button
          onClick={onEdit}
          className="text-sm text-[#D31212] font-semibold hover:text-red-800 flex items-center gap-1"
        >
          <Icon name="file-text" size={16} />
          Edit
        </button>
      </div>

      {/* Favorite */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">Favorite</span>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className={`p-2 rounded-full transition-colors ${
            recipe.isFavorite
              ? 'text-yellow-500 bg-yellow-50'
              : 'text-slate-400 hover:text-yellow-500'
          }`}
        >
          <svg
            className="w-5 h-5"
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
      </div>

      {/* Rating */}
      <div>
        <span className="text-sm text-slate-700 block mb-2">Rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`text-2xl transition-colors ${
                star <= (recipe.rating || 0)
                  ? 'text-yellow-500'
                  : 'text-slate-300 hover:text-yellow-400'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-700">Tags</span>
          <button
            onClick={() => setShowTagInput(!showTagInput)}
            className="text-xs text-[#D31212] font-semibold"
          >
            + Add
          </button>
        </div>
        {showTagInput && (
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Tag name"
              className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-1 focus:ring-[#D31212] outline-none"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-1 bg-[#D31212] text-white text-sm rounded-sm hover:bg-red-800"
            >
              Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {recipe.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs"
            >
              {tag}
              <button onClick={() => removeTag(recipe.id, tag)} className="hover:text-red-500">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Collection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-700">Collection</span>
          <button
            onClick={() => setShowCollectionInput(!showCollectionInput)}
            className="text-xs text-[#D31212] font-semibold"
          >
            {recipe.collection ? 'Change' : 'Set'}
          </button>
        </div>
        {showCollectionInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetCollection()}
              placeholder="Collection name"
              className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-1 focus:ring-[#D31212] outline-none"
            />
            <button
              onClick={handleSetCollection}
              className="px-3 py-1 bg-[#D31212] text-white text-sm rounded-sm hover:bg-red-800"
            >
              Save
            </button>
          </div>
        ) : (
          <span className="text-sm text-slate-600">{recipe.collection || 'No collection'}</span>
        )}
      </div>

      {/* Scaling */}
      <RecipeScaling recipe={recipe} onScaled={handleScale} />
    </div>
  );
};

import React, { useState } from 'react';
import { MixRecipe } from '../../types';

interface RecipeEditorProps {
  recipe: MixRecipe;
  onSave: (updated: MixRecipe) => void;
  onCancel: () => void;
}

export const RecipeEditor: React.FC<RecipeEditorProps> = ({ recipe, onSave, onCancel }) => {
  const [edited, setEdited] = useState<MixRecipe>(recipe);
  const [activeTab, setActiveTab] = useState<'basic' | 'ingredients' | 'instructions' | 'notes'>(
    'basic'
  );

  const handleSave = () => {
    onSave(edited);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Edit Recipe</h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#D31212] text-white rounded-sm hover:bg-red-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {(['basic', 'ingredients', 'instructions', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'text-[#D31212] border-b-2 border-[#D31212]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Basic Info */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={edited.title}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={edited.description}
              onChange={(e) => setEdited({ ...edited, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Prep Time</label>
              <input
                type="text"
                value={edited.prepTime}
                onChange={(e) => setEdited({ ...edited, prepTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Servings</label>
              <input
                type="text"
                value={edited.servings}
                onChange={(e) => setEdited({ ...edited, servings: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Difficulty</label>
            <select
              value={edited.difficulty || 'medium'}
              onChange={(e) =>
                setEdited({
                  ...edited,
                  difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      )}

      {/* Ingredients */}
      {activeTab === 'ingredients' && (
        <div className="space-y-2">
          {edited.ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={ing}
                onChange={(e) => {
                  const newIngredients = [...edited.ingredients];
                  newIngredients[i] = e.target.value;
                  setEdited({ ...edited, ingredients: newIngredients });
                }}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
              />
              <button
                onClick={() => {
                  setEdited({
                    ...edited,
                    ingredients: edited.ingredients.filter((_, idx) => idx !== i),
                  });
                }}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                aria-label="Remove ingredient"
                title="Remove ingredient"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setEdited({ ...edited, ingredients: [...edited.ingredients, ''] })}
            className="text-sm text-[#D31212] font-semibold hover:text-red-800"
          >
            + Add Ingredient
          </button>
        </div>
      )}

      {/* Instructions */}
      {activeTab === 'instructions' && (
        <div className="space-y-2">
          {edited.instructions.map((inst, i) => (
            <div key={i} className="flex gap-2">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#D31212] text-white font-bold rounded-full">
                {i + 1}
              </span>
              <textarea
                value={inst}
                onChange={(e) => {
                  const newInstructions = [...edited.instructions];
                  newInstructions[i] = e.target.value;
                  setEdited({ ...edited, instructions: newInstructions });
                }}
                rows={2}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
              />
              <button
                onClick={() => {
                  setEdited({
                    ...edited,
                    instructions: edited.instructions.filter((_, idx) => idx !== i),
                  });
                }}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                aria-label="Remove step"
                title="Remove step"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setEdited({ ...edited, instructions: [...edited.instructions, ''] })}
            className="text-sm text-[#D31212] font-semibold hover:text-red-800"
          >
            + Add Step
          </button>
        </div>
      )}

      {/* Notes */}
      {activeTab === 'notes' && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Personal Notes</label>
          <textarea
            value={edited.notes || ''}
            onChange={(e) => setEdited({ ...edited, notes: e.target.value })}
            rows={8}
            placeholder="Add your personal notes, modifications, or tips..."
            className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
          />
        </div>
      )}
    </div>
  );
};

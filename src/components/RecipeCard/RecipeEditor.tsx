import React, { useState, useEffect, useRef } from 'react';
import { MixRecipe } from '../../types';
import { Icon } from '../ui/Icon';

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
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save indicator
  useEffect(() => {
    const hasChanges = JSON.stringify(edited) !== JSON.stringify(recipe);
    
    if (hasChanges) {
      setSaveStatus('unsaved');
      
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Show "saving" after 500ms of no changes
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus('saving');
        // Simulate save completion
        setTimeout(() => {
          setSaveStatus('saved');
        }, 300);
      }, 500);
    } else {
      setSaveStatus('saved');
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [edited, recipe]);

  const handleSave = () => {
    onSave(edited);
    setSaveStatus('saved');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Edit Recipe</h2>
          <div className="flex items-center gap-2 text-sm">
            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1 text-green-600">
                <Icon name="check-circle" size={16} />
                <span>All changes saved</span>
              </span>
            )}
            {saveStatus === 'saving' && (
              <span className="flex items-center gap-1 text-blue-600">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </span>
            )}
            {saveStatus === 'unsaved' && (
              <span className="flex items-center gap-1 text-slate-500">
                <span>Unsaved changes</span>
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#D31212] text-white rounded-sm hover:bg-red-800 transition-colors font-semibold"
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
              placeholder="e.g., Festive Holiday Chex Mix"
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
            />
            <p className="text-xs text-slate-500 mt-1">💡 Make it descriptive and memorable!</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={edited.description}
              onChange={(e) => setEdited({ ...edited, description: e.target.value })}
              rows={3}
              placeholder="Describe the flavor profile, occasion, or what makes this recipe special..."
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
            />
            <p className="text-xs text-slate-500 mt-1">💡 Help others understand what makes this recipe unique!</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Prep Time</label>
              <input
                type="text"
                value={edited.prepTime}
                onChange={(e) => setEdited({ ...edited, prepTime: e.target.value })}
                placeholder="e.g., 15 minutes"
                className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Servings</label>
              <input
                type="text"
                value={edited.servings}
                onChange={(e) => setEdited({ ...edited, servings: e.target.value })}
                placeholder="e.g., 8 servings"
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

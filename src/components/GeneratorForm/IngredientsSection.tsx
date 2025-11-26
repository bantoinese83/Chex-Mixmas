import React, { useMemo } from 'react';
import { MixPreferences } from '../../types';

interface IngredientsSectionProps {
  prefs: MixPreferences;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleBase: (item: string) => void;
  onToggleMixIn: (item: string) => void;
  filteredBases: string[];
  filteredMixIns: string[];
}

const IngredientButton: React.FC<{
  item: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ item, isSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={isSelected}
    aria-label={`${isSelected ? 'Remove' : 'Add'} ${item}`}
    className={`px-4 py-2 text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 ${
      isSelected
        ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500 hover:bg-slate-50'
    }`}
  >
    {item}
  </button>
);

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  prefs,
  searchTerm,
  onSearchChange,
  onToggleBase,
  onToggleMixIn,
  filteredBases,
  filteredMixIns,
}) => {
  // Use Set for O(1) lookups instead of O(n) array.includes()
  const baseIngredientsSet = useMemo(() => new Set(prefs.baseIngredients), [prefs.baseIngredients]);
  const mixInsSet = useMemo(() => new Set(prefs.mixIns), [prefs.mixIns]);

  return (
    <div className="bg-white border border-slate-200 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-2">
        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">
          2. Ingredients
        </h3>
        <div className="relative mt-2 md:mt-0 w-full md:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search ingredients (e.g., 'chocolate', 'pretzel')..."
            aria-label="Search and filter ingredients"
            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none text-sm rounded-sm transition-colors"
          />
          <svg
            className="w-4 h-4 absolute left-2 top-3 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
          Base Crunch
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {prefs.baseIngredients.length} selected
          </span>
        </h4>
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {filteredBases.map((base, index) => (
            <IngredientButton
              key={`base-${index}-${base}`}
              item={base}
              isSelected={baseIngredientsSet.has(base)}
              onClick={() => onToggleBase(base)}
            />
          ))}
        </div>
        {filteredBases.length === 0 && (
          <p className="text-sm text-slate-400 italic mt-2">
            No base ingredients match your search.
          </p>
        )}
      </div>

      <div>
        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
          Mix-Ins & Goodies
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {prefs.mixIns.length} selected
          </span>
        </h4>
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {filteredMixIns.map((item, index) => (
            <IngredientButton
              key={`mixin-${index}-${item}`}
              item={item}
              isSelected={mixInsSet.has(item)}
              onClick={() => onToggleMixIn(item)}
            />
          ))}
        </div>
        {filteredMixIns.length === 0 && (
          <p className="text-sm text-slate-400 italic mt-2">No mix-ins match your search.</p>
        )}
      </div>
    </div>
  );
};

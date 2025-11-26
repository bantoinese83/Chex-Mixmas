import React, { useState, useMemo } from 'react';
import { MixRecipe } from '../../types';
import { RecipeFilters, SortOption, filterRecipes, sortRecipes } from '../../utils/recipeSearch';
import { Icon } from '../ui/Icon';

interface SearchAndFilterProps {
  recipes: MixRecipe[];
  onFiltered: (filtered: MixRecipe[]) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ recipes, onFiltered }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecipeFilters>({
    searchTerm: '',
    tags: [],
    isFavorite: undefined,
    collection: undefined,
    difficulty: undefined,
  });

  // Get unique values for filters
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    recipes.forEach((r) => r.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [recipes]);

  const allCollections = useMemo(() => {
    const collSet = new Set<string>();
    recipes.forEach((r) => {
      if (r.collection) collSet.add(r.collection);
    });
    return Array.from(collSet).sort();
  }, [recipes]);

  // Apply filters and sorting
  useMemo(() => {
    const filtered = filterRecipes(recipes, { ...filters, searchTerm });
    const sorted = sortRecipes(filtered, sortBy);
    onFiltered(sorted);
  }, [recipes, filters, searchTerm, sortBy, onFiltered]);

  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none text-sm rounded-sm transition-colors"
        />
        <Icon name="file-text" size={20} className="absolute left-3 top-3.5 text-slate-400" />
      </div>

      {/* Filter Toggle and Sort */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#D31212] transition-colors"
        >
          <Icon name="file-text" size={16} />
          Filters {filters.tags.length > 0 && `(${filters.tags.length})`}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="text-sm border border-slate-300 rounded-sm px-3 py-2 focus:border-[#D31212] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-1 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 space-y-4">
          {/* Favorites Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <input
                type="checkbox"
                checked={filters.isFavorite === true}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    isFavorite: e.target.checked ? true : undefined,
                  }))
                }
                className="rounded"
              />
              Favorites Only
            </label>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      filters.tags.includes(tag)
                        ? 'bg-[#D31212] text-white border-[#D31212]'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-[#D31212]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Collections Filter */}
          {allCollections.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Collections</label>
              <select
                value={filters.collection || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    collection: e.target.value || undefined,
                  }))
                }
                className="w-full text-sm border border-slate-300 rounded-sm px-3 py-2"
              >
                <option value="">All Collections</option>
                {allCollections.map((coll) => (
                  <option key={coll} value={coll}>
                    {coll}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Difficulty</label>
            <select
              value={filters.difficulty || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  difficulty: e.target.value || undefined,
                }))
              }
              className="w-full text-sm border border-slate-300 rounded-sm px-3 py-2"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(filters.tags.length > 0 ||
            filters.isFavorite !== undefined ||
            filters.collection ||
            filters.difficulty) && (
            <button
              onClick={() =>
                setFilters({
                  searchTerm: '',
                  tags: [],
                  isFavorite: undefined,
                  collection: undefined,
                  difficulty: undefined,
                })
              }
              className="text-sm text-[#D31212] hover:text-red-800 font-semibold"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

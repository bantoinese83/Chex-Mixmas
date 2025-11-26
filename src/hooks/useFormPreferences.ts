import { useState, useCallback } from 'react';
import { MixPreferences } from '../types';

/**
 * Custom hook to manage form preferences state
 * Encapsulates preference management logic
 */
export const useFormPreferences = (initialPreferences: MixPreferences) => {
  const [prefs, setPrefs] = useState<MixPreferences>(initialPreferences);
  const [searchTerm, setSearchTerm] = useState('');

  // Optimized: Use Set for O(1) lookup instead of O(n) array.includes()
  const toggleItem = useCallback((item: string, field: keyof MixPreferences) => {
    setPrefs((prev) => {
      const currentList = prev[field] as string[];
      const itemSet = new Set(currentList);

      if (itemSet.has(item)) {
        itemSet.delete(item);
        return { ...prev, [field]: Array.from(itemSet) };
      } else {
        itemSet.add(item);
        return { ...prev, [field]: Array.from(itemSet) };
      }
    });
  }, []);

  const updateField = useCallback(
    <K extends keyof MixPreferences>(field: K, value: MixPreferences[K]) => {
      setPrefs((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return {
    prefs,
    setPrefs,
    searchTerm,
    setSearchTerm,
    toggleItem,
    updateField,
  };
};

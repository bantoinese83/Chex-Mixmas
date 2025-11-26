import { useEffect } from 'react';
import { MixPreferences } from '../types';
import { loadPreferencesFromStorage, savePreferencesToStorage } from '../services/storage';
import { TIMEOUTS } from '../constants/theme';

/**
 * Custom hook to handle form preferences persistence
 * Separates data access (storage) from UI components
 * Uses constants to eliminate magic numbers (DRY)
 */
export const useFormPersistence = (prefs: MixPreferences) => {
  // Persist preferences whenever they change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      savePreferencesToStorage(prefs);
    }, TIMEOUTS.DEBOUNCE_STORAGE);

    return () => clearTimeout(timeoutId);
  }, [prefs]);
};

/**
 * Loads saved preferences from storage or returns null
 * Separates data access from component logic
 */
export const loadInitialPreferences = (): MixPreferences | null => {
  return loadPreferencesFromStorage();
};

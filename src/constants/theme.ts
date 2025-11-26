/**
 * Theme constants for consistent styling across the application
 * Follows DRY principle by centralizing repeated values
 */

export const COLORS = {
  BRAND: '#D31212',
  BRAND_HOVER: '#B91C1C', // red-800
  BRAND_DARK: '#991B1B', // red-900
} as const;

export const TIMEOUTS = {
  DEBOUNCE_STORAGE: 1000,
  DEBOUNCE_SAVE: 500,
  SUCCESS_MESSAGE: 2000,
  COPY_SUCCESS: 3000,
  SCROLL_DELAY: 100,
} as const;

export const FOCUS_RING = {
  DEFAULT: 'focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2',
  GREEN: 'focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2',
} as const;

export const TRANSITIONS = {
  COLORS: 'transition-colors',
  ALL: 'transition-all',
  TRANSFORM: 'transition-transform',
  DEFAULT: 'transition-all duration-200',
} as const;

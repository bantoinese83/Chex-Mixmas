export interface MixPreferences {
  vibe:
    | 'savory'
    | 'sweet'
    | 'spicy'
    | 'salty-sweet'
    | 'sweet-spicy'
    | 'chocolatey'
    | 'zesty'
    | 'nutty'
    | 'smoky'
    | 'umami'
    | 'fruity'
    | 'holiday-spice'
    | 'herbal'
    | 'citrus'
    | 'caramel'
    | 'maple'
    | 'cinnamon'
    | 'vanilla'
    | 'coffee'
    | 'earthy'
    | 'buttery'
    | 'cheesy'
    | 'garlic'
    | 'herbs-de-provence';
  baseIngredients: string[];
  mixIns: string[];
  dietary: string[];
  spiceLevel: number; // 0-10
  christmasSpirit: boolean; // Adds festive descriptions
  thcInfused: boolean; // 420-friendly THC infusion option
}

export interface NutritionFacts {
  calories: string;
  totalFat: string;
  saturatedFat?: string;
  transFat?: string;
  cholesterol?: string;
  sodium: string;
  totalCarbohydrate: string;
  dietaryFiber?: string;
  totalSugars?: string;
  protein: string;
  vitaminD?: string;
  calcium?: string;
  iron?: string;
  potassium?: string;
}

export interface MixRecipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  chefTips: string[];
  substitutions?: string[];
  nutrition?: NutritionFacts;
  createdAt: number;
  themeColor?: string;
  // New fields for enhanced features
  tags?: string[];
  isFavorite?: boolean;
  collection?: string;
  rating?: number;
  notes?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  originalServings?: string; // For scaling
  preferences?: MixPreferences; // Original preferences used to generate
  history?: MixRecipe[]; // Version history
  imageUrl?: string;
}

export type ViewState = 'generator' | 'recipe' | 'saved' | 'notFound' | 'edit';

export interface MixContextType {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  generatedRecipe: MixRecipe | null;
  setGeneratedRecipe: (recipe: MixRecipe | null) => void;
  savedRecipes: MixRecipe[];
  isGenerating: boolean;
  error: string | null;
  generateMix: (prefs: MixPreferences) => void | Promise<void>;
  saveRecipe: (recipe: MixRecipe) => void;
  updateRecipe: (id: string, updates: Partial<MixRecipe>) => void;
  deleteRecipe: (id: string) => void;
  clearError: () => void;
  // New methods for enhanced features
  toggleFavorite: (id: string) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  setCollection: (id: string, collection: string | null) => void;
  setRating: (id: string, rating: number) => void;
}

import { Type } from '@google/genai';

export const getRecipeResponseSchema = () => ({
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    prepTime: { type: Type.STRING },
    servings: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of ingredients with specific quantities (e.g. '3 cups Rice Chex')",
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    chefTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    substitutions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    nutrition: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.STRING },
        totalFat: { type: Type.STRING },
        saturatedFat: { type: Type.STRING },
        transFat: { type: Type.STRING },
        cholesterol: { type: Type.STRING },
        sodium: { type: Type.STRING },
        totalCarbohydrate: { type: Type.STRING },
        dietaryFiber: { type: Type.STRING },
        totalSugars: { type: Type.STRING },
        protein: { type: Type.STRING },
        vitaminD: { type: Type.STRING },
        calcium: { type: Type.STRING },
        iron: { type: Type.STRING },
        potassium: { type: Type.STRING },
      },
    },
    themeColor: { type: Type.STRING },
    difficulty: { type: Type.STRING },
  },
  required: [
    'title',
    'description',
    'prepTime',
    'servings',
    'ingredients',
    'instructions',
    'chefTips',
    'substitutions',
    'nutrition',
  ],
});

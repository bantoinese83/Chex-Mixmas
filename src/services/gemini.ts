import { GoogleGenAI } from '@google/genai';
import { MixPreferences, MixRecipe } from '../types';
import { buildRecipePrompt, getSystemInstruction } from './promptBuilder';
import { getRecipeResponseSchema } from './recipeSchema';

const ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] ?? '' });

const parseRecipeResponse = (text: string): MixRecipe => {
  try {
    const data = JSON.parse(text);

    // Validate required fields
    if (
      !data.title ||
      !data.description ||
      !Array.isArray(data.ingredients) ||
      !Array.isArray(data.instructions)
    ) {
      throw new Error('Invalid recipe structure received from API');
    }

    return {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...data,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON response from recipe generator');
    }
    throw error;
  }
};

export const generateRecipeFromAI = async (prefs: MixPreferences): Promise<MixRecipe> => {
  // Validate API key is present
  const apiKey = process.env['API_KEY'] ?? process.env['GEMINI_API_KEY'] ?? '';
  if (!apiKey) {
    throw new Error('API key is missing. Please configure your Gemini API key.');
  }

  const prompt = buildRecipePrompt(prefs);
  const schema = getRecipeResponseSchema();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    if (!response.text) {
      throw new Error('No recipe generated from API response.');
    }

    return parseRecipeResponse(response.text);
  } catch (error) {
    // Log error for debugging (in development only)
    // Note: In production, errors are handled gracefully without console logs
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.error('Gemini API Error:', error);
    }

    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error(
          'Configuration error: API key is missing. Please check your environment variables.'
        );
      }
      if (error.message.includes('quota') || error.message.includes('rate limit')) {
        throw new Error('The kitchen is very busy right now. Please try again in a moment!');
      }
      if (error.message.includes('Invalid')) {
        throw new Error('The recipe format was invalid. Please try generating again!');
      }
    }

    throw new Error('The elves are having trouble in the kitchen. Please try again!');
  }
};

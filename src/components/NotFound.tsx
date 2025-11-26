import React from 'react';
import { useMix } from '../context/MixContext';
import { Icon } from './ui/Icon';

export const NotFound: React.FC = () => {
  const { setView } = useMix();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
        <div className="mb-8">
          <div className="text-9xl font-black text-[#D31212] mb-4 opacity-20">404</div>
          <Icon name="gift" size={80} className="mx-auto text-[#D31212] mb-6" />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
          Recipe Not Found
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          Looks like this recipe got lost in the North Pole! The elves might have misplaced it, but
          don't worry—we can help you create a new one.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setView('generator')}
            className="bg-[#D31212] text-white font-bold py-3 px-8 uppercase tracking-wide text-sm hover:bg-red-800 transition-colors rounded-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            Create New Recipe
          </button>
          <button
            onClick={() => setView('saved')}
            className="bg-white text-[#D31212] border-2 border-[#D31212] font-bold py-3 px-8 uppercase tracking-wide text-sm hover:bg-red-50 transition-colors rounded-sm shadow-md hover:shadow-lg"
          >
            View Saved Recipes
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Need help? Try checking your saved recipes or create a brand new mix!
          </p>
        </div>
      </div>
    </div>
  );
};

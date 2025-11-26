import React from 'react';
import { MixRecipe } from '../../types';
import { FormattedText } from '../../utils/textFormatting';
import { Icon } from '../ui/Icon';
import { shareToTwitter, shareToFacebook, shareToPinterest } from '../../utils/socialShare';

interface RecipeHeaderProps {
  recipe: MixRecipe;
  onShare: () => void;
  onSave: () => void;
  copySuccess: boolean;
  saveSuccess: boolean;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  recipe,
  onShare,
  onSave,
  copySuccess,
  saveSuccess,
}) => {
  return (
    <>
      <div className="hidden print:block text-center border-b border-black mb-8 pb-4">
        <h1 className="text-4xl font-serif font-bold text-black">Chex Mixmas Recipe</h1>
      </div>

      <div className="flex flex-col md:flex-row print:block">
        <div className="w-full md:w-1/2 bg-[#f3f4f6] min-h-[400px] relative overflow-hidden group print:hidden">
          <img
            src="/recipe-image.jpeg"
            alt="Recipe Visualization - Santa and elves making Chex Mix"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white print:w-full print:p-0 print:mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight font-serif print:text-black">
            <FormattedText text={recipe.title} />
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed print:text-black">
            <FormattedText text={recipe.description} />
          </p>

          <div className="flex flex-wrap gap-3 mb-4 print:hidden">
            <div className="flex gap-2 items-center">
              <span className="text-xs text-slate-500 uppercase">Share:</span>
              <button
                onClick={() => shareToTwitter(recipe)}
                className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                aria-label="Share on Twitter"
                title="Share on Twitter/X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => shareToFacebook(recipe)}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={() => shareToPinterest(recipe)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                aria-label="Share on Pinterest"
                title="Share on Pinterest"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c5.084 0 9.426-3.163 11.174-7.637-.15-.83-.085-1.85.34-2.68.437-.84 1.23-1.4 1.86-1.4.19 0 .35.14.4.33.05.2.02.4-.08.56-.2.33-.52.8-.75 1.14-.23.34-.46.68-.46 1.15 0 .8.6 1.5 1.4 1.5.66 0 1.2-.4 1.5-.9.3-.5.5-1.1.5-1.7 0-1.4-1.1-2.6-2.6-2.6-1.8 0-3.2 1.4-3.2 3.2 0 .6.2 1.2.5 1.6.05.1.06.2.04.3l-.3 1.2c-.05.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.7 0-3.8 3.1-6.9 6.9-6.9 3.7 0 6.5 2.6 6.5 6.1 0 3.7-2.3 6.7-5.5 6.7-1.1 0-2.1-.6-2.4-1.3l-.6 2.4c-.2.8-.8 1.8-1.2 2.4-.7 1-1.5 2-2.6 2.7-1.1.7-2.4 1-3.7 1-6.6 0-12-5.4-12-12S5.4 0 12 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 print:hidden">
            <button
              onClick={onShare}
              className="text-[#D31212] font-bold text-sm hover:underline uppercase transition-all flex items-center gap-2"
            >
              {copySuccess ? (
                <>
                  <Icon name="sparkles" size={16} />
                  Link Copied!
                </>
              ) : (
                'Share Recipe'
              )}
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onSave}
              className="text-[#D31212] font-bold text-sm hover:underline uppercase transition-all flex items-center gap-2"
              title="Or press Ctrl/Cmd + S"
            >
              {saveSuccess ? (
                <>
                  <Icon name="heart" size={16} className="fill-current" />
                  Saved!
                </>
              ) : (
                'Save Recipe'
              )}
            </button>
            <span className="text-slate-300 hidden lg:inline">|</span>
            <span className="text-xs text-slate-400 hidden lg:inline self-center">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono border border-slate-200">
                ⌘
              </kbd>{' '}
              +{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono border border-slate-200">
                S
              </kbd>{' '}
              to save
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

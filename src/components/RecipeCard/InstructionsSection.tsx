import React from 'react';
import { MixRecipe } from '../../types';
import { FormattedText } from '../../utils/textFormatting';

interface InstructionsSectionProps {
  recipe: MixRecipe;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({ recipe }) => {
  return (
    <div className="md:col-span-8 print:col-span-8 animate-slide-in-right">
      <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest mb-8 border-b-2 border-slate-200 pb-2 print:text-black print:border-black">
        Preparation
      </h2>
      <ol className="space-y-6 print:space-y-4">
        {recipe.instructions.map((step, i) => (
          <li
            key={i}
            className="flex gap-4 p-4 rounded-lg bg-slate-50 border-l-4 border-[#D31212] hover:bg-slate-100 transition-colors print:bg-white print:border-l-2 print:p-2"
          >
            <span className="text-3xl font-bold text-[#D31212] leading-none flex-shrink-0 print:text-black print:text-xl">
              {i + 1}.
            </span>
            <p className="text-slate-700 text-lg leading-relaxed flex-1 print:text-black print:text-base">
              <FormattedText text={step} />
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 bg-[#f3f4f6] p-8 rounded-sm print:bg-white print:border print:border-slate-300 print:p-4 print:break-inside-avoid">
        <h3 className="font-bold text-slate-900 uppercase tracking-wide mb-4 print:text-black">
          Tips
        </h3>
        <ul className="space-y-3">
          {recipe.chefTips.map((tip, i) => (
            <li key={i} className="flex items-start text-sm text-slate-600 print:text-black">
              <span className="mr-2 text-[#D31212] print:text-black">•</span>
              <span>
                <FormattedText text={tip} />
              </span>
            </li>
          ))}
          {recipe.substitutions?.map((sub, i) => (
            <li
              key={`sub-${i}`}
              className="flex items-start text-sm text-slate-600 print:text-black"
            >
              <span className="mr-2 text-[#D31212] font-bold print:text-black">Substitution:</span>
              <span>
                <FormattedText text={sub} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

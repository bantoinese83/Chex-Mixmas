import React from 'react';
import { ProgressBar } from '../ui/ProgressBar';
import { useMix } from '@/context/MixContext';

interface SubmitButtonProps {
  onSubmit: (e: React.FormEvent) => void;
}

const LOADING_MESSAGES = [
  'Our kitchen elves are working their magic...',
  'Crafting your perfect holiday mix...',
  'Mixing up something delicious...',
  'Almost ready! Just a few more seconds...',
];

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  const { isGenerating } = useMix();
  const [loadingMessage, setLoadingMessage] = React.useState(LOADING_MESSAGES[0]!);

  React.useEffect(() => {
    if (isGenerating) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[messageIndex]!);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <button
        type="submit"
        disabled={isGenerating}
        onClick={(e) => onSubmit(e as React.FormEvent)}
        className={`inline-block px-8 font-black text-xl py-6 uppercase tracking-widest rounded-sm transition-all shadow-lg transform relative ${
          isGenerating
            ? 'bg-[#D31212] text-white cursor-wait opacity-90'
            : 'bg-[#D31212] text-white hover:bg-red-800 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2'
        } disabled:opacity-90`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3 drop-shadow-md">
            Generate Recipe
          </span>
        )}
      </button>
      {isGenerating && (
        <div className="w-full max-w-md space-y-2">
          <p className="text-center text-sm text-slate-600 animate-fade-in">
            {loadingMessage}
          </p>
          <ProgressBar isActive={isGenerating} duration={20000} />
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useMix } from '../context/MixContext';
import { Icon } from './ui/Icon';
import { ChristmasCountdown } from './ChristmasCountdown';
import { useToastContext } from '../context/ToastContext';
import { ToastContainer } from './ui/Toast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { setView, error, clearError } = useMix();
  const { toasts, dismissToast } = useToastContext();

  return (
    <div className="min-h-screen relative font-sans text-slate-900 bg-white flex flex-col">
      {/* Brand Header */}
      <header className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo Area */}
          <button
            className="flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 rounded"
            onClick={() => setView('generator')}
            aria-label="Go to recipe generator"
          >
            <span className="text-4xl font-black text-[#D31212] tracking-tighter italic">Chex</span>
            <span className="text-xl font-bold text-slate-700 mt-2 ml-1">Mixmas</span>
          </button>

          {/* Navigation */}
          <nav
            className="flex items-center gap-6 text-sm font-semibold text-slate-700"
            aria-label="Main navigation"
          >
            <button
              onClick={() => setView('saved')}
              className="hover:text-[#D31212] transition-colors uppercase focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 rounded px-2 py-1"
              aria-label="View saved recipes"
            >
              My Recipes
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-grow">
        {error && (
          <div className="max-w-7xl mx-auto mt-4 px-4 print:hidden animate-fade-in-up">
            <div className="p-4 bg-red-50 border-l-4 border-[#D31212] rounded-lg flex items-start gap-3 shadow-md">
              <Icon
                name="alert-triangle"
                size={24}
                className="text-[#D31212] flex-shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <h3 className="font-bold text-[#D31212] mb-1">Oops! Something went wrong</h3>
                <p className="text-red-800 text-sm mb-1">{error}</p>
                <p className="text-red-700 text-xs">Don't worry, your recipes are safe. Try again or refresh the page.</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 font-bold text-xl leading-none p-1 hover:bg-red-100 rounded transition-colors"
                aria-label="Close error message"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#f9fafb] border-t border-slate-200 py-8 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <ChristmasCountdown />
            <p className="text-slate-600 font-medium italic">Made with love from Antoine Family</p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

import React from 'react';
import { MixProvider, useMix } from './context/MixContext';
import { Layout } from './components/Layout';
import { GeneratorForm } from './components/GeneratorForm';
import { RecipeCard } from './components/RecipeCard';
import { SavedRecipes } from './components/SavedRecipes';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { currentView } = useMix();

  return (
    <Layout>
      {currentView === 'generator' && <GeneratorForm />}
      {currentView === 'recipe' && <RecipeCard />}
      {currentView === 'saved' && <SavedRecipes />}
      {currentView === 'notFound' && <NotFound />}
    </Layout>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <MixProvider>
        <AppContent />
      </MixProvider>
    </ErrorBoundary>
  );
}

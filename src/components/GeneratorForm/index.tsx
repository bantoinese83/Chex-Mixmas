import React, { useMemo, useCallback, useState } from 'react';
import { useMix } from '../../context/MixContext';
import { BASE_INGREDIENTS, MIX_INS } from '../../data/ingredients';
import { useFormPreferences } from '../../hooks/useFormPreferences';
import { useFormPersistence, loadInitialPreferences } from '../../hooks/useFormPersistence';
import { filterIngredients } from '../../utils/ingredients';
import { MixPreferences } from '../../types';
import { FlavorProfileSection } from './FlavorProfileSection';
import { IngredientsSection } from './IngredientsSection';
import { OptionsSection } from './OptionsSection';
import { SubmitButton } from './SubmitButton';

const DEFAULT_PREFERENCES: MixPreferences = {
  vibe: 'savory',
  baseIngredients: [],
  mixIns: [],
  dietary: [],
  spiceLevel: 0,
  christmasSpirit: true,
  thcInfused: false,
};

export const GeneratorForm: React.FC = () => {
  const { generateMix } = useMix();

  // Load saved preferences or use defaults - only once on mount
  // Data access is abstracted through hook
  const [initialPrefs] = useState(() => {
    const saved = loadInitialPreferences();
    return saved || DEFAULT_PREFERENCES;
  });

  const { prefs, searchTerm, setSearchTerm, toggleItem, updateField } =
    useFormPreferences(initialPrefs);

  // Persist preferences - data access abstracted through hook
  useFormPersistence(prefs);

  // Memoize filtered ingredients to avoid recalculation on every render
  const filteredBases = useMemo(
    () => filterIngredients(BASE_INGREDIENTS, searchTerm),
    [searchTerm]
  );
  const filteredMixIns = useMemo(() => filterIngredients(MIX_INS, searchTerm), [searchTerm]);

  // Memoize event handlers to prevent child re-renders
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Store preferences for potential preview
      void generateMix(prefs);
    },
    [generateMix, prefs]
  );

  const handleVibeChange = useCallback(
    (vibe: MixPreferences['vibe']) => updateField('vibe', vibe),
    [updateField]
  );

  const handleSpiceLevelChange = useCallback(
    (level: number) => updateField('spiceLevel', level),
    [updateField]
  );

  const handleToggleBase = useCallback(
    (item: string) => toggleItem(item, 'baseIngredients'),
    [toggleItem]
  );

  const handleToggleMixIn = useCallback((item: string) => toggleItem(item, 'mixIns'), [toggleItem]);

  const handleToggleDietary = useCallback(
    (item: string) => toggleItem(item, 'dietary'),
    [toggleItem]
  );

  const handleTHCInfusedChange = useCallback(
    (enabled: boolean) => updateField('thcInfused', enabled),
    [updateField]
  );

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 animate-fade-in-up">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">
          Create Your Custom Mix
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select your ingredients, choose a flavor profile, and let our kitchen elves generate the
          perfect recipe for your holiday gathering.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-12 animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        <FlavorProfileSection
          prefs={prefs}
          onVibeChange={handleVibeChange}
          onSpiceLevelChange={handleSpiceLevelChange}
        />

        <IngredientsSection
          prefs={prefs}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleBase={handleToggleBase}
          onToggleMixIn={handleToggleMixIn}
          filteredBases={filteredBases}
          filteredMixIns={filteredMixIns}
        />

        <OptionsSection
          prefs={prefs}
          onToggleDietary={handleToggleDietary}
          onTHCInfusedChange={handleTHCInfusedChange}
        />

        <SubmitButton onSubmit={handleSubmit} />
      </form>
    </div>
  );
};

import React from 'react';
import { MixPreferences } from '../../types';
import { FLAVOR_PROFILES, SPICY_FLAVOR_PROFILES } from '../../data/flavorProfiles';
import { SpiceSlider } from './SpiceSlider';

interface FlavorProfileSectionProps {
  prefs: MixPreferences;
  onVibeChange: (vibe: MixPreferences['vibe']) => void;
  onSpiceLevelChange: (level: number) => void;
}

export const FlavorProfileSection: React.FC<FlavorProfileSectionProps> = ({
  prefs,
  onVibeChange,
  onSpiceLevelChange,
}) => {
  const showSpiceSlider = (SPICY_FLAVOR_PROFILES as readonly MixPreferences['vibe'][]).includes(
    prefs.vibe
  );

  return (
    <div className="bg-white border border-slate-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b pb-2">
        1. Flavor Profile
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FLAVOR_PROFILES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onVibeChange(id)}
            aria-pressed={prefs.vibe === id}
            aria-label={`Select ${label} flavor profile`}
            className={`p-4 md:p-6 text-center border transition-all uppercase tracking-wide font-bold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 ${
              prefs.vibe === id
                ? 'border-[#D31212] bg-[#D31212] text-white transform scale-105 shadow-md'
                : 'border-slate-300 text-slate-600 hover:border-[#D31212] hover:text-[#D31212]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {showSpiceSlider && <SpiceSlider value={prefs.spiceLevel} onChange={onSpiceLevelChange} />}
    </div>
  );
};

import React from 'react';
import { MixPreferences } from '../../types';
import { DIETARY_OPTIONS } from '../../data/ingredients';
import { Icon } from '../ui/Icon';

interface OptionsSectionProps {
  prefs: MixPreferences;
  onToggleDietary: (item: string) => void;
  onTHCInfusedChange: (enabled: boolean) => void;
}

const DietaryButton: React.FC<{
  item: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ item, isSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={isSelected}
    aria-label={`${isSelected ? 'Remove' : 'Add'} ${item} dietary restriction`}
    className={`px-3 py-1.5 text-xs border uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
      isSelected
        ? 'bg-green-700 text-white border-green-700 shadow-sm'
        : 'bg-white text-slate-500 border-slate-200 hover:border-green-700 hover:text-green-700'
    }`}
  >
    {item}
  </button>
);

export const OptionsSection: React.FC<OptionsSectionProps> = ({
  prefs,
  onToggleDietary,
  onTHCInfusedChange,
}) => {
  return (
    <div className="bg-white border border-slate-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b pb-2">
        3. Options
      </h3>

      <div className="mb-6">
        <h4 className="font-bold text-slate-700 mb-3">Dietary Preferences</h4>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((item) => (
            <DietaryButton
              key={item}
              item={item}
              isSelected={prefs.dietary.includes(item)}
              onClick={() => onToggleDietary(item)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 p-5 bg-green-50 border border-green-100 rounded-sm">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="thcInfused"
            checked={prefs.thcInfused}
            onChange={(e) => onTHCInfusedChange(e.target.checked)}
            className="peer h-6 w-6 text-green-600 focus:ring-green-600 border-gray-300 rounded cursor-pointer"
          />
        </div>
        <label htmlFor="thcInfused" className="flex-1 cursor-pointer select-none">
          <span className="block font-bold text-slate-800 text-lg">420-Friendly THC Infusion</span>
          <span className="text-sm text-slate-600 block mt-1">
            Add instructions for infusing THC into the butter or oil for an elevated experience.
            Includes proper dosing guidelines and safety information.
          </span>
        </label>
        <Icon name="sprout" size={48} className="text-green-600" />
      </div>
    </div>
  );
};

import React from 'react';
import { Icon } from '../ui/Icon';
import { getSpiceInfo } from '../../utils/spiceLevel';

interface SpiceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const getThumbColor = (level: number): string => {
  if (level === 0) return 'bg-blue-300';
  if (level < 4) return 'bg-green-500';
  if (level < 7) return 'bg-orange-500';
  if (level < 9) return 'bg-red-600';
  return 'bg-red-950';
};

export const SpiceSlider: React.FC<SpiceSliderProps> = ({ value, onChange }) => {
  const spiceInfo = getSpiceInfo(value);
  const thumbColor = getThumbColor(value);

  return (
    <div className="mt-8 pt-8 border-t border-slate-100 transition-all duration-300">
      <div className="flex justify-between items-end mb-6">
        <label
          htmlFor="spice-slider"
          className="block text-sm font-bold text-slate-700 uppercase tracking-widest"
        >
          Spice Intensity
        </label>
        <div className={`text-right transition-colors duration-300 ${spiceInfo.color}`}>
          <div className="text-2xl font-black uppercase leading-none flex items-center gap-2 justify-end">
            <Icon name={spiceInfo.icon} size={32} />
            {spiceInfo.label}
          </div>
          <div className="text-xs font-medium opacity-80 mt-1">{spiceInfo.desc}</div>
        </div>
      </div>

      <div className="relative h-14 flex items-center group px-2">
        <div className="absolute left-0 right-0 h-4 rounded-full bg-gradient-to-r from-blue-200 via-yellow-300 via-orange-400 to-red-600 shadow-inner" />

        <div className="absolute left-0 right-0 h-4 flex justify-between px-1 pointer-events-none">
          {Array.from({ length: 11 }, (_, i) => (
            <div
              key={i}
              className={`w-0.5 h-full ${i % 5 === 0 ? 'bg-black/20' : 'bg-black/10'}`}
            />
          ))}
        </div>

        <input
          id="spice-slider"
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          aria-label="Spice intensity level"
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={value}
          aria-valuetext={spiceInfo.label}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10 top-0 left-0 focus:opacity-100 focus:ring-2 focus:ring-[#D31212] focus:ring-offset-2 rounded"
        />

        <div
          className="pointer-events-none absolute h-8 w-8 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] border-4 border-white flex items-center justify-center transition-all duration-150 ease-out transform -translate-x-1/2"
          style={{ left: `${value * 10}%` }}
        >
          <div
            className={`w-full h-full rounded-full transition-colors duration-300 ${thumbColor}`}
          />
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2 px-1">
        <span>Mild</span>
        <span>Medium</span>
        <span>Hot</span>
        <span>Extreme</span>
      </div>
    </div>
  );
};

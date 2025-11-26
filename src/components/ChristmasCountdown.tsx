import React from 'react';
import { useChristmasCountdown } from '../hooks/useChristmasCountdown';
import { Icon } from './ui/Icon';

export const ChristmasCountdown: React.FC = () => {
  const { days, hours, minutes, seconds, isChristmas } = useChristmasCountdown();

  if (isChristmas) {
    return (
      <div className="flex items-center justify-center gap-2 text-[#D31212] font-bold">
        <Icon name="gift" size={20} className="!animate-none" />
        <span className="text-lg">🎄 Merry Christmas! 🎄</span>
        <Icon name="gift" size={20} className="!animate-none" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1 text-slate-600 text-sm font-medium mb-1">
        <span>Countdown to Christmas</span>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <TimeUnit value={days} label="Days" />
        <Separator />
        <TimeUnit value={hours} label="Hours" />
        <Separator />
        <TimeUnit value={minutes} label="Minutes" />
        <Separator />
        <TimeUnit value={seconds} label="Seconds" />
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl md:text-3xl font-black text-[#D31212] tabular-nums">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
      {label}
    </div>
  </div>
);

const Separator: React.FC = () => (
  <span className="text-[#D31212] font-bold text-xl md:text-2xl">:</span>
);

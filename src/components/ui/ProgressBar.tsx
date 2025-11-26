import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  isActive: boolean;
  duration?: number; // Estimated duration in milliseconds
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ isActive, duration = 15000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      // Reset progress when inactive - use setTimeout to avoid synchronous setState
      const timeoutId = setTimeout(() => setProgress(0), 0);
      return () => clearTimeout(timeoutId);
    }

    const interval = 100; // Update every 100ms
    const increment = (interval / duration) * 100;
    const maxProgress = 95; // Cap at 95% until completion

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next > maxProgress ? maxProgress : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-[#D31212] transition-all duration-300 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

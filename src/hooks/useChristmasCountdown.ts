import { useState, useEffect } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isChristmas: boolean;
}

/**
 * Custom hook to calculate countdown to Christmas
 * Returns time remaining and updates every second
 */
export const useChristmasCountdown = (): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculateTimeUntilChristmas());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilChristmas());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

/**
 * Calculates time remaining until next Christmas
 * If Christmas has passed this year, calculates for next year
 */
const calculateTimeUntilChristmas = (): CountdownTime => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Christmas is December 25th at midnight
  let christmas = new Date(currentYear, 11, 25, 0, 0, 0, 0);

  // If Christmas has passed this year, use next year
  if (now > christmas) {
    christmas = new Date(currentYear + 1, 11, 25, 0, 0, 0, 0);
  }

  const diff = christmas.getTime() - now.getTime();

  // If it's Christmas day (within 24 hours), show as Christmas
  const isChristmas = diff < 86400000 && now.getMonth() === 11 && now.getDate() === 25;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    isChristmas,
  };
};

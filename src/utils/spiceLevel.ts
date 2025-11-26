export interface SpiceInfo {
  label: string;
  icon: 'snowflake' | 'sprout' | 'pepper' | 'flame';
  color: string;
  desc: string;
}

export const getSpiceInfo = (level: number): SpiceInfo => {
  if (level === 0) {
    return {
      label: 'No Heat',
      icon: 'snowflake',
      color: 'text-blue-400',
      desc: 'Cool as a cucumber',
    };
  }
  if (level <= 2) {
    return {
      label: 'Mild',
      icon: 'sprout',
      color: 'text-green-500',
      desc: 'Just a tiny kick',
    };
  }
  if (level <= 4) {
    return {
      label: 'Medium',
      icon: 'pepper',
      color: 'text-yellow-500',
      desc: 'Getting warmer!',
    };
  }
  if (level <= 6) {
    return {
      label: 'Spicy',
      icon: 'pepper',
      color: 'text-orange-500',
      desc: 'Feeling the burn',
    };
  }
  if (level <= 8) {
    return {
      label: 'Fiery',
      icon: 'flame',
      color: 'text-red-500',
      desc: 'Call the fire department',
    };
  }
  return {
    label: 'Inferno',
    icon: 'flame',
    color: 'text-red-700',
    desc: 'Handle with extreme caution!',
  };
};

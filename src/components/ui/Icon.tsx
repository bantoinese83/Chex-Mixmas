import React from 'react';
import {
  FileText,
  Nut,
  Candy,
  Sparkles,
  Soup,
  Users,
  Gift,
  Flame,
  Smile,
  Snowflake,
  Sprout,
  TreePine,
  Circle,
  Heart,
  AlertTriangle,
  Clipboard,
  Check,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  LucideIcon,
} from 'lucide-react';

export type IconName =
  | 'file-text'
  | 'clipboard'
  | 'nut'
  | 'candy'
  | 'sparkles'
  | 'bowl'
  | 'users'
  | 'pepper'
  | 'gift'
  | 'flame'
  | 'smile'
  | 'snowflake'
  | 'sprout'
  | 'tree-pine'
  | 'lollipop'
  | 'cookie'
  | 'heart'
  | 'alert-triangle'
  | 'check'
  | 'check-circle'
  | 'alert-circle'
  | 'info'
  | 'x';

const iconMap: Record<IconName, LucideIcon> = {
  'file-text': FileText,
  clipboard: Clipboard,
  nut: Nut,
  candy: Candy,
  sparkles: Sparkles,
  bowl: Soup,
  users: Users,
  pepper: Flame,
  gift: Gift,
  flame: Flame,
  smile: Smile,
  snowflake: Snowflake,
  sprout: Sprout,
  'tree-pine': TreePine,
  lollipop: Candy,
  cookie: Circle,
  heart: Heart,
  'alert-triangle': AlertTriangle,
  check: Check,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  info: Info,
  x: X,
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', ...props }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={className} {...props} />;
};

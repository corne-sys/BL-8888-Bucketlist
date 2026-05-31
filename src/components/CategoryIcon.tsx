import React from 'react';
import { 
  Compass, BookOpen, Heart, Globe, MapPin, Trees, 
  Milestone, Sparkles, Activity, Users, Palette, TrendingUp, HelpCircle
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function CategoryIcon({ name, className = "w-5 h-5", size }: CategoryIconProps) {
  const icons: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
    Compass,
    BookOpen,
    Heart,
    Globe,
    MapPin,
    Trees,
    Milestone,
    Sparkles,
    Activity,
    Users,
    Palette,
    TrendingUp,
  };

  const IconComponent = icons[name] || HelpCircle;

  return <IconComponent className={className} size={size} />;
}

import React from 'react';
import { CategoryId } from '../types';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

interface CategoryOption {
  id: CategoryId;
  label: string;
  icon: string;
  gradient?: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'lottery', label: 'Lottery', icon: '🎱' },
  { id: 'minigames', label: 'Mini games', icon: '🚀' },
  { id: 'slots', label: 'Slots', icon: '🎰' },
  { id: 'casino', label: 'Casino', icon: '♠️' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'fishing', label: 'Fishing', icon: '🎣' },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="px-3 py-1.5 w-full">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all duration-200 select-none active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border border-purple-300/60 shadow-[0_0_18px_rgba(168,85,247,0.6)] scale-102'
                  : 'bg-[#180C3D]/90 border border-purple-500/20 text-purple-200/80 hover:text-white hover:bg-[#221350] hover:border-purple-400/40'
              }`}
            >
              <span className="text-sm filter drop-shadow-xs">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

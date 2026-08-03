import React from 'react';
import { GameItem, CategoryId } from '../types';
import { GameCard } from './GameCard';
import { ChevronRight } from 'lucide-react';

interface GameGridProps {
  games: GameItem[];
  activeCategory: CategoryId;
  onPlayGame: (game: GameItem) => void;
  onViewAllCategory?: (category: CategoryId) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  activeCategory,
  onPlayGame,
  onViewAllCategory,
}) => {
  const categoryNames: Record<CategoryId, string> = {
    popular: 'Popular',
    lottery: 'Lottery',
    minigames: 'Mini Games',
    slots: 'Slots',
    casino: 'Live Casino',
    sports: 'Sports Book',
    fishing: 'Fishing Hunter',
  };

  const currentCategoryLabel = categoryNames[activeCategory] || 'Popular';

  return (
    <section className="px-3 py-1 flex flex-col gap-2">
      
      {/* Section Header Bar matching screenshot slant header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-1.5">
        
        {/* Left Slanted Slanted Tab Badge */}
        <div className="relative flex items-center">
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 border border-purple-400/50 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md px-4 py-1 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            <span className="text-sm font-black italic tracking-wide text-white uppercase drop-shadow-xs">
              {currentCategoryLabel}
            </span>
          </div>
        </div>

        {/* Right "ALL >" Link */}
        <button
          onClick={() => onViewAllCategory && onViewAllCategory(activeCategory)}
          className="flex items-center gap-0.5 text-xs font-black text-purple-300 hover:text-white transition-colors active:scale-95"
        >
          <span>ALL</span>
          <ChevronRight className="w-4 h-4 text-purple-400" />
        </button>

      </div>

      {/* 3-Column Games Grid matching reference layout */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 py-1">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
        ))}
      </div>

    </section>
  );
};

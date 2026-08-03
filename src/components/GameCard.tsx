import React, { useState } from 'react';
import { GameItem } from '../types';
import { Play, Sparkles, Flame, Shield, Trophy, Zap, Compass, Star } from 'lucide-react';
import { normalizeImageUrl } from '../utils/imageUtils';

interface GameCardProps {
  game: GameItem;
  onPlayGame: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlayGame }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cleanImageUrl = normalizeImageUrl(game.imageUrl);

  // Helper to render high-contrast 3D vector graphics for each theme
  const renderCardGraphic = () => {
    switch (game.theme) {
      case 'aviator-dark':
      case 'aviator-red':
      case 'sky-aviator':
        return (
          <div className="relative z-10 my-auto flex flex-col items-center justify-center animate-float">
            <svg viewBox="0 0 100 60" className="w-28 h-16 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]">
              <path
                d="M10 35 L40 28 L70 12 L95 20 L80 32 L45 36 L25 45 Z"
                fill="#DC2626"
                stroke="#FCA5A5"
                strokeWidth="1.5"
              />
              <path d="M40 28 L60 5 L75 10 L52 28 Z" fill="#EF4444" />
              <path d="M45 36 L55 52 L68 48 L52 35 Z" fill="#991B1B" />
              <circle cx="85" cy="22" r="3" fill="#FFE4E6" />
              {/* Flight speed trail */}
              <line x1="5" y1="38" x2="25" y2="46" stroke="#EF4444" strokeWidth="2" strokeDasharray="2,2" />
            </svg>
          </div>
        );

      case 'wingo':
        return (
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 120 100" className="w-28 h-20 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
              <defs>
                <radialGradient id="wingoBallRed" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FF8A8A"/>
                  <stop offset="50%" stopColor="#DC2626"/>
                  <stop offset="100%" stopColor="#7F1D1D"/>
                </radialGradient>
                <radialGradient id="wingoBallDark" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#6B7280"/>
                  <stop offset="50%" stopColor="#111827"/>
                  <stop offset="100%" stopColor="#000000"/>
                </radialGradient>
                <radialGradient id="wingoBallGreen" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#86EFAC"/>
                  <stop offset="50%" stopColor="#16A34A"/>
                  <stop offset="100%" stopColor="#14532D"/>
                </radialGradient>
              </defs>
              {/* Ball 1 */}
              <circle cx="35" cy="40" r="20" fill="url(#wingoBallRed)" />
              <circle cx="35" cy="40" r="9" fill="#FFF" />
              <text x="32" y="44" fontSize="11" fontWeight="bold" fill="#000">7</text>

              {/* Ball 2 */}
              <circle cx="82" cy="42" r="18" fill="url(#wingoBallDark)" stroke="#374151" strokeWidth="1" />
              <circle cx="82" cy="42" r="8" fill="#FFF" />
              <text x="79" y="46" fontSize="10" fontWeight="bold" fill="#000">8</text>

              {/* Ball 3 Green */}
              <circle cx="58" cy="30" r="15" fill="url(#wingoBallGreen)" />
              <circle cx="58" cy="30" r="7" fill="#FFF" />
              <text x="56" y="33" fontSize="9" fontWeight="bold" fill="#000">3</text>

              {/* Gold Rupee Coin */}
              <circle cx="58" cy="68" r="16" fill="#FFC107" stroke="#FFF" strokeWidth="1.5" />
              <text x="52" y="74" fontSize="16" fontWeight="extrabold" fill="#78350F">₹</text>
            </svg>
          </div>
        );

      case 'cricket':
        return (
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-24 h-20 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
              <path d="M50 5 L85 20 L85 55 C85 75 50 88 50 88 C50 88 15 75 15 55 L15 20 Z" fill="#065F46" stroke="#A7F3D0" strokeWidth="2" />
              <path d="M35 30 C35 22 65 22 65 30 L65 48 C65 52 58 55 50 55 C42 55 35 52 35 48 Z" fill="#047857" stroke="#FFF" strokeWidth="1.5" />
              <path d="M32 40 L68 40 M32 44 L68 44" stroke="#A7F3D0" strokeWidth="1.5" />
              <circle cx="50" cy="68" r="6" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
            </svg>
          </div>
        );

      case 'pubg':
        return (
          <div className="relative z-10 my-auto">
            <svg viewBox="0 0 100 90" className="w-24 h-20 filter drop-shadow-[0_6px_12px_rgba(245,158,11,0.6)]">
              <defs>
                <linearGradient id="helmetMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B"/>
                  <stop offset="50%" stopColor="#D97706"/>
                  <stop offset="100%" stopColor="#78350F"/>
                </linearGradient>
              </defs>
              <path d="M20 45 C20 18 80 18 80 45 L80 60 L20 60 Z" fill="url(#helmetMetal)" stroke="#FBBF24" strokeWidth="1.5"/>
              <rect x="30" y="42" width="40" height="12" rx="2" fill="#111827" stroke="#F59E0B" strokeWidth="1"/>
              <line x1="40" y1="42" x2="40" y2="54" stroke="#D97706" strokeWidth="1"/>
              <line x1="50" y1="42" x2="50" y2="54" stroke="#D97706" strokeWidth="1"/>
              <line x1="60" y1="42" x2="60" y2="54" stroke="#D97706" strokeWidth="1"/>
            </svg>
          </div>
        );

      case 'mines':
        return (
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-24 h-20 filter drop-shadow-[0_6px_15px_rgba(99,102,241,0.8)]">
              <polygon points="50,10 80,30 80,65 50,85 20,65 20,30" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
              <polygon points="50,20 70,35 50,70 30,35" fill="#818CF8" />
              <circle cx="50" cy="45" r="10" fill="#E0E7FF" />
            </svg>
          </div>
        );

      case 'gold-slot':
        return (
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-26 h-20 filter drop-shadow-[0_6px_15px_rgba(245,158,11,0.8)]">
              <rect x="15" y="20" width="70" height="50" rx="8" fill="#78350F" stroke="#FBBF24" strokeWidth="2" />
              <rect x="22" y="28" width="56" height="34" rx="4" fill="#000" />
              <text x="27" y="52" fontSize="20" fontWeight="black" fill="#F59E0B">7</text>
              <text x="44" y="52" fontSize="20" fontWeight="black" fill="#EF4444">7</text>
              <text x="61" y="52" fontSize="20" fontWeight="black" fill="#10B981">7</text>
            </svg>
          </div>
        );

      case 'casino-blue':
      default:
        return (
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 90" className="w-24 h-20 filter drop-shadow-[0_6px_15px_rgba(59,130,246,0.8)]">
              <rect x="25" y="20" width="35" height="50" rx="4" fill="#FFF" stroke="#2563EB" strokeWidth="1.5" transform="rotate(-10 40 45)" />
              <text x="32" y="42" fontSize="16" fontWeight="bold" fill="#DC2626" transform="rotate(-10 40 45)">A</text>
              <rect x="45" y="20" width="35" height="50" rx="4" fill="#FFF" stroke="#2563EB" strokeWidth="1.5" transform="rotate(10 60 45)" />
              <text x="52" y="42" fontSize="16" fontWeight="bold" fill="#000" transform="rotate(10 60 45)">K</text>
            </svg>
          </div>
        );
    }
  };

  // Helper for background gradient based on theme
  const getGradientBg = () => {
    switch (game.theme) {
      case 'aviator-dark':
        return 'bg-gradient-to-br from-red-950 via-stone-900 to-black border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.3)]';
      case 'aviator-red':
        return 'bg-gradient-to-br from-rose-800 via-red-900 to-rose-950 border-rose-400/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
      case 'sky-aviator':
        return 'bg-gradient-to-br from-sky-600 via-sky-800 to-indigo-950 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]';
      case 'wingo':
        return 'bg-gradient-to-br from-amber-600 via-orange-700 to-amber-950 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'cricket':
        return 'bg-gradient-to-br from-emerald-600 via-emerald-800 to-green-950 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'pubg':
        return 'bg-gradient-to-br from-amber-900 via-yellow-950 to-zinc-950 border-amber-500/50 shadow-[0_0_15px_rgba(217,119,6,0.3)]';
      case 'mines':
        return 'bg-gradient-to-br from-indigo-700 via-purple-900 to-slate-950 border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]';
      case 'gold-slot':
        return 'bg-gradient-to-br from-amber-700 via-yellow-900 to-red-950 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'casino-blue':
      default:
        return 'bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
    }
  };

  return (
    <div
      onClick={() => onPlayGame(game)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.03] active:scale-95 flex flex-col aspect-[4/5] w-full ${getGradientBg()}`}
    >
      {/* CARD TOP BADGE / TAG */}
      {game.badge && (
        <div className="absolute top-2 left-2 z-20">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider text-white shadow-md border border-white/20 flex items-center gap-1 ${game.badgeColor || 'bg-red-600'}`}>
            <Flame className="w-2.5 h-2.5 fill-white" />
            {game.badge}
          </span>
        </div>
      )}

      {/* TOP RIGHT HOT / PLAYERS COUNT */}
      <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-white/10 text-[9px] font-bold text-amber-300 flex items-center gap-1">
        <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
        {game.playersCount ? `${(game.playersCount / 1000).toFixed(1)}k` : 'HOT'}
      </div>

      {/* CARD CONTENT / GRAPHIC AREA */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Render Image if available and valid */}
        {cleanImageUrl && !hasError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-indigo-950/90 to-purple-900/60 animate-pulse rounded-2xl border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.6)] flex flex-col items-center justify-center gap-2 z-10">
                <div className="w-8 h-8 rounded-full border-2 border-purple-400/40 border-t-amber-400 animate-spin shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
              </div>
            )}
            <img
              src={cleanImageUrl}
              alt={game.title}
              decoding="async"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={() => setHasError(true)}
              style={{ display: imgLoaded ? 'block' : 'none' }}
              className="w-full h-full object-cover rounded-2xl transition-all duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          /* FALLBACK TO CUSTOM HIGH-IMPACT SVG GRAPHIC */
          renderCardGraphic()
        )}

        {/* BOTTOM GAME TITLE & MULTIPLIER OVERLAY PANEL */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-2.5 pt-6 flex flex-col gap-0.5">
          <div className="text-xs sm:text-sm font-black text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate group-hover:text-amber-300 transition-colors">
            {game.title}
          </div>
          <div className="flex items-center justify-between text-[10px] text-purple-200/90 font-semibold">
            <span className="truncate max-w-[70%]">{game.subtitle || 'Play & Win'}</span>
            <span className="text-amber-400 font-extrabold shrink-0 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
              {game.multiplier || '10x'}
            </span>
          </div>
        </div>

        {/* Play Hover Action Overlay */}
        <div className="absolute inset-0 z-30 bg-purple-950/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.9)] scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-slate-950 stroke-none ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};



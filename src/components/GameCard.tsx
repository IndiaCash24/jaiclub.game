import React, { useState, useEffect } from 'react';
import { GameItem } from '../types';
import { Play } from 'lucide-react';
import { normalizeImageUrl, DEFAULT_AVIATOR_IMAGE, DEFAULT_FALLBACK_IMAGE } from '../utils/imageUtils';

interface GameCardProps {
  game: GameItem;
  onPlayGame: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlayGame }) => {
  const initialUrl = normalizeImageUrl(game.imageUrl);
  const [imgSrc, setImgSrc] = useState<string>(initialUrl);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const freshUrl = normalizeImageUrl(game.imageUrl);
    setImgSrc(freshUrl);
    setHasError(false);
    setImgLoaded(false);
  }, [game.imageUrl]);

  const handleImageError = () => {
    if (imgSrc !== DEFAULT_AVIATOR_IMAGE && (game.theme?.includes('aviator') || game.id?.includes('aviator') || game.title?.toLowerCase().includes('aviator'))) {
      setImgSrc(DEFAULT_AVIATOR_IMAGE);
    } else if (imgSrc !== DEFAULT_FALLBACK_IMAGE) {
      setImgSrc(DEFAULT_FALLBACK_IMAGE);
    } else {
      setHasError(true);
    }
  };

  // Helper to render high-contrast 3D vector graphics if image load fails completely
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
              <circle cx="35" cy="40" r="20" fill="url(#wingoBallRed)" />
              <circle cx="35" cy="40" r="9" fill="#FFF" />
              <text x="32" y="44" fontSize="11" fontWeight="bold" fill="#000">7</text>

              <circle cx="82" cy="42" r="18" fill="url(#wingoBallDark)" stroke="#374151" strokeWidth="1" />
              <circle cx="82" cy="42" r="8" fill="#FFF" />
              <text x="79" y="46" fontSize="10" fontWeight="bold" fill="#000">8</text>

              <circle cx="58" cy="30" r="15" fill="url(#wingoBallGreen)" />
              <circle cx="58" cy="30" r="7" fill="#FFF" />
              <text x="56" y="33" fontSize="9" fontWeight="bold" fill="#000">3</text>

              <circle cx="58" cy="68" r="16" fill="#FFC107" stroke="#FFF" strokeWidth="1.5" />
              <text x="52" y="74" fontSize="16" fontWeight="extrabold" fill="#78350F">₹</text>
            </svg>
          </div>
        );

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
      default:
        return 'bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
    }
  };

  return (
    <div
      onClick={() => onPlayGame(game)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.03] active:scale-95 flex flex-col aspect-[4/5] w-full ${getGradientBg()}`}
    >
      {/* 100% PURE GAME IMAGE CONTAINER - NO TEXT, NO BADGES, NO TITLES */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {imgSrc && !hasError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-indigo-950/90 to-purple-900/60 animate-pulse rounded-2xl border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.6)] flex items-center justify-center z-10">
                <div className="w-8 h-8 rounded-full border-2 border-purple-400/40 border-t-amber-400 animate-spin shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
              </div>
            )}
            <img
              src={imgSrc}
              alt=""
              decoding="async"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={handleImageError}
              className="w-full h-full object-cover rounded-2xl transition-all duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          renderCardGraphic()
        )}

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



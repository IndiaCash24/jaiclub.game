import React, { useState } from 'react';
import { GameItem } from '../types';
import { Play } from 'lucide-react';
import { normalizeImageUrl, DEFAULT_DIAMOND_IMAGE } from '../utils/imageUtils';

interface GameCardProps {
  game: GameItem;
  onPlayGame: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlayGame }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cleanImageUrl = normalizeImageUrl(game.imageUrl);

  return (
    <div
      onClick={() => onPlayGame(game)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-purple-500/30 bg-[#150B33] shadow-lg hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all duration-200 flex flex-col aspect-[4/5] w-full"
    >
      {/* 100% PURE GAME IMAGE CONTAINER - NO TEXT ANYWHERE */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#100728]">
        
        {/* Display ONLY the game image when imageUrl is present and hasn't permanently failed */}
        {game.imageUrl && !hasError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Blinking glowing shadow skeleton while URL is loading */}
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-indigo-950/90 to-purple-900/60 animate-pulse rounded-2xl border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.6)] flex flex-col items-center justify-center gap-2 z-10">
                <div className="w-8 h-8 rounded-full border-2 border-purple-400/40 border-t-amber-400 animate-spin shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                <div className="w-16 h-2 bg-purple-500/40 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            )}
            <img
              src={cleanImageUrl}
              alt=""
              decoding="async"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== window.location.origin + DEFAULT_DIAMOND_IMAGE && !target.src.endsWith(DEFAULT_DIAMOND_IMAGE)) {
                  target.src = DEFAULT_DIAMOND_IMAGE;
                } else {
                  setHasError(true);
                }
              }}
              style={{ display: imgLoaded ? 'block' : 'none' }}
              className="w-full h-full object-cover rounded-2xl transition-all duration-300 group-hover:scale-108 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            />
          </div>
        ) : null}

        {/* THEME 1: AVIATOR DARK (Pure Jet graphic - NO TEXT) */}
        {(!game.imageUrl || hasError) && game.theme === 'aviator-dark' && (
          <div className="w-full h-full bg-radial from-stone-900 via-zinc-950 to-black p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-transparent to-black opacity-80" />
            
            {/* Glowing 3D Red Jet Graphic */}
            <div className="relative z-10 my-auto animate-float">
              <svg viewBox="0 0 100 60" className="w-28 h-16 filter drop-shadow-[0_0_12px_rgba(220,38,38,0.9)]">
                <path
                  d="M10 35 L40 28 L70 12 L95 20 L80 32 L45 36 L25 45 Z"
                  fill="#DC2626"
                  stroke="#FCA5A5"
                  strokeWidth="1.5"
                />
                <path d="M40 28 L60 5 L75 10 L52 28 Z" fill="#B91C1C" />
                <path d="M45 36 L55 52 L68 48 L52 35 Z" fill="#991B1B" />
                <circle cx="85" cy="22" r="3" fill="#FFE4E6" />
              </svg>
            </div>
          </div>
        )}

        {/* THEME 2: AVIATOR RED (Deep crimson background with white vector plane - NO TEXT) */}
        {(!game.imageUrl || hasError) && game.theme === 'aviator-red' && (
          <div className="w-full h-full bg-gradient-to-b from-rose-800 via-rose-900 to-red-950 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/20 rounded-full blur-xl" />

            {/* White minimalist vector plane graphic */}
            <div className="relative z-10 my-auto animate-float">
              <svg viewBox="0 0 100 60" className="w-28 h-16 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                <path
                  d="M8 32 L35 25 L68 10 L92 18 L78 30 L42 34 L22 42 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M38 25 L58 4 L70 8 L48 25 Z" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
                <line x1="8" y1="32" x2="2" y2="34" stroke="#FFF" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )}

        {/* THEME 3: WINGO (Vibrant orange gradient card with 3D pool balls & gold coin - NO TEXT) */}
        {(!game.imageUrl || hasError) && game.theme === 'wingo' && (
          <div className="w-full h-full bg-gradient-to-br from-orange-500 via-amber-600 to-orange-800 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-300/30 via-transparent to-black/40" />

            {/* Glossy 3D Billiards Pool Balls & Gold Rupee Coin */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              <svg viewBox="0 0 120 100" className="w-28 h-22 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                <defs>
                  <radialGradient id="ball7" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FF8A8A"/>
                    <stop offset="50%" stopColor="#DC2626"/>
                    <stop offset="100%" stopColor="#7F1D1D"/>
                  </radialGradient>
                  <radialGradient id="ball8" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#6B7280"/>
                    <stop offset="50%" stopColor="#111827"/>
                    <stop offset="100%" stopColor="#000000"/>
                  </radialGradient>
                </defs>

                {/* Pool Ball 7 */}
                <circle cx="42" cy="38" r="22" fill="url(#ball7)" />
                <circle cx="42" cy="38" r="10" fill="#FFF" />
                <text x="39" y="42" fontSize="12" fontWeight="bold" fill="#000">7</text>

                {/* Pool Ball 8 */}
                <circle cx="78" cy="48" r="20" fill="url(#ball8)" stroke="#374151" strokeWidth="1" />
                <circle cx="78" cy="48" r="9" fill="#FFF" />
                <text x="75" y="52" fontSize="11" fontWeight="bold" fill="#000">8</text>

                {/* Gold Rupee Coin */}
                <circle cx="55" cy="68" r="16" fill="#FFC107" stroke="#FFF" strokeWidth="1" />
                <text x="49" y="74" fontSize="16" fontWeight="extrabold" fill="#78350F">₹</text>
              </svg>
            </div>
          </div>
        )}

        {/* THEME 4: CRICKET (Neon green eSports theme with cricket helmet emblem - NO TEXT) */}
        {(!game.imageUrl || hasError) && game.theme === 'cricket' && (
          <div className="w-full h-full bg-gradient-to-b from-emerald-400 via-emerald-600 to-green-900 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-300/30 rounded-full blur-lg" />

            <div className="relative z-10 my-auto flex items-center justify-center">
              <svg viewBox="0 0 100 90" className="w-24 h-20 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
                <path d="M50 5 L85 20 L85 55 C85 75 50 88 50 88 C50 88 15 75 15 55 L15 20 Z" fill="#065F46" stroke="#A7F3D0" strokeWidth="2" />
                <path d="M35 30 C35 22 65 22 65 30 L65 48 C65 52 58 55 50 55 C42 55 35 52 35 48 Z" fill="#047857" stroke="#FFF" strokeWidth="1.5" />
                <path d="M32 40 L68 40 M32 44 L68 44" stroke="#A7F3D0" strokeWidth="1.5" />
                <circle cx="50" cy="68" r="5" fill="#EF4444" />
              </svg>
            </div>
          </div>
        )}

        {/* THEME 5: PUBG (Dark tactical theme with 3D gold helmet graphic - NO TEXT) */}
        {(!game.imageUrl || hasError) && game.theme === 'pubg' && (
          <div className="w-full h-full bg-gradient-to-b from-amber-950 via-zinc-900 to-black p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-black" />

            <div className="relative z-10 my-auto">
              <svg viewBox="0 0 100 90" className="w-24 h-20 filter drop-shadow-[0_6px_12px_rgba(245,158,11,0.5)]">
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
          </div>
        )}

        {/* THEME 6: SKY AVIATOR (Sky blue gradient card with cartoon plane - NO TEXT) */}
        {(!game.imageUrl || hasError) && game.theme === 'sky-aviator' && (
          <div className="w-full h-full bg-gradient-to-b from-sky-400 via-sky-600 to-indigo-900 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-2 left-2 w-10 h-4 bg-white/30 rounded-full blur-xs" />
            <div className="absolute top-6 right-3 w-14 h-5 bg-white/20 rounded-full blur-xs" />

            <div className="relative z-10 my-auto animate-float">
              <svg viewBox="0 0 100 65" className="w-24 h-16 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]">
                <defs>
                  <linearGradient id="planeYellow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047"/>
                    <stop offset="100%" stopColor="#EAB308"/>
                  </linearGradient>
                </defs>
                <path d="M15 30 Q50 15 85 30 Q70 45 15 35 Z" fill="url(#planeYellow)" stroke="#FFF" strokeWidth="1"/>
                <polygon points="40,25 65,5 75,5 50,25" fill="#38BDF8" stroke="#FFF" strokeWidth="1"/>
                <polygon points="35,33 55,55 65,55 45,33" fill="#0284C7" stroke="#FFF" strokeWidth="1"/>
                <ellipse cx="88" cy="30" rx="3" ry="12" fill="#E2E8F0" />
              </svg>
            </div>
          </div>
        )}

        {/* FALLBACK THEMES FOR OTHER CATEGORIES (NO TEXT) */}
        {(!game.imageUrl || hasError) && ['gold-slot', 'casino-blue', 'mines'].includes(game.theme) && (
          <div className="w-full h-full bg-gradient-to-b from-purple-800 via-indigo-900 to-slate-950 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-4xl my-auto animate-bounce">
              {game.iconType === 'slot' ? '🎰' : game.iconType === 'cards' ? '♠️' : '💣'}
            </div>
          </div>
        )}

        {/* Play Hover Overlay Button */}
        <div className="absolute inset-0 z-30 bg-purple-950/70 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(236,72,153,0.8)] scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-white stroke-none ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};


import React from 'react';
import { Plus, Bell, ChevronDown } from 'lucide-react';
import { UserState } from '../types';

interface HeaderProps {
  user: UserState;
  onOpenWallet: () => void;
  onOpenNotifications: () => void;
  onToggleLanguage: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenWallet,
  onOpenNotifications,
  onToggleLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#150B33]/90 backdrop-blur-md border-b border-purple-500/30 px-3 py-2 transition-all">
      <div className="flex items-center justify-between gap-2">
        
        {/* Left: Wallet Balance Pill with 3D Gold Plus Button */}
        <div 
          onClick={onOpenWallet}
          className="cursor-pointer group flex items-center bg-[#0C061F]/90 border border-yellow-500/40 rounded-full pl-2.5 pr-1 py-1 transition-all hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(255,215,0,0.3)] active:scale-95"
        >
          <div className="flex flex-col pr-1.5">
            <span className="text-[10px] uppercase tracking-wider text-yellow-400/80 font-medium -mb-0.5">
              Wallet
            </span>
            <span className="text-sm font-black gold-metallic-text tracking-tight">
              ₹{user.balance.toFixed(2)}
            </span>
          </div>

          <button 
            type="button"
            aria-label="Add Funds"
            className="w-6 h-6 rounded-full gold-metallic-btn flex items-center justify-center text-slate-950 font-black text-sm shadow-md hover:brightness-110 active:scale-90 transition-transform"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Center: "JAI CLUB" Esports Brand Logo with Mini Crown */}
        <div className="flex flex-col items-center justify-center cursor-pointer select-none">
          <div className="flex items-center gap-1 relative">
            {/* Crown icon on top */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-yellow-400 text-[10px] filter drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] animate-pulse">
              👑
            </div>

            <div className="flex items-center tracking-tighter text-lg font-black italic">
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] pr-0.5">
                JAI
              </span>
              <span className="inline-flex items-center justify-center text-purple-400 text-sm mx-0.5 filter drop-shadow-[0_0_6px_rgba(192,132,252,0.9)]">
                ♣
              </span>
              <span className="text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                CLUB
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[8px] tracking-widest text-purple-300/70 font-semibold uppercase -mt-0.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            ESPORTS & CASINO
            <span className="w-1 h-1 rounded-full bg-pink-500" />
          </div>
        </div>

        {/* Right: Actions (Download/Notifications & Language Switcher) */}
        <div className="flex items-center gap-1.5">
          
          {/* Notification / Inbox button with gold/neon gradient SVG bell icon */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-full bg-[#201148] border border-purple-500/40 text-purple-200 hover:text-white hover:border-amber-400/80 active:scale-90 transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">
              <defs>
                <linearGradient id="headerBellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE57F"/>
                  <stop offset="50%" stopColor="#FFC107"/>
                  <stop offset="100%" stopColor="#FF8F00"/>
                </linearGradient>
              </defs>
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                fill="none"
                stroke="url(#headerBellGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {user.unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#150B33] animate-pulse" />
            )}
          </button>

          {/* Language Switcher EN badge with crisp US flag icon */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 bg-[#201148] border border-purple-500/40 hover:border-purple-300 rounded-full px-2 py-1 text-xs font-bold text-slate-200 active:scale-95 transition-all"
          >
            {/* US Flag Icon */}
            <span className="inline-block w-4 h-3 rounded-[1px] overflow-hidden shadow-xs relative border border-white/20">
              {user.language === 'EN' ? (
                <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                  <rect width="640" height="480" fill="#bd3d44"/>
                  <path fill="#fff" d="M0 36.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0z"/>
                  <rect width="256" height="258.5" fill="#192f5d"/>
                </svg>
              ) : (
                <span className="text-[10px]">🇮🇳</span>
              )}
            </span>
            <span className="text-[11px] uppercase tracking-wider">{user.language}</span>
            <ChevronDown className="w-3 h-3 text-purple-300" />
          </button>

        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

// Gold Diamond Star Icon (far left of capsule)
const GoldStarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 text-amber-300 fill-amber-300 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// 3D Gold Home Icon
const GoldHomeIcon = ({ active }: { active: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 transition-all duration-300 ${
      active
        ? 'text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] scale-105'
        : 'text-amber-100/70'
    }`}
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

// Playing Cards Icon (2 Tilted Cards with Spade)
const GoldCardsIcon = ({ active }: { active: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 transition-all duration-300 ${
      active
        ? 'text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] scale-105'
        : 'text-amber-100/70'
    }`}
  >
    {/* Back Card tilted */}
    <path
      d="M5.5 4.5A1.5 1.5 0 0 0 4 6v11a1.5 1.5 0 0 0 1.5 1.5H7V6a1.5 1.5 0 0 1 1.5-1.5h10V4.5A1.5 1.5 0 0 0 17 3H5.5z"
      opacity="0.6"
    />
    {/* Front Card with spade */}
    <path d="M9.5 6A1.5 1.5 0 0 0 8 7.5v12A1.5 1.5 0 0 0 9.5 21h10a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 19.5 6h-10zm5 4c.6 0 1.2.4 1.5 1 .3-.6.9-1 1.5-1 1 0 1.8.8 1.8 1.8 0 1.5-2.1 3.2-3.3 4.2-1.2-1-3.3-2.7-3.3-4.2 0-1 .8-1.8 1.8-1.8z" />
  </svg>
);

// Royal Gold Crown Icon
const GoldCrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,1)]">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
  </svg>
);

// Gold Wallet Icon
const GoldWalletIcon = ({ active }: { active: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 transition-all duration-300 ${
      active
        ? 'text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] scale-105'
        : 'text-amber-100/70'
    }`}
  >
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

// Gold Account User Icon
const GoldAccountIcon = ({ active }: { active: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 transition-all duration-300 ${
      active
        ? 'text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] scale-105'
        : 'text-amber-100/70'
    }`}
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[96%] max-w-[480px] z-50">
      
      {/* GOLD LUXURY CAPSULE CONTAINER (STYLE 1) - Semi-transparent background with backdrop blur */}
      <nav className="relative bg-[#0A0713]/80 border-2 border-[#D4AF37]/80 rounded-full px-3 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.95),0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-xl">
        
        {/* Fine Inner Metallic Rim Glow */}
        <div className="absolute inset-[1px] rounded-full border border-amber-300/30 pointer-events-none" />

        <div className="flex items-center justify-between relative px-2 py-0.5">
          
          {/* 1. HOME TAB */}
          <button
            onClick={() => onTabChange('home')}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all relative"
          >
            <GoldHomeIcon active={activeTab === 'home'} />
            <span
              className={`text-[11px] font-semibold tracking-tight mt-0.5 ${
                activeTab === 'home' ? 'text-amber-300 font-extrabold' : 'text-[#D8C7A3]/70'
              }`}
            >
              Home
            </span>

            {/* Active Glowing Gold Underline Indicator Bar */}
            {activeTab === 'home' && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,1)]" />
            )}
          </button>

          {/* 2. ACTIVITY TAB */}
          <button
            onClick={() => onTabChange('activity')}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all relative"
          >
            <GoldCardsIcon active={activeTab === 'activity'} />
            <span
              className={`text-[11px] font-semibold tracking-tight mt-0.5 ${
                activeTab === 'activity' ? 'text-amber-300 font-extrabold' : 'text-[#D8C7A3]/70'
              }`}
            >
              Activity
            </span>

            {/* Active Glowing Gold Underline Indicator Bar */}
            {activeTab === 'activity' && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,1)]" />
            )}
          </button>

          {/* 3. CENTER ELEVATED GOLD BADGE - PROMO */}
          <div className="flex-1 flex justify-center relative -top-5">
            <button
              onClick={() => onTabChange('promotion')}
              className={`relative group w-16 h-16 rounded-full p-[2px] transition-all duration-300 active:scale-95 ${
                activeTab === 'promotion' ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Double Outer Glowing Golden Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-600 p-[2.5px] shadow-[0_0_22px_rgba(245,158,11,0.9)]" />

              {/* Inner Medallion Background */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#181108] via-[#0D0814] to-[#07040D] flex flex-col items-center justify-center relative overflow-hidden border border-amber-300/60 p-1">
                {/* Royal Crown Icon */}
                <GoldCrownIcon />

                {/* "PROMO" Text underneath Crown */}
                <span className="text-[9px] font-black tracking-wider text-amber-300 uppercase -mt-0.5 leading-none">
                  PROMO
                </span>
              </div>
            </button>
          </div>

          {/* 4. WALLET TAB */}
          <button
            onClick={() => onTabChange('wallet')}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all relative"
          >
            <GoldWalletIcon active={activeTab === 'wallet'} />
            <span
              className={`text-[11px] font-semibold tracking-tight mt-0.5 ${
                activeTab === 'wallet' ? 'text-amber-300 font-extrabold' : 'text-[#D8C7A3]/70'
              }`}
            >
              Wallet
            </span>

            {/* Active Glowing Gold Underline Indicator Bar */}
            {activeTab === 'wallet' && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,1)]" />
            )}
          </button>

          {/* 5. ACCOUNT TAB */}
          <button
            onClick={() => onTabChange('account')}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all relative"
          >
            <GoldAccountIcon active={activeTab === 'account'} />
            <span
              className={`text-[11px] font-semibold tracking-tight mt-0.5 ${
                activeTab === 'account' ? 'text-amber-300 font-extrabold' : 'text-[#D8C7A3]/70'
              }`}
            >
              Account
            </span>

            {/* Active Glowing Gold Underline Indicator Bar */}
            {activeTab === 'account' && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,1)]" />
            )}
          </button>

        </div>
      </nav>
    </div>
  );
};



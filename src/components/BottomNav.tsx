import React from 'react';
import { ActiveTab } from '../types';
import { Home, Gift, Wallet, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 bg-[#12092e]/90 backdrop-blur-xl border-t border-purple-500/30 px-2 py-1.5 shadow-[0_-8px_32px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around relative">
        
        {/* 1. HOME TAB */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
            activeTab === 'home' ? 'text-cyan-400 font-extrabold' : 'text-purple-300/70 hover:text-purple-200'
          }`}
        >
          {activeTab === 'home' && (
            <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
          )}
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'filter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* 2. ACTIVITY TAB */}
        <button
          onClick={() => onTabChange('activity')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
            activeTab === 'activity' ? 'text-pink-400 font-extrabold' : 'text-purple-300/70 hover:text-purple-200'
          }`}
        >
          {activeTab === 'activity' && (
            <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,1)]" />
          )}
          <div className="relative">
            <Gift className={`w-5 h-5 ${activeTab === 'activity' ? 'filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : ''}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Activity</span>
        </button>

        {/* 3. ELEVATED CENTER BUTTON: PROMOTION (3D Glowing Diamond PNG Icon with Glowing CSS Shadow) */}
        <div className="flex-1 flex justify-center relative -top-6">
          <button
            onClick={() => onTabChange('promotion')}
            className={`relative group w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 p-0.5 shadow-[0_0_28px_rgba(168,85,247,0.9)] border-2 border-purple-300 transition-all duration-300 active:scale-90 ${
              activeTab === 'promotion' ? 'scale-110 shadow-[0_0_36px_rgba(236,72,153,1)]' : 'hover:scale-105'
            }`}
          >
            {/* Pulsing Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping pointer-events-none" />

            <div className="w-full h-full rounded-full bg-[#1A0B3F] flex flex-col items-center justify-center relative overflow-hidden p-1">
              {/* High Quality 3D Purple Diamond Asset */}
              <img
                src="/src/assets/images/purple_3d_diamond_1785787118017.jpg"
                alt="Promotion Diamond"
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain filter drop-shadow-[0_0_12px_rgba(192,132,252,1)] animate-diamond"
              />

              <span className="text-[8px] font-black tracking-tight text-purple-200 uppercase -mt-0.5 leading-none">
                Promo
              </span>
            </div>
          </button>
        </div>

        {/* 4. WALLET TAB */}
        <button
          onClick={() => onTabChange('wallet')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
            activeTab === 'wallet' ? 'text-amber-400 font-extrabold' : 'text-purple-300/70 hover:text-purple-200'
          }`}
        >
          {activeTab === 'wallet' && (
            <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]" />
          )}
          <Wallet className={`w-5 h-5 ${activeTab === 'wallet' ? 'filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Wallet</span>
        </button>

        {/* 5. ACCOUNT TAB */}
        <button
          onClick={() => onTabChange('account')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
            activeTab === 'account' ? 'text-purple-400 font-extrabold' : 'text-purple-300/70 hover:text-purple-200'
          }`}
        >
          {activeTab === 'account' && (
            <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)]" />
          )}
          <User className={`w-5 h-5 ${activeTab === 'account' ? 'filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Account</span>
        </button>

      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Copy, 
  RefreshCw, 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  History, 
  Bell, 
  Gift, 
  BarChart3, 
  Globe, 
  Bot, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Crown, 
  Wallet as WalletIcon,
  Check
} from 'lucide-react';
import { UserState } from '../../types';

interface AccountPageProps {
  user: UserState;
  onBack: () => void;
  onOpenWallet: () => void;
  onToggleLanguage: () => void;
  onOpenAdmin: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  user,
  onBack,
  onOpenWallet,
  onToggleLanguage,
  onOpenAdmin,
}) => {
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const handleCopyUid = () => {
    navigator.clipboard.writeText(user.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#0C071E] text-slate-100 pb-28 font-sans select-none relative">
      
      {/* 1. TOP HEADER BANNER CARD WITH CORAL PINK TO SKY BLUE GRADIENT */}
      <div className="relative bg-gradient-to-r from-[#FF5E80] via-[#A855F7] to-[#38BDF8] pt-4 pb-8 px-4 shadow-[0_10px_25px_rgba(255,94,128,0.25)]">
        
        {/* Top Back Arrow */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-black/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="text-lg font-bold text-white tracking-wide">My Profile</h1>

          <div className="w-6" />
        </div>

        {/* User Identity Info Row */}
        <div className="flex items-center gap-3">
          
          {/* Avatar Circle */}
          <div className="relative w-16 h-16 rounded-full border-2 border-white/80 overflow-hidden shadow-lg flex-shrink-0 bg-slate-800">
            {!avatarLoaded && (
              <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-full flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-amber-300 animate-spin" />
              </div>
            )}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="User Avatar"
              onLoad={() => setAvatarLoaded(true)}
              onError={(e) => {
                setAvatarLoaded(true);
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=200&auto=format&fit=crop&q=80';
              }}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                avatarLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Username & VIP Badge */}
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white truncate tracking-tight">
                {user.username || 'MEMBERNNGRAJNW'}
              </h2>
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-white/60 shadow-sm flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-950 fill-amber-950" /> VIP{user.vipLevel || 0}
              </span>
            </div>

            {/* UID Copy Button Pill */}
            <div className="mt-1 inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-mono border border-white/30">
              <span>UID | {user.id || '2460172'}</span>
              <button
                onClick={handleCopyUid}
                className="hover:scale-110 active:scale-95 transition-transform"
                title="Copy UID"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white/80" />}
              </button>
            </div>

            {/* Timestamp */}
            <p className="text-[10px] text-white/80 mt-1 font-medium">
              Last login: 2026-08-04 02:58:23
            </p>
          </div>

        </div>

      </div>

      {/* 2. OVERLAY MAIN DARK CONTAINER */}
      <div className="px-3.5 -mt-4 space-y-4 max-w-[480px] mx-auto relative z-10">
        
        {/* TOTAL BALANCE & QUICK ACTION ROW CARD */}
        <div className="bg-[#181031] border border-purple-500/30 rounded-3xl p-4 shadow-xl space-y-4">
          
          {/* Balance Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-purple-300 font-semibold block">Total balance</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-black text-white tracking-tight">
                  ₹{user.balance.toFixed(2)}
                </span>
                <button
                  onClick={handleRefreshBalance}
                  className={`p-1 rounded-full text-purple-300 hover:text-white transition-transform ${
                    isRefreshing ? 'animate-spin text-amber-400' : ''
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Icons Row */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-purple-500/20">
            
            {/* ARWallet */}
            <button
              onClick={onOpenWallet}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90">
                <WalletIcon className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200">ARWallet</span>
            </button>

            {/* Deposit */}
            <button
              onClick={onOpenWallet}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90">
                <ArrowDownLeft className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200">Deposit</span>
            </button>

            {/* Withdraw */}
            <button
              onClick={onOpenWallet}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90">
                <ArrowUpRight className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200">Withdraw</span>
            </button>

            {/* VIP */}
            <button
              onClick={() => alert(`VIP Level ${user.vipLevel} Active! Higher deposit levels unlock daily rebates.`)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90">
                <Crown className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200">VIP</span>
            </button>

          </div>

        </div>

        {/* 3. 2x2 GRID SECTION (GAME HISTORY, TRANSACTION, DEPOSIT, WITHDRAW) */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Game History */}
          <button
            onClick={() => alert('Opening Game History Logs')}
            className="bg-[#181031] border border-purple-500/25 rounded-2xl p-3.5 flex items-center gap-3 active:scale-98 transition-transform text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Game History</div>
              <div className="text-[10px] text-purple-300">My game history</div>
            </div>
          </button>

          {/* Transaction */}
          <button
            onClick={() => alert('Opening Transaction History Logs')}
            className="bg-[#181031] border border-purple-500/25 rounded-2xl p-3.5 flex items-center gap-3 active:scale-98 transition-transform text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Transaction</div>
              <div className="text-[10px] text-purple-300">My transaction history</div>
            </div>
          </button>

          {/* Deposit */}
          <button
            onClick={onOpenWallet}
            className="bg-[#181031] border border-purple-500/25 rounded-2xl p-3.5 flex items-center gap-3 active:scale-98 transition-transform text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md flex-shrink-0">
              <ArrowDownLeft className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Deposit</div>
              <div className="text-[10px] text-purple-300">My deposit history</div>
            </div>
          </button>

          {/* Withdraw */}
          <button
            onClick={onOpenWallet}
            className="bg-[#181031] border border-purple-500/25 rounded-2xl p-3.5 flex items-center gap-3 active:scale-98 transition-transform text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Withdraw</div>
              <div className="text-[10px] text-purple-300">My withdraw history</div>
            </div>
          </button>

        </div>

        {/* 4. ADMIN PANEL ACCESS BUTTON */}
        <button
          onClick={onOpenAdmin}
          className="w-full bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 border border-amber-400/50 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 active:scale-98 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-inner group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-amber-300 fill-amber-300/20" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-white tracking-wide flex items-center gap-2">
                ADMIN PANEL <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase">Control</span>
              </div>
              <div className="text-[11px] text-amber-200/80 font-medium">Manage Game Images, Banners, Popup & Rates</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 5. LIST MENU OPTIONS SECTION */}
        <div className="bg-[#181031] border border-purple-500/25 rounded-3xl overflow-hidden divide-y divide-purple-500/20">
          
          {/* Notification */}
          <button
            onClick={() => alert('Notifications: Welcome to JAI CLUB! Get ₹488 bonus on first deposit.')}
            className="w-full p-4 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300">
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs font-bold text-white">Notification</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>

          {/* Gifts */}
          <button
            onClick={() => alert('Gifts section: Claim your daily spin & bonus codes here.')}
            className="w-full p-4 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300">
                <Gift className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs font-bold text-white">Gifts</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>

          {/* Game statistics */}
          <button
            onClick={() => alert('Game statistics: Win Rate 94.2%, Total Rounds 128')}
            className="w-full p-4 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300">
                <BarChart3 className="w-5 h-5 text-sky-400" />
              </div>
              <span className="text-xs font-bold text-white">Game statistics</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>

          {/* Language */}
          <button
            onClick={onToggleLanguage}
            className="w-full p-4 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold text-white">Language</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold">
              <span>{user.language === 'HI' ? 'हिंदी' : 'English'}</span>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </div>
          </button>

        </div>

      </div>

      {/* FLOATING BOT CUSTOMER SERVICE WIDGET AT BOTTOM RIGHT */}
      <button
        onClick={() => alert('Connecting to 24/7 AI Customer Assistant...')}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 border-2 border-white/80 p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.7)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full bg-[#12082C] flex items-center justify-center text-cyan-300">
          <Bot className="w-6 h-6 text-cyan-300 filter drop-shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
        </div>
      </button>

    </div>
  );
};

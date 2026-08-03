import React from 'react';
import { User, Shield, Wallet, Globe, Award, HelpCircle, LogOut, ChevronRight, ArrowLeft, History, Bell, Lock } from 'lucide-react';
import { UserState } from '../../types';

interface AccountPageProps {
  user: UserState;
  onBack: () => void;
  onOpenWallet: () => void;
  onToggleLanguage: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  user,
  onBack,
  onOpenWallet,
  onToggleLanguage,
}) => {
  return (
    <div className="min-h-screen bg-[#0A0418] text-slate-100 pb-24">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#12082B]/95 backdrop-blur-md px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-purple-950/80 text-purple-200 border border-purple-500/30 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-black italic tracking-wider gold-metallic-text uppercase">
              Player Account & Settings
            </h1>
            <p className="text-[11px] text-purple-300">VIP Badge, Security & Personal Details</p>
          </div>
        </div>

        <button
          onClick={onToggleLanguage}
          className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40"
        >
          🌐 {user.language}
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* User Identity Card */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 rounded-2xl p-5 border border-purple-400/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-[0_0_15px_rgba(255,193,7,0.8)] flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#1A0B3F] flex items-center justify-center text-2xl font-black gold-metallic-text">
                👤
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">{user.username}</h2>
                <span className="text-[10px] font-extrabold gold-metallic-btn text-slate-950 px-2 py-0.5 rounded-full">
                  VIP {user.vipLevel}
                </span>
              </div>
              <p className="text-xs text-purple-300">UID: {user.id}</p>
              <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Verified Member</p>
            </div>
          </div>
        </div>

        {/* Balance & Financial Quick Actions */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Total Net Balance</span>
            <div className="text-2xl font-black text-amber-300 gold-metallic-text">₹{user.balance.toFixed(2)}</div>
          </div>

          <button
            onClick={onOpenWallet}
            className="px-4 py-2.5 rounded-xl gold-metallic-btn text-slate-950 font-black text-xs uppercase shadow-[0_0_12px_rgba(255,193,7,0.6)] active:scale-95 transition-all"
          >
            Deposit / Withdraw
          </button>
        </div>

        {/* Security & Account Settings Options */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Account Management</h3>

          {[
            { label: 'Betting & Game History Logs', icon: History, action: () => alert('Showing recent bets history') },
            { label: 'Login & Withdrawal Password', icon: Lock, action: () => alert('Password Settings') },
            { label: 'App Notifications & Alerts', icon: Bell, action: () => alert('Notification Preferences') },
            { label: '24/7 Live Customer Support', icon: HelpCircle, action: () => alert('Connecting to Live Agent...') },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full p-3 rounded-xl bg-[#221252] border border-purple-500/20 flex items-center justify-between text-xs font-bold text-purple-200 hover:text-white hover:border-purple-400 active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => alert('Logged out successfully.')}
          className="w-full py-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-900/80 active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4" /> Log Out Account
        </button>

      </div>
    </div>
  );
};

import React from 'react';
import { UserState } from '../../types';
import { X, User, ShieldCheck, Wallet, History, Headphones, Globe, Settings, LogOut, ChevronRight, Award } from 'lucide-react';

interface AccountModalProps {
  user: UserState;
  onClose: () => void;
  onOpenWallet: () => void;
  onToggleLanguage: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  user,
  onClose,
  onOpenWallet,
  onToggleLanguage,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[460px] bg-[#160B38] border border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11082C] border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">MY ACCOUNT</h3>
              <p className="text-[10px] text-purple-300/80">JAI CLUB Member Profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Account Body */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[75vh]">
          
          {/* User Profile Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-purple-950/80 border border-purple-500/40 p-4 flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#12082B] flex items-center justify-center text-xl text-yellow-400 font-bold">
                👤
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white">
                VIP {user.vipLevel}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-black text-white truncate">{user.username}</h4>
              <p className="text-xs text-purple-300 font-mono">ID: {user.id}</p>
              <div className="mt-1 inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/30 rounded-full px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> VERIFIED MEMBER
              </div>
            </div>
          </div>

          {/* Balance & Wallet Bar */}
          <div className="bg-[#11082C] border border-purple-500/30 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-300 block">Total Balance</span>
              <span className="text-xl font-black gold-metallic-text">₹{user.balance.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenWallet();
              }}
              className="gold-metallic-btn px-4 py-2 rounded-xl text-xs font-black text-slate-950 uppercase tracking-wider shadow-md"
            >
              DEPOSIT / WALLET
            </button>
          </div>

          {/* Account Options List */}
          <div className="bg-[#11082C] border border-purple-500/30 rounded-2xl overflow-hidden divide-y divide-purple-500/20 text-xs">
            
            <button
              onClick={onToggleLanguage}
              className="w-full p-3.5 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">Language Switcher</span>
              </div>
              <span className="text-xs font-extrabold text-amber-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                {user.language}
              </span>
            </button>

            <button
              onClick={() => alert('Customer Support 24x7: Telegram / Live Chat active!')}
              className="w-full p-3.5 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-pink-400" />
                <span className="font-bold">24x7 Customer Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={() => alert('Security settings: Password & 2FA active')}
              className="w-full p-3.5 flex items-center justify-between text-purple-200 hover:text-white hover:bg-purple-900/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">Security Center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={() => alert('Logged out successfully.')}
              className="w-full p-3.5 flex items-center justify-between text-rose-400 hover:bg-rose-950/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4" />
                <span className="font-bold">Log Out</span>
              </div>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

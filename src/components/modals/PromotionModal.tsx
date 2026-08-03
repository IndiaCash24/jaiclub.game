import React, { useState } from 'react';
import { UserState } from '../../types';
import { X, Sparkles, Copy, Share2, Award, Gift, Check, Shield } from 'lucide-react';

interface PromotionModalProps {
  user: UserState;
  onClose: () => void;
  onClaimBonus: (amount: number) => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  user,
  onClose,
  onClaimBonus,
}) => {
  const [claimedBonus, setClaimedBonus] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const referralCode = 'JAICLUB8899';

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://jaiclub39.com/register?ref=${referralCode}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleClaimFirstDeposit = () => {
    if (claimedBonus) return;
    setClaimedBonus(true);
    onClaimBonus(488);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[460px] bg-[#160B38] border border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11082C] border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">PROMOTION & REWARDS</h3>
              <p className="text-[10px] text-purple-300/80">JAI CLUB VIP Bonus Hub</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Promotions Body */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[75vh]">
          
          {/* Card 1: First Deposit ₹488 Bonus */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-pink-900/90 border border-yellow-500/50 p-4 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-950/80 border border-yellow-500/40 px-2 py-0.5 rounded-full">
                  EXCLUSIVE PROMO
                </span>
                <h4 className="text-lg font-black text-white mt-1">FIRST DEPOSIT BONUS</h4>
                <p className="text-xs text-purple-200 mt-0.5">Deposit ₹500 or more to claim your <strong className="gold-metallic-text font-black">₹488 Bonus</strong> instantly.</p>
              </div>
              <div className="text-2xl font-black gold-metallic-text">₹488</div>
            </div>

            <button
              onClick={handleClaimFirstDeposit}
              disabled={claimedBonus}
              className={`mt-3 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                claimedBonus
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                  : 'gold-metallic-btn text-slate-950 shadow-[0_0_15px_rgba(255,215,0,0.5)] active:scale-95'
              }`}
            >
              {claimedBonus ? '✓ ₹488 CLAIMED & ADDED' : 'CLAIM ₹488 BONUS NOW'}
            </button>
          </div>

          {/* Card 2: VIP Level Rewards */}
          <div className="bg-[#11082C] border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-black text-white">VIP LEVEL PROGRESSION</span>
              </div>
              <span className="text-xs font-bold text-purple-300">VIP {user.vipLevel}</span>
            </div>

            <div className="w-full h-2.5 bg-[#1C0E42] rounded-full overflow-hidden border border-purple-500/20">
              <div className="h-full bg-gradient-to-r from-purple-500 to-amber-400 w-3/5 rounded-full" />
            </div>

            <p className="text-[11px] text-purple-300/80">
              Bet ₹4,500 more to unlock <strong className="text-yellow-400">VIP {user.vipLevel + 1}</strong> & receive ₹1,000 Level Upgrade Cash!
            </p>
          </div>

          {/* Card 3: Invite & Earn 10% Lifetime Rebate */}
          <div className="bg-gradient-to-r from-[#170B3B] to-[#251053] border border-purple-500/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-black text-white flex items-center gap-1">
                  <Share2 className="w-4 h-4 text-cyan-400" /> REFERRAL COMMISSION
                </h5>
                <p className="text-xs text-purple-200 mt-0.5">Earn 10% lifetime commission on every friend's deposit!</p>
              </div>
              <span className="text-xs font-black text-cyan-400 bg-cyan-950 px-2 py-1 rounded-md border border-cyan-500/30">
                10% REBATE
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#0C061F] border border-purple-500/40 rounded-xl p-2">
              <span className="text-xs font-bold text-yellow-400 flex-1 truncate font-mono">
                JAICLUB8899
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-1 active:scale-95"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

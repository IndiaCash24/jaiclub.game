import React, { useState } from 'react';
import { Share2, Copy, Users, DollarSign, Award, ChevronRight, CheckCircle2, ArrowLeft, TrendingUp } from 'lucide-react';
import { UserState } from '../../types';

interface PromotionPageProps {
  user: UserState;
  onBack: () => void;
  onClaimBonus: (amt: number) => void;
}

export const PromotionPage: React.FC<PromotionPageProps> = ({ user, onBack, onClaimBonus }) => {
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const inviteLink = `https://jaiclub.com/register?invite=${user.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaimCommission = () => {
    if (claimed) return;
    onClaimBonus(1248.50);
    setClaimed(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0418] text-slate-100 pb-24">
      {/* Top Bar Header */}
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
              Agent Promotion & Commissions
            </h1>
            <p className="text-[11px] text-purple-300">Invite Friends & Earn Unlimited Cash Daily</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            VIP {user.vipLevel}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Total Earned Commission Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-950 rounded-2xl p-5 border border-purple-400/40 shadow-[0_0_25px_rgba(168,85,247,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-purple-200 uppercase tracking-widest">
                Yesterday Total Commission
              </span>
              <div className="text-3xl font-black text-amber-300 gold-metallic-text my-1">
                ₹{claimed ? '0.00' : '1,248.50'}
              </div>
              <p className="text-[11px] text-purple-200">Tier 1: 85 Members | Tier 2: 210 Members</p>
            </div>

            <button
              onClick={handleClaimCommission}
              disabled={claimed}
              className={`px-4 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
                claimed
                  ? 'bg-purple-950/80 border border-purple-500/30 text-purple-400 cursor-not-allowed'
                  : 'gold-metallic-btn text-slate-950 shadow-[0_0_20px_rgba(255,193,7,0.8)] active:scale-95'
              }`}
            >
              {claimed ? 'Claimed' : 'Claim ₹1248.50'}
            </button>
          </div>
        </div>

        {/* Exclusive Referral Link Copy */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-amber-400" />
              Your Invitation Link
            </span>
            <span className="text-[11px] font-bold text-purple-300">Code: {user.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="flex-1 bg-black/50 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-purple-200 font-mono focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl gold-metallic-btn text-slate-950 font-black text-xs uppercase flex items-center gap-1 active:scale-95 transition-all shadow-[0_0_10px_rgba(255,193,7,0.5)]"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* 3-Tier Commission Breakdown Table */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
          <h2 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            3-Tier Multi-Level Commission Structure
          </h2>

          <div className="space-y-2">
            {[
              { tier: 'Direct Friends (Tier 1)', rate: '0.6%', icon: '🥇', color: 'from-amber-500/20 to-yellow-500/10' },
              { tier: 'Friends of Friends (Tier 2)', rate: '0.3%', icon: '🥈', color: 'from-purple-500/20 to-indigo-500/10' },
              { tier: 'Sub-Referrals (Tier 3)', rate: '0.1%', icon: '🥉', color: 'from-pink-500/20 to-rose-500/10' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl bg-gradient-to-r ${item.color} border border-purple-500/30 flex items-center justify-between`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{item.tier}</div>
                    <div className="text-[10px] text-purple-300">Rebate on every turnover bet</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black gold-metallic-text">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Bonus Milestones */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
          <h2 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Invite Milestones Cash Rewards
          </h2>

          <div className="space-y-2">
            {[
              { count: 5, reward: 150, status: 'Claimed' },
              { count: 10, reward: 350, status: 'Claimed' },
              { count: 20, reward: 800, status: 'Claim (18/20)' },
              { count: 50, reward: 2500, status: 'Locked' },
            ].map((m, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#221252] border border-purple-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-white">Invite {m.count} Active Players</span>
                  <div className="text-[10px] text-amber-300">Reward: ₹{m.reward} Cash</div>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    m.status === 'Claimed'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                      : 'bg-purple-900/60 text-purple-200 border border-purple-500/30'
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

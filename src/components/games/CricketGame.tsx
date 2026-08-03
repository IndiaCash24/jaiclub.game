import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Trophy, Radio, TrendingUp, CheckCircle2 } from 'lucide-react';
import { GameItem, UserState } from '../../types';

interface CricketGameProps {
  game: GameItem;
  user: UserState;
  onBack: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

export const CricketGame: React.FC<CricketGameProps> = ({
  game,
  user,
  onBack,
  onUpdateBalance,
}) => {
  const [betAmount, setBetAmount] = useState<number>(100);
  const [placedBetMsg, setPlacedBetMsg] = useState<string | null>(null);

  const handlePlaceOddsBet = (team: string, odds: number, type: 'BACK' | 'LAY') => {
    if (user.balance < betAmount) {
      alert('Insufficient wallet balance!');
      return;
    }
    onUpdateBalance(user.balance - betAmount);
    setPlacedBetMsg(`✅ ${type} Bet of ₹${betAmount} placed on ${team} @ ${odds.toFixed(2)} odds! Potential payout: ₹${(betAmount * odds).toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-[#070312] text-slate-100 pb-20 flex flex-col">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#12072B]/95 backdrop-blur-md px-4 py-2.5 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-purple-950/80 text-purple-200 border border-purple-500/30 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-black italic tracking-wider text-amber-400 uppercase">
              LIVE CRICKET EXCHANGE
            </h1>
            <p className="text-[11px] text-purple-300">IPL T20 & International Odds</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {placedBetMsg && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center rounded-xl animate-fadeIn">
            {placedBetMsg}
          </div>
        )}

        {/* LIVE SCOREBOARD HEADER */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 rounded-2xl p-4 border border-emerald-500/40 shadow-xl">
          <div className="flex justify-between items-center text-[10px] text-emerald-400 font-bold mb-2">
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> LIVE T20 MATCH 1st INNINGS
            </span>
            <span>OVER 18.4 / 20</span>
          </div>

          <div className="flex justify-between items-center my-2">
            <div>
              <div className="text-base font-black text-white flex items-center gap-2">
                🇮🇳 INDIA <span className="text-amber-300">188/3</span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5">Kohli 74*(42) | Hardik 32*(14)</div>
            </div>

            <div className="text-right">
              <div className="text-base font-black text-slate-400">🇦🇺 AUSTRALIA</div>
              <div className="text-xs text-slate-400 mt-0.5">Yet to bat</div>
            </div>
          </div>

          <div className="mt-3 p-2 rounded-xl bg-black/60 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold">
            🎙️ Commentary: FOUR! Hardik Pandya smashes Starc through extra cover for a boundary!
          </div>
        </div>

        {/* MATCH ODDS BETTING TABLE (BACK & LAY) */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
            <span>Match Winner Market</span>
            <span className="text-purple-300 text-[10px]">Back (Blue) / Lay (Pink)</span>
          </div>

          {/* TEAM 1: INDIA */}
          <div className="p-3 rounded-xl bg-[#221252] border border-purple-500/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-black text-white">INDIA</div>
              <div className="text-[10px] text-emerald-400">Projected Score: 205+</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePlaceOddsBet('INDIA', 1.65, 'BACK')}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-[0_0_10px_rgba(2,132,199,0.5)] active:scale-95"
              >
                BACK 1.65
              </button>
              <button
                onClick={() => handlePlaceOddsBet('INDIA', 1.68, 'LAY')}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-black text-xs shadow-[0_0_10px_rgba(219,39,119,0.5)] active:scale-95"
              >
                LAY 1.68
              </button>
            </div>
          </div>

          {/* TEAM 2: AUSTRALIA */}
          <div className="p-3 rounded-xl bg-[#221252] border border-purple-500/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-black text-white">AUSTRALIA</div>
              <div className="text-[10px] text-purple-300">Target: TBA</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePlaceOddsBet('AUSTRALIA', 2.35, 'BACK')}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-[0_0_10px_rgba(2,132,199,0.5)] active:scale-95"
              >
                BACK 2.35
              </button>
              <button
                onClick={() => handlePlaceOddsBet('AUSTRALIA', 2.40, 'LAY')}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-black text-xs shadow-[0_0_10px_rgba(219,39,119,0.5)] active:scale-95"
              >
                LAY 2.40
              </button>
            </div>
          </div>

          {/* BET AMOUNT SELECTOR */}
          <div className="pt-2">
            <div className="flex justify-between text-xs font-bold text-purple-300 mb-1.5">
              <span>Bet Stake Amount:</span>
              <span className="text-amber-300">₹{betAmount}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setBetAmount(amt)}
                  className={`py-1.5 rounded-lg text-xs font-black border ${
                    betAmount === amt ? 'gold-metallic-btn text-slate-950' : 'bg-[#221252] border-purple-500/30 text-purple-300'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

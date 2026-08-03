import React, { useState } from 'react';
import { ArrowLeft, Zap, Trophy, ShieldCheck, RefreshCw } from 'lucide-react';
import { GameItem, UserState } from '../../types';

interface SlotsGameProps {
  game: GameItem;
  user: UserState;
  onBack: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

export const SlotsGame: React.FC<SlotsGameProps> = ({
  game,
  user,
  onBack,
  onUpdateBalance,
}) => {
  const symbols = ['7️⃣', '💎', '🎰', '🔔', '👑', '🪙'];

  const [reels, setReels] = useState<string[]>(['7️⃣', '7️⃣', '7️⃣']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState<number>(20);
  const [winMessage, setWinMessage] = useState<string | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    if (user.balance < betAmount) {
      alert('Insufficient wallet balance!');
      return;
    }

    onUpdateBalance(user.balance - betAmount);
    setIsSpinning(true);
    setWinMessage(null);

    // Animated spin delay
    setTimeout(() => {
      const r1 = symbols[Math.floor(Math.random() * symbols.length)];
      const r2 = symbols[Math.floor(Math.random() * symbols.length)];
      const r3 = symbols[Math.floor(Math.random() * symbols.length)];

      setReels([r1, r2, r3]);
      setIsSpinning(false);

      if (r1 === r2 && r2 === r3) {
        const win = betAmount * 50;
        onUpdateBalance(user.balance + win);
        setWinMessage(`🎉 MEGA JACKPOT MATCH! You won ₹${win}!`);
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        const win = betAmount * 5;
        onUpdateBalance(user.balance + win);
        setWinMessage(`✨ MINI MATCH! You won ₹${win}!`);
      } else {
        setWinMessage('Spin completed. Try again!');
      }
    }, 1200);
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
              FORTUNE 777 SLOTS
            </h1>
            <p className="text-[10px] text-purple-300">Mega Jackpot 500x Multiplier</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* JACKPOT BANNER */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 rounded-2xl p-3 border border-amber-300 shadow-[0_0_25px_rgba(255,193,7,0.6)] text-center">
          <div className="text-[10px] font-black uppercase text-slate-950 tracking-widest">
            PROGRESSIVE MEGA JACKPOT
          </div>
          <div className="text-3xl font-black text-slate-950 my-0.5 tracking-wider">
            ₹8,49,210.00
          </div>
        </div>

        {winMessage && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center rounded-xl animate-bounce">
            {winMessage}
          </div>
        )}

        {/* 3-REEL MACHINE DISPLAY */}
        <div className="bg-gradient-to-br from-[#1C0E42] via-[#12072E] to-[#0D031F] rounded-2xl p-6 border-2 border-amber-500/50 shadow-2xl">
          <div className="grid grid-cols-3 gap-3 p-4 bg-black/80 rounded-2xl border border-amber-500/30">
            {reels.map((sym, idx) => (
              <div
                key={idx}
                className={`h-24 rounded-xl bg-gradient-to-b from-purple-950 to-slate-950 border border-purple-500/40 flex items-center justify-center text-5xl shadow-inner ${
                  isSpinning ? 'animate-pulse scale-95' : 'scale-100'
                }`}
              >
                {isSpinning ? '❓' : sym}
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-white">
            <span>Spin Bet Amount:</span>
            <span className="text-amber-300 font-black">₹{betAmount}</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 50, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => setBetAmount(amt)}
                className={`py-2 rounded-xl text-xs font-black border ${
                  betAmount === amt ? 'gold-metallic-btn text-slate-950' : 'bg-[#221252] border-purple-500/30 text-purple-200'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wider gold-metallic-btn text-slate-950 shadow-[0_0_20px_rgba(255,193,7,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isSpinning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-slate-950" />}
            {isSpinning ? 'SPINNING REELS...' : `SPIN NOW (₹${betAmount})`}
          </button>
        </div>

      </div>
    </div>
  );
};

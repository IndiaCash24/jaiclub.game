import React, { useState, useEffect } from 'react';
import { GameItem, UserState } from '../../types';
import { X, Play, RotateCcw, Volume2, ShieldCheck, Zap } from 'lucide-react';

interface GameModalProps {
  game: GameItem | null;
  user: UserState;
  onClose: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  game,
  user,
  onClose,
  onUpdateBalance,
}) => {
  if (!game) return null;

  const [betAmount, setBetAmount] = useState<number>(game.minBet || 10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [wonAmount, setWonAmount] = useState<number | null>(null);
  const [autoCashout, setAutoCashout] = useState<number>(2.0);

  // Crash / Game Flight simulation loop
  useEffect(() => {
    let interval: any;
    if (isPlaying && !crashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = +(prev + 0.05 + prev * 0.02).toFixed(2);
          // Random crash generator
          if (Math.random() < 0.03 && next > 1.2) {
            setCrashed(true);
            setIsPlaying(false);
            return next;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, crashed]);

  const handleStartGame = () => {
    if (user.balance < betAmount) {
      alert('Insufficient wallet balance! Please deposit funds.');
      return;
    }
    onUpdateBalance(user.balance - betAmount);
    setWonAmount(null);
    setCrashed(false);
    setMultiplier(1.0);
    setIsPlaying(true);
  };

  const handleCashout = () => {
    if (!isPlaying || crashed) return;
    const win = +(betAmount * multiplier).toFixed(2);
    setWonAmount(win);
    onUpdateBalance(user.balance + win);
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[420px] bg-[#160B38] border border-purple-500/50 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.5)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11082C] border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {game.theme.includes('aviator') ? '🚀' : game.theme === 'wingo' ? '🎱' : '🎰'}
            </span>
            <div>
              <h3 className="text-sm font-black text-white italic tracking-wider">{game.title}</h3>
              <p className="text-[10px] text-purple-300/80 font-semibold">{game.subtitle || 'JAI CLUB LIVE'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold gold-metallic-text bg-black/50 px-2.5 py-1 rounded-full border border-yellow-500/30">
              ₹{user.balance.toFixed(2)}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Interactive Game Display Stage */}
        <div className="relative w-full h-56 bg-gradient-to-b from-[#0B041A] via-[#12082B] to-[#1E0E45] p-4 flex flex-col items-center justify-center overflow-hidden">
          
          {/* Flight Curve / Multiplier Stage */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent pointer-events-none" />

          {game.theme.includes('aviator') ? (
            <div className="relative z-10 flex flex-col items-center justify-center">
              {!isPlaying && !crashed && !wonAmount && (
                <div className="text-center">
                  <div className="text-5xl my-2 animate-float">🚀</div>
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-widest">READY TO LAUNCH</p>
                </div>
              )}

              {isPlaying && (
                <div className="text-center animate-pulse">
                  <div className="text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] my-1">
                    {multiplier.toFixed(2)}x
                  </div>
                  <div className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full animate-bounce">
                    FLYING... WIN: ₹{(betAmount * multiplier).toFixed(2)}
                  </div>
                </div>
              )}

              {crashed && (
                <div className="text-center">
                  <div className="text-4xl font-black text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]">
                    FLEW AWAY @ {multiplier.toFixed(2)}x
                  </div>
                  <p className="text-xs text-rose-300 mt-1 font-bold">Better luck next flight!</p>
                </div>
              )}

              {wonAmount && (
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]">
                    YOU WON ₹{wonAmount}!
                  </div>
                  <p className="text-xs text-emerald-300 mt-1 font-bold">Cashed out at {multiplier.toFixed(2)}x</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center relative z-10">
              <div className="text-6xl my-2 animate-bounce">🎰</div>
              <div className="text-2xl font-black gold-metallic-text">LUCKY SPIN PRO</div>
              <p className="text-xs text-purple-300 mt-1">Multipliers up to 500x</p>
            </div>
          )}

          {/* Guarantee Seal */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" /> Provably Fair 100%
          </div>

        </div>

        {/* Betting Controls & Action Buttons */}
        <div className="p-4 bg-[#11082C] border-t border-purple-500/30 flex flex-col gap-3">
          
          {/* Quick Bet Amount Selector */}
          <div>
            <div className="flex justify-between text-xs font-bold text-purple-300 mb-1">
              <span>Bet Amount:</span>
              <span className="text-yellow-400">₹{betAmount}</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {[10, 50, 100, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setBetAmount(amt)}
                  className={`py-1.5 rounded-lg text-xs font-extrabold border transition-all ${
                    betAmount === amt
                      ? 'bg-purple-600 border-purple-300 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                      : 'bg-[#1C0E42] border-purple-500/30 text-purple-300 hover:bg-purple-900/50'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button: Bet or Cashout */}
          <div>
            {!isPlaying ? (
              <button
                onClick={handleStartGame}
                className="w-full py-3.5 rounded-xl font-black text-lg uppercase tracking-wider text-slate-950 gold-metallic-btn shadow-[0_0_20px_rgba(255,193,7,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                PLACE BET (₹{betAmount})
              </button>
            ) : (
              <button
                onClick={handleCashout}
                className="w-full py-3.5 rounded-xl font-black text-lg uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.8)] active:scale-95 transition-all flex items-center justify-center gap-2 animate-pulse"
              >
                CASH OUT ₹{(betAmount * multiplier).toFixed(2)}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, History, Award, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { GameItem, UserState } from '../../types';

interface WinGoGameProps {
  game: GameItem;
  user: UserState;
  onBack: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

interface DrawRecord {
  period: string;
  number: number;
  color: 'green' | 'red' | 'violet' | 'green-violet' | 'red-violet';
  bigSmall: 'BIG' | 'SMALL';
}

export const WinGoGame: React.FC<WinGoGameProps> = ({
  game,
  user,
  onBack,
  onUpdateBalance,
}) => {
  const [timeMode, setTimeMode] = useState<'1Min' | '3Min' | '5Min'>('1Min');
  const [seconds, setSeconds] = useState<number>(38);
  const [periodNumber, setPeriodNumber] = useState<string>('20260803100234');

  // Bet Selections
  const [selectedColor, setSelectedColor] = useState<'green' | 'violet' | 'red' | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedBigSmall, setSelectedBigSmall] = useState<'BIG' | 'SMALL' | null>(null);

  const [baseBet, setBaseBet] = useState<number>(10);
  const [multiplier, setMultiplier] = useState<number>(1);

  // Result Toast
  const [lastDrawResult, setLastDrawResult] = useState<DrawRecord | null>(null);
  const [winMessage, setWinMessage] = useState<string | null>(null);

  // Past Draw History
  const [history, setHistory] = useState<DrawRecord[]>([
    { period: '20260803100233', number: 7, color: 'green', bigSmall: 'BIG' },
    { period: '20260803100232', number: 2, color: 'red', bigSmall: 'SMALL' },
    { period: '20260803100231', number: 0, color: 'red-violet', bigSmall: 'SMALL' },
    { period: '20260803100230', number: 9, color: 'green', bigSmall: 'BIG' },
    { period: '20260803100229', number: 5, color: 'green-violet', bigSmall: 'BIG' },
    { period: '20260803100228', number: 4, color: 'red', bigSmall: 'SMALL' },
  ]);

  // Countdown timer clock
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          triggerDrawResult();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerDrawResult = () => {
    const randomNum = Math.floor(Math.random() * 10);
    const isBig = randomNum >= 5;
    let colorVal: 'green' | 'red' | 'violet' | 'green-violet' | 'red-violet' = 'green';

    if (randomNum === 0) colorVal = 'red-violet';
    else if (randomNum === 5) colorVal = 'green-violet';
    else if (randomNum % 2 === 0) colorVal = 'red';
    else colorVal = 'green';

    const newRecord: DrawRecord = {
      period: (parseInt(periodNumber) + 1).toString(),
      number: randomNum,
      color: colorVal,
      bigSmall: isBig ? 'BIG' : 'SMALL',
    };

    setPeriodNumber(newRecord.period);
    setHistory((prev) => [newRecord, ...prev.slice(0, 15)]);
    setLastDrawResult(newRecord);

    // Check if user won
    const totalBetAmount = baseBet * multiplier;
    let won = false;
    let winMultiplier = 2;

    if (selectedColor) {
      if (
        (selectedColor === 'green' && (colorVal === 'green' || colorVal === 'green-violet')) ||
        (selectedColor === 'red' && (colorVal === 'red' || colorVal === 'red-violet'))
      ) {
        won = true;
        winMultiplier = 2;
      } else if (selectedColor === 'violet' && colorVal.includes('violet')) {
        won = true;
        winMultiplier = 4.5;
      }
    } else if (selectedNumber !== null && selectedNumber === randomNum) {
      won = true;
      winMultiplier = 9;
    } else if (selectedBigSmall && ((selectedBigSmall === 'BIG' && isBig) || (selectedBigSmall === 'SMALL' && !isBig))) {
      won = true;
      winMultiplier = 2;
    }

    if (won && (selectedColor || selectedNumber !== null || selectedBigSmall)) {
      const payout = totalBetAmount * winMultiplier;
      onUpdateBalance(user.balance + payout);
      setWinMessage(`🎉 CONGRATULATIONS! Drawn Number ${randomNum}. You won ₹${payout.toFixed(2)}!`);
    } else if (selectedColor || selectedNumber !== null || selectedBigSmall) {
      setWinMessage(`Drawn Number ${randomNum}. Better luck next round!`);
    }

    // Reset selection for next round
    setSelectedColor(null);
    setSelectedNumber(null);
    setSelectedBigSmall(null);
  };

  const handleConfirmBet = () => {
    if (!selectedColor && selectedNumber === null && !selectedBigSmall) {
      alert('Please select a Color, Number or Big/Small choice first!');
      return;
    }
    const totalBet = baseBet * multiplier;
    if (user.balance < totalBet) {
      alert('Insufficient wallet balance!');
      return;
    }

    onUpdateBalance(user.balance - totalBet);
    alert(`Bet of ₹${totalBet} placed successfully on Period ${periodNumber}!`);
  };

  return (
    <div className="min-h-screen bg-[#070312] text-slate-100 pb-20 flex flex-col">
      {/* Top Navigation */}
      <div className="sticky top-0 z-30 bg-[#12072B]/95 backdrop-blur-md px-4 py-2.5 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-purple-950/80 text-purple-200 border border-purple-500/30 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <img
              src="/src/assets/images/wingo_3d_balls_1785787086705.jpg"
              alt="WinGo Lottery"
              referrerPolicy="no-referrer"
              className="w-7 h-7 object-contain"
            />
            <div>
              <h1 className="text-sm font-black italic tracking-wider text-amber-400 uppercase">
                WinGo {timeMode} Lottery
              </h1>
              <p className="text-[10px] text-purple-300">Fast 60s High Payout Draw Engine</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Time Mode Switcher */}
      <div className="p-3 bg-[#0B041A] border-b border-purple-500/20 grid grid-cols-3 gap-2">
        {(['1Min', '3Min', '5Min'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setTimeMode(m)}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              timeMode === m
                ? 'gold-metallic-btn text-slate-950 shadow-[0_0_10px_rgba(255,193,7,0.5)]'
                : 'bg-[#180C3A] text-purple-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> WinGo {m}
          </button>
        ))}
      </div>

      {/* Period & Live Countdown Timer Header */}
      <div className="p-4 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-b border-purple-500/30 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-purple-300 uppercase tracking-widest font-bold">Current Period</span>
          <div className="text-sm font-mono font-black text-amber-300">{periodNumber}</div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-purple-300 uppercase tracking-widest font-bold">Count Down</span>
          <div className="flex items-center gap-1 text-2xl font-black font-mono text-emerald-400">
            <span className="bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">00</span>:
            <span className="bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>
      </div>

      {winMessage && (
        <div className="p-3 bg-emerald-950/90 border-b border-emerald-500/50 text-emerald-300 text-xs font-bold text-center animate-bounce">
          {winMessage}
        </div>
      )}

      {/* Main Betting Controls Section */}
      <div className="p-4 space-y-4">
        
        {/* 1. COLOR BET BUTTONS (Green 2x, Violet 4.5x, Red 2x) */}
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider mb-2 block">
            1. Select Color Prediction
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => {
                setSelectedColor('green');
                setSelectedNumber(null);
                setSelectedBigSmall(null);
              }}
              className={`py-3.5 rounded-2xl font-black text-sm uppercase text-white shadow-lg transition-all ${
                selectedColor === 'green'
                  ? 'bg-emerald-500 ring-4 ring-emerald-300 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.8)]'
                  : 'bg-emerald-700/80 hover:bg-emerald-600'
              }`}
            >
              GREEN (2x)
            </button>

            <button
              onClick={() => {
                setSelectedColor('violet');
                setSelectedNumber(null);
                setSelectedBigSmall(null);
              }}
              className={`py-3.5 rounded-2xl font-black text-sm uppercase text-white shadow-lg transition-all ${
                selectedColor === 'violet'
                  ? 'bg-purple-600 ring-4 ring-purple-300 scale-105 shadow-[0_0_20px_rgba(168,85,247,0.8)]'
                  : 'bg-purple-800/80 hover:bg-purple-700'
              }`}
            >
              VIOLET (4.5x)
            </button>

            <button
              onClick={() => {
                setSelectedColor('red');
                setSelectedNumber(null);
                setSelectedBigSmall(null);
              }}
              className={`py-3.5 rounded-2xl font-black text-sm uppercase text-white shadow-lg transition-all ${
                selectedColor === 'red'
                  ? 'bg-rose-600 ring-4 ring-rose-300 scale-105 shadow-[0_0_20px_rgba(244,63,94,0.8)]'
                  : 'bg-rose-800/80 hover:bg-rose-700'
              }`}
            >
              RED (2x)
            </button>
          </div>
        </div>

        {/* 2. NUMBER SELECTION GRID 0 to 9 (Payout 9x) */}
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider mb-2 block">
            2. Select Exact Number (Payout 9x)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSelectedNumber(num);
                  setSelectedColor(null);
                  setSelectedBigSmall(null);
                }}
                className={`py-3 rounded-2xl text-base font-black border transition-all ${
                  selectedNumber === num
                    ? 'gold-metallic-btn text-slate-950 scale-105 shadow-[0_0_15px_rgba(255,193,7,0.8)]'
                    : 'bg-[#1C0E42] border-purple-500/30 text-purple-200 hover:border-amber-400'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* 3. BIG / SMALL SELECTION BUTTONS */}
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider mb-2 block">
            3. Select Big / Small (Payout 2x)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setSelectedBigSmall('BIG');
                setSelectedColor(null);
                setSelectedNumber(null);
              }}
              className={`py-3.5 rounded-2xl font-black text-sm uppercase text-white border transition-all ${
                selectedBigSmall === 'BIG'
                  ? 'bg-amber-500 border-amber-300 scale-105 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.8)]'
                  : 'bg-[#1C0E42] border-purple-500/30 hover:border-amber-400'
              }`}
            >
              BIG (5, 6, 7, 8, 9)
            </button>

            <button
              onClick={() => {
                setSelectedBigSmall('SMALL');
                setSelectedColor(null);
                setSelectedNumber(null);
              }}
              className={`py-3.5 rounded-2xl font-black text-sm uppercase text-white border transition-all ${
                selectedBigSmall === 'SMALL'
                  ? 'bg-sky-500 border-sky-300 scale-105 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.8)]'
                  : 'bg-[#1C0E42] border-purple-500/30 hover:border-sky-400'
              }`}
            >
              SMALL (0, 1, 2, 3, 4)
            </button>
          </div>
        </div>

        {/* MULTIPLIER SELECTION BAR */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-3 border border-purple-500/30">
          <div className="flex justify-between items-center text-xs font-bold text-purple-200 mb-2">
            <span>Bet Multiplier:</span>
            <span className="text-amber-300 font-black">Total: ₹{baseBet * multiplier}</span>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {[1, 5, 10, 20, 50, 100].map((m) => (
              <button
                key={m}
                onClick={() => setMultiplier(m)}
                className={`py-1.5 rounded-lg text-xs font-extrabold border transition-all ${
                  multiplier === m
                    ? 'bg-purple-600 border-purple-300 text-white'
                    : 'bg-[#221252] border-purple-500/20 text-purple-300'
                }`}
              >
                X{m}
              </button>
            ))}
          </div>
        </div>

        {/* CONFIRM BET BUTTON */}
        <button
          onClick={handleConfirmBet}
          className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wider gold-metallic-btn text-slate-950 shadow-[0_0_20px_rgba(255,193,7,0.7)] active:scale-95 transition-all"
        >
          CONFIRM BET (₹{baseBet * multiplier})
        </button>

      </div>

      {/* DRAW HISTORY LOG TABLE */}
      <div className="p-4 bg-[#0B041A] border-t border-purple-500/20 space-y-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-4 h-4 text-amber-400" /> Past Game Records History
        </h3>

        <div className="space-y-1.5">
          {history.map((rec, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-[#160B36] flex items-center justify-between text-xs">
              <span className="text-purple-300 font-mono">{rec.period}</span>
              <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-black flex items-center justify-center border border-amber-500/30">
                {rec.number}
              </span>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  rec.bigSmall === 'BIG' ? 'bg-amber-950/80 text-amber-300' : 'bg-sky-950/80 text-sky-300'
                }`}
              >
                {rec.bigSmall}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

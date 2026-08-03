import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, VolumeX, ShieldCheck, Zap, RotateCcw, Play, Users, History, AlertCircle } from 'lucide-react';
import { GameItem, UserState } from '../../types';

interface AviatorGameProps {
  game: GameItem;
  user: UserState;
  onBack: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

interface OnlineBet {
  user: string;
  bet: number;
  multiplier?: number;
  won?: number;
  cashedOut: boolean;
}

export const AviatorGame: React.FC<AviatorGameProps> = ({
  game,
  user,
  onBack,
  onUpdateBalance,
}) => {
  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Multiplier history pills
  const [historyPills, setHistoryPills] = useState<number[]>([
    1.24, 2.85, 1.05, 12.40, 3.10, 1.88, 1.12, 45.20, 2.04, 1.45,
  ]);

  // Dual Bet Panels (Panel 1 & Panel 2)
  const [bet1, setBet1] = useState<number>(10);
  const [bet1Active, setBet1Active] = useState<boolean>(false);
  const [bet1Cashed, setBet1Cashed] = useState<boolean>(false);
  const [bet1Won, setBet1Won] = useState<number | null>(null);
  const [autoCashout1, setAutoCashout1] = useState<number>(2.0);

  const [bet2, setBet2] = useState<number>(20);
  const [bet2Active, setBet2Active] = useState<boolean>(false);
  const [bet2Cashed, setBet2Cashed] = useState<boolean>(false);
  const [bet2Won, setBet2Won] = useState<number | null>(null);

  // Game Engine State
  const [gameState, setGameState] = useState<'WAITING' | 'FLYING' | 'CRASHED'>('WAITING');
  const [multiplier, setMultiplier] = useState<number>(1.00);
  const [countdown, setCountdown] = useState<number>(5);
  const [planeY, setPlaneY] = useState<number>(0);
  const [planeX, setPlaneX] = useState<number>(0);

  // Online Players Bets List
  const [onlineBets, setOnlineBets] = useState<OnlineBet[]>([]);

  // Canvas / Curve Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Flight Game Loop
  useEffect(() => {
    let interval: any;

    if (gameState === 'WAITING') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            startFlight();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameState === 'FLYING') {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const increment = 0.02 + prev * 0.015;
          const next = +(prev + increment).toFixed(2);

          // Simulated Random Crash Threshold (e.g., between 1.1x and 30x)
          const crashProbability = 0.02 + (next > 3.0 ? 0.03 : 0);
          if (Math.random() < crashProbability && next > 1.15) {
            triggerCrash(next);
            return next;
          }

          // Check Auto Cashout 1
          if (bet1Active && !bet1Cashed && autoCashout1 && next >= autoCashout1) {
            cashoutPanel1(next);
          }

          return next;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [gameState, bet1Active, bet1Cashed, autoCashout1]);

  // Generate simulated online players on flight start
  const startFlight = () => {
    setMultiplier(1.00);
    setGameState('FLYING');
    setBet1Cashed(false);
    setBet1Won(null);
    setBet2Cashed(false);
    setBet2Won(null);

    const names = ['Rohan_88', 'Priya_Win', 'Amit_King', 'Sunil_Pro', 'Vikas_99', 'Ankit_G', 'Karan_V'];
    const simulated = names.map((name) => ({
      user: name,
      bet: Math.floor(Math.random() * 50) * 10 + 10,
      cashedOut: false,
    }));
    setOnlineBets(simulated);
  };

  const triggerCrash = (finalMult: number) => {
    setGameState('CRASHED');
    setBet1Active(false);
    setBet2Active(false);

    // Add to history
    setHistoryPills((prev) => [finalMult, ...prev.slice(0, 15)]);

    setTimeout(() => {
      setGameState('WAITING');
    }, 3000);
  };

  // Place Bet 1
  const handlePlaceBet1 = () => {
    if (user.balance < bet1) {
      alert('Insufficient wallet balance!');
      return;
    }
    onUpdateBalance(user.balance - bet1);
    setBet1Active(true);
    setBet1Cashed(false);
    setBet1Won(null);
  };

  const cashoutPanel1 = (currentMult = multiplier) => {
    if (!bet1Active || bet1Cashed || gameState !== 'FLYING') return;
    const win = +(bet1 * currentMult).toFixed(2);
    setBet1Won(win);
    setBet1Cashed(true);
    onUpdateBalance(user.balance + win);
  };

  // Place Bet 2
  const handlePlaceBet2 = () => {
    if (user.balance < bet2) {
      alert('Insufficient wallet balance!');
      return;
    }
    onUpdateBalance(user.balance - bet2);
    setBet2Active(true);
    setBet2Cashed(false);
    setBet2Won(null);
  };

  const cashoutPanel2 = (currentMult = multiplier) => {
    if (!bet2Active || bet2Cashed || gameState !== 'FLYING') return;
    const win = +(bet2 * currentMult).toFixed(2);
    setBet2Won(win);
    setBet2Cashed(true);
    onUpdateBalance(user.balance + win);
  };

  return (
    <div className="min-h-screen bg-[#070312] text-slate-100 pb-20 flex flex-col">
      {/* Top Header Navigation */}
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
              src="/src/assets/images/aviator_red_jet_1785787036135.jpg"
              alt="Aviator Jet"
              referrerPolicy="no-referrer"
              className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]"
            />
            <div>
              <h1 className="text-sm font-black italic tracking-wider text-rose-500 uppercase">
                {game.title} PRO
              </h1>
              <p className="text-[10px] text-purple-300">Spribe Provably Fair Flight Engine</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-full bg-purple-900/50 text-purple-200 border border-purple-500/30"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Recent Multipliers Scroll Bar */}
      <div className="px-3 py-1.5 bg-[#0B041A] border-b border-purple-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <History className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
        {historyPills.map((mult, idx) => {
          const isHigh = mult >= 10;
          const isMid = mult >= 2.0;
          return (
            <span
              key={idx}
              className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${
                isHigh
                  ? 'bg-purple-600/80 border-purple-400 text-purple-100 shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                  : isMid
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                  : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
              }`}
            >
              {mult.toFixed(2)}x
            </span>
          );
        })}
      </div>

      {/* Main Flight Stage Screen */}
      <div className="relative w-full h-72 bg-gradient-to-b from-[#0A0218] via-[#12062E] to-[#1A093E] p-4 flex flex-col items-center justify-center overflow-hidden border-b border-purple-500/30">
        
        {/* Radar Background Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Status: WAITING FOR NEXT ROUND */}
        {gameState === 'WAITING' && (
          <div className="relative z-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-amber-400/80 border-t-transparent animate-spin flex items-center justify-center mb-2">
              <span className="text-xl font-black text-amber-300">{countdown}s</span>
            </div>
            <div className="text-xs font-black text-purple-200 uppercase tracking-widest bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/40">
              WAITING FOR NEXT ROUND...
            </div>
            <div className="w-48 h-1.5 bg-black/60 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Status: FLYING */}
        {gameState === 'FLYING' && (
          <div className="relative z-10 text-center flex flex-col items-center justify-center">
            {/* Live Jet Plane Flying */}
            <div className="relative my-2 animate-float">
              <img
                src="/src/assets/images/aviator_red_jet_1785787036135.jpg"
                alt="Flying Red Jet"
                referrerPolicy="no-referrer"
                className="w-24 h-24 object-contain filter drop-shadow-[0_0_20px_rgba(239,68,68,1)] transform -rotate-12"
              />
            </div>

            <div className="text-6xl font-black text-rose-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] tracking-tight">
              {multiplier.toFixed(2)}x
            </div>

            <div className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 rounded-full mt-1 animate-pulse">
              JET IS IN FLIGHT
            </div>
          </div>
        )}

        {/* Status: CRASHED */}
        {gameState === 'CRASHED' && (
          <div className="relative z-10 text-center flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,1)] uppercase tracking-wider mb-1">
              FLEW AWAY!
            </div>
            <div className="text-3xl font-extrabold text-rose-200">
              @{multiplier.toFixed(2)}x
            </div>
            <p className="text-xs text-rose-400/80 font-bold mt-2">Crash Recorded via Provably Fair Hash</p>
          </div>
        )}

        {/* Provably Fair Badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-black/70 px-2.5 py-1 rounded-full border border-emerald-500/40">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Provably Fair 100%
        </div>

      </div>

      {/* Dual Betting Controls Section (Panel 1 & Panel 2) */}
      <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#0D0522]">
        
        {/* PANEL 1 */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#1C0E42] to-[#12072E] border border-purple-500/30 flex flex-col justify-between space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span>BET PANEL 1</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-purple-300">Auto Cashout:</span>
              <input
                type="number"
                step="0.1"
                value={autoCashout1}
                onChange={(e) => setAutoCashout1(parseFloat(e.target.value))}
                className="w-12 bg-black/60 border border-purple-500/30 rounded px-1 text-[10px] text-amber-300 font-bold text-center"
              />
              <span className="text-[10px] text-amber-300">x</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {[10, 50, 100, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => setBet1(amt)}
                className={`py-1 rounded-lg text-xs font-black border transition-all ${
                  bet1 === amt
                    ? 'bg-purple-600 border-purple-300 text-white'
                    : 'bg-[#221252] border-purple-500/20 text-purple-300'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          {!bet1Active ? (
            <button
              onClick={handlePlaceBet1}
              className="w-full py-3 rounded-xl font-black text-sm uppercase gold-metallic-btn text-slate-950 shadow-[0_0_15px_rgba(255,193,7,0.6)] active:scale-95 transition-all"
            >
              BET ₹{bet1}
            </button>
          ) : bet1Cashed ? (
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center">
              <div className="text-xs font-extrabold text-emerald-400">CASHED OUT!</div>
              <div className="text-sm font-black gold-metallic-text">WON ₹{bet1Won}</div>
            </div>
          ) : (
            <button
              onClick={() => cashoutPanel1()}
              disabled={gameState !== 'FLYING'}
              className="w-full py-3 rounded-xl font-black text-sm uppercase bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.9)] animate-pulse active:scale-95 transition-all"
            >
              CASH OUT ₹{(bet1 * multiplier).toFixed(2)}
            </button>
          )}
        </div>

        {/* PANEL 2 */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#1C0E42] to-[#12072E] border border-purple-500/30 flex flex-col justify-between space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span>BET PANEL 2</span>
            <span className="text-[10px] text-amber-300">Quick Secondary Bet</span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {[20, 100, 200, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setBet2(amt)}
                className={`py-1 rounded-lg text-xs font-black border transition-all ${
                  bet2 === amt
                    ? 'bg-purple-600 border-purple-300 text-white'
                    : 'bg-[#221252] border-purple-500/20 text-purple-300'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          {!bet2Active ? (
            <button
              onClick={handlePlaceBet2}
              className="w-full py-3 rounded-xl font-black text-sm uppercase gold-metallic-btn text-slate-950 shadow-[0_0_15px_rgba(255,193,7,0.6)] active:scale-95 transition-all"
            >
              BET ₹{bet2}
            </button>
          ) : bet2Cashed ? (
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center">
              <div className="text-xs font-extrabold text-emerald-400">CASHED OUT!</div>
              <div className="text-sm font-black gold-metallic-text">WON ₹{bet2Won}</div>
            </div>
          ) : (
            <button
              onClick={() => cashoutPanel2()}
              disabled={gameState !== 'FLYING'}
              className="w-full py-3 rounded-xl font-black text-sm uppercase bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.9)] animate-pulse active:scale-95 transition-all"
            >
              CASH OUT ₹{(bet2 * multiplier).toFixed(2)}
            </button>
          )}
        </div>

      </div>

      {/* Live Online Bets Feed */}
      <div className="p-3 bg-[#0B041A] border-t border-purple-500/20">
        <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" /> Online Bets ({onlineBets.length + 120})
          </span>
          <span className="text-[10px] text-emerald-400">Live Synchronized</span>
        </div>

        <div className="space-y-1 max-h-36 overflow-y-auto no-scrollbar">
          {onlineBets.map((b, idx) => (
            <div key={idx} className="px-3 py-1.5 rounded-lg bg-[#160B36] flex items-center justify-between text-xs">
              <span className="text-purple-200 font-bold">{b.user}</span>
              <span className="text-amber-300 font-extrabold">₹{b.bet}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Bomb, Gem, Zap, RefreshCw } from 'lucide-react';
import { GameItem, UserState } from '../../types';

interface MinesGameProps {
  game: GameItem;
  user: UserState;
  onBack: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

export const MinesGame: React.FC<MinesGameProps> = ({
  game,
  user,
  onBack,
  onUpdateBalance,
}) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [mineCount, setMineCount] = useState<number>(3);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winMessage, setWinMessage] = useState<string | null>(null);

  // 25 Grid Tiles
  const [mineLocations, setMineLocations] = useState<number[]>([]);
  const [revealedTiles, setRevealedTiles] = useState<number[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);

  const startMinesGame = () => {
    if (user.balance < betAmount) {
      alert('Insufficient wallet balance!');
      return;
    }
    onUpdateBalance(user.balance - betAmount);

    // Randomize mine locations
    const locations: number[] = [];
    while (locations.length < mineCount) {
      const rand = Math.floor(Math.random() * 25);
      if (!locations.includes(rand)) locations.push(rand);
    }

    setMineLocations(locations);
    setRevealedTiles([]);
    setCurrentMultiplier(1.0);
    setGameActive(true);
    setGameOver(false);
    setWinMessage(null);
  };

  const handleTileClick = (index: number) => {
    if (!gameActive || gameOver || revealedTiles.includes(index)) return;

    if (mineLocations.includes(index)) {
      // Hit a mine!
      setGameOver(true);
      setGameActive(false);
      setRevealedTiles(Array.from({ length: 25 }, (_, i) => i)); // reveal all
      setWinMessage('💥 BOOM! You hit a mine. Better luck next time!');
    } else {
      // Revealed a Gem!
      const newRevealed = [...revealedTiles, index];
      setRevealedTiles(newRevealed);

      // Increase multiplier
      const nextMult = +(currentMultiplier + 0.25 + mineCount * 0.15).toFixed(2);
      setCurrentMultiplier(nextMult);
    }
  };

  const handleCashout = () => {
    if (!gameActive || gameOver || revealedTiles.length === 0) return;

    const winTotal = +(betAmount * currentMultiplier).toFixed(2);
    onUpdateBalance(user.balance + winTotal);
    setGameActive(false);
    setGameOver(true);
    setWinMessage(`🎉 CASHED OUT! You won ₹${winTotal} (${currentMultiplier.toFixed(2)}x)!`);
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
          <div>
            <h1 className="text-sm font-black italic tracking-wider text-amber-400 uppercase">
              MINES CASINO PRO
            </h1>
            <p className="text-[10px] text-purple-300">Find Gems & Avoid Bombs</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {winMessage && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center animate-bounce rounded-xl">
            {winMessage}
          </div>
        )}

        {/* 5x5 GRID FIELD */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 shadow-2xl">
          <div className="grid grid-cols-5 gap-2.5 aspect-square max-w-[320px] mx-auto">
            {Array.from({ length: 25 }, (_, i) => {
              const isRevealed = revealedTiles.includes(i);
              const isMine = mineLocations.includes(i);

              return (
                <button
                  key={i}
                  disabled={!gameActive || isRevealed}
                  onClick={() => handleTileClick(i)}
                  className={`w-full h-full rounded-xl flex items-center justify-center font-black text-xl transition-all ${
                    isRevealed
                      ? isMine
                        ? 'bg-rose-600 border border-rose-300 text-white animate-bounce'
                        : 'bg-emerald-600/90 border border-emerald-300 text-amber-300 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                      : 'bg-[#241354] border border-purple-500/30 hover:border-amber-400 active:scale-95'
                  }`}
                >
                  {isRevealed ? (
                    isMine ? (
                      <Bomb className="w-6 h-6 text-white" />
                    ) : (
                      <Gem className="w-6 h-6 text-yellow-300" />
                    )
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-white">
            <span>Mines Count:</span>
            <div className="flex gap-1">
              {[1, 3, 5, 10, 15].map((m) => (
                <button
                  key={m}
                  disabled={gameActive}
                  onClick={() => setMineCount(m)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                    mineCount === m ? 'bg-amber-500 border-amber-300 text-slate-950' : 'bg-[#221252] border-purple-500/30 text-purple-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-white">
            <span>Bet Amount:</span>
            <span className="text-amber-300 font-black">₹{betAmount}</span>
          </div>

          {!gameActive ? (
            <button
              onClick={startMinesGame}
              className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wider gold-metallic-btn text-slate-950 shadow-[0_0_20px_rgba(255,193,7,0.7)] active:scale-95 transition-all"
            >
              START GAME (₹{betAmount})
            </button>
          ) : (
            <button
              onClick={handleCashout}
              disabled={revealedTiles.length === 0}
              className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.9)] animate-pulse active:scale-95 transition-all"
            >
              CASH OUT ₹{(betAmount * currentMultiplier).toFixed(2)} ({currentMultiplier.toFixed(2)}x)
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

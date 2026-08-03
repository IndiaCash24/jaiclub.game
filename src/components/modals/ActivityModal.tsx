import React, { useState } from 'react';
import { UserState } from '../../types';
import { X, Gift, Calendar, Disc, CheckCircle2, Trophy } from 'lucide-react';

interface ActivityModalProps {
  user: UserState;
  onClose: () => void;
  onAddReward: (amount: number) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  user,
  onClose,
  onAddReward,
}) => {
  const [checkedDays, setCheckedDays] = useState<number[]>([1]);
  const [spinning, setSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const dailyRewards = [
    { day: 1, reward: 10 },
    { day: 2, reward: 20 },
    { day: 3, reward: 50 },
    { day: 4, reward: 80 },
    { day: 5, reward: 120 },
    { day: 6, reward: 200 },
    { day: 7, reward: 500 },
  ];

  const handleCheckIn = (day: number, reward: number) => {
    if (checkedDays.includes(day)) return;
    setCheckedDays((prev) => [...prev, day]);
    onAddReward(reward);
  };

  const handleSpinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSpinResult(null);

    const randomDegrees = 360 * 4 + Math.floor(Math.random() * 360);
    setSpinAngle(randomDegrees);

    setTimeout(() => {
      setSpinning(false);
      const prizes = [100, 250, 50, 500, 1000, 20];
      const win = prizes[Math.floor(Math.random() * prizes.length)];
      setSpinResult(win);
      onAddReward(win);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[460px] bg-[#160B38] border border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11082C] border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400">
              <Gift className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">ACTIVITY & LUCKY REWARDS</h3>
              <p className="text-[10px] text-purple-300/80">Daily Bonuses & Lucky Wheel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[75vh]">
          
          {/* Section 1: 7-Day Daily Check-in */}
          <div>
            <h4 className="text-xs font-black text-purple-200 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-pink-400" /> DAILY CHECK-IN BONUS
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {dailyRewards.map((item) => {
                const isChecked = checkedDays.includes(item.day);
                return (
                  <button
                    key={item.day}
                    onClick={() => handleCheckIn(item.day, item.reward)}
                    disabled={isChecked}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isChecked
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                        : 'bg-[#12082B] border-purple-500/30 hover:border-yellow-400 text-white'
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase block text-purple-300">Day {item.day}</span>
                    <span className="text-xs font-black gold-metallic-text block my-0.5">₹{item.reward}</span>
                    {isChecked ? (
                      <span className="text-[8px] font-black text-emerald-400 flex items-center justify-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> CLAIMED
                      </span>
                    ) : (
                      <span className="text-[8px] font-black text-yellow-400">CLAIM</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Lucky Wheel Spin-to-Win */}
          <div className="bg-[#11082C] border border-purple-500/30 rounded-2xl p-4 flex flex-col items-center">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1">
              <Disc className="w-4 h-4 text-amber-400" /> LUCKY SPIN WHEEL
            </h4>
            <p className="text-[10px] text-purple-300 mb-3">Spin to win up to ₹1,000 real cash!</p>

            {/* Wheel Canvas Graphic */}
            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              {/* Top Pointer */}
              <div className="absolute -top-3 z-20 text-yellow-400 text-xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ▼
              </div>

              {/* Rotating Wheel */}
              <div
                style={{
                  transform: `rotate(${spinAngle}deg)`,
                  transition: spinning ? 'transform 3s cubic-bezier(0.15, 0.85, 0.35, 1.2)' : 'none',
                }}
                className="w-full h-full rounded-full border-4 border-yellow-400 bg-gradient-to-tr from-purple-800 via-pink-700 to-indigo-800 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)] overflow-hidden"
              >
                <div className="text-center font-black text-white text-xs space-y-1">
                  <div className="gold-metallic-text text-sm">₹1000</div>
                  <div className="text-cyan-300">₹500</div>
                  <div className="text-pink-300">₹250</div>
                </div>
              </div>

              {/* Spin Center Button */}
              <button
                onClick={handleSpinWheel}
                disabled={spinning}
                className="absolute z-10 w-12 h-12 rounded-full gold-metallic-btn font-black text-xs text-slate-950 border-2 border-white shadow-md active:scale-90"
              >
                {spinning ? '...' : 'SPIN'}
              </button>
            </div>

            {spinResult && (
              <div className="mt-2 text-center text-xs font-black text-emerald-400 animate-bounce">
                🎉 CONGRATULATIONS! YOU WON ₹{spinResult}!
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

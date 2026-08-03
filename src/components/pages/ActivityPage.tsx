import React, { useState } from 'react';
import { Gift, Calendar, Award, Sparkles, CheckCircle2, ChevronRight, Trophy, Zap, ArrowLeft } from 'lucide-react';
import { UserState } from '../../types';

interface ActivityPageProps {
  user: UserState;
  onBack: () => void;
  onAddReward: (amt: number) => void;
}

export const ActivityPage: React.FC<ActivityPageProps> = ({ user, onBack, onAddReward }) => {
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 2]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [lastWinMsg, setLastWinMsg] = useState<string | null>(null);

  const checkInDays = [
    { day: 1, reward: 10, claimed: true },
    { day: 2, reward: 20, claimed: true },
    { day: 3, reward: 30, claimed: false },
    { day: 4, reward: 50, claimed: false },
    { day: 5, reward: 100, claimed: false },
    { day: 6, reward: 150, claimed: false },
    { day: 7, reward: 300, claimed: false, mystery: true },
  ];

  const wheelPrizes = [
    { text: '₹10', value: 10, color: '#E11D48' },
    { text: '₹50', value: 50, color: '#9333EA' },
    { text: '₹100', value: 100, color: '#2563EB' },
    { text: '₹200', value: 200, color: '#059669' },
    { text: '₹500', value: 500, color: '#D97706' },
    { text: '₹1000', value: 1000, color: '#DC2626' },
  ];

  const handleClaimDay = (day: number, reward: number) => {
    if (checkedDays.includes(day)) return;
    setCheckedDays([...checkedDays, day]);
    onAddReward(reward);
    setLastWinMsg(`Claimed Day ${day} Bonus ₹${reward}!`);
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLastWinMsg(null);

    const randomIndex = Math.floor(Math.random() * wheelPrizes.length);
    const selectedPrize = wheelPrizes[randomIndex];
    const extraRotations = 360 * 5;
    const prizeAngle = (360 / wheelPrizes.length) * randomIndex;
    const finalAngle = wheelAngle + extraRotations + (360 - prizeAngle);

    setWheelAngle(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      onAddReward(selectedPrize.value);
      setLastWinMsg(`🎉 Congratulations! You won ${selectedPrize.text} from Lucky Spin!`);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0A0418] text-slate-100 pb-24">
      {/* Top Header */}
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
              Activity & Rewards Hub
            </h1>
            <p className="text-[11px] text-purple-300">Daily Gifts, Lucky Spin & VIP Bonuses</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Toast Notification */}
        {lastWinMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center animate-bounce shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            {lastWinMsg}
          </div>
        )}

        {/* 1. Daily Check-in Streak */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-extrabold text-white">Daily Attendance Bonus</h2>
            </div>
            <span className="text-[11px] text-purple-300 font-bold bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              Streak: {checkedDays.length} Days
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {checkInDays.map((item) => {
              const isClaimed = checkedDays.includes(item.day);
              return (
                <button
                  key={item.day}
                  disabled={isClaimed}
                  onClick={() => handleClaimDay(item.day, item.reward)}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-between transition-all ${
                    isClaimed
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 opacity-80'
                      : 'bg-[#221252] border-amber-500/40 text-white hover:border-amber-400 active:scale-95'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-purple-300">Day {item.day}</span>
                  <div className="my-1.5">
                    {isClaimed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : item.mystery ? (
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    ) : (
                      <Gift className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <span className="text-xs font-black gold-metallic-text">₹{item.reward}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Lucky Wheel Spinner */}
        <div className="bg-gradient-to-br from-[#1A0A3A] via-[#14062E] to-[#0D031F] rounded-2xl p-4 border border-purple-500/30 shadow-xl text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-black text-white uppercase italic tracking-wider">
              Lucky Wheel Spin & Win
            </h2>
          </div>
          <p className="text-xs text-purple-300 mb-4">Spin the wheel every 24 hours for instant cash rewards!</p>

          {/* Wheel Graphic */}
          <div className="relative w-56 h-56 mx-auto my-2 flex items-center justify-center">
            {/* Pointer */}
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.9)]" />

            {/* Rotating Wheel Canvas */}
            <div
              className="w-full h-full rounded-full border-4 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.5)] overflow-hidden relative transition-transform duration-[3500ms] ease-out"
              style={{ transform: `rotate(${wheelAngle}deg)` }}
            >
              {wheelPrizes.map((prize, idx) => {
                const angle = (360 / wheelPrizes.length) * idx;
                return (
                  <div
                    key={idx}
                    className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left flex items-center justify-center"
                    style={{
                      backgroundColor: prize.color,
                      transform: `rotate(${angle}deg)`,
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    }}
                  >
                    <span
                      className="text-xs font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] -rotate-45 transform translate-x-4 translate-y-2"
                    >
                      {prize.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Center Spin Button */}
            <button
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 border-2 border-white shadow-[0_0_20px_rgba(255,193,7,0.9)] text-slate-950 font-black text-xs uppercase active:scale-90 transition-transform flex items-center justify-center"
            >
              {isSpinning ? '...' : 'SPIN'}
            </button>
          </div>
        </div>

        {/* 3. Daily Missions */}
        <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-sm font-extrabold text-white">Daily VIP Tasks</h2>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'Bet ₹500 on Aviator', reward: '₹50 Bonus', progress: '350/500', total: 500, current: 350 },
              { title: 'Play 5 rounds of WinGo', reward: '₹30 Bonus', progress: '3/5', total: 5, current: 3 },
              { title: 'Deposit ₹1000 today', reward: '₹100 Cash', progress: '1000/1000', total: 1000, current: 1000, completed: true },
            ].map((task, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#221252] border border-purple-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold text-white">{task.title}</div>
                  <div className="text-[10px] text-amber-300 mt-0.5">{task.reward}</div>
                  <div className="w-32 h-1.5 bg-black/50 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                      style={{ width: `${(task.current / task.total) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  disabled={!task.completed}
                  onClick={() => onAddReward(100)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border transition-all ${
                    task.completed
                      ? 'gold-metallic-btn text-slate-950 shadow-[0_0_10px_rgba(255,193,7,0.6)] active:scale-95'
                      : 'bg-purple-950/50 border-purple-500/30 text-purple-400 cursor-not-allowed'
                  }`}
                >
                  {task.completed ? 'Claim ₹100' : task.progress}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

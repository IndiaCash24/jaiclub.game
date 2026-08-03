import React, { useState, useEffect } from 'react';
import { Volume2, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

interface PromoBannerProps {
  onOpenDeposit: () => void;
  onOpenNoticeDetail: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onOpenDeposit,
  onOpenNoticeDetail,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto carousel slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-3 pt-3 pb-1 flex flex-col gap-2">
      {/* High-Impact Promotional Card */}
      <div 
        onClick={onOpenDeposit}
        className="relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-[#2B1055]/95 via-[#1E1260]/95 to-[#0F2050]/95 border border-purple-500/40 p-4 shadow-[0_8px_32px_rgba(43,16,85,0.6)] hover:border-purple-400 active:scale-[0.99] transition-all group"
      >
        {/* Background Ambient Glow & Particle Graphics */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-2">
          
          {/* Left Text Content */}
          <div className="flex flex-col max-w-[62%]">
            
            {/* Top Brand Mini Tag */}
            <div className="flex items-center gap-1 bg-[#12082b]/80 border border-purple-400/30 rounded-full px-2 py-0.5 w-max mb-1.5 backdrop-blur-xs">
              <span className="text-yellow-400 text-[10px]">👑</span>
              <span className="text-[9px] font-black tracking-widest text-cyan-300 uppercase">
                JAI CLUB PROMO
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-xs font-black uppercase tracking-wider text-purple-200/90 flex items-center gap-1 drop-shadow-xs">
              FIRST DEPOSIT BONUS
              <Sparkles className="w-3 h-3 text-amber-400 inline" />
            </h2>

            {/* Bold 3D Metallic Amount Text */}
            <div className="text-3xl font-black gold-metallic-text tracking-tighter my-0.5 filter drop-shadow-[0_2px_10px_rgba(255,215,0,0.4)]">
              ₹488
            </div>

            {/* Sub-tag Pill */}
            <div className="mt-1">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 border border-purple-300/40 rounded-full px-3 py-1 text-[11px] font-extrabold text-white shadow-md group-hover:brightness-110">
                UP TO ₹488 <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Right Visual Element: 3D Vault + Stacks of Gold Coins & Floating Currency Notes */}
          <div className="relative w-32 h-28 flex items-center justify-center animate-vault select-none">
            
            {/* Glow Aura */}
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />

            {/* Rendered 3D Vault Asset */}
            <img
              src="/src/assets/images/vault_gold_bonus_1785787230279.jpg"
              alt="Bonus Vault"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
            />
          </div>

        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {[0, 1, 2].map((idx) => (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeSlide === idx
                  ? 'w-5 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]'
                  : 'w-1.5 bg-purple-500/40 hover:bg-purple-400/60'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Hindi Notice Ticker below banner */}
      <div className="bg-[#12082b]/90 border border-purple-500/30 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-2 overflow-hidden shadow-sm">
        
        {/* Warning / Speaker Icon */}
        <div className="flex items-center gap-1.5 text-yellow-400 shrink-0">
          <div className="p-1 rounded-md bg-yellow-500/20 border border-yellow-500/40 text-yellow-400">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          </div>
          <ShieldAlert className="w-3.5 h-3.5 text-pink-400 hidden sm:block" />
        </div>

        {/* Marquee Text */}
        <div className="overflow-hidden whitespace-nowrap text-xs text-purple-200/90 flex-1 relative">
          <div className="animate-marquee inline-block font-medium">
            हमारा कस्टमर सर्विस कभी भी सदस्य का पासवर्ड नहीं पूछेगी — यदि आपको कोई लिंक किसी ऐसे व्यक्ति द्वारा प्राप्त होता है जो JAI CLUB अधिकारी होने का दावा करता है तो तुरंत रिपोर्ट करें!
          </div>
        </div>

        {/* Detail Action Button */}
        <button
          onClick={onOpenNoticeDetail}
          className="shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white shadow-xs active:scale-90 transition-transform"
        >
          Detail
        </button>

      </div>
    </div>
  );
};

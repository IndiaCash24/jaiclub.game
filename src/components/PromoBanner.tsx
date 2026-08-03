import React, { useState, useEffect } from 'react';
import { Volume2, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { normalizeImageUrl, DEFAULT_FALLBACK_IMAGE } from '../utils/imageUtils';

interface PromoBannerProps {
  banners: string[];
  onOpenNoticeDetail: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  banners,
  onOpenNoticeDetail,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [bannerLoaded, setBannerLoaded] = useState(false);

  // Auto carousel slide rotation based on actual banners length
  useEffect(() => {
    setBannerLoaded(false);
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [banners, activeSlide]);

  // Ensure activeSlide doesn't exceed bounds if banners array shrinks
  const safeSlideIndex = activeSlide >= banners.length ? 0 : activeSlide;
  const currentBannerUrl = normalizeImageUrl(banners[safeSlideIndex] || banners[0] || DEFAULT_FALLBACK_IMAGE);

  return (
    <div className="px-3 pt-3 pb-1 flex flex-col gap-2">
      {/* 100% PURE IMAGE BANNER CAROUSEL - NO TEXT OVERLAY */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#12072B] border border-purple-500/30 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
        
        {/* Banner Display Container */}
        <div className="relative w-full h-36 sm:h-44 overflow-hidden flex items-center justify-center bg-slate-900">
          
          {/* Gray Loading Shadow Skeleton for Banner */}
          {!bannerLoaded && (
            <div className="absolute inset-0 bg-slate-800/90 animate-pulse flex flex-col items-center justify-center gap-2 z-10">
              <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-t-amber-400 animate-spin" />
              <div className="w-24 h-3 bg-slate-700/80 rounded-full animate-pulse" />
            </div>
          )}

          <img
            key={safeSlideIndex}
            src={currentBannerUrl}
            alt=""
            decoding="async"
            loading="eager"
            onLoad={() => setBannerLoaded(true)}
            onError={(e) => {
              setBannerLoaded(true);
              const target = e.target as HTMLImageElement;
              if (target.src !== window.location.origin + DEFAULT_FALLBACK_IMAGE) {
                target.src = DEFAULT_FALLBACK_IMAGE;
              }
            }}
            className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
              bannerLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Carousel Indicator Dots (Only if multiple banners) */}
        {banners.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center gap-1.5 bg-black/40 backdrop-blur-xs py-1 px-3 w-max mx-auto rounded-full border border-white/10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  safeSlideIndex === idx
                    ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Hindi Security Notice Ticker */}
      <div className="bg-[#12082b]/90 border border-purple-500/30 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-2 overflow-hidden shadow-sm">
        <div className="flex items-center gap-1.5 text-yellow-400 shrink-0">
          <div className="p-1 rounded-md bg-yellow-500/20 border border-yellow-500/40 text-yellow-400">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          </div>
          <ShieldAlert className="w-3.5 h-3.5 text-pink-400 hidden sm:block" />
        </div>

        <div className="overflow-hidden whitespace-nowrap text-xs text-purple-200/90 flex-1 relative">
          <div className="animate-marquee inline-block font-medium">
            हमारा कस्टमर सर्विस कभी भी सदस्य का पासवर्ड नहीं पूछेगी — यदि आपको कोई लिंक किसी ऐसे व्यक्ति द्वारा प्राप्त होता है जो JAI CLUB अधिकारी होने का दावा करता है तो तुरंत रिपोर्ट करें!
          </div>
        </div>

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

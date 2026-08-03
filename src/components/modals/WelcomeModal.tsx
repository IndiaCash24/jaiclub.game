import React, { useState } from 'react';
import { X } from 'lucide-react';
import { normalizeImageUrl, DEFAULT_FALLBACK_IMAGE } from '../../utils/imageUtils';

interface WelcomeModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ imageUrl, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cleanUrl = normalizeImageUrl(imageUrl || DEFAULT_FALLBACK_IMAGE);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      {/* Popup Container fitted strictly to Image Size */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[90vw] sm:max-w-md max-h-[85vh] flex flex-col items-center justify-center bg-[#12072B] border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.5)] overflow-hidden transition-all duration-300 animate-scaleUp group min-h-[220px] min-w-[280px]"
      >
        {/* Floating Top Right Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2.5 right-2.5 z-30 p-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold shadow-lg shadow-red-950/80 border border-white/40 active:scale-90 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 100% PURE POPUP IMAGE CONTAINER */}
        <div className="relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden bg-black/60">
          {!loaded && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-950/95 to-purple-900/80 animate-pulse border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.7)] flex flex-col items-center justify-center gap-3 p-6 z-10">
              <div className="w-10 h-10 rounded-full border-3 border-purple-400/40 border-t-amber-400 animate-spin shadow-[0_0_20px_rgba(245,158,11,0.9)]" />
              <div className="w-28 h-3 bg-purple-500/40 rounded-full animate-pulse shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
            </div>
          )}

          {hasError ? (
            <div className="w-full h-56 p-6 bg-gradient-to-br from-amber-600 via-purple-900 to-indigo-950 flex flex-col items-center justify-center gap-3 text-center border border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
              <div className="text-4xl animate-bounce">👑</div>
              <div className="text-amber-300 font-black text-xl tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]">
                WELCOME TO JAI CLUB
              </div>
              <div className="text-xs text-purple-100 font-semibold max-w-xs">
                Claim 100% Deposit Bonus & Play Favorite Aviator, WinGo & Slots Now!
              </div>
            </div>
          ) : (
            <img
              src={cleanUrl}
              alt=""
              decoding="async"
              loading="eager"
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== window.location.origin + DEFAULT_FALLBACK_IMAGE && !target.src.endsWith(DEFAULT_FALLBACK_IMAGE)) {
                  target.src = DEFAULT_FALLBACK_IMAGE;
                } else {
                  setHasError(true);
                  setLoaded(true);
                }
              }}
              style={{ display: loaded ? 'block' : 'none' }}
              className="w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
            />
          )}
        </div>

        {/* Bottom Close Action Bar */}
        <div className="w-full p-2.5 bg-[#0C041C] border-t border-purple-500/20 flex items-center justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-transform flex items-center gap-2"
          >
            <X className="w-4 h-4" /> CLOSE / बंद करें
          </button>
        </div>

      </div>
    </div>
  );
};

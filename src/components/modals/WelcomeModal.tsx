import React, { useState } from 'react';
import { X } from 'lucide-react';
import { normalizeImageUrl, DEFAULT_FALLBACK_IMAGE } from '../../utils/imageUtils';

interface WelcomeModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ imageUrl, onClose }) => {
  const [loaded, setLoaded] = useState(false);
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
        <div className="relative w-full h-full min-h-[200px] flex items-center justify-center overflow-hidden bg-black/60">
          {!loaded && (
            <div className="absolute inset-0 bg-slate-800/90 animate-pulse flex flex-col items-center justify-center gap-2 p-4 z-10">
              <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-t-amber-400 animate-spin" />
              <div className="w-20 h-2 bg-slate-700/80 rounded-full animate-pulse" />
            </div>
          )}
          <img
            src={cleanUrl}
            alt="Welcome Notice"
            decoding="async"
            loading="eager"
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              setLoaded(true);
              const target = e.target as HTMLImageElement;
              if (target.src !== window.location.origin + DEFAULT_FALLBACK_IMAGE) {
                target.src = DEFAULT_FALLBACK_IMAGE;
              }
            }}
            className={`w-full max-h-[75vh] object-contain rounded-2xl transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
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

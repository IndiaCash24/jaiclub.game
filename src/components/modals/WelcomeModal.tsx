import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      {/* Popup Container fitted strictly to Image Size */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[90vw] sm:max-w-md max-h-[85vh] flex flex-col items-center justify-center bg-[#12072B] border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.5)] overflow-hidden transition-all duration-300 animate-scaleUp group"
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
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/60">
          <img
            src={imageUrl || '/src/assets/images/vault_gold_bonus_1785787230279.jpg'}
            alt="Welcome Notice"
            referrerPolicy="no-referrer"
            className="w-full max-h-[75vh] object-contain rounded-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/vault_gold_bonus_1785787230279.jpg';
            }}
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

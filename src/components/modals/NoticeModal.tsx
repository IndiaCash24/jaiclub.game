import React from 'react';
import { X, ShieldAlert, CheckCircle2, PhoneCall, HelpCircle } from 'lucide-react';

interface NoticeModalProps {
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[440px] bg-[#160B38] border border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11082C] border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">OFFICIAL SECURITY NOTICE</h3>
              <p className="text-[10px] text-purple-300/80">सुरक्षा चेतावनी एवं आधिकारिक निर्देश</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice Body */}
        <div className="p-4 overflow-y-auto space-y-3 text-xs leading-relaxed text-purple-200 max-h-[75vh]">
          
          <div className="bg-[#11082C] border border-yellow-500/40 rounded-xl p-3 space-y-2">
            <h4 className="text-xs font-black text-yellow-400 uppercase tracking-wide flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-yellow-400" /> महत्वपूर्ण सुरक्षा चेतावनी (SECURITY NOTICE)
            </h4>
            <p className="text-slate-200">
              हमारा कस्टमर सर्विस कभी भी किसी सदस्य का पासवर्ड, UPI PIN या ओटीपी (OTP) नहीं पूछेगी।
            </p>
            <p className="text-slate-200">
              यदि आपको कोई लिंक या कॉल किसी ऐसे व्यक्ति द्वारा प्राप्त होता है जो JAI CLUB का आधिकारिक कर्मचारी होने का दावा करता है, तो कृपया उसे अपना कोई भी विवरण न दें और तुरंत 24x7 सपोर्ट पर रिपोर्ट करें।
            </p>
          </div>

          <div className="space-y-2 bg-[#12082B] p-3 rounded-xl border border-purple-500/30">
            <h5 className="font-extrabold text-white">आधिकारिक नियम व सुझाव:</h5>
            <ul className="space-y-1.5 text-[11px] text-purple-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                केवल आधिकारिक वेबसाइट jaiclub39.com का ही उपयोग करें।
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                अपनी किसी भी समस्या के समाधान हेतु 24x7 Live Chat Support का उपयोग करें।
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                पासवर्ड हमेशा सुरक्षित रखें एवं किसी के साथ शेयर न करें।
              </li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase text-xs tracking-wider shadow-md active:scale-95 transition-transform"
          >
            I UNDERSTAND (समझ गया/गई)
          </button>

        </div>

      </div>
    </div>
  );
};

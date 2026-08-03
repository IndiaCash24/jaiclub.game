import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wallet as WalletIcon, 
  RefreshCw, 
  ArrowDownLeft, 
  ArrowUpRight, 
  History, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { UserState } from '../../types';

interface WalletPageProps {
  user: UserState;
  onBack: () => void;
  onDepositSuccess: (amt: number) => void;
}

export const WalletPage: React.FC<WalletPageProps> = ({ user, onBack, onDepositSuccess }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'deposit' | 'withdraw' | 'deposit_history' | 'withdraw_history'>('main');
  const [depositAmt, setDepositAmt] = useState<number>(500);
  const [customAmt, setCustomAmt] = useState<string>('');
  const [selectedGateway, setSelectedGateway] = useState<'phonepe' | 'gpay' | 'paytm' | 'upi'>('phonepe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Withdraw fields
  const [withdrawAmt, setWithdrawAmt] = useState<number>(1000);
  const [upiId, setUpiId] = useState<string>('');

  const presetAmounts = [100, 300, 500, 1000, 2000, 5000, 10000];

  const handleDeposit = () => {
    const finalAmt = customAmt ? parseFloat(customAmt) : depositAmt;
    if (!finalAmt || finalAmt < 100) {
      alert('Minimum deposit amount is ₹100');
      return;
    }

    setIsProcessing(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsProcessing(false);
      onDepositSuccess(finalAmt);
      setSuccessMsg(`Deposit of ₹${finalAmt} successful! Balance updated.`);
      setCustomAmt('');
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1200);
  };

  const handleWithdraw = () => {
    if (withdrawAmt > user.balance) {
      alert('Insufficient balance for withdrawal!');
      return;
    }
    if (withdrawAmt < 300) {
      alert('Minimum withdrawal is ₹300');
      return;
    }

    setIsProcessing(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsProcessing(false);
      onDepositSuccess(-withdrawAmt);
      setSuccessMsg(`Withdrawal request of ₹${withdrawAmt} submitted! Processing time 5-10 mins.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0C071E] text-slate-100 pb-28 font-sans select-none">
      
      {/* 1. TOP NAVBAR */}
      <div className="sticky top-0 z-40 bg-[#120B29]/95 backdrop-blur-md px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full text-purple-200 hover:text-white hover:bg-purple-900/40 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-lg font-bold text-white tracking-wide">Wallet</h1>

        <div className="w-6" /> {/* Placeholder for balance alignment */}
      </div>

      <div className="p-3.5 space-y-4 max-w-[480px] mx-auto">

        {/* 2. GRADIENT TOP BALANCE CARD (CORAL PINK TO SKY BLUE) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF5E80] via-[#A855F7] to-[#38BDF8] p-5 shadow-[0_10px_25px_rgba(255,94,128,0.3)] text-white text-center space-y-2">
          
          {/* Top Wallet White Icon */}
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-inner">
            <WalletIcon className="w-7 h-7 text-white filter drop-shadow-md" />
          </div>

          {/* Balance Amount */}
          <div>
            <div className="text-3xl font-black tracking-tight text-white drop-shadow-md">
              ₹{user.balance.toFixed(2)}
            </div>
            <p className="text-xs font-semibold text-white/90">Total balance</p>
          </div>

          {/* Stats Bar */}
          <div className="pt-2 border-t border-white/20 grid grid-cols-2 text-center">
            <div className="border-r border-white/20 pr-2">
              <span className="text-base font-black block">0</span>
              <span className="text-[10px] font-medium text-white/80">Total Withdrawal Amount</span>
            </div>
            <div className="pl-2">
              <span className="text-base font-black block">0</span>
              <span className="text-[10px] font-medium text-white/80">Total deposit amount</span>
            </div>
          </div>
        </div>

        {/* 3. MAIN DARK WALLET CONTAINER */}
        <div className="bg-[#181031] border border-purple-500/30 rounded-3xl p-4 shadow-xl space-y-5">
          
          {/* Circular Progress Rings Row (Main Wallet vs 3rd Party Wallet) */}
          <div className="grid grid-cols-2 gap-4 text-center">
            
            {/* Left Ring: Main Wallet */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full border-4 border-indigo-600/40 flex items-center justify-center bg-[#100924] shadow-inner">
                {/* SVG Ring Progress */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-purple-600"
                    fill="transparent"
                    strokeDasharray="263"
                    strokeDashoffset="263"
                  />
                </svg>
                <span className="text-lg font-black text-white">0%</span>
              </div>
              <span className="text-sm font-bold text-white mt-2">₹{user.balance.toFixed(2)}</span>
              <span className="text-xs text-purple-300 font-medium">Main wallet</span>
            </div>

            {/* Right Ring: 3rd Party Wallet */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full border-4 border-indigo-600/40 flex items-center justify-center bg-[#100924] shadow-inner">
                <span className="text-lg font-black text-white">0%</span>
              </div>
              <span className="text-sm font-bold text-white mt-2">₹0.00</span>
              <span className="text-xs text-purple-300 font-medium">3rd party wallet</span>
            </div>

          </div>

          {/* Main Wallet Transfer Button (Pink-to-Blue Gradient) */}
          <button
            onClick={() => alert("Main wallet transfer synchronized automatically!")}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF5E80] via-[#A855F7] to-[#38BDF8] text-white font-black text-sm shadow-lg active:scale-98 transition-transform uppercase tracking-wider"
          >
            Main wallet transfer
          </button>

          {/* 4 Quick Actions Row */}
          <div className="grid grid-cols-4 gap-2 text-center pt-1">
            
            {/* Deposit Action */}
            <button
              onClick={() => setActiveTab(activeTab === 'deposit' ? 'main' : 'deposit')}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90 ${activeTab === 'deposit' ? 'ring-2 ring-amber-300' : ''}`}>
                <ArrowDownLeft className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200">Deposit</span>
            </button>

            {/* Withdraw Action */}
            <button
              onClick={() => setActiveTab(activeTab === 'withdraw' ? 'main' : 'withdraw')}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90 ${activeTab === 'withdraw' ? 'ring-2 ring-sky-300' : ''}`}>
                <ArrowUpRight className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200">Withdraw</span>
            </button>

            {/* Deposit History */}
            <button
              onClick={() => setActiveTab(activeTab === 'deposit_history' ? 'main' : 'deposit_history')}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90">
                <FileText className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200 leading-tight">
                Deposit<br />history
              </span>
            </button>

            {/* Withdrawal History */}
            <button
              onClick={() => setActiveTab(activeTab === 'withdraw_history' ? 'main' : 'withdraw_history')}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md transition-transform group-active:scale-90">
                <History className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-purple-200 leading-tight">
                Withdrawal<br />history
              </span>
            </button>

          </div>

        </div>

        {/* 4. SUB-WALLETS CARDS ROW */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-[#181031] border border-purple-500/25 rounded-2xl p-4 flex flex-col justify-between h-24">
            <span className="text-xl font-extrabold text-white">0.00</span>
            <span className="text-xs font-semibold text-purple-300">ARGame</span>
          </div>

          <div className="bg-[#181031] border border-purple-500/25 rounded-2xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
            <span className="text-xl font-extrabold text-white">0.00</span>
            <span className="text-xs font-semibold text-purple-300">Lottery</span>
            {/* Subtle Wheel Graphic in Background */}
            <div className="absolute right-2 bottom-2 text-purple-600/30 text-4xl font-black pointer-events-none">
              🎰
            </div>
          </div>

        </div>

        {/* SUCCESS MESSAGE NOTIFICATION */}
        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 5. INTERACTIVE DEPOSIT FORM PANEL */}
        {activeTab === 'deposit' && (
          <div className="bg-[#181031] border border-amber-400/40 rounded-3xl p-4 space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Instant UPI Deposit
            </h3>

            {/* Gateways */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'phonepe', label: 'PhonePe' },
                { id: 'gpay', label: 'GPay' },
                { id: 'paytm', label: 'Paytm' },
                { id: 'upi', label: 'UPI QR' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedGateway(m.id as any)}
                  className={`py-2 px-1 rounded-xl text-xs font-black border transition-all ${
                    selectedGateway === m.id
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                      : 'bg-[#100824] text-purple-300 border-purple-500/20'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Amounts Grid */}
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setDepositAmt(amt);
                    setCustomAmt('');
                  }}
                  className={`py-2.5 rounded-xl text-xs font-black border transition-all ${
                    depositAmt === amt && !customAmt
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-amber-400 shadow-md'
                      : 'bg-[#100824] text-purple-200 border-purple-500/20'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Or enter custom amount (₹100+)"
              value={customAmt}
              onChange={(e) => setCustomAmt(e.target.value)}
              className="w-full bg-[#100824] border border-purple-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-amber-400 font-mono"
            />

            <button
              onClick={handleDeposit}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl gold-metallic-btn text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : `PAY ₹${customAmt || depositAmt} NOW`}
            </button>
          </div>
        )}

        {/* 6. INTERACTIVE WITHDRAW FORM PANEL */}
        {activeTab === 'withdraw' && (
          <div className="bg-[#181031] border border-sky-400/40 rounded-3xl p-4 space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-sm font-black text-sky-300 uppercase tracking-wider flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-sky-400" /> Fast Bank / UPI Withdraw
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-purple-200">Withdrawal Amount (Min ₹300)</label>
              <input
                type="number"
                value={withdrawAmt}
                onChange={(e) => setWithdrawAmt(Number(e.target.value))}
                className="w-full bg-[#100824] border border-purple-500/30 rounded-xl px-3 py-2.5 text-sm font-extrabold text-amber-300 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-purple-200">Your UPI ID or Bank VPA</label>
              <input
                type="text"
                placeholder="e.g. 9876543210@ybl"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-[#100824] border border-purple-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <button
              onClick={handleWithdraw}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : `SUBMIT WITHDRAWAL (₹${withdrawAmt})`}
            </button>
          </div>
        )}

        {/* 7. TRANSACTION HISTORIES */}
        {(activeTab === 'deposit_history' || activeTab === 'withdraw_history') && (
          <div className="bg-[#181031] border border-purple-500/30 rounded-3xl p-4 space-y-3 animate-fadeIn">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              {activeTab === 'deposit_history' ? 'Deposit History' : 'Withdrawal History'}
            </h3>

            <div className="space-y-2">
              {[
                { type: 'Deposit', amt: '+₹500.00', status: 'Success', date: '2026-08-03 14:20' },
                { type: 'Withdrawal', amt: '-₹300.00', status: 'Approved', date: '2026-08-02 19:10' },
              ].map((tx, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#100824] border border-purple-500/20 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{tx.type}</div>
                    <div className="text-[10px] text-purple-400">{tx.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-amber-300">{tx.amt}</div>
                    <span className="text-[10px] text-emerald-400 font-extrabold">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Footer Note */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-purple-400 font-semibold pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Bank-Grade 256-Bit SSL Encrypted Vault
        </div>

      </div>

    </div>
  );
};

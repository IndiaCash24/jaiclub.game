import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, ShieldCheck, CheckCircle2, History, ArrowLeft, RefreshCw } from 'lucide-react';
import { UserState } from '../../types';

interface WalletPageProps {
  user: UserState;
  onBack: () => void;
  onDepositSuccess: (amt: number) => void;
}

export const WalletPage: React.FC<WalletPageProps> = ({ user, onBack, onDepositSuccess }) => {
  const [activeMode, setActiveMode] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedGateway, setSelectedGateway] = useState<'phonepe' | 'gpay' | 'paytm' | 'upi'>('phonepe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Withdrawal fields
  const [withdrawAmt, setWithdrawAmt] = useState<number>(1000);
  const [upiId, setUpiId] = useState<string>('user@ybl');

  const presetAmounts = [100, 300, 500, 1000, 2000, 5000, 10000];

  const handleDeposit = () => {
    const finalAmt = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmt || finalAmt < 100) {
      alert('Minimum deposit amount is ₹100');
      return;
    }

    setIsProcessing(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsProcessing(false);
      onDepositSuccess(finalAmt);
      setSuccessMsg(`Deposit of ₹${finalAmt} via ${selectedGateway.toUpperCase()} successful!`);
      setCustomAmount('');
    }, 1500);
  };

  const handleWithdraw = () => {
    if (withdrawAmt > user.balance) {
      alert('Insufficient balance for withdrawal!');
      return;
    }
    if (withdrawAmt < 500) {
      alert('Minimum withdrawal is ₹500');
      return;
    }

    setIsProcessing(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsProcessing(false);
      onDepositSuccess(-withdrawAmt);
      setSuccessMsg(`Withdrawal request of ₹${withdrawAmt} to ${upiId} submitted successfully! Approval in 5-10 mins.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0418] text-slate-100 pb-24">
      {/* Top Bar Header */}
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
              Financial Wallet Center
            </h1>
            <p className="text-[11px] text-purple-300">Instant UPI Deposit & Fast Bank Withdrawal</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
            ₹{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Main Balance Display Card */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 rounded-2xl p-5 border border-purple-400/30 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                Available Wallet Balance
              </span>
              <div className="text-3xl font-black text-amber-300 gold-metallic-text my-1">
                ₹{user.balance.toFixed(2)}
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                100% Withdrawable
              </span>
            </div>

            <Wallet className="w-10 h-10 text-amber-400/80" />
          </div>
        </div>

        {/* Tab Switcher: Deposit / Withdraw / History */}
        <div className="grid grid-cols-3 p-1 rounded-xl bg-[#180C3A] border border-purple-500/30">
          <button
            onClick={() => setActiveMode('deposit')}
            className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'deposit'
                ? 'gold-metallic-btn text-slate-950 shadow-[0_0_12px_rgba(255,193,7,0.5)]'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4" /> Deposit
          </button>
          <button
            onClick={() => setActiveMode('withdraw')}
            className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'withdraw'
                ? 'gold-metallic-btn text-slate-950 shadow-[0_0_12px_rgba(255,193,7,0.5)]'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" /> Withdraw
          </button>
          <button
            onClick={() => setActiveMode('history')}
            className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'history'
                ? 'gold-metallic-btn text-slate-950 shadow-[0_0_12px_rgba(255,193,7,0.5)]'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" /> History
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* DEPOSIT FORM */}
        {activeMode === 'deposit' && (
          <div className="space-y-4">
            {/* Payment Gateway Selector */}
            <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 block">
                Select UPI Payment Gateway (+5% Extra Bonus)
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'phonepe', name: 'PhonePe UPI', color: 'border-purple-500' },
                  { id: 'gpay', name: 'Google Pay', color: 'border-blue-500' },
                  { id: 'paytm', name: 'Paytm Wallet', color: 'border-sky-500' },
                  { id: 'upi', name: 'Direct BHIM UPI', color: 'border-amber-500' },
                ].map((gw) => (
                  <button
                    key={gw.id}
                    onClick={() => setSelectedGateway(gw.id as any)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      selectedGateway === gw.id
                        ? 'bg-purple-900/60 border-amber-400 text-white shadow-[0_0_10px_rgba(255,193,7,0.4)]'
                        : 'bg-[#221252] border-purple-500/20 text-purple-300 hover:border-purple-400'
                    }`}
                  >
                    <span className="text-xs font-bold">{gw.name}</span>
                    <span className="text-[10px] text-amber-300 font-black">+5%</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Preset Amount Selection */}
            <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 block">
                Quick Deposit Amount
              </label>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                      amount === amt && !customAmount
                        ? 'gold-metallic-btn text-slate-950 shadow-[0_0_10px_rgba(255,193,7,0.5)]'
                        : 'bg-[#221252] border-purple-500/20 text-purple-300 hover:border-purple-400'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Or Enter Custom Amount (Min ₹100)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit Deposit Button */}
            <button
              onClick={handleDeposit}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wider gold-metallic-btn text-slate-950 shadow-[0_0_20px_rgba(255,193,7,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Processing Payment...
                </>
              ) : (
                `CONFIRM DEPOSIT (₹${customAmount || amount})`
              )}
            </button>
          </div>
        )}

        {/* WITHDRAW FORM */}
        {activeMode === 'withdraw' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 block">
                Withdrawal Amount (Min ₹500 - Max ₹1,00,000)
              </label>

              <input
                type="number"
                value={withdrawAmt}
                onChange={(e) => setWithdrawAmt(Number(e.target.value))}
                className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-sm font-bold text-amber-300 focus:outline-none focus:border-amber-400 mb-3"
              />

              <label className="text-xs font-bold text-white uppercase tracking-wider mb-2 block">
                Target UPI ID / Bank VPA
              </label>

              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. 9876543210@ybl"
                className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-xs text-purple-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              onClick={handleWithdraw}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wider gold-metallic-btn text-slate-950 shadow-[0_0_20px_rgba(255,193,7,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Processing Request...
                </>
              ) : (
                `SUBMIT WITHDRAWAL (₹${withdrawAmt})`
              )}
            </button>
          </div>
        )}

        {/* TRANSACTION HISTORY LOG */}
        {activeMode === 'history' && (
          <div className="bg-gradient-to-br from-[#1C0E42] to-[#12072E] rounded-2xl p-4 border border-purple-500/30 space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Recent Transactions</h3>

            {[
              { type: 'Deposit', amt: '+₹1,000.00', gateway: 'PhonePe UPI', time: 'Today, 14:20', status: 'Success', color: 'text-emerald-400' },
              { type: 'Withdraw', amt: '-₹500.00', gateway: 'Bank UPI', time: 'Yesterday, 19:10', status: 'Success', color: 'text-amber-300' },
              { type: 'Deposit', amt: '+₹500.00', gateway: 'Google Pay', time: '01 Aug, 11:05', status: 'Success', color: 'text-emerald-400' },
            ].map((tx, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#221252] border border-purple-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{tx.type} - {tx.gateway}</div>
                  <div className="text-[10px] text-purple-300">{tx.time}</div>
                </div>

                <div className="text-right">
                  <div className={`text-xs font-black ${tx.color}`}>{tx.amt}</div>
                  <span className="text-[9px] text-emerald-400 font-bold">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

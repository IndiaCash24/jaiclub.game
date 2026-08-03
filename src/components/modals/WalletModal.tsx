import React, { useState } from 'react';
import { UserState } from '../../types';
import { X, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WalletModalProps {
  user: UserState;
  onClose: () => void;
  onDepositSuccess: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  user,
  onClose,
  onDepositSuccess,
}) => {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [payMethod, setPayMethod] = useState<'upi' | 'phonepe' | 'gpay' | 'paytm'>('phonepe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const depositTiers = [100, 300, 500, 1000, 2000, 5000, 10000];

  const handleDeposit = () => {
    const finalAmt = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmt || finalAmt < 100) {
      alert('Minimum deposit amount is ₹100');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      // Add first deposit bonus +₹488 if depositing ₹500 or more!
      const bonus = finalAmt >= 500 ? 488 : 50;
      const totalToAdd = finalAmt + bonus;
      onDepositSuccess(totalToAdd);
      setIsProcessing(false);
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-3 animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-[#160B38] border-t sm:border border-purple-500/40 rounded-t-2xl sm:rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.5)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11082C] border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400">
              <WalletIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">JAI CLUB WALLET</h3>
              <p className="text-[10px] text-purple-300/80">Instant Deposit & Instant Withdrawal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Balance Banner */}
        <div className="p-4 bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-purple-950/60 border-b border-purple-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">Current Balance</span>
            <span className="text-2xl font-black gold-metallic-text">₹{user.balance.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTab('deposit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1 ${
                tab === 'deposit'
                  ? 'bg-yellow-500 text-slate-950 shadow-[0_0_12px_rgba(255,215,0,0.6)]'
                  : 'bg-[#1C0E42] text-purple-300 hover:text-white'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" /> Deposit
            </button>
            <button
              onClick={() => setTab('withdraw')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1 ${
                tab === 'withdraw'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                  : 'bg-[#1C0E42] text-purple-300 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Withdraw
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[60vh]">
          
          {showSuccessMsg ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-black text-white">Deposit Successful!</h4>
              <p className="text-xs text-purple-200">Added funds + First Deposit Bonus ₹488 to your wallet.</p>
            </div>
          ) : tab === 'deposit' ? (
            <>
              {/* Promo Bonus Tier Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 via-purple-600/20 to-pink-500/20 border border-yellow-500/40 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-yellow-400 block">FIRST DEPOSIT BONUS</span>
                  <span className="text-[10px] text-purple-200">Deposit ₹500+ and receive extra <strong className="text-yellow-300 font-extrabold">+₹488 Bonus!</strong></span>
                </div>
                <span className="text-lg font-black gold-metallic-text">+₹488</span>
              </div>

              {/* Select Amount Grid */}
              <div>
                <label className="text-xs font-bold text-purple-200 uppercase tracking-wider block mb-2">
                  Select Deposit Amount (INR)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {depositTiers.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`relative py-3 rounded-xl border text-sm font-black transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-yellow-400 text-white shadow-[0_0_12px_rgba(255,215,0,0.5)] scale-102'
                            : 'bg-[#12082B] border-purple-500/30 text-purple-200 hover:border-purple-400'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                        {amt >= 500 && (
                          <span className="absolute -top-2 -right-1 bg-yellow-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-white">
                            +₹488
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Gateways */}
              <div>
                <label className="text-xs font-bold text-purple-200 uppercase tracking-wider block mb-2">
                  Payment Gateway (UPI 0% Fee)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-900/60 border-purple-400' },
                    { id: 'gpay', name: 'GPay', color: 'bg-blue-900/60 border-blue-400' },
                    { id: 'paytm', name: 'Paytm', color: 'bg-cyan-900/60 border-cyan-400' },
                    { id: 'upi', name: 'UPI QR', color: 'bg-emerald-900/60 border-emerald-400' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id as any)}
                      className={`py-2 px-1 rounded-xl border text-center transition-all ${
                        payMethod === m.id
                          ? `${m.color} text-white font-black shadow-md`
                          : 'bg-[#12082B] border-purple-500/30 text-purple-300'
                      }`}
                    >
                      <span className="text-xs font-extrabold block">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDeposit}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-black text-slate-950 gold-metallic-btn text-base uppercase tracking-wider shadow-[0_0_20px_rgba(255,193,7,0.5)] active:scale-95 transition-all"
              >
                {isProcessing ? 'Connecting Gateway...' : `DEPOSIT ₹${customAmount || selectedAmount} NOW`}
              </button>

            </>
          ) : (
            /* Withdraw Tab */
            <div className="space-y-4">
              <div className="bg-[#12082B] border border-purple-500/30 rounded-xl p-3 text-xs text-purple-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Withdrawable Balance:</span>
                  <span className="text-emerald-400 font-extrabold">₹{user.balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-purple-300">
                  <span>Minimum Withdrawal:</span>
                  <span>₹200.00</span>
                </div>
              </div>

              <input
                type="number"
                placeholder="Enter withdrawal amount (₹200 - ₹50,000)"
                className="w-full bg-[#12082B] border border-purple-500/40 rounded-xl p-3 text-sm text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400"
              />

              <button
                onClick={() => alert('Withdrawal request submitted! Processing time: 5-15 minutes.')}
                className="w-full py-3 rounded-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase text-sm shadow-md"
              >
                SUBMIT WITHDRAWAL REQUEST
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-purple-400 font-semibold pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit Encrypted Instant Bank Transfer
          </div>

        </div>

      </div>
    </div>
  );
};

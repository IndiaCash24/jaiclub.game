import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Image as ImageIcon,
  Users,
  CreditCard,
  Settings,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Save,
  Trash2,
  TrendingUp,
  DollarSign,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { GameItem, CategoryId } from '../../types';
import { normalizeImageUrl, DEFAULT_DIAMOND_IMAGE } from '../../utils/imageUtils';

interface AdminDashboardPageProps {
  games: GameItem[];
  banners: string[];
  welcomePopupUrl?: string;
  onUpdateGameImage: (gameId: string, newImageUrl: string) => void;
  onAddBanner: (url: string) => void;
  onUpdateBanner: (index: number, newUrl: string) => void;
  onDeleteBanner: (index: number) => void;
  onUpdateWelcomePopupUrl?: (url: string) => void;
  onBackToApp: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  games,
  banners,
  welcomePopupUrl = '/images/vault_gold_bonus_1785787230279.jpg',
  onUpdateGameImage,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onUpdateWelcomePopupUrl,
  onBackToApp,
}) => {
  const [activeTab, setActiveTab] = useState<'popup' | 'banners' | 'images' | 'users' | 'finance' | 'settings'>('popup');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newBannerInput, setNewBannerInput] = useState('');
  const [editingPopupInput, setEditingPopupInput] = useState(welcomePopupUrl);
  
  // Local state for game image editing inputs
  const [editingImageUrls, setEditingImageUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    games.forEach((g) => {
      initial[g.id] = g.imageUrl || '';
    });
    return initial;
  });

  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  // Sample preset banner image URLs for quick 1-click test addition
  const presetBannerSamples = [
    { label: 'Gold Vault & Coins Banner', url: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Aviator Red Jet Banner', url: 'https://images.unsplash.com/photo-1519074069444-1ba4eae287b9?w=1000&auto=format&fit=crop&q=80' },
    { label: 'WinGo 3D Balls Banner', url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Purple Diamond VIP Banner', url: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Unsplash Casino Lights Banner', url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80' },
    { label: 'Unsplash Stadium Lights Banner', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80' },
  ];

  // Sample preset manual image URLs for games
  const samplePresets = [
    { label: 'Aviator Red Jet', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80' },
    { label: 'Aviator Dark Jet', url: 'https://images.unsplash.com/photo-1519074069444-1ba4fff16d16?w=500&auto=format&fit=crop&q=80' },
    { label: 'WinGo 3D Balls', url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80' },
    { label: 'Cricket IPL Stadium', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=80' },
    { label: 'PUBG Warfare Helmet', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80' },
    { label: 'Golden Slot 777', url: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=500&auto=format&fit=crop&q=80' },
    { label: 'Mines Treasure', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80' },
  ];

  // Demo user data
  const [demoUsers, setDemoUsers] = useState([
    { id: '8839201', name: 'JAICLUB_PLAYER', phone: '+91 98765*****', balance: 500.0, vip: 1, status: 'Active' },
    { id: '8839202', name: 'Rahul_Pro', phone: '+91 91234*****', balance: 14250.0, vip: 3, status: 'Active' },
    { id: '8839203', name: 'Vikram_King', phone: '+91 99887*****', balance: 850.5, vip: 2, status: 'Active' },
    { id: '8839204', name: 'Priya_Winner', phone: '+91 94455*****', balance: 0.0, vip: 1, status: 'Suspended' },
  ]);

  // Demo financial transactions
  const [financialRequests, setFinancialRequests] = useState([
    { id: 'TXN-9021', type: 'Withdrawal', user: 'Rahul_Pro', amount: 5000, method: 'UPI / PhonePe', time: '10 mins ago', status: 'Pending' },
    { id: 'TXN-9022', type: 'Deposit', user: 'JAICLUB_PLAYER', amount: 1000, method: 'Paytm Wallet', time: '25 mins ago', status: 'Approved' },
    { id: 'TXN-9023', type: 'Withdrawal', user: 'Vikram_King', amount: 2500, method: 'IMPS Bank', time: '1 hour ago', status: 'Pending' },
  ]);

  const handleInputChange = (gameId: string, value: string) => {
    setEditingImageUrls((prev) => ({
      ...prev,
      [gameId]: value,
    }));
  };

  const handleSaveImage = (gameId: string, gameTitle: string) => {
    const url = editingImageUrls[gameId] || '';
    onUpdateGameImage(gameId, url);
    setSavedFeedback(`Image URL updated for ${gameTitle}!`);
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  const handleClearImage = (gameId: string, gameTitle: string) => {
    handleInputChange(gameId, '');
    onUpdateGameImage(gameId, '');
    setSavedFeedback(`Cleared image URL for ${gameTitle}.`);
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  const handleApplyPreset = (gameId: string, presetUrl: string) => {
    handleInputChange(gameId, presetUrl);
  };

  const filteredGames = games.filter((g) => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#070312] text-slate-100 pb-24 font-sans">
      {/* Admin Top Sticky Bar */}
      <div className="sticky top-0 z-40 bg-[#0F0724]/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToApp}
            className="p-2 rounded-xl bg-purple-950 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all"
            title="Return to Player App View"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400 fill-amber-400/20 animate-pulse" />
              <h1 className="text-base font-black tracking-wider uppercase gold-metallic-text">
                JAI CLUB ADMIN PANEL
              </h1>
            </div>
            <p className="text-[11px] text-purple-300 font-medium">Master Control Console & Image Link Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Engine Online
          </span>
          <button
            onClick={onBackToApp}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase shadow-md active:scale-95 transition-all"
          >
            Exit Admin
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Saved Feedback Toast Notification */}
        {savedFeedback && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {/* Dashboard Top Metrics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#160A38] to-[#0D0422] border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Users</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white">14,280</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-0.5">↑ +12% this week</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#160A38] to-[#0D0422] border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Gross Deposits</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-300">₹24,85,900</div>
            <div className="text-[10px] text-purple-300 font-medium mt-0.5">Total platform volume</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#160A38] to-[#0D0422] border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Withdrawals</span>
              <CreditCard className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-rose-300">₹16,40,200</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-0.5">99.4% Automated</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#160A38] to-[#0D0422] border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Games</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white">{games.length}</div>
            <div className="text-[10px] text-amber-400 font-semibold mt-0.5">Manual URLs Enabled</div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('popup')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'popup'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-purple-950/60 text-purple-300 border border-purple-500/20 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Welcome Pop-Up Option
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'banners'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-purple-950/60 text-purple-300 border border-purple-500/20 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Banner Sliders Option ({banners.length})
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'images'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-purple-950/60 text-purple-300 border border-purple-500/20 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Game Images Link Option ({games.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-purple-950/60 text-purple-300 border border-purple-500/20 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> User Management
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'finance'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-purple-950/60 text-purple-300 border border-purple-500/20 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Deposit & Withdrawal Queue
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-purple-950/60 text-purple-300 border border-purple-500/20 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Platform Settings
          </button>
        </div>

        {/* TAB 0: HOME ENTRY WELCOME POP-UP IMAGE MANAGER */}
        {activeTab === 'popup' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-purple-900/80 via-indigo-950 to-slate-950 p-4 rounded-2xl border border-amber-500/30">
              <h2 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Home Entry Welcome Window Image
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                When a user opens or visits the website home page, this popup window will appear instantly showing the welcome image with a close button!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#140A30] border border-purple-500/30 space-y-4 shadow-xl">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                🖼️ Edit Welcome Popup Image URL
              </span>

              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="Paste welcome image URL here (e.g. https://... or /images/...)"
                  value={editingPopupInput}
                  onChange={(e) => setEditingPopupInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0C051F] border border-purple-500/40 text-xs text-white placeholder-purple-500 focus:outline-none focus:border-amber-400 font-mono"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (onUpdateWelcomePopupUrl && editingPopupInput.trim()) {
                        onUpdateWelcomePopupUrl(editingPopupInput.trim());
                        setSavedFeedback('Welcome Popup Image URL updated successfully!');
                        setTimeout(() => setSavedFeedback(null), 2500);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl gold-metallic-btn text-slate-950 text-xs font-black uppercase shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save Welcome Image
                  </button>
                </div>
              </div>

              {/* Sample Presets for Welcome Popup */}
              <div className="space-y-1 pt-2 border-t border-purple-500/20">
                <span className="text-[10px] font-bold text-purple-300 block">⚡ Sample Presets (Click to select & save):</span>
                <div className="flex flex-wrap gap-2">
                  {presetBannerSamples.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setEditingPopupInput(sample.url);
                        if (onUpdateWelcomePopupUrl) {
                          onUpdateWelcomePopupUrl(sample.url);
                          setSavedFeedback(`Set Welcome Popup to "${sample.label}"`);
                          setTimeout(() => setSavedFeedback(null), 2500);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-950/90 text-purple-200 border border-purple-500/30 text-[10px] font-semibold hover:border-amber-400 hover:text-amber-300 transition-all"
                    >
                      🎁 {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Container */}
              <div className="pt-3 border-t border-purple-500/20 space-y-2">
                <span className="text-xs font-extrabold text-purple-200 block">
                  Live Popup Window Preview:
                </span>
                <div className="w-full max-w-sm mx-auto h-56 rounded-2xl bg-black/60 border border-purple-500/40 overflow-hidden relative flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={normalizeImageUrl(editingPopupInput || welcomePopupUrl)}
                    alt=""
                    decoding="async"
                    loading="eager"
                    className="max-h-full max-w-full object-contain rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = normalizeImageUrl('/images/vault_gold_bonus_1785787230279.jpg');
                    }}
                  />
                  <div className="absolute top-3 right-3 p-1.5 bg-red-600 rounded-full text-white text-xs font-bold shadow-md">
                    ✕
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 1: TOP BANNER IMAGES SLIDER MANAGER */}
        {activeTab === 'banners' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-purple-900/80 via-indigo-950 to-slate-950 p-4 rounded-2xl border border-amber-500/30">
              <h2 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Top Home Page Banner Sliders Manager
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                Add, edit, or remove banner image URLs. The home page banner will auto-slide cleanly through all active banner images with zero text overlay!
              </p>
            </div>

            {/* Add New Banner Input Form */}
            <div className="bg-[#140A30] p-4 rounded-2xl border border-purple-500/30 space-y-3">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                ➕ Add New Banner Image Link
              </span>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="Paste banner image URL here (e.g. https://... or /images/...)"
                  value={newBannerInput}
                  onChange={(e) => setNewBannerInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0C051F] border border-purple-500/40 text-xs text-white placeholder-purple-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  onClick={() => {
                    if (newBannerInput.trim()) {
                      onAddBanner(newBannerInput.trim());
                      setNewBannerInput('');
                      setSavedFeedback('New Banner Image added successfully!');
                      setTimeout(() => setSavedFeedback(null), 2500);
                    }
                  }}
                  className="px-4 py-2 rounded-xl gold-metallic-btn text-slate-950 text-xs font-black uppercase shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add Banner
                </button>
              </div>

              {/* Preset Sample Banners */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-purple-300 block">⚡ Quick Sample Banners (Click to auto-fill input above):</span>
                <div className="flex flex-wrap gap-1.5">
                  {presetBannerSamples.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewBannerInput(sample.url)}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/90 text-purple-200 border border-purple-500/30 text-[10px] font-semibold hover:border-amber-400 hover:text-amber-300 transition-all"
                    >
                      🖼️ {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Banners List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  Active Banner Slides ({banners.length})
                </span>
                <span className="text-[10px] text-purple-300">Auto-slides on Home Page</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((bannerUrl, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#180C3A] to-[#0F0626] border border-purple-500/30 space-y-3 relative shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <span className="text-xs font-black text-amber-300 uppercase">
                        Slide #{index + 1}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-900 text-purple-200 border border-purple-500/30">
                        Active Banner
                      </span>
                    </div>

                    {/* Preview Image */}
                    <div className="w-full h-28 rounded-xl bg-[#0A0318] border border-purple-500/40 overflow-hidden flex items-center justify-center relative">
                      <img
                        src={normalizeImageUrl(bannerUrl)}
                        alt=""
                        decoding="async"
                        loading="eager"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = normalizeImageUrl('/images/vault_gold_bonus_1785787230279.jpg');
                        }}
                      />
                    </div>

                    {/* Input Field */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-purple-300 block">Banner Image URL:</label>
                      <input
                        type="url"
                        value={bannerUrl}
                        onChange={(e) => onUpdateBanner(index, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#0C051F] border border-purple-500/40 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    {/* Delete Action */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          onDeleteBanner(index);
                          setSavedFeedback(`Banner Slide #${index + 1} deleted.`);
                          setTimeout(() => setSavedFeedback(null), 2500);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Slide
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GAME IMAGES LINK MANAGER (Exact catalog games only) */}
        {activeTab === 'images' && (
          <div className="space-y-5">
            {/* Header & Description */}
            <div className="bg-gradient-to-r from-purple-900/80 via-indigo-950 to-slate-950 p-4 rounded-2xl border border-amber-500/30">
              <h2 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Catalog Games Image Link Manager ({games.length} Games)
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                Strictly lists only the exact games in your active catalog ({games.length} items). Enter or paste any image URL for a game to show pure image without any overlay text inside the card.
              </p>
            </div>

            {/* Quick Sample Presets Bar */}
            <div className="bg-[#140A30] p-3 rounded-2xl border border-purple-500/20 space-y-2">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                ⚡ Quick Sample Image URLs (Click to copy URL into any game):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigator.clipboard.writeText(preset.url);
                      setSavedFeedback(`Copied ${preset.label} URL to clipboard!`);
                      setTimeout(() => setSavedFeedback(null), 2500);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-950/90 text-purple-200 border border-purple-500/30 text-[10px] font-semibold hover:border-amber-400 hover:text-amber-300 transition-all flex items-center gap-1"
                  >
                    <span>🖼️ {preset.label}</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search games by title or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#170C38] border border-purple-500/30 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#170C38] border border-purple-500/30 text-xs text-purple-200 focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Categories ({games.length})</option>
                <option value="popular">Popular Games</option>
                <option value="lottery">Lottery (WinGo)</option>
                <option value="minigames">Mini Games (Mines/Aviator)</option>
                <option value="slots">Slots (Fortune/Crazy)</option>
                <option value="casino">Casino (Teen Patti)</option>
                <option value="sports">Sports (Cricket/PUBG)</option>
              </select>
            </div>

            {/* Games List for Image Editing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGames.map((game) => {
                const currentInputValue = editingImageUrls[game.id] ?? '';
                const hasCustomUrl = Boolean(game.imageUrl);

                return (
                  <div
                    key={game.id}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#180C3A] to-[#0F0626] border border-purple-500/30 space-y-3 relative shadow-xl"
                  >
                    {/* Game Header */}
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-amber-300">{game.title}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-500/30 uppercase">
                            {game.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-purple-300">ID: {game.id} • {game.subtitle}</span>
                      </div>

                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${hasCustomUrl ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-400'}`}>
                        {hasCustomUrl ? 'Custom Image URL Active' : 'Graphic Vector Mode'}
                      </span>
                    </div>

                    {/* Image URL Input & Preview Layout */}
                    <div className="flex gap-3 items-center">
                      {/* Live Image Thumbnail Preview */}
                      <div className="w-20 h-24 rounded-xl bg-[#0A0318] border border-purple-500/40 overflow-hidden flex flex-col items-center justify-center flex-shrink-0 relative">
                        {currentInputValue ? (
                          <img
                            src={normalizeImageUrl(currentInputValue)}
                            alt=""
                            decoding="async"
                            loading="eager"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback on broken URL
                              (e.target as HTMLImageElement).src = normalizeImageUrl(DEFAULT_DIAMOND_IMAGE);
                            }}
                          />
                        ) : (
                          <div className="text-center p-1">
                            <span className="text-xl block">🎮</span>
                            <span className="text-[8px] font-bold text-purple-400">Vector Artwork</span>
                          </div>
                        )}
                      </div>

                      {/* URL Control Input */}
                      <div className="flex-1 space-y-2">
                        <label className="text-[11px] font-bold text-purple-200 block">
                          Manual Image URL Link:
                        </label>
                        <input
                          type="url"
                          placeholder="Paste image URL (e.g. https://domain.com/image.jpg)..."
                          value={currentInputValue}
                          onChange={(e) => handleInputChange(game.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#0C051F] border border-purple-500/40 text-xs text-white placeholder-purple-500 focus:outline-none focus:border-amber-400 font-mono"
                        />

                        {/* Preset Quick Fill Selector */}
                        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                          <span className="text-[9px] text-purple-400 font-bold whitespace-nowrap">Presets:</span>
                          {samplePresets.slice(0, 3).map((p, i) => (
                            <button
                              key={i}
                              onClick={() => handleApplyPreset(game.id, p.url)}
                              className="px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 text-[9px] hover:text-amber-300 hover:border-amber-400 border border-purple-500/20 whitespace-nowrap"
                            >
                              {p.label.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-purple-500/20">
                      {currentInputValue && (
                        <button
                          onClick={() => handleClearImage(game.id, game.title)}
                          className="px-3 py-1.5 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Clear Image
                        </button>
                      )}

                      <button
                        onClick={() => handleSaveImage(game.id, game.title)}
                        className="px-4 py-1.5 rounded-lg gold-metallic-btn text-slate-950 text-xs font-black uppercase shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Image URL
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT DEMO */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="bg-[#150B33] p-4 rounded-2xl border border-purple-500/30 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-amber-300 uppercase">Registered Players Directory</h2>
                <p className="text-xs text-purple-300">View balances, grant VIP promotions, or manage account permissions</p>
              </div>
              <button
                onClick={() => alert('Add User Modal Opened')}
                className="px-3 py-1.5 rounded-xl bg-purple-900 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Test User
              </button>
            </div>

            <div className="bg-[#12072B] rounded-2xl border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-purple-200">
                  <thead className="bg-[#1B0E3E] text-amber-300 font-bold uppercase text-[10px] border-b border-purple-500/30">
                    <tr>
                      <th className="p-3">User ID & Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Wallet Balance</th>
                      <th className="p-3">VIP Badge</th>
                      <th className="p-3">Account Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {demoUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-purple-950/40 transition-colors">
                        <td className="p-3 font-bold text-white">
                          {u.name}
                          <span className="block text-[10px] text-purple-400">UID: {u.id}</span>
                        </td>
                        <td className="p-3 font-mono text-purple-300">{u.phone}</td>
                        <td className="p-3 font-black text-amber-300">₹{u.balance.toFixed(2)}</td>
                        <td className="p-3 font-extrabold text-amber-400">VIP {u.vip}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950 text-rose-300 border border-rose-500/30'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => {
                              setDemoUsers((prev) =>
                                prev.map((usr) => (usr.id === u.id ? { ...usr, balance: usr.balance + 1000 } : usr))
                              );
                              setSavedFeedback(`Credited ₹1,000 to ${u.name}`);
                              setTimeout(() => setSavedFeedback(null), 2500);
                            }}
                            className="px-2 py-1 rounded-md bg-purple-900 text-amber-300 text-[10px] font-bold border border-purple-500/30 hover:bg-purple-800"
                          >
                            +₹1000 Credit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FINANCIAL TRANSACTIONS QUEUE */}
        {activeTab === 'finance' && (
          <div className="space-y-4">
            <div className="bg-[#150B33] p-4 rounded-2xl border border-purple-500/30">
              <h2 className="text-sm font-black text-amber-300 uppercase">Live Deposit & Withdrawal Approvals</h2>
              <p className="text-xs text-purple-300">Review pending user payouts and verify manual deposit credits</p>
            </div>

            <div className="space-y-2.5">
              {financialRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-[#140833] border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${req.type === 'Deposit' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-amber-950 text-amber-400 border border-amber-500/40'}`}>
                      {req.type === 'Deposit' ? '↓' : '↑'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{req.user}</span>
                        <span className="text-[10px] font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/20">{req.method}</span>
                      </div>
                      <span className="text-[10px] text-purple-400 font-mono">{req.id} • {req.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <div className="text-right">
                      <span className="text-sm font-black text-amber-300">₹{req.amount.toLocaleString()}</span>
                      <span className={`block text-[10px] font-bold ${req.status === 'Approved' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {req.status}
                      </span>
                    </div>

                    {req.status === 'Pending' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setFinancialRequests((prev) =>
                              prev.map((r) => (r.id === req.id ? { ...r, status: 'Approved' } : r))
                            );
                            setSavedFeedback(`Approved payout ${req.id} for ${req.user}!`);
                            setTimeout(() => setSavedFeedback(null), 2500);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-slate-950 font-black text-xs uppercase hover:bg-emerald-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setFinancialRequests((prev) =>
                              prev.map((r) => (r.id === req.id ? { ...r, status: 'Rejected' } : r))
                            );
                            setSavedFeedback(`Rejected request ${req.id}.`);
                            setTimeout(() => setSavedFeedback(null), 2500);
                          }}
                          className="px-2 py-1.5 rounded-lg bg-rose-950 text-rose-300 text-xs font-bold border border-rose-500/30 hover:bg-rose-900"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PLATFORM SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-[#150B33] p-4 rounded-2xl border border-purple-500/30">
              <h2 className="text-sm font-black text-amber-300 uppercase">Game Engine & Odds Configuration</h2>
              <p className="text-xs text-purple-300">System maintenance, WinGo lottery frequency, and Aviator RTP odds</p>
            </div>

            <div className="bg-[#140833] p-4 rounded-2xl border border-purple-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <h3 className="text-xs font-bold text-white">WinGo Lottery Target RTP (%)</h3>
                  <p className="text-[10px] text-purple-300">Adjust total payout ratio return-to-player rate</p>
                </div>
                <span className="text-sm font-black text-amber-300">96.5%</span>
              </div>

              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <h3 className="text-xs font-bold text-white">Aviator Flight Speed Boost</h3>
                  <p className="text-[10px] text-purple-300">Controls visual flight duration multiplier curve</p>
                </div>
                <span className="text-sm font-black text-emerald-400">Normal (1.0x)</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Maintenance Mode</h3>
                  <p className="text-[10px] text-purple-300">Temporarily pause new game deposits</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  OFF (System Operational)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

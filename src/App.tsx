import React, { useState, useEffect } from 'react';
import { UserState, CategoryId, ActiveTab, GameItem } from './types';
import { GAMES_CATALOG } from './data/gamesData';
import { saveAppConfigToFirebase, subscribeToAppConfig } from './lib/firebase';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { CategoryNav } from './components/CategoryNav';
import { GameGrid } from './components/GameGrid';
import { BottomNav } from './components/BottomNav';

// Dedicated Page Components
import { ActivityPage } from './components/pages/ActivityPage';
import { PromotionPage } from './components/pages/PromotionPage';
import { WalletPage } from './components/pages/WalletPage';
import { AccountPage } from './components/pages/AccountPage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';

// Dedicated Game Engines
import { AviatorGame } from './components/games/AviatorGame';
import { WinGoGame } from './components/games/WinGoGame';
import { MinesGame } from './components/games/MinesGame';
import { CricketGame } from './components/games/CricketGame';
import { SlotsGame } from './components/games/SlotsGame';

// General Fallback Game Modal
import { GameModal } from './components/modals/GameModal';
import { NoticeModal } from './components/modals/NoticeModal';
import { WelcomeModal } from './components/modals/WelcomeModal';

export default function App() {
  // Dynamic Games Catalog State (Supports Admin URL Editing & Firebase Persistence)
  const [games, setGames] = useState<GameItem[]>(() => {
    try {
      const saved = localStorage.getItem('jai_club_games_images');
      if (saved) {
        const parsed: Array<{ id: string; imageUrl?: string }> = JSON.parse(saved);
        return GAMES_CATALOG.map((g) => {
          const match = parsed.find((p) => p.id === g.id);
          return match?.imageUrl ? { ...g, imageUrl: match.imageUrl } : g;
        });
      }
    } catch (e) {
      console.warn("Failed to read local games state:", e);
    }
    return GAMES_CATALOG;
  });

  // Top Banner Slider Images State (Supports Admin Adding/Editing/Removing Banners & Firebase Persistence)
  const [banners, setBanners] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jai_club_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Failed to read local banners state:", e);
    }
    return [
      '/src/assets/images/vault_gold_bonus_1785787230279.jpg',
      '/src/assets/images/aviator_red_jet_1785787036135.jpg',
      '/src/assets/images/wingo_3d_balls_1785787086705.jpg',
    ];
  });

  // Home Entry Welcome Image Popup State (Admin Editable URL & Firebase Persistence)
  const [welcomePopupUrl, setWelcomePopupUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('jai_club_welcome_popup');
      if (saved) return saved;
    } catch (e) {
      console.warn("Failed to read local welcome popup state:", e);
    }
    return '/src/assets/images/vault_gold_bonus_1785787230279.jpg';
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(true);

  // Subscribe to Firebase Firestore for Realtime Updates across devices
  useEffect(() => {
    const unsubscribe = subscribeToAppConfig((config) => {
      if (config.welcomePopupUrl) {
        setWelcomePopupUrl(config.welcomePopupUrl);
        localStorage.setItem('jai_club_welcome_popup', config.welcomePopupUrl);
      }
      if (config.banners && Array.isArray(config.banners) && config.banners.length > 0) {
        setBanners(config.banners);
        localStorage.setItem('jai_club_banners', JSON.stringify(config.banners));
      }
      if (config.games && Array.isArray(config.games)) {
        setGames((prevGames) =>
          prevGames.map((g) => {
            const found = config.games?.find((p) => p.id === g.id);
            return found?.imageUrl ? { ...g, imageUrl: found.imageUrl } : g;
          })
        );
        localStorage.setItem('jai_club_games_images', JSON.stringify(config.games));
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Admin View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // User state
  const [user, setUser] = useState<UserState>({
    balance: 500.00,
    username: 'JAICLUB_PLAYER',
    id: '8839201',
    vipLevel: 1,
    unreadNotifications: 2,
    language: 'EN',
  });

  // Navigation & Category states
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('popular');

  // Selected Game View state
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  // Filter games according to active category
  const filteredGames = games.filter((g) => {
    if (activeCategory === 'popular') return g.category === 'popular' || g.isHot;
    return g.category === activeCategory;
  });

  // Handle Bottom Nav Switch
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setActiveGame(null); // Return to page view
  };

  // Handle Game Image Update from Admin Panel
  const handleUpdateGameImage = (gameId: string, newImageUrl: string) => {
    setGames((prev) => {
      const updated = prev.map((g) => (g.id === gameId ? { ...g, imageUrl: newImageUrl } : g));
      const gameImagesData = updated.map((g) => ({ id: g.id, imageUrl: g.imageUrl }));
      saveAppConfigToFirebase({ games: gameImagesData });
      return updated;
    });
  };

  // Handle Banner Slider Operations from Admin Panel
  const handleAddBanner = (newUrl: string) => {
    if (!newUrl.trim()) return;
    setBanners((prev) => {
      const updated = [...prev, newUrl.trim()];
      saveAppConfigToFirebase({ banners: updated });
      return updated;
    });
  };

  const handleUpdateBanner = (index: number, newUrl: string) => {
    setBanners((prev) => {
      const copy = [...prev];
      copy[index] = newUrl;
      saveAppConfigToFirebase({ banners: copy });
      return copy;
    });
  };

  const handleDeleteBanner = (index: number) => {
    setBanners((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      saveAppConfigToFirebase({ banners: updated });
      return updated;
    });
  };

  const handleUpdateWelcomePopupUrl = (url: string) => {
    setWelcomePopupUrl(url);
    saveAppConfigToFirebase({ welcomePopupUrl: url });
  };

  // Language Toggle
  const handleToggleLanguage = () => {
    setUser((prev) => ({
      ...prev,
      language: prev.language === 'EN' ? 'HI' : 'EN',
    }));
  };

  // Balance Updates
  const handleUpdateBalance = (newBalance: number) => {
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, newBalance),
    }));
  };

  const handleDepositSuccess = (addedAmount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + addedAmount,
    }));
  };

  // Determine if a specific real game component exists
  const renderActiveGameScreen = () => {
    if (!activeGame) return null;

    if (activeGame.theme.includes('aviator')) {
      return (
        <AviatorGame
          game={activeGame}
          user={user}
          onBack={() => setActiveGame(null)}
          onUpdateBalance={handleUpdateBalance}
        />
      );
    }

    if (activeGame.theme === 'wingo') {
      return (
        <WinGoGame
          game={activeGame}
          user={user}
          onBack={() => setActiveGame(null)}
          onUpdateBalance={handleUpdateBalance}
        />
      );
    }

    if (activeGame.theme === 'mines') {
      return (
        <MinesGame
          game={activeGame}
          user={user}
          onBack={() => setActiveGame(null)}
          onUpdateBalance={handleUpdateBalance}
        />
      );
    }

    if (activeGame.theme === 'cricket') {
      return (
        <CricketGame
          game={activeGame}
          user={user}
          onBack={() => setActiveGame(null)}
          onUpdateBalance={handleUpdateBalance}
        />
      );
    }

    if (activeGame.theme === 'gold-slot') {
      return (
        <SlotsGame
          game={activeGame}
          user={user}
          onBack={() => setActiveGame(null)}
          onUpdateBalance={handleUpdateBalance}
        />
      );
    }

    // Fallback to general interactive modal
    return (
      <GameModal
        game={activeGame}
        user={user}
        onClose={() => setActiveGame(null)}
        onUpdateBalance={handleUpdateBalance}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#080314] text-slate-100 flex justify-center items-start antialiased selection:bg-purple-600 selection:text-white">
      
      {/* Mobile-First 480px Centered Container or Full Admin Layout */}
      <main className={`w-full ${isAdminOpen ? 'max-w-4xl' : 'max-w-[480px]'} min-h-screen bg-gradient-to-b from-[#0F0826] via-[#160B36] to-[#0B041A] relative shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-x-hidden border-x border-purple-500/10 transition-all duration-300`}>
        
        {/* If Admin Panel is open */}
        {isAdminOpen ? (
          <AdminDashboardPage
            games={games}
            banners={banners}
            welcomePopupUrl={welcomePopupUrl}
            onUpdateGameImage={handleUpdateGameImage}
            onAddBanner={handleAddBanner}
            onUpdateBanner={handleUpdateBanner}
            onDeleteBanner={handleDeleteBanner}
            onUpdateWelcomePopupUrl={handleUpdateWelcomePopupUrl}
            onBackToApp={() => setIsAdminOpen(false)}
          />
        ) : activeGame ? (
          /* If a Game is launched, render the full dedicated Game Page */
          renderActiveGameScreen()
        ) : (
          <>
            {/* Render Tab Views */}
            {activeTab === 'home' && (
              <div className="pb-20">
                {/* Top Header */}
                <Header
                  user={user}
                  onOpenWallet={() => setActiveTab('wallet')}
                  onOpenNotifications={() => alert('Notifications: Welcome to JAI CLUB! Deposit now and get ₹488 bonus!')}
                  onToggleLanguage={handleToggleLanguage}
                  onOpenAccount={() => setActiveTab('account')}
                />

                {/* Promotional Banner Carousel & Notice Ticker */}
                <PromoBanner
                  banners={banners}
                  onOpenNoticeDetail={() => setShowNoticeModal(true)}
                />

                {/* Category Filter Navigation Bar */}
                <CategoryNav
                  activeCategory={activeCategory}
                  onSelectCategory={(id) => setActiveCategory(id)}
                />

                {/* Game Cards Grid Section */}
                <GameGrid
                  games={filteredGames}
                  activeCategory={activeCategory}
                  onPlayGame={(game) => setActiveGame(game)}
                  onViewAllCategory={(cat) => setActiveCategory(cat)}
                />
              </div>
            )}

            {activeTab === 'activity' && (
              <ActivityPage
                user={user}
                onBack={() => setActiveTab('home')}
                onAddReward={handleDepositSuccess}
              />
            )}

            {activeTab === 'promotion' && (
              <PromotionPage
                user={user}
                onBack={() => setActiveTab('home')}
                onClaimBonus={handleDepositSuccess}
              />
            )}

            {activeTab === 'wallet' && (
              <WalletPage
                user={user}
                onBack={() => setActiveTab('home')}
                onDepositSuccess={handleDepositSuccess}
              />
            )}

            {activeTab === 'account' && (
              <AccountPage
                user={user}
                onBack={() => setActiveTab('home')}
                onOpenWallet={() => setActiveTab('wallet')}
                onToggleLanguage={handleToggleLanguage}
                onOpenAdmin={() => setIsAdminOpen(true)}
              />
            )}
          </>
        )}

        {/* Fixed Ultra-Professional Bottom Navigation Bar (Hidden when in Admin Dashboard or active game) */}
        {!isAdminOpen && !activeGame && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}

        {/* Notice Modal */}
        {showNoticeModal && (
          <NoticeModal onClose={() => setShowNoticeModal(false)} />
        )}

        {/* Home Entry Welcome Image Popup Modal */}
        {showWelcomeModal && !isAdminOpen && welcomePopupUrl && (
          <WelcomeModal
            imageUrl={welcomePopupUrl}
            onClose={() => setShowWelcomeModal(false)}
          />
        )}

      </main>

    </div>
  );
}

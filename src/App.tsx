import React, { useState } from 'react';
import { UserState, CategoryId, ActiveTab, GameItem } from './types';
import { GAMES_CATALOG } from './data/gamesData';
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

// Dedicated Game Engines
import { AviatorGame } from './components/games/AviatorGame';
import { WinGoGame } from './components/games/WinGoGame';
import { MinesGame } from './components/games/MinesGame';
import { CricketGame } from './components/games/CricketGame';
import { SlotsGame } from './components/games/SlotsGame';

// General Fallback Game Modal
import { GameModal } from './components/modals/GameModal';
import { NoticeModal } from './components/modals/NoticeModal';

export default function App() {
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
  const filteredGames = GAMES_CATALOG.filter((g) => {
    if (activeCategory === 'popular') return g.category === 'popular' || g.isHot;
    return g.category === activeCategory;
  });

  // Handle Bottom Nav Switch
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setActiveGame(null); // Return to page view
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
      
      {/* Mobile-First 480px Centered Container */}
      <main className="w-full max-w-[480px] min-h-screen bg-gradient-to-b from-[#0F0826] via-[#160B36] to-[#0B041A] relative shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-x-hidden border-x border-purple-500/10">
        
        {/* If a Game is launched, render the full dedicated Game Page */}
        {activeGame ? (
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
                  onOpenDeposit={() => setActiveTab('wallet')}
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
              />
            )}
          </>
        )}

        {/* Fixed Ultra-Professional Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Notice Modal */}
        {showNoticeModal && (
          <NoticeModal onClose={() => setShowNoticeModal(false)} />
        )}

      </main>

    </div>
  );
}

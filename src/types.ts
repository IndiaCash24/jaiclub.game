export type CategoryId = 'popular' | 'lottery' | 'minigames' | 'slots' | 'casino' | 'sports' | 'fishing';

export interface GameItem {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryId;
  multiplier?: string;
  badge?: string;
  badgeColor?: string;
  theme: 'aviator-dark' | 'aviator-red' | 'wingo' | 'cricket' | 'pubg' | 'sky-aviator' | 'gold-slot' | 'casino-blue' | 'mines' | 'wheel';
  iconType: 'plane-red' | 'plane-white' | 'billiards' | 'cricket' | 'helmet' | 'propeller' | 'slot' | 'cards' | 'rocket' | 'dice' | 'shield';
  imageUrl?: string;
  isHot?: boolean;
  isNew?: boolean;
  minBet?: number;
  playersCount?: number;
}

export type ActiveTab = 'home' | 'activity' | 'promotion' | 'wallet' | 'account';

export interface UserState {
  balance: number;
  username: string;
  id: string;
  vipLevel: number;
  unreadNotifications: number;
  language: 'EN' | 'HI';
}

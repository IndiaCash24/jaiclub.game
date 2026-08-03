import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

// User's provided Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYI9Xkms5nvGgiisdpcMU-dpi-7UGmTp8",
  authDomain: "jai-club-game-20c68.firebaseapp.com",
  projectId: "jai-club-game-20c68",
  storageBucket: "jai-club-game-20c68.firebasestorage.app",
  messagingSenderId: "302238396379",
  appId: "1:302238396379:web:fe15fdc60090453b3d81fe",
  measurementId: "G-1QLFBSLVMD"
};

// Initialize Firebase App safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore Database
export const db = getFirestore(app);

// Firestore Collection and Document references for App Config
const CONFIG_DOC = doc(db, "app_settings", "game_config");

export interface AppConfigData {
  games?: Array<{ id: string; imageUrl?: string }>;
  banners?: string[];
  welcomePopupUrl?: string;
}

// Save complete config to Firestore
export async function saveAppConfigToFirebase(config: AppConfigData) {
  try {
    await setDoc(CONFIG_DOC, config, { merge: true });
    // Also backup to localStorage
    if (config.banners) localStorage.setItem('jai_club_banners', JSON.stringify(config.banners));
    if (config.welcomePopupUrl) localStorage.setItem('jai_club_welcome_popup', config.welcomePopupUrl);
    if (config.games) localStorage.setItem('jai_club_games_images', JSON.stringify(config.games));
  } catch (error) {
    console.warn("Failed to save to Firebase, backing up to localStorage:", error);
    if (config.banners) localStorage.setItem('jai_club_banners', JSON.stringify(config.banners));
    if (config.welcomePopupUrl) localStorage.setItem('jai_club_welcome_popup', config.welcomePopupUrl);
    if (config.games) localStorage.setItem('jai_club_games_images', JSON.stringify(config.games));
  }
}

// Subscribe to real-time updates from Firestore
export function subscribeToAppConfig(onUpdate: (config: AppConfigData) => void) {
  try {
    return onSnapshot(CONFIG_DOC, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as AppConfigData;
        onUpdate(data);
      }
    }, (error) => {
      console.warn("Firestore snapshot error:", error);
    });
  } catch (err) {
    console.warn("Could not setup Firestore listener:", err);
    return () => {};
  }
}

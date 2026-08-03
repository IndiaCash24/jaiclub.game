import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, addDoc, query, orderBy, limit } from "firebase/firestore";

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

// Firestore Collection and Document references
const CONFIG_DOC = doc(db, "app_settings", "game_config");
const USER_DOC = doc(db, "users", "JAICLUB_PLAYER");

export interface AppConfigData {
  games?: Array<{ id: string; imageUrl?: string }>;
  banners?: string[];
  welcomePopupUrl?: string;
}

export interface UserData {
  balance: number;
  username: string;
  id: string;
  vipLevel: number;
  unreadNotifications: number;
  language: string;
}

// Save complete app config to Firestore
export async function saveAppConfigToFirebase(config: AppConfigData) {
  try {
    await setDoc(CONFIG_DOC, config, { merge: true });
  } catch (error) {
    console.warn("Failed to save app config to Firebase Firestore:", error);
  }
}

// Subscribe to real-time app config updates from Firestore
export function subscribeToAppConfig(onUpdate: (config: AppConfigData) => void) {
  try {
    return onSnapshot(CONFIG_DOC, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as AppConfigData;
        onUpdate(data);
      }
    }, (error) => {
      console.warn("Firestore snapshot error for app config:", error);
    });
  } catch (err) {
    console.warn("Could not setup Firestore app config listener:", err);
    return () => {};
  }
}

// Save user profile & balance directly to Firestore
export async function saveUserDataToFirebase(user: Partial<UserData>) {
  try {
    await setDoc(USER_DOC, user, { merge: true });
  } catch (error) {
    console.warn("Failed to save user data to Firebase Firestore:", error);
  }
}

// Subscribe to real-time User Profile & Balance updates from Firestore
export function subscribeToUserData(onUpdate: (user: UserData) => void) {
  try {
    return onSnapshot(USER_DOC, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;
        onUpdate(data);
      }
    }, (error) => {
      console.warn("Firestore user data snapshot error:", error);
    });
  } catch (err) {
    console.warn("Could not setup Firestore user data listener:", err);
    return () => {};
  }
}

// Record Deposit/Withdrawal Transactions to Firestore
export async function recordTransactionToFirebase(type: 'deposit' | 'withdraw' | 'game_win' | 'game_loss', amount: number, status: string = 'SUCCESS') {
  try {
    const txCol = collection(db, "transactions");
    await addDoc(txCol, {
      userId: "JAICLUB_PLAYER",
      type,
      amount,
      status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.warn("Failed to record transaction to Firestore:", error);
  }
}


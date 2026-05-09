// ========================================
// AFRO Horse 認証モジュール
// LIFF (LINE Login) + Firestore
// ========================================

// 設定値
const LIFF_ID = '2010025011-Ge20WgjB';

const firebaseConfig = {
  apiKey: "AIzaSyCgQbQDeruu4XnE4X585GANZ2gQeJ7ViEg",
  authDomain: "afro-horse.firebaseapp.com",
  projectId: "afro-horse",
  storageBucket: "afro-horse.firebasestorage.app",
  messagingSenderId: "744565672066",
  appId: "1:744565672066:web:de766cc9d8699e085c8c9b"
};

// Firebase初期化（既存ページと共存できるように）
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ========================================
// グローバル：現在のユーザー情報
// ========================================
let currentUser = null;

// ========================================
// LIFF初期化＆ログイン処理
// ========================================
async function initAuth() {
  try {
    await liff.init({ liffId: LIFF_ID });
    
    if (liff.isLoggedIn()) {
      // ログイン済み：ユーザー情報取得
      const profile = await liff.getProfile();
      currentUser = {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl
      };
      
      // Firestoreにユーザー情報を保存／更新
      await saveUserToFirestore(currentUser);
      
      return currentUser;
    } else {
      // 未ログイン
      currentUser = null;
      return null;
    }
  } catch (error) {
    console.error('LIFF初期化エラー:', error);
    return null;
  }
}

// ========================================
// ログイン実行
// ========================================
function login() {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

// ========================================
// ログアウト
// ========================================
function logout() {
  if (liff.isLoggedIn()) {
    liff.logout();
    currentUser = null;
    location.reload();
  }
}

// ========================================
// ユーザー情報をFirestoreに保存
// ========================================
async function saveUserToFirestore(user) {
  try {
    const userRef = db.collection('users').doc(user.userId);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      // 新規ユーザー：作成
      await userRef.set({
        userId: user.userId,
        displayName: user.displayName,
        pictureUrl: user.pictureUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      // 既存ユーザー：更新
      await userRef.update({
        displayName: user.displayName,
        pictureUrl: user.pictureUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.error('ユーザー保存エラー:', error);
  }
}

// ========================================
// 現在のユーザー取得（他ページから使う）
// ========================================
function getCurrentUser() {
  return currentUser;
}

// ========================================
// ログイン状態確認
// ========================================
function isLoggedIn() {
  return currentUser !== null;
}

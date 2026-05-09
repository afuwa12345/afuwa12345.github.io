// ========================================
// AFRO Horse 認証モジュール（v2）
// LIFF (LINE Login) + Firestore + 会員番号採番
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

// Firebase初期化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ========================================
// グローバル：現在のユーザー情報
// ========================================
let currentUser = null;
let currentUserData = null; // Firestoreに保存した会員データ

// ========================================
// LIFF初期化＆ログイン処理
// ========================================
async function initAuth() {
  try {
    await liff.init({ liffId: LIFF_ID });
    
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile();
      currentUser = {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl
      };
      
      // Firestoreにユーザー情報を保存（初回は会員番号も付与）
      currentUserData = await saveUserToFirestore(currentUser);
      
      return currentUser;
    } else {
      currentUser = null;
      currentUserData = null;
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
    currentUserData = null;
    location.reload();
  }
}

// ========================================
// ユーザー情報をFirestoreに保存
// 初回登録時は会員番号を採番
// ========================================
async function saveUserToFirestore(user) {
  try {
    const userRef = db.collection('users').doc(user.userId);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      // 新規ユーザー：会員番号を採番
      const memberNumber = await getNextMemberNumber();
      
      const newUserData = {
        userId: user.userId,
        displayName: user.displayName,
        pictureUrl: user.pictureUrl,
        memberNumber: memberNumber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      await userRef.set(newUserData);
      return newUserData;
    } else {
      // 既存ユーザー：表示名・アイコンだけ更新
      await userRef.update({
        displayName: user.displayName,
        pictureUrl: user.pictureUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return doc.data();
    }
  } catch (error) {
    console.error('ユーザー保存エラー:', error);
    return null;
  }
}

// ========================================
// 次の会員番号を取得（自動カウントアップ）
// ========================================
async function getNextMemberNumber() {
  const counterRef = db.collection('counters').doc('memberNumber');
  
  try {
    // トランザクションで安全にカウントアップ
    const newNumber = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      let next = 1;
      if (counterDoc.exists) {
        next = (counterDoc.data().current || 0) + 1;
      }
      
      transaction.set(counterRef, { current: next }, { merge: true });
      return next;
    });
    
    return newNumber;
  } catch (error) {
    console.error('会員番号採番エラー:', error);
    // フォールバック：タイムスタンプ
    return Date.now();
  }
}

// ========================================
// 現在のユーザー取得
// ========================================
function getCurrentUser() {
  return currentUser;
}

// ========================================
// 現在のユーザーデータ（Firestore）取得
// ========================================
function getCurrentUserData() {
  return currentUserData;
}

// ========================================
// ログイン状態確認
// ========================================
function isLoggedIn() {
  return currentUser !== null;
}

// ========================================
// キズナレース情報を取得
// ========================================
async function getKizunaData(userId) {
  try {
    const doc = await db.collection('kizuna_users').doc(userId).get();
    if (doc.exists) {
      return doc.data();
    }
    return null;
  } catch (e) {
    console.log('キズナデータ取得エラー:', e);
    return null;
  }
}

// ========================================
// キズナレース入隊（陣営＋推し馬）
// ========================================
async function joinKizuna(userId, jineiData, oshiData, cardDesignVersion = 'v1') {
  try {
    await db.collection('kizuna_users').doc(userId).set({
      userId: userId,
      jineiId: jineiData.id,
      jinei: jineiData.name,
      jineiStyle: jineiData.style,
      oshiId: oshiData.id,
      oshi: oshiData.name,
      cardDesign: cardDesignVersion,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('入隊エラー:', error);
    return false;
  }
}

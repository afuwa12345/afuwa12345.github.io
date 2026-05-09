// ========================================
// AFRO Horse 認証モジュール（v3）
// LIFF + Firestore + 会員番号採番（修正版）
// ========================================

const LIFF_ID = '2010025011-Ge20WgjB';

const firebaseConfig = {
  apiKey: "AIzaSyCgQbQDeruu4XnE4X585GANZ2gQeJ7ViEg",
  authDomain: "afro-horse.firebaseapp.com",
  projectId: "afro-horse",
  storageBucket: "afro-horse.firebasestorage.app",
  messagingSenderId: "744565672066",
  appId: "1:744565672066:web:de766cc9d8699e085c8c9b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

let currentUser = null;
let currentUserData = null;

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
      
      console.log('LIFF profile:', currentUser);
      
      currentUserData = await saveUserToFirestore(currentUser);
      
      console.log('保存後のuserData:', currentUserData);
      
      return currentUser;
    } else {
      currentUser = null;
      currentUserData = null;
      return null;
    }
  } catch (error) {
    console.error('LIFF初期化エラー:', error);
    alert('ログイン処理でエラーが発生しました: ' + error.message);
    return null;
  }
}

function login() {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

function logout() {
  if (liff.isLoggedIn()) {
    liff.logout();
    currentUser = null;
    currentUserData = null;
    location.reload();
  }
}

// ========================================
// ユーザー情報をFirestoreに保存（修正版）
// ========================================
async function saveUserToFirestore(user) {
  try {
    const userRef = db.collection('users').doc(user.userId);
    
    console.log('userドキュメント取得開始:', user.userId);
    const doc = await userRef.get();
    console.log('userドキュメント取得完了。exists:', doc.exists);
    
    if (!doc.exists) {
      // 新規ユーザー
      console.log('新規ユーザー → 会員番号採番開始');
      
      const memberNumber = await getNextMemberNumber();
      console.log('採番された会員番号:', memberNumber);
      
      const newUserData = {
        userId: user.userId,
        displayName: user.displayName,
        pictureUrl: user.pictureUrl || '',
        memberNumber: memberNumber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      console.log('users/{userId}に保存:', newUserData);
      await userRef.set(newUserData);
      console.log('users保存成功！');
      
      return newUserData;
    } else {
      // 既存ユーザー
      console.log('既存ユーザー検出');
      const data = doc.data();
      
      // 表示名・アイコン更新
      await userRef.update({
        displayName: user.displayName,
        pictureUrl: user.pictureUrl || '',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      return data;
    }
  } catch (error) {
    console.error('ユーザー保存エラー詳細:', error);
    console.error('エラーコード:', error.code);
    console.error('エラーメッセージ:', error.message);
    alert('ユーザー情報の保存に失敗しました。\n' + error.message);
    return null;
  }
}

// ========================================
// 次の会員番号を取得
// ========================================
async function getNextMemberNumber() {
  const counterRef = db.collection('counters').doc('memberNumber');
  
  try {
    const newNumber = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      let next = 1;
      if (counterDoc.exists) {
        next = (counterDoc.data().current || 0) + 1;
      }
      
      transaction.set(counterRef, { current: next }, { merge: true });
      return next;
    });
    
    console.log('採番結果:', newNumber);
    return newNumber;
  } catch (error) {
    console.error('会員番号採番エラー:', error);
    throw error;
  }
}

function getCurrentUser() {
  return currentUser;
}

function getCurrentUserData() {
  return currentUserData;
}

function isLoggedIn() {
  return currentUser !== null;
}

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

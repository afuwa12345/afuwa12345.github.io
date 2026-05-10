// ========================================
// AFRO Horse 共通ヘッダー：会員機能 + ナビ統合
// ========================================
// 使い方：
//   各HTMLの末尾で、auth.js の後にこのファイルを読み込むだけ
//   <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
//   <script src="js/auth.js"></script>
//   <script src="js/header.js"></script>
// ========================================

(async function() {
  
  // ========================================
  // 6キャラデータ（推し馬画像取得用）
  // ========================================
  const CHARACTERS = {
    afuwa:    { name: 'アフワ',         img: 'images/afuwa.png' },
    yancha:   { name: 'やんちゃアフワ',   img: 'images/yanchaahuwa.png' },
    buruma:   { name: 'ブルマ',          img: 'images/buruma.png' },
    chahuwa:  { name: 'チャフワ',        img: 'images/chahuwa.png' },
    kurohuwa: { name: 'クロフワ',        img: 'images/kurohuwa.png' },
    ginma:    { name: 'ギンマ',          img: 'images/ginma.png' }
  };
  
  // ========================================
  // 既存ヘッダーの種類検出
  // ========================================
  // パターンA：index.html のような <nav class="nav"> + ハンバーガー
  // パターンB：register.html / mypage.html / kizuna_race.html のような <header class="header">
  
  const existingNav = document.querySelector('nav.nav');
  const existingHeader = document.querySelector('header.header');
  
  // 既存のハンバーガーがあれば、そこに会員機能を追加
  if (existingNav) {
    enhanceExistingNav();
  } else if (existingHeader) {
    enhanceExistingHeader();
  } else {
    // ヘッダーが無いページは何もしない
    console.log('header.js: No nav/header found, skipping');
  }
  
  // ========================================
  // 共通：認証初期化＆データ取得
  // ========================================
  let user = null;
  let userData = null;
  let kizunaData = null;
  
  try {
    user = await initAuth();
    if (user) {
      userData = getCurrentUserData();
      kizunaData = await getKizunaData(user.userId);
    }
  } catch (e) {
    console.error('Header auth error:', e);
  }
  
  // 状態によってヘッダーを更新
  if (existingNav) {
    updateNavMember();
  }
  
  // ========================================
  // パターンA: <nav class="nav"> 拡張（index.html等）
  // ========================================
  function enhanceExistingNav() {
    // CSS追加
    injectNavMemberCSS();
    
    // ハンバーガー要素を取得して、会員モードのCSSクラス対応に
    const ham = document.getElementById('ham');
    if (ham) {
      ham.classList.add('ah-ham');
    }
    
    // メニューオーバーレイに会員セクション追加
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
      // 会員情報セクション（先頭に挿入）
      const memberSection = document.createElement('div');
      memberSection.className = 'ah-member-section';
      memberSection.id = 'ahMemberSection';
      memberSection.innerHTML = `<div class="ah-loading">読み込み中...</div>`;
      overlay.insertBefore(memberSection, overlay.firstChild);
      
      // 区切り線
      const divider1 = document.createElement('div');
      divider1.className = 'ah-divider';
      overlay.insertBefore(divider1, overlay.children[1]);
      
      // フッターセクション（最後に追加）
      const footerSection = document.createElement('div');
      footerSection.className = 'ah-footer-section';
      footerSection.id = 'ahFooterSection';
      overlay.appendChild(footerSection);
    }
  }
  
  // 認証情報に応じてヘッダー表示更新
  function updateNavMember() {
    const memberSection = document.getElementById('ahMemberSection');
    const footerSection = document.getElementById('ahFooterSection');
    const ham = document.getElementById('ham');
    
    if (user && userData && kizunaData && kizunaData.oshiId) {
      // ログイン済み・入隊済み
      const oshi = CHARACTERS[kizunaData.oshiId];
      
      // ハンバーガーを推し馬アイコンに変える
      if (ham && oshi) {
        ham.innerHTML = `<img src="${oshi.img}" alt="${oshi.name}" class="ah-ham-icon">`;
        ham.classList.add('ah-ham-loggedin');
      }
      
      // 会員セクション
      if (memberSection) {
        const memberNo = '#' + String(userData.memberNumber || '---').padStart(3, '0');
        memberSection.innerHTML = `
          <div class="ah-member-card" onclick="location.href='mypage.html'">
            <img src="${oshi ? oshi.img : ''}" alt="" class="ah-member-icon">
            <div class="ah-member-info">
              <div class="ah-member-name">${escapeHTML(userData.nickname || 'こう')}</div>
              <div class="ah-member-meta">${memberNo} / ${escapeHTML(kizunaData.jinei)}陣営</div>
            </div>
            <div class="ah-member-arrow">›</div>
          </div>
        `;
      }
      
      // フッター（ログアウトボタン）
      if (footerSection) {
        footerSection.innerHTML = `
          <a class="ah-logout" onclick="if(confirm('ログアウトしますか？')) { logout(); }">
            ログアウト
          </a>
        `;
      }
    } else if (user) {
      // ログイン済み・未入隊
      if (memberSection) {
        memberSection.innerHTML = `
          <a href="register.html" class="ah-cta">
            🎴 会員カードを発行する
          </a>
        `;
      }
      if (footerSection) {
        footerSection.innerHTML = `
          <a class="ah-logout" onclick="if(confirm('ログアウトしますか？')) { logout(); }">
            ログアウト
          </a>
        `;
      }
    } else {
      // 未ログイン
      if (memberSection) {
        memberSection.innerHTML = `
          <a href="register.html" class="ah-cta">
            🎴 会員登録する
          </a>
        `;
      }
      if (footerSection) {
        footerSection.innerHTML = '';
      }
    }
  }
  
  // ========================================
  // パターンB: <header class="header"> 拡張
  // (register.html, mypage.html等)
  // 既に専用ヘッダーがあるので何もしない
  // ========================================
  function enhanceExistingHeader() {
    // 何もしない（既に専用デザインがある）
  }
  
  // ========================================
  // CSS注入
  // ========================================
  function injectNavMemberCSS() {
    const style = document.createElement('style');
    style.textContent = `
      /* メニューオーバーレイを画面右半分に */
      @media (min-width: 0) {
        .menu-overlay {
          width: 75% !important;
          max-width: 360px !important;
          right: 0 !important;
          left: auto !important;
          transform: translateX(100%) !important;
          height: 100vh !important;
          top: 0 !important;
          padding-top: 80px !important;
          overflow-y: auto !important;
          box-shadow: -10px 0 40px rgba(0,0,0,0.5);
        }
        .menu-overlay.open {
          transform: translateX(0) !important;
        }
      }
      
      /* ハンバーガーが推し馬アイコンになる時 */
      .ah-ham-loggedin {
        padding: 0 !important;
        background: transparent !important;
        border: none !important;
      }
      .ah-ham-loggedin span {
        display: none !important;
      }
      .ah-ham-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        background: #fff;
        padding: 2px;
        border: 2px solid #ffd96b;
        box-shadow: 0 0 12px rgba(255, 217, 107, 0.4);
        transition: transform 0.2s ease;
      }
      .ah-ham-loggedin:hover .ah-ham-icon {
        transform: scale(1.1);
      }
      
      /* メニュー内の会員セクション */
      .ah-member-section {
        padding: 16px 20px;
      }
      .ah-loading {
        color: #87b89c;
        text-align: center;
        font-size: 13px;
      }
      
      /* 会員カード（メニュー内） */
      .ah-member-card {
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(255, 217, 107, 0.08);
        border: 1px solid rgba(255, 217, 107, 0.3);
        border-radius: 16px;
        padding: 12px 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
      }
      .ah-member-card:hover {
        background: rgba(255, 217, 107, 0.15);
      }
      .ah-member-icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #fff;
        padding: 3px;
        border: 2px solid #ffd96b;
        flex-shrink: 0;
      }
      .ah-member-info {
        flex: 1;
        text-align: left;
        min-width: 0;
      }
      .ah-member-name {
        font-size: 15px;
        font-weight: 900;
        color: #fff;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ah-member-meta {
        font-size: 11px;
        color: #ffd96b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ah-member-arrow {
        font-size: 22px;
        color: #ffd96b;
        font-weight: 900;
        flex-shrink: 0;
      }
      
      /* CTAボタン */
      .ah-cta {
        display: block;
        background: linear-gradient(135deg, #ffd96b, #ffb347) !important;
        color: #0a1f15 !important;
        padding: 14px 16px;
        border-radius: 12px;
        font-weight: 900;
        text-align: center;
        text-decoration: none;
        font-size: 14px !important;
        letter-spacing: 1px;
        transition: all 0.2s ease;
      }
      .ah-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 217, 107, 0.4);
      }
      
      /* 区切り線 */
      .ah-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 12px 20px;
      }
      
      /* メニュー内のa要素を小さめに調整 */
      .menu-overlay > a {
        font-size: 18px !important;
        padding: 14px 20px !important;
      }
      
      /* フッターセクション */
      .ah-footer-section {
        padding: 16px 20px;
        margin-top: auto;
      }
      .ah-logout {
        display: block;
        text-align: center;
        color: #c0392b !important;
        font-size: 13px !important;
        cursor: pointer;
        padding: 10px;
        text-decoration: none;
      }
      .ah-logout:hover {
        color: #e74c3c !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // ========================================
  // ユーティリティ
  // ========================================
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str || '');
    return div.innerHTML;
  }
  
})();

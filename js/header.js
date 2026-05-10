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
  // 🚀 最優先：一瞬の表示を防ぐCSSを最初に注入
  // ========================================
  const earlyStyle = document.createElement('style');
  earlyStyle.id = 'ah-early-style';
  earlyStyle.textContent = `
    .menu-overlay {
      visibility: hidden !important;
      transform: translateX(100%) !important;
      transition: none !important;
    }
  `;
  if (document.head) {
    document.head.insertBefore(earlyStyle, document.head.firstChild);
  } else {
    document.documentElement.appendChild(earlyStyle);
  }
  
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
    
    // バックドロップを追加（メニュー外側タップで閉じる用）
    const backdrop = document.createElement('div');
    backdrop.className = 'ah-backdrop';
    backdrop.id = 'ahBackdrop';
    document.body.appendChild(backdrop);
    
    // バックドロップクリックでメニュー閉じる
    backdrop.addEventListener('click', () => {
      if (typeof toggleMenu === 'function') {
        toggleMenu();
      } else {
        const overlay = document.getElementById('menuOverlay');
        if (overlay) overlay.classList.remove('open');
        if (ham) ham.classList.remove('open');
      }
    });
    
    // メニュー開閉に応じてバックドロップ表示制御
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
      // MutationObserverでoverlayのclass変化を監視
      const observer = new MutationObserver(() => {
        if (overlay.classList.contains('open')) {
          backdrop.classList.add('show');
        } else {
          backdrop.classList.remove('show');
        }
      });
      observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
    }
    
    // メニューオーバーレイに会員セクション追加
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
    
    // 早期注入したスタイルを削除（メインCSSが効くように）
    const earlyStyle = document.getElementById('ah-early-style');
    if (earlyStyle) earlyStyle.remove();
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
              <div class="ah-member-name">${escapeHTML(userData.nickname || 'こう')} <span class="ah-member-no">${memberNo}</span></div>
              <div class="ah-member-meta">${escapeHTML(kizunaData.jinei)}陣営</div>
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
      /* バックドロップ（メニュー外側） */
      .ah-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0s linear 0.3s;
      }
      .ah-backdrop.show {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease, visibility 0s linear 0s;
      }
      
      /* メニューオーバーレイを画面右半分に */
      @media (min-width: 0) {
        .menu-overlay {
          width: 85% !important;
          max-width: 380px !important;
          right: 0 !important;
          left: auto !important;
          transform: translateX(100%) !important;
          height: 100vh !important;
          height: 100dvh !important;
          top: 0 !important;
          padding: 90px 0 30px !important;
          overflow-y: scroll !important;
          -webkit-overflow-scrolling: touch !important;
          box-shadow: -10px 0 40px rgba(0,0,0,0.5);
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          justify-content: flex-start !important;
          z-index: 999 !important;
          visibility: hidden !important;
          transition: transform 0.3s ease, visibility 0s linear 0.3s !important;
        }
        .menu-overlay.open {
          transform: translateX(0) !important;
          visibility: visible !important;
          transition: transform 0.3s ease, visibility 0s linear 0s !important;
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
        padding: 0 16px;
        margin-bottom: 8px;
      }
      .ah-loading {
        color: #87b89c;
        text-align: center;
        font-size: 13px;
        padding: 16px;
      }
      
      /* 会員カード（メニュー内） */
      .ah-member-card {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(255, 217, 107, 0.08);
        border: 1px solid rgba(255, 217, 107, 0.3);
        border-radius: 14px;
        padding: 10px 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        font-family: 'Noto Sans JP', sans-serif !important;
      }
      .ah-member-card:hover {
        background: rgba(255, 217, 107, 0.15);
      }
      .ah-member-icon {
        width: 42px;
        height: 42px;
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
        overflow: hidden;
      }
      .ah-member-name {
        font-size: 14px;
        font-weight: 900;
        color: #fff;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 0 !important;
      }
      .ah-member-no {
        color: #ffd96b;
        font-size: 12px;
        margin-left: 4px;
      }
      .ah-member-meta {
        font-size: 10px;
        color: #ffd96b;
        line-height: 1.3;
        letter-spacing: 0 !important;
      }
      .ah-member-arrow {
        font-size: 20px;
        color: #ffd96b;
        font-weight: 900;
        flex-shrink: 0;
      }
      
      /* CTAボタン */
      .ah-cta {
        display: block;
        background: linear-gradient(135deg, #ffd96b, #ffb347) !important;
        color: #0a1f15 !important;
        padding: 14px 12px;
        border-radius: 12px;
        font-weight: 900;
        text-align: center;
        text-decoration: none;
        font-size: 14px !important;
        letter-spacing: 0 !important;
        line-height: 1.4 !important;
        font-family: 'Noto Sans JP', sans-serif !important;
        white-space: nowrap;
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
        font-size: 15px !important;
        padding: 12px 20px !important;
        line-height: 1.4 !important;
        margin: 0 !important;
        letter-spacing: 1px !important;
        text-align: left !important;
        white-space: nowrap !important;
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
        font-family: 'Noto Sans JP', sans-serif !important;
        letter-spacing: 0 !important;
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

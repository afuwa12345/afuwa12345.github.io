// ========================================
// AFRO Horse 共通ヘッダー：会員情報表示
// ========================================
// 使い方：
//   各HTMLの末尾で、auth.js の後にこのファイルを読み込むだけ
//   <script src="js/auth.js"></script>
//   <script src="js/header.js"></script>
// ========================================

(async function() {
  
  // ========================================
  // ① CSS をページに注入
  // ========================================
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* 会員情報ボックスのコンテナ */
    .ah-member-box {
      position: fixed;
      top: 14px;
      right: 14px;
      z-index: 9999;
      font-family: 'Noto Sans JP', sans-serif;
    }
    
    /* 「← HOME」の隣に並ぶよう、右端に固定だが
       少しオフセット調整する場合はこの位置を変更 */
    
    /* ログインボタン（未ログイン時） */
    .ah-login-btn {
      background: #0e2e1f;
      color: #fff;
      border: 1px solid #1a4a32;
      border-radius: 999px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: all 0.2s ease;
    }
    .ah-login-btn:hover {
      background: #1a4a32;
      transform: translateY(-1px);
    }
    
    /* ログイン中の表示 */
    .ah-user-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(14, 46, 31, 0.92);
      backdrop-filter: blur(8px);
      color: #fff;
      border: 1px solid #1a4a32;
      border-radius: 999px;
      padding: 4px 12px 4px 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ah-user-btn:hover {
      background: rgba(26, 74, 50, 0.95);
      transform: translateY(-1px);
    }
    .ah-user-btn img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
      background: #fff;
    }
    .ah-user-btn .ah-arrow {
      font-size: 10px;
      opacity: 0.7;
    }
    
    /* ドロップダウンメニュー */
    .ah-dropdown {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      min-width: 180px;
      overflow: hidden;
      display: none;
      animation: ahFadeIn 0.15s ease-out;
    }
    .ah-dropdown.show {
      display: block;
    }
    @keyframes ahFadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .ah-dropdown-item {
      display: block;
      padding: 12px 16px;
      color: #0e2e1f;
      text-decoration: none;
      font-size: 13px;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.15s ease;
    }
    .ah-dropdown-item:last-child {
      border-bottom: none;
    }
    .ah-dropdown-item:hover {
      background: #f5f5f5;
    }
    .ah-dropdown-item.danger {
      color: #c0392b;
    }
    .ah-dropdown-info {
      padding: 12px 16px;
      background: #f9f9f9;
      border-bottom: 1px solid #f0f0f0;
      font-size: 11px;
      color: #666;
    }
    .ah-dropdown-info strong {
      color: #0e2e1f;
      font-size: 13px;
    }
    
    /* スマホ用調整 */
    @media (max-width: 600px) {
      .ah-member-box {
        top: 10px;
        right: 10px;
      }
      .ah-user-btn span.ah-name {
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  `;
  document.head.appendChild(styleEl);
  
  // ========================================
  // ② 会員情報ボックスのHTML作成
  // ========================================
  const box = document.createElement('div');
  box.className = 'ah-member-box';
  box.id = 'ahMemberBox';
  document.body.appendChild(box);
  
  // ========================================
  // ③ LIFF初期化（auth.jsの関数を使う）
  // ========================================
  let user = null;
  try {
    user = await initAuth();
  } catch (e) {
    console.error('認証初期化エラー:', e);
  }
  
  // ========================================
  // ④ UI を表示
  // ========================================
  if (user) {
    renderLoggedIn(user);
  } else {
    renderLoggedOut();
  }
  
  // ========================================
  // 未ログイン時の表示
  // ========================================
  function renderLoggedOut() {
    box.innerHTML = `
      <button class="ah-login-btn" id="ahLoginBtn">ログイン</button>
    `;
    document.getElementById('ahLoginBtn').addEventListener('click', () => {
      login(); // auth.js の関数
    });
  }
  
  // ========================================
  // ログイン時の表示
  // ========================================
  function renderLoggedIn(user) {
    const name = user.displayName || 'ゲスト';
    const pic = user.pictureUrl || '';
    
    box.innerHTML = `
      <button class="ah-user-btn" id="ahUserBtn">
        ${pic ? `<img src="${pic}" alt="">` : ''}
        <span class="ah-name">${escapeHTML(name)}</span>
        <span class="ah-arrow">▼</span>
      </button>
      <div class="ah-dropdown" id="ahDropdown">
        <div class="ah-dropdown-info">
          <strong>${escapeHTML(name)}</strong><br>
          <span id="ahJineiText">陣営：未所属</span>
        </div>
        <a class="ah-dropdown-item" href="#" id="ahMypageLink">マイページ</a>
        <a class="ah-dropdown-item" href="kizuna_race.html">みんなのキズナレース</a>
        <a class="ah-dropdown-item danger" href="#" id="ahLogoutLink">ログアウト</a>
      </div>
    `;
    
    const btn = document.getElementById('ahUserBtn');
    const drop = document.getElementById('ahDropdown');
    
    // ボタンクリックでドロップダウン
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      drop.classList.toggle('show');
    });
    
    // 外側クリックで閉じる
    document.addEventListener('click', () => {
      drop.classList.remove('show');
    });
    
    // ログアウト
    document.getElementById('ahLogoutLink').addEventListener('click', (e) => {
      e.preventDefault();
      logout(); // auth.js の関数
    });
    
    // マイページ（とりあえず未実装の案内）
    document.getElementById('ahMypageLink').addEventListener('click', (e) => {
      e.preventDefault();
      alert('マイページは現在準備中です🐴');
    });
    
    // 陣営情報を取得して表示
    loadJineiInfo(user.userId);
  }
  
  // ========================================
  // 陣営情報を Firestore から取得
  // ========================================
  async function loadJineiInfo(userId) {
    try {
      const doc = await db.collection('kizuna_users').doc(userId).get();
      if (doc.exists) {
        const data = doc.data();
        const el = document.getElementById('ahJineiText');
        if (el && data.jinei) {
          el.textContent = `陣営：${data.jinei}`;
        }
      }
    } catch (e) {
      // 未所属でもエラー扱いしない
      console.log('陣営情報なし');
    }
  }
  
  // ========================================
  // HTMLエスケープ（XSS対策）
  // ========================================
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str || '');
    return div.innerHTML;
  }
  
})();

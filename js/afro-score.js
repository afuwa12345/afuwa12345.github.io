/* ============================================================
   ミニゲーム共通のスコア／ランキング
   使い方（ゲーム側）:
     AfroScore.setup({ game:'gate', title:'ゲート発走', hash:'ゲート発走',
                       unit:'ms', lower:true, grades:[...], onRetry:fn });
     AfroScore.finish(score);      // 結果オーバーレイを出す
   ページに #gResult（オーバーレイの器）が必要。中身はこのJSが作る。
   ============================================================ */
(function () {
  var CFG = null;
  var URL_ = window.AFRO_RANK_URL || '';
  var rankCache = null;

  function key(suffix) { return 'afro.' + CFG.game + '.' + suffix; }

  function getBest() {
    var v = localStorage.getItem(key('best'));
    return v === null ? null : Number(v);
  }
  function setBest(v) { localStorage.setItem(key('best'), String(v)); }

  /* a は b より良い記録か */
  function better(a, b) {
    if (b === null) return true;
    return CFG.lower ? a < b : a > b;
  }

  function fmt(v) {
    if (CFG.format) return CFG.format(v);
    return String(v) + (CFG.unit || '');
  }

  /* grades は良い順に並べた [{ v:しきい値, name:'称号' }] */
  function grade(v) {
    for (var i = 0; i < CFG.grades.length; i++) {
      var g = CFG.grades[i];
      if (CFG.lower ? v <= g.v : v >= g.v) return g.name;
    }
    return CFG.grades[CFG.grades.length - 1].name;
  }

  function getName()  { return localStorage.getItem('afro.name')  || ''; }
  function getInsta() { return localStorage.getItem('afro.insta') || ''; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c];
    });
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- オンラインランキング ---------- */
  function fetchRank(force) {
    if (!URL_) return Promise.reject(new Error('offline'));
    if (rankCache && !force) return Promise.resolve(rankCache);
    return fetch(URL_ + '?game=' + encodeURIComponent(CFG.game))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.ok || !Array.isArray(d.ranking)) throw new Error('bad response');
        rankCache = d.ranking;
        return rankCache;
      });
  }

  function postRank(score, name, insta) {
    if (!URL_) return Promise.resolve(false);
    /* CORS回避のため Content-Type を付けずテキストとして送る（クイズと同じ作り） */
    return fetch(URL_, {
      method: 'POST',
      body: JSON.stringify({
        game: CFG.game, name: name, insta: insta,
        score: score, lower: !!CFG.lower, date: Date.now()
      })
    }).then(function () { rankCache = null; return true; })
      .catch(function () { return false; });
  }

  /* ---------- 結果オーバーレイ ---------- */
  function shareUrl(score) {
    var t = CFG.title + ' で ' + fmt(score) + '（' + grade(score) + '）でした！\n#アフロホース #' + CFG.hash + '\n';
    return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(t) +
           '&url=' + encodeURIComponent('https://afro-horse.com/game/' + CFG.game + '.html');
  }

  function finish(score) {
    var prev = getBest();
    var isBest = better(score, prev);
    if (isBest) setBest(score);

    var box = document.getElementById('gResult');
    box.innerHTML = '';

    var newRec = isBest && prev !== null;
    var card = el('div', 'gr-card' + (newRec ? ' rec' : ''));
    card.appendChild(el('div', 'gr-eyebrow', newRec ? 'NEW RECORD' : 'RESULT'));
    card.appendChild(el('div', 'gr-score', esc(fmt(score))));
    card.appendChild(el('div', 'gr-grade', esc(grade(score))));
    card.appendChild(el('p', 'gr-best',
      '自己ベスト <b>' + esc(fmt(getBest())) + '</b>' + (newRec ? '　更新！' : '')));

    if (window.Sfx) {
      Sfx.bgmStop();                  /* 結果の音をはっきり聞かせるため曲は止める */
      if (newRec) Sfx.record(); else Sfx.over();
    }

    var acts = el('div', 'gr-acts');

    var again = el('button', 'gr-btn primary', 'もう一回');
    again.type = 'button';
    again.onclick = function () { box.classList.remove('on'); CFG.onRetry(); };
    acts.appendChild(again);

    if (URL_) {
      var reg = el('button', 'gr-btn', 'ランキングに登録');
      reg.type = 'button';
      reg.onclick = function () { openRegister(score, card); };
      acts.appendChild(reg);
    }

    var share = el('a', 'gr-btn', 'X でシェア');
    share.href = shareUrl(score);
    share.target = '_blank';
    share.rel = 'noopener';
    acts.appendChild(share);

    card.appendChild(acts);

    var back = el('a', 'gr-back', '&larr; ゲーム一覧にもどる');
    back.href = '../game.html';
    card.appendChild(back);

    box.appendChild(card);
    box.classList.add('on');

    if (URL_) showRank(card, score);

    var slot = document.getElementById('gBest');
    if (slot) slot.textContent = fmt(getBest());
  }

  function openRegister(score, card) {
    var old = card.querySelector('.gr-form');
    if (old) { old.scrollIntoView({ block: 'nearest' }); return; }

    var f = el('div', 'gr-form');
    f.innerHTML =
      '<label>なまえ<input type="text" id="grName" maxlength="12" placeholder="アフワ" value="' + esc(getName()) + '"></label>' +
      '<label>Instagram（任意）<input type="text" id="grInsta" maxlength="30" placeholder="ahuroma9" value="' + esc(getInsta()) + '"></label>' +
      '<button type="button" class="gr-btn primary" id="grSend">送信する</button>' +
      '<p class="gr-note">なまえ入りで1週間、Instagram も入れると1ヶ月ランキングに残ります</p>';
    card.appendChild(f);

    f.querySelector('#grSend').onclick = function () {
      var btn = this;
      var n  = f.querySelector('#grName').value.trim() || 'ななし';
      var ig = f.querySelector('#grInsta').value.trim().replace(/^@/, '');
      localStorage.setItem('afro.name', n);
      localStorage.setItem('afro.insta', ig);
      btn.disabled = true;
      btn.textContent = '送信中...';
      postRank(score, n, ig).then(function (ok) {
        btn.textContent = ok ? '登録しました' : '送信できませんでした';
        if (ok) showRank(card, score, true);
      });
    };
  }

  function showRank(card, mine, force) {
    var wrap = card.querySelector('.gr-rank');
    if (!wrap) {
      wrap = el('div', 'gr-rank', '<div class="gr-rank-t">RANKING</div><ol></ol>');
      card.appendChild(wrap);
    }
    var ol = wrap.querySelector('ol');
    ol.innerHTML = '<li class="gr-loading">読み込み中...</li>';
    fetchRank(force).then(function (list) {
      if (!list.length) { ol.innerHTML = '<li class="gr-loading">まだ記録がありません</li>'; return; }
      ol.innerHTML = list.slice(0, 10).map(function (r, i) {
        var me = (Number(r.score) === Number(mine) && r.name === getName()) ? ' class="is-mine"' : '';
        return '<li' + me + '><span class="gr-no">' + (i + 1) + '</span>' +
               '<span class="gr-nm">' + esc(r.name || 'ななし') + '</span>' +
               '<span class="gr-sc">' + esc(fmt(Number(r.score))) + '</span></li>';
      }).join('');
    })['catch'](function () {
      ol.innerHTML = '<li class="gr-loading">ランキングを読み込めませんでした</li>';
    });
  }

  window.AfroScore = {
    setup: function (cfg) {
      CFG = cfg;
      if (!CFG.onRetry) CFG.onRetry = function () { location.reload(); };
      var b = getBest();
      var slot = document.getElementById('gBest');
      if (slot) slot.textContent = (b === null ? '—' : fmt(b));
      return this;
    },
    finish: finish,
    best: getBest,
    fmt: fmt,
    grade: grade,
    online: function () { return !!URL_; }
  };
})();

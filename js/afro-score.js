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
  var rankPending = null;

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

  /* ランキングは Instagram のIDで登録する。
     同じ人が何回出しても1件にまとまるし、だれの記録か見て分かる */
  function getInsta() { return localStorage.getItem('afro.insta') || ''; }

  /* @ を外して、Instagram で使える文字だけにする（英数字と . と _） */
  function cleanInsta(v) {
    return String(v || '').trim().replace(/^@+/, '')
             .replace(/[^A-Za-z0-9._]/g, '').slice(0, 30);
  }
  function okInsta(v) {
    return /^[A-Za-z0-9._]{1,30}$/.test(v) && v.charAt(0) !== '.' && v.slice(-1) !== '.';
  }

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
  /* 8秒で打ち切り、2秒あけて3回までやり直す（クイズと同じ作り）。
     Apps Script は久しぶりの1回目だけ立ち上がりが遅いことがある */
  function fetchRank(force) {
    if (!URL_) return Promise.reject(new Error('offline'));
    if (rankCache && !force) return Promise.resolve(rankCache);
    if (rankPending) return rankPending;

    var tries = 0;
    function once() {
      tries++;
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : 0;
      return fetch(URL_ + '?game=' + encodeURIComponent(CFG.game),
                   ctrl ? { signal: ctrl.signal } : {})
        .then(function (r) { clearTimeout(timer); return r.json(); })
        .then(function (d) {
          if (!d || !d.ok || !Array.isArray(d.ranking)) throw new Error('bad response');
          rankCache = d.ranking;
          return rankCache;
        })['catch'](function (e) {
          clearTimeout(timer);
          if (tries >= 3) throw e;
          return new Promise(function (ok) { setTimeout(ok, 2000); }).then(once);
        });
    }

    rankPending = once().then(
      function (v) { rankPending = null; return v; },
      function (e) { rankPending = null; throw e; }
    );
    return rankPending;
  }

  function postRank(score, insta) {
    if (!URL_) return Promise.resolve(false);
    /* CORS回避のため Content-Type を付けずテキストとして送る（クイズと同じ作り） */
    return fetch(URL_, {
      method: 'POST',
      body: JSON.stringify({
        game: CFG.game, insta: insta, score: score, date: Date.now()
      })
    }).then(function (r) {
      if (!r.ok) return false;
      /* 返事が読めたときは中身を見る。読めなくても（CORSで見えないなど）
         行は書けているので、成功あつかいにする（クイズと同じ考えかた） */
      return r.json().then(function (d) {
        return !(d && d.ok === false);
      }, function () { return true; });
    }).then(function (ok) {
      if (ok) rankCache = null;
      return ok;
    })['catch'](function () { return false; });
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
      '<label>Instagram ID<input type="text" id="grInsta" maxlength="30" ' +
        'placeholder="ahuroma9" autocapitalize="off" autocorrect="off" spellcheck="false" ' +
        'value="' + esc(getInsta()) + '"></label>' +
      '<button type="button" class="gr-btn primary" id="grSend">登録する</button>' +
      '<p class="gr-note" id="grMsg">@ は要りません。ランキングには <b>@ID</b> で出ます。<br>' +
      '同じIDで出しなおすと、いちばん良い記録だけ残ります。</p>';
    card.appendChild(f);

    var msg = f.querySelector('#grMsg');
    var inp = f.querySelector('#grInsta');
    var btn = f.querySelector('#grSend');

    function send() {
      var ig = cleanInsta(inp.value);
      inp.value = ig;
      if (!okInsta(ig)) {
        msg.textContent = 'Instagram の ID を入れてください（英数字・ピリオド・アンダーバー）';
        inp.focus();
        return;
      }
      localStorage.setItem('afro.insta', ig);
      btn.disabled = true;
      btn.textContent = '送信中...';
      postRank(score, ig).then(function (ok) {
        if (ok) {
          btn.textContent = '登録しました';
          msg.textContent = '@' + ig + ' で登録しました';
          showRank(card, score, true);
        } else {
          btn.textContent = 'もう一度';
          btn.disabled = false;
          msg.textContent = '送信できませんでした。少し待ってからもう一度ためしてください';
        }
      });
    }

    btn.onclick = send;
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    inp.focus();
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
      var my = getInsta().toLowerCase();
      ol.innerHTML = list.slice(0, 10).map(function (r, i) {
        var ig = String(r.insta || '');
        var me = (my && ig.toLowerCase() === my) ? ' class="is-mine"' : '';
        return '<li' + me + '><span class="gr-no">' + (i + 1) + '</span>' +
               '<a class="gr-nm" href="https://www.instagram.com/' + encodeURIComponent(ig) + '/" ' +
               'target="_blank" rel="noopener">@' + esc(ig) + '</a>' +
               '<span class="gr-sc">' + esc(fmt(Number(r.score))) + '</span></li>';
      }).join('');
    })['catch'](function () {
      ol.innerHTML = '<li class="gr-loading">ランキングを読み込めませんでした</li>';
    });
  }


  /* ---------- タイトル画面のランキング ----------
     いまの1位を出して、押すと上位10人が見られるようにする。
     つなぎ先が無いときは何も足さない。取れなかったときは
     スタンプだけ引っこめて、ボタンはそのまま（押せば読み直す） */
  function titleRank() {
    var title = document.getElementById('scTitle');
    if (!title || !URL_) return;

    var stamp = el('div', 'at-top', '<span>1位</span><b>—</b>');
    var best = title.querySelector('.at-best');
    if (best && best.parentNode) best.parentNode.insertBefore(stamp, best.nextSibling);
    else title.appendChild(stamp);

    var btn = el('button', 'abtn ghost', 'ランキング');
    btn.type = 'button';
    var how = document.getElementById('howBtn');
    if (how && how.parentNode) how.parentNode.insertBefore(btn, how);
    else title.appendChild(btn);
    btn.onclick = function () { openRankPop(); };

    fetchRank().then(function (list) {
      if (!list.length) {
        stamp.classList.add('none');
        stamp.innerHTML = '<span>まだ記録なし</span>';
        return;
      }
      var top = list[0];
      var me = getInsta().toLowerCase();
      if (me && String(top.insta).toLowerCase() === me) stamp.classList.add('mine');
      stamp.innerHTML = '<span>1位</span>@' + esc(top.insta) +
                        '<b>' + esc(fmt(Number(top.score))) + '</b>';
    })['catch'](function () { stamp.remove(); });
  }

  /* 上位10人を見るだけの窓。説明の窓と同じ作り */
  function openRankPop() {
    var pop = document.getElementById('rankPop');
    if (!pop) {
      pop = el('div', 'ahow');
      pop.id = 'rankPop';
      pop.innerHTML =
        '<div class="ahow-card">' +
          '<div class="ahow-t">RANKING</div>' +
          '<div class="gr-rank"><ol></ol></div>' +
          '<button type="button" class="gr-btn primary">とじる</button>' +
        '</div>';
      document.body.appendChild(pop);
      pop.querySelector('.gr-btn').onclick = function () { pop.hidden = true; };
      pop.addEventListener('click', function (e) { if (e.target === pop) pop.hidden = true; });
    }
    pop.hidden = false;

    var ol = pop.querySelector('ol');
    ol.innerHTML = '<li class="gr-loading">読み込み中...</li>';
    fetchRank().then(function (list) {
      if (!list.length) {
        ol.innerHTML = '<li class="gr-loading">まだ記録がありません。1位をねらえる</li>';
        return;
      }
      var my = getInsta().toLowerCase();
      ol.innerHTML = list.slice(0, 10).map(function (r, i) {
        var ig = String(r.insta || '');
        var me = (my && ig.toLowerCase() === my) ? ' class="is-mine"' : '';
        return '<li' + me + '><span class="gr-no">' + (i + 1) + '</span>' +
               '<a class="gr-nm" href="https://www.instagram.com/' + encodeURIComponent(ig) + '/" ' +
               'target="_blank" rel="noopener">@' + esc(ig) + '</a>' +
               '<span class="gr-sc">' + esc(fmt(Number(r.score))) + '</span></li>';
      }).join('');
    })['catch'](function () {
      ol.innerHTML = '<li class="gr-loading">読み込めませんでした</li>';
    });
  }

  window.AfroScore = {
    setup: function (cfg) {
      CFG = cfg;
      if (!CFG.onRetry) CFG.onRetry = function () { location.reload(); };
      var b = getBest();
      var slot = document.getElementById('gBest');
      if (slot) slot.textContent = (b === null ? '—' : fmt(b));
      titleRank();
      return this;
    },
    finish: finish,
    best: getBest,
    fmt: fmt,
    grade: grade,
    online: function () { return !!URL_; }
  };
})();

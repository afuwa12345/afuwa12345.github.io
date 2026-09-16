/* ============================================================
   出馬表ゲート
   ページに .gate と .pane（#pName/#pEn/#pTags/#pDesc/#flipBtn）が
   あれば自動で動く。キャラを増やすときは CHARAS に足す。
   ============================================================ */
(function () {
  var CHARAS = [
    { name: 'アフワ', en: 'AFUWA',
      tags: ['主人公', '♂', 'ちょいビビりで優しい', '昼寝と競馬'],
      desc: 'アフロホースの主人公。普段はビビりだけど、競馬への情熱は誰にも負けない。心の奥にやんちゃな一面を秘めている。' },
    { name: 'ブルマ', en: 'BURUMA',
      tags: ['♀', '元気ポジティブ', 'おしゃれと友情'],
      desc: 'チームのムードメーカー。誰よりも明るくて、仲間との約束を何より大事にする。' },
    { name: 'チャフワ', en: 'CHAFUWA',
      tags: ['♂', '天真爛漫', 'みんなで遊ぶこと'],
      desc: '遊びを見つける天才。悩みごととは無縁で、気づけばみんなを巻き込んでいる。' },
    { name: 'クロフワ', en: 'KUROFUWA',
      tags: ['♂', 'クールで負けず嫌い', '筋トレ'],
      desc: '口数は少ないが芯は熱い。強さにこだわり、鍛えることをやめない努力家。' },
    { name: 'ギンマ', en: 'GINMA',
      tags: ['？', 'ニヤリ系策士', 'ひらめきと観察'],
      desc: 'いつも一歩引いて全体を見ている。何を考えているのか、本人以外は誰も知らない。' }
  ];

  var YANCHA = {
    name: 'やんちゃアフワ', en: 'YANCHA AFUWA',
    tags: ['アフワのもう一つの姿', '反骨精神MAX', '刺激と自由'],
    desc: 'アフワが限界を超えたときに現れる、もう一人の自分。ワルな見た目とは裏腹に、その行動はいつもアフワの本音を体現している。'
  };

  var board = document.getElementById('gateBoard');
  if (!board) return;

  var stalls = Array.prototype.slice.call(board.querySelectorAll('.stall'));
  if (!stalls.length) return;

  var afuwa = stalls[0];
  var pName = document.getElementById('pName');
  var pEn   = document.getElementById('pEn');
  var pTags = document.getElementById('pTags');
  var pDesc = document.getElementById('pDesc');
  var flip  = document.getElementById('flipBtn');
  var pPic  = document.getElementById('pPic');
  var pop   = document.getElementById('gPop');
  var popX  = document.getElementById('gPopX');
  var cur = -1;

  /* ポップアップ。
     ① キャラがゲートから飛んで所定の位置へ（FLY_MS）
     ② そのあと枠全体が下から出てキャラを囲う（RISE_MS）
     ③ 出きったら、飛んでいた絵をカードの中の絵に入れ替える */
  var FLY_MS = 760, RISE_MS = 360;
  var LEAD_MS = 120;   // キャラが着ききる少し前から枠を出しはじめる
  var pFly = document.getElementById('pFly');

  function openPop(fromImg) {
    if (!pop) return;
    clearTimeout(openPop._a); clearTimeout(openPop._b); clearTimeout(closePop._t);
    pop.classList.remove('closing', 'rising');
    pop.hidden = false;
    pop.classList.add('show');
    document.body.style.overflow = 'hidden';

    var from = fromImg ? fromImg.getBoundingClientRect() : null;
    if (!pFly || !pPic || !from || !from.width) { pop.classList.add('rising'); return; }

    pFly.src = pPic.getAttribute('src') || '';
    pFly.alt = '';
    pop.classList.add('flying');

    var go = function () {
      var to = pPic.getBoundingClientRect();
      if (!to.width) { pop.classList.remove('flying'); pop.classList.add('rising'); return; }
      // 飛ぶ絵を、まずゲートの位置に置く
      pFly.style.left = from.left + 'px';
      pFly.style.top = from.top + 'px';
      pFly.style.width = from.width + 'px';
      pFly.style.height = 'auto';
      var dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      var dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      var sc = to.width / from.width;
      if (pFly.animate) {
        pFly.animate(
          [{ transform: 'none' },
           { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')' }],
          { duration: FLY_MS, easing: 'cubic-bezier(.2,.9,.28,1)', fill: 'forwards' }
        );
      } else {
        pFly.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')';
      }

      // ② 着いたら枠が下から出る
      openPop._a = setTimeout(function () {
        pop.classList.remove('flying');
        pop.classList.add('rising');
      }, FLY_MS - LEAD_MS);
      // ③ 出きったら中の絵に入れ替える
      openPop._b = setTimeout(function () {
        pop.classList.remove('rising');
        if (pFly.getAnimations) pFly.getAnimations().forEach(function (x) { x.cancel(); });
        pFly.style.transform = '';
      }, FLY_MS - LEAD_MS + RISE_MS);
    };

    if (pFly.complete && pFly.naturalWidth) { go(); } else { pFly.onload = go; }
  }

  function closePop() {
    if (!pop || pop.hidden) return;
    clearTimeout(openPop._a); clearTimeout(openPop._b); clearTimeout(closePop._t);
    pop.classList.remove('flying', 'rising');
    pop.classList.add('closing');
    closePop._t = setTimeout(function () {
      pop.classList.remove('show', 'closing');
      pop.hidden = true;
      document.body.style.overflow = '';
      if (pFly) {
        if (pFly.getAnimations) pFly.getAnimations().forEach(function (x) { x.cancel(); });
        pFly.style.transform = '';
      }
    }, 320);
  }

  function paint() {
    if (cur < 0) return;
    var ura = afuwa.classList.contains('ura');
    var d = (cur === 0 && ura) ? YANCHA : CHARAS[cur];
    if (!d) return;
    pName.textContent = d.name;
    pEn.textContent   = d.en;
    pTags.innerHTML   = d.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    pDesc.textContent = d.desc;
    if (pPic) {
      var img = stalls[cur].querySelector(ura && cur === 0 ? '.back' : '.front')
             || stalls[cur].querySelector('img');
      if (img) { pPic.src = img.getAttribute('src'); pPic.alt = d.name; }
    }
    if (flip) {
      flip.hidden = (cur !== 0);
      flip.textContent = ura ? '↩ 表の顔にもどす' : '⚡ 裏の顔に切り替える';
      flip.setAttribute('aria-pressed', ura ? 'true' : 'false');
    }
  }

  function closeAll() {
    stalls.forEach(function (o) { o.classList.remove('on'); o.setAttribute('aria-pressed', 'false'); });
    board.classList.remove('open');
    cur = -1;
    closePop();
  }

  function select(i) {
    stalls.forEach(function (o) { o.classList.remove('on'); o.setAttribute('aria-pressed', 'false'); });
    stalls[i].classList.add('on');
    stalls[i].setAttribute('aria-pressed', 'true');
    board.classList.add('open');
    cur = i;
    paint();
    var img = stalls[i].querySelector('.stall-pic img:not(.back)')
           || stalls[i].querySelector('.stall-pic img');
    if (stalls[i].classList.contains('ura')) {
      img = stalls[i].querySelector('.stall-pic .back') || img;
    }
    openPop(img);
  }

  /* 閉じる操作。×ボタン・背景・Escape */
  if (popX) { popX.addEventListener('click', closeAll); }
  if (pop) {
    pop.addEventListener('click', function (e) { if (e.target === pop) closeAll(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pop && !pop.hidden) closeAll();
  });

  stalls.forEach(function (s, i) {
    s.addEventListener('click', function () {
      if (cur === i) { closeAll(); } else { select(i); }
    });
  });

  if (flip) {
    flip.addEventListener('click', function () {
      afuwa.classList.toggle('ura');
      if (cur !== 0) { select(0); } else { paint(); }
    });
  }
})();

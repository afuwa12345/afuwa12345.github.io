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

  /* ポップアップの開け閉め。
     開くとき  … 馬房にいるキャラの位置と大きさから、本来の位置へ大きくなりながら出る
     閉じるとき … 逆に、馬房へ向かって小さくなりながら戻る
     位置は開くたびに測り直して覚えておく。 */
  var popFrom = null;      // 馬房のキャラの位置

  function popFly(back, done) {
    if (!pPic || !popFrom) { if (done) done(); return; }
    var to = pPic.getBoundingClientRect();
    if (!to.width) { if (done) done(); return; }
    var dx = (popFrom.left + popFrom.width / 2) - (to.left + to.width / 2);
    var dy = (popFrom.top + popFrom.height / 2) - (to.top + to.height / 2);
    var sc = popFrom.width / to.width;
    var at = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')';

    var frames = back ? [{ transform: 'none', opacity: 1 }, { transform: at, opacity: .25 }]
                      : [{ transform: at, opacity: .25 }, { transform: 'none', opacity: 1 }];
    if (!pPic.animate) { if (done) done(); return; }
    var a = pPic.animate(frames, {
      duration: back ? 380 : 520,
      easing: back ? 'cubic-bezier(.5,0,.75,.2)' : 'cubic-bezier(.2,.9,.28,1)',
      fill: 'both'
    });
    a.onfinish = function () { if (!back) a.cancel(); if (done) done(); };
  }

  function openPop(fromImg) {
    if (!pop) return;
    popFrom = fromImg ? fromImg.getBoundingClientRect() : null;
    pop.hidden = false;
    pop.classList.remove('ready');
    pop.classList.add('show');
    document.body.style.overflow = 'hidden';

    // キャラが所定の位置に着いたら、カードの地と説明を出す
    var arrive = function () {
      clearTimeout(openPop._t);
      openPop._t = setTimeout(function () { pop.classList.add('ready'); }, 430);
    };
    if (pPic && !(pPic.complete && pPic.naturalWidth)) {
      pPic.onload = function () { popFly(false); arrive(); };
    } else {
      popFly(false); arrive();
    }
  }

  function closePop() {
    if (!pop || pop.hidden) return;
    pop.classList.remove('ready');      // 先に地と説明を消す
    popFly(true);                       // 動きは飾り。閉じる処理は待たない
    clearTimeout(openPop._t);
    clearTimeout(closePop._t);
    closePop._t = setTimeout(function () {
      pop.classList.remove('show');
      pop.hidden = true;
      document.body.style.overflow = '';
      if (pPic && pPic.getAnimations) {
        pPic.getAnimations().forEach(function (x) { x.cancel(); });
      }
    }, 340);
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

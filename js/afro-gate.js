/* ============================================================
   出馬表ゲート
   ページに .gate と .pane（#pName/#pEn/#pTags/#pDesc/#flipBtn）が
   あれば自動で動く。キャラを増やすときは CHARAS に足す。
   ============================================================ */
(function () {
  var CHARAS = [
    { name: 'アフワ', en: 'AFUWA',
      tags: ['主人公', '♂', 'ちょいビビり', '好奇心旺盛', '好き：昼寝・プリン・競馬'],
      copy: 'ちょっとビビり。好奇心には勝てない。',
      desc: '昼寝とプリンが好きな、ちょっと抜けてるアフロホースの主人公。怖がるくせに気になるものには手を出すし、「ダメ」と言いながらやっちゃうことも。本人はいつでも大まじめ。今日も仲間を巻き込んで、しょうもない大騒ぎを起こす。' },
    { name: 'ブルマ', en: 'BURUMA',
      tags: ['♀', '明るい', '勝負に目がない', '好き：みんなで騒ぐ・ギャンブル'],
      copy: '勝負の気配に、つい乗っちゃう。',
      desc: '明るく元気で、面白そうなことが大好き。仲間と騒いでいるうちに、いつの間にか自分も本気になっている。実はギャンブルに心が躍る一面も。勝負が始まると、見ているだけではいられない。' },
    { name: 'チャフワ', en: 'CHAFUWA',
      tags: ['♂', '天真爛漫', '遊び好き', '好き：楽しいこと・みんなで遊ぶ'],
      copy: '楽しそう！ それだけで参加決定。',
      desc: '遊ぶことが大好きな、天真爛漫なアフロ馬。気になることにはすぐ飛びついて、まわりも一緒に巻き込んでいく。笑ったり、むくれたり、驚いたり。小さな黒い目で、気持ちはしっかり顔に出る。' },
    { name: 'クロフワ', en: 'KUROFUWA',
      tags: ['♂', 'クール', '負けず嫌い', '好き：筋トレ・勝負'],
      copy: 'クールに決めたい、負けず嫌い。',
      desc: '鋭い目つきでちょっと近寄りがたく見えるけど、仲間と一緒に騒動へ巻き込まれることも。筋トレが好きで、負けるのは嫌い。つい力が入るその真剣さが、思わぬ笑いにつながる。' },
    { name: 'ギンマ', en: 'GINMA',
      tags: ['？', 'ひらめき上手', '悪ノリもする', '好き：観察・思いつきを試す'],
      copy: 'ツッコミ担当。たまに騒動の張本人。',
      desc: '半目でニヤリと笑う、ひらめき上手なアフロ馬。アフワのおかしな行動にはすかさずツッコむが、自分の思いつきにもなかなか自信がある。冷静そうに見えて、一緒になってアホなこともする。アフワとは遠慮なく言い合える、対等な仲間。' }
  ];

  var YANCHA =
    { name: 'やんちゃアフワ', en: 'YANCHA AFUWA',
      tags: ['アフワのもう一つの姿', '自由奔放', '反骨精神', '好き：刺激と自由'],
      copy: 'アフワの中にいる、遠慮しないほう。',
      desc: '気だるい半目とワルそうな顔が目印の、アフワのもうひとつの姿。刺激と自由が好きで、止められると余計にやりたくなる。別の馬ではなく、いつものアフワに隠れたやんちゃな一面。' };

  var board = document.getElementById('gateBoard');
  if (!board) return;

  var stalls = Array.prototype.slice.call(board.querySelectorAll('.stall'));
  if (!stalls.length) return;

  var afuwa = stalls[0];
  var pName = document.getElementById('pName');
  var pEn   = document.getElementById('pEn');
  var pTags = document.getElementById('pTags');
  var pDesc = document.getElementById('pDesc');
  var pCopy = document.getElementById('pCopy');
  var flip  = document.getElementById('flipBtn');
  var pPic  = document.getElementById('pPic');
  var pop   = document.getElementById('gPop');
  var popX  = document.getElementById('gPopX');
  var cur = -1;

  /* ポップアップ。
     ① キャラがゲートから飛んで所定の位置へ（FLY_MS）
     ② そのあと枠全体が下から出てキャラを囲う（RISE_MS）
     ③ 出きったら、飛んでいた絵をカードの中の絵に入れ替える */
  /* ポップアップ中は後ろのページを動かさない。
     overflow:hidden だけではスマホで効かないので、body ごと固定して
     閉じたら元のスクロール位置に戻す。 */
  var lockY = 0;
  function lockPage() {
    if (document.body.hasAttribute('data-locked')) return;
    lockY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var b = document.body;
    b.setAttribute('data-locked', '1');
    b.style.position = 'fixed';
    b.style.top = (-lockY) + 'px';
    b.style.left = '0';
    b.style.right = '0';
    b.style.width = '100%';
    b.style.overflow = 'hidden';
  }
  function unlockPage() {
    var b = document.body;
    if (!b.hasAttribute('data-locked')) return;
    b.removeAttribute('data-locked');
    b.style.position = '';
    b.style.top = '';
    b.style.left = '';
    b.style.right = '';
    b.style.width = '';
    b.style.overflow = '';
    // scroll-behavior:smooth が効いているとスルスル動いて見えるので、
    // 戻すあいだだけ切って、一瞬で元の位置にする
    var root = document.documentElement;
    var keep = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, lockY);
    root.style.scrollBehavior = keep;
  }

  var FLY_MS = 760, RISE_MS = 360;
  var LEAD_MS = 120;   // キャラが着ききる少し前から枠を出しはじめる
  var pFly = document.getElementById('pFly');

  function openPop(fromImg) {
    if (!pop) return;
    clearTimeout(openPop._a); clearTimeout(openPop._b); clearTimeout(closePop._t);
    pop.classList.remove('closing', 'rising');
    pop.hidden = false;
    pop.classList.add('show');
    lockPage();

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
      unlockPage();
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
    if (pCopy) pCopy.textContent = d.copy || '';
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

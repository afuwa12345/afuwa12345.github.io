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
  var cur = -1;

  function paint() {
    if (cur < 0) return;
    var ura = afuwa.classList.contains('ura');
    var d = (cur === 0 && ura) ? YANCHA : CHARAS[cur];
    if (!d) return;
    pName.textContent = d.name;
    pEn.textContent   = d.en;
    pTags.innerHTML   = d.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    pDesc.textContent = d.desc;
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
  }

  function select(i) {
    stalls.forEach(function (o) { o.classList.remove('on'); o.setAttribute('aria-pressed', 'false'); });
    stalls[i].classList.add('on');
    stalls[i].setAttribute('aria-pressed', 'true');
    board.classList.add('open');
    cur = i;
    paint();
  }

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

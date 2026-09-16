/* ============================================================
   タイトル画面の「説明」ポップアップ
   #howBtn を押すと #howPop が開く。中の「とじる」か、外側を押すと閉じる。
   ページに要素が無ければ何もしない。
   ============================================================ */
(function () {
  var btn = document.getElementById('howBtn');
  var pop = document.getElementById('howPop');
  if (!btn || !pop) return;

  var close = document.getElementById('howClose');

  function open() {
    pop.hidden = false;
    pop.classList.add('on');
    if (window.Sfx) Sfx.tap();
  }

  function shut() {
    pop.classList.remove('on');
    pop.hidden = true;
    if (window.Sfx) Sfx.tap();
  }

  btn.addEventListener('click', open);
  if (close) close.addEventListener('click', shut);

  /* カードの外側を押したら閉じる */
  pop.addEventListener('click', function (e) {
    if (e.target === pop) shut();
  });

  addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !pop.hidden) shut();
  });
})();

/* ============================================================
   タイトルのアイコン画像がまだ無いページは、文字の見出しに切り替える
   <h1 class="at-logo" data-name="アフロペア"><img ...></h1>
   ============================================================ */
(function () {
  var h = document.querySelector('.at-logo[data-name]');
  if (!h) return;
  var img = h.querySelector('img');
  if (!img) return;
  function swap() {
    var t = document.createElement('h1');
    t.className = 'at-ttl';
    t.textContent = h.getAttribute('data-name');
    if (h.parentNode) h.parentNode.replaceChild(t, h);
  }
  /* 読み込みに失敗したあとで登録される場合があるので、今の状態も見る */
  if (img.complete && !img.naturalWidth) swap();
  else img.addEventListener('error', swap);
})();

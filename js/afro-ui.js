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

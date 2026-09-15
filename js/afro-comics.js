/* ============================================================
   マンガ『アフロホース』の話数リスト

   ▼ 新しい話を足すとき
     COMICS に1行足すだけ。順番は気にしなくてOK（no の大きい順に自動で並びます）

       no    … 話数
       title … サブタイトル
       img   … サムネイル画像。images/comic/ に置く。'' なら話数の数字が出る
       url   … その回の Instagram 投稿URL（?stkn=... は付けない）

   ▼ 表示する場所
     ページに <div class="comic-grid" id="comicGrid"></div> を置くだけ。
     data-limit="2" を付けると新しい方から2件だけ表示（トップページ用）
   ============================================================ */

var IG_ACCOUNT = 'https://www.instagram.com/ahuroma9/';

var COMICS = [
  { no: 1, title: 'アフワ', img: 'images/comic/01.webp', url: 'https://www.instagram.com/p/DdNyPsslM-y/' }
];

(function () {
  // Instagram へのリンクを自動で埋める
  Array.prototype.forEach.call(document.querySelectorAll('[data-ig]'), function (a) {
    if (IG_ACCOUNT) { a.href = IG_ACCOUNT; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.style.display = 'none'; }
  });

  var grid = document.getElementById('comicGrid');
  if (!grid) return;

  if (!COMICS.length) {
    grid.innerHTML =
      '<div class="comic-empty">' +
        '<div class="comic-empty-ttl">第1話 準備中</div>' +
        '<p class="comic-empty-txt">アフワたちの日常を Instagram で連載していきます。<br>公開したらここに並びます。</p>' +
      '</div>';
    return;
  }

  var list = COMICS.slice().sort(function (a, b) { return b.no - a.no; });
  var limit = parseInt(grid.getAttribute('data-limit'), 10);
  if (limit > 0) { list = list.slice(0, limit); }

  grid.innerHTML = list.map(function (c) {
    var thumb = c.img
      ? '<img src="' + c.img + '" alt="" loading="lazy">'
      : '<span class="comic-ph">' + c.no + '</span>';
    return '<a class="comic-card" href="' + c.url + '" target="_blank" rel="noopener">' +
             '<span class="comic-thumb">' + thumb + '<span class="comic-ig">Instagram</span></span>' +
             '<span class="comic-meta">' +
               '<span class="comic-no">EP.' + c.no + '</span>' +
               '<span class="comic-title">' + c.title + '</span>' +
             '</span>' +
           '</a>';
  }).join('');
})();

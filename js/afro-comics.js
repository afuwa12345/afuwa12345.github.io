/* ============================================================
   マンガ『アフロホース』の話数リスト

   ▼ 新しい話を足すとき
     COMICS に1行足すだけ。順番は気にしなくてOK（no の大きい順に自動で並びます）

       no    … 話数
       title … サブタイトル（9文字以内なら1行に収まります）
       img   … サムネイル画像。images/comic/ に置く。'' なら話数の数字が出る
       url   … その回の Instagram 投稿URL（?stkn=... は付けない）
               空 '' にしておくと「近日公開」として並び、押せなくなります

   ▼ 表示する場所
     ページに <div class="comic-grid" id="comicGrid"></div> を置くだけ。
     21話ごとに自動でページが分かれます（?p=2 で2ページ目）
     data-limit="3" を付けるとページ送りなしで新しい方から3件だけ表示
   ============================================================ */

var IG_ACCOUNT = 'https://www.instagram.com/ahuroma9/';

var PER_PAGE = 21;   // 1ページあたりの話数（3列 × 7行）

var COMICS = [
  // url を空にしておくと「近日公開」として並びます（投稿したらURLを入れる）
  { no: 2, title: 'ギンマ、家を建てる。', img: 'images/comic/02.webp', url: '' },
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

  function card(c) {
    var thumb = c.img
      ? '<img src="' + c.img + '" alt="" loading="lazy">'
      : '<span class="comic-ph">' + c.no + '</span>';
    var meta = '<span class="comic-meta">' +
                 '<span class="comic-no">EP.' + c.no + '</span>' +
                 '<span class="comic-title">' + (c.title || '近日公開') + '</span>' +
               '</span>';
    // まだ投稿していない回はリンクにしない
    if (!c.url) {
      return '<div class="comic-card is-soon">' +
               '<span class="comic-thumb">' + thumb + '<span class="comic-next">近日公開</span></span>' +
               meta +
             '</div>';
    }
    return '<a class="comic-card" href="' + c.url + '" target="_blank" rel="noopener">' +
             '<span class="comic-thumb">' + thumb + '<span class="comic-ig">Instagram</span></span>' +
             meta +
           '</a>';
  }

  var all = COMICS.slice().sort(function (a, b) { return b.no - a.no; });

  // data-limit があるときはページ送りなしで先頭から数件だけ
  var limit = parseInt(grid.getAttribute('data-limit'), 10);
  if (limit > 0) {
    grid.innerHTML = all.slice(0, limit).map(card).join('');
    return;
  }

  var pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  var q = (location.search.match(/[?&]p=(\d+)/) || [])[1];
  var page = Math.min(Math.max(parseInt(q, 10) || 1, 1), pages);

  grid.innerHTML = all.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(card).join('');

  // 1ページに収まるならページ送りは出さない
  if (pages < 2) return;

  function link(p, label, cls) {
    if (p < 1 || p > pages) return '<span class="' + cls + ' dis">' + label + '</span>';
    if (p === page) return '<span class="on">' + label + '</span>';
    return '<a class="' + (cls || '') + '" href="?p=' + p + '">' + label + '</a>';
  }

  var html = link(page - 1, '‹', 'nav');
  for (var i = 1; i <= pages; i++) { html += link(i, String(i), ''); }
  html += link(page + 1, '›', 'nav');

  var pager = document.createElement('nav');
  pager.className = 'pager';
  pager.setAttribute('aria-label', 'ページ送り');
  pager.innerHTML = html;
  grid.parentNode.insertBefore(pager, grid.nextSibling);
})();

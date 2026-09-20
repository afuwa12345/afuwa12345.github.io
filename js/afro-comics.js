/* ============================================================
   マンガ『アフロホース』の話数リスト

   ▼ 新しい話を足すとき
     COMICS に1行足すだけ。順番は気にしなくてOK（並べ替えは自動です）

       no    … 話数
       title … サブタイトル（9文字以内なら1行に収まります）
       img   … サムネイル画像。images/comic/ に置く。'' なら話数の数字が出る
       url   … その回の Instagram 投稿URL（?stkn=... は付けない）
               空 '' にしておくと「近日公開」として並び、押せなくなります

   ▼ 表示する場所
     ページに <div class="comic-grid" id="comicGrid"></div> を置くだけ。
       ・21話ごとに自動でページ分割（?p=2 で2ページ目）
       ・「最新順 / 古い順」の切り替えボタンが自動で付く（?sort=old で古い順）
       ・data-limit="3" を付けると、ページ送りも並べ替えもなしで新しい3件だけ
   ============================================================ */

var IG_ACCOUNT = 'https://www.instagram.com/ahuroma9/';

var PER_PAGE = 21;   // 1ページあたりの話数（3列 × 7行）

var COMICS = [
  // url を空にしておくと「近日公開」として並びます（投稿したらURLを入れる）
  { no: 4, title: 'アフワ、育てる。', img: 'images/comic/04.webp', url: '' },
  { no: 3, title: 'ブルマ、落ちてくる。', img: 'images/comic/03.webp', url: 'https://www.instagram.com/p/Ddfw2UrFGJe/' },
  { no: 2, title: 'ギンマ、家を建てる。', img: 'images/comic/02.webp', url: 'https://www.instagram.com/p/DdV-BQ7FHIb/' },
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

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
    });
  }

  function card(c) {
    var thumb = c.img
      ? '<img src="' + esc(c.img) + '" alt="" loading="lazy">'
      : '<span class="comic-ph">' + c.no + '</span>';
    var meta = '<span class="comic-meta">' +
                 '<span class="comic-no">EP.' + c.no + '</span>' +
                 '<span class="comic-title">' + esc(c.title || '近日公開') + '</span>' +
               '</span>';
    // まだ投稿していない回はリンクにしない
    if (!c.url) {
      return '<div class="comic-card is-soon">' +
               '<span class="comic-thumb">' + thumb + '<span class="comic-next">近日公開</span></span>' +
               meta +
             '</div>';
    }
    return '<a class="comic-card" href="' + esc(c.url) + '" target="_blank" rel="noopener">' +
             '<span class="comic-thumb">' + thumb + '<span class="comic-ig">Instagram</span></span>' +
             meta +
           '</a>';
  }

  // data-limit があるときは、新しい方から数件だけ（並べ替え・ページ送りなし）
  var limit = parseInt(grid.getAttribute('data-limit'), 10);
  if (limit > 0) {
    var newest = COMICS.slice().sort(function (a, b) { return b.no - a.no; });
    grid.innerHTML = newest.slice(0, limit).map(card).join('');
    return;
  }

  var qs   = location.search;
  var sort = /[?&]sort=old\b/.test(qs) ? 'old' : 'new';
  var page = parseInt((qs.match(/[?&]p=(\d+)/) || [])[1], 10) || 1;

  var all = COMICS.slice().sort(function (a, b) {
    return sort === 'old' ? a.no - b.no : b.no - a.no;
  });

  var pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  page = Math.min(Math.max(page, 1), pages);

  function url(p, s) {
    var q = [];
    if (p > 1) q.push('p=' + p);
    if (s === 'old') q.push('sort=old');
    return q.length ? '?' + q.join('&') : './' + location.pathname.split('/').pop();
  }

  // ── 並べ替えの切り替え ──
  var old = document.querySelector('.sortbar');
  if (old) old.remove();
  var bar = document.createElement('div');
  bar.className = 'sortbar';
  bar.innerHTML =
    '<a class="' + (sort === 'new' ? 'on' : '') + '" href="' + url(1, 'new') + '">最新順</a>' +
    '<a class="' + (sort === 'old' ? 'on' : '') + '" href="' + url(1, 'old') + '">古い順</a>';
  grid.parentNode.insertBefore(bar, grid);

  // ── 一覧 ──
  grid.innerHTML = all.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(card).join('');

  // ── ページ送り（1ページに収まるなら出さない）──
  if (pages < 2) return;

  function link(p, label, cls) {
    if (p < 1 || p > pages) return '<span class="' + cls + ' dis">' + label + '</span>';
    if (p === page) return '<span class="on">' + label + '</span>';
    return '<a class="' + (cls || '') + '" href="' + url(p, sort) + '">' + label + '</a>';
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

/* ============================================================
   今週の記念チケット

   ▼ 新しい週を出すとき
     TICKETS のいちばん上に1つ足すだけ。並べ替えは自動です。

       race   … レース名
       en     … 英語表記（無ければ ''）
       grade  … GI / GII / GIII など
       date   … 開催日（YYYY-MM-DD）
       place  … 競馬場
       course … 距離
       no     … セブンのプリント予約番号（8文字）
       until  … 番号の期限（YYYY-MM-DD HH:MM）。過ぎると自動で「受付終了」になる
       paper  … 用紙のえらび方（コピー機で選ぶもの）
       qr     … QRの画像
       pics   … チケットの絵。2枚でも1枚でもOK

   ▼ 画像の置き場所
     images/ticket/ に入れる。名前は 日付_a.webp のようにしておくと分かりやすい。
   ============================================================ */

var TICKETS = [
  {
    race: 'エリザベス女王杯',
    en: 'QUEEN ELIZABETH II CUP',
    grade: 'GI',
    date: '2026-11-15',
    place: '京都競馬場',
    course: '芝 2200m',
    no: 'JNP38M7A',
    until: '2026-11-19 23:59',
    paper: 'フォト用紙L・カラー・2枚',
    qr: 'images/ticket/2026-11-15_qr.webp',
    pics: [
      'images/ticket/2026-11-15_a.webp',
      'images/ticket/2026-11-15_b.webp'
    ]
  }
];

(function () {
  var box = document.getElementById('tkNow');
  if (!box || typeof TICKETS === 'undefined' || !TICKETS.length) return;

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* 「2026-11-15」→「11月15日（日）」 */
  var YOUBI = ['日', '月', '火', '水', '木', '金', '土'];
  function wareki(s) {
    var p = String(s).split('-');
    if (p.length < 3) return s;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return (+p[1]) + '月' + (+p[2]) + '日（' + YOUBI[d.getDay()] + '）';
  }

  /* 期限を過ぎているか。時計がずれていても大きくは外れないよう、分まで見る */
  function over(until) {
    if (!until) return false;
    var m = String(until).match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
    if (!m) return false;
    var t = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
    return Date.now() > t.getTime();
  }

  function until(s) {
    var m = String(s).match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
    if (!m) return s;
    return (+m[2]) + '月' + (+m[3]) + '日 ' + m[4] + ':' + m[5] + ' まで';
  }

  /* 並べ替え（新しい順） */
  var list = TICKETS.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  var now = list[0];
  var done = over(now.until);

  var pics = (now.pics || []).map(function (p, i) {
    return '<a class="tk-pic" href="' + esc(p) + '" target="_blank" rel="noopener">' +
             '<img src="' + esc(p) + '" alt="' + esc(now.race) + ' の記念チケット ' + (i + 1) + '枚目">' +
           '</a>';
  }).join('');

  box.innerHTML =
    '<div class="tk-head">' +
      '<span class="tk-grade">' + esc(now.grade) + '</span>' +
      '<div>' +
        '<h2 class="tk-race">' + esc(now.race) + '</h2>' +
        (now.en ? '<p class="tk-en">' + esc(now.en) + '</p>' : '') +
      '</div>' +
    '</div>' +
    '<p class="tk-when">' + wareki(now.date) + '　' + esc(now.place) + '　' + esc(now.course) + '</p>' +
    '<div class="tk-pics">' + pics + '</div>' +
    '<div class="tk-print' + (done ? ' is-done' : '') + '">' +
      (done
        ? '<p class="tk-done">この回の受付は終わりました</p>' +
          '<p class="tk-note">つぎの開催までお待ちください。絵は上で見られます。</p>'
        : '<p class="tk-sub">セブン‐イレブンでプリントできます</p>' +
          '<div class="tk-no-row">' +
            '<span class="tk-no" id="tkNo">' + esc(now.no) + '</span>' +
            '<button type="button" class="tk-copy" id="tkCopy">番号をコピー</button>' +
          '</div>' +
          (now.qr ? '<img class="tk-qr" src="' + esc(now.qr) + '" alt="プリント予約のQRコード">' : '') +
          '<p class="tk-until">' + until(now.until) + '</p>' +
          '<p class="tk-paper">' + esc(now.paper) + '</p>'
      ) +
    '</div>';

  /* 番号をコピー */
  var btn = document.getElementById('tkCopy');
  if (btn) {
    btn.addEventListener('click', function () {
      var v = now.no;
      var ok = function () { btn.textContent = 'コピーしました'; setTimeout(function () { btn.textContent = '番号をコピー'; }, 1800); };
      var ng = function () {
        /* 新しいやり方が断られたときは、古いやり方でもう一度 */
        var ta = document.createElement('textarea');
        ta.value = v; ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(ta); ta.focus(); ta.select();
        var done2 = false;
        try { done2 = document.execCommand('copy'); } catch (e) { done2 = false; }
        document.body.removeChild(ta);
        btn.textContent = done2 ? 'コピーしました' : 'コピーできません';
        setTimeout(function () { btn.textContent = '番号をコピー'; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(v).then(ok, ng);
      } else { ng(); }
    });
  }

  /* これまでの回 */
  var past = document.getElementById('tkPast');
  if (past && list.length > 1) {
    past.innerHTML = list.slice(1).map(function (t) {
      var p = (t.pics || [])[0] || '';
      return '<div class="tk-old">' +
               (p ? '<img src="' + esc(p) + '" alt="" loading="lazy">' : '') +
               '<div><b>' + esc(t.race) + '</b><i>' + wareki(t.date) + '　' + esc(t.place) + '</i></div>' +
             '</div>';
    }).join('');
  } else if (past) {
    past.closest('section').hidden = true;
  }
})();

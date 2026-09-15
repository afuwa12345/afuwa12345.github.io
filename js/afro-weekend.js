/* ============================================================
   今週末の重賞
   race-data.js（RACE_DATA と getThisWeekendRaces / getNextWeekendRaces）
   を読み込んだうえで使う。#weekendRaces があるページで自動的に動く。
   今週末に重賞が無ければ来週末を出す。
   ============================================================ */
(function () {
  var box = document.getElementById('weekendRaces');
  if (!box) return;

  if (typeof RACE_DATA === 'undefined' || typeof getThisWeekendRaces !== 'function') {
    box.innerHTML = '<p class="races-note">重賞データを読み込めませんでした</p>';
    return;
  }

  /* 騎手役の6頭。週ごとに並びをずらして、毎週ちがう顔が出る */
  var JOCKEYS = [
    { img: 'images/jockey/afuwa.webp',    name: 'アフワ' },
    { img: 'images/jockey/yancha.webp',   name: 'やんちゃアフワ' },
    { img: 'images/jockey/buruma.webp',   name: 'ブルマ' },
    { img: 'images/jockey/chafuwa.webp',  name: 'チャフワ' },
    { img: 'images/jockey/kurofuwa.webp', name: 'クロフワ' },
    { img: 'images/jockey/ginma.webp',    name: 'ギンマ' }
  ];

  function weekNo() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 1);
    return Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7));
  }

  /* グレードから色の種類を決める */
  function gradeKind(g) {
    if (g.indexOf('J') >= 0) return 'jg';
    if (g.indexOf('Ⅰ') >= 0) return 'g1';
    if (g.indexOf('Ⅱ') >= 0) return 'g2';
    return 'g3';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c];
    });
  }

  var races = getThisWeekendRaces();
  var next = false;
  if (!races.length && typeof getNextWeekendRaces === 'function') {
    races = getNextWeekendRaces();
    next = true;
  }

  if (!races.length) {
    box.innerHTML = '<p class="races-note">直近の重賞はありません</p>';
    return;
  }

  races.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  var off = weekNo();
  var WD = ['日', '月', '火', '水', '木', '金', '土'];
  var html = '';

  if (next) html += '<p class="races-note">今週末の重賞はないので、来週末を出しています</p>';

  for (var i = 0; i < races.length; i++) {
    var r = races[i];
    var d = new Date(r.date);
    var j = JOCKEYS[(i + off) % JOCKEYS.length];
    var kind = gradeKind(r.grade);

    /* 年間スケジュール側で該当レースを開く（?race= を見て展開してくれる） */
    var href = 'schedule.html?race=' + encodeURIComponent(r.name);

    html += '<a class="race" href="' + href + '">' +
              '<div class="race-date">' + (d.getMonth() + 1) + '/' + d.getDate() +
                '<small>' + WD[d.getDay()] + '</small></div>' +
              '<img class="race-jockey" src="' + j.img + '" alt="' + esc(j.name) + '" loading="lazy">' +
              '<div class="race-body">' +
                '<div class="race-name">' + esc(r.name) + '</div>' +
                '<div class="race-meta">' + esc(r.course) + '　' + esc(r.dist) + '</div>' +
              '</div>' +
              '<span class="race-grade ' + kind + '">' + esc(r.grade) + '</span>' +
            '</a>';
  }

  box.innerHTML = html;
})();

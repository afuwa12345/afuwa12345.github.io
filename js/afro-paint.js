/* ============================================================
   アフロを塗りかえる仕組み

   アフロは緑〜青の鮮やかな色で描いてもらってある。
   その範囲の画素だけを、好きな色や柄に置きかえる。
   明るさの差はそのまま残すので、影も輪郭もくずれない。

   使うところ
     kyou.html      今日のアフロ（日付で色が決まる）
     maker.html     アフロ馬メーカー（自分で選ぶ）

   使いかた
     AfroPaint.PAL                     色と柄の一覧
     AfroPaint.skinFor(pal, w, h, seed) 一色なら文字、柄なら布を返す
     AfroPaint.paintAfro(img, skin, cv) img を塗りかえて cv に描く
   ============================================================ */
(function () {
  var PAL = [
  { id: 'shiro',  n: '白',       rank: 0, flat: '#EFEFEF', chip: '#EFEFEF' },
  { id: 'kuro',   n: '黒',       rank: 0, flat: '#3A3A3A', chip: '#3A3A3A' },
  { id: 'aka',    n: '赤',       rank: 0, flat: '#D6453F', chip: '#D6453F' },
  { id: 'ao',     n: '青',       rank: 0, flat: '#2F6FBF', chip: '#2F6FBF' },
  { id: 'ki',     n: '黄',       rank: 0, flat: '#F2C317', chip: '#F2C317' },
  { id: 'midori', n: '緑',       rank: 0, flat: '#1C9A5F', chip: '#1C9A5F' },
  { id: 'orange', n: 'オレンジ', rank: 0, flat: '#E8791E', chip: '#E8791E' },
  { id: 'pink',   n: 'ピンク',   rank: 0, flat: '#E88FB4', chip: '#E88FB4' },

  { id: 'kin',    n: '金',       rank: 1, chip: 'linear-gradient(135deg,#FFF3B0,#E8B00A 45%,#8A6410)' },
  { id: 'gin',    n: '銀',       rank: 1, chip: 'linear-gradient(135deg,#FFFFFF,#C9CDD2 45%,#6E757C)' },
  { id: 'niji',   n: '虹',       rank: 1, chip: 'linear-gradient(90deg,#E4443C,#E8A11E,#E8D51E,#2FA85E,#2F7FD6,#8C4FC4)' },

  { id: 'meisai', n: '迷彩',     rank: 2, chip: 'radial-gradient(circle at 30% 30%,#4A5A33 26%,transparent 27%),radial-gradient(circle at 70% 65%,#2F3A22 24%,transparent 25%),#77854F' },
  { id: 'kirin',  n: '麒麟柄',   rank: 2, chip: 'radial-gradient(circle at 32% 34%,#8A5A22 30%,transparent 31%),radial-gradient(circle at 72% 70%,#8A5A22 28%,transparent 29%),#E8C77A' },
  { id: 'hyou',   n: 'ヒョウ柄', rank: 2, chip: 'radial-gradient(circle at 35% 35%,#3A2410 12%,#8A5A22 13% 26%,transparent 27%),radial-gradient(circle at 70% 68%,#3A2410 12%,#8A5A22 13% 26%,transparent 27%),#E8C77A' },
  { id: 'shima',  n: 'しまうま', rank: 2, chip: 'repeating-linear-gradient(72deg,#1A1A1A 0 5px,#F4F4F4 5px 11px)' }
];

/* ===== アフロだけ塗りかえる =====
   アフロは緑〜青の鮮やかな色で描いてもらってある。
   その範囲の画素だけを、今日のラッキーカラーに置きかえる。
   明るさの差はそのまま残すので、影も輪郭もくずれない。 */
function toHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  var h = 0, sv = 0, l = (mx + mn) / 2;
  if (d) {
    sv = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? ((b - r) / d + 2) : ((r - g) / d + 4);
    h /= 6;
  }
  return [h, sv, l];
}
function hue2(p1, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p1 + (q - p1) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p1 + (q - p1) * (2 / 3 - t) * 6;
  return p1;
}
function toRgb(h, sv, l) {
  if (!sv) { var v = Math.round(l * 255); return [v, v, v]; }
  var q = l < 0.5 ? l * (1 + sv) : l + sv - l * sv;
  var p1 = 2 * l - q;
  return [Math.round(hue2(p1, q, h + 1 / 3) * 255),
          Math.round(hue2(p1, q, h) * 255),
          Math.round(hue2(p1, q, h - 1 / 3) * 255)];
}
function hexHsl(hex) {
  var n = parseInt(hex.slice(1), 16);
  return toHsl((n >> 16) & 255, (n >> 8) & 255, n & 255);
}

/* もとの絵でアフロに使われている色の範囲 */
function isAfro(r, g, b) {
  var mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx < 55) return false;                  /* 輪郭の黒は触らない */
  var sat = (mx - mn) / mx;
  if (sat < 0.34) return false;               /* 体やたてがみの薄い色は触らない */
  var d = Math.max(mx - mn, 1), h;
  if (mx === r) h = (g - b) / d;
  else if (mx === g) h = 2 + (b - r) / d;
  else h = 4 + (r - g) / d;
  h = ((h * 60) % 360 + 360) % 360;
  return h > 85 && h < 255;                   /* 緑〜青のあいだ */
}

/* ===== 柄をつくる =====
   アフロと同じ大きさの布を1枚つくり、そこに色や柄を描く。
   あとでアフロの形に切りぬいて貼る。 */
function rnd(seed) {
  var x = seed >>> 0;
  return function () {
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17;
    x ^= x << 5;  x >>>= 0;
    return x / 4294967296;
  };
}

function makeSkin(pal, w, h, seed) {
  var cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  var g = cv.getContext('2d');
  var r = rnd(seed || 1);
  var i, n, x, y, s2;

  if (pal.flat) { g.fillStyle = pal.flat; g.fillRect(0, 0, w, h); return cv; }

  if (pal.id === 'kin' || pal.id === 'gin') {
    var a = pal.id === 'kin'
      ? ['#FFF8CC', '#F2C94C', '#C9920C', '#FFF3B0', '#8A6410']
      : ['#FFFFFF', '#DCE0E4', '#9BA3AA', '#FFFFFF', '#5F666D'];
    var gr = g.createLinearGradient(0, 0, w * 0.45, h);
    gr.addColorStop(0.00, a[0]); gr.addColorStop(0.28, a[1]);
    gr.addColorStop(0.46, a[3]); gr.addColorStop(0.68, a[2]);
    gr.addColorStop(1.00, a[4]);
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    return cv;
  }

  if (pal.id === 'niji') {
    var gr2 = g.createLinearGradient(0, h, w, 0);
    var cols = ['#E4443C', '#E8871E', '#E8D51E', '#2FA85E', '#2F7FD6', '#6B4FC4', '#C44FA8'];
    for (i = 0; i < cols.length; i++) gr2.addColorStop(i / (cols.length - 1), cols[i]);
    g.fillStyle = gr2; g.fillRect(0, 0, w, h);
    return cv;
  }

  if (pal.id === 'meisai') {
    g.fillStyle = '#7C8A54'; g.fillRect(0, 0, w, h);
    var mc = ['#4E5C34', '#2E3A20', '#A6AF77'];
    for (i = 0; i < 26; i++) {
      g.fillStyle = mc[i % mc.length];
      x = r() * w; y = r() * h; s2 = (0.10 + r() * 0.16) * w;
      g.beginPath();
      for (n = 0; n < 7; n++) {
        var ang = n / 7 * Math.PI * 2;
        var rad = s2 * (0.62 + r() * 0.62);
        var px = x + Math.cos(ang) * rad, py = y + Math.sin(ang) * rad * 0.8;
        if (n === 0) g.moveTo(px, py); else g.lineTo(px, py);
      }
      g.closePath(); g.fill();
    }
    return cv;
  }

  if (pal.id === 'kirin') {
    g.fillStyle = '#F0D08C'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#8A5A22';
    var step = w / 4.6;
    for (y = -step; y < h + step; y += step) {
      for (x = -step; x < w + step; x += step) {
        var cx = x + (r() - 0.5) * step * 0.5, cy = y + (r() - 0.5) * step * 0.5;
        g.beginPath();
        for (n = 0; n < 6; n++) {
          var a2 = n / 6 * Math.PI * 2 + r() * 0.3;
          var rr = step * (0.30 + r() * 0.14);
          var qx = cx + Math.cos(a2) * rr, qy = cy + Math.sin(a2) * rr;
          if (n === 0) g.moveTo(qx, qy); else g.lineTo(qx, qy);
        }
        g.closePath(); g.fill();
      }
    }
    return cv;
  }

  if (pal.id === 'hyou') {
    g.fillStyle = '#E8C77A'; g.fillRect(0, 0, w, h);
    for (i = 0; i < 46; i++) {
      x = r() * w; y = r() * h; s2 = w * (0.045 + r() * 0.035);
      g.strokeStyle = '#8A5A22'; g.lineWidth = s2 * 0.62;
      g.beginPath(); g.arc(x, y, s2, r() * 1.2, r() * 1.2 + 4.6); g.stroke();
      g.fillStyle = '#4A2E10';
      g.beginPath(); g.arc(x + s2 * 0.1, y + s2 * 0.1, s2 * 0.42, 0, 6.3); g.fill();
    }
    return cv;
  }

  if (pal.id === 'shima') {
    g.fillStyle = '#F4F4F4'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#1F1F1F';
    var band = w / 9;
    for (i = -2; i < 14; i++) {
      g.beginPath();
      var x0 = i * band;
      g.moveTo(x0, -10);
      g.bezierCurveTo(x0 + band * 0.7, h * 0.3, x0 - band * 0.4, h * 0.7, x0 + band * 0.5, h + 10);
      g.lineTo(x0 + band * 0.5 + band * 0.45, h + 10);
      g.bezierCurveTo(x0 - band * 0.4 + band * 0.5, h * 0.7, x0 + band * 0.7 + band * 0.45, h * 0.3, x0 + band * 0.45, -10);
      g.closePath(); g.fill();
    }
    return cv;
  }

  g.fillStyle = '#888'; g.fillRect(0, 0, w, h);
  return cv;
}

function paintAfro(img, hex, cv) {
  cv.width = img.naturalWidth || img.width;
  cv.height = img.naturalHeight || img.height;
  var g = cv.getContext('2d', { willReadFrequently: true });
  g.clearRect(0, 0, cv.width, cv.height);
  g.drawImage(img, 0, 0);

  var id = g.getImageData(0, 0, cv.width, cv.height);
  var d = id.data;

  /* hex が文字なら一色、そうでなければ柄の布として受けとる */
  var skin = null, sd = null, th = null;
  if (typeof hex === 'string') {
    th = hexHsl(hex);
  } else {
    skin = hex;
    var sg = skin.getContext('2d', { willReadFrequently: true });
    sd = sg.getImageData(0, 0, skin.width, skin.height).data;
  }

  /* まず、もとのアフロの明るさの真ん中を測る */
  var sum = 0, cnt = 0, i;
  for (i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 40 && isAfro(d[i], d[i + 1], d[i + 2])) {
      sum += toHsl(d[i], d[i + 1], d[i + 2])[2];
      cnt++;
    }
  }
  if (!cnt) return cv;
  var baseL = sum / cnt;

  /* もとの明るさの差（影）を残したまま、色あいと鮮やかさを入れかえる。
     柄のときは、その画素の位置にある柄の色を使う */
  var W2 = cv.width;
  for (i = 0; i < d.length; i += 4) {
    if (d[i + 3] <= 40 || !isAfro(d[i], d[i + 1], d[i + 2])) continue;
    var l = toHsl(d[i], d[i + 1], d[i + 2])[2];
    var tgt = th;
    if (skin) {
      var px = (i / 4) % W2, py = Math.floor((i / 4) / W2);
      var sx = Math.min(skin.width - 1, Math.floor(px * skin.width / W2));
      var sy = Math.min(skin.height - 1, Math.floor(py * skin.height / cv.height));
      var si = (sy * skin.width + sx) * 4;
      tgt = toHsl(sd[si], sd[si + 1], sd[si + 2]);
    }
    var nl = Math.min(0.97, Math.max(0.05, tgt[2] + (l - baseL) * 0.85));
    var c = toRgb(tgt[0], tgt[1], nl);
    d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2];
  }
  g.putImageData(id, 0, 0);
  return cv;
}

  /* 一色なら色の文字、柄なら布（キャンバス）を返す */
  function skinFor(pal, w, h, seed) {
    return pal.flat ? pal.flat : makeSkin(pal, w, h, seed);
  }

  window.AfroPaint = {
    PAL: PAL,
    RANK_NAME: ['', 'レア', '激レア'],
    makeSkin: makeSkin,
    skinFor: skinFor,
    paintAfro: paintAfro,
    toHsl: toHsl,
    toRgb: toRgb,
    hexHsl: hexHsl,
    isAfro: isAfro
  };
})();

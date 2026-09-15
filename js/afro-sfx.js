/* ============================================================
   ミニゲームの効果音
   音声ファイルは使わず WebAudio で鳴らす（読み込み0秒・軽い）
     Sfx.tap() / good() / bad() / start() / count()
     Sfx.up()  / over() / record()
     Sfx.toggle() … ON/OFF（localStorage に記憶）
     Sfx.enabled()
   ブラウザの制限で、最初のタップまで音は出せない。
   どのイベントでもいいので一度 Sfx.unlock() を通す。
   ============================================================ */
(function () {
  var ctx = null;
  var on = localStorage.getItem('afro.sfx') !== 'off';

  function ready() {
    if (!on) return null;
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* 単音。type / 周波数 / 長さ / 音量 / 終わりの周波数 */
  function tone(type, f0, dur, vol, f1, delay) {
    var c = ready();
    if (!c) return;
    var t = c.currentTime + (delay || 0);
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }

  /* ざらっとしたノイズ（ヒットの芯に使う） */
  function noise(dur, vol, hz) {
    var c = ready();
    if (!c) return;
    var n = Math.floor(c.sampleRate * dur);
    var buf = c.createBuffer(1, n, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var src = c.createBufferSource();
    src.buffer = buf;
    var f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = hz || 1800;
    var g = c.createGain();
    g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(c.destination);
    src.start();
  }

  var Sfx = {
    unlock: function () { ready(); },

    enabled: function () { return on; },

    toggle: function () {
      on = !on;
      localStorage.setItem('afro.sfx', on ? 'on' : 'off');
      if (on) { ready(); this.tap(); }
      return on;
    },

    /* 軽いタップ */
    tap: function () { tone('square', 760, 0.05, 0.12); },

    /* 高さを指定して1音（アフロ記憶で馬ごとに音を変える） */
    note: function (hz) { tone('triangle', hz, 0.2, 0.17); },

    /* 当たり（上に跳ねる2音） */
    good: function () {
      tone('triangle', 660, 0.08, 0.2);
      tone('triangle', 990, 0.12, 0.18, 990, 0.07);
    },

    /* 外れ・減点 */
    bad: function () {
      noise(0.12, 0.18, 900);
      tone('sawtooth', 180, 0.22, 0.2, 90);
    },

    /* 叩いた感触 */
    hit: function () {
      noise(0.07, 0.24, 2600);
      tone('square', 520, 0.07, 0.16, 880);
    },

    /* スタート（3音上がる） */
    start: function () {
      tone('square', 523, 0.1, 0.18, 523, 0);
      tone('square', 659, 0.1, 0.18, 659, 0.11);
      tone('square', 880, 0.18, 0.2, 880, 0.22);
    },

    /* 秒読み */
    count: function () { tone('square', 440, 0.06, 0.1); },

    /* 段が上がった */
    up: function () {
      tone('triangle', 784, 0.09, 0.18);
      tone('triangle', 1046, 0.14, 0.16, 1046, 0.09);
    },

    /* 終了 */
    over: function () {
      tone('sawtooth', 400, 0.16, 0.16, 300, 0);
      tone('sawtooth', 300, 0.16, 0.16, 220, 0.16);
      tone('sawtooth', 220, 0.34, 0.16, 120, 0.32);
    },

    /* 自己ベスト更新 */
    record: function () {
      var n = [523, 659, 784, 1046];
      for (var i = 0; i < n.length; i++) tone('square', n[i], 0.13, 0.19, n[i], i * 0.1);
      tone('square', 1318, 0.3, 0.2, 1318, 0.42);
    }
  };

  window.Sfx = Sfx;
})();

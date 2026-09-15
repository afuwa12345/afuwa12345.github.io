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

  /* ============================================================
     BGM。音声ファイルは使わず、16歩のループを組んで鳴らす。
     曲はゲームごとに別。テンポ・音階・叩き方を変えてある。
       n … 音階の何番目か（null は休み）
       bass/lead は半音の数、kick/hat は 1 で鳴る
     ============================================================ */
  var SCALE_MIN = [0, 3, 5, 7, 10, 12, 15];      /* 短音階（ペンタ） */
  var SCALE_MAJ = [0, 2, 4, 7, 9, 12, 14];       /* 長音階（ペンタ） */

  var SONGS = {
    /* 走る。速くて前に進む感じ */
    jump: {
      bpm: 150, root: 220, scale: SCALE_MIN, wave: 'square',
      lead: [0, 2, 3, 2, 4, 3, 2, 0, 3, 4, 5, 4, 2, 3, 2, 1],
      bass: [0, null, 0, null, 3, null, 0, null, 4, null, 4, null, 2, null, 0, null],
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      hat:  [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0]
    },
    /* 空から降ってくる。軽くて跳ねる感じ */
    catch: {
      bpm: 116, root: 262, scale: SCALE_MAJ, wave: 'triangle',
      lead: [0, null, 2, 4, null, 2, 0, null, 4, null, 5, 4, null, 2, 0, null],
      bass: [0, null, null, 0, 4, null, null, 4, 2, null, null, 2, 3, null, 3, null],
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      hat:  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
    },
    /* 縁日。太鼓っぽく叩く */
    whack: {
      bpm: 132, root: 196, scale: SCALE_MIN, wave: 'sawtooth',
      lead: [0, 0, 3, null, 2, 2, 0, null, 4, 4, 3, null, 2, 0, 1, null],
      bass: [0, null, 0, 0, null, 0, null, 3, 3, null, 3, 3, null, 0, null, 0],
      kick: [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
      hat:  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
    },
    /* 星空。静かでゆったり */
    memory: {
      bpm: 84, root: 330, scale: SCALE_MAJ, wave: 'triangle',
      lead: [0, null, null, 4, null, null, 2, null, 5, null, null, 4, null, 2, null, null],
      bass: [0, null, null, null, null, null, null, null, 4, null, null, null, null, null, null, null],
      kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hat:  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    /* 発走前。息を殺して待つ感じ。心臓の音だけ */
    gate: {
      bpm: 100, root: 175, scale: SCALE_MIN, wave: 'triangle',
      lead: [0, null, null, null, null, null, null, null, 1, null, null, null, null, null, null, null],
      bass: [0, null, null, null, 0, null, null, null, 0, null, null, null, 0, null, null, null],
      kick: [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      hat:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  };

  var bgmName = null;      /* いま鳴らしている曲。ミュート解除で戻すため覚える */
  var bgmTimer = null;
  var bgmGain = null;
  var step = 0;
  var nextAt = 0;

  function semi(song, n) {
    var s = song.scale;
    var oct = Math.floor(n / s.length);
    return s[n % s.length] + oct * 12;
  }

  function hz(song, n) {
    return song.root * Math.pow(2, semi(song, n) / 12);
  }

  /* 1音を予約する。at は AudioContext の時刻 */
  function at(type, f, at_, dur, vol) {
    var c = ctx;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, at_);
    g.gain.setValueAtTime(0, at_);
    g.gain.linearRampToValueAtTime(vol, at_ + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at_ + dur);
    o.connect(g); g.connect(bgmGain);
    o.start(at_); o.stop(at_ + dur + 0.02);
  }

  function atKick(at_) {
    var c = ctx;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, at_);
    o.frequency.exponentialRampToValueAtTime(48, at_ + 0.12);
    g.gain.setValueAtTime(0.5, at_);
    g.gain.exponentialRampToValueAtTime(0.0001, at_ + 0.16);
    o.connect(g); g.connect(bgmGain);
    o.start(at_); o.stop(at_ + 0.2);
  }

  function atHat(at_) {
    var c = ctx;
    var n = Math.floor(c.sampleRate * 0.03);
    var buf = c.createBuffer(1, n, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var src = c.createBufferSource(); src.buffer = buf;
    var f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 6500;
    var g = c.createGain(); g.gain.value = 0.16;
    src.connect(f); f.connect(g); g.connect(bgmGain);
    src.start(at_);
  }

  /* 少し先まで予約しておく。止まらない音の作り方 */
  function pump() {
    if (!bgmName || !ctx) return;
    var song = SONGS[bgmName];
    var spb = 60 / song.bpm / 4;               /* 16分音符1歩の秒数 */
    while (nextAt < ctx.currentTime + 0.25) {
      var i = step % 16;
      if (song.lead[i] !== null && song.lead[i] !== undefined) {
        at(song.wave, hz(song, song.lead[i] + 7), nextAt, spb * 1.6, 0.055);
      }
      if (song.bass[i] !== null && song.bass[i] !== undefined) {
        at('triangle', hz(song, song.bass[i]) / 2, nextAt, spb * 2.4, 0.11);
      }
      if (song.kick[i]) atKick(nextAt);
      if (song.hat[i]) atHat(nextAt);
      nextAt += spb;
      step++;
    }
  }

  var Sfx = {
    unlock: function () { ready(); },

    /* BGMを鳴らす。名前は SONGS のキー（jump / catch / whack / memory / gate） */
    bgm: function (name) {
      if (!SONGS[name]) return;
      this.bgmStop();
      bgmName = name;
      var c = ready();
      if (!c) return;                 /* 音がOFFなら名前だけ覚えて鳴らさない */
      bgmGain = c.createGain();
      bgmGain.gain.value = 0.34;
      bgmGain.connect(c.destination);
      step = 0;
      nextAt = c.currentTime + 0.08;
      pump();
      bgmTimer = setInterval(pump, 60);
    },

    bgmStop: function () {
      clearInterval(bgmTimer);
      bgmTimer = null;
      if (bgmGain && ctx) {
        try {
          bgmGain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
          var g = bgmGain;
          setTimeout(function () { try { g.disconnect(); } catch (e) {} }, 400);
        } catch (e) {}
      }
      bgmGain = null;
      bgmName = null;
    },


    enabled: function () { return on; },

    toggle: function () {
      var was = bgmName;
      on = !on;
      localStorage.setItem('afro.sfx', on ? 'on' : 'off');
      if (on) {
        ready();
        this.tap();
        if (was) this.bgm(was);       /* 鳴っていた曲を戻す */
      } else {
        var keep = bgmName;
        this.bgmStop();
        bgmName = keep;               /* ONに戻したとき同じ曲を鳴らすため覚えておく */
      }
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

// ===========================================
// AFRO Horse - 2026 JRA重賞データ
// データ更新時はこのファイルだけ変えればOK
// ===========================================
const RACE_DATA = [
  // ===== 1月 =====
  { date: "2026-01-04", name: "中山金杯", grade: "GⅢ", course: "中山" },
  { date: "2026-01-04", name: "京都金杯", grade: "GⅢ", course: "京都" },
  { date: "2026-01-11", name: "フェアリーS", grade: "GⅢ", course: "中山" },
  { date: "2026-01-12", name: "シンザン記念", grade: "GⅢ", course: "京都" },
  { date: "2026-01-18", name: "京成杯", grade: "GⅢ", course: "中山" },
  { date: "2026-01-18", name: "日経新春杯", grade: "GⅡ", course: "京都" },
  { date: "2026-01-24", name: "小倉牝馬S", grade: "GⅢ", course: "小倉" },
  { date: "2026-01-25", name: "アメリカJCC", grade: "GⅡ", course: "中山" },
  { date: "2026-01-25", name: "プロキオンS", grade: "GⅡ", course: "京都" },

  // ===== 2月 =====
  { date: "2026-02-01", name: "根岸S", grade: "GⅢ", course: "東京" },
  { date: "2026-02-01", name: "シルクロードS", grade: "GⅢ", course: "京都" },
  { date: "2026-02-08", name: "東京新聞杯", grade: "GⅢ", course: "東京" },
  { date: "2026-02-08", name: "きさらぎ賞", grade: "GⅢ", course: "京都" },
  { date: "2026-02-14", name: "クイーンC", grade: "GⅢ", course: "東京" },
  { date: "2026-02-14", name: "小倉ジャンプS", grade: "J・GⅢ", course: "小倉" },
  { date: "2026-02-15", name: "共同通信杯", grade: "GⅢ", course: "東京" },
  { date: "2026-02-15", name: "京都記念", grade: "GⅡ", course: "京都" },
  { date: "2026-02-21", name: "阪急杯", grade: "GⅢ", course: "阪神" },
  { date: "2026-02-21", name: "ダイヤモンドS", grade: "GⅢ", course: "東京" },
  { date: "2026-02-22", name: "小倉大賞典", grade: "GⅢ", course: "小倉" },
  { date: "2026-02-22", name: "フェブラリーS", grade: "GⅠ", course: "東京" },
  { date: "2026-02-28", name: "オーシャンS", grade: "GⅢ", course: "中山" },

  // ===== 3月 =====
  { date: "2026-03-01", name: "中山記念", grade: "GⅡ", course: "中山" },
  { date: "2026-03-01", name: "チューリップ賞", grade: "GⅡ", course: "阪神" },
  { date: "2026-03-07", name: "中山牝馬S", grade: "GⅢ", course: "中山" },
  { date: "2026-03-08", name: "フィリーズレビュー", grade: "GⅡ", course: "阪神" },
  { date: "2026-03-15", name: "弥生賞ディープインパクト記念", grade: "GⅡ", course: "中山" },
  { date: "2026-03-15", name: "金鯱賞", grade: "GⅡ", course: "中京" },
  { date: "2026-03-15", name: "阪神スプリングジャンプ", grade: "J・GⅡ", course: "阪神" },
  { date: "2026-03-20", name: "フラワーC", grade: "GⅢ", course: "中山" },
  { date: "2026-03-22", name: "スプリングS", grade: "GⅡ", course: "中山" },
  { date: "2026-03-22", name: "阪神大賞典", grade: "GⅡ", course: "阪神" },
  { date: "2026-03-22", name: "愛知杯", grade: "GⅢ", course: "中京" },
  { date: "2026-03-22", name: "ファルコンS", grade: "GⅢ", course: "中京" },
  { date: "2026-03-28", name: "日経賞", grade: "GⅡ", course: "中山" },
  { date: "2026-03-28", name: "毎日杯", grade: "GⅢ", course: "阪神" },
  { date: "2026-03-29", name: "マーチS", grade: "GⅢ", course: "中山" },
  { date: "2026-03-29", name: "高松宮記念", grade: "GⅠ", course: "中京" },

  // ===== 4月 =====
  { date: "2026-04-04", name: "ダービー卿チャレンジT", grade: "GⅢ", course: "中山" },
  { date: "2026-04-04", name: "チャーチルダウンズC", grade: "GⅢ", course: "阪神" },
  { date: "2026-04-05", name: "大阪杯", grade: "GⅠ", course: "阪神" },
  { date: "2026-04-11", name: "ニュージーランドT", grade: "GⅡ", course: "中山" },
  { date: "2026-04-11", name: "阪神牝馬S", grade: "GⅡ", course: "阪神" },
  { date: "2026-04-12", name: "桜花賞", grade: "GⅠ", course: "阪神" },
  { date: "2026-04-18", name: "中山グランドジャンプ", grade: "J・GⅠ", course: "中山" },
  { date: "2026-04-18", name: "アンタレスS", grade: "GⅢ", course: "阪神" },
  { date: "2026-04-19", name: "皐月賞", grade: "GⅠ", course: "中山" },
  { date: "2026-04-19", name: "福島牝馬S", grade: "GⅢ", course: "福島" },
  { date: "2026-04-25", name: "青葉賞", grade: "GⅡ", course: "東京" },
  { date: "2026-04-26", name: "フローラS", grade: "GⅡ", course: "東京" },
  { date: "2026-04-26", name: "マイラーズC", grade: "GⅡ", course: "京都" },

  // ===== 5月 =====
  { date: "2026-05-02", name: "京王杯スプリングC", grade: "GⅡ", course: "東京" },
  { date: "2026-05-02", name: "ユニコーンS", grade: "GⅢ", course: "京都" },
  { date: "2026-05-03", name: "天皇賞(春)", grade: "GⅠ", course: "京都" },
  { date: "2026-05-09", name: "エプソムC", grade: "GⅢ", course: "東京" },
  { date: "2026-05-09", name: "京都新聞杯", grade: "GⅡ", course: "京都" },
  { date: "2026-05-10", name: "NHKマイルC", grade: "GⅠ", course: "東京" },
  { date: "2026-05-16", name: "京都ハイジャンプ", grade: "J・GⅡ", course: "京都" },
  { date: "2026-05-16", name: "新潟大賞典", grade: "GⅢ", course: "新潟" },
  { date: "2026-05-17", name: "ヴィクトリアマイル", grade: "GⅠ", course: "東京" },
  { date: "2026-05-23", name: "平安S", grade: "GⅢ", course: "京都" },
  { date: "2026-05-24", name: "オークス(優駿牝馬)", grade: "GⅠ", course: "東京" },
  { date: "2026-05-30", name: "葵S", grade: "GⅢ", course: "京都" },
  { date: "2026-05-31", name: "日本ダービー(東京優駿)", grade: "GⅠ", course: "東京" },
  { date: "2026-05-31", name: "目黒記念", grade: "GⅡ", course: "東京" },

  // ===== 6月 =====
  { date: "2026-06-06", name: "鳴尾記念", grade: "GⅢ", course: "阪神" },
  { date: "2026-06-07", name: "安田記念", grade: "GⅠ", course: "東京" },
  { date: "2026-06-13", name: "東京ジャンプS", grade: "J・GⅢ", course: "東京" },
  { date: "2026-06-13", name: "函館スプリントS", grade: "GⅢ", course: "函館" },
  { date: "2026-06-14", name: "宝塚記念", grade: "GⅠ", course: "阪神" },
  { date: "2026-06-21", name: "府中牝馬S", grade: "GⅢ", course: "東京" },
  { date: "2026-06-21", name: "しらさぎS", grade: "GⅢ", course: "新潟" },
  { date: "2026-06-28", name: "ラジオNIKKEI賞", grade: "GⅢ", course: "福島" },
  { date: "2026-06-28", name: "函館記念", grade: "GⅢ", course: "函館" },

  // ===== 7月 =====
  { date: "2026-07-05", name: "北九州記念", grade: "GⅢ", course: "小倉" },
  { date: "2026-07-12", name: "七夕賞", grade: "GⅢ", course: "福島" },
  { date: "2026-07-19", name: "小倉記念", grade: "GⅢ", course: "小倉" },
  { date: "2026-07-19", name: "函館2歳S", grade: "GⅢ", course: "函館" },
  { date: "2026-07-26", name: "関屋記念", grade: "GⅢ", course: "新潟" },
  { date: "2026-07-26", name: "東海S", grade: "GⅢ", course: "中京" },

  // ===== 8月 =====
  { date: "2026-08-02", name: "アイビスサマーダッシュ", grade: "GⅢ", course: "新潟" },
  { date: "2026-08-02", name: "クイーンS", grade: "GⅢ", course: "札幌" },
  { date: "2026-08-09", name: "エルムS", grade: "GⅢ", course: "札幌" },
  { date: "2026-08-10", name: "CBC賞", grade: "GⅢ", course: "中京" },
  { date: "2026-08-10", name: "レパードS", grade: "GⅢ", course: "新潟" },
  { date: "2026-08-16", name: "新潟ジャンプS", grade: "J・GⅢ", course: "新潟" },
  { date: "2026-08-16", name: "中京記念", grade: "GⅢ", course: "中京" },
  { date: "2026-08-16", name: "札幌記念", grade: "GⅡ", course: "札幌" },
  { date: "2026-08-23", name: "新潟2歳S", grade: "GⅢ", course: "新潟" },
  { date: "2026-08-23", name: "キーンランドC", grade: "GⅢ", course: "札幌" },
  { date: "2026-08-30", name: "新潟記念", grade: "GⅢ", course: "新潟" },
  { date: "2026-08-30", name: "中京2歳S", grade: "GⅢ", course: "中京" },

  // ===== 9月 =====
  { date: "2026-09-05", name: "京成杯オータムH", grade: "GⅢ", course: "中山" },
  { date: "2026-09-05", name: "札幌2歳S", grade: "GⅢ", course: "札幌" },
  { date: "2026-09-06", name: "紫苑S", grade: "GⅡ", course: "中山" },
  { date: "2026-09-06", name: "セントウルS", grade: "GⅡ", course: "阪神" },
  { date: "2026-09-13", name: "セントライト記念", grade: "GⅡ", course: "中山" },
  { date: "2026-09-13", name: "ローズS", grade: "GⅡ", course: "阪神" },
  { date: "2026-09-19", name: "チャレンジC", grade: "GⅢ", course: "中山" },
  { date: "2026-09-19", name: "阪神ジャンプS", grade: "J・GⅢ", course: "阪神" },
  { date: "2026-09-20", name: "オールカマー", grade: "GⅡ", course: "中山" },
  { date: "2026-09-21", name: "神戸新聞杯", grade: "GⅡ", course: "阪神" },
  { date: "2026-09-26", name: "シリウスS", grade: "GⅢ", course: "中京" },
  { date: "2026-09-27", name: "スプリンターズS", grade: "GⅠ", course: "中山" },

  // ===== 10月 =====
  { date: "2026-10-04", name: "毎日王冠", grade: "GⅡ", course: "東京" },
  { date: "2026-10-04", name: "京都大賞典", grade: "GⅡ", course: "京都" },
  { date: "2026-10-10", name: "サウジアラビアロイヤルC", grade: "GⅢ", course: "東京" },
  { date: "2026-10-11", name: "アイルランドT", grade: "GⅡ", course: "東京" },
  { date: "2026-10-12", name: "スワンS", grade: "GⅡ", course: "京都" },
  { date: "2026-10-17", name: "富士S", grade: "GⅡ", course: "東京" },
  { date: "2026-10-18", name: "東京ハイジャンプ", grade: "J・GⅡ", course: "東京" },
  { date: "2026-10-18", name: "秋華賞", grade: "GⅠ", course: "京都" },
  { date: "2026-10-25", name: "アルテミスS", grade: "GⅢ", course: "東京" },
  { date: "2026-10-25", name: "菊花賞", grade: "GⅠ", course: "京都" },
  { date: "2026-10-31", name: "ファンタジーS", grade: "GⅢ", course: "京都" },

  // ===== 11月 =====
  { date: "2026-11-01", name: "天皇賞(秋)", grade: "GⅠ", course: "東京" },
  { date: "2026-11-07", name: "京王杯2歳S", grade: "GⅡ", course: "東京" },
  { date: "2026-11-07", name: "京都ジャンプS", grade: "J・GⅢ", course: "京都" },
  { date: "2026-11-08", name: "アルゼンチン共和国杯", grade: "GⅡ", course: "東京" },
  { date: "2026-11-08", name: "みやこS", grade: "GⅢ", course: "京都" },
  { date: "2026-11-14", name: "武蔵野S", grade: "GⅢ", course: "東京" },
  { date: "2026-11-14", name: "デイリー杯2歳S", grade: "GⅡ", course: "京都" },
  { date: "2026-11-15", name: "エリザベス女王杯", grade: "GⅠ", course: "京都" },
  { date: "2026-11-21", name: "福島記念", grade: "GⅢ", course: "福島" },
  { date: "2026-11-22", name: "マイルチャンピオンシップ", grade: "GⅠ", course: "京都" },
  { date: "2026-11-23", name: "東京スポーツ杯2歳S", grade: "GⅡ", course: "東京" },
  { date: "2026-11-28", name: "京都2歳S", grade: "GⅢ", course: "京都" },
  { date: "2026-11-29", name: "ジャパンC", grade: "GⅠ", course: "東京" },
  { date: "2026-11-29", name: "京阪杯", grade: "GⅢ", course: "京都" },

  // ===== 12月 =====
  { date: "2026-12-05", name: "ステイヤーズS", grade: "GⅡ", course: "中山" },
  { date: "2026-12-05", name: "鳴尾記念", grade: "GⅢ", course: "阪神" },
  { date: "2026-12-06", name: "チャンピオンズC", grade: "GⅠ", course: "中京" },
  { date: "2026-12-12", name: "中日新聞杯", grade: "GⅢ", course: "中京" },
  { date: "2026-12-13", name: "カペラS", grade: "GⅢ", course: "中山" },
  { date: "2026-12-13", name: "阪神ジュベナイルフィリーズ", grade: "GⅠ", course: "阪神" },
  { date: "2026-12-19", name: "ターコイズS", grade: "GⅢ", course: "中山" },
  { date: "2026-12-20", name: "朝日杯フューチュリティS", grade: "GⅠ", course: "阪神" },
  { date: "2026-12-26", name: "中山大障害", grade: "J・GⅠ", course: "中山" },
  { date: "2026-12-26", name: "ホープフルS", grade: "GⅠ", course: "中山" },
  { date: "2026-12-26", name: "阪神C", grade: "GⅡ", course: "阪神" },
  { date: "2026-12-27", name: "有馬記念", grade: "GⅠ", course: "中山" },
];

// ===========================================
// 共通ヘルパー関数
// ===========================================

// 今日の日付を YYYY-MM-DD 形式で取得
function getToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 今週末（直近の土日）のレースを取得
function getThisWeekendRaces() {
  const today = new Date();
  const day = today.getDay(); // 0:日 1:月 ... 6:土
  
  // 今日が日曜なら今日まで、それ以外なら直近の日曜まで
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysUntilSunday);
  
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() - 1);
  
  const satStr = formatDate(saturday);
  const sunStr = formatDate(sunday);
  
  return RACE_DATA.filter(r => r.date === satStr || r.date === sunStr);
}

// 来週末のレースを取得
function getNextWeekendRaces() {
  const today = new Date();
  const day = today.getDay();
  const daysUntilNextSaturday = (6 - day + 7) % 7 || 7;
  
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilNextSaturday);
  
  // 既に土曜なら次の土曜
  if (day === 6) nextSaturday.setDate(today.getDate() + 7);
  
  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSaturday.getDate() + 1);
  
  const satStr = formatDate(nextSaturday);
  const sunStr = formatDate(nextSunday);
  
  return RACE_DATA.filter(r => r.date === satStr || r.date === sunStr);
}

// Date → "YYYY-MM-DD"
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// "YYYY-MM-DD" → "M月D日(曜)"
function formatDateJa(dateStr) {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const w = ['日','月','火','水','木','金','土'][d.getDay()];
  return `${m}月${day}日(${w})`;
}

// グレードを表示用に変換（GⅠ → G1）
function gradeShort(grade) {
  return grade.replace('Ⅰ','1').replace('Ⅱ','2').replace('Ⅲ','3');
}

// キャラ対決成績データ（自動更新）
// 最終更新: 2026/04/20 10:28

const CHARA_DATA = {
  "season": 2026,
  "bet_per_week": 2000,
  "characters": {
    "afuwa": {
      "name": "アフワ",
      "img": "images/afuwa1.png",
      "color": "#4A90E2",
      "bet": "単勝500円＋複勝1500円"
    },
    "yancha": {
      "name": "やんちゃ",
      "img": "images/afuwa5.png",
      "color": "#FF1A1A",
      "bet": "単勝2000円1点"
    },
    "buruma": {
      "name": "ブルマ",
      "img": "images/buruma1.png",
      "color": "#FF69B4",
      "bet": "ワイド3頭BOX＋単勝200円"
    },
    "chafuwa": {
      "name": "チャフワ",
      "img": "images/chafuwa1.png",
      "color": "#F5A623",
      "bet": "馬連3頭BOX＋単勝200円"
    },
    "kurofuwa": {
      "name": "クロフワ",
      "img": "images/kurofuwa1.png",
      "color": "#9B59B6",
      "bet": "三連複5頭BOX"
    },
    "ginma": {
      "name": "ギンマ",
      "img": "images/ginma1.png",
      "color": "#2ECC71",
      "bet": "馬単BOX＋三連単BOX＋単勝200円"
    }
  },
  "weekly": [
    {
      "week": 1,
      "date": "04/18・04/19",
      "results": {
        "afuwa": {
          "race": "中山 5R",
          "horse": "マーゴットブロー",
          "result": "○",
          "payout": 5300,
          "chaku": 1
        },
        "yancha": {
          "race": "福島 1R",
          "horse": "スプリングドリーム",
          "result": "×",
          "payout": 0,
          "chaku": 9
        },
        "buruma": {
          "race": "阪神 2R",
          "horse": "ヤマヤロード",
          "result": "×",
          "payout": 0,
          "chaku": 12
        },
        "chafuwa": {
          "race": "中山 1R",
          "horse": "アドミ",
          "result": "×",
          "payout": 0,
          "chaku": 3
        },
        "kurofuwa": {
          "race": "阪神 8R",
          "horse": "レヴァンテシチー",
          "result": "×",
          "payout": 0,
          "chaku": 1
        },
        "ginma": {
          "race": "中山 11R",
          "horse": "バステール",
          "result": "×",
          "payout": 0,
          "chaku": 11
        }
      }
    }
  ]
};

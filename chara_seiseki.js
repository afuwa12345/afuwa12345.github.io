// キャラ対決成績データ（自動更新）
// 最終更新: 2026/04/27 19:59

const CHARA_DATA = {
  "season": 2026,
  "bet_per_week": 2000,
  "characters": {
    "afuwa": {
      "name": "アフワ",
      "img": "images/afuwa.png",
      "color": "#4A90E2",
      "bet": "単勝500円＋複勝1500円"
    },
    "yancha": {
      "name": "やんちゃ",
      "img": "images/yanchaahuwa.png",
      "color": "#FF1A1A",
      "bet": "単勝2000円1点"
    },
    "buruma": {
      "name": "ブルマ",
      "img": "images/buruma.png",
      "color": "#FF69B4",
      "bet": "ワイド3頭BOX＋単勝200円"
    },
    "chafuwa": {
      "name": "チャフワ",
      "img": "images/chahuwa.png",
      "color": "#F5A623",
      "bet": "馬連3頭BOX＋単勝200円"
    },
    "kurofuwa": {
      "name": "クロフワ",
      "img": "images/kurohuwa.png",
      "color": "#9B59B6",
      "bet": "三連複5頭BOX"
    },
    "ginma": {
      "name": "ギンマ",
      "img": "images/ginma.png",
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
          "date": "04/19",
          "horse": "マーゴットブロー",
          "aite": [],
          "bet": "単勝500円＋複勝1500円",
          "result": "○",
          "payout": 5300,
          "chaku": 1
        },
        "yancha": {
          "race": "福島 1R",
          "date": "04/19",
          "horse": "スプリングドリーム",
          "aite": [],
          "bet": "単勝2000円1点",
          "result": "×",
          "payout": 0,
          "chaku": 9
        },
        "buruma": {
          "race": "阪神 2R",
          "date": "04/19",
          "horse": "ヤマヤロード",
          "aite": [
            "ルクスキャンディ",
            "カトマンズゴールド"
          ],
          "bet": "ワイド3頭BOX＋単勝200円",
          "result": "×",
          "payout": 0,
          "chaku": 12
        },
        "chafuwa": {
          "race": "中山 1R",
          "date": "04/18",
          "horse": "アドミ",
          "aite": [
            "セントリアン",
            "クアロアランチ"
          ],
          "bet": "馬連3頭BOX＋単勝200円",
          "result": "×",
          "payout": 0,
          "chaku": 3
        },
        "kurofuwa": {
          "race": "阪神 8R",
          "date": "04/19",
          "horse": "レヴァンテシチー",
          "aite": [
            "オリジナルファイン",
            "メイショウオグマ",
            "レッドイステル",
            "メイショウカスガイ"
          ],
          "bet": "三連複5頭BOX",
          "result": "×",
          "payout": 0,
          "chaku": 1
        },
        "ginma": {
          "race": "中山 11R",
          "date": "04/19",
          "horse": "バステール",
          "aite": [
            "アドマイヤクワッズ",
            "ゾロアストロ"
          ],
          "bet": "馬単BOX＋三連単BOX＋単勝200円",
          "result": "×",
          "payout": 0,
          "chaku": 11
        }
      }
    },
    {
      "week": 2,
      "date": "04/25・04/26",
      "results": {
        "afuwa": {
          "race": "東京 6R",
          "date": "04/26",
          "horse": "サレジオ",
          "aite": [],
          "bet": "単勝500円＋複勝1500円",
          "result": "○",
          "payout": 1650,
          "chaku": 3
        },
        "yancha": {
          "race": "東京 7R",
          "date": "04/25",
          "horse": "クラリネットソナタ",
          "aite": [],
          "bet": "単勝2000円1点",
          "result": "×",
          "payout": 0,
          "chaku": 2
        },
        "buruma": {
          "race": "東京 11R",
          "date": "04/25",
          "horse": "ミッキーファルコン",
          "aite": [
            "ブラックオリンピア",
            "ゴーイントゥスカイ"
          ],
          "bet": "ワイド3頭BOX＋単勝200円",
          "result": "○",
          "payout": 2130,
          "chaku": 5
        },
        "chafuwa": {
          "race": "東京 11R",
          "date": "04/25",
          "horse": "ブラックオリンピア",
          "aite": [
            "ゴーイントゥスカイ",
            "テルヒコウ"
          ],
          "bet": "馬連3頭BOX＋単勝200円",
          "result": "×",
          "payout": 0,
          "chaku": 3
        },
        "kurofuwa": {
          "race": "東京 9R",
          "date": "04/25",
          "horse": "ダノンミッション",
          "aite": [
            "ノビリシマビジョン",
            "ビーオンザカバー",
            "レベルスルール",
            "アルゲンテウス"
          ],
          "bet": "三連複5頭BOX",
          "result": "○",
          "payout": 760,
          "chaku": 1
        },
        "ginma": {
          "race": "福島 2R",
          "date": "04/25",
          "horse": "セイウンプーパ",
          "aite": [
            "フクオトコ",
            "シルバーアックス"
          ],
          "bet": "馬単BOX＋三連単BOX＋単勝200円",
          "result": "×",
          "payout": 0,
          "chaku": 4
        }
      }
    }
  ]
};

// キャラ対決成績データ（自動更新）
// 最終更新: 2026/05/18 20:01

const CHARA_DATA = {
  "season": 2026,
  "bet_per_week": 2000,
  "characters": {
    "afuwa": {
      "name": "アフワ",
      "img": "images/afuwa.png",
      "color": "#4A90E2",
      "bet": "単勝500 + 複勝1500"
    },
    "yancha": {
      "name": "やんちゃ",
      "img": "images/yanchaahuwa.png",
      "color": "#FF1A1A",
      "bet": "単勝2000×1点"
    },
    "buruma": {
      "name": "ブルマ",
      "img": "images/buruma.png",
      "color": "#FF69B4",
      "bet": "ワイド3頭BOX(3点×600) + 本命単勝200"
    },
    "chafuwa": {
      "name": "チャフワ",
      "img": "images/chahuwa.png",
      "color": "#F5A623",
      "bet": "馬連3頭BOX(3点×600) + 本命単勝200"
    },
    "kurofuwa": {
      "name": "クロフワ",
      "img": "images/kurohuwa.png",
      "color": "#9B59B6",
      "bet": "三連複5頭BOX(10点×200)"
    },
    "ginma": {
      "name": "ギンマ",
      "img": "images/ginma.png",
      "color": "#2ECC71",
      "bet": "馬単3頭BOX(6点×200) + 三連単3頭BOX(6点×100) + 本命単200"
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
          "bet": "単勝500 + 複勝1500",
          "result": "○",
          "payout": 5300,
          "chaku": 1
        },
        "yancha": {
          "race": "福島 1R",
          "date": "04/19",
          "horse": "スプリングドリーム",
          "aite": [],
          "bet": "単勝2000×1点",
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
          "bet": "ワイド3頭BOX(3点×600) + 本命単勝200",
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
          "bet": "馬連3頭BOX(3点×600) + 本命単勝200",
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
          "bet": "三連複5頭BOX(10点×200)",
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
          "bet": "馬単3頭BOX(6点×200) + 三連単3頭BOX(6点×100) + 本命単200",
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
          "bet": "単勝500 + 複勝1500",
          "result": "○",
          "payout": 1650,
          "chaku": 3
        },
        "yancha": {
          "race": "東京 7R",
          "date": "04/25",
          "horse": "クラリネットソナタ",
          "aite": [],
          "bet": "単勝2000×1点",
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
          "bet": "ワイド3頭BOX(3点×600) + 本命単勝200",
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
          "bet": "馬連3頭BOX(3点×600) + 本命単勝200",
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
          "bet": "三連複5頭BOX(10点×200)",
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
          "bet": "馬単3頭BOX(6点×200) + 三連単3頭BOX(6点×100) + 本命単200",
          "result": "×",
          "payout": 0,
          "chaku": 4
        }
      }
    },
    {
      "week": 3,
      "date": "05/02・05/03",
      "results": {
        "afuwa": {
          "race": "東京 6R",
          "date": "05/02",
          "horse": "ノクターン",
          "aite": [],
          "bet": "単勝500 + 複勝1500",
          "result": "○",
          "payout": 2450,
          "chaku": 1
        },
        "yancha": {
          "race": "京都 9R",
          "date": "05/02",
          "horse": "ロングトールサリー",
          "aite": [],
          "bet": "単勝2000×1点",
          "result": "×",
          "payout": 0,
          "chaku": 7
        },
        "buruma": {
          "race": "京都 5R",
          "date": "05/02",
          "horse": "ロードスタニング",
          "aite": [
            "ダノンワンダー",
            "シャイニングスター"
          ],
          "bet": "ワイド3頭BOX(3点×600) + 本命単勝200",
          "result": "○",
          "payout": 1440,
          "chaku": 1
        },
        "chafuwa": {
          "race": "京都 5R",
          "date": "05/02",
          "horse": "ロードスタニング",
          "aite": [
            "ダノンワンダー",
            "シャイニングスター"
          ],
          "bet": "馬連3頭BOX(3点×600) + 本命単勝200",
          "result": "○",
          "payout": 2100,
          "chaku": 1
        },
        "kurofuwa": {
          "race": "京都 9R",
          "date": "05/02",
          "horse": "ロングトールサリー",
          "aite": [
            "エイズルブルーム",
            "レイクラシック",
            "クリスレジーナ",
            "ララオウ"
          ],
          "bet": "三連複5頭BOX(10点×200)",
          "result": "×",
          "payout": 0,
          "chaku": 7
        },
        "ginma": {
          "race": "京都 3R",
          "date": "05/02",
          "horse": "カモメガトンダ",
          "aite": [
            "セコンドトゥベスト",
            "オーロラボレアリス"
          ],
          "bet": "馬単3頭BOX(6点×200) + 三連単3頭BOX(6点×100) + 本命単200",
          "result": "○",
          "payout": 216120,
          "chaku": 1
        }
      }
    },
    {
      "week": 4,
      "date": "05/09・05/10",
      "results": {
        "afuwa": {
          "race": "京都 5R",
          "date": "05/09",
          "horse": "ダークマルス",
          "aite": [
            "ルートサーティーン",
            "コルテオソレイユ"
          ],
          "bet": "単勝500 + 複勝1500",
          "result": "○",
          "payout": 1650,
          "chaku": 2
        },
        "yancha": {
          "race": "京都 5R",
          "date": "05/10",
          "horse": "フレアオブセンス",
          "aite": [
            "アトレッタ",
            "ベルアズーロ"
          ],
          "bet": "単勝2000×1点",
          "result": "×",
          "payout": 0,
          "chaku": 2
        },
        "buruma": {
          "race": "京都 4R",
          "date": "05/09",
          "horse": "プレスバーン",
          "aite": [
            "ルクスキャンディ",
            "カトマンズゴールド"
          ],
          "bet": "ワイド3頭BOX(3点×600) + 本命単勝200",
          "result": "×",
          "payout": 0,
          "chaku": 3
        },
        "chafuwa": {
          "race": "京都 10R",
          "date": "05/09",
          "horse": "アオイタケル",
          "aite": [
            "クラヴァンス",
            "メディテラニアン"
          ],
          "bet": "馬連3頭BOX(3点×600) + 本命単勝200",
          "result": "×",
          "payout": 0,
          "chaku": 3
        },
        "kurofuwa": {
          "race": "京都 7R",
          "date": "05/10",
          "horse": "ショコラプリン",
          "aite": [
            "シュネルアンジュ",
            "ベルソテイラ",
            "マヴィ",
            "ミティリーニ"
          ],
          "bet": "三連複5頭BOX(10点×200)",
          "result": "×",
          "payout": 0,
          "chaku": 3
        },
        "ginma": {
          "race": "新潟 8R",
          "date": "05/09",
          "horse": "オブシディアーナ",
          "aite": [
            "カルネヴァーレ",
            "ベルフィーヌ"
          ],
          "bet": "馬単3頭BOX(6点×200) + 三連単3頭BOX(6点×100) + 本命単200",
          "result": "×",
          "payout": 0,
          "chaku": 2
        }
      }
    },
    {
      "week": 5,
      "date": "05/16・05/17",
      "results": {
        "afuwa": {
          "race": "新潟 10R",
          "date": "05/16",
          "horse": "ディアウス",
          "aite": [
            "スマートスピア",
            "アークドール"
          ],
          "bet": "単勝500 + 複勝1500",
          "result": "○",
          "payout": 6600,
          "chaku": 2
        },
        "yancha": {
          "race": "新潟 7R",
          "date": "05/16",
          "horse": "ペイシャマリーン",
          "aite": [
            "シャンハイナイト",
            "アルバニー"
          ],
          "bet": "単勝2000×1点",
          "result": "×",
          "payout": 0,
          "chaku": 13
        },
        "buruma": {
          "race": "新潟 5R",
          "date": "05/17",
          "horse": "ウインポーシャ",
          "aite": [
            "レゼルフォート",
            "ウインターブレス"
          ],
          "bet": "ワイド3頭BOX(3点×600) + 本命単勝200",
          "result": "×",
          "payout": 0,
          "chaku": 16
        },
        "chafuwa": {
          "race": "京都 12R",
          "date": "05/16",
          "horse": "ライトニングゼウス",
          "aite": [
            "ドンパッショーネ",
            "メイショウドライブ"
          ],
          "bet": "馬連3頭BOX(3点×600) + 本命単勝200",
          "result": "×",
          "payout": 459,
          "chaku": 1
        },
        "kurofuwa": {
          "race": "新潟 8R",
          "date": "05/16",
          "horse": "ダノンヴェステル",
          "aite": [
            "ソナタン",
            "ファルコンミノル",
            "ボーヌロマネ",
            "ザラタン"
          ],
          "bet": "三連複5頭BOX(10点×200)",
          "result": "○",
          "payout": 1080,
          "chaku": 3
        },
        "ginma": {
          "race": "東京 11R",
          "date": "05/16",
          "horse": "キングスコール",
          "aite": [
            "ハーツコンチェルト",
            "バレンタインガール"
          ],
          "bet": "馬単3頭BOX(6点×200) + 三連単3頭BOX(6点×100) + 本命単200",
          "result": "×",
          "payout": 2980,
          "chaku": 1
        }
      }
    }
  ]
};

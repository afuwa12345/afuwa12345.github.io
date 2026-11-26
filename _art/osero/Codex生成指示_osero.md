# Codex 一括生成指示：ゲーム「アフロオセロ」

下の「生成リスト」の4枚を、順番にすべて生成すること。画像生成は内蔵 image_gen を使い、1回の生成で1枚ずつ作る。
パスはすべて `00_サイト本体/` からの相対パス。

- 共通ブロック（COMMON / CHARACTERS / COMMON_BG / COMMON_ICON）と参照画像は `_art/COMMON.md` のものを使う。
- **`_art/ref/AFRO_MASTER.png` を必ず添付してから描くこと。** あれがキャラのデザインの正解で、
  文章の説明より優先。添付せずに描くと、別のキャラになる。
- 保存先は `_art/osero/sheets/`（フォルダがなければ作る）。
- 上書きしない。毎回できあがりを確かめて、ずれていたら最大2回まで作り直す。
- **全部終わったら、保存したファイルのフルパスを一覧で報告すること。**

**このゲームはオセロ。8×8の盤に駒を置いて、はさんだ相手の駒をひっくり返す。**
**アフワ（茶）が自分、ブルマ（青）が相手。駒がひっくり返る瞬間がこのゲームの見せ場なので、**
**「真上から」だけでなく「傾いた途中」も描いてもらうのが一番大事。**

## 0. いちばん大事な作りの決まり

スマホで駒1つが **38px くらい**にしかならない。細かい描き込みは全部つぶれる。

- 線は太く、色は少なく、形ははっきり。影のグラデーションは要らない
- 顔のパーツ（目・鼻・口）は大きめに。小さい模様やハイライトは入れない
- 4つのセルで**駒の直径を完全に同じ**にすること。揃っていないと、ひっくり返るときに大きさが跳ねる

## 1. 生成リスト

| 順 | 保存先 | 中身 | 参照画像 |
|---|---|---|---|
| 1 | `_art/osero/sheets/OSERO_PIECE.png` | 駒の4コマ（2x2） | MASTER, FACE |
| 2 | `_art/osero/sheets/OSERO_BOARD.png` | 盤の下地1枚（マス目なし） | ICON |
| 3 | `_art/osero/sheets/OSERO_BG.png` | タイトル画面の背景1枚 | BG, MASTER |
| 4 | `_art/osero/sheets/OSERO_ICON.png` | アイコン1枚 | ICON, MASTER |

1枚目 … COMMON ＋ CHARACTERS(ALL + AFUWA + BURUMA) ＋ 下の PIECES
2枚目 … 下の BOARD（キャラは出てこない）
3枚目 … COMMON_BG ＋ CHARACTERS(ALL + AFUWA + BURUMA) ＋ 下の BG
4枚目 … COMMON_ICON ＋ 下の ICON

## 2. 個別指示

### 1枚目 OSERO_PIECE　駒の4コマ（2x2・透過）

**全身ではなく、駒**を描く。丸いコマの表に、キャラの顔が描いてある see-through ではない板。
上2つが「真上から見た駒」、下2つが「ひっくり返っている途中の駒」。
この4枚で `表 → 傾き → 傾き → 裏` とつないで、ひっくり返るところを動かす。

```text
Draw four GAME PIECES — round flat playing discs, like Othello/Reversi stones — NOT characters standing on the board. Each disc has a character's face printed on its top surface, and a visible thick side edge so the disc reads as a solid object with thickness.

The disc has a thick dark outline all the way round and a narrow raised rim in a slightly darker shade of its own colour. No gradients, no gloss highlights, no drop shadow. Flat colours only.

The FACE on the disc is the character's head seen straight on, drawn large and simple, filling most of the disc: the round flat face, the small oval muzzle, big simple eyes, and the afro drawn as a ring of soft bumps around the inside edge of the disc. Keep it bold and readable at thumbnail size.

ALL FOUR DISCS MUST BE EXACTLY THE SAME DIAMETER and sit in the same place in their cell.

TOP-LEFT     PIECE_AFUWA:       seen from directly above. Cream disc, dark chocolate-brown afro ring, Afuwa's worried droopy-eyebrow face with pink cheek dots. The side edge is a darker brown.
TOP-RIGHT    PIECE_BURUMA:      seen from directly above. White disc, bright sky-blue afro ring, Buruma's sharp-eyebrow cheeky grin. The side edge is a darker blue.
BOTTOM-LEFT  PIECE_AFUWA_TILT:  the SAME Afuwa disc caught mid-flip, tilted about 55 degrees towards the viewer, so the circle is squashed into a wide ellipse about 45% as tall as it is wide, and a thick band of the side edge shows along the bottom. The face is foreshortened with it. Two small motion arcs beside the disc (allowed).
BOTTOM-RIGHT PIECE_BURUMA_TILT: the SAME Buruma disc caught mid-flip, at the same 55 degree tilt and the same squashed ellipse, with its side edge showing along the bottom and its face foreshortened. Two small motion arcs beside the disc (allowed).

Transparent background (PNG alpha). Nothing but the four discs.
```

### 2枚目 OSERO_BOARD　盤の下地（マス目は描かない）

```text
Use the built-in image_gen tool. Generate ONE square image, 1024x1024. This is a single picture, NOT a grid.

A square game board panel seen from directly above, flat-on, no perspective: a thick rounded wooden frame in warm mid-brown with a darker brown outline, and inside it a flat playing surface of deep grass-green felt with a very subtle woven texture. A thin gold pinstripe runs just inside the wooden frame.

**DO NOT DRAW ANY GRID LINES, squares, dots or markings on the green surface.** The green must be completely empty and evenly lit, corner to corner — the grid is drawn separately in code and will not line up with a drawn one. This is the single most important instruction for this image.

No pieces, no characters, no text, no shadows cast across the green. Same thick-outline flat-colour cartoon style as the attached icon reference.

Background outside the panel: transparent (PNG alpha). The panel is square, centred, with a small margin so the frame is not cut off.
```

### 3枚目 OSERO_BG　タイトル画面の背景

```text
A wide background scene, 1536x1024, no transparency.

Two afro horse mascots sitting on the floor facing each other across a low wooden game board, seen from the side at a slight angle, in a warm cosy Japanese living room at night: tatami floor, a low table, a paper lantern glowing, a window with a dark blue evening sky outside. AFUWA on the left, leaning in with a worried thinking face, one hoof on its chin. BURUMA on the right, sitting back confidently with a cheeky grin. They are small in the frame — the room fills most of it.

Both of them sit like people, on two legs, exactly the character design of the attached sheet. NOT four-legged horses.

Leave the MIDDLE of the image fairly calm and uncluttered — the game's title and buttons go on top of it. Warm lamplight, deep shadows, cosy. No text anywhere.
```

### 4枚目 OSERO_ICON　丸バッジ（題字つき）

```text
Inside the circular badge: a close-up of two round game discs on deep green felt, seen from slightly above. One cream disc with a dark-brown afro ring and Afuwa's face, one white disc with a sky-blue afro ring and Buruma's face, overlapping slightly. Between them a third disc caught mid-flip, tilted and squashed into an ellipse, with little motion arcs around it. Bright and punchy.

Leave room across the bottom of the circle for the title.

TITLE: write the Japanese title 「アフロオセロ」 across the bottom of the badge, exactly as described in COMMON_ICON — heavy rounded gothic, yellow fill, thick black outline with a white outer outline, on a gentle upward arc. Spell it exactly, and put no other text anywhere in the image.
```

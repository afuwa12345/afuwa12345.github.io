# Codex 一括生成指示：ゲーム「アフロ五目ならべ」

下の「生成リスト」の5枚を、順番にすべて生成すること。画像生成は内蔵 image_gen を使い、1回の生成で1枚ずつ作る。
パスはすべて `00_サイト本体/` からの相対パス。

- 共通ブロック（COMMON / CHARACTERS / COMMON_BG / COMMON_ICON）と参照画像は `_art/COMMON.md` のものを使う。
- **`_art/ref/AFRO_MASTER.png` を必ず添付してから描くこと。** あれがキャラのデザインの正解で、
  文章の説明より優先。添付せずに描くと、別のキャラになる。
- 保存先は `_art/gomoku/sheets/`（フォルダがなければ作る）。
- 上書きしない。毎回できあがりを確かめて、ずれていたら最大2回まで作り直す。
- **全部終わったら、保存したファイルのフルパスを一覧で報告すること。**

**このゲームは五目ならべ。盤の交点に石を置いて、先に5つ並べたほうが勝ち。**
**アフワ（茶）が自分、ブルマ（青）が相手。見せ場は「5つ並んで光る瞬間」なので、**
**ふつうの石と、光っている石の2種類を描いてもらうのが一番大事。**

## 0. いちばん大事な作りの決まり

スマホで石1つが **20〜22px くらい**にしかならない。オセロの駒（38px）よりさらに小さい。
細かい描き込みは全部つぶれる。

- 線は太く、色は少なく、形ははっきり。影のグラデーションは要らない
- 顔は入れるが、**目と口だけ**。鼻・ほっぺ・まつげは省く。入れると黒い点のかたまりになる
- アフロは石のふちをぐるりと囲む「こぶの輪」1周だけ。もこもこを細かく刻まない
- 4つのセルで**石の直径を完全に同じ**にすること。揃っていないと、並べたときガタガタになる

## 1. 生成リスト

| 順 | 保存先 | 中身 | 参照画像 |
|---|---|---|---|
| 1 | `_art/gomoku/sheets/GOMOKU_STONE.png` | 石4種（2x2・透過） | MASTER, FACE |
| 2 | `_art/gomoku/sheets/GOMOKU_PLAYER.png` | 対局中のふたり4コマ（2x2・透過） | MASTER |
| 3 | `_art/gomoku/sheets/GOMOKU_BOARD.png` | 盤の下地1枚（線なし） | ICON |
| 4 | `_art/gomoku/sheets/GOMOKU_BG.png` | タイトル画面の背景1枚 | BG, MASTER |
| 5 | `_art/gomoku/sheets/GOMOKU_ICON.png` | アイコン1枚 | ICON, MASTER |

1枚目 … COMMON ＋ CHARACTERS(ALL + AFUWA + BURUMA) ＋ 下の STONE
2枚目 … COMMON ＋ CHARACTERS(ALL + AFUWA + BURUMA) ＋ 下の PLAYER
3枚目 … 下の BOARD（キャラは出てこない）
4枚目 … COMMON_BG ＋ CHARACTERS(ALL + AFUWA + BURUMA) ＋ 下の BG
5枚目 … COMMON_ICON ＋ 下の ICON

## 2. 個別指示

### 1枚目 GOMOKU_STONE　石4種（2x2・透過）

**全身ではなく、石**を描く。丸くて厚みのある石の表に、キャラの顔が小さく描いてある。
左の2つがふつうの石、右の2つが「5つ並んで光っている石」。

```text
Draw four GAME STONES — small round flat playing stones, like Go stones, seen from directly above — NOT characters standing up. Each stone has a character's face printed on its top surface, and a narrow visible side edge so the stone reads as a solid object with thickness.

Each stone has a thick dark outline all the way round. No gradients, no gloss highlights, no drop shadow. Flat colours only.

The FACE on the stone is drawn VERY SIMPLY because the stone is tiny on screen: two big simple eyes and one small mouth, nothing else. No nose, no cheek dots, no eyelashes. The afro is a single ring of soft bumps around the inside edge of the stone.

ALL FOUR STONES MUST BE EXACTLY THE SAME DIAMETER and sit in exactly the same place in their cell.

TOP-LEFT     STONE_AFUWA:  cream stone, dark chocolate-brown afro ring, Afuwa's worried droopy eyebrows and small flat mouth. Side edge a darker brown.
TOP-RIGHT    STONE_BURUMA: white stone, bright sky-blue afro ring, Buruma's sharp slanted eyebrows and cheeky open grin. Side edge a darker blue.
BOTTOM-LEFT  STONE_AFUWA_WIN:  the SAME Afuwa stone, but lit up as a winner — a bright warm golden halo ring glowing around the outside of the stone, the face now a happy closed-eye smile, and four short golden sparkle lines radiating outwards. The stone itself stays exactly the same size and position as the top-left one.
BOTTOM-RIGHT STONE_BURUMA_WIN: the SAME Buruma stone, lit up the same way with the same golden halo and sparkles, face now a wide triumphant grin. Same size and position as the top-right one.

Transparent background (PNG alpha). Nothing but the four stones.
```

### 2枚目 GOMOKU_PLAYER　対局中のふたり（2x2・透過）

番の表示と、勝ち負けの顔に使う。**上半身だけ**（胸から上）。

```text
Draw four HALF-LENGTH PORTRAITS of the two afro horse mascots, from the chest up, facing the viewer, exactly the character design of the attached sheet. They sit like people, on two legs. NOT four-legged horses.

Each portrait is the same size and sits in the same place in its cell, so the four can be swapped in and out without anything jumping.

TOP-LEFT     AFUWA_THINK: Afuwa, worried droopy eyebrows, one hoof raised to its chin, eyes looking up and to the side, thinking hard. A small sweat drop beside the head (allowed).
TOP-RIGHT    AFUWA_WIN:   Afuwa, both front hooves thrown up in the air, eyes closed in a big happy smile, mouth open and cheering.
BOTTOM-LEFT  BURUMA_THINK: Buruma, sharp slanted eyebrows, head tilted, one hoof tapping its own cheek, a confident half-smile — clearly plotting something.
BOTTOM-RIGHT BURUMA_WIN:  Buruma, chest out, both hooves on its hips, a huge smug triumphant grin, eyes narrowed.

Thick dark outlines, flat colours, no gradients, no drop shadow. Transparent background (PNG alpha). Nothing but the four portraits.
```

### 3枚目 GOMOKU_BOARD　盤の下地（線は描かない）

```text
Use the built-in image_gen tool. Generate ONE square image, 1024x1024. This is a single picture, NOT a grid.

A square wooden game board seen from directly above, flat-on, no perspective: a thick rounded frame in warm dark brown with a darker outline, and inside it a flat playing surface of pale warm honey-coloured wood with a very subtle straight wood grain running top to bottom. A thin dark pinstripe runs just inside the frame.

**DO NOT DRAW ANY GRID LINES, squares, dots, star points or markings on the wood surface.** The wood must be completely empty and evenly lit, corner to corner — the grid is drawn separately in code and will not line up with a drawn one. This is the single most important instruction for this image.

No stones, no characters, no text, no shadows cast across the wood. Same thick-outline flat-colour cartoon style as the attached icon reference.

Background outside the board: transparent (PNG alpha). The board is square, centred, with a small margin so the frame is not cut off.
```

### 4枚目 GOMOKU_BG　タイトル画面の背景

```text
A wide background scene, 1536x1024, no transparency.

Two afro horse mascots kneeling on a tatami floor facing each other across a low wooden board game, seen from the side at a slight angle, in a quiet Japanese room on a late summer evening: shoji paper screens, a hanging paper lantern, a small electric fan, a dark blue sky with one firework far away through the open screen. AFUWA on the left, hoof hovering over the board, worried and hesitating. BURUMA on the right, already holding a stone up between two hooves with a confident grin.

Both of them sit like people, on two legs, exactly the character design of the attached sheet. NOT four-legged horses.

They are small in the frame — the room fills most of it. Leave the MIDDLE of the image fairly calm and uncluttered — the game's title and buttons go on top of it. Warm lamplight, deep blue shadows, quiet. No text anywhere.
```

### 5枚目 GOMOKU_ICON　丸バッジ（題字つき）

```text
Inside the circular badge: a close-up of a wooden board seen from slightly above, with five small round stones lined up diagonally across it — cream stones with dark-brown afro rings and Afuwa's face — all five glowing with a warm golden halo and sparkles, with two white-and-sky-blue Buruma stones sitting off to the side, beaten. Bright and punchy.

Leave room across the bottom of the circle for the title.

TITLE: write the Japanese title 「アフロ五目ならべ」 across the bottom of the badge, exactly as described in COMMON_ICON — heavy rounded gothic, yellow fill, thick black outline with a white outer outline, on a gentle upward arc. Spell it exactly, and put no other text anywhere in the image.

**The title text is required.** The last icon came back with no title on it at all. Before you say this one is finished, look at the image and check that the eight characters 「アフロ五目ならべ」 are actually there and spelled right. If they are missing or wrong, generate it again.
```

---

## 3. 絵が出てきたあと（人の作業）

1. 5枚を `_art/gomoku/sheets/` に置いてコミット・push する
2. 題字がどうしても出なかったアイコンは、題字なしのまま置いておけばよい。
   `python _art/tools/badge.py _art/gomoku/sheets/GOMOKU_ICON.png アフロ五目ならべ images/icon/gomoku.webp`
   で後から乗せられる（アフロくずしはこれで直した）
3. 切り分けは作る側（ルーティンか Claude）がやる。石と顔は**同じ台紙にそろえる**こと。
   そろえないと、置いた石が1つずつ上下にずれる

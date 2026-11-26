# Codex 一括生成指示：ゲーム「アフロ盛り」

下の「生成リスト」の3枚を、順番にすべて生成すること。画像生成は内蔵 image_gen を使い、1回の生成で1枚ずつ作る。
パスはすべて `00_サイト本体/` からの相対パス。

- 共通ブロック（COMMON / CHARACTERS / COMMON_BG / COMMON_ICON）と参照画像は `_art/COMMON.md` のものを使う。
- 保存先は `_art/mori/sheets/`（フォルダがなければ作る）。
- 上書きしない。毎回できあがりを確かめて、ずれていたら最大2回まで作り直す。
- **全部終わったら、保存したファイルのフルパスを一覧で報告すること。**

**このゲームは、押しているあいだアフロがどんどんふくらみ、限界を超えると爆発する。いまは `images/find/` の顔を拡大して使っているので、「ふくらんだ顔」が専用であるほど面白くなる。**

## 1. 生成リスト

| 順 | 保存先 | 中身 | 参照画像 |
|---|---|---|---|
| 1 | `_art/mori/sheets/MORI_FACE_A.png` | アフワの4表情（2x2） | FACE, ICON |
| 2 | `_art/mori/sheets/MORI_FACE_B.png` | ブルマの4表情（2x2） | FACE, ICON |
| 3 | `_art/mori/sheets/MORI_ICON.png` | アイコン1枚 | ICON, FACE |

1・2枚目 … COMMON ＋ CHARACTERS(ALL + そのキャラ) ＋ 下の FACES
3枚目 … COMMON_ICON ＋ 下の ICON

うまくいったら、同じ FACES で CHAFUWA と GINMA のぶんも足す。

## 2. 個別指示

### 1・2枚目 MORI_FACE_*　ふくらみ具合ちがいの顔

**全身ではなく、首から上の顔だけ**を描く（`images/find/` の顔と同じ切りかた）。
4つのセルで**アフロの大きさだけ**が変わる。顔の大きさと位置は4つとも同じにすること。

```text
IMPORTANT: Draw the HEAD ONLY (face and afro), not the body. Same framing as the attached face reference.

The four cells show the SAME character at four stages of its afro inflating. The FACE stays exactly the same size and in the same place in all four cells; only the afro around it changes.

TOP-LEFT     MORI_01_CALM:  normal afro, the usual size. Calm, slightly bored face.
TOP-RIGHT    MORI_02_BIG:   the afro has puffed up to about twice as wide, nice and round and proud. Happy pleased face, eyes closed in a smile.
BOTTOM-LEFT  MORI_03_LIMIT: the afro is enormous, about three times as wide, stretched tight and straining, with a few strands sticking out and small stress marks around it (allowed). Panicking face: huge round eyes, open mouth, one big sweat drop (allowed).
BOTTOM-RIGHT MORI_04_POP:   the afro has just exploded. Only a small sad flat frizzy tuft of hair is left on the head, with a few puffs of smoke and little hair clumps flying off (allowed). Dazed face with swirly eyes and an open mouth.

Keep the whole afro inside the cell in every stage, including the biggest one.
```

### 3枚目 MORI_ICON　丸バッジ（文字なし）

```text
Inside the circular badge: one afro horse head seen from the front, filling most of the circle, with an ENORMOUS over-inflated afro that is stretched tight and about to burst. Little stress marks and a couple of stray strands around the afro (allowed), one big sweat drop on the face, huge panicking round eyes and an open mouth. Behind it, a pale yellow background with white radiating burst lines.

Leave the bottom third of the circle fairly plain — the title is added afterwards in code.

Remember: NO TEXT ANYWHERE in the image.
```

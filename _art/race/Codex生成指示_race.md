# Codex 一括生成指示：ゲーム「アフロ追い比べ」

下の「生成リスト」の3枚を、順番にすべて生成すること。画像生成は内蔵 image_gen を使い、1回の生成で1枚ずつ作る。
パスはすべて `00_サイト本体/` からの相対パス。

- 共通ブロック（COMMON / CHARACTERS / COMMON_BG / COMMON_ICON）と参照画像は `_art/COMMON.md` のものを使う。
- 保存先は `_art/race/sheets/`（フォルダがなければ作る）。
- 上書きしない。毎回できあがりを確認して、ずれていたら最大2回まで作り直す。
- **全部終わったら、保存したファイルのフルパスを一覧で報告すること。**

**このゲームはゴール前200mの叩き合い。4頭が横から見た形で右に向かって全力で走る。止め絵でも走って見えるように、腕と脚は思いきり振って、スピード線と砂けむりを強めに。**

**いちばん大事：アフロ馬は四つ足の馬ではなく、二足歩行のキャラ。人が全力疾走するのと同じ形で、腕を振って2本の脚で走る。前にもらった絵は四つ足になっていたので、ここだけは必ず守ること。**

## 1. 生成リスト

| 順 | 保存先 | 中身 | 参照画像 |
|---|---|---|---|
| 1 | `_art/race/sheets/RACE_RUN.png` | 4頭の走り（2x2） | RUN, FACE |
| 2 | `_art/race/sheets/RACE_BG.png` | 背景1枚 | BG |
| 3 | `_art/race/sheets/RACE_ICON.png` | アイコン1枚 | ICON, RUN |

プロンプト＝
1枚目 … COMMON ＋ CHARACTERS(ALL + AFUWA + BURUMA + CHAFUWA + GINMA) ＋ 下の POSES
2枚目 … COMMON_BG ＋ 下の BG
3枚目 … COMMON_ICON ＋ 下の ICON

## 2. 個別指示

### 1枚目 RACE_RUN　アフワ・ブルマ・チャフワ・ギンマの全力疾走

4つのセルは**ちがうキャラ**だが、**まったく同じ走りのポーズ・同じ大きさ・同じ向き**にすること。
（ゲームの中で横に並べて走らせるので、ばらつくと使えない）

```text
POSES: All four cells show the SAME full-gallop running pose, side view facing RIGHT, at the SAME size and the SAME angle. Only the character differs between cells.

THE POSE (identical in all four cells): running hard on TWO legs, seen from the side, facing right. **Copy the running pose of the attached RUN reference exactly** — that picture is the correct way this character runs.

The body stays UPRIGHT, standing tall and only leaning forward a little. It is NOT stretched out horizontally. One short leg swings forward and the other kicks back, both short arms swing (one forward, one back), the head and its huge afro stay high above the body, the tail flicks behind, mouth open with effort, eyes forward and determined. Horizontal speed lines behind the body (allowed) and a small dust puff under the back hoof (allowed).

ABSOLUTELY NOT a four-legged horse galloping, and NOT a body held horizontal. Think of a costumed mascot running, seen from the side.

TOP-LEFT     RACE_RUN_AFUWA:   the pose above, character = AFUWA.
TOP-RIGHT    RACE_RUN_BURUMA:  the pose above, character = BURUMA.
BOTTOM-LEFT  RACE_RUN_CHAFUWA: the pose above, character = CHAFUWA.
BOTTOM-RIGHT RACE_RUN_GINMA:   the pose above, character = GINMA.

No saddle, no jockey, no bridle, no number cloth. Just the horse.
```

### 2枚目 RACE_BG　直線コースの背景

```text
SIZE: 1536x1024, wide landscape.

A horse racing course seen from the outside of the track, straight stretch, in the late afternoon. From top to bottom: a warm sunset sky in soft lavender and orange bands with a low sun and a few flat clouds; far hills and a small flat grandstand silhouette on the horizon; a long white running rail crossing the whole picture horizontally; and below the rail, a wide plain green turf that fills the bottom 45 percent of the picture.

The turf must be plain and almost empty, with only very soft mowing stripes, because cartoon horses are drawn on top of it. The horizon and the rail must be perfectly horizontal and straight, and must continue all the way to both the left and the right edge so the picture can be repeated side by side.
```

### 3枚目 RACE_ICON　丸バッジ（文字なし）

```text
Inside the circular badge: a green turf racecourse with a white running rail and a blue sky, white speed lines radiating out from the middle. Two of the afro horse mascots, seen from the side, running hard to the RIGHT ON TWO LEGS with their bodies upright and their arms swinging, neck and neck in a close finish, filling the upper two thirds of the circle. Copy the running pose of the attached RUN reference. The left one is AFUWA (cream body, dark brown afro), the right one is BURUMA (white body, sky-blue afro). Legs striding, arms pumping, tails flying, determined faces, dust flying behind them.

They are two-legged mascots, NOT four-legged horses.

Leave the bottom third of the circle as plain green turf with nothing on it.

Remember: NO TEXT ANYWHERE in the image.
```

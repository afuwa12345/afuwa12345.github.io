# Codex 一括生成指示：ゲーム「アフロくずし」（ブロック崩し）

下の「生成リスト」の5枚を、順番にすべて生成すること。画像生成は内蔵 image_gen を使い、1回の生成で1枚ずつ作る。
パスはすべて `00_サイト本体/` からの相対パス。

- 共通ブロック（COMMON / CHARACTERS / COMMON_BG / COMMON_ICON）と参照画像は `_art/COMMON.md` のものを使う。
- **`_art/ref/AFRO_MASTER.png` を必ず添付してから描くこと。** あれがキャラのデザインの正解で、
  文章の説明より優先。添付せずに描くと、別のキャラになる。
- 保存先は `_art/kuzushi/sheets/`（フォルダがなければ作る）。
- 上書きしない。毎回できあがりを確かめて、ずれていたら最大2回まで作り直す。
- **全部終わったら、保存したファイルのフルパスを一覧で報告すること。**

**このゲームはブロック崩し。下のパドルでボールを打ち上げて、上に積んだアフロのブロックを割る。**
**見せ場は「ブロックが割れる瞬間」なので、無傷→ヒビ→砕けるの段階を描いてもらうのが一番大事。**

## 0. いちばん大事な作りの決まり

スマホでブロック1つが **横44px・縦22px くらい**にしかならない。細かい描き込みは全部つぶれる。

- 線は太く、色は少なく、形ははっきり。影のグラデーションは要らない
- 顔は大きめに、横長のブロックいっぱいに。小さい模様やハイライトは入れない
- **1枚目の4つのブロックは、外形（横長の角丸四角）を完全に同じ大きさ・同じ位置にする。**
  揃っていないと、横に並べたときガタガタになる
- 2枚目のヒビは**黒い線だけ**。塗りつぶしや色は入れない（ブロックの上に重ねて使うため）

## 1. 生成リスト

| 順 | 保存先 | 中身 | 参照画像 |
|---|---|---|---|
| 1 | `_art/kuzushi/sheets/KUZUSHI_BLOCK.png` | ブロック4種（2x2・透過） | MASTER, FACE |
| 2 | `_art/kuzushi/sheets/KUZUSHI_CRACK.png` | ヒビ4段階（2x2・透過） | なし |
| 3 | `_art/kuzushi/sheets/KUZUSHI_GEAR.png` | パドルとボール（2x2・透過） | MASTER |
| 4 | `_art/kuzushi/sheets/KUZUSHI_BG.png` | タイトル画面の背景1枚 | BG, MASTER |
| 5 | `_art/kuzushi/sheets/KUZUSHI_ICON.png` | アイコン1枚 | ICON, MASTER |

1枚目 … COMMON ＋ CHARACTERS(ALL + AFUWA + BURUMA + CHAFUWA + GINMA) ＋ 下の BLOCK
2枚目 … 下の CRACK（キャラは出てこない）
3枚目 … COMMON ＋ CHARACTERS(ALL + AFUWA) ＋ 下の GEAR
4枚目 … COMMON_BG ＋ CHARACTERS(ALL + AFUWA) ＋ 下の BG
5枚目 … COMMON_ICON ＋ 下の ICON

## 2. 個別指示

### 1枚目 KUZUSHI_BLOCK　ブロック4種（2x2・透過）

全身ではなく、**横長のブロック**を描く。ブロックの表にキャラの顔が大きく描いてある。

```text
Draw four GAME BLOCKS — wide flat rounded-rectangle bricks, like the bricks in a breakout game — NOT characters standing up. Each brick has one character's face printed large across it, and a visible thick bottom edge so the brick reads as a solid object with thickness.

Each brick has a thick dark outline all the way round and a narrow raised rim in a slightly darker shade of its own colour. No gradients, no gloss highlights, no drop shadow. Flat colours only.

The FACE on the brick is the character's head seen straight on, drawn large and simple, filling most of the brick: the round flat face, the small oval muzzle, big simple eyes, and the afro drawn as a band of soft bumps along the top and sides of the brick. Keep it bold and readable at thumbnail size.

ALL FOUR BRICKS MUST BE EXACTLY THE SAME SHAPE AND SIZE — a wide rounded rectangle twice as wide as it is tall — and sit in exactly the same place in their cell.

TOP-LEFT     BLOCK_AFUWA:   cream brick, dark chocolate-brown afro band, Afuwa's worried droopy-eyebrow face with pink cheek dots. Bottom edge a darker brown.
TOP-RIGHT    BLOCK_BURUMA:  white brick, bright sky-blue afro band, Buruma's sharp-eyebrow cheeky grin. Bottom edge a darker blue.
BOTTOM-LEFT  BLOCK_CHAFUWA: warm milk-brown brick, reddish-brown terracotta afro band, Chafuwa's big round open-mouth smile. Bottom edge a deeper brown.
BOTTOM-RIGHT BLOCK_GINMA:   pale off-white brick, silver-grey afro band, Ginma's heavy-lidded half-closed eyes and flat mouth. Bottom edge a darker grey.

Transparent background (PNG alpha). Nothing but the four bricks.
```

### 2枚目 KUZUSHI_CRACK　ヒビ4段階（2x2・透過）

ブロックの上に重ねる割れ目だけ。**色は黒一色、線だけ。**

```text
Use the built-in image_gen tool. Generate ONE square image, 1536x1536, as a 2x2 grid of four cells on a fully transparent background.

Each cell contains ONLY crack lines — rough hand-drawn black cracks, as if a brick has been struck. Solid black, thick, slightly uneven, cartoon-style. NOTHING ELSE: no brick, no colour, no fill, no shading, no outline box, no background. The cracks will be laid on top of a coloured brick in code, so every pixel that is not a crack line must be fully transparent.

The cracks in all four cells sit inside the same invisible wide rounded-rectangle area, twice as wide as it is tall, centred in the cell — the same shape and position as the bricks in the other sheet.

TOP-LEFT     CRACK_1: one short crack, a single split near the middle with two small branches. Light damage.
TOP-RIGHT    CRACK_2: the SAME crack as CRACK_1, grown longer, now reaching the left and right edges, with four or five branches. Medium damage.
BOTTOM-LEFT  CRACK_3: the SAME crack grown further into a dense web that covers most of the area and breaks it into about six pieces. Heavy damage.
BOTTOM-RIGHT CRACK_BURST: not cracks but the shatter — eight to twelve small solid black angular shards flying apart outward from the centre, with a few short speed lines. This is the moment the brick breaks.
```

### 3枚目 KUZUSHI_GEAR　パドルとボール（2x2・透過）

```text
Four separate game objects on a transparent background, one per cell. Flat cartoon style, thick black outlines, no gradients.

TOP-LEFT     PADDLE: a wide low platform seen straight on from the side-front, like a long rounded bar. It is a polished wooden plank in warm mid-brown with a darker brown outline, and a bright yellow strip running along its top surface. Much wider than it is tall, about five times as wide. No characters on it. Clean and simple.
TOP-RIGHT    PADDLE_HIT: the SAME paddle at the SAME width, squashed by an impact — about 30% shorter in height, bulging slightly wider at the middle, with three short white impact lines popping up from the centre of its top edge.
BOTTOM-LEFT  BALL: a small round ball, which is a tiny version of Afuwa's head — a round cream face with a dark chocolate-brown afro ring around it, two simple dot eyes and a small determined mouth, wrapped into a neat circle. Thick black outline. It must read clearly when it is only 20 pixels across, so keep it to a few bold shapes.
BOTTOM-RIGHT BALL_SQUASH: the SAME ball mid-bounce, squashed into a wide ellipse about 65% as tall as it is wide, with two short motion arcs beside it.

ALL ITEMS ARE CENTRED IN THEIR CELL. The two paddles must be exactly the same width as each other; the two balls exactly the same width as each other.
```

### 4枚目 KUZUSHI_BG　タイトル画面の背景

```text
A wide background scene, 1536x1024, no transparency.

A night-time horse-racing grandstand seen from the track, empty and quiet, with floodlight towers glowing against a deep indigo sky full of stars. In the lower part of the frame AFUWA stands on the grass in front of the stand, small, looking up with a determined face, holding a wide wooden paddle like a bat. High above, a loose arch of brightly coloured afro-horse bricks floats across the sky like a wall waiting to be broken.

Afuwa stands like a person, on two legs, exactly the character design of the attached sheet. NOT a four-legged horse.

Leave the MIDDLE of the image fairly calm and uncluttered — the game's title and buttons go on top of it. Cool blues and purples with warm floodlight spill. No text anywhere.
```

### 5枚目 KUZUSHI_ICON　丸バッジ（題字つき）

```text
Inside the circular badge: a wall of brightly coloured afro-horse bricks across the upper half, one of them shattering into black shards with a bright yellow impact flash. Below it, a small Afuwa-faced ball streaking downward with motion lines, and the top edge of a wooden paddle at the very bottom. Dynamic and punchy, with a deep blue night sky behind the bricks.

Leave room across the bottom of the circle for the title.

TITLE: write the Japanese title 「アフロくずし」 across the bottom of the badge, exactly as described in COMMON_ICON — heavy rounded gothic, yellow fill, thick black outline with a white outer outline, on a gentle upward arc. Spell it exactly, and put no other text anywhere in the image.
```

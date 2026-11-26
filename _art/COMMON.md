# AFRO Horse ゲーム素材：共通ブロック

ゲームの絵を Codex の画像生成で作るときの、毎回おなじ部分。
各ゲームの指示書（`_art/<ゲーム>/Codex生成指示_*.md`）から、この中のブロックを呼んで使う。

- **キャラ・小物** … 2x2 の四分割シート1枚（あとで `_art/tools/split4.py` で4枚に切る）
- **背景・アイコン** … 分割せず1枚もの

---

## 1. 参照画像

生成のとき、必ず下の絵を参照として付ける。画風と体型の基準。

| 記号 | パス | 役割 |
|---|---|---|
| RUN | `images/game/run_afuwa.webp` | 走っているアフワ。**走り方はこの絵が正解**。体は立ったまま、2本脚 |
| JUMP | `images/game/jump_afuwa.webp` | 跳んでいるアフワ。腕と脚の付きかたの基準 |
| FACE | `images/find/afuwa_futsu.webp` ほか `images/find/*_futsu.webp` | 各キャラの顔・アフロの色の基準 |
| ICON | `images/icon/gate.webp` | ゲームアイコンの画風・丸バッジの作りの基準 |
| BG | `images/bg/jump.webp` | 背景の画風・色味の基準 |

---

## 2. COMMON（キャラの2x2シート）

```text
Use the built-in image_gen tool. Generate ONE square image, 1536x1536, laid out as a 2x2 grid of FOUR separate poses.

REFERENCE: The attached images are the authoritative model. Copy the character design and art style EXACTLY: same proportions, same colors, same line quality, same size. Do NOT redesign. Do NOT copy any text, labels or layout from the references.

STYLE: Cute chunky hand-drawn cartoon mascot. Very thick smooth black outlines, flat colors, almost no shading. Simple, friendly, a little goofy. NOT 3D, NOT realistic, NOT detailed, NOT anime.

LAYOUT:
- Exactly 4 cells, 2 columns x 2 rows, equal size, generous empty space between cells. No borders, no frames.
- One full-body pose per cell, centered, nothing cut off: the whole afro, both arms, both legs, the tail and the hooves must be fully inside the cell.
- Same character size in all 4 cells. No strong perspective.

BACKGROUND: Transparent (PNG alpha). No floor, no shadow, no white halo. No text, letters or numbers. Draw ONLY the props and effect marks a pose explicitly allows.

ACTION: Each pose must read instantly at phone size, as a frozen frame of a big cartoon movement: strong lean, fully stretched arms and legs, squash and stretch, plus speed lines or dust puffs where allowed. The face stays simple; the body does the acting.
```

## 3. CHARACTERS（キャラの指定。必要なものだけ使う）

```text
ALL AFRO HORSES: a chibi cartoon horse MASCOT that stands and moves on TWO legs like a person, NOT on four legs. Body plan: an upright rounded body, TWO short arms with simple rounded hands, TWO short legs ending in dark hooves, and a short tuft tail. The head sits straight on top of the body and its mane is one ENORMOUS round fluffy afro covering the whole top and sides of the head, far bigger than the face. Two small pointed ears poke out of the afro, a soft rounded muzzle, simple black dot eyes. Thick black outline, flat colours.

NEVER draw it as a four-legged horse, a pony or a foal. It is always a two-legged mascot, like a costumed character.
```

```text
AFUWA (アフワ, main character): cream / pale ivory body, dark chocolate-brown afro and tail, pink cheek dots, gentle worried-but-trying face.
```

```text
BURUMA (ブルマ): white body, bright sky-blue afro and tail, sharp confident eyebrows, cheeky grin.
```

```text
CHAFUWA (チャフワ): light milk-brown body with a cream muzzle, reddish-brown (terracotta) afro and tail, round happy open-mouth smile.
```

```text
GINMA (ギンマ): pale off-white body with a grey muzzle, silver-grey afro and tail, heavy-lidded half-closed eyes, cool unimpressed face.
```

```text
KUROFUWA (クロフワ): dark grey body, black afro and tail, serious stern face.
```

```text
YANCHA (ヤンチャ): tan body, orange afro and tail, wild toothy grin, troublemaker face.
```

## 4. COMMON_BG（背景。分割しない1枚もの）

```text
Use the built-in image_gen tool. Generate ONE image at the size given below. This is a single background picture, NOT a grid.

STYLE: Flat vector illustration, same look as the attached background reference: soft flat colour bands, simple silhouette shapes, gentle gradient sky, no outlines on the scenery, calm and a little retro. NOT 3D, NOT photo-real.

RULES: No characters, no text, no letters, no numbers, no logos, no watermark. Nothing important near the edges. Leave the area where the game is played plain and uncluttered so cartoon characters drawn on top stay readable.
```

## 5. COMMON_ICON（ゲームアイコン。分割しない1枚もの）

```text
Use the built-in image_gen tool. Generate ONE square image, 1024x1024. This is a single icon, NOT a grid.

A round game-icon badge sticker, like a mobile game app icon: a bright blue outer ring, a thick white rim inside it, and the scene filling the circle. Thick black outlines, bold saturated colours, glossy sticker look, same art style as the attached icon reference.

BACKGROUND outside the circle: transparent (PNG alpha). The badge must be a perfect circle, fully inside the canvas with a small margin, nothing cut off.

**NO TEXT AT ALL.** No Japanese characters, no letters, no numbers, no banner with writing. Leave the bottom third of the circle fairly plain and uncluttered — the title is added afterwards in code.
```

---

## 6. 出てきた絵をどうするか

1. 生成された PNG を `_art/<ゲーム>/sheets/` に入れる
2. 2x2 シートは `python _art/tools/split4.py _art/<ゲーム>/split_map.json` で4枚に切る
3. 背景・アイコンはそのまま使う（切らない）
4. あとは Claude がサイズを整えて `images/` に入れ、ページにつなぐ

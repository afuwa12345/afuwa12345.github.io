# AFRO Horse ゲーム素材：共通ブロック

ゲームの絵を Codex の画像生成で作るときの、毎回おなじ部分。
各ゲームの指示書（`_art/<ゲーム>/Codex生成指示_*.md`）から、この中のブロックを呼んで使う。

- **キャラ・小物** … 2x2 の四分割シート1枚（あとで `_art/tools/split4.py` で4枚に切る）
- **背景・アイコン** … 分割せず1枚もの

---

## 1. 参照画像

**いちばん大事：`_art/ref/AFRO_MASTER.png` を Codex に必ず添付すること。**
文章の説明だけだと、それっぽい別のキャラが出てくる。実際に出た。
あの設定シートがキャラのデザインそのもので、文章はおまけ。

| 記号 | パス | 役割 |
|---|---|---|
| **MASTER** | `_art/ref/AFRO_MASTER.png` | **キャラのデザインの基準。毎回これを添付する** |
| ICON | `images/icon/gate.webp` | ゲームアイコンの画風・丸バッジの作りの基準 |
| BG | `images/bg/jump.webp` | 背景の画風・色味の基準 |

設定シートは `python _art/tools/make_ref.py` で作り直せる（サイトにある絵から組み立てている）。

## 2. COMMON（キャラの2x2シート）

```text
Use the built-in image_gen tool. Generate ONE square image, 1536x1536, laid out as a 2x2 grid of FOUR separate poses.

REFERENCE: The attached character sheet (AFRO_MASTER) is the authoritative model and overrides anything written below. Study it first. Copy the character design EXACTLY: the same head shape, the same muzzle, the same eyes, the same body proportions, the same colours, the same line weight. Do NOT invent a new character, do NOT redesign, do NOT "improve" it. If the words below and the sheet disagree, the sheet wins. Do NOT copy the sheet's text, labels or layout.

HEAD SHAPE (people keep getting this wrong): the head is a ROUND flat-faced head seen almost straight on, with the muzzle drawn as a small soft oval INSIDE the lower part of the face. The snout does NOT stick out forward like a real horse's. The enormous afro wraps all the way around that round head.

STYLE: Cute chunky hand-drawn cartoon mascot. Very thick smooth black outlines, flat colors, almost no shading. Simple, friendly, a little goofy. NOT 3D, NOT realistic, NOT detailed, NOT anime.

LAYOUT:
- Exactly 4 cells, 2 columns x 2 rows, equal size, generous empty space between cells. No borders, no frames.
- One full-body pose per cell, centered, nothing cut off: the whole afro, both arms, both legs, the tail and the hooves must be fully inside the cell.
- Same character size in all 4 cells. No strong perspective.

BACKGROUND: Transparent (PNG alpha). No floor, no shadow, no white halo. No text, letters or numbers. Draw ONLY the props and effect marks a pose explicitly allows.

ACTION: Each pose must read instantly at phone size, as a frozen frame of a big cartoon movement: strong lean, fully stretched arms and legs, squash and stretch, plus speed lines or dust puffs where allowed. The face stays simple; the body does the acting.
```

## 3. CHARACTERS（キャラの指定。必要なものだけ使う）

色や形で迷ったら、文章ではなく **MASTER の絵** を見ること。

```text
ALL AFRO HORSES: a chibi cartoon horse MASCOT that stands and moves on TWO legs like a person, NOT on four legs. Body plan: an upright rounded body, TWO short arms with simple rounded hands, TWO short legs ending in dark hooves, and a short tuft tail. The head sits on top and is ROUND and flat-faced, with a small soft oval muzzle inside the lower face and two tiny nostril dots; the snout never sticks out forward. The mane is one ENORMOUS round fluffy afro wrapping the whole head, far bigger than the face, drawn as soft overlapping bumps. Two small pointed ears poke out of the afro. Simple black dot eyes. Thick even black outline, flat colours, almost no shading.

NEVER draw it as a four-legged horse, a pony or a foal.
```

```text
AFUWA (アフワ, the main character): cream / pale ivory body and face, dark chocolate-brown afro and tail, pink round cheek dots, light brown muzzle, worried droopy eyebrows and a small frown. Timid but trying.
```

```text
BURUMA (ブルマ): pure white body and face, bright sky-blue afro and tail, sharp angry-looking eyebrows, open cheeky grin. Cocky.
```

```text
CHAFUWA (チャフワ): warm milk-brown body, cream muzzle, reddish-brown terracotta afro and tail, big round open-mouth smile. Cheerful.
```

```text
GINMA (ギンマ): pale off-white body, grey muzzle, silver-grey afro and tail, heavy-lidded half-closed eyes and a flat mouth. Cool and unimpressed.
```

```text
KUROFUWA (クロフワ): dark grey body with a lighter grey muzzle, very dark NAVY-BLUE afro and tail (not pure black), thick angry eyebrows, stern frown. The scary one.
```

```text
YANCHA (ヤンチャ): cream body, GOLDEN-YELLOW afro and tail, narrowed mischievous eyes, a straw or grass stalk held in the corner of its mouth (allowed). The troublemaker.
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

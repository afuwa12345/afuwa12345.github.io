# -*- coding: utf-8 -*-
u"""アフロくずしの2x2シートを切って images/kuzushi/ に入れる。

    python _art/kuzushi/cut.py

ふつうの split4.py を使わないのは、ブロックとヒビを**同じ台紙**に揃える必要があるから。
1枚ずつ余白を詰めると、並べたときに高さが跳ねるし、ヒビがブロックからずれる。
"""
import os

import numpy as np
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SHEETS = os.path.join(ROOT, '_art', 'kuzushi', 'sheets')
OUT = os.path.join(ROOT, 'images', 'kuzushi')
A_MIN = 16


def cells(name):
    u"""2x2 を4つに割る。返すのは (画像, セルの幅, セルの高さ)。"""
    im = Image.open(os.path.join(SHEETS, name)).convert('RGBA')
    w, h = im.size
    box = [(0, 0, w // 2, h // 2), (w // 2, 0, w, h // 2),
           (0, h // 2, w // 2, h), (w // 2, h // 2, w, h)]
    return [im.crop(b) for b in box]


def bbox(cell):
    a = np.asarray(cell)[:, :, 3] >= A_MIN
    ys, xs = np.where(a)
    return (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)


def union(boxes):
    return (min(b[0] for b in boxes), min(b[1] for b in boxes),
            max(b[2] for b in boxes), max(b[3] for b in boxes))


def save(im, name, width, pad=6):
    u"""余白を少し足して、横幅をそろえて webp で出す。"""
    c = Image.new('RGBA', (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    c.paste(im, (pad, pad))
    h = max(1, int(round(c.height * width / float(c.width))))
    c = c.resize((width, h), Image.LANCZOS)
    p = os.path.join(OUT, name + '.webp')
    c.save(p, 'WEBP', quality=92, method=6)
    print('  %-14s %dx%d' % (name, c.width, c.height))


def same_canvas(cs, idx):
    u"""選んだセルを、同じ切り口で抜く。
    ひとつながりの動き（ヒビが育つ・パドルがつぶれる）に使う。
    セルの中での位置がそのまま残るので、重ねてもずれない。"""
    u = union([bbox(cs[i]) for i in idx])
    return [cs[i].crop(u) for i in idx]


def centered(cs, idx):
    u"""選んだセルを1枚ずつ詰めてから、いちばん大きい台紙のまん中に置きなおす。
    別々の絵を入れかえて使うもの（ブロック4種）に使う。
    シートの行ごとに上下の位置が少しずれていても、これでそろう。"""
    cut = [cs[i].crop(bbox(cs[i])) for i in idx]
    w = max(c.width for c in cut)
    h = max(c.height for c in cut)
    out = []
    for c in cut:
        base = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        base.paste(c, ((w - c.width) // 2, (h - c.height) // 2))
        out.append(base)
    return out


def main():
    if not os.path.isdir(OUT):
        os.makedirs(OUT)

    # --- ブロック4種。4つとも同じ台紙にそろえる ---
    print(u'ブロック')
    cs = cells('KUZUSHI_BLOCK.png')
    outs = centered(cs, [0, 1, 2, 3])
    for im, nm in zip(outs, ['b_afuwa', 'b_buruma', 'b_chafuwa', 'b_ginma']):
        save(im, nm, 320, pad=4)

    # --- ヒビ3段階。同じ台紙にそろえて、割れ目が「育つ」ように見せる ---
    print(u'ヒビ')
    cs = cells('KUZUSHI_CRACK.png')
    outs = same_canvas(cs, [0, 1, 2])
    for im, nm in zip(outs, ['crack1', 'crack2', 'crack3']):
        save(im, nm, 320, pad=4)
    save(cs[3].crop(bbox(cs[3])), 'burst', 360, pad=8)

    # --- パドルとボール。それぞれ2コマで1組なので、組ごとに台紙をそろえる ---
    print(u'パドルとボール')
    cs = cells('KUZUSHI_GEAR.png')
    for im, nm in zip(same_canvas(cs, [0, 1]), ['paddle', 'paddle_hit']):
        save(im, nm, 440, pad=4)
    for im, nm in zip(same_canvas(cs, [2, 3]), ['ball', 'ball_squash']):
        save(im, nm, 140, pad=3)

    # --- 背景。タイトル画面と遊ぶ画面の奥に敷く ---
    print(u'背景')
    bg = Image.open(os.path.join(SHEETS, 'KUZUSHI_BG.png')).convert('RGB')
    bg = bg.resize((1400, int(round(1400 * bg.height / float(bg.width)))), Image.LANCZOS)
    p = os.path.join(ROOT, 'images', 'bg', 'kuzushi.webp')
    bg.save(p, 'WEBP', quality=82, method=6)
    print('  %-14s %dx%d' % ('bg/kuzushi', bg.width, bg.height))


if __name__ == '__main__':
    main()

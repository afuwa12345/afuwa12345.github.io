# -*- coding: utf-8 -*-
u"""生成してもらった丸バッジ（文字なし）に、題字の帯を乗せてアイコンにする。

使い方:
    python _art/tools/badge.py <元のPNG> <題字> <出力パス>

例:
    python _art/tools/badge.py _art/race/sheets/RACE_ICON.png アフロ追い比べ images/icon/race.webp

文字は Codex に描かせると崩れるので、ここで乗せる。
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

SIZE = 640              # 作業中の大きさ。最後に 320 に落とす
OUT = 320
RED = (244, 71, 34, 255)
ORANGE = (255, 157, 50, 255)
INK = (17, 17, 17, 255)
WHITE = (255, 255, 255, 255)

FONTS = [
    r'C:\Windows\Fonts\YuGothB.ttc',
    r'C:\Windows\Fonts\meiryob.ttc',
    r'C:\Windows\Fonts\YuGothM.ttc',
    r'C:\Windows\Fonts\msgothic.ttc',
]


def pick_font(px):
    for p in FONTS:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, px)
            except Exception:
                pass
    raise SystemExit(u'日本語のフォントが見つからない')


def ribbon(d, w):
    u"""下のほうに帯を描く。丸の外に少しはみ出す（本物のアイコンもそう）。"""
    k = w / 320.0
    top, bot = 232 * k, 300 * k
    left, right = 20 * k, 300 * k
    mid = (top + bot) / 2
    pts = [
        (left, top + 8 * k), (w / 2, top - 14 * k), (right, top + 8 * k),
        (right - 10 * k, bot - 22 * k), (w / 2, bot + 8 * k), (left + 10 * k, bot - 22 * k),
    ]
    d.polygon(pts, fill=RED, outline=INK, width=int(7 * k))
    d.line([(left + 22 * k, top + 12 * k), (w / 2, top + 2 * k), (right - 22 * k, top + 12 * k)],
           fill=ORANGE, width=int(5 * k), joint='curve')
    return mid


def main(src, title, out):
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    src = src if os.path.isabs(src) else os.path.join(root, src)
    out = out if os.path.isabs(out) else os.path.join(root, out)

    im = Image.open(src).convert('RGBA').resize((SIZE, SIZE), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    mid = ribbon(d, SIZE)

    # 帯に収まる大きさまで字を小さくする
    limit = SIZE * 0.74
    px = int(SIZE * 0.125)
    while px > 10:
        f = pick_font(px)
        box = d.textbbox((0, 0), title, font=f, stroke_width=int(px * 0.22))
        if (box[2] - box[0]) <= limit:
            break
        px -= 2
    f = pick_font(px)
    d.text((SIZE / 2, mid), title, font=f, fill=WHITE, anchor='mm',
           stroke_width=int(px * 0.22), stroke_fill=INK)

    im = im.resize((OUT, OUT), Image.LANCZOS)
    im.save(out, 'WEBP', quality=92, method=6)
    print(u'%s  %dpx の字  %.0fKB' % (os.path.basename(out), px, os.path.getsize(out) / 1024.))


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2], sys.argv[3])

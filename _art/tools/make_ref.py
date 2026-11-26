# -*- coding: utf-8 -*-
u"""キャラ設定シートを、サイトにある本物の絵から組み立てる。
   これを Codex に添付して描かせる。文章の説明だけだと別のキャラになる。

   使い方:  python _art/tools/make_ref.py
"""
import io, os
from PIL import Image, ImageDraw, ImageFont

SITE = u'C:/Users/axlko/OneDrive/デスクトップ/アフロ馬サイト/00_サイト本体'
W, H = 1536, 1100
BG = (255, 255, 255, 255)
INK = (26, 14, 22, 255)
GREY = (120, 110, 115, 255)

FONTS = [r'C:\Windows\Fonts\YuGothB.ttc', r'C:\Windows\Fonts\meiryob.ttc',
         r'C:\Windows\Fonts\msgothic.ttc']


def font(px):
    for p in FONTS:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, px)
            except Exception:
                pass
    raise SystemExit(u'フォントが無い')


def put(sheet, path, box, label, d, fs=26):
    u"""box = (x, y, w, h) の中に、縦横そのままで収める。下に名前。"""
    im = Image.open(os.path.join(SITE, path)).convert('RGBA')
    x, y, bw, bh = box
    k = min(bw / float(im.width), bh / float(im.height))
    nw, nh = max(1, int(im.width * k)), max(1, int(im.height * k))
    im = im.resize((nw, nh), Image.LANCZOS)
    sheet.alpha_composite(im, (int(x + (bw - nw) / 2), int(y + (bh - nh) / 2)))
    if label:
        d.text((x + bw / 2, y + bh + 10), label, font=font(fs), fill=INK, anchor='ma')


sheet = Image.new('RGBA', (W, H), BG)
d = ImageDraw.Draw(sheet)

d.text((W / 2, 28), u'AFRO HORSE キャラクター設定シート', font=font(40), fill=INK, anchor='ma')
d.text((W / 2, 80), u'この絵のデザインがすべて。顔の作り・体の形・色を、そのまま写すこと',
       font=font(24), fill=GREY, anchor='ma')

# ---- 1段目：顔 ----
d.text((40, 130), u'顔（この丸い頭の作りが基本。鼻先は前に突き出さない）', font=font(26), fill=INK)
heads = [('afuwa', u'アフワ'), ('buruma', u'ブルマ'), ('chafuwa', u'チャフワ'),
         ('ginma', u'ギンマ'), ('kurofuwa', u'クロフワ'), ('yancha', u'ヤンチャ')]
for i, (f, nm) in enumerate(heads):
    put(sheet, u'images/face/%s.webp' % f, (40 + i * 248, 172, 220, 200), nm, d)

# ---- 2段目：体 ----
d.text((40, 440), u'体（二本脚で立つ。腕が2本、脚が2本、しっぽ）', font=font(26), fill=INK)
put(sheet, u'images/battle/afuwa_battle.png', (40, 482, 260, 300), u'アフワ 立ち姿', d)
put(sheet, u'images/battle/buruma_battle.png', (320, 482, 260, 300), u'ブルマ 立ち姿', d)
put(sheet, u'images/battle/chafuwa_battle.png', (600, 482, 260, 300), u'チャフワ 立ち姿', d)
put(sheet, u'images/battle/ginma_battle.png', (880, 482, 260, 300), u'ギンマ 立ち姿', d)
put(sheet, u'images/maker/base.webp', (1160, 482, 300, 300), u'体の作り（色は見本）', d)

# ---- 3段目：動き ----
d.text((40, 830), u'動き（走る・跳ぶ。体は立てたまま。四つ足にはならない）', font=font(26), fill=INK)
put(sheet, u'images/game/run_afuwa.webp', (40, 872, 260, 180), u'走る', d)
put(sheet, u'images/game/jump_afuwa.webp', (320, 872, 260, 180), u'跳ぶ', d)
put(sheet, u'images/game/crash_afuwa.webp', (600, 872, 260, 180), u'ころぶ', d)
put(sheet, u'images/find/afuwa_odoroki.webp', (880, 872, 200, 180), u'おどろく', d)
put(sheet, u'images/find/afuwa_warai.webp', (1100, 872, 200, 180), u'わらう', d)

out = os.path.join(SITE, u'_art/ref')
if not os.path.isdir(out):
    os.makedirs(out)
dst = os.path.join(out, u'AFRO_MASTER.png')
sheet.convert('RGB').save(dst, 'PNG', optimize=True)
print(u'設定シート %dx%d  %.0fKB' % (W, H, os.path.getsize(dst) / 1024.))


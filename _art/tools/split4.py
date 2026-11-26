# -*- coding: utf-8 -*-
u"""2x2 の透過シートを4枚に切って、余白を詰めて保存する。

使い方:
    python _art/tools/split4.py _art/race/split_map.json

split_map.json の形:
    {
      "sheets_dir": "_art/race/sheets",
      "out_dir": "_art/race/cut",
      "padding": 8,
      "sheets": [
        {"file": "RACE_RUN.png",
         "names": ["run_afuwa", "run_buruma", "run_chafuwa", "run_ginma"]}
      ]
    }

名前は 左上・右上・左下・右下 の順。
すでにあるファイルは上書きしない（飛ばして報告する）。
"""
import io
import json
import os
import sys

import numpy as np
from PIL import Image

ALPHA_MIN = 16          # これ未満のアルファはゴミとみなす
SEARCH = 0.18           # まん中から何割の範囲で切れ目をさがすか


def gap(occupied, center, span):
    u"""center にいちばん近い、何も描かれていない行（列）をさがす。"""
    lo = max(0, int(center - span))
    hi = min(len(occupied), int(center + span))
    best = None
    for i in range(lo, hi):
        if not occupied[i] and (best is None or abs(i - center) < abs(best - center)):
            best = i
    return center if best is None else best


def trim(cell, padding):
    a = np.asarray(cell)[:, :, 3]
    ys, xs = np.where(a >= ALPHA_MIN)
    if len(xs) == 0:
        return None
    x0 = max(0, xs.min() - padding)
    y0 = max(0, ys.min() - padding)
    x1 = min(cell.width, xs.max() + 1 + padding)
    y1 = min(cell.height, ys.max() + 1 + padding)
    return cell.crop((x0, y0, x1, y1))


def split(path, padding):
    im = Image.open(path).convert('RGBA')
    a = np.asarray(im)[:, :, 3] >= ALPHA_MIN
    rows = a.any(axis=1)
    cols = a.any(axis=0)
    cy = gap(rows, im.height // 2, im.height * SEARCH)
    cx = gap(cols, im.width // 2, im.width * SEARCH)
    boxes = [(0, 0, cx, cy), (cx, 0, im.width, cy),
             (0, cy, cx, im.height), (cx, cy, im.width, im.height)]
    return [trim(im.crop(b), padding) for b in boxes], (cx, cy)


def main(mapfile):
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    cfg = json.load(io.open(mapfile, encoding='utf-8'))
    sheets_dir = os.path.join(root, cfg['sheets_dir'])
    out_dir = os.path.join(root, cfg.get('out_dir', cfg['sheets_dir']))
    padding = int(cfg.get('padding', 8))
    if not os.path.isdir(out_dir):
        os.makedirs(out_dir)

    for sh in cfg['sheets']:
        src = os.path.join(sheets_dir, sh['file'])
        if not os.path.exists(src):
            print(u'ない: ' + sh['file'])
            continue
        cells, (cx, cy) = split(src, padding)
        print(u'%s  切れ目 x=%d y=%d' % (sh['file'], cx, cy))
        for cell, name in zip(cells, sh['names']):
            dst = os.path.join(out_dir, name + '.png')
            if cell is None:
                print(u'  からっぽ: ' + name)
            elif os.path.exists(dst):
                print(u'  すでにある（飛ばす）: ' + name)
            else:
                cell.save(dst)
                print(u'  %s  %dx%d' % (name, cell.width, cell.height))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1])

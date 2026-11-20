import React from 'react';
import {INK, STROKE} from '../config';
import {ICONS} from '../icons/Icons';
import type {CharacterConfig, Expression, IconName, Pose} from '../types';
import {GROUND, PANTS, POSES, SLEEVE, geo} from './geo';
import {Beard, FaceView, Garment, HairBack, HairFront, HeadBack, HeadFront} from './parts';

const CX = 150;
const rad = (d: number) => (d * Math.PI) / 180;
type P = [number, number];

const Cap: React.FC<{a: P; b: P; w: number; c: string}> = ({a, b, w, c}) => (
  <>
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK} strokeWidth={w + STROKE * 2} strokeLinecap="round" />
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeLinecap="round" />
  </>
);
const step = (p: P, sg: number, ang: number, len: number): P => [p[0] + sg * Math.sin(rad(ang)) * len, p[1] + Math.cos(rad(ang)) * len];
const PAT: (0 | 1 | 2)[] = [1, 2, 1, 0, 2, 1, 2, 0];

export type CharacterProps = {
  cfg: CharacterConfig;
  x: number; // পর্দায় ক্যারেক্টারের কেন্দ্র-x (px)
  feetY: number; // পায়ের গোড়ালির y (px)
  scale: number; // px প্রতি ডিজাইন-ইউনিট
  frame: number;
  expr?: Expression;
  pose?: Pose;
  speaking?: boolean;
  holding?: IconName | null;
  tremble?: boolean;
  flip?: boolean;
  opacity?: number;
  seed?: number;
};

export const Character: React.FC<CharacterProps> = ({cfg, x, feetY, scale, frame, expr = 'neutral', pose = 'idle', speaking, holding, tremble, flip, opacity = 1, seed = 0}) => {
  const g = geo(cfg.base);
  const o = cfg.outfit;
  const sleeve = SLEEVE[o.type];
  const sleeveC = o.type === 'overall' || o.type === 'saree' ? o.color2 ?? '#ffffff' : o.color;
  const pantsC = o.pants ?? (PANTS[o.type] || o.color);

  // পোজ + ফ্রেম-ভিত্তিক মুভমেন্ট
  const pd = POSES[pose];
  let aL: P = [...pd.aL];
  let aR: P = [...pd.aR];
  let lL = pd.lL;
  let lR = pd.lR;
  let bob = Math.sin(frame / 18 + seed) * 4; // ভাসমান/শ্বাস
  if (pose === 'walk') {
    const sw = Math.sin(frame / 5) * 28;
    aL = [sw, sw];
    aR = [-sw, -sw];
    lL = Math.max(0, sw) * 0.9 + 4;
    lR = Math.max(0, -sw) * 0.9 + 4;
    bob = -Math.abs(Math.sin(frame / 5)) * 6;
  }
  if (pose === 'wave') aR = [aR[0], aR[1] + Math.sin(frame / 3) * 18];
  const jx = tremble ? Math.sin(frame * 3.1) * 3.5 : 0;
  const drop = pd.sit ? g.leg * 0.32 : 0;
  const hipY = g.hipY + drop;
  const dy = drop; // ধড় ও মাথা নিচে নামবে
  const talk = speaking ? PAT[Math.floor(frame / 3) % PAT.length] : 0;

  // হাত ও পা
  const sy = g.top + dy + 22;
  const sxL = CX - g.tw / 2 + 2;
  const sxR = CX + g.tw / 2 - 2;
  const upC = sleeveC;
  const loC = sleeve === 'long' ? sleeveC : cfg.skin;
  const armPts = (sx: number, sg: number, a: P) => {
    const e1 = step([sx, sy], sg, a[0], g.arm);
    return {e1, e2: step(e1, sg, a[1], g.arm)};
  };
  const L = armPts(sxL, -1, aL);
  const R = armPts(sxR, 1, aR);
  const hand = (p: P) => <circle cx={p[0]} cy={p[1]} r={g.aw * 0.62} fill={cfg.skin} stroke={INK} strokeWidth={STROKE} />;
  const legX = g.tw * 0.22;
  const legLen = pd.sit ? (g.leg - drop) / Math.cos(rad(20)) : g.leg;
  const foot = (hx: number, sg: number, a: number): P => step([hx, hipY], sg, a, legLen);
  const fL = foot(CX - legX, -1, lL);
  const fR = foot(CX + legX, 1, lR);
  const shorts = !!o.shorts;
  const shoe = (p: P, sg: number) => <ellipse cx={p[0] + sg * 6} cy={p[1] + 3} rx={19} ry={9} fill="#3b3b3b" stroke={INK} strokeWidth={STROKE} />;
  const leg = (hx: number, f: P) => (
    <g>
      <Cap a={[hx, hipY]} b={f} w={g.lw} c={shorts ? cfg.skin : pantsC} />
      {shorts && <Cap a={[hx, hipY]} b={[hx + (f[0] - hx) * 0.5, hipY + (f[1] - hipY) * 0.5]} w={g.lw} c={pantsC} />}
    </g>
  );

  // ধরা প্রপ (ডান হাতে)
  const hp = R.e2;
  const itemSize = 64;

  return (
    <svg
      viewBox="-60 0 420 520"
      width={420 * scale}
      height={520 * scale}
      style={{position: 'absolute', left: x - 210 * scale, top: feetY - GROUND * scale, overflow: 'visible', opacity}}
    >
      <g transform={`${flip ? `translate(300 0) scale(-1 1)` : ''} translate(${jx} ${bob})`}>
        {pd.sit && (
          <g stroke={INK} strokeWidth={STROKE} fill="#b07a45">
            <rect x={CX - g.tw / 2 - 14} y={hipY + 6} width={g.tw + 28} height={14} rx={4} />
            <path d={`M ${CX - g.tw / 2 - 4} ${hipY + 20} V ${GROUND} M ${CX + g.tw / 2 + 4} ${hipY + 20} V ${GROUND}`} fill="none" strokeWidth={7} />
          </g>
        )}
        <HairBack cfg={cfg} g={g} />
        {leg(CX - legX, fL)}
        {leg(CX + legX, fR)}
        {shoe(fL, -1)}
        {shoe(fR, 1)}
        <g transform={`translate(0 ${dy})`}>
          <Garment o={o} g={g} skin={cfg.skin} />
          <HeadBack cfg={cfg} g={g} />
        </g>
        <Cap a={[sxL, sy]} b={L.e1} w={g.aw} c={upC} />
        <Cap a={L.e1} b={L.e2} w={g.aw} c={loC} />
        {hand(L.e2)}
        <Cap a={[sxR, sy]} b={R.e1} w={g.aw} c={upC} />
        <Cap a={R.e1} b={R.e2} w={g.aw} c={loC} />
        {hand(R.e2)}
        {holding && (
          <g transform={`translate(${hp[0] - itemSize / 2} ${hp[1] - itemSize * 0.8}) scale(${itemSize / 100})`}>{ICONS[holding]()}</g>
        )}
        <g transform={`translate(0 ${dy})`}>
          <rect x={CX - 13} y={g.top - 10} width={26} height={22} fill={cfg.skin} stroke={INK} strokeWidth={STROKE} />
          <rect x={CX - 11} y={g.top - 8} width={22} height={14} fill={cfg.skin} />
          <circle cx={CX - g.hrx + 1} cy={g.hcy + 6} r={10} fill={cfg.skin} stroke={INK} strokeWidth={STROKE} />
          <circle cx={CX + g.hrx - 1} cy={g.hcy + 6} r={10} fill={cfg.skin} stroke={INK} strokeWidth={STROKE} />
          <ellipse cx={CX} cy={g.hcy} rx={g.hrx} ry={g.hry} fill={cfg.skin} stroke={INK} strokeWidth={STROKE} />
          <Beard cfg={cfg} g={g} />
          <FaceView g={g} expr={expr} talk={talk as 0 | 1 | 2} frame={frame} seed={seed} />
          <HairFront cfg={cfg} g={g} />
          <HeadFront cfg={cfg} g={g} />
        </g>
      </g>
    </svg>
  );
};

import React from 'react';
import {INK, STROKE} from '../config';
import type {CharacterConfig, OutfitConfig} from '../types';
import {EXT, FACES, type Face, type Geo} from './geo';

const ST = {stroke: INK, strokeWidth: STROKE, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
const CX = 150;

// ───────── পোশাক (ধড়) ─────────
export const Garment: React.FC<{o: OutfitConfig; g: Geo; skin: string}> = ({o, g, skin}) => {
  const {top, th, tw, hipY} = g;
  const x = CX - tw / 2;
  const c = o.color;
  const c2 = o.color2 ?? '#ffffff';
  const ext = EXT[o.type];
  const bottom = top + th;
  return (
    <g>
      {o.type === 'hoodie' && <ellipse cx={CX} cy={top + 2} rx={36} ry={17} fill={c} {...ST} />}
      {ext > 0 && (
        <path d={`M ${x + 6} ${bottom - 14} L ${x - 8} ${hipY + ext} Q ${CX} ${hipY + ext + 10} ${x + tw + 8} ${hipY + ext} L ${x + tw - 6} ${bottom - 14} Z`} fill={c} {...ST} />
      )}
      <rect x={x} y={top} width={tw} height={th} rx={24} fill={o.type === 'overall' ? c2 : c} {...ST} />
      {o.type === 'tshirt' && <path d={`M ${CX - 17} ${top} Q ${CX} ${top + 24} ${CX + 17} ${top}`} fill={skin} {...ST} />}
      {o.type === 'shirt' && (
        <>
          <path d={`M ${CX} ${top + 4} L ${CX - 22} ${top - 2} L ${CX - 10} ${top + 28} Z M ${CX} ${top + 4} L ${CX + 22} ${top - 2} L ${CX + 10} ${top + 28} Z`} fill={c2} {...ST} />
          <path d={`M ${CX} ${top + 28} V ${bottom - 10}`} {...ST} />
          {[50, 80, 110].map((d) => <circle key={d} cx={CX} cy={top + d} r={3} fill={INK} />)}
          <rect x={x + 14} y={top + 46} width={24} height={26} rx={4} fill="none" {...ST} />
        </>
      )}
      {o.type === 'panjabi' && (
        <>
          <path d={`M ${CX} ${top} V ${top + 78}`} {...ST} />
          {[22, 44, 66].map((d) => <circle key={d} cx={CX} cy={top + d} r={3.5} fill={c2} {...ST} strokeWidth={2} />)}
          <path d={`M ${CX - 16} ${top + 2} Q ${CX} ${top + 14} ${CX + 16} ${top + 2}`} fill="none" {...ST} />
          <path d={`M ${CX} ${hipY + ext - 6} V ${hipY + ext + 8}`} {...ST} />
        </>
      )}
      {o.type === 'hoodie' && (
        <>
          <path d={`M ${CX - 10} ${top + 6} V ${top + 40} M ${CX + 10} ${top + 6} V ${top + 40}`} stroke={c2} strokeWidth={4} strokeLinecap="round" />
          <path d={`M ${x + 16} ${bottom - 52} H ${x + tw - 16} L ${x + tw - 8} ${bottom - 10} H ${x + 8} Z`} fill="none" {...ST} />
        </>
      )}
      {o.type === 'uniform' && (
        <>
          <path d={`M ${CX} ${top + 4} L ${CX - 22} ${top - 2} L ${CX - 8} ${top + 26} Z M ${CX} ${top + 4} L ${CX + 22} ${top - 2} L ${CX + 8} ${top + 26} Z`} fill="#fff" {...ST} />
          <path d={`M ${CX - 7} ${top + 18} L ${CX + 7} ${top + 18} L ${CX + 10} ${top + 80} L ${CX} ${top + 92} L ${CX - 10} ${top + 80} Z`} fill={o.color2 ?? '#c0392b'} {...ST} />
        </>
      )}
      {o.type === 'overall' && (
        <>
          <path d={`M ${x} ${top + 40} H ${x + tw} V ${bottom - 24} Q ${x + tw} ${bottom} ${x + tw - 24} ${bottom} H ${x + 24} Q ${x} ${bottom} ${x} ${bottom - 24} Z`} fill={c} {...ST} />
          <rect x={CX - tw * 0.26} y={top + 40} width={tw * 0.52} height={40} rx={4} fill={c} {...ST} />
          <path d={`M ${CX - tw * 0.26} ${top + 40} L ${CX - tw * 0.3} ${top + 4} M ${CX + tw * 0.26} ${top + 40} L ${CX + tw * 0.3} ${top + 4}`} stroke={INK} strokeWidth={9} strokeLinecap="round" />
          <path d={`M ${CX - tw * 0.26} ${top + 40} L ${CX - tw * 0.3} ${top + 4} M ${CX + tw * 0.26} ${top + 40} L ${CX + tw * 0.3} ${top + 4}`} stroke={c} strokeWidth={4} strokeLinecap="round" />
          <rect x={CX - 14} y={top + 52} width={28} height={18} rx={3} fill="none" {...ST} />
        </>
      )}
      {o.type === 'saree' && (
        <>
          <rect x={x} y={top} width={tw} height={46} rx={20} fill={c2} {...ST} />
          <path d={`M ${x + 4} ${top + 40} L ${x + 36} ${top + 40} L ${x + tw - 4} ${bottom - 6} L ${x + tw - 40} ${bottom - 6} Z`} fill={c} stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" opacity={0.95} />
          <path d={`M ${x + 28} ${top + 40} L ${x + tw + 2} ${bottom - 6}`} stroke={c2} strokeWidth={8} strokeLinecap="round" />
          <path d={`M ${x - 8} ${hipY + ext - 8} Q ${CX} ${hipY + ext + 2} ${x + tw + 8} ${hipY + ext - 8}`} fill="none" stroke={c2} strokeWidth={8} strokeLinecap="round" />
        </>
      )}
      {o.type === 'kameez' && (
        <>
          <path d={`M ${CX - 16} ${top} Q ${CX} ${top + 28} ${CX + 16} ${top}`} fill={skin} {...ST} />
          <path d={`M ${x - 6} ${hipY + ext - 8} Q ${CX} ${hipY + ext + 2} ${x + tw + 6} ${hipY + ext - 8}`} fill="none" stroke={c2} strokeWidth={8} strokeLinecap="round" />
        </>
      )}
      {o.type === 'suit' && (
        <>
          <path d={`M ${CX - 20} ${top} L ${CX + 20} ${top} L ${CX} ${top + 62} Z`} fill="#fff" {...ST} />
          <path d={`M ${CX - 6} ${top + 8} L ${CX + 6} ${top + 8} L ${CX + 9} ${top + 60} L ${CX} ${top + 70} L ${CX - 9} ${top + 60} Z`} fill={o.color2 ?? '#c0392b'} {...ST} />
          <path d={`M ${CX - 20} ${top} L ${CX - 28} ${top + 50} L ${CX - 4} ${top + 84} M ${CX + 20} ${top} L ${CX + 28} ${top + 50} L ${CX + 4} ${top + 84}`} fill="none" {...ST} />
          <path d={`M ${CX} ${top + 84} V ${bottom - 6}`} {...ST} />
        </>
      )}
    </g>
  );
};

// ───────── চুল ─────────
const cap = (cx: number, cy: number, rx: number, ry: number, fr: number) =>
  `M ${cx - rx - 2} ${cy - 6} Q ${cx - rx - 2} ${cy - ry - 16} ${cx} ${cy - ry - 14} Q ${cx + rx + 2} ${cy - ry - 16} ${cx + rx + 2} ${cy - 6} Q ${cx + rx * 0.6} ${cy - ry * fr} ${cx} ${cy - ry * (fr + 0.06)} Q ${cx - rx * 0.6} ${cy - ry * fr} ${cx - rx - 2} ${cy - 6} Z`;

export const HairBack: React.FC<{cfg: CharacterConfig; g: Geo}> = ({cfg, g}) => {
  if (cfg.hair?.style !== 'long' || cfg.accessories?.includes('hijab')) return null;
  const {hcy, hrx, hry, top} = g;
  return <path d={`M ${CX - hrx - 8} ${hcy} Q ${CX - hrx - 14} ${top + 50} ${CX - hrx + 6} ${top + 56} H ${CX + hrx - 6} Q ${CX + hrx + 14} ${top + 50} ${CX + hrx + 8} ${hcy} Q ${CX} ${hcy - hry - 24} ${CX - hrx - 8} ${hcy} Z`} fill={cfg.hair.color} {...ST} />;
};

export const HairFront: React.FC<{cfg: CharacterConfig; g: Geo}> = ({cfg, g}) => {
  const h = cfg.hair;
  if (!h || h.style === 'none' || cfg.accessories?.includes('hijab')) return null;
  const {hcy, hrx, hry} = g;
  const f = {fill: h.color, ...ST};
  switch (h.style) {
    case 'short': return <path d={cap(CX, hcy, hrx, hry, 0.55)} {...f} />;
    case 'side': return <path d={`M ${CX - hrx - 2} ${hcy - 6} Q ${CX - hrx - 2} ${hcy - hry - 16} ${CX} ${hcy - hry - 14} Q ${CX + hrx + 2} ${hcy - hry - 16} ${CX + hrx + 2} ${hcy - 6} Q ${CX + hrx * 0.5} ${hcy - hry * 0.7} ${CX - hrx * 0.2} ${hcy - hry * 0.5} Q ${CX - hrx * 0.7} ${hcy - hry * 0.45} ${CX - hrx - 2} ${hcy - 6} Z`} {...f} />;
    case 'long': return <path d={cap(CX, hcy, hrx, hry, 0.62)} {...f} />;
    case 'bun': return (<><circle cx={CX} cy={hcy - hry - 18} r={19} {...f} /><path d={cap(CX, hcy, hrx, hry, 0.58)} {...f} /></>);
    case 'curly': return (<>{Array.from({length: 7}, (_, i) => { const a = Math.PI + (Math.PI * (i + 0.5)) / 7; return <circle key={i} cx={CX + Math.cos(a) * (hrx + 2)} cy={hcy - 4 + Math.sin(a) * (hry + 2)} r={17} {...f} />; })}<path d={cap(CX, hcy, hrx - 6, hry - 4, 0.58)} fill={h.color} stroke="none" /></>);
    case 'elder': return (<><ellipse cx={CX - hrx + 2} cy={hcy - 6} rx={9} ry={16} {...f} /><ellipse cx={CX + hrx - 2} cy={hcy - 6} rx={9} ry={16} {...f} /></>);
    default: return null;
  }
};

// ───────── অ্যাক্সেসরি ─────────
export const HeadBack: React.FC<{cfg: CharacterConfig; g: Geo}> = ({cfg, g}) => {
  if (!cfg.accessories?.includes('hijab')) return null;
  const {hcy, hrx, hry, top} = g;
  return <path d={`M ${CX - hrx - 12} ${hcy + 4} Q ${CX - hrx - 16} ${hcy - hry - 18} ${CX} ${hcy - hry - 18} Q ${CX + hrx + 16} ${hcy - hry - 18} ${CX + hrx + 12} ${hcy + 4} Q ${CX + hrx + 22} ${top + 40} ${CX + hrx + 8} ${top + 62} H ${CX - hrx - 8} Q ${CX - hrx - 22} ${top + 40} ${CX - hrx - 12} ${hcy + 4} Z`} fill={cfg.accColor ?? '#7c5cbf'} {...ST} />;
};

export const Beard: React.FC<{cfg: CharacterConfig; g: Geo}> = ({cfg, g}) => {
  if (!cfg.accessories?.includes('beard')) return null;
  const {hcy, hrx, hry} = g;
  const col = cfg.hair?.color ?? '#333';
  return (
    <g>
      <path d={`M ${CX - hrx + 3} ${hcy + 2} Q ${CX - hrx + 6} ${hcy + hry + 18} ${CX} ${hcy + hry + 20} Q ${CX + hrx - 6} ${hcy + hry + 18} ${CX + hrx - 3} ${hcy + 2} Q ${CX + hrx * 0.5} ${hcy + hry * 0.3} ${CX} ${hcy + hry * 0.3} Q ${CX - hrx * 0.5} ${hcy + hry * 0.3} ${CX - hrx + 3} ${hcy + 2} Z`} fill={col} {...ST} />
      <ellipse cx={CX} cy={hcy + hry * 0.52} rx={19} ry={11} fill={cfg.skin} />
    </g>
  );
};

export const HeadFront: React.FC<{cfg: CharacterConfig; g: Geo}> = ({cfg, g}) => {
  const acc = cfg.accessories ?? [];
  const {hcy, hrx, hry} = g;
  const ac = cfg.accColor;
  return (
    <g>
      {acc.includes('mustache') && <path d={`M ${CX} ${hcy + hry * 0.3} Q ${CX - 16} ${hcy + hry * 0.18} ${CX - 24} ${hcy + hry * 0.38} Q ${CX - 10} ${hcy + hry * 0.36} ${CX} ${hcy + hry * 0.38} Q ${CX + 10} ${hcy + hry * 0.36} ${CX + 24} ${hcy + hry * 0.38} Q ${CX + 16} ${hcy + hry * 0.18} ${CX} ${hcy + hry * 0.3} Z`} fill={cfg.hair?.color ?? '#333'} {...ST} strokeWidth={2} />}
      {acc.includes('glasses') && (
        <g fill="rgba(255,255,255,0.35)" stroke={INK} strokeWidth={3.5}>
          <circle cx={CX - hrx * 0.4} cy={hcy - 2} r={15} /><circle cx={CX + hrx * 0.4} cy={hcy - 2} r={15} />
          <path d={`M ${CX - hrx * 0.4 + 15} ${hcy - 4} Q ${CX} ${hcy - 10} ${CX + hrx * 0.4 - 15} ${hcy - 4}`} fill="none" />
        </g>
      )}
      {acc.includes('hijab') && (
        <path d={`M ${CX - hrx - 12} ${hcy + 4} Q ${CX - hrx - 16} ${hcy - hry - 18} ${CX} ${hcy - hry - 18} Q ${CX + hrx + 16} ${hcy - hry - 18} ${CX + hrx + 12} ${hcy + 4} L ${CX + hrx - 2} ${hcy + 6} Q ${CX + hrx - 4} ${hcy - hry * 0.7} ${CX} ${hcy - hry * 0.72} Q ${CX - hrx + 4} ${hcy - hry * 0.7} ${CX - hrx + 2} ${hcy + 6} Z`} fill={ac ?? '#7c5cbf'} {...ST} />
      )}
      {acc.includes('cap') && (
        <g fill={ac ?? '#c0392b'} {...ST}>
          <path d={`M ${CX - hrx - 3} ${hcy - 10} Q ${CX - hrx} ${hcy - hry - 26} ${CX} ${hcy - hry - 24} Q ${CX + hrx} ${hcy - hry - 26} ${CX + hrx + 3} ${hcy - 10} Z`} />
          <path d={`M ${CX - hrx - 3} ${hcy - 10} Q ${CX + 10} ${hcy - 4} ${CX + hrx + 30} ${hcy - 8} Q ${CX + hrx + 28} ${hcy - 18} ${CX + hrx + 3} ${hcy - 16} Z`} />
        </g>
      )}
      {acc.includes('topi') && (
        <g>
          <path d={`M ${CX - hrx * 0.82} ${hcy - hry * 0.62} Q ${CX - hrx * 0.8} ${hcy - hry - 18} ${CX} ${hcy - hry - 18} Q ${CX + hrx * 0.8} ${hcy - hry - 18} ${CX + hrx * 0.82} ${hcy - hry * 0.62} Z`} fill={ac ?? '#f4f4f4'} {...ST} />
          {[-0.4, 0, 0.4].map((k) => <circle key={k} cx={CX + hrx * k} cy={hcy - hry * 0.82} r={2.6} fill="#9aa" />)}
        </g>
      )}
    </g>
  );
};

// ───────── মুখ ─────────
const MOUTH = (m: Face['mouth']) => {
  switch (m) {
    case 'smallSmile': return <path d="M -10 0 Q 0 8 10 0" fill="none" {...ST} strokeWidth={3} />;
    case 'grin': return <path d="M -14 -2 Q 0 24 14 -2 Z" fill="#8b2b2b" {...ST} strokeWidth={3} />;
    case 'frown': return <path d="M -11 6 Q 0 -5 11 6" fill="none" {...ST} strokeWidth={3} />;
    case 'flat': return <path d="M -9 2 L 9 2" fill="none" {...ST} strokeWidth={3} />;
    case 'o': return <ellipse cx={0} cy={3} rx={8} ry={10} fill="#8b2b2b" {...ST} strokeWidth={3} />;
    case 'wavy': return <path d="M -12 3 Q -6 -3 0 3 T 12 3" fill="none" {...ST} strokeWidth={3} />;
    case 'cry': return <path d="M -13 8 Q 0 -10 13 8 Z" fill="#8b2b2b" {...ST} strokeWidth={3} />;
  }
};

export const FaceView: React.FC<{g: Geo; expr: keyof typeof FACES; talk: 0 | 1 | 2; frame: number; seed: number}> = ({g, expr, talk, frame, seed}) => {
  const f = FACES[expr];
  const {hcy, hrx, hry} = g;
  const ex = hrx * 0.4;
  const ey = hcy - 2;
  const blink = (frame + seed * 23) % 110 < 4;
  const [lx, ly] = f.look ?? [0, 0];
  const eye = (sx: -1 | 1) => {
    const x = CX + sx * ex;
    if (f.eye === 'happy') return <path d={`M ${x - 9} ${ey + 3} Q ${x} ${ey - 9} ${x + 9} ${ey + 3}`} fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />;
    if (f.eye === 'closed') return <path d={`M ${x - 9} ${ey} Q ${x} ${ey + 7} ${x + 9} ${ey}`} fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />;
    const wide = f.eye === 'wide';
    return (
      <g>
        <ellipse cx={x + lx} cy={ey + ly} rx={wide ? 9 : 7} ry={blink ? 1.2 : wide ? 11 : 8.5} fill={INK} />
        {!blink && <circle cx={x + lx + 2.5} cy={ey + ly - 3} r={2.3} fill="#fff" />}
      </g>
    );
  };
  const brow = (sx: -1 | 1) => {
    const x = CX + sx * ex;
    const by = ey - 19 + f.by;
    return <g transform={`rotate(${sx === -1 ? f.bl : f.br} ${x} ${by})`}><line x1={x - 11} y1={by} x2={x + 11} y2={by} stroke={INK} strokeWidth={4} strokeLinecap="round" /></g>;
  };
  const my = hcy + hry * 0.5;
  const ty = (frame % 24) * 1.6;
  return (
    <g>
      {f.blush && [-1, 1].map((s) => <ellipse key={s} cx={CX + s * ex * 1.5} cy={hcy + hry * 0.28} rx={9} ry={5.5} fill="#f6a5a5" opacity={0.7} />)}
      {eye(-1)}{eye(1)}{brow(-1)}{brow(1)}
      <g transform={`translate(${CX} ${my})`}>
        {talk === 0 ? MOUTH(f.mouth) : <ellipse cx={0} cy={3} rx={talk === 1 ? 10 : 12} ry={talk === 1 ? 6 : 12} fill="#8b2b2b" {...ST} strokeWidth={3} />}
      </g>
      {f.tear && [-1, 1].map((s) => <ellipse key={s} cx={CX + s * ex} cy={ey + 14 + ty} rx={4} ry={6} fill="#5bb6ff" opacity={Math.max(0, 1 - ty / 40)} />)}
      {f.sweat && <ellipse cx={CX + hrx * 0.9} cy={hcy - hry * 0.4 + (frame % 30) * 0.4} rx={4.5} ry={7} fill="#8fd3ff" stroke={INK} strokeWidth={1.8} />}
    </g>
  );
};

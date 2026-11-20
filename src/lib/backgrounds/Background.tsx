import React from 'react';
import {INK, PAL} from '../config';
import {useLayout} from '../layout';
import type {BgSpec} from '../types';

const ST = {stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const};

// দিন/রাতের রঙ
const TONE = {
  day: {sky1: '#9fd6ff', sky2: '#e8f6ff', wall: '#f3e3c3', wall2: '#e4cfa5', floor: '#c89f6d', ground: '#7bc96f', road: '#5a5f6b', glass: '#bfe6ff', build: ['#c9d6e8', '#e6c9c9', '#d6e8c9']},
  night: {sky1: '#101a38', sky2: '#2b3a67', wall: '#4a4560', wall2: '#3b3650', floor: '#3a3040', ground: '#2f5a3f', road: '#2a2d36', glass: '#f6d77a', build: ['#39425f', '#47405f', '#35455a']},
};

export const Background: React.FC<{spec: BgSpec}> = ({spec}) => {
  const {W, H, horizonY: h0} = useLayout();
  const t = TONE[spec.variant ?? 'day'];
  const night = spec.variant === 'night';
  const full = {position: 'absolute' as const, left: 0, top: 0, width: '100%', height: '100%'};
  const sky = (
    <>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={t.sky1} /><stop offset="1" stopColor={t.sky2} /></linearGradient>
      </defs>
      <rect width={W} height={h0} fill="url(#sky)" />
    </>
  );
  const sun = night ? <circle cx={W * 0.82} cy={h0 * 0.2} r={W * 0.05} fill="#FFE9A8" {...ST} /> : <circle cx={W * 0.82} cy={h0 * 0.2} r={W * 0.06} fill="#FFD84D" {...ST} />;
  const floor = (c: string) => <rect x={0} y={h0} width={W} height={H - h0} fill={c} />;
  const wall = <rect width={W} height={h0} fill={t.wall} />;
  const win = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={t.glass} {...ST} strokeWidth={5} />
      <path d={`M ${x + w / 2} ${y} V ${y + h} M ${x} ${y + h / 2} H ${x + w}`} {...ST} />
    </g>
  );
  let body: React.ReactNode = null;

  switch (spec.type) {
    case 'home':
      body = (
        <>
          {wall}<rect y={h0 - 18} width={W} height={18} fill={t.wall2} />{floor(t.floor)}
          {win(W * 0.1, h0 * 0.18, W * 0.26, h0 * 0.38)}
          <rect x={W * 0.62} y={h0 * 0.2} width={W * 0.18} height={h0 * 0.22} rx={6} fill="#fff" {...ST} />
          <path d={`M ${W * 0.64} ${h0 * 0.38} l ${W * 0.05} -${h0 * 0.1} l ${W * 0.04} ${h0 * 0.06} l ${W * 0.03} -${h0 * 0.04} l ${W * 0.03} ${h0 * 0.08} Z`} fill={PAL.green} {...ST} />
          <rect x={W * 0.56} y={h0 - H * 0.12} width={W * 0.4} height={H * 0.12} rx={18} fill="#6c8ebf" {...ST} />
        </>
      );
      break;
    case 'shop':
      body = (
        <>
          {wall}
          {[0.2, 0.42, 0.64].map((k, r) => (
            <g key={r}>
              <rect x={W * 0.05} y={h0 * k + 24} width={W * 0.9} height={10} fill="#8b5a2b" {...ST} />
              {Array.from({length: 9}, (_, i) => (
                <rect key={i} x={W * 0.07 + i * (W * 0.1)} y={h0 * k - 20} width={W * 0.07} height={44} rx={6} fill={[PAL.red, PAL.blue, PAL.orange, PAL.green][(i + r) % 4]} {...ST} />
              ))}
            </g>
          ))}
          {floor('#d8c3a0')}
          <rect x={0} y={h0 - 6} width={W} height={H * 0.1} fill="#8b5a2b" {...ST} />
          <path d={`M 0 0 H ${W} V ${H * 0.05} ${Array.from({length: 10}, (_, i) => `q ${-W / 20} ${H * 0.03} ${-W / 10} 0`).join(' ')} Z`} fill={PAL.red} {...ST} />
        </>
      );
      break;
    case 'road':
      body = (
        <>
          {sky}{night ? sun : null}
          {Array.from({length: 6}, (_, i) => {
            const bw = W / 5;
            const bh = h0 * (0.3 + ((i * 37) % 30) / 100);
            return (
              <g key={i}>
                <rect x={i * bw - 10} y={h0 - bh} width={bw - 6} height={bh} fill={t.build[i % 3]} {...ST} />
                {[0.2, 0.5].flatMap((fy) => [0.25, 0.6].map((fx) => <rect key={`${fy}${fx}`} x={i * bw - 10 + bw * fx} y={h0 - bh + bh * fy} width={bw * 0.18} height={bh * 0.14} fill={t.glass} />))}
              </g>
            );
          })}
          <rect y={h0} width={W} height={H - h0} fill={t.road} />
          <rect y={h0} width={W} height={H * 0.025} fill="#b9b9b9" {...ST} />
          {Array.from({length: 6}, (_, i) => <rect key={i} x={i * (W / 5) + 20} y={h0 + (H - h0) * 0.55} width={W / 10} height={10} fill="#fff" />)}
        </>
      );
      break;
    case 'village':
    case 'nature':
      body = (
        <>
          {sky}{sun}
          <ellipse cx={W * 0.2} cy={h0} rx={W * 0.45} ry={h0 * 0.28} fill={night ? '#264d36' : '#8fd48a'} {...ST} />
          <ellipse cx={W * 0.8} cy={h0} rx={W * 0.5} ry={h0 * 0.2} fill={night ? '#2b5a40' : '#a6df9e'} {...ST} />
          {floor(t.ground)}
          {spec.type === 'village' ? (
            <g>
              <rect x={W * 0.06} y={h0 - H * 0.12} width={W * 0.22} height={H * 0.12} fill="#e8c9a0" {...ST} />
              <path d={`M ${W * 0.03} ${h0 - H * 0.12} L ${W * 0.17} ${h0 - H * 0.2} L ${W * 0.31} ${h0 - H * 0.12} Z`} fill="#b5651d" {...ST} />
              <rect x={W * 0.15} y={h0 - H * 0.075} width={W * 0.05} height={H * 0.075} fill="#7a4a1d" {...ST} />
            </g>
          ) : null}
          {[0.74, 0.9].map((k, i) => (
            <g key={i}>
              <rect x={W * k - 10} y={h0 - H * 0.1} width={20} height={H * 0.1 + 20} fill="#8b5a2b" {...ST} />
              <circle cx={W * k} cy={h0 - H * 0.14} r={H * 0.07} fill={PAL.green} {...ST} />
            </g>
          ))}
        </>
      );
      break;
    case 'office':
      body = (
        <>
          {wall}{floor('#9aa3b2')}
          {win(W * 0.08, h0 * 0.14, W * 0.5, h0 * 0.5)}
          {[0.14, 0.26, 0.4].map((k, i) => <rect key={i} x={W * (0.1 + k)} y={h0 * (0.64 - 0.1 - i * 0.07)} width={W * 0.07} height={h0 * (0.1 + i * 0.07)} fill="#8aa5c8" />)}
          <rect x={W * 0.62} y={h0 * 0.2} width={W * 0.3} height={h0 * 0.3} rx={6} fill="#fff" {...ST} />
          <path d={`M ${W * 0.65} ${h0 * 0.42} l ${W * 0.07} -${h0 * 0.1} l ${W * 0.06} ${h0 * 0.05} l ${W * 0.08} -${h0 * 0.12}`} fill="none" stroke={PAL.blue} strokeWidth={6} />
          <rect x={W * 0.05} y={h0 - H * 0.09} width={W * 0.9} height={H * 0.09} rx={8} fill="#a8774a" {...ST} />
          <rect x={W * 0.85} y={h0 - H * 0.2} width={W * 0.05} height={H * 0.11} rx={8} fill="#b9714a" {...ST} />
          <circle cx={W * 0.875} cy={h0 - H * 0.24} r={H * 0.045} fill={PAL.green} {...ST} />
        </>
      );
      break;
    case 'garage':
      body = (
        <>
          <rect width={W} height={h0} fill="#b9bec8" />{floor('#7d8390')}
          <rect x={W * 0.05} y={h0 * 0.12} width={W * 0.42} height={h0 * 0.42} fill="#8d6e4a" {...ST} />
          {Array.from({length: 5}, (_, i) => <rect key={i} x={W * 0.08 + i * W * 0.075} y={h0 * 0.2} width={14} height={h0 * 0.26} rx={6} fill="#cfd3da" {...ST} />)}
          <rect x={W * 0.56} y={h0 - H * 0.16} width={W * 0.4} height={H * 0.11} rx={22} fill={PAL.red} {...ST} />
          <path d={`M ${W * 0.62} ${h0 - H * 0.16} L ${W * 0.66} ${h0 - H * 0.22} H ${W * 0.84} L ${W * 0.88} ${h0 - H * 0.16} Z`} fill="#cbe6ff" {...ST} />
          {[0.64, 0.86].map((k) => <circle key={k} cx={W * k} cy={h0 - H * 0.05} r={H * 0.04} fill="#2e2e33" {...ST} />)}
        </>
      );
      break;
    case 'school':
      body = (
        <>
          {wall}{floor('#c9a46b')}
          <rect x={W * 0.1} y={h0 * 0.14} width={W * 0.55} height={h0 * 0.4} rx={6} fill="#2f6f55" stroke="#8b5a2b" strokeWidth={10} />
          <path d={`M ${W * 0.16} ${h0 * 0.28} q 40 -30 80 0 t 80 0 M ${W * 0.16} ${h0 * 0.4} h ${W * 0.3}`} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
          {win(W * 0.72, h0 * 0.16, W * 0.2, h0 * 0.34)}
          {[0.12, 0.62].map((k) => <rect key={k} x={W * k} y={h0 - H * 0.07} width={W * 0.26} height={H * 0.07} rx={6} fill="#b9814d" {...ST} />)}
        </>
      );
      break;
    case 'clean':
    default:
      body = (
        <>
          <defs>
            <radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset="0.6" stopColor="#ffffff00" /><stop offset="1" stopColor="#0000001c" /></radialGradient>
          </defs>
          <rect width={W} height={H} fill={spec.color ?? PAL.cream} />
          <rect width={W} height={H} fill="url(#vig)" />
        </>
      );
  }
  return (
    <svg style={full} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
      {body}
    </svg>
  );
};

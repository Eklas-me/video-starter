import React from 'react';
import {FONT, INK} from '../config';
import type {IconName} from '../types';

const S = {stroke: INK, strokeWidth: 4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
const star = (cx: number, cy: number, R: number, r: number) =>
  Array.from({length: 10}, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const k = i % 2 ? r : R;
    return `${cx + Math.cos(a) * k},${cy + Math.sin(a) * k}`;
  }).join(' ');
const heart = 'M50 84 C10 56 12 24 34 22 C44 22 50 30 50 34 C50 30 56 22 66 22 C88 24 90 56 50 84 Z';
const txt = (t: string, y: number, size: number, fill: string) => (
  <text x="50" y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill} fontFamily={FONT}>{t}</text>
);

export const ICONS: Record<IconName, () => React.ReactNode> = {
  coin: () => (<><circle cx="50" cy="50" r="38" fill="#FFC83D" {...S} /><circle cx="50" cy="50" r="27" fill="none" stroke="#D99A00" strokeWidth="3" />{txt('৳', 63, 36, '#9A6B00')}</>),
  money: () => (<><rect x="8" y="26" width="84" height="48" rx="6" fill="#5CC77D" {...S} /><circle cx="50" cy="50" r="13" fill="#B8EBC6" {...S} strokeWidth={3} /><circle cx="20" cy="38" r="3" fill={INK} /><circle cx="80" cy="62" r="3" fill={INK} /></>),
  clock: () => (<><circle cx="50" cy="50" r="38" fill="#fff" {...S} /><path d="M50 26 V50 L66 60" fill="none" {...S} /><circle cx="50" cy="50" r="4" fill={INK} /></>),
  calendar: () => (<><rect x="14" y="20" width="72" height="66" rx="8" fill="#fff" {...S} /><path d="M14 28 a8 8 0 0 1 8 -8 H78 a8 8 0 0 1 8 8 V42 H14 Z" fill="#E5484D" {...S} /><circle cx="32" cy="58" r="4" fill={INK} /><circle cx="50" cy="58" r="4" fill={INK} /><circle cx="68" cy="58" r="4" fill={INK} /><circle cx="32" cy="73" r="4" fill={INK} /><circle cx="50" cy="73" r="4" fill={INK} /></>),
  food: () => (<><path d="M12 52 H88 A38 32 0 0 1 12 52 Z" fill="#F5A25D" {...S} /><path d="M24 44 Q30 22 40 36 Q50 16 60 36 Q70 22 76 44 Z" fill="#fff" {...S} strokeWidth={3} /><path d="M38 14 q-6 -8 0 -12 M54 14 q-6 -8 0 -12" fill="none" stroke="#999" strokeWidth="3" strokeLinecap="round" /></>),
  book: () => (<><path d="M50 24 Q30 14 10 22 V78 Q30 70 50 80 Q70 70 90 78 V22 Q70 14 50 24 Z" fill="#4C8DF6" {...S} /><path d="M50 24 V80" stroke={INK} strokeWidth="3" /><path d="M20 38 Q32 34 42 40 M20 52 Q32 48 42 54 M58 40 Q68 34 80 38" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></>),
  key: () => (<><circle cx="30" cy="40" r="20" fill="#FFC83D" {...S} /><circle cx="30" cy="40" r="7" fill="#fff" {...S} strokeWidth={3} /><path d="M46 52 L86 84 M72 72 L64 82 M82 80 L74 90" fill="none" {...S} strokeWidth={8} /><path d="M46 52 L86 84" fill="none" stroke="#FFC83D" strokeWidth="3" strokeLinecap="round" /></>),
  phone: () => (<><rect x="28" y="8" width="44" height="84" rx="9" fill="#3A3F4B" {...S} /><rect x="33" y="18" width="34" height="58" rx="3" fill="#8FD3FF" /><circle cx="50" cy="84" r="3" fill="#fff" /></>),
  question: () => (<><circle cx="50" cy="50" r="40" fill="#8B5CF6" {...S} />{txt('?', 70, 62, '#fff')}</>),
  exclaim: () => (<><circle cx="50" cy="50" r="40" fill="#E5484D" {...S} />{txt('!', 70, 62, '#fff')}</>),
  bulb: () => (<><path d="M50 10 C26 10 18 36 30 52 C36 60 36 64 36 70 H64 C64 64 64 60 70 52 C82 36 74 10 50 10 Z" fill="#FFE066" {...S} /><rect x="36" y="70" width="28" height="14" rx="4" fill="#B8B8C0" {...S} /><path d="M42 91 H58" {...S} /><path d="M6 24 L16 30 M94 24 L84 30 M50 0 V4" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" /></>),
  heart: () => <path d={heart} fill="#EF4466" {...S} />,
  brokenHeart: () => (<><path d={heart} fill="#EF4466" {...S} /><path d="M50 34 L40 48 L56 56 L44 84" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" /></>),
  warning: () => (<><path d="M50 10 L92 84 H8 Z" fill="#FFC83D" {...S} />{txt('!', 76, 50, INK)}</>),
  check: () => (<><circle cx="50" cy="50" r="40" fill="#2FB170" {...S} /><path d="M30 52 L45 66 L72 36" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /></>),
  cross: () => (<><circle cx="50" cy="50" r="40" fill="#E5484D" {...S} /><path d="M33 33 L67 67 M67 33 L33 67" stroke="#fff" strokeWidth="9" strokeLinecap="round" /></>),
  house: () => (<><path d="M10 48 L50 14 L90 48 Z" fill="#E5484D" {...S} /><rect x="20" y="48" width="60" height="38" fill="#FFE0B5" {...S} /><rect x="42" y="60" width="16" height="26" fill="#8B5A2B" {...S} strokeWidth={3} /></>),
  car: () => (<><path d="M8 62 V48 Q8 42 16 40 L28 38 L38 22 H64 L76 38 L88 42 Q94 44 94 50 V62 Z" fill="#4C8DF6" {...S} /><path d="M40 28 H62 L70 38 H34 Z" fill="#CBE6FF" stroke={INK} strokeWidth="3" /><circle cx="28" cy="66" r="11" fill="#333" {...S} /><circle cx="76" cy="66" r="11" fill="#333" {...S} /></>),
  wrench: () => <path d="M70 14 A20 20 0 0 0 52 40 L14 78 A8 8 0 0 0 26 90 L64 52 A20 20 0 0 0 90 32 L76 44 L62 38 L56 24 Z" fill="#B8BCC6" {...S} />,
  gift: () => (<><rect x="14" y="40" width="72" height="46" rx="4" fill="#F472B6" {...S} /><rect x="10" y="28" width="80" height="16" rx="4" fill="#F9A8D4" {...S} /><path d="M50 28 V86" {...S} stroke="#FFD84D" strokeWidth="9" /><path d="M50 28 C30 6 18 24 50 28 C82 24 70 6 50 28" fill="#FFD84D" {...S} strokeWidth={3} /></>),
  star: () => <polygon points={star(50, 52, 42, 18)} fill="#FFC83D" {...S} />,
  lock: () => (<><path d="M30 44 V30 A20 20 0 0 1 70 30 V44" fill="none" {...S} strokeWidth={8} /><rect x="18" y="42" width="64" height="46" rx="8" fill="#FFC83D" {...S} /><circle cx="50" cy="62" r="6" fill={INK} /><path d="M50 64 V76" {...S} /></>),
  sun: () => (<><circle cx="50" cy="50" r="22" fill="#FFC83D" {...S} /><path d="M50 8 V20 M50 80 V92 M8 50 H20 M80 50 H92 M20 20 L28 28 M72 72 L80 80 M80 20 L72 28 M28 72 L20 80" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" /></>),
  moon: () => <path d="M66 12 A40 40 0 1 0 90 62 A32 32 0 0 1 66 12 Z" fill="#FFE9A8" {...S} />,
};

export const Icon: React.FC<{name: IconName; size?: number; style?: React.CSSProperties}> = ({name, size = 120, style}) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{overflow: 'visible', ...style}}>{ICONS[name]()}</svg>
);

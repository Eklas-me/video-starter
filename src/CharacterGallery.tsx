import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Character} from './lib/character/Character';
import {FONT, INK, PAL} from './lib/config';
import type {BaseType, CharacterConfig, Expression, OutfitType, Pose} from './lib/types';

// স্টুডিওতে সব বেস টাইপ, এক্সপ্রেশন, পোশাক ও পোজ এক নজরে দেখার জন্য
const BASES: BaseType[] = ['boy', 'girl', 'teen', 'man', 'woman', 'elderMan', 'elderWoman'];
const EXPRS: Expression[] = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'cry', 'thinking', 'worried'];
const OUTFITS: OutfitType[] = ['tshirt', 'shirt', 'panjabi', 'hoodie', 'uniform', 'overall', 'saree', 'kameez', 'suit'];
const POSES: Pose[] = ['idle', 'walk', 'point', 'hold', 'sit', 'wave', 'armsUp', 'handsFace', 'handsHips'];
const COLORS = ['#3B82F6', '#E5484D', '#2FB170', '#F59E0B', '#8B5CF6', '#F472B6', '#0f766e'];

const make = (base: BaseType, i: number, outfit: OutfitType = 'shirt'): CharacterConfig => ({
  base,
  skin: ['#f1c27d', '#e0ac69', '#c68642', '#8d5524'][i % 4],
  hair: {style: base === 'girl' || base === 'woman' ? 'long' : base.startsWith('elder') ? 'elder' : 'short', color: base.startsWith('elder') ? '#bdbdbd' : '#2b2118'},
  outfit: {type: outfit, color: COLORS[i % COLORS.length], color2: '#ffffff'},
  accessories: base === 'elderMan' ? ['glasses', 'beard'] : [],
});

const Label: React.FC<{x: number; y: number; t: string}> = ({x, y, t}) => (
  <div style={{position: 'absolute', left: x - 100, top: y, width: 200, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 22, color: INK}}>{t}</div>
);

export const CharacterGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const s = 0.56;
  const rows = [{y: 330, title: 'Base types'}, {y: 670, title: 'Expressions'}, {y: 1010, title: 'Outfits / Poses'}];
  return (
    <AbsoluteFill style={{background: PAL.cream}}>
      {BASES.map((b, i) => <React.Fragment key={b}><Character cfg={make(b, i)} x={(1920 / 7) * (i + 0.5)} feetY={rows[0].y} scale={s} frame={frame} /><Label x={(1920 / 7) * (i + 0.5)} y={rows[0].y + 6} t={b} /></React.Fragment>)}
      {EXPRS.map((e, i) => <React.Fragment key={e}><Character cfg={make('woman', 4)} x={(1920 / 8) * (i + 0.5)} feetY={rows[1].y} scale={s} frame={frame} expr={e} speaking={e === 'happy'} /><Label x={(1920 / 8) * (i + 0.5)} y={rows[1].y + 6} t={e} /></React.Fragment>)}
      {OUTFITS.map((o, i) => <React.Fragment key={o}><Character cfg={make(o === 'saree' || o === 'kameez' ? 'woman' : 'man', i, o)} x={(1920 / 9) * (i + 0.5)} feetY={rows[2].y - 90} scale={s * 0.62} frame={frame} pose={POSES[i]} /><Label x={(1920 / 9) * (i + 0.5)} y={rows[2].y - 84} t={`${o} / ${POSES[i]}`} /></React.Fragment>)}
    </AbsoluteFill>
  );
};

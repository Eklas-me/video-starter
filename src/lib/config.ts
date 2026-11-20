import {loadFont} from '@remotion/google-fonts/HindSiliguri';

export const FPS = 30;
export const FORMATS = {
  vertical: {w: 1080, h: 1920, suffix: '9x16'},
  horizontal: {w: 1920, h: 1080, suffix: '16x9'},
} as const;
export type Format = keyof typeof FORMATS;

const {fontFamily} = loadFont('normal', {weights: ['500', '700'], subsets: ['bengali', 'latin']});
export const FONT = `${fontFamily}, sans-serif`;

export const INK = '#222222';
export const STROKE = 2.5;
export const PAL = {
  accent: '#FFD84D',
  red: '#E5484D',
  green: '#2FB170',
  blue: '#3B82F6',
  orange: '#F59E0B',
  purple: '#8B5CF6',
  pink: '#F472B6',
  paper: '#FFF8E7',
  cream: '#F6F1E7',
};

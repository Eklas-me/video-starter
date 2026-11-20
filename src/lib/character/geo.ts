import type {BaseType, CharacterConfig, Expression, OutfitType, Pose} from '../types';

export const GROUND = 505;
type Body = {hrx: number; hry: number; tw: number; th: number; leg: number; arm: number; aw: number; lw: number};
export const BODY: Record<BaseType, Body> = {
  man: {hrx: 46, hry: 52, tw: 104, th: 150, leg: 150, arm: 62, aw: 22, lw: 26},
  woman: {hrx: 44, hry: 50, tw: 92, th: 140, leg: 150, arm: 58, aw: 20, lw: 23},
  teen: {hrx: 44, hry: 50, tw: 90, th: 130, leg: 130, arm: 56, aw: 20, lw: 23},
  boy: {hrx: 46, hry: 50, tw: 76, th: 100, leg: 90, arm: 46, aw: 18, lw: 20},
  girl: {hrx: 44, hry: 48, tw: 70, th: 98, leg: 90, arm: 44, aw: 17, lw: 19},
  elderMan: {hrx: 46, hry: 50, tw: 100, th: 140, leg: 135, arm: 58, aw: 21, lw: 24},
  elderWoman: {hrx: 44, hry: 48, tw: 92, th: 132, leg: 135, arm: 54, aw: 20, lw: 23},
};
export const geo = (b: BaseType) => {
  const B = BODY[b];
  const hipY = GROUND - B.leg;
  const top = hipY - B.th;
  const hcy = top - B.hry - 2;
  return {...B, hipY, top, hcy, headTop: hcy - B.hry};
};
export type Geo = ReturnType<typeof geo>;
// মাথার ওপরের টুপি/চুল ধরে মোট উচ্চতা (ডিজাইন ইউনিট) — বাবল বসাতে লাগে
export const charHeight = (c: CharacterConfig) => GROUND - geo(c.base).headTop + 26;

export const EXT: Record<OutfitType, number> = {tshirt: 0, shirt: 0, panjabi: 75, hoodie: 0, uniform: 0, overall: 0, saree: 90, kameez: 55, suit: 0};
export const SLEEVE: Record<OutfitType, 'long' | 'short'> = {tshirt: 'short', shirt: 'long', panjabi: 'long', hoodie: 'long', uniform: 'short', overall: 'long', saree: 'short', kameez: 'long', suit: 'long'};
export const PANTS: Record<OutfitType, string> = {tshirt: '#3d4a6b', shirt: '#3b3b4f', panjabi: '#efefef', hoodie: '#3d4a6b', uniform: '#2b3a67', overall: '', saree: '', kameez: '#f2f2f2', suit: '#2b2b33'};

export type PoseDef = {aL: [number, number]; aR: [number, number]; lL: number; lR: number; sit?: boolean};
export const POSES: Record<Pose, PoseDef> = {
  idle: {aL: [6, 6], aR: [6, 6], lL: 4, lR: 4},
  walk: {aL: [6, 6], aR: [6, 6], lL: 4, lR: 4}, // Character এ ফ্রেম দিয়ে অ্যানিমেট হয়
  point: {aL: [6, 6], aR: [88, 88], lL: 4, lR: 4},
  hold: {aL: [22, -65], aR: [22, -65], lL: 4, lR: 4},
  sit: {aL: [10, -40], aR: [10, -40], lL: 18, lR: 18, sit: true},
  wave: {aL: [6, 6], aR: [50, 150], lL: 4, lR: 4},
  armsUp: {aL: [155, 165], aR: [155, 165], lL: 6, lR: 6},
  handsFace: {aL: [35, -150], aR: [35, -150], lL: 4, lR: 4},
  handsHips: {aL: [40, -60], aR: [40, -60], lL: 6, lR: 6},
};

export type Face = {eye: 'open' | 'happy' | 'closed' | 'wide'; bl: number; br: number; by: number; mouth: 'smallSmile' | 'grin' | 'frown' | 'flat' | 'o' | 'wavy' | 'cry'; look?: [number, number]; blush?: boolean; tear?: boolean; sweat?: boolean};
export const FACES: Record<Expression, Face> = {
  neutral: {eye: 'open', bl: 0, br: 0, by: 0, mouth: 'smallSmile'},
  happy: {eye: 'happy', bl: -6, br: 6, by: -3, mouth: 'grin', blush: true},
  sad: {eye: 'open', bl: -20, br: 20, by: 0, mouth: 'frown', look: [0, 2]},
  angry: {eye: 'open', bl: 22, br: -22, by: 4, mouth: 'frown'},
  surprised: {eye: 'wide', bl: 0, br: 0, by: -9, mouth: 'o'},
  cry: {eye: 'closed', bl: -22, br: 22, by: 2, mouth: 'cry', tear: true},
  thinking: {eye: 'open', bl: 8, br: -8, by: -2, mouth: 'flat', look: [4, -4]},
  worried: {eye: 'open', bl: -14, br: 14, by: -3, mouth: 'wavy', sweat: true},
};

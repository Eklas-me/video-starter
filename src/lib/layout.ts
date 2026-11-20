import {useVideoConfig} from 'remotion';
import type {Slot} from './types';

// ক্যারেক্টারের ডিজাইন-হাইট ~420 ইউনিট; s = পিক্সেল/ইউনিট
export const useLayout = () => {
  const {width: W, height: H} = useVideoConfig();
  const v = H > W;
  const feetY = H * (v ? 0.7 : 0.88);
  const s = (H * (v ? 0.34 : 0.62)) / 420;
  const xs: Record<Slot, number> = v
    ? {farLeft: 0.14, left: 0.28, center: 0.5, right: 0.72, farRight: 0.86}
    : {farLeft: 0.12, left: 0.25, center: 0.5, right: 0.75, farRight: 0.88};
  return {
    W, H, v, feetY, s,
    slotX: (k: Slot) => xs[k] * W,
    safeTop: v ? 110 : 50,
    safeBottom: v ? 170 : 50,
    horizonY: feetY - H * 0.05,
  };
};
export type Layout = ReturnType<typeof useLayout>;

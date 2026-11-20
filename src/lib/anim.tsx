import React from 'react';
import {spring, useVideoConfig} from 'remotion';

export const popAt = (frame: number, fps: number, delay = 0) =>
  spring({frame: frame - delay, fps, config: {damping: 11, stiffness: 170, mass: 0.6}});
export const usePop = (frame: number, delay = 0) => {
  const {fps} = useVideoConfig();
  return popAt(frame, fps, delay);
};
export const shakeOffset = (frame: number, amp: number) => ({
  x: Math.sin(frame * 2.7) * amp,
  y: Math.cos(frame * 3.3) * amp,
});
export const Fade: React.FC<{opacity: number; children: React.ReactNode}> = ({opacity, children}) => (
  <div style={{position: 'absolute', inset: 0, opacity, pointerEvents: 'none'}}>{children}</div>
);

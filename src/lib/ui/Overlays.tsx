import React from 'react';
import {FONT, INK, PAL} from '../config';
import {useLayout} from '../layout';
import {usePop} from '../anim';

const base: React.CSSProperties = {position: 'absolute', fontFamily: FONT, color: INK};

// ───────── স্পিচ বাবল (ক্যারেক্টারের মাথার ওপরে) ─────────
export const SpeechBubble: React.FC<{x: number; y: number; text: string; frame: number}> = ({x, y, text, frame}) => {
  const L = useLayout();
  const p = usePop(frame);
  const maxW = L.v ? L.W * 0.66 : L.W * 0.34;
  const fs = L.v ? 52 : 44;
  const cx = Math.min(Math.max(x, maxW / 2 + 30), L.W - maxW / 2 - 30);
  const dx = x - cx;
  return (
    <div style={{...base, left: cx, top: Math.max(y, L.safeTop + 120), transform: `translate(-50%,-100%) scale(${p})`, transformOrigin: `calc(50% + ${dx}px) 100%`, maxWidth: maxW, width: 'max-content'}}>
      <div style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 34, padding: '18px 28px', fontSize: fs, fontWeight: 700, lineHeight: 1.25, textAlign: 'center', boxShadow: '0 8px 0 rgba(0,0,0,.18)'}}>{text}</div>
      <svg width={44} height={30} style={{position: 'absolute', left: `calc(50% + ${dx}px)`, bottom: -28, transform: 'translateX(-50%)'}}>
        <path d="M2 0 L22 28 L42 0" fill="#fff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M5 0 H39" stroke="#fff" strokeWidth={6} />
      </svg>
    </div>
  );
};

// ───────── থট বাবল (টেক্সট বা আইকন) ─────────
export const ThoughtBubble: React.FC<{x: number; y: number; frame: number; children: React.ReactNode}> = ({x, y, frame, children}) => {
  const L = useLayout();
  const p = usePop(frame);
  const cx = Math.min(Math.max(x, 220), L.W - 220);
  return (
    <div style={{...base, left: cx, top: Math.max(y - 36, L.safeTop + 140), transform: `translate(-50%,-100%) scale(${p})`, transformOrigin: '50% 100%'}}>
      <div style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: '50%', padding: '34px 48px', fontSize: L.v ? 48 : 42, fontWeight: 700, textAlign: 'center', maxWidth: L.v ? L.W * 0.6 : L.W * 0.3, minWidth: 140, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{children}</div>
      {[[16, 30], [8, 54]].map(([r, o], i) => (
        <div key={i} style={{position: 'absolute', left: `calc(50% + ${(x - cx) * (1 - i * 0.4)}px)`, bottom: -o - r, width: r * 2, height: r * 2, borderRadius: '50%', background: '#fff', border: `3px solid ${INK}`, transform: 'translateX(-50%)'}} />
      ))}
    </div>
  );
};

// ───────── নামের পিল-ব্যাজ ─────────
export const NameBadge: React.FC<{x: number; y: number; text: string; color?: string; frame: number}> = ({x, y, text, color = PAL.blue, frame}) => {
  const L = useLayout();
  const p = usePop(frame);
  return (
    <div style={{...base, left: x, top: y, transform: `translate(-50%,-100%) scale(${p})`, background: color, color: '#fff', border: `3px solid ${INK}`, borderRadius: 999, padding: '6px 26px', fontSize: L.v ? 42 : 36, fontWeight: 700, whiteSpace: 'nowrap'}}>{text}</div>
  );
};

// ───────── উপরের লোকেশন/সময় পিল ─────────
export const LocPill: React.FC<{text: string; frame: number}> = ({text, frame}) => {
  const L = useLayout();
  const p = usePop(frame);
  return (
    <div style={{...base, left: '50%', top: L.safeTop, transform: `translate(-50%, ${(1 - p) * -120}px)`, background: 'rgba(34,34,34,.88)', color: '#fff', borderRadius: 999, padding: '10px 34px', fontSize: L.v ? 40 : 34, fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 14}}>
      <span style={{width: 16, height: 16, borderRadius: '50%', background: PAL.accent, display: 'inline-block'}} />{text}
    </div>
  );
};

// ───────── পিন করা নোট কার্ড ─────────
export const NoteCard: React.FC<{x: number; y: number; text: string; color?: string; frame: number}> = ({x, y, text, color = PAL.paper, frame}) => {
  const L = useLayout();
  const p = usePop(frame);
  return (
    <div style={{...base, left: x, top: y, transform: `translate(-50%,-50%) rotate(-3deg) scale(${p})`, background: color, border: `4px solid ${INK}`, borderRadius: 14, padding: '34px 40px 26px', fontSize: L.v ? 56 : 46, fontWeight: 700, textAlign: 'center', maxWidth: L.v ? L.W * 0.7 : L.W * 0.36, boxShadow: '0 10px 0 rgba(0,0,0,.2)'}}>
      <div style={{position: 'absolute', left: '50%', top: -16, width: 28, height: 28, marginLeft: -14, borderRadius: '50%', background: PAL.red, border: `3px solid ${INK}`}} />
      {text}
    </div>
  );
};

// ───────── বোল্ড স্ট্যাম্প ─────────
export const Stamp: React.FC<{x: number; y: number; text: string; color?: string; frame: number}> = ({x, y, text, color = PAL.red, frame}) => {
  const L = useLayout();
  const p = usePop(frame);
  return (
    <div style={{...base, left: x, top: y, transform: `translate(-50%,-50%) rotate(-8deg) scale(${2.4 - 1.4 * Math.min(p, 1)})`, opacity: Math.min(1, p * 2), color, border: `8px solid ${color}`, borderRadius: 18, padding: '8px 36px', fontSize: L.v ? 88 : 76, fontWeight: 700, whiteSpace: 'nowrap', background: 'rgba(255,255,255,.88)'}}>{text}</div>
  );
};

// ───────── নিচের ক্যাপশন (ভাসমান ওভারলে) ─────────
export const Caption: React.FC<{text: string; keywords?: string[]; frame: number}> = ({text, keywords = [], frame}) => {
  const L = useLayout();
  const p = Math.min(usePop(frame), 1);
  const size = Math.min(L.v ? 66 : 58, (L.W * 0.86) / Math.max(8, text.length * 0.62));
  const words = text.split(/\s+/);
  const isKey = (w: string) => keywords.some((k) => k && w.replace(/[।,.!?'"]/g, '').includes(k));
  return (
    <div style={{...base, left: '50%', bottom: L.safeBottom, transform: `translate(-50%, ${(1 - p) * 40}px)`, opacity: p, background: 'rgba(0,0,0,.6)', borderRadius: 22, padding: '10px 30px', fontSize: size, fontWeight: 700, whiteSpace: 'nowrap', color: '#fff'}}>
      {words.map((w, i) => (
        <span key={i} style={{color: isKey(w) ? PAL.accent : '#fff'}}>{w}{i < words.length - 1 ? ' ' : ''}</span>
      ))}
    </div>
  );
};

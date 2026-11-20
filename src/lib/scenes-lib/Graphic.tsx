import React from 'react';
import {interpolate, useVideoConfig} from 'remotion';
import {FONT, INK, PAL} from '../config';
import {Icon} from '../icons/Icons';
import {useLayout} from '../layout';
import {popAt, usePop} from '../anim';
import type {GraphicSpec} from '../types';

const wrap = (v: boolean): React.CSSProperties => ({position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: v ? 40 : 30, padding: v ? '120px 60px' : '70px 120px', fontFamily: FONT, color: INK});
const card: React.CSSProperties = {background: '#fff', border: `4px solid ${INK}`, borderRadius: 28, boxShadow: '0 10px 0 rgba(0,0,0,.15)'};

const Title: React.FC<{text?: string; frame: number}> = ({text, frame}) => {
  const L = useLayout();
  const p = Math.min(usePop(frame), 1);
  if (!text) return null;
  return <div style={{fontSize: L.v ? 76 : 64, fontWeight: 700, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * -30}px)`}}>{text}</div>;
};

const Arrow: React.FC<{down: boolean; p: number}> = ({down, p}) => (
  <svg width={down ? 70 : 90} height={down ? 90 : 70} viewBox="0 0 90 70" style={{opacity: p, transform: `scale(${p}) ${down ? 'rotate(90deg)' : ''}`, flex: 'none'}}>
    <path d="M8 35 H70 M48 12 L72 35 L48 58" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Graphic: React.FC<{spec: GraphicSpec; frame: number}> = ({spec, frame}) => {
  const L = useLayout();
  const v = L.v;
  const f = Math.max(0, frame);
  const {fps} = useVideoConfig();
  const pp = (d: number) => Math.min(popAt(f, fps, d), 1);

  switch (spec.type) {
    case 'compare': {
      const Card = ({d, i, tone}: {d: typeof spec.left; i: number; tone: string}) => {
        const p = pp(10 + i * 12);
        return (
          <div style={{...card, width: v ? 900 : 700, overflow: 'hidden', transform: `scale(${p})`, opacity: p}}>
            <div style={{background: d.color ?? tone, padding: '20px 30px', display: 'flex', alignItems: 'center', gap: 20, color: '#fff', fontSize: v ? 58 : 50, fontWeight: 700, borderBottom: `4px solid ${INK}`}}>
              {d.icon && <Icon name={d.icon} size={v ? 84 : 72} />}{d.title}
            </div>
            <div style={{padding: '22px 34px', fontSize: v ? 46 : 40, fontWeight: 500, display: 'flex', flexDirection: 'column', gap: 14}}>
              {d.points?.map((t, k) => <div key={k}>• {t}</div>)}
            </div>
          </div>
        );
      };
      const vs = pp(18);
      return (
        <div style={wrap(v)}>
          <Title text={spec.title} frame={f} />
          <div style={{display: 'flex', flexDirection: v ? 'column' : 'row', alignItems: 'center', gap: v ? 24 : 40}}>
            <Card d={spec.left} i={0} tone={PAL.blue} />
            <div style={{width: 96, height: 96, borderRadius: '50%', background: PAL.accent, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 700, transform: `scale(${vs})`, flex: 'none'}}>VS</div>
            <Card d={spec.right} i={1} tone={PAL.orange} />
          </div>
        </div>
      );
    }
    case 'checklist':
      return (
        <div style={wrap(v)}>
          <Title text={spec.title} frame={f} />
          {spec.items.map((it, i) => {
            const o = typeof it === 'string' ? {text: it, icon: undefined} : it;
            const p = pp(12 + i * 16);
            return (
              <div key={i} style={{...card, width: v ? 900 : 1100, padding: '18px 30px', display: 'flex', alignItems: 'center', gap: 26, fontSize: v ? 54 : 46, fontWeight: 700, opacity: p, transform: `translateX(${(1 - p) * 120}px)`}}>
                <Icon name={o.icon ?? 'check'} size={v ? 84 : 70} />{o.text}
              </div>
            );
          })}
        </div>
      );
    case 'timeline':
      return (
        <div style={wrap(v)}>
          <Title text={spec.title} frame={f} />
          <div style={{position: 'relative', display: 'flex', flexDirection: v ? 'column' : 'row', gap: v ? 30 : 36, alignItems: v ? 'flex-start' : 'stretch'}}>
            {spec.items.map((it, i) => {
              const p = pp(12 + i * 16);
              return (
                <div key={i} style={{display: 'flex', flexDirection: v ? 'row' : 'column', alignItems: 'center', gap: 22, opacity: p, transform: `scale(${p})`}}>
                  <div style={{width: 120, height: 120, borderRadius: '50%', background: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
                    {it.icon ? <Icon name={it.icon} size={76} /> : <span style={{fontSize: 54, fontWeight: 700}}>{i + 1}</span>}
                  </div>
                  <div style={{...card, padding: '14px 26px', textAlign: v ? 'left' : 'center', minWidth: v ? 600 : 220}}>
                    <div style={{fontSize: v ? 52 : 44, fontWeight: 700}}>{it.label}</div>
                    {it.sub && <div style={{fontSize: v ? 38 : 32, fontWeight: 500, opacity: 0.75}}>{it.sub}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    case 'flow':
      return (
        <div style={wrap(v)}>
          <Title text={spec.title} frame={f} />
          <div style={{display: 'flex', flexDirection: v ? 'column' : 'row', alignItems: 'center', gap: v ? 18 : 22}}>
            {spec.steps.map((s, i) => {
              const p = pp(12 + i * 18);
              return (
                <React.Fragment key={i}>
                  {i > 0 && <Arrow down={v} p={pp(6 + i * 18)} />}
                  <div style={{...card, padding: '22px 30px', display: 'flex', flexDirection: v ? 'row' : 'column', alignItems: 'center', gap: 18, fontSize: v ? 52 : 44, fontWeight: 700, transform: `scale(${p})`, opacity: p, minWidth: v ? 560 : 240, justifyContent: 'center'}}>
                    {s.icon && <Icon name={s.icon} size={v ? 90 : 100} />}{s.label}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      );
    case 'quote': {
      const p = pp(6);
      return (
        <div style={wrap(v)}>
          <div style={{...card, padding: v ? '60px 56px' : '50px 80px', maxWidth: v ? 920 : 1300, textAlign: 'center', transform: `scale(${p})`, opacity: p, position: 'relative'}}>
            <div style={{position: 'absolute', left: 30, top: -30, fontSize: 150, color: PAL.orange, lineHeight: 1, fontWeight: 700}}>“</div>
            <div style={{fontSize: v ? 66 : 56, fontWeight: 700, lineHeight: 1.35}}>{spec.text}</div>
            {spec.by && <div style={{marginTop: 24, fontSize: v ? 40 : 34, opacity: 0.7}}>— {spec.by}</div>}
          </div>
        </div>
      );
    }
    case 'progress':
      return (
        <div style={wrap(v)}>
          <Title text={spec.title} frame={f} />
          {spec.items.map((it, i) => {
            const w = interpolate(f, [12 + i * 10, 52 + i * 10], [0, it.value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return (
              <div key={i} style={{width: v ? 900 : 1100}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: v ? 48 : 42, fontWeight: 700, marginBottom: 8}}><span>{it.label}</span><span>{Math.round(w)}%</span></div>
                <div style={{height: 46, borderRadius: 24, background: '#fff', border: `4px solid ${INK}`, overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${w}%`, background: it.color ?? PAL.green}} />
                </div>
              </div>
            );
          })}
        </div>
      );
    case 'bignumber': {
      const p = pp(6);
      return (
        <div style={wrap(v)}>
          {spec.icon && <div style={{transform: `scale(${p})`}}><Icon name={spec.icon} size={v ? 240 : 200} /></div>}
          <div style={{fontSize: v ? 220 : 190, fontWeight: 700, lineHeight: 1, transform: `scale(${p})`, color: PAL.orange, WebkitTextStroke: `4px ${INK}`}}>{spec.value}</div>
          <div style={{fontSize: v ? 64 : 54, fontWeight: 700, textAlign: 'center', opacity: p}}>{spec.label}</div>
        </div>
      );
    }
    case 'question':
      return (
        <div style={wrap(v)}>
          <Title text={spec.q} frame={f} />
          {spec.options.map((o, i) => {
            const p = pp(20 + i * 14);
            return (
              <div key={i} style={{...card, width: v ? 900 : 1000, padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 24, fontSize: v ? 54 : 46, fontWeight: 700, transform: `scale(${p})`, opacity: p}}>
                <div style={{width: 76, height: 76, borderRadius: '50%', background: [PAL.blue, PAL.orange, PAL.green, PAL.purple][i % 4], color: '#fff', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>{String.fromCharCode(65 + i)}</div>{o}
              </div>
            );
          })}
        </div>
      );
  }
};

import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {shakeOffset} from './anim';
import {Background} from './backgrounds/Background';
import {Character} from './character/Character';
import {charHeight} from './character/geo';
import {FPS, PAL} from './config';
import {Icon} from './icons/Icons';
import {useLayout} from './layout';
import {Graphic} from './scenes-lib/Graphic';
import {chunkCues, useCues} from './srt';
import type {ActorSpec, Cue, IconName, Item, SceneSpec, SfxKind, Story} from './types';
import {Caption, LocPill, NameBadge, NoteCard, SpeechBubble, Stamp, ThoughtBubble} from './ui/Overlays';

const LEAD = 12; // ট্রানজিশনের ওভারল্যাপ ফ্রেম

const stateAt = (a: ActorSpec, t: number) => {
  const s = {expr: a.expr ?? 'neutral', pose: a.pose ?? 'idle', tremble: !!a.tremble, holding: (a.holding ?? null) as IconName | null, flip: a.flip ?? (a.at === 'right' || a.at === 'farRight')};
  for (const st of a.states ?? []) {
    if (t < st.t) continue;
    if (st.expr) s.expr = st.expr;
    if (st.pose) s.pose = st.pose;
    if (st.tremble !== undefined) s.tremble = st.tremble;
    if (st.holding !== undefined) s.holding = st.holding;
    if (st.flip !== undefined) s.flip = st.flip;
  }
  return s;
};

const SceneView: React.FC<{sc: SceneSpec; story: Story; chunks: Cue[]; lead: number; total: number}> = ({sc, story, chunks, lead, total}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const L = useLayout();
  const t = (frame - lead) / fps; // সিনের শুরু থেকে সেকেন্ড (লিড অংশে ঋণাত্মক)
  const tc = Math.max(0, t);
  const fr = (sec: number) => frame - lead - Math.round(sec * fps); // কোনো সময় থেকে লোকাল ফ্রেম

  // ── ট্রানজিশন ──
  const ep = lead ? Easing.out(Easing.cubic)(Math.min(1, frame / lead)) : 1;
  const enter = sc.enter ?? 'fade';
  const enterStyle: React.CSSProperties =
    enter === 'fade' ? {opacity: ep} :
    enter === 'slide' ? {transform: `translateX(${(1 - ep) * L.W}px)`} :
    enter === 'zoom' ? {opacity: ep, transform: `scale(${1.3 - 0.3 * ep})`} :
    enter === 'wipe' ? {clipPath: `inset(0 ${(1 - ep) * 100}% 0 0)`} : {};

  // ── ক্যামেরা: জুম ও শেক ──
  const z = sc.zoom ? interpolate(frame, [0, total], sc.zoom) : 1;
  const shaking = !!sc.shake && t >= sc.shake[0] && t < sc.shake[1];
  const sh = shaking ? shakeOffset(frame, sc.shake?.[2] ?? 10) : {x: 0, y: 0};
  const zo = sc.zoomOrigin ?? [0.5, 0.5];

  // ── অভিনেতাদের জ্যামিতি ──
  const geom = (a: ActorSpec) => {
    const cfg = story.cast[a.id];
    const s = L.s * (a.scale ?? 1);
    return {cfg, s, x: L.slotX(a.at), headY: L.feetY - charHeight(cfg) * s};
  };
  const badgeVisible = (a: ActorSpec) => !!a.badge && t >= (a.from ?? 0) + 0.2 && t < (a.from ?? 0) + 2.8;
  const items = sc.items ?? [];
  const active = (it: Item) => t >= it.t && t < it.t + it.dur;

  const resolve = (it: {at?: [number, number]; near?: string; dx?: number; dy?: number}) => {
    const a = it.near ? sc.cast?.find((c) => c.id === it.near) : undefined;
    if (a) {
      const g = geom(a);
      return {x: g.x + (it.dx ?? 0) * 100 * g.s, y: g.headY + (it.dy ?? 0) * 100 * g.s};
    }
    const [px, py] = it.at ?? [0.5, 0.3];
    return {x: px * L.W, y: py * L.H};
  };

  // ── ক্যাপশন নিয়ম: কলআউট/কার্ড থাকলে নিচের ক্যাপশন নয় ──
  const calloutOn = items.some((it) => active(it) && (it.kind === 'say' || it.kind === 'note' || it.kind === 'stamp' || (it.kind === 'think' && !!it.text)));
  const gt = sc.start + t;
  const chunk = chunks.find((c) => gt >= c.s && gt < c.e);
  const showCaption = sc.caption !== false && !calloutOn && (!sc.graphic || sc.captionOn) && !!chunk && t >= 0;

  // ── সাউন্ড ইফেক্ট ──
  const vol = Math.min(story.sfxVolume ?? 0.22, 0.4);
  const autos: {t: number; kind: SfxKind}[] = [];
  const last: Partial<Record<SfxKind, number>> = {};
  const push = (tt: number, kind: SfxKind) => {
    if (!story.sfxMap?.[kind]) return;
    if (last[kind] !== undefined && tt - (last[kind] as number) < 1.5) return;
    last[kind] = tt;
    autos.push({t: tt, kind});
  };
  [...items].sort((a, b) => a.t - b.t).forEach((it) => push(it.t, it.kind === 'stamp' ? 'stamp' : 'pop'));
  const sfxEls = [
    ...autos.map((a) => ({t: a.t, file: story.sfxMap?.[a.kind] as string, vol})),
    ...(sc.sfx ?? []).map((s) => ({...s, vol: Math.min(s.vol ?? vol, 0.4)})),
  ];

  return (
    <AbsoluteFill style={enterStyle}>
      {lead > 0 && story.sfxMap?.whoosh && <Audio src={staticFile(`sfx/${story.sfxMap.whoosh}`)} volume={vol} />}
      {sfxEls.map((s, i) => (
        <Sequence key={i} from={lead + Math.round(s.t * fps)} durationInFrames={120}>
          <Audio src={staticFile(`sfx/${s.file}`)} volume={s.vol} />
        </Sequence>
      ))}

      <div style={{position: 'absolute', inset: 0, transform: `translate(${sh.x}px,${sh.y}px) scale(${z * (shaking ? 1.04 : 1)})`, transformOrigin: `${zo[0] * 100}% ${zo[1] * 100}%`}}>
        <Background spec={sc.bg} />
        {sc.graphic && <Graphic spec={sc.graphic} frame={frame - lead} />}
        {sc.cast?.map((a, i) => {
          if ((a.from !== undefined && t < a.from) || (a.until !== undefined && t >= a.until)) return null;
          const g = geom(a);
          const st = stateAt(a, tc);
          const speaking = (a.speak ?? []).some(([s, e]) => tc >= s && tc < e) || items.some((it) => it.kind === 'say' && it.by === a.id && active(it));
          const ef = Math.max(0, fr(a.from ?? 0));
          const p = a.enter ? Math.min(spring({frame: ef, fps, config: {damping: 14}}), 1) : 1;
          const xOff = a.enter === 'slide' ? (g.x < L.W / 2 ? -1 : 1) * (1 - p) * L.W * 0.5 : 0;
          const cfg = a.outfit ? {...g.cfg, outfit: {...g.cfg.outfit, ...a.outfit}} : g.cfg;
          return (
            <Character key={a.id} cfg={cfg} x={g.x + xOff} feetY={L.feetY} scale={g.s * (a.enter === 'pop' ? Math.max(p, 0.01) : 1)} frame={frame} expr={st.expr} pose={st.pose} speaking={speaking} holding={st.holding} tremble={st.tremble} flip={st.flip} opacity={a.enter === 'fade' ? p : a.enter ? (p > 0.01 ? 1 : 0) : 1} seed={i * 3 + 1} />
          );
        })}
      </div>

      {/* ── ওভারলে (জুম/শেকের বাইরে) ── */}
      {sc.badge && t < 3.5 && <LocPill text={sc.badge} frame={fr(0.2)} />}
      {sc.cast?.map((a) => {
        if (!badgeVisible(a)) return null;
        const g = geom(a);
        return <NameBadge key={a.id} x={g.x} y={g.headY - 8} text={typeof a.badge === 'string' ? a.badge : g.cfg.label ?? a.id} frame={fr((a.from ?? 0) + 0.2)} />;
      })}
      {items.map((it, i) => {
        if (!active(it)) return null;
        const f = fr(it.t);
        const out = interpolate(t, [it.t + it.dur - 0.2, it.t + it.dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        let el: React.ReactNode = null;
        if (it.kind === 'say' || it.kind === 'think') {
          const a = sc.cast?.find((c) => c.id === it.by);
          if (!a) return null;
          const g = geom(a);
          const y = g.headY - (badgeVisible(a) ? 74 : 16);
          el = it.kind === 'say'
            ? <SpeechBubble x={g.x} y={y} text={it.text} frame={f} />
            : <ThoughtBubble x={g.x} y={y} frame={f}>{it.text ?? (it.icon && <Icon name={it.icon} size={L.v ? 150 : 120} />)}</ThoughtBubble>;
        } else if (it.kind === 'icon') {
          const {x, y} = resolve(it);
          const size = it.size ?? (L.v ? 240 : 200);
          const anim = it.anim ?? 'pop';
          const p = Math.min(spring({frame: f, fps, config: {damping: 10, stiffness: 160}}), 1.2);
          const tr = anim === 'float' ? `translateY(${Math.sin(f / 10) * 14}px) scale(${p})` : anim === 'pulse' ? `scale(${p * (1 + Math.sin(f / 5) * 0.08)})` : anim === 'slide' ? `translateX(${(1 - Math.min(p, 1)) * -L.W * 0.4}px)` : `scale(${p})`;
          el = <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, transform: tr}}><Icon name={it.name} size={size} /></div>;
        } else if (it.kind === 'note') {
          const {x, y} = resolve({at: [0.5, 0.25], ...it});
          el = <NoteCard x={x} y={y} text={it.text} color={it.color} frame={f} />;
        } else {
          const {x, y} = resolve({at: [0.5, 0.35], ...it});
          el = <Stamp x={x} y={y} text={it.text} color={it.color} frame={f} />;
        }
        return <div key={i} style={{position: 'absolute', inset: 0, opacity: out, pointerEvents: 'none'}}>{el}</div>;
      })}
      {showCaption && chunk && <Caption key={chunk.s} text={chunk.text} keywords={story.keywords} frame={Math.round((gt - chunk.s) * fps)} />}
    </AbsoluteFill>
  );
};

export const StoryPlayer: React.FC<{story: Story}> = ({story}) => {
  const fps = story.fps ?? FPS;
  const cues = useCues(story);
  const chunks = useMemo(() => chunkCues(cues, 5), [cues]);
  return (
    <AbsoluteFill style={{backgroundColor: PAL.cream}}>
      {story.voice && <Audio src={staticFile(story.voice)} />}
      {story.scenes.map((sc, i) => {
        const lead = i === 0 || sc.enter === 'none' ? 0 : LEAD;
        const end = story.scenes[i + 1]?.start ?? sc.end;
        const dur = Math.max(1, Math.round((end - sc.start) * fps));
        return (
          <Sequence key={sc.id} from={Math.round(sc.start * fps) - lead} durationInFrames={dur + lead}>
            <SceneView sc={sc} story={story} chunks={chunks} lead={lead} total={dur + lead} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

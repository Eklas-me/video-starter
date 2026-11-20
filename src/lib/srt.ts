import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import type {Cue, Story} from './types';

const t2s = (t: string) => {
  const m = t.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000 : 0;
};

export const parseSrt = (raw: string): Cue[] =>
  raw
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.trim().split('\n');
      const i = lines.findIndex((l) => l.includes('-->'));
      if (i < 0) return null;
      const [a, b] = lines[i].split('-->');
      return {s: t2s(a), e: t2s(b), text: lines.slice(i + 1).join(' ').trim()};
    })
    .filter((c): c is Cue => !!c && !!c.text);

export const useCues = (story: Story): Cue[] => {
  const [cues, setCues] = useState<Cue[]>(story.cues ?? []);
  const [handle] = useState(() => (story.srt ? delayRender('srt') : null));
  useEffect(() => {
    if (!story.srt || handle === null) return;
    fetch(staticFile(story.srt))
      .then((r) => r.text())
      .then((t) => {
        setCues(parseSrt(t));
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, []);
  return cues;
};

// লম্বা cue ভেঙে ≤ maxWords শব্দের ছোট ক্যাপশন চাঙ্ক বানায় (সময় শব্দসংখ্যা অনুপাতে ভাগ)
export const chunkCues = (cues: Cue[], maxWords = 5): Cue[] =>
  cues.flatMap((c) => {
    const w = c.text.split(/\s+/).filter(Boolean);
    const n = Math.max(1, Math.ceil(w.length / maxWords));
    const per = Math.ceil(w.length / n);
    const out: Cue[] = [];
    let cursor = c.s;
    for (let i = 0; i < w.length; i += per) {
      const part = w.slice(i, i + per);
      const dur = ((c.e - c.s) * part.length) / w.length;
      out.push({s: cursor, e: cursor + dur, text: part.join(' ')});
      cursor += dur;
    }
    return out;
  });

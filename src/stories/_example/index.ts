import type {Story} from '../../lib/types';
import {cast} from './cast';
import {scenes} from './data';

export const example: Story = {
  id: 'example',
  // voice: 'stories/example/voice.mp3',   // public/ এর ভেতরে রাখুন
  // srt: 'stories/example/voice.srt',
  keywords: ['জমি', 'কাগজ', 'সত্য'],
  cues: [
    {s: 0.2, e: 1.6, text: 'গ্রামের সকালে রাফি আর তার আব্বু'},
    {s: 6.2, e: 8.8, text: 'রাফির মনে একটাই চিন্তা, জমির কাগজ কোথায়'},
    {s: 12.2, e: 14.6, text: 'দুই পক্ষের কথায় অনেক পার্থক্য'},
  ],
  cast,
  scenes,
};

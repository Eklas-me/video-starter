import type {SceneSpec} from '../../lib/types';

export const scenes: SceneSpec[] = [
  {
    id: 's1', start: 0, end: 6, bg: {type: 'village', variant: 'day'}, badge: 'গ্রাম · সকাল',
    cast: [
      {id: 'rafi', at: 'left', enter: 'slide', badge: true, pose: 'wave', expr: 'happy'},
      {id: 'abbu', at: 'right', enter: 'pop', from: 0.6, badge: true, speak: [[2, 4.8]]},
    ],
    items: [
      {kind: 'say', by: 'abbu', text: 'আজ জমির কাগজ দেখতে হবে', t: 2, dur: 3},
      {kind: 'icon', name: 'house', near: 'rafi', dx: -1.2, dy: -0.6, t: 0.8, dur: 1.2, anim: 'float'},
    ],
  },
  {
    id: 's2', start: 6, end: 12, bg: {type: 'home', variant: 'day'}, badge: 'ঘর · দুপুর', enter: 'slide',
    cast: [
      {id: 'rafi', at: 'center', pose: 'handsFace', expr: 'worried', tremble: true, states: [{t: 3.5, pose: 'idle', expr: 'thinking', tremble: false}]},
    ],
    items: [
      {kind: 'think', by: 'rafi', icon: 'question', t: 3.5, dur: 2.2},
      {kind: 'stamp', text: 'চিন্তা!', at: [0.5, 0.3], t: 0.8, dur: 1.8, color: '#E5484D'},
    ],
    zoom: [1, 1.1], shake: [0.8, 1.4, 8],
  },
  {
    id: 's3', start: 12, end: 18, bg: {type: 'clean'}, enter: 'wipe',
    graphic: {type: 'compare', title: 'দুই পক্ষের দাবি', left: {title: 'রাফির পরিবার', icon: 'house', points: ['পুরোনো কাগজ আছে', 'বছরের পর বছর দখলে']}, right: {title: 'জব্বার চাচা', icon: 'warning', color: '#E5484D', points: ['নতুন দাবি তুলেছে', 'কোনো প্রমাণ নেই']}},
  },
  {
    id: 's4', start: 18, end: 24, bg: {type: 'clean', color: '#EAF4FF'}, enter: 'zoom',
    graphic: {type: 'checklist', title: 'রাফি যা করল', items: ['কাগজ জোগাড় করল', {text: 'গ্রামের মুরব্বিদের জানাল', icon: 'heart'}, 'সত্যের পাশে দাঁড়াল']},
  },
];

export type Expression = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'cry' | 'thinking' | 'worried';
export type Pose = 'idle' | 'walk' | 'point' | 'hold' | 'sit' | 'wave' | 'armsUp' | 'handsFace' | 'handsHips';
export type BaseType = 'boy' | 'girl' | 'teen' | 'man' | 'woman' | 'elderMan' | 'elderWoman';
export type HairStyle = 'none' | 'short' | 'side' | 'long' | 'bun' | 'curly' | 'elder';
export type OutfitType = 'tshirt' | 'shirt' | 'panjabi' | 'hoodie' | 'uniform' | 'overall' | 'saree' | 'kameez' | 'suit';
export type Accessory = 'glasses' | 'beard' | 'mustache' | 'cap' | 'topi' | 'hijab';

export type IconName =
  | 'coin' | 'money' | 'clock' | 'calendar' | 'food' | 'book' | 'key' | 'phone' | 'question' | 'exclaim'
  | 'bulb' | 'heart' | 'brokenHeart' | 'warning' | 'check' | 'cross' | 'house' | 'car' | 'wrench'
  | 'gift' | 'star' | 'lock' | 'sun' | 'moon';

export type OutfitConfig = {type: OutfitType; color: string; color2?: string; pants?: string; shorts?: boolean};
export type CharacterConfig = {
  label?: string; // নামের ব্যাজে যা দেখাবে
  base: BaseType;
  skin: string;
  hair?: {style: HairStyle; color: string};
  outfit: OutfitConfig;
  accessories?: Accessory[];
  accColor?: string; // টুপি/ক্যাপ/হিজাবের রঙ
};

export type BgType = 'home' | 'shop' | 'road' | 'village' | 'office' | 'garage' | 'nature' | 'school' | 'clean';
export type BgSpec = {type: BgType; variant?: 'day' | 'night'; color?: string};

export type Slot = 'farLeft' | 'left' | 'center' | 'right' | 'farRight';
export type ActorState = {t: number; expr?: Expression; pose?: Pose; tremble?: boolean; holding?: IconName | null; flip?: boolean};
export type ActorSpec = {
  id: string;
  at: Slot;
  expr?: Expression;
  pose?: Pose;
  flip?: boolean;
  holding?: IconName;
  tremble?: boolean;
  scale?: number;
  outfit?: Partial<OutfitConfig>; // শুধু এই সিনের জন্য পোশাক বদল
  enter?: 'slide' | 'pop' | 'fade';
  from?: number; // সিনের শুরু থেকে কত সেকেন্ডে আসবে
  until?: number;
  speak?: [number, number][];
  badge?: boolean | string; // পরিচয় ব্যাজ
  states?: ActorState[]; // সময় অনুযায়ী এক্সপ্রেশন/পোজ বদল
};

type Anchor = {at?: [number, number]; near?: string; dx?: number; dy?: number};
export type Item =
  | ({kind: 'icon'; name: IconName; t: number; dur: number; size?: number; anim?: 'pop' | 'float' | 'pulse' | 'slide'} & Anchor)
  | {kind: 'say'; by: string; text: string; t: number; dur: number}
  | {kind: 'think'; by: string; text?: string; icon?: IconName; t: number; dur: number}
  | ({kind: 'note'; text: string; t: number; dur: number; color?: string} & Anchor)
  | ({kind: 'stamp'; text: string; t: number; dur: number; color?: string} & Anchor);

type CardData = {title: string; icon?: IconName; color?: string; points?: string[]};
export type GraphicSpec =
  | {type: 'compare'; title?: string; left: CardData; right: CardData}
  | {type: 'checklist'; title?: string; items: (string | {text: string; icon?: IconName})[]; color?: string}
  | {type: 'timeline'; title?: string; items: {label: string; sub?: string; icon?: IconName}[]}
  | {type: 'flow'; title?: string; steps: {label: string; icon?: IconName}[]}
  | {type: 'quote'; text: string; by?: string}
  | {type: 'progress'; title?: string; items: {label: string; value: number; color?: string}[]}
  | {type: 'bignumber'; value: string; label: string; icon?: IconName}
  | {type: 'question'; q: string; options: string[]};

export type SceneSpec = {
  id: string;
  start: number; // সেকেন্ড (SRT/অডিও থেকে)
  end: number;
  bg: BgSpec;
  badge?: string; // উপরের লোকেশন/সময় পিল
  cast?: ActorSpec[];
  items?: Item[];
  graphic?: GraphicSpec;
  caption?: boolean; // false দিলে এই সিনে নিচের ক্যাপশন বন্ধ
  captionOn?: boolean; // গ্রাফিক সিনেও ক্যাপশন চাইলে true
  enter?: 'fade' | 'slide' | 'zoom' | 'wipe' | 'none';
  zoom?: [number, number];
  zoomOrigin?: [number, number];
  shake?: [number, number, number?];
  sfx?: {t: number; file: string; vol?: number}[];
};

export type Cue = {s: number; e: number; text: string};
export type SfxKind = 'pop' | 'whoosh' | 'stamp' | 'ding';
export type Story = {
  id: string;
  fps?: number;
  voice?: string; // public/ এর ভেতরের পাথ, যেমন stories/my/voice.mp3
  srt?: string; // public/ এর ভেতরের পাথ
  cues?: Cue[]; // SRT ছাড়া সরাসরি দিলে
  keywords?: string[]; // ক্যাপশনে হাইলাইট হবে
  sfxMap?: Partial<Record<SfxKind, string>>; // public/sfx/ এর ফাইলনাম
  sfxVolume?: number;
  cast: Record<string, CharacterConfig>;
  scenes: SceneSpec[];
};

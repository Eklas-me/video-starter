import type {CharacterConfig} from '../../lib/types';

// প্রতিটি চরিত্র শুধু একটি কনফিগ — আলাদা কম্পোনেন্ট লাগে না
export const cast: Record<string, CharacterConfig> = {
  rafi: {
    label: 'রাফি',
    base: 'teen',
    skin: '#e0ac69',
    hair: {style: 'short', color: '#2b2118'},
    outfit: {type: 'shirt', color: '#3B82F6', pants: '#3b3b4f'},
  },
  abbu: {
    label: 'আব্বু',
    base: 'man',
    skin: '#c68642',
    hair: {style: 'none', color: '#4a4a4a'},
    outfit: {type: 'panjabi', color: '#f1ede4', color2: '#c9b98a'},
    accessories: ['topi', 'beard'],
    accColor: '#ffffff',
  },
};

# GUIDE — ভিডিও মেকার স্টার্টার টেমপ্লেট

ক্যারেক্টার, বাবল, কার্ড, ব্যাকগ্রাউন্ড, আইকন, ক্যাপশন ও ট্রানজিশন একবার বানানো আছে (`src/lib/`)।
নতুন গল্পে **শুধু ডেটা** লিখতে হয় (`src/stories/<নাম>/`)। কোর কোড বদলাতে হয় না।
সব নাম/অপশনের তালিকা: `MANIFEST.md`।

## দ্রুত শুরু
```
npm install
npx remotion studio src/index.ts      # প্রিভিউ
npx remotion render src/index.ts example-9x16 out/video.mp4   # রেন্ডার (9:16)
npx remotion render src/index.ts example-16x9 out/video.mp4   # রেন্ডার (16:9)
```
`CharacterGallery` কম্পোজিশনে সব বেস টাইপ, এক্সপ্রেশন, পোশাক ও পোজ এক নজরে দেখা যায়।

## নতুন গল্প বানানোর ধাপ
1. `src/stories/_example` ফোল্ডার কপি করে নতুন নাম দিন, যেমন `src/stories/rafi`।
2. `voice.mp3` ও `voice.srt` রাখুন `public/stories/rafi/` এ।
3. `index.ts` এ `id`, `voice: 'stories/rafi/voice.mp3'`, `srt: 'stories/rafi/voice.srt'`, `keywords` বসান। (`cues` লাইনটি মুছুন)
4. `cast.ts` এ চরিত্রদের কনফিগ লিখুন (বেস টাইপ, গায়ের রঙ, চুল, পোশাক, অ্যাক্সেসরি)।
5. `data.ts` এ সিন তালিকা লিখুন। `start/end` সেকেন্ডে, SRT/অডিওর টাইমিং থেকে।
6. `src/stories/index.ts` এ গল্পটি import করে তালিকায় যোগ করুন।
7. Studio তে প্রিভিউ → ঠিক থাকলে রেন্ডার।

## নিয়ম যা টেমপ্লেট নিজেই মানে
- সব দৃশ্য ১০০% ফুল-স্ক্রিন; ব্যাজ/বাবল/ক্যাপশন সব ভাসমান ওভারলে।
- কলআউট বাবল, নোট কার্ড বা স্ট্যাম্প চললে নিচের ক্যাপশন অটো বন্ধ থাকে। গ্রাফিক সিনেও বন্ধ (`captionOn: true` দিলে চালু)।
- ক্যাপশন SRT থেকে ≤৫ শব্দের চাঙ্কে ভেঙে আসে; `keywords` হলুদ-বোল্ড হয়।
- `say` আইটেম চলার সময় বক্তার মুখ অটো নড়ে; `speak: [[s,e]]` দিয়েও দেওয়া যায়।
- সাউন্ড ইফেক্ট: `sfxMap` দিলে বাবল/আইকন/নোট এ `pop`, স্ট্যাম্পে `stamp`, সিন বদলে `whoosh` অটো বসে (একই ইফেক্ট ১.৫ সেকেন্ডের মধ্যে আবার বাজে না; ভলিউম ≤ ০.৪)। নির্দিষ্ট জায়গায় চাইলে সিনে `sfx` দিন।
- মোট দৈর্ঘ্য = শেষ সিনের `end`।
- ন্যারেটর পর্দায় দেখা যায় না; শুধু ভয়েসওভার।

## নতুন কিছু যোগ করার জায়গা
| কী | কোথায় |
|---|---|
| নতুন চরিত্র | শুধু গল্পের `cast.ts` এ কনফিগ |
| এক সিনে পোশাক বদল | অ্যাক্টরে `outfit: { type:'hoodie', color:'#...' }` |
| নতুন পোশাকের ধরন | `lib/character/parts.tsx` (Garment) + `lib/character/geo.ts` (EXT, SLEEVE, PANTS) + `lib/types.ts` (OutfitType) |
| নতুন চুল / অ্যাক্সেসরি | `lib/character/parts.tsx` (HairFront/HairBack/HeadFront) + `types.ts` |
| নতুন বডি টাইপ | `lib/character/geo.ts` (BODY) + `types.ts` (BaseType) |
| নতুন এক্সপ্রেশন | `geo.ts` (FACES) + `types.ts` (Expression) |
| নতুন পোজ | `geo.ts` (POSES) + `types.ts` (Pose) |
| নতুন ব্যাকগ্রাউন্ড | `lib/backgrounds/Background.tsx` (নতুন case) + `types.ts` (BgType) |
| নতুন আইকন | `lib/icons/Icons.tsx` + `types.ts` (IconName) |
| নতুন গ্রাফিক টাইপ | `lib/scenes-lib/Graphic.tsx` + `types.ts` (GraphicSpec) |

নতুন যা বানানো হবে তা শুধু যোগ করুন, পুরোনোটা ভাঙবেন না — তাহলে আগের গল্প সবসময় ঠিকঠাক রেন্ডার হবে।
**নতুন কিছু যোগ করলে `MANIFEST.md` আপডেট করুন** (Claude কে এটাই পড়তে দেওয়া হয়)।

## Claude কে নতুন চ্যাটে কী দেবেন
`GUIDE.md` + `MANIFEST.md` (কয়েক KB), সাথে স্ক্রিপ্ট, `voice.mp3`, SRT, ক্যারেক্টার লিস্ট।
পুরো প্রজেক্ট দেওয়ার দরকার নেই। Claude শুধু `cast.ts`, `data.ts`, `index.ts` এবং নতুন পোশাক/ব্যাকগ্রাউন্ড লাগলে সেই ফাইলটুকু দেবে।

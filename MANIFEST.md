# MANIFEST — টেমপ্লেটে যা যা আছে (নামগুলো হুবহু এভাবেই লিখতে হবে)

## Formats
`vertical` 1080×1920 (id suffix `9x16`) · `horizontal` 1920×1080 (id suffix `16x9`) · fps 30
প্রতিটি গল্পের জন্য অটো রেজিস্টার হয়: `<story.id>-9x16`, `<story.id>-16x9`। এছাড়া `CharacterGallery`।

## Character (`lib/types.ts` → CharacterConfig)
- `base`: boy | girl | teen | man | woman | elderMan | elderWoman
- `skin`: hex · `label`: নামের ব্যাজ
- `hair`: { style: none | short | side | long | bun | curly | elder, color }
- `outfit`: { type, color, color2?, pants?, shorts? }
  - type: tshirt | shirt | panjabi | hoodie | uniform | overall | saree | kameez | suit
  - color2 = কলার/টাই/ব্লাউজ/ভেতরের শার্ট/পাড়ের রঙ (type অনুযায়ী)
- `accessories`: glasses | beard | mustache | cap | topi | hijab  (beard/mustache এর রঙ = hair.color)
- `accColor`: cap / topi / hijab এর রঙ

## Expression
neutral | happy | sad | angry | surprised | cry | thinking | worried
(কথা বললে মুখ অটো ৩ শেপে বদলায়; পলক অটো; cry তে পানির ফোঁটা; worried তে ঘাম)

## Pose
idle | walk | point | hold | sit | wave | armsUp | handsFace | handsHips
(`holding: IconName` দিলে ডান হাতে আইকন-প্রপ ধরা থাকে; `tremble: true` = কাঁপুনি)

## Slot (ক্যারেক্টারের জায়গা, দুই ফরম্যাটে অটো ঠিক হয়)
farLeft | left | center | right | farRight  — right/farRight এ অটো ফ্লিপ (মাঝের দিকে মুখ)

## Backgrounds (`bg: { type, variant?, color? }`)
home | shop | road | village | office | garage | nature | school | clean
variant: day | night · clean এ `color` দেওয়া যায়

## Icons (IconName)
coin money clock calendar food book key phone question exclaim bulb heart brokenHeart
warning check cross house car wrench gift star lock sun moon

## Scene → items (ওভারলে)
- `{kind:'say', by, text, t, dur}` স্পিচ বাবল (বক্তার মুখ অটো নড়ে)
- `{kind:'think', by, text? | icon?, t, dur}` থট বাবল
- `{kind:'icon', name, t, dur, anim?: pop|float|pulse|slide, size?}` + অবস্থান: `at:[x,y]` (০–১ ভগ্নাংশ) অথবা `near:'id', dx, dy`
- `{kind:'note', text, t, dur, color?}` পিন করা নোট কার্ড
- `{kind:'stamp', text, t, dur, color?}` স্ট্যাম্প
- `t`, `dur` = সিনের শুরু থেকে সেকেন্ড

## Scene → graphic (ক্যারেক্টার ছাড়া ক্লিন মোশন গ্রাফিক্স)
compare{title?,left,right} · checklist{title?,items} · timeline{title?,items} · flow{title?,steps} ·
quote{text,by?} · progress{title?,items:[{label,value,color?}]} · bignumber{value,label,icon?} · question{q,options}

## Scene → অন্যান্য
`badge` (উপরের লোকেশন/সময় পিল) · `enter`: fade|slide|zoom|wipe|none · `zoom:[from,to]` · `zoomOrigin:[x,y]`
`shake:[t0,t1,amp?]` · `caption:false` · `captionOn:true` (গ্রাফিক সিনে ক্যাপশন) · `sfx:[{t,file,vol?}]`

## Actor (scene.cast[])
`id, at, expr?, pose?, flip?, holding?, tremble?, scale?, outfit?(এই সিনের জন্য পোশাক বদল), enter?: slide|pop|fade, from?, until?, speak?: [[s,e]], badge?: true|'নাম', states?: [{t, expr?, pose?, tremble?, holding?, flip?}]`

## Story
`id, fps?, voice?, srt?, cues?, keywords?, sfxMap?, sfxVolume?, cast, scenes`
sfxMap কী: pop | whoosh | stamp | ding (ফাইল public/sfx/ এ)

## Components (`lib/`)
character/Character · ui/Overlays (SpeechBubble, ThoughtBubble, NameBadge, LocPill, NoteCard, Stamp, Caption) ·
scenes-lib/Graphic · backgrounds/Background · icons/Icons · StoryPlayer · srt (parseSrt, useCues, chunkCues) · layout (useLayout) · anim

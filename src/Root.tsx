import React from 'react';
import {Composition} from 'remotion';
import {CharacterGallery} from './CharacterGallery';
import {FORMATS, FPS, type Format} from './lib/config';
import {StoryPlayer} from './lib/StoryPlayer';
import {stories} from './stories';

// প্রতিটি গল্পের জন্য দুটি কম্পোজিশন: <id>-9x16 এবং <id>-16x9
export const Root: React.FC = () => (
  <>
    {stories.flatMap((story) =>
      (Object.keys(FORMATS) as Format[]).map((f) => {
        const F = FORMATS[f];
        const fps = story.fps ?? FPS;
        const dur = Math.ceil(Math.max(...story.scenes.map((s) => s.end)) * fps);
        return <Composition key={`${story.id}-${F.suffix}`} id={`${story.id}-${F.suffix}`} component={StoryPlayer} width={F.w} height={F.h} fps={fps} durationInFrames={dur} defaultProps={{story}} />;
      }),
    )}
    <Composition id="CharacterGallery" component={CharacterGallery} width={1920} height={1080} fps={FPS} durationInFrames={150} />
  </>
);

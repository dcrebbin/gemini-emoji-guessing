import React from "react";
import EmojiShowcase from "./emoji-showcase";

interface InfoSectionProps {
  emojis: EmojiObject[];
  emojisCollected: number;
}
export interface EmojiObject {
  emoji: string;
  emojiCaught: boolean;
}

export default function InfoSection(props: Readonly<InfoSectionProps>) {
  return (
    <div className="w-full flex flex-col gap-4 order-1">
      <div className="flex flex-col gap-4 text-xl lg:text-3xl text-white">
        <p>Where&apos;s that emoji?</p>
        <p>Where did it go?</p>
        <p>I know it was here, somewhere.</p>
      </div>
      <EmojiShowcase emojisCollected={props.emojisCollected} emojis={props.emojis} />
    </div>
  );
}

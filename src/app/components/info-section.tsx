import React from "react";
import EmojiShowcase from "./emoji-showcase";

interface InfoSectionProps {
  emojis: EmojiObject[];
  emojisCollected: number;
  emojiShowcaseView: React.RefObject<HTMLDivElement>;
}
export interface EmojiObject {
  emoji: string;
  image: string;
  emojiCaught: boolean;
}

export default function InfoSection(props: Readonly<InfoSectionProps>) {
  return (
    <div className="w-full flex flex-col gap-4 order-1 z-10">
      <div className="flex flex-col gap-4 text-xl lg:text-3xl text-white p-2 bg-black/30 w-fit h-fit rounded-lg">
        <p>Where&apos;s that emoji?</p>
        <p>Where did it go?</p>
        <p>I know it was here, somewhere.</p>
      </div>
      <EmojiShowcase emojiShowcaseView={props.emojiShowcaseView} emojisCollected={props.emojisCollected} emojis={props.emojis} />
    </div>
  );
}

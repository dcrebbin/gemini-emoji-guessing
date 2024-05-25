import React from "react";

interface InfoSectionProps {
  emojis: EmojiObject[];
}
export interface EmojiObject {
  emoji: string;
  emojiCaught: boolean;
}

export default function InfoSection(props: InfoSectionProps) {
  return (
    <div className="w-full flex flex-col gap-4 order-1">
      <div className="flex flex-col gap-4 text-xl lg:text-3xl text-white">
        <p>Where&apos;s that emoji?</p>
        <p>Where did it go?</p>
        <p>I know it was here, somewhere.</p>
      </div>
      <div className="w-64 pb-3 lg:w-[25rem] h-auto drop-shadow-md">
        <div className="bg-[#E9EBEF] h-fit flex p-2 flex-col ">
          <p className="text-[#BBBCC0] px-2 text-xs font-bold">SMILEYS & PEOPLE</p>
          <div className="grid grid-flow-col grid-rows-5 overflow-x-auto overflow-y-hidden text-4xl">
            {props.emojis.map((emojiObject) => (
              <div key={emojiObject.emoji} className="relative">
                {emojiObject.emojiCaught ? <p className="absolute text-xs">✅</p> : null}
                <p>{emojiObject.emoji}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

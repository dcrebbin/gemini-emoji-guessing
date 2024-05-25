import React from "react";
import { EmojiObject } from "./info-section";

interface EmojiShowcaseProps {
  emojis: EmojiObject[];
  emojisCollected: number;
  emojiShowcaseView: React.RefObject<HTMLDivElement>;
}

export default function EmojiShowcase(props: Readonly<EmojiShowcaseProps>) {
  return (
    <div className="w-64 pb-3 lg:w-[25rem] h-auto drop-shadow-md">
      <div className="w-full h-[3rem] bg-white p-4 flex items-center text-[#999999] font-bold">Emojis Collected: {props.emojisCollected} </div>
      <div className="bg-[#E9EBEF] h-fit flex p-2 flex-col ">
        <p className="text-[#BBBCC0] px-2 text-xs font-bold">SMILEYS & PEOPLE</p>
        <div className="grid grid-flow-col grid-rows-5 overflow-x-auto overflow-y-hidden text-4xl" ref={props.emojiShowcaseView}>
          {props.emojis.map((emojiObject) => (
            <div key={emojiObject.emoji} className="relative">
              {emojiObject.emojiCaught ? <p className="absolute text-xs">✅</p> : null}
              <p data-emoji={emojiObject.emoji}>{emojiObject.emoji}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

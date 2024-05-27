import React, { useState } from "react";
import { EmojiObject } from "./info-section";

interface EmojiShowcaseProps {
  emojis: EmojiObject[];
  emojisCollected: number;
  emojiShowcaseView: React.RefObject<HTMLDivElement>;
}

export default function EmojiShowcase(props: Readonly<EmojiShowcaseProps>) {
  const [selectedView, setSelectedView] = useState("Emojis");

  return (
    <div className="w-64 pb-3 lg:w-[25rem] h-auto drop-shadow-md">
      <div className="w-full h-[3rem] p-4 items-center bg-white text-[#999999] font-bold flex gap-2">
        <button
          className={selectedView == "Emojis" ? "underline" : null}
          onClick={() => {
            setSelectedView("Emojis");
          }}
        >
          <p>Emojis</p>
        </button>
        <button
          onClick={() => {
            setSelectedView("Real life");
          }}
          className={selectedView != "Emojis" ? "underline" : null}
        >
          <p>Real life</p>
        </button>
      </div>

      <div className="bg-[#E9EBEF] h-fit flex p-2 flex-col ">
        {selectedView === "Emojis" ? (
          <div>
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
        ) : (
          <div>
            <p className="text-[#BBBCC0] px-2 text-xs font-bold">SMILEYS & PEOPLE</p>
            <div className="grid grid-flow-col grid-rows-5 overflow-x-auto overflow-y-hidden text-4xl" ref={props.emojiShowcaseView}>
              {props.emojis.map((emojiObject) => (
                <div key={`image${emojiObject.emoji}`} className="relative">
                  {!emojiObject.image ? <p>❔</p> : <img src={emojiObject.image} alt={emojiObject.emoji} className="h-10 w-10 object-cover" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full h-[3rem] p-2 flex items-center text-[#BBBCC0] font-bold">Emojis Collected: {props.emojisCollected} </div>
      </div>
    </div>
  );
}

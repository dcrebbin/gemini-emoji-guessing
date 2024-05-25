import React, { useRef } from "react";

interface PhotoEmojiComparisonProps {
  emoji: string;
  imageRef: React.RefObject<HTMLImageElement>;
  awaitingResponse: boolean;
}

export default function PhotoEmojiComparison(props: PhotoEmojiComparisonProps) {
  const copyRef = useRef<HTMLButtonElement | null>(null);

  function copyAnimation() {
    setTimeout(() => {
      copyRef.current!.innerText = "COPY";
      copyRef.current?.classList.remove("text-2xl");
      copyRef.current?.classList.remove("pb-1");
      copyRef.current?.classList.add("text-3xl");
      copyRef.current!.style.backgroundColor = "black";
    }, 200);
  }

  function copyEmoji() {
    navigator.clipboard.writeText(props.emoji).then(() => {
      console.log("Emoji copied to clipboard!");
      copyRef.current!.innerText = "COPIED!";
      copyRef.current?.classList.add("pb-1");
      copyRef.current?.classList.remove("text-3xl");
      copyRef.current?.classList.add("text-2xl");
      copyRef.current!.style.backgroundColor = "green";
      copyAnimation();
    });
  }

  return (
    <div className="flex gap-6">
      <div className="w-24 h-[8.2rem] rounded-lg bg-white">
        <img className="object-cover w-max block overflow-hidden h-full image rounded-lg drop-shadow-md" ref={props.imageRef}></img>
      </div>
      <div className="flex flex-col drop-shadow-md">
        <div className="flex items-center justify-center">
          <input className={"w-24 text-center bg-none text-[4rem] rounded-t-lg "} readOnly={true} value={props.emoji}></input>
          {props.awaitingResponse ? <p className="absolute text-6xl animate-spin">❔</p> : null}
        </div>
        <button ref={copyRef} onClick={copyEmoji} className="w-24 text-3xl bg-black rounded-b-lg text-white">
          COPY
        </button>
      </div>
    </div>
  );
}

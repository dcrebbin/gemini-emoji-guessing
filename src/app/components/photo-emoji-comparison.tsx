import React, { useRef } from "react";
import PlaceholderIcon from "../../icons/placeholder";

interface PhotoEmojiComparisonProps {
  emoji: string;
  imageRef: React.RefObject<HTMLImageElement>;
  awaitingResponse: boolean;
}

export default function PhotoEmojiComparison(props: Readonly<PhotoEmojiComparisonProps>) {
  const copyRef = useRef<HTMLButtonElement | null>(null);

  //Very sus way todo animation lol
  function copyAnimation() {
    setTimeout(() => {
      if (!copyRef.current) return;
      copyRef.current.innerText = "COPY";
      copyRef.current?.classList.remove("text-2xl");
      copyRef.current?.classList.remove("pb-1");
      copyRef.current?.classList.add("text-3xl");
      copyRef.current.style.backgroundColor = "black";
    }, 200);
  }

  function copyEmoji() {
    navigator.clipboard.writeText(props.emoji).then(() => {
      if (!copyRef.current) return;
      console.log("Emoji copied to clipboard!");
      copyRef.current.innerText = "COPIED!";
      copyRef.current?.classList.add("pb-1");
      copyRef.current?.classList.remove("text-3xl");
      copyRef.current?.classList.add("text-2xl");
      copyRef.current.style.backgroundColor = "green";
      copyAnimation();
    });
  }

  return (
    <div className="flex gap-6">
      <div className="w-24 rounded-lg bg-white flex flex-col relative items-center">
        {!props.imageRef.current?.src ? (
          <div className="w-full h-fit absolute bg-white z-20 rounded-lg">
            <PlaceholderIcon />
          </div>
        ) : null}

        <img className="object-cover w-max block overflow-hidden h-full image rounded-lg drop-shadow-md z-10" ref={props.imageRef}></img>
        <div className="w-full h-[2.2rem] bg-black text-white rounded-b-lg">
          <p className="text-3xl text-center">Photo</p>
        </div>
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

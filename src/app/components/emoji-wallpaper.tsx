import React from "react";

export default function EmojiWallpaper(props: any) {
  return (
    <div className="w-full h-full fixed z-0 p-20">
      <p className="text-[8rem] absolute left-[30rem] rotate-12 blur-[1px]">{props.emoji}</p>
      <p className="text-[10rem] absolute left-[45rem] -rotate-12 blur-[1px]">{props.emoji}</p>
      <p className="text-[15rem] absolute left-[5rem] -rotate-12 blur-[4px]">{props.emoji}</p>
      <p className="text-[10rem] absolute top-[-10rem] left-[30rem] -rotate-180 blur-[8px]">{props.emoji}</p>
      <p className="text-[12rem] absolute left-[75rem] rotate-45 blur-[1px]">{props.emoji}</p>
      <p className="text-[9rem] absolute top-[25rem] left-[50rem] -rotate-45 blur-[0px]">{props.emoji}</p>
      <p className="text-[8rem] absolute top-[35rem] left-[10rem] -rotate-90 blur-[3px]">{props.emoji}</p>
      <p className="text-[5rem] absolute top-[45rem] left-[60rem] blur-[1px]">{props.emoji}</p>
      <p className="text-[8rem] absolute top-[45rem] left-[80rem] rotate-12 blur-[0px]">{props.emoji}</p>
      <p className="text-[6rem] absolute top-[45rem] left-[20rem] rotate-45 blur-[2px]">{props.emoji}</p>
    </div>
  );
}

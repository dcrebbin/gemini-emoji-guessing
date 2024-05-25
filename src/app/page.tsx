"use client";
import { useRef, useState } from "react";
import GithubIcon from "../icons/github";
import React from "react";
import ShareIcon from "../icons/share";
import { EMOJIS } from "./constants/emojis";
import Footer from "./components/footer";
import DownloadModal from "./components/download-modal";
import Webcam from "./components/web-cam";
import InfoSection from "./components/info-section";
import PhotoEmojiComparison from "./components/photo-emoji-comparison";

interface EmojiObject {
  emoji: string;
  emojiCaught: boolean;
}

export default function Home() {
  const [emoji, setEmoji] = useState("❔");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const sharedImageRef = useRef<HTMLImageElement | null>(null);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [emojis, setEmojis] = useState<EmojiObject[]>(EMOJIS);

  const modalRef = useRef<HTMLDivElement | null>(null);

  async function identifyEmoji(imageData: string) {
    setAwaitingResponse(true);
    setEmoji("");
    const emojiResponse = (await fetch("/api/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData: imageData }),
    }).catch((err) => {
      console.error(`An error occurred: ${err}`);
      setEmoji("❌");
    })) as Response;
    processEmojiIdentification(emojiResponse);
  }

  async function processEmojiIdentification(emojiResponse: Response) {
    setAwaitingResponse(false);
    const returnedEmoji = (await emojiResponse.text()).trim() as string;
    if (returnedEmoji !== "") {
      setEmoji(returnedEmoji);
      caughtEmoji(returnedEmoji);
      console.log(`The emoji is: ${returnedEmoji}`);
    } else {
      setEmoji("❌");
      console.log("No emoji found.");
    }
  }

  function caughtEmoji(emoji: string) {
    const emojiIndex = emojis.findIndex((emojiObject) => emojiObject.emoji === emoji);
    if (emojiIndex !== -1) {
      setEmojis((prev) => {
        const newEmojis = [...prev];
        newEmojis[emojiIndex].emojiCaught = true;
        return newEmojis;
      });
    }
  }

  return (
    <main className="font-sans flex flex-col items-center justify-between p-8 min-h-screen overflow-auto lg:px-20 bg-no-repeat bg-cover bg-[url('/images/ffflux.svg')]">
      <DownloadModal emoji={emoji} imageRef={imageRef} sharedImageRef={sharedImageRef} modalRef={modalRef} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
        <div className="w-full flex flex-col items-center gap-4 order-1 lg:order-2">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl lg:text-4xl text-white flex">🤔🤔🤔🤔.ws </h1>
            <a className="w-14 hover:drop-shadow-md" target="_blank" href="https://github.com/dcrebbin/gemini-emoji-guessing">
              <GithubIcon />
            </a>
          </div>
          <Webcam imageRef={imageRef} sharedImageRef={sharedImageRef} identifyEmoji={identifyEmoji} />
          <PhotoEmojiComparison emoji={emoji} imageRef={imageRef} awaitingResponse={awaitingResponse} />
          {imageRef.current?.src ? (
            <button
              onClick={() => {
                if (modalRef?.current) modalRef.current.style.left = "0";
              }}
              className="p-2 bg-black/60 rounded-lg w-10"
            >
              <ShareIcon />
            </button>
          ) : null}
        </div>
        <InfoSection emojis={emojis} />
      </div>
      <Footer />
    </main>
  );
}

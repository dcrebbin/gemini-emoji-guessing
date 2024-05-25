"use client";
import { useEffect, useRef, useState } from "react";
import GithubIcon from "../icons/github";
import React from "react";
import ShareIcon from "../icons/share";
import { EMOJIS } from "./constants/emojis";
import Footer from "./components/footer";
import ShareModal from "./components/share-modal";
import Webcam from "./components/web-cam";
import InfoSection, { EmojiObject } from "./components/info-section";
import PhotoEmojiComparison from "./components/photo-emoji-comparison";

export default function Home() {
  const [emoji, setEmoji] = useState("❔");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const sharedImageRef = useRef<HTMLImageElement | null>(null);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [emojis, setEmojis] = useState<EmojiObject[]>(EMOJIS);
  const [emojisCollected, setEmojisCollected] = useState(0);
  const emojiShowcaseView = useRef<HTMLDivElement | null>(null);
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
    const returnedEmoji = (await emojiResponse.text()).trim();
    if (returnedEmoji !== "") {
      setEmoji(returnedEmoji);
      scrollToEmoji(returnedEmoji);
      caughtEmoji(returnedEmoji);
      console.log(`The emoji is: ${returnedEmoji}`);
    } else {
      setEmoji("❌");
      console.log("No emoji found.");
    }
  }

  function scrollToEmoji(emoji: string) {
    if (!emojiShowcaseView.current) {
      return;
    }
    const emojiElement = emojiShowcaseView.current.querySelector(`[data-emoji="${emoji}"]`) as HTMLElement;
    if (emojiElement) {
      emojiElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function caughtEmoji(emoji: string) {
    const emojiIndex = emojis.findIndex((emojiObject) => emojiObject.emoji === emoji);
    if (emojiIndex !== -1 && !emojis[emojiIndex].emojiCaught) {
      console.log("Emoji Caught!");
      setEmojisCollected((prev) => prev + 1);
      setEmojis((prev) => {
        const newEmojis = [...prev];
        newEmojis[emojiIndex].emojiCaught = true;
        localStorage.setItem("emojisCaught", JSON.stringify(newEmojis));
        console.log("Emoji Saved!");
        return newEmojis;
      });
    }
  }

  useEffect(() => {
    console.log("Checking for emojis caught in local storage.");
    const emojisCaught = localStorage.getItem("emojisCaught");
    if (emojisCaught) {
      const emojisCaughtArray = JSON.parse(emojisCaught) as EmojiObject[];
      setEmojis(emojisCaughtArray);
      setEmojisCollected(emojisCaughtArray.filter((emoji) => emoji.emojiCaught).length);
    } else {
      console.log("No emojis caught found in local storage.");
      localStorage.setItem("emojisCaught", JSON.stringify(emojis));
    }
  }, []);

  return (
    <main className="font-sans flex flex-col items-center justify-between p-8 min-h-screen overflow-auto lg:px-20 bg-no-repeat bg-cover bg-[url('/images/ffflux.svg')]">
      <ShareModal emoji={emoji} imageRef={imageRef} sharedImageRef={sharedImageRef} modalRef={modalRef} />
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
        <InfoSection emojiShowcaseView={emojiShowcaseView} emojisCollected={emojisCollected} emojis={emojis} />
      </div>
      <Footer />
    </main>
  );
}

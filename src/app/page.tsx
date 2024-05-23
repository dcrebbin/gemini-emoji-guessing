"use client";
import { useRef, useState } from "react";
import GithubIcon from "../icons/github";
import React from "react";
import CameraIcon from "../icons/camera";
import StopIcon from "../icons/stop";
import ShareIcon from "../icons/share";
import DownloadIcon from "../icons/download";
import PlaceholderIcon from "../icons/placeholder";

export default function Home() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [emoji, setEmoji] = useState("❔");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const sharedImageRef = useRef<HTMLImageElement | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [count, setCount] = useState(3);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  let photoTaken = false;
  const copyRef = useRef<HTMLButtonElement | null>(null);
  function activateCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video!.srcObject = stream;
        setCameraOn(true);

        video!.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
  }

  function photoCountDown() {
    photoTaken = false;
    setTakingPhoto(true);
    const countDown = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          takePhoto();
          clearInterval(countDown);
          return 3;
        }
        overlayRef.current!.style.backgroundColor = "white";
        setTimeout(() => {
          overlayRef.current!.style.backgroundColor = "transparent";
        }, 100);
        return prev - 1;
      });
    }, 1000);
  }

  async function takePhoto() {
    if (photoTaken) {
      return;
    }
    photoTaken = true;
    const canvas = document.createElement("canvas");
    canvas.width = video!.videoWidth;
    canvas.height = video!.videoHeight;
    canvas.getContext("2d")!.drawImage(video!, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    console.log("Photo taken!");
    imageRef.current!.src = data;
    sharedImageRef.current!.src = data;
    const base64Image = data.split(",")[1];
    setTakingPhoto(false);
    identifyEmoji(base64Image);
  }

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
    navigator.clipboard.writeText(emoji).then(() => {
      console.log("Emoji copied to clipboard!");
      copyRef.current!.innerText = "COPIED!";
      copyRef.current?.classList.add("pb-1");
      copyRef.current?.classList.remove("text-3xl");
      copyRef.current?.classList.add("text-2xl");
      copyRef.current!.style.backgroundColor = "green";
      copyAnimation();
    });
  }

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
    setAwaitingResponse(false);
    const returnedEmoji = (await emojiResponse.text()) as string;
    if (returnedEmoji !== "") {
      setEmoji(returnedEmoji);
      console.log(`The emoji is: ${returnedEmoji}`);
    } else {
      setEmoji("❌");
      console.log("No emoji found.");
    }
  }

  function deactivateCamera() {
    setCameraOn(false);
    const mediaStream = video!.srcObject as MediaStream;
    mediaStream.getTracks().forEach((track) => track.stop());
    setVideo((prev) => {
      if (prev) {
        prev.srcObject = null;
      }
      return prev;
    });
  }

  function downloadSharingImage() {
    //save div as image
    const image = new Image();
    image.src = imageRef.current!.src;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height * 2;
    const context = canvas.getContext("2d");
    context!.fillStyle = "white";
    context!.fillRect(0, 0, canvas.width, 300);
    context!.font = "248px sans-serif";
    context!.fillText(emoji, 150, 250);
    context!.drawImage(image, 0, 300);
    const link = document.createElement("a");
    link.download = "emoji.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <main className="font-sans flex flex-col items-center justify-between p-8 min-h-screen overflow-auto lg:px-20 bg-no-repeat bg-cover bg-[url('/images/ffflux.svg')]">
      <div ref={modalRef} className="bg-white drop-shadow-md w-fit fixed top-0 h-fit m-10 z-[99] rounded-lg left-[-100%]">
        <button
          className="absolute top-0 right-0 text-black text-6xl px-4"
          onClick={() => {
            if (modalRef?.current) modalRef.current.style.left = "-100%";
          }}
        >
          -
        </button>
        <div className="grid grid-cols-1 h-full w-full">
          <p className="text-[9rem] text-center self-center">{emoji}</p>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full p-4 h-full flex items-center justify-center">
              {sharedImageRef.current?.src ? null : <PlaceholderIcon />}
              <img ref={sharedImageRef} className="block object-cover w-max block overflow-hidden h-full image rounded-lg drop-shadow-md" width={300} height={300}></img>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center p-2 right-0">
          <div className="bg-black/60 p-2 rounded-lg">
            <button className="w-8 text-center" onClick={downloadSharingImage}>
              <DownloadIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
        <div className="w-full flex flex-col items-center gap-4 order-1 lg:order-2">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl lg:text-4xl text-white flex">🤔🤔🤔🤔.ws </h1>
            <a className="w-14 hover:drop-shadow-md" target="_blank" href="https://github.com/dcrebbin/gemini-emoji-guessing">
              <GithubIcon />
            </a>
          </div>
          <div className="bg-white/30 w-full md:h-[17rem] lg:h-[30rem] h -60 rounded-lg flex items-center justify-center relative drop-shadow-md">
            <div ref={overlayRef} className="w-full h-full absolute"></div>
            <video ref={(video) => setVideo(video)} className="w-full h-full object-cover rounded-lg" autoPlay playsInline />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">{count > 0 && takingPhoto ? <p className="text-[8rem] text-black/50">{count}</p> : null}</div>
            <div className="flex items-center absolute bottom-0 gap-2 mb-2">
              <button
                className="w-16 h-16 bg-black/60 rounded-2xl drop-shadow-lg"
                onClick={() => {
                  if (video?.srcObject && count === 3) {
                    photoCountDown();
                  } else {
                    activateCamera();
                  }
                }}
              >
                <CameraIcon />
              </button>
              {cameraOn ? (
                <button className="w-16 h-16 bg-black/60 rounded-2xl drop-shadow-lg" onClick={deactivateCamera}>
                  <StopIcon />
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-24 h-[8.2rem] rounded-lg bg-white">
              <img className="object-cover w-max block overflow-hidden h-full image rounded-lg drop-shadow-md" ref={imageRef}></img>
            </div>
            <div className="flex flex-col drop-shadow-md">
              <div className="flex items-center justify-center">
                <input className={"w-24 text-center bg-none text-[4rem] rounded-t-lg "} readOnly={true} value={emoji}></input>
                {awaitingResponse ? <p className="absolute text-6xl animate-spin">❔</p> : null}
              </div>
              <button ref={copyRef} onClick={copyEmoji} className="w-24 text-3xl bg-black rounded-b-lg text-white">
                COPY
              </button>
            </div>
          </div>
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
        <div className="w-full flex flex-col gap-4 order-1">
          <div className="flex flex-col gap-4 text-xl lg:text-3xl">
            <p>Where&apos;s that emoji?</p>
            <p>Where did it go?</p>
            <p>I know it was here, somewhere.</p>
          </div>
          <div className="w-64 pb-3 lg:w-[30rem] h-auto">
            <img alt="emoji keyboard" src="/images/emoji-keyboard.jpg" width={450} height={300}></img>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:text-xl gap-4 justify-between text-gray-900">
        <p>
          by{" "}
          <a className="underline" href="https://dcrebb.in">
            dcrebb.in
          </a>
        </p>
        <p>
          An experiment, powered by{" "}
          <a href="https://gemini.google.com" className="border-black/50 border-[1px] px-1 rounded-lg font-bold">
            Gemini
          </a>
        </p>
      </div>
    </main>
  );
}

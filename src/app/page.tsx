"use client";
import CameraIcon from "@/icons/camera";
import StopIcon from "@/icons/stop";
import { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const [cameraOn, setCameraOn] = useState(false);

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

  function takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = video!.videoWidth;
    canvas.height = video!.videoHeight;
    canvas.getContext("2d")!.drawImage(video!, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    const img: HTMLImageElement = new Image();
    img.width = canvas.width; // Set the width property separately
    img.src = data;
    document.body.appendChild(img);
  }

  function deactivateCamera() {
    setCameraOn(false);
    video!.srcObject?.getTracks().forEach((track) => track.stop());
    setVideo((prev) => {
      if (prev) {
        prev.srcObject = null;
      }
      return prev;
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 h-full overflow-auto lg:px-20 bg-no-repeat bg-cover bg-[url('/images/ffflux.svg')]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
        <div className="w-full flex flex-col items-center gap-4 order-1 lg:order-2">
          <h1 className="text-2xl lg:text-4xl">🤔🤔🤔🤔.ws</h1>
          <div className="bg-white/30 w-full md:h-[17rem] lg:h-[30rem] h-60 rounded-lg flex items-center justify-center relative drop-shadow-md">
            <video ref={(video) => setVideo(video)} className="w-full h-full object-cover rounded-lg" autoPlay playsInline />
            <div className="flex items-center absolute bottom-0 gap-2 mb-2">
              <button
                className="w-16 h-16 bg-black/60 rounded-2xl drop-shadow-lg"
                onClick={() => {
                  if (video?.srcObject) {
                    takePhoto();
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
        </div>
        <div className="w-full h-20 flex flex-col gap-4 order-1">
          <div className="flex flex-col gap-4 text-xl lg:text-3xl">
            <p>Where&apos;s that emoji?</p>
            <p>Where did it go?</p>
            <p>I know it was here, somewhere.</p>
          </div>
          <div className="w-64 pb-3 lg:w-[30rem]">
            <img alt="emoji keyboard" src="/images/emoji-keyboard.jpg" width={450} height={300}></img>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:text-xl gap-4 justify-between text-gray-900">
        <p className="flex gap-1">
          by
          <a className="underline" href="https://dcrebb.in">
            d.crebbin
          </a>
        </p>
        <p>An experiment, powered by Gemini</p>
      </div>
    </main>
  );
}

import React, { useRef, useState } from "react";
import CameraIcon from "../../icons/camera";
import StopIcon from "../../icons/stop";

interface WebcamProps {
  imageRef: React.RefObject<HTMLImageElement>;
  sharedImageRef: React.RefObject<HTMLImageElement>;
  identifyEmoji: (imageData: string) => void;
}

export default function Webcam(props: Readonly<WebcamProps>) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [count, setCount] = useState(3);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  let photoTaken = false;

  function deactivateCamera() {
    setCameraOn(false);
    if (!video) {
      return;
    }
    const mediaStream = video.srcObject as MediaStream;
    mediaStream.getTracks().forEach((track) => track.stop());
    setVideo((prev) => {
      if (prev) {
        prev.srcObject = null;
      }
      return prev;
    });
  }

  function activateCamera() {
    if (!video) {
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        setCameraOn(true);
        video.play();
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
        if (!overlayRef.current) {
          return prev;
        }
        flashTimer();
        return prev - 1;
      });
    }, 1000);
  }

  function flashTimer() {
    if (!overlayRef.current) {
      alert("overlayRef.current is null");
      return;
    }
    overlayRef.current.style.backgroundColor = "white";
    setTimeout(() => {
      if (!overlayRef.current) {
        return;
      }
      overlayRef.current.style.backgroundColor = "transparent";
    }, 100);
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
    props.imageRef.current!.src = data;
    props.sharedImageRef.current!.src = data;
    const base64Image = data.split(",")[1];
    setTakingPhoto(false);
    props.identifyEmoji(base64Image);
  }

  return (
    <div className="bg-white/30 w-full md:h-[17rem] lg:h-[30rem] h -60 rounded-lg flex items-center justify-center relative drop-shadow-md">
      <div ref={overlayRef} className="w-full h-full absolute z-50 pointer-events-none"></div>
      <video ref={(video) => setVideo(video)} className="w-full h-full object-cover rounded-lg -scale-x-100" autoPlay playsInline />
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
  );
}

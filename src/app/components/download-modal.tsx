import React from "react";
import DownloadIcon from "../../icons/download";
import PlaceholderIcon from "../../icons/placeholder";

interface ShareModalProps {
  emoji: string;
  imageRef: React.RefObject<HTMLImageElement>;
  sharedImageRef: React.RefObject<HTMLImageElement>;
  modalRef: React.RefObject<HTMLDivElement>;
}

export default function ShareModal(props: Readonly<ShareModalProps>) {
  function downloadSharingImage() {
    const image = new Image();
    image.src = props.imageRef.current!.src;

    const link = document.createElement("a");
    link.download = "emoji.png";
    const shareableImage = createSharingImage(image);
    if (!shareableImage) return;
    link.href = shareableImage.toDataURL("image/png");
    link.click();
  }

  function createSharingImage(image: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height * 2;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, 300);
    context.font = "248px sans-serif";
    context.fillText(props.emoji, 150, 250);
    context.drawImage(image, 0, 300);
    return canvas;
  }

  return (
    <div ref={props.modalRef} className="bg-white drop-shadow-md mx-4 my-4 self-center h-[90vh] fixed top-0 z-[99] rounded-lg inset-0 lg:w-fit lg:h-fit left-[150%]">
      <button
        className="absolute top-0 right-0 text-black text-6xl px-4"
        onClick={() => {
          if (props.modalRef?.current) props.modalRef.current.style.left = "150%";
        }}
      >
        -
      </button>
      <div className="grid grid-cols-1 h-full w-full">
        <p className="text-[9rem] text-center self-center">{props.emoji}</p>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full p-4 h-full flex items-center justify-center">
            {props.sharedImageRef.current?.src ? null : <PlaceholderIcon />}
            <img ref={props.sharedImageRef} className="object-cover w-max block overflow-hidden h-full image rounded-lg drop-shadow-md" width={300} height={300}></img>
          </div>
        </div>
      </div>
      <div className="= bottom-0 flex items-center justify-center p-2 right-0">
        <div className="bg-black/60 p-2 rounded-lg">
          <button className="w-8 text-center" onClick={downloadSharingImage}>
            <DownloadIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

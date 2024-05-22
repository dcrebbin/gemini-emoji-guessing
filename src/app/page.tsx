import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-no-repeat bg-cover bg-[url('/images/ffflux.svg')]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 direct grid-flow-col-row w-full h-full">
        <div className="w-full flex flex-col items-center gap-4">
          <h1>🤔🤔🤔🤔.ws</h1>
          <div className="bg-white w-full h-60 rounded-lg">Camera</div>
        </div>
        <div className=" w-full h-20 flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-xl">
            <p>Where&apos;s that emoji?</p>
            <p>Where did it go?</p>
            <p>I know it was here, somewhere.</p>
          </div>
          <Image alt="emoji keyboard" src="/images/emoji-keyboard.jpg" width={250} height={200} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-between text-gray-900">
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

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col lg:flex-row lg:text-xl gap-4 justify-between text-gray-900 z-10">
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
    </footer>
  );
}

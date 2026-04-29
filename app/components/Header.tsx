"use client";

import Image from "next/image";
import { handleWhatsApp, handleInstagram } from "../utils/handlers";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/icon.png"
          alt="Tiny Talkers Icon"
          width={56}
          height={56}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full"
        />
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-red-500">T</span>
          <span className="text-blue-500">i</span>
          <span className="text-green-500">n</span>
          <span className="text-yellow-500">y</span>{" "}
          <span className="text-purple-500">T</span>
          <span className="text-pink-500">a</span>
          <span className="text-indigo-500">l</span>
          <span className="text-orange-500">k</span>
          <span className="text-teal-500">e</span>
          <span className="text-red-400">r</span>
          <span className="text-blue-400">s</span>
        </h1>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleWhatsApp()}
          className="flex items-center gap-2 border-2 border-green-500 text-white px-2 sm:px-4 py-2 rounded-full hover:scale-105 transition"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/WhatsApp_Logo_green.svg"
            alt="WhatsApp"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover shadow-lg"
            unoptimized
          />
          <span className="hidden sm:inline text-green-500 font-semibold">
            WhatsApp
          </span>
        </button>

        <button
          onClick={handleInstagram}
          className="relative p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 hover:scale-105 transition"
        >
          <div className="flex items-center gap-2 bg-white text-black px-2 sm:px-4 py-2 rounded-full">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
              unoptimized
            />
            <span className="hidden sm:inline bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent font-semibold">
              Instagram
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
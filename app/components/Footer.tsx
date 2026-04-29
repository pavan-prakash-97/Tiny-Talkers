import Image from "next/image";
import { handleInstagram, handleWhatsApp } from "../utils/handlers";

export default function Footer({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      className={` ${isMobile ? "" : "snap-start"} flex flex-col items-center justify-center bg-gray-100 text-[#444444] text-center px-6 py-10`}
      style={{ height: "300px" }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 w-max mx-auto">
          <Image
            src="/icon.png"
            alt="Tiny Talkers Icon"
            width={32}
            height={32}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
          />
          <h2 className="text-2xl font-bold">
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
          </h2>
        </div>

        <p className="text-gray-600 max-w-md mx-auto">
          Empowering young minds with strong language skills, confidence, and
          creativity through fun & interactive learning.
        </p>

        <div className="flex gap-4 justify-center mt-3">
          <button
            onClick={() => handleWhatsApp()}
            className="bg-green-500 text-white px-4 py-2 font-bold rounded-full hover:scale-105 transition"
          >
            WhatsApp
          </button>

          <button
            onClick={handleInstagram}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition"
          >
            Instagram
          </button>
        </div>

        <p className="text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Tiny Talkers™. All rights reserved.
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { handleWhatsApp } from "../utils/handlers";
import { ArrowRight } from "lucide-react";

export default function Hero({ isMobile }: { isMobile: boolean }) {
    return (
      <section
        className={`${isMobile ? "min-h-screen" : "h-screen snap-start"} flex items-center justify-center relative mt-16 transition-all duration-700 ease-in-out`}
      >
        <div
          className={`
    relative w-full flex items-center
    ${isMobile ? "min-h-screen" : "h-[100vh]"}
  `}
        >
          {/* <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                    alt="kids"
                    className="absolute w-full h-full object-cover"
                /> */}
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop"
            alt="kids"
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-white/60" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FFF] p-6 md:p-10 rounded-xl shadow-2xl max-w-2xl m-6 md:m-20 text-center"
          >
            {/* WHY TITLE */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#444444] tracking-wide mb-4">
              “WHY <br className="hidden md:block" />{" "}
              <div className="flex items-center gap-2">
                <Image
                  src="/icon.png"
                  alt="Tiny Talkers Icon"
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-20 md:h-20 "
                />
                <div>
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
                  <span className="text-blue-400">s</span>?”
                </div>
              </div>
            </h2>

            {/* SUBTEXT */}
            <p className="text-2xl md:text-4xl font-bold text-[#4F4F4F] leading-snug">
              A strong language foundation <br />
              at an early age 🌈
            </p>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsApp()}
                className="bg-blue-700 font-bold text-white px-6 py-3 rounded-full shadow-lg"
              >
                ENROLL NOW
                <ArrowRight
                  className="w-5 h-5 inline-block ml-2"
                  strokeWidth={3}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
}
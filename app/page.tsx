// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const whatsappNumber = "917406086820";
  const message = encodeURIComponent(
    "Hi, I am interested in Tiny Talkers Summer Camp",
  );

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleInstagram = () => {
    window.open(
      "https://www.instagram.com/tiny_talkers_learning_hub/",
      "_blank",
    );
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 100);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-scroll bg-white snap-y snap-proximity"
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        section {
          transition: all 0.8s ease-in-out;
        }
      `}</style>

      {/* 🔝 STICKY HEADER */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-6 py-4">
        {/* Logo */}
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

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 border-2 border-green-500 text-white px-4 py-2 rounded-full hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4c/WhatsApp_Logo_green.svg"
              className="w-8 h-8 rounded-full object-cover shadow-lg"
            />
            <span className="text-green-500 font-semibold">WhatsApp</span>
          </button>

          <button
            onClick={handleInstagram}
            className="relative p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 hover:scale-105 transition"
          >
            <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                className="w-8 h-8 rounded-full"
              />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent font-semibold">
                Instagram
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="h-screen snap-start flex items-center justify-center relative mt-16 transition-all duration-700 ease-in-out">
        <div className="relative w-full h-[100vh] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            alt="kids"
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-white/60" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FFF] p-6 md:p-10 rounded-xl shadow-2xl max-w-2xl ml-6 md:ml-20 text-center"
          >
            {/* WHY TITLE */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#444444] tracking-wide mb-4">
              “WHY <br className="hidden md:block" />{" "}
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
                onClick={handleWhatsApp}
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

      {/* EDUCATIONAL OFFER */}
      <section className="h-screen snap-start flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
        <div className="py-24 px-6 text-center">
          <h2 className="text-5xl font-bold text-[#444444] mb-6">
            Activities Include
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 mb-10">
            Fun-based learning designed to improve communication, creativity,
            and confidence in kids.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: "Theatre & Role Play",
                img: "https://cdn.cdnparenting.com/articles/2018/04/275612612-H.webp",
              },
              {
                title: "Phonics & Language Fun",
                img: "https://assets.isu.pub/document-structure/230112215520-16234a890b2da66f553cdd6bf83ecbee/v1/6135fb55f04deec839e133bcbec1989f.jpeg",
              },
              {
                title: "Public Speaking",
                img: "https://speakscraft.com.au/wp-content/uploads/2025/10/Build-Confidence-in-Children.jpg",
              },
              {
                title: "Story Telling",
                img: "https://sgischool.in/sgis-pune/wp-content/uploads/2025/09/Storytelling-for-Children-.jpg",
              },
              {
                title: "Confidence Building",
                img: "https://www.kidsnshape.com/wp-content/uploads/help-kids-play-with-confidence-960x720.jpg",
              },
              {
                title: "Fun Games & Team Activities",
                img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <img
                  src={item.img}
                  className="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-[#444444] text-center">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - ORGANISER */}
      <section className="h-screen snap-start flex items-center justify-center bg-gray-100 px-6 transition-all duration-1000 ease-out">
        <div className="py-24 px-6 text-center">
          <h2 className="text-5xl font-bold text-[#444444] mb-6">Organiser</h2>
          <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                alt="Prema"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-xl"
              />
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl text-[#444444] font-bold mb-4">
                Prema
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Engineer from RVCE, Bengaluru with 4 years of IT experience.
                Former English teacher at NPS Bangalore and TVS Academy Tumkur.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Dedicated to helping children communicate confidently through
                fun & interactive learning. Passionate about building strong
                language foundations at an early age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - ENQUIRY */}
      <section className="h-screen snap-start flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
        {/* ENQUIRY FORM */}
        <div className="py-16 px-6 text-center text-[#444444]">
          <h2 className="text-3xl font-bold mb-6">Send Enquiry</h2>

          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();

              const form = e.currentTarget;

              const name = (form.elements.namedItem("name") as HTMLInputElement)
                .value;
              const phone = (
                form.elements.namedItem("phone") as HTMLInputElement
              ).value;
              const message = (
                form.elements.namedItem("message") as HTMLTextAreaElement
              ).value;

              const mailtoLink = `mailto:prema@example.com?subject=Enquiry from ${name}&body=Name: ${name}%0APhone: ${phone}%0AMessage: ${message}`;

              window.location.href = mailtoLink;
            }}
            className="max-w-xl mx-auto space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Parent Name"
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full p-3 border rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              Send Enquiry
            </button>
          </form>
        </div>{" "}
      </section>

      <section
        className="snap-start flex flex-col items-center justify-center bg-gray-100 text-[#444444] text-center px-6 py-10"
        style={{ height: "300px" }}
      >
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">
            {" "}
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

          <p className="text-gray-600 max-w-md mx-auto">
            Empowering young minds with strong language skills, confidence, and
            creativity through fun & interactive learning.
          </p>

          <div className="flex gap-4 justify-center mt-3">
            <button
              onClick={handleWhatsApp}
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

      {/* ⬆️ SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => {
            setShowScrollTop(false); // 👈 immediately hide
            scrollRef.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="fixed bottom-10 right-10 bg-blue-800 text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <ArrowUpIcon className="w-6 h-6" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

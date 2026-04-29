"use client";

import { motion } from "framer-motion";

export default function Activities({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      className={`
    flex flex-col items-center justify-center bg-gray-100 transition-all duration-700 ease-in-out
    ${isMobile ? "py-8" : "h-screen snap-start"}
  `}
    >
      <div className={`px-6 text-center ${isMobile ? "py-8" : "py-24 mt-24"}`}>
        <h2 className="text-3xl font-bold text-[#444444] mb-4">
          Activities Include
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mb-4">
          Fun-based learning designed to improve communication, creativity, and
          confidence in kids.
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
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <img
                src={`${item.img}?q=70&w=300&auto=format&fit=crop`}
                srcSet={`
    ${item.img}?q=60&w=200&auto=format&fit=crop 200w,
    ${item.img}?q=70&w=300&auto=format&fit=crop 300w,
    ${item.img}?q=80&w=400&auto=format&fit=crop 400w
  `}
                sizes="(max-width: 768px) 150px, 192px"
                loading="lazy"
                alt={item.title}
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
              <h3 className="text-lg font-semibold text-[#444444] text-center">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

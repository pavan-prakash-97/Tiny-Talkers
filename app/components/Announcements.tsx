"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Announcement = {
  _id: string;
  type: "image" | "video";
  title: string;
  desc: string;
  fileUrl: string;
};

export default function Announcements({ isMobile }: { isMobile: boolean }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [visibleCount, setVisibleCount] = useState(3); // 📱 mobile control

  // ================= FETCH =================
  const fetchAnnouncements = async () => {
    const res = await fetch("/api/get-announcements");
    const data = await res.json();

    const updated = await Promise.all(
      data.map(async (item: any) => {
        const res = await fetch("/api/get-file-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: item.key }),
        });

        const { url } = await res.json();

        return {
          ...item,
          fileUrl: url,
        };
      })
    );

    setAnnouncements(updated);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ================= SCROLL =================
  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`
        flex items-center justify-center px-4
        ${isMobile ? "py-16" : "h-screen snap-start"}
      `}
    >
      <div className="py-16 w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#444444] mb-4">
          Announcements
        </h2>

        <p className="text-gray-600 mb-6">
          Latest updates & highlights
        </p>

        {/* ================= MOBILE ================= */}
        {isMobile ? (
          <div className="flex flex-col items-center gap-6">
            {announcements.slice(0, visibleCount).map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="
                  w-[85%]
                  max-w-xs
                  bg-white rounded-2xl shadow-xl overflow-hidden
                "
              >
                {/* MEDIA */}
                <div className="overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.fileUrl}
                      className="w-full h-72 object-cover"
                    />
                  ) : (
                    <video
                      className="w-full h-72 object-cover"
                      autoPlay
                      muted
                      loop
                    >
                      <source src={item.fileUrl} />
                    </video>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 text-center min-h-[110px]">
                  <h3 className="font-bold text-base text-[#444444]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* SHOW MORE BUTTON */}
            {visibleCount < announcements.length && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full"
              >
                Show More
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ================= DESKTOP ================= */}

            {/* NAV BUTTONS */}
            {announcements.length > 5 && (
              <div className="flex justify-end max-w-6xl mx-auto mb-4 gap-2">
                <button
                  onClick={scrollLeft}
                  className="bg-gray-600 p-2 rounded-full hover:bg-gray-300"
                >
                  <ChevronLeftIcon className="w-4 h-4" strokeWidth={3} />
                </button>

                <button
                  onClick={scrollRight}
                  className="bg-gray-600 p-2 rounded-full hover:bg-gray-300"
                >
                  <ChevronRightIcon className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
            )}

            {/* CARD CONTAINER */}
            <div
              ref={sliderRef}
              className={`
                flex gap-6 pb-4
                ${announcements.length > 5
                  ? "overflow-x-auto scroll-smooth"
                  : "justify-center"}
                no-scrollbar max-w-6xl mx-auto
              `}
            >
              {announcements.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="
                    min-w-[220px]
                    max-w-[220px]
                    bg-white rounded-2xl shadow-xl overflow-hidden
                  "
                >
                  {/* MEDIA */}
                  <div className="overflow-hidden">
                    {item.type === "image" ? (
                      <motion.img
                        src={item.fileUrl}
                        className="w-full h-80 object-cover"
                        whileHover={{ scale: 1.05 }}
                      />
                    ) : (
                      <motion.video
                        className="w-full h-80 object-cover"
                        autoPlay
                        muted
                        loop
                        whileHover={{ scale: 1.05 }}
                      >
                        <source src={item.fileUrl} />
                      </motion.video>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 text-center min-h-[110px]">
                    <h3 className="font-bold text-sm text-[#444444]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
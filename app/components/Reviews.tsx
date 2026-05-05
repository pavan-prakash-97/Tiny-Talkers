"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MotionDiv = motion.div;

const avatarColors = [
  "4F46E5", // indigo
  "EF4444", // red
  "10B981", // green
  "F59E0B", // amber
  "3B82F6", // blue
  "8B5CF6", // purple
  "EC4899", // pink
  "14B8A6", // teal
];

type Review = {
  _id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

const googleReviewsLink =
  "https://www.google.com/search?q=tiny+talkers+learning+hub+tumkur+reviews";

export default function Reviews({ isMobile }: { isMobile: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ================= FETCH =================
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch("/api/get-google-reviews");
        const data = await res.json();

        if (!data.error) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // ================= AUTO SLIDE =================
  useEffect(() => {
    if (reviews.length === 0) return;

    autoSlideIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [reviews.length]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }

    if (direction === "left") {
      setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }

    autoSlideIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
  };

  // ⭐ Rating UI
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const getAvatarUrl = (name: string) => {
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      avatarColors.length;

    const bgColor = avatarColors[index];

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=${bgColor}&color=fff&bold=true&size=64`;
  };

  const getVisibleCards = () => (isMobile ? 3 : 5);

  // 🔥 Bird Wings Effect
  const getCardStyle = (index: number) => {
    const centerIndex = Math.floor(getVisibleCards() / 2);
    const distance = index - centerIndex;
    const absDistance = Math.abs(distance);

    return {
      scale: distance === 0 ? 1.2 : 1 - absDistance * 0.05,
      x: distance * (isMobile ? 70 : 120),
      y: distance === 0 ? -10 : absDistance * 5,
      zIndex: 10 - absDistance,
      opacity: distance === 0 ? 1 : 0.9 - absDistance * 0.2,
    };
  };

  if (isLoading) {
    return (
      <section className="flex justify-center items-center py-20">
        <Image src="/loading.gif" alt="Loading" width={200} height={200} />
      </section>
    );
  }

  if (reviews.length === 0) {
    return <p className="text-center py-20">No reviews yet</p>;
  }

  const visibleCount = getVisibleCards();

  const displayReviews = Array.from({ length: visibleCount }).map((_, i) => {
    const index =
      (activeIndex - Math.floor(visibleCount / 2) + i + reviews.length) %
      reviews.length;
    return { ...reviews[index], displayIndex: i };
  });

  return (
    <section
      className={`
    flex flex-col items-center justify-center transition-all duration-700 ease-in-out border-t-2 border-gray-200
    ${isMobile ? "py-8" : "h-screen snap-start"}
  `}
    >
      {" "}
      <div className="w-full max-w-4xl mx-auto px-6 text-center rounded-xl py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What Parents Say
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-12">
          Real results from parents who chose quality learning.
        </p>

        {/* Carousel */}
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl py-16 ">
          {/* LEFT */}
          <motion.button
            onClick={() => handleManualScroll("left")}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute left-5 z-20 p-2 bg-white rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.45)] transition"
          >
            <ChevronLeftIcon strokeWidth={3} color="silver" />
          </motion.button>

          {/* CARDS */}
          <div className="relative flex items-center justify-center h-[320px] w-full overflow-hidden rounded-xl">
            {displayReviews.map((review) => {
              const style = getCardStyle(review.displayIndex);
              const isCenter =
                review.displayIndex === Math.floor(visibleCount / 2);

              return (
                <MotionDiv
                  key={review._id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 50) {
                      handleManualScroll("left");
                    } else if (info.offset.x < -50) {
                      handleManualScroll("right");
                    }
                  }}
                  animate={{
                    scale: style.scale,
                    x: style.x,
                    y: style.y,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 10,
                  }}
                  style={{
                    position: "absolute",
                    zIndex: style.zIndex,
                  }}
                  className={`w-[180px] md:w-[220px] lg:w-[240px] bg-white rounded-xl p-4 md:p-5 text-center border transition-all ${
                    isCenter
                      ? "shadow-xl border-gray-200"
                      : "shadow-md opacity-90"
                  }`}
                >
                  <img
                    src={getAvatarUrl(review.name)}
                    className={`mx-auto mb-2 rounded-full ring-2 ring-gray-200 ${
                      isCenter ? "w-16 md:w-20" : "w-12 md:w-16"
                    }`}
                  />

                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    {review.name}
                  </p>

                  <div className="flex justify-center mb-2">
                    <StarRating rating={review.rating} />
                  </div>

                  <p className="text-xs text-gray-700 line-clamp-3">
                    {review.text}
                  </p>
                </MotionDiv>
              );
            })}
          </div>

          {/* RIGHT */}
          <motion.button
            onClick={() => handleManualScroll("right")}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute right-5 z-20 p-2 bg-white rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.45)] transition"
          >
            <ChevronRightIcon strokeWidth={3} color="silver" />
          </motion.button>
        </div>

        {/* BUTTON */}
        <a
          href={googleReviewsLink}
          target="_blank"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition"
        >
          View on Google
        </a>
      </div>
    </section>
  );
}

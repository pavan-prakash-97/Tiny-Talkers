// app/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import useMobile from "./hooks/useMobile";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Activities from "./components/Activities";
import Announcements from "./components/Announcements";
import Organizer from "./components/Organizer";
import EnquiryForm from "./components/EnquiryForm";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";

// export default function Home() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const isMobile = useMobile();

//   useEffect(() => {
//     const container = scrollRef.current;

//     if (!container) return;

//     const handleScroll = () => {
//       setShowScrollTop(container.scrollTop > 100);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       ref={scrollRef}
//       className={`bg-white ${isMobile ? "overflow-y-auto" : "h-screen overflow-y-scroll snap-y snap-proximity"}`}
//     >
//       <style jsx global>{`
//         html {
//           scroll-behavior: smooth;
//         }
//         section {
//           transition: all 0.8s ease-in-out;
//         }
//       `}</style>

//       <Header />
//       <Hero isMobile={isMobile} />
//       <Activities isMobile={isMobile} />
//       <Announcements isMobile={isMobile} />
//       <Organizer isMobile={isMobile} />
//       <EnquiryForm isMobile={isMobile} />
//       <Footer />

//       <ScrollTopButton show={showScrollTop} scrollRef={scrollRef} />
//     </div>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import { ArrowLeft, ArrowRight, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useMobile();


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
      className={`bg-white ${isMobile ? "overflow-y-auto" : "h-screen overflow-y-scroll snap-y snap-proximity"}`}
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
      <Header />

      {/* HERO SECTION */}
      <Hero isMobile={isMobile} />

      {/* EDUCATIONAL OFFER */}
      <Activities isMobile={isMobile} />


      {/* SECTION 3 - ANNOUNCEMENTS */}
      <Announcements isMobile={isMobile} />

      {/* SECTION 4 - ORGANISER */}
      <Organizer isMobile={isMobile} />


      {/* SECTION 5 - ENQUIRY */}
      <EnquiryForm isMobile={isMobile} />
      {/* SECTION 6 - FOOTER */}
      <Footer isMobile={isMobile} />





      {/* ⬆️ SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <ScrollTopButton show={showScrollTop} scrollRef={scrollRef} />
        // <button
        //   onClick={() => {
        //     setShowScrollTop(false); // 👈 immediately hide
        //     scrollRef.current?.scrollTo({
        //       top: 0,
        //       behavior: "smooth",
        //     });
        //   }}
        //   className="fixed bottom-10 right-10 bg-blue-800 text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
        // >
        //   <ArrowUpIcon className="w-6 h-6" strokeWidth={3} />
        // </button>
      )}
    </div>
  );
}

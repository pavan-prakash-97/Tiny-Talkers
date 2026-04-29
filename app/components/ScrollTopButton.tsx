"use client";

import { ArrowUp } from "lucide-react";
import { RefObject } from "react";

type ScrollTopButtonProps = {
  show: boolean;
  scrollRef: RefObject<HTMLDivElement | null>; // ✅ fix
};

export default function ScrollTopButton({
  show,
  scrollRef,
}: ScrollTopButtonProps) {
  if (!show) return null;

  return (
    <div>
      <button
        onClick={() =>
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full"
      >
        <ArrowUp size={20} strokeWidth={4} />
      </button>
    </div>
  );
}
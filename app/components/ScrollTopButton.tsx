"use client";

export default function ScrollTopButton({ show, scrollRef }: any) {
  if (!show) return null;

  return (
    <button
      onClick={() =>
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="fixed bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full"
    >
      ↑
    </button>
  );
}
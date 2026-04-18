"use client";

import { handleWhatsApp } from "../utils/handlers";

export default function EnquiryForm({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      className={`
        flex items-center justify-center px-6 transition-all duration-1000 ease-out
        ${isMobile ? "py-16" : "h-screen snap-start"}
      `}
    >
      <div className="py-16 px-6 text-center text-[#444444]">
        <h2 className="text-3xl font-bold mb-6">Send Enquiry</h2>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;

            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

            // ✅ WhatsApp Message Format
            const finalMessage = `Hi, this is ${name}.

${message}`;

            handleWhatsApp(finalMessage);
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

          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Send on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
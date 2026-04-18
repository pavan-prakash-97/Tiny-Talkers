export default function Organizer({ isMobile }: { isMobile: boolean }) {
  return (
      <section
        className={`
    flex items-center justify-center bg-gray-100 px-6  transition-all duration-1000 ease-out
    ${isMobile ? "py-16" : "h-screen snap-start"}
  `}
      >
        {/* className="h-screen snap-start flex items-center justify-center bg-gray-100 px-6 transition-all duration-1000 ease-out"> */}
        <div className="py-24 px-6 text-center">
          <h2 className="text-5xl font-bold text-[#444444] mb-6">Organiser</h2>
          <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image */}
            <div className="flex-shrink-0">
             
              <img
                // src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                 src="/Organizer1.jpeg"
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
  );
}
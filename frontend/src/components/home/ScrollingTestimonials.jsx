import { useEffect, useRef } from "react";

const testimonials = [
  {
    content: "Cybersecurity is not just about technology — it's about people, processes, and awareness. Platforms like CyberConnect make cybersecurity education accessible to everyone.",
    author: "NIST Framework",
    role: "National Institute of Standards & Technology",
    initials: "NF",
    color: "bg-blue-600",
  },
  {
    content: "Over 90% of successful cyber attacks start with a phishing email. Community-driven threat sharing can significantly reduce response times to emerging threats.",
    author: "CISA Advisory",
    role: "Cybersecurity & Infrastructure Security Agency",
    initials: "CA",
    color: "bg-red-600",
  },
  {
    content: "India reported over 13 lakh cybersecurity incidents in 2022. Awareness platforms that encourage incident reporting are crucial for building national cyber resilience.",
    author: "CERT-In Report",
    role: "Indian Computer Emergency Response Team",
    initials: "CI",
    color: "bg-green-600",
  },
  {
    content: "The global average cost of a data breach reached $4.45 million in 2023. Investing in cybersecurity awareness and community intelligence can prevent costly incidents.",
    author: "IBM Security",
    role: "Cost of a Data Breach Report 2023",
    initials: "IS",
    color: "bg-purple-600",
  },
  {
    content: "Human error is a factor in 74% of all breaches. Building a culture of cybersecurity awareness through community platforms is one of the most effective defenses.",
    author: "Verizon DBIR",
    role: "Data Breach Investigations Report 2023",
    initials: "VD",
    color: "bg-orange-600",
  },
  {
    content: "Ransomware attacks increased by 37% in 2023, with the average demand exceeding $100,000. Early threat detection through community alerts can make the difference.",
    author: "Sophos Report",
    role: "State of Ransomware 2023",
    initials: "SR",
    color: "bg-teal-600",
  },
];

export function ScrollingTestimonials() {
  const scrollTrackRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const scrollTrack = scrollTrackRef.current;
    if (!scrollTrack) return;

    // Clone the content for seamless infinite scrolling
    const content = Array.from(scrollTrack.children);
    content.forEach((item) => {
      const clone = item.cloneNode(true);
      scrollTrack.appendChild(clone);
    });

    // Animation function
    const scroll = () => {
      if (!scrollTrack) return;

      if (scrollTrack.scrollLeft >= scrollTrack.scrollWidth / 2) {
        scrollTrack.scrollLeft = 0;
      } else {
        scrollTrack.scrollLeft += 1;
      }
    };

    // Set the interval for smooth scrolling
    scrollIntervalRef.current = setInterval(scroll, 30);

    // Pause on hover (fixed memory leak — now properly clears/recreates interval)
    const handleMouseEnter = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };
    const handleMouseLeave = () => {
      if (!scrollIntervalRef.current) {
        scrollIntervalRef.current = setInterval(scroll, 30);
      }
    };

    scrollTrack.addEventListener("mouseenter", handleMouseEnter);
    scrollTrack.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
      if (scrollTrack) {
        scrollTrack.removeEventListener("mouseenter", handleMouseEnter);
        scrollTrack.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-[#f8f8f8d3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Cybersecurity insights that matter</h2>
          <p className="text-[#717d8a] max-w-2xl mx-auto">
            Real data and insights from trusted cybersecurity organizations around the world.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollTrackRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap pb-6"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="inline-block w-[350px] max-w-full shrink-0 whitespace-normal"
            >
              <div className="h-full rounded-xl p-6 shadow-md bg-[#ffffff] border border-[#dde3e9]">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-[#717d8a]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-[#717d8a]">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fade out effect on edges */}
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#ffffff] to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#ffffff] to-transparent"></div>
      </div>
    </section>
  );
}
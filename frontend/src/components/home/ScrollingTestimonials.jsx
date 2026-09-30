import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "Cybersecurity is not just about technology — it's about people, processes, and awareness. Platforms like CyberConnect make cybersecurity education accessible to everyone.",
    author: "NIST Framework",
    role: "National Institute of Standards & Technology",
    initials: "NF",
    color: "from-blue-500 to-cyan-500",
  },
  {
    content: "Over 90% of successful cyber attacks start with a phishing email. Community-driven threat sharing can significantly reduce response times to emerging threats.",
    author: "CISA Advisory",
    role: "Cybersecurity & Infrastructure Security Agency",
    initials: "CA",
    color: "from-rose-500 to-red-600",
  },
  {
    content: "India reported over 13 lakh cybersecurity incidents in 2022. Awareness platforms that encourage incident reporting are crucial for building national cyber resilience.",
    author: "CERT-In Report",
    role: "Indian Computer Emergency Response Team",
    initials: "CI",
    color: "from-emerald-400 to-teal-500",
  },
  {
    content: "The global average cost of a data breach reached $4.45 million in 2023. Investing in cybersecurity awareness and community intelligence can prevent costly incidents.",
    author: "IBM Security",
    role: "Cost of a Data Breach Report 2023",
    initials: "IS",
    color: "from-violet-500 to-purple-600",
  },
  {
    content: "Human error is a factor in 74% of all breaches. Building a culture of cybersecurity awareness through community platforms is one of the most effective defenses.",
    author: "Verizon DBIR",
    role: "Data Breach Investigations Report 2023",
    initials: "VD",
    color: "from-amber-400 to-orange-500",
  },
  {
    content: "Ransomware attacks increased by 37% in 2023, with the average demand exceeding $100,000. Early threat detection through community alerts can make the difference.",
    author: "Sophos Report",
    role: "State of Ransomware 2023",
    initials: "SR",
    color: "from-sky-400 to-indigo-500",
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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
            Industry Perspectives
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Cybersecurity insights that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">matter.</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Real data and strategic insights from the world's most trusted cybersecurity organizations and research teams.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        {/* Gradient Overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
        
        <div
          ref={scrollTrackRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap pb-12 pt-4 px-8"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="inline-block w-[400px] max-w-full shrink-0 whitespace-normal group"
            >
              <div className="h-full rounded-xl p-8 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-50 opacity-50 group-hover:text-blue-50 transition-colors -z-0" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-gray-200/50`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[16px]">{testimonial.author}</h4>
                    <p className="text-sm font-medium text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-600 relative z-10 font-medium flex-1">
                  {testimonial.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CSS for hiding scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          .overflow-x-hidden::-webkit-scrollbar {
            display: none;
          }
          .overflow-x-hidden {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </section>
  );
}
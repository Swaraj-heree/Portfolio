import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Added an 'image' property to link to your actual certificate files
const CERTIFICATIONS = [
  {
    issuer: "AWS Academy",
    title: "Graduate Generative AI Foundations",
    category: "Cloud & AI",
    image: "/certs/AWS.png" // Replace with your actual file name
  },
  {
    issuer: "AWS APAC",
    title: "Solutions Architecture Job Simulation",
    category: "Architecture",
    image: "/certs/AWS-architecture.png"
  },
  {
    issuer: "Accenture Nordics",
    title: "Software Engineering Job Simulation",
    category: "Software Engineering",
    image: "/certs/Accenture.png"
  },
  {
    issuer: "Deloitte UK",
    title: "Data Analytics Job Simulation",
    category: "Data Analytics",
    image: "/certs/Deloitee.png"
  },
  {
    issuer: "Cisco Networking Academy",
    title: "Introduction to Modern AI",
    category: "AI",
    image: "/certs/Cisco.png"
  }
];

export const CertificationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  // State to control which certificate image is currently open in the modal
  const [activeCertImg, setActiveCertImg] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        listRef.current?.children ? Array.from(listRef.current.children) : [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="relative w-full py-24 md:py-32 bg-transparent border-t border-white/5 z-20"
    >
      <div className="max-w-4xl mx-auto w-full px-6 md:px-16 lg:px-24">
        
        <div ref={headerRef} className="mb-16">
          <h3 className="text-gray-500 font-heading font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            04 // Credentials
          </h3>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Professional <span className="text-gray-600">Certifications.</span>
          </h2>
        </div>

        <div ref={listRef} className="flex flex-col gap-4">
          {CERTIFICATIONS.map((cert, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-sans tracking-widest uppercase text-gray-500 group-hover:text-gray-400 transition-colors">
                  {cert.issuer}
                </span>
                <h4 className="text-lg md:text-xl font-heading font-semibold text-white group-hover:translate-x-2 transition-transform duration-300">
                  {cert.title}
                </h4>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <span className="hidden md:inline-block px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs font-sans tracking-wider uppercase text-gray-400">
                  {cert.category}
                </span>
                {/* View Button */}
                <button 
                  onClick={() => setActiveCertImg(cert.image)}
                  className="text-xs font-sans font-bold tracking-widest uppercase text-white hover:text-gray-300 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
                >
                  View ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- IMAGE MODAL (LIGHTBOX) --- */}
      {activeCertImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12"
          onClick={() => setActiveCertImg(null)} // Clicking the background closes it
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white text-sm font-sans tracking-widest uppercase hover:text-gray-400 transition-colors"
            onClick={() => setActiveCertImg(null)}
          >
            Close ✕
          </button>
          
          {/* Certificate Image */}
          <img 
            src={activeCertImg} 
            alt="Certificate Credential" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} // Prevents clicking the image from closing the modal
          />
        </div>
      )}
    </section>
  );
};
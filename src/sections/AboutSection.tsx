import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text content
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Staggered fade in for the cards
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 bg-transparent flex flex-col md:flex-row items-center justify-center z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Text Introduction */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10">
          <h3 className="text-gray-500 font-heading font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            01 // Who I Am
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
            Bridging Logic <br className="hidden md:block" /> 
            <span className="text-gray-600">& Innovation.</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
            I am a Third-Year Engineering undergraduate specializing in full-stack development, robust system architecture, and cutting-edge software solutions.
          </p>
          <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            Beyond building high-performance web applications and winning hackathons, I am actively engaged in technical leadership and industry-sponsored research to solve real-world problems.
          </p>
        </div>

        {/* Right Side: Milestone Cards */}
        <div ref={cardsRef} className="w-full lg:w-1/2 flex flex-col gap-6 z-10">
          
          {/* Education Card */}
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm hover:bg-white/[0.04] transition-colors group">
            <span className="text-xs font-sans tracking-widest uppercase text-gray-500 mb-2 block group-hover:text-gray-400 transition-colors">
              Education
            </span>
            <h4 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
              BTech Engineering
            </h4>
            <p className="text-gray-400 font-sans text-sm">
              Shah & Anchor Kutchhi Engineering College (SAKEC)
            </p>
            <div className="mt-6 inline-block px-3 py-1.5 bg-black/40 border border-white/10 rounded-full text-xs font-sans text-gray-300 tracking-widest uppercase">
              Current CGPA: 9.25
            </div>
          </div>

          {/* --- NEW: Research Lead Card (Replacing Mentorship) --- */}
          <div className="p-8 bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-3xl backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden group">
            
            {/* Subtle glow effect inside the research card */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors duration-500"></div>
            
            <span className="text-xs font-sans tracking-widest uppercase text-gray-500 mb-2 block group-hover:text-gray-400 transition-colors relative z-10">
              Industry Sponsored Project
            </span>
            <h4 className="text-xl md:text-2xl font-heading font-bold text-white mb-2 relative z-10">
              Research Lead
            </h4>
            <p className="text-gray-300 font-sans text-sm font-semibold mb-2 relative z-10">
              Quiet Gesture (IIT Madras) <span className="text-gray-600">x</span> IEI SAKEC
            </p>
            <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed mb-6 relative z-10">
              Spearheading a 6-month research initiative focused on a "Camera-Based Non-Invasive Vital Signs Monitoring System".
            </p>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              <div className="inline-block px-3 py-1.5 bg-black/40 border border-white/10 rounded-full text-xs font-sans text-gray-400 tracking-widest uppercase">
                R&D
              </div>
              <div className="inline-block px-3 py-1.5 bg-white text-black border border-white rounded-full text-xs font-sans font-bold tracking-widest uppercase">
                Active Role
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
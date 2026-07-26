import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const textMobileRef = useRef<SVGTextElement>(null); // Added ref for the mobile-only text
  const reflectionRef = useRef<SVGTextElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Gather all text elements that exist, filtering out nulls safely
      const animatedElements = [textRef.current, textMobileRef.current, reflectionRef.current].filter(Boolean);

      // 1. Draw the stroke smoothly
      tl.fromTo(
        animatedElements,
        { strokeDasharray: 1500, strokeDashoffset: 1500, fill: 'transparent' },
        {
          strokeDashoffset: 0,
          duration: 3.5,
          ease: 'power2.out',
        }
      );

      // 2. Fill the metallic gradient color
      tl.to(
        animatedElements,
        {
          fill: 'url(#textGradient)',
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '-=1'
      );

      // 3. The GSAP Dissolve Effect for the background
      gsap.to(bgRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end"
    >
      {/* Background Layer isolated for GSAP fading */}
      <div ref={bgRef} className="absolute inset-0 z-0 bg-black">
        
        {/* DESKTOP BACKGROUND: Hidden on mobile (hidden), shows on md screens and up (md:block) */}
        <img 
          src="/city.jpg" 
          alt="City Background"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />

        {/* MOBILE BACKGROUND: Shows on mobile (block), hidden on md screens and up (md:hidden) */}
        <img 
          src="/city-mobile.jpg" 
          alt="City Background Mobile"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content Container - Added items-center for mobile centering */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between w-full px-6 md:px-12 lg:px-24 z-10 mb-[12vh] md:mb-[10vh] gap-12 md:gap-4 lg:gap-0">
        
        {/* EXTREME LEFT / MOBILE CENTER: Name Signature & Reflection */}
        {/* Strictly confined to a maximum of 60% width on laptops, 50% on large desktops */}
        <div className="relative flex flex-col items-center md:items-start w-full md:w-[60%] lg:w-[50%]">
          <svg
            viewBox="0 0 1000 250" 
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-visible z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />   
                <stop offset="50%" stopColor="#D1D5DB" />  
                <stop offset="100%" stopColor="#6B7280" /> 
              </linearGradient>
            </defs>

            {/* MOBILE ONLY TEXT: Centered and Massive (text-[12rem]) */}
            <text
              ref={textMobileRef}
              x="50%" 
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-signature text-[12rem] block md:hidden"
              style={{
                stroke: 'url(#textGradient)',
                strokeWidth: '3px',
                fill: 'transparent',
              }}
            >
              Swaraj Dalvi
            </text>

            {/* DESKTOP ONLY TEXT: Left Aligned and preserves your exact sizes */}
            <text
              ref={textRef}
              x="0%" 
              y="50%"
              dominantBaseline="middle"
              textAnchor="start"
              className="font-signature hidden md:block md:text-[8rem] lg:text-[12rem] xl:text-[14rem]"
              style={{
                stroke: 'url(#textGradient)',
                strokeWidth: '3px',
                fill: 'transparent',
              }}
            >
              Swaraj Dalvi
            </text>
          </svg>

          {/* Name Reflection - Hidden entirely on Mobile (hidden md:block) */}
          <svg
            viewBox="0 0 1000 250"
            className="w-full h-auto overflow-visible transform scale-y-[-1] -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-24 opacity-25 blur-[3px] md:blur-[5px] hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              ref={reflectionRef}
              x="0%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="start"
              className="font-signature text-[8rem] lg:text-[12rem] xl:text-[14rem]"
              style={{
                stroke: 'url(#textGradient)',
                strokeWidth: '3px',
                fill: 'transparent',
              }}
            >
              Swaraj Dalvi
            </text>
          </svg>
        </div>

        {/* EXTREME RIGHT / MOBILE BOTTOM: Role & Reflection */}
        {/* Strictly confined to the remaining width. Added items-center and text-center for mobile layout! */}
        <div className="relative flex flex-col items-center md:items-end pb-2 md:pb-[6vh] lg:pb-[8vh] w-full md:w-[40%] lg:w-[50%] mt-8 md:mt-0">
          <h2 className="text-white font-heading font-light tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.3em] xl:tracking-[0.4em] uppercase text-xs md:text-sm lg:text-lg xl:text-xl drop-shadow-md z-10 text-center md:text-right opacity-80 md:opacity-100 max-w-full">
            Full Stack Developer <br className="hidden md:block lg:hidden" /> <span className="hidden md:inline lg:hidden">|</span> <span className="md:hidden lg:inline">|</span> BTECH Undergraduate
          </h2>
          
          <h2 className="text-white font-heading font-light tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.3em] xl:tracking-[0.4em] uppercase text-xs md:text-sm lg:text-lg xl:text-xl transform scale-y-[-1] opacity-20 blur-[2px] md:blur-[3px] mt-0.5 md:mt-1 text-center md:text-right hidden md:block max-w-full">
            Full Stack Developer <br className="hidden md:block lg:hidden" /> <span className="hidden md:inline lg:hidden">|</span> <span className="md:hidden lg:inline">|</span> BTECH Undergraduate
          </h2>
        </div>
      </div>

      {/* Scroll Down Arrow Indicator */}
      <div className="absolute bottom-6 z-20 animate-bounce">
        <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 font-light bg-black/40 backdrop-blur-sm cursor-pointer hover:bg-white hover:text-black hover:border-white transition-all">
          ↓
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};
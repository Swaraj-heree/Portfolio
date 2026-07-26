import React, { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECHNOLOGIES = [
  { name: "C", slug: "c" },
  { name: "C++", slug: "cplusplus" },
  { name: "Java", slug: "java" },
  { name: "Python", slug: "python" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css3" },
  { name: "JavaScript", slug: "javascript" },
  {name:"Express.js", slug:"express"},
  {name:"MongoDB", slug:"mongodb"},
  {name:"PostgreSQL", slug:"postgresql"},
  { name: "React", slug: "react" },
  { name: "Vite", slug: "vite" },
  { name: "Tailwind CSS", slug: "tailwindcss" },

  { name: "SQLite3", slug: "sqlite" },
  { name: "Git", slug: "git" },
  { name: "Node.js", slug: "nodedotjs" },

{name:"mySQL", slug:"mysql"},
  { name: "GitHub", slug: "github" }
];

const TechSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.003, y: 0.003 });
  const rotationRef = useRef({ x: 0, y: 0 });

  // 1. ADD DYNAMIC RADIUS STATE
  const [radius, setRadius] = useState(260);

  // 2. LISTEN FOR SCREEN RESIZE TO ADJUST SPHERE MATH
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(140); // Mobile phone size
      } else if (window.innerWidth < 1024) {
        setRadius(200); // Tablet size
      } else {
        setRadius(260); // Desktop size
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 3. RECALCULATE POINTS WHENEVER RADIUS CHANGES
  const points = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    return TECHNOLOGIES.map((tech, i) => {
      const y = 1 - (i / (TECHNOLOGIES.length - 1)) * 2; 
      const r = Math.sqrt(1 - y * y); 
      const theta = phi * i; 
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      return {
        ...tech,
        position: [x * radius, y * radius, z * radius] as const,
      };
    });
  }, [radius]); // Add radius as a dependency here

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      rotationRef.current.x += mouseRef.current.y;
      rotationRef.current.y += mouseRef.current.x;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--rotX', `${rotationRef.current.x}rad`);
        containerRef.current.style.setProperty('--rotY', `${rotationRef.current.y}rad`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

 // Unified handler for both Mouse and Touch
  const handleInteraction = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((clientY - rect.top) / rect.height) * 2 - 1;
    
    mouseRef.current = { x: x * 0.02, y: -y * 0.02 };
  };

  const handleInteractionLeave = () => {
    mouseRef.current = { x: 0.003, y: 0.003 }; 
  };

   return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[320px] md:max-w-[500px] lg:max-w-[800px] aspect-square flex items-center justify-center mx-auto lg:ml-auto cursor-grab active:cursor-grabbing touch-none"
      // Desktop Mouse Events
      onMouseMove={(e) => handleInteraction(e.clientX, e.clientY)}
      onMouseLeave={handleInteractionLeave}
      // Mobile Touch Events
      onTouchMove={(e) => handleInteraction(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleInteractionLeave}
      style={{ perspective: '1200px' }} 
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: 'rotateX(var(--rotX, 0rad)) rotateY(var(--rotY, 0rad))',
          transformStyle: 'preserve-3d',
        }}
      >
{points.map((point, i) => {
          const [x, y, z] = point.position;
          
          // Default to Simple Icons
          let iconUrl = `https://cdn.simpleicons.org/${point.slug}`;

          // OVERRIDES for missing or removed icons
          if (point.slug === 'java') {
            iconUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg';
          } else if (point.slug === 'css3') {
            iconUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg';
          } else if (point.slug === 'tkinter') {
            // Tkinter has no official logo, so we use a secondary clean Python logo here
            iconUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg';
          }

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 flex items-center justify-center pointer-events-auto transition-colors duration-300 hover:text-white group"
              style={{
                transform: `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), ${z}px) rotateY(calc(-1 * var(--rotY, 0rad))) rotateX(calc(-1 * var(--rotX, 0rad)))`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Scaled down padding and font sizes slightly on mobile so pills don't overlap too much */}
              <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/40 border border-white/10 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-300">
                <img 
                  src={iconUrl} 
                  alt={`${point.name} logo`} 
                  className="w-4 h-4 md:w-5 md:h-5 opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <span className="text-gray-400 font-sans font-medium text-xs md:text-sm lg:text-base tracking-widest whitespace-nowrap group-hover:text-white transition-colors">
                  {point.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TechStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="tech-stack" 
      // Adjusted padding for mobile (py-16) vs desktop (py-32)
      className="relative w-full py-16 md:py-24 lg:py-32 bg-transparent border-t border-white/5 overflow-hidden flex flex-col lg:flex-row items-center justify-between px-4 md:px-16 lg:px-24 z-20 gap-12 lg:gap-0"
    >
      {/* Mobile centered text, Desktop left-aligned text */}
      <div ref={headerRef} className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
        <h3 className="text-gray-500 font-heading font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-4 md:mb-6">
          02 // Arsenal
        </h3>
        <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-heading font-bold text-white tracking-tight leading-[1.1] mb-6 md:mb-8">
          Engineering <br className="hidden md:block"/> <span className="text-gray-600">The Stack.</span>
        </h2>
        <p className="text-gray-400 font-sans text-sm md:text-base lg:text-xl leading-relaxed max-w-lg">
          A comprehensive toolkit spanning low-level memory management to modern, high-performance web and mobile frameworks. Hover over the sphere to interact.
        </p>
      </div>

      {/* Sphere Container aligns center on mobile, extreme right on desktop */}
      <div className="w-full lg:w-7/12 flex justify-center lg:justify-end z-10">
        <TechSphere />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};
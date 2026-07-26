import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Zydura Healthcare",
    description: "Responsive multi-page marketing website for a dermaceutical company featuring an interactive product catalog with flip-card animations and a mobile-first design.",
    tech: ["HTML", "CSS", "JavaScript", "AOS"],
    github: "#",
    live: "https://www.zydura.in"
  },
  {
    title: "Lexify",
    description: "A robust legal-technology web application providing streamlined architecture and seamless user experiences. (Update description as needed).",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/devesh1308/jargon-transaltors.git",
    live: "#"
  },
  {
    title: "Anna-Setu",
    description: "Desktop-based Food Distribution Management System built with a custom graphical user interface and integrated database management scripts.",
    tech: ["Python", "Tkinter", "SQLite3"],
    github: "https://github.com/Swaraj-heree/Anna-setu.git",
    live: "#"
  },
  {
    title: "Quadcopter Drone Build",
    description: "Engineered and constructed a fully functional quadcopter utilizing a localized flight controller board, integrating BLDC motors and structural framing.",
    tech: ["Hardware", "KK 2.1 Board", "Q450 Frame", "BLDC"],
    github: "#",
    live: "https://www.linkedin.com/posts/swaraj-dalvi_engineering-robotics-dronebuild-activity-7454464002052612096-oOTs?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFM__OgBz3cKV011KXPvnA-r4QdWgpxuf0s"
  }
];

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
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

      // Animate Project Cards
      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        }
      );

      // Animate Research Section
      gsap.fromTo(
        researchRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: researchRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative w-full py-24 md:py-32 bg-transparent border-t border-white/5 z-20"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h3 className="text-gray-500 font-heading font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            03 // Selected Works
          </h3>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">
            Featured <span className="text-gray-600">Projects.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {PROJECTS.map((project, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col justify-between bg-white/[0.02] border border-white/10 hover:border-white/30 rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-sans tracking-wider uppercase text-gray-500 bg-black/50 border border-white/10 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 mt-auto">
                {project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-sans tracking-widest uppercase text-white hover:text-gray-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
                    GitHub
                  </a>
                )}
                {project.live !== "#" && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-sans tracking-widest uppercase text-white hover:text-gray-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

{/* --- RESEARCH & PUBLICATIONS SECTION --- */}
        <div ref={researchRef} className="relative w-full bg-[#050505]/80 border border-white/15 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-md overflow-hidden">
          
          {/* Subtle glowing orb inside the card for high-end feel */}
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

          <h3 className="text-gray-500 font-heading font-light tracking-[0.3em] uppercase text-xs md:text-sm mb-8">
            Academic Research
          </h3>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between relative z-10">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-tight leading-snug mb-4">
                An Integrated Digital Governance Model for Sustainable Eco-Cultural Tourism
              </h2>
              <div className="inline-block bg-white text-black font-sans text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                IEEE Conference Paper (Accepted)
              </div>
              <p className="text-gray-400 font-sans text-base leading-relaxed mb-8">
                Proposed the Integrated Digital Governance Model (IDGM), a digital platform for sustainable tourism governance, community participation, and environmental compliance. Designed a modular architecture incorporating content verification, offline-first connectivity, AI-assisted moderation, and transparent community revenue-sharing mechanisms.
              </p>
              
              {/* --- NEW: Read Paper Button --- */}
              <a 
                href="/research-paper.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full font-sans text-sm font-bold tracking-widest uppercase transition-all duration-300"
              >
                Read Full Paper ↗
              </a>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-4 justify-center">
              <div className="border-l border-white/20 pl-6">
                <span className="block text-xs font-sans tracking-widest uppercase text-gray-500 mb-1">Status</span>
                <span className="block text-white font-sans text-lg">Accepted / Pending Publication</span>
              </div>
              <div className="border-l border-white/20 pl-6 mt-4">
                <span className="block text-xs font-sans tracking-widest uppercase text-gray-500 mb-1">Key Focus</span>
                <span className="block text-white font-sans text-lg">Digital Governance & System Architecture</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-16 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-between px-6 md:px-10 z-[60] transition-all duration-300 shadow-2xl ${
          isScrolled || isMobileMenuOpen ? 'bg-black/80' : 'bg-black/10'
        }`}
      >
        {/* Minimal Logo Area */}
        <div 
          className="flex items-center cursor-pointer group relative z-[60]"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
          }}
        >
          <span className="text-white font-heading font-medium text-lg tracking-[0.2em] uppercase group-hover:opacity-70 transition-opacity">
            Swaraj.
          </span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 font-sans text-xs tracking-[0.2em] uppercase">
          <a href="#about" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">About</a>
          <a href="#projects" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Projects</a>
          <a href="#certifications" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Credentials</a>
          <a href="#contact" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Contact</a>
          <a href="/Swaraj_Dalvi_Resume.pdf" target="_blank" rel="noreferrer" className="ml-4 px-4 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full transition-all duration-300">Resume</a>
        </div>

        {/* Mobile Menu Icon (Animated Hamburger) */}
        <div 
          className="md:hidden flex flex-col justify-center gap-[5px] cursor-pointer p-2 w-8 h-8 relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`w-6 h-[1.5px] bg-white transform transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></div>
          <div className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-6 h-[1.5px] bg-white transform transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-10 text-gray-300 font-sans text-sm tracking-[0.3em] uppercase">
          <a href="#about" onClick={closeMenu} className="hover:text-white transition-colors">About</a>
          <a href="#projects" onClick={closeMenu} className="hover:text-white transition-colors">Projects</a>
          <a href="#certifications" onClick={closeMenu} className="hover:text-white transition-colors">Credentials</a>
          <a href="#contact" onClick={closeMenu} className="hover:text-white transition-colors">Contact</a>
          <a href="/Swaraj_Dalvi_Resume.pdf" onClick={closeMenu} target="_blank" rel="noreferrer" className="px-6 py-3 mt-4 bg-white text-black font-bold border border-white rounded-full">
            Resume
          </a>
        </div>
      </div>
    </>
  );
};
import React from 'react';
import { Navbar } from '@/components/Navbar'; // <-- 1. Import the new Navbar
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { TechStackSection } from '@/sections/TechStackSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { CertificationsSection } from '@/sections/CertificationSection';
import { ContactSection } from '@/sections/ContactSection';

export const Home: React.FC = () => {
  return (
    <main className="relative bg-black min-h-screen font-sans selection:bg-white selection:text-black">
      
      {/* 2. Place the Navbar here so it sits globally on top of the page */}
      <Navbar /> 

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: 'url("earth.jpg")' }}
        ></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
};
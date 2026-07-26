import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { IntroSequence } from '@/sections/IntroSequence';
import { useLenis } from 'lenis/react';

export const MainLayout: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const lenis = useLenis();

  // Disable scrolling while the intro is playing
  useEffect(() => {
    if (!introFinished && lenis) {
      lenis.stop();
    } else if (introFinished && lenis) {
      lenis.start();
    }
  }, [introFinished, lenis]);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background">
      {!introFinished && (
        <IntroSequence onComplete={() => setIntroFinished(true)} />
      )}
      
      {/* We keep the main content mounted but hidden/locked behind the intro 
          to ensure 3D assets and layouts start warming up in the background */}
      <div 
        className="flex-grow flex flex-col transition-opacity duration-1000"
        style={{ opacity: introFinished ? 1 : 0 }}
      >
        {/* <Navigation /> will go here */}
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
        {/* <Footer /> will go here */}
      </div>
    </div>
  );
};
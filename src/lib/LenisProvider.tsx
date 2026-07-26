import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (lenis) {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = React.forwardRef<
  HTMLDivElement,
  IntroSequenceProps
>(({ onComplete }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const skipBtnRef = useRef<HTMLButtonElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        timeline.current = gsap.timeline({
          onComplete: () => {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 1.2,
              ease: 'power2.inOut',
              onComplete: onComplete,
            });
          },
        });

        timeline.current.to(skipBtnRef.current, {
          opacity: 1,
          duration: 1,
          delay: 0.5,
        });

        // The "writing" animation
        timeline.current.fromTo(
          textRef.current,
          { strokeDasharray: 1200, strokeDashoffset: 1200, fill: 'transparent' },
          {
            strokeDashoffset: 0,
            duration: 3, 
            ease: 'power2.out',
          },
          '<'
        );

        // Slowly fill the text color
        timeline.current.to(
          textRef.current,
          {
            fill: '#FFFFFF',
            duration: 1, 
            ease: 'power2.inOut',
          },
          '-=1.5'
        );

        timeline.current.to({}, { duration: 2 });
      }, containerRef);

      return () => ctx.revert();
    }, [onComplete]);

    const handleSkip = () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: onComplete,
      });
    };

    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      >
        <button
          ref={skipBtnRef}
          onClick={handleSkip}
          className="absolute top-8 right-8 px-4 py-2 text-sm text-text-muted opacity-0 hover:text-text transition-colors tracking-widest uppercase z-10"
          aria-label="Skip introductory animation"
        >
          Skip
        </button>

        {/* 90vw width to allow the text to span across the screen */}
        <div className="w-[90vw] flex items-center justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <svg
            viewBox="0 0 1600 500"
            className="w-full h-auto overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              ref={textRef}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              /* Massive font sizing */
              className="font-signature text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-wider"
              style={{
                stroke: '#FFFFFF',
                strokeWidth: '3px',
                fill: 'transparent',
              }}
            >
              Swaraj Dalvi
            </text>
          </svg>
        </div>
      </div>
    );
  });

IntroSequence.displayName = 'IntroSequence';
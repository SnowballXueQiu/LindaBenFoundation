"use client";

import { useEffect, useRef, useMemo } from "react";

/**
 * A smooth lerp-based parallax background.
 * Wrap inside a `position: relative; overflow: hidden` parent.
 */
export default function ParallaxBg({
  src,
  overlay,
  speed = 0.15,
  position = "center top",
  offset = "0px",
}: {
  /** URL of the background image */
  src: string;
  /** CSS background for the overlay layer (gradient / solid) */
  overlay?: string;
  /** Parallax strength — 0 = none, 0.15 = subtle, 0.3 = strong */
  speed?: number;
  /** Background position for the image */
  position?: string;
  /** Additional offset for fine-tuning image position (e.g., "20px", "-10px", "0px 15px") */
  offset?: string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef(0);
  const ticking = useRef(false);

  // Memoize parsed offset to ensure stable dependencies
  const offsetParsed = useMemo(() => {
    const parseOffset = (offsetStr: string): { x: number; y: number } => {
      const parts = offsetStr.trim().split(/\s+/);
      let x = 0, y = 0;
      
      if (parts.length === 1) {
        // Single value means Y offset only
        y = parseFloat(parts[0]) || 0;
      } else if (parts.length === 2) {
        // Two values mean X and Y offset
        x = parseFloat(parts[0]) || 0;
        y = parseFloat(parts[1]) || 0;
      }
      return { x, y };
    };
    
    return parseOffset(offset);
  }, [offset]);

  useEffect(() => {
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const updateTransform = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.12);
      
      if (bgRef.current) {
        // Apply parallax movement via transform
        bgRef.current.style.transform = `translate3d(0, ${currentY.current}px, 0)`;
        
        // Apply offset via background-position
        const bgPosX = offsetParsed.x !== 0 ? `calc(50% + ${offsetParsed.x}px)` : '50%';
        const bgPosY = (() => {
          if (position.includes('top')) {
            return offsetParsed.y !== 0 ? `calc(0% + ${offsetParsed.y}px)` : '0%';
          } else if (position.includes('bottom')) {
            return offsetParsed.y !== 0 ? `calc(100% + ${offsetParsed.y}px)` : '100%';
          } else {
            return offsetParsed.y !== 0 ? `calc(50% + ${offsetParsed.y}px)` : '50%';
          }
        })();
        
        bgRef.current.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
      }
      
      // Continue animation if difference is significant
      if (Math.abs(currentY.current - targetY.current) > 0.1) {
        rafId.current = requestAnimationFrame(updateTransform);
      } else {
        ticking.current = false;
      }
    };

    const handleScroll = () => {
      const el = parentRef.current;
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      
      // Only calculate if element is in viewport
      if (rect.bottom > -100 && rect.top < wh + 100) {
        const scrolled = wh - rect.top;
        const maxT = rect.height * 0.2;
        const raw = -(scrolled * speed);
        const newTargetY = Math.max(-maxT, Math.min(maxT, raw));
        
        // Only update if there's a significant change
        if (Math.abs(newTargetY - targetY.current) > 0.5) {
          targetY.current = newTargetY;
          
          // Start animation if not already running
          if (!ticking.current) {
            ticking.current = true;
            rafId.current = requestAnimationFrame(updateTransform);
          }
        }
      }
    };

    // Use throttled scroll listener for better performance
    let throttleTimer: number | null = null;
    const throttledScroll = () => {
      if (throttleTimer === null) {
        throttleTimer = window.requestAnimationFrame(() => {
          handleScroll();
          throttleTimer = null;
        });
      }
    };

    // Set initial background position
    if (bgRef.current) {
      const bgPosX = offsetParsed.x !== 0 ? `calc(50% + ${offsetParsed.x}px)` : '50%';
      const bgPosY = (() => {
        if (position.includes('top')) {
          return offsetParsed.y !== 0 ? `calc(0% + ${offsetParsed.y}px)` : '0%';
        } else if (position.includes('bottom')) {
          return offsetParsed.y !== 0 ? `calc(100% + ${offsetParsed.y}px)` : '100%';
        } else {
          return offsetParsed.y !== 0 ? `calc(50% + ${offsetParsed.y}px)` : '50%';
        }
      })();
      bgRef.current.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
    }

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (throttleTimer !== null) {
        cancelAnimationFrame(throttleTimer);
      }
    };
  }, [speed, offsetParsed, position]);

  return (
    <div ref={parentRef} className="absolute inset-0 overflow-hidden">
      {/* Oversized image layer for parallax movement room */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 will-change-transform"
        style={{
          top: "-25%",
          bottom: "-25%",
          backgroundImage: `url('${src}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0" style={{ background: overlay }} />
      )}
    </div>
  );
}

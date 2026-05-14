
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';


const STYLES = `
@keyframes fp-scan {
  0%   { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0%   0 0); }
}
@keyframes fp-scan-line-move {
  0%   { left: 0%;    opacity: 1; }
  95%  { left: 100%;  opacity: 1; }
  100% { left: 100%;  opacity: 0; }
}
@keyframes fp-glow-bloom {
  0%   { text-shadow: none; }
  50%  { text-shadow:
           0 0 30px rgba(250,204,21,0.9),
           0 0 60px rgba(250,204,21,0.5),
           0 0 90px rgba(250,204,21,0.2); }
  100% { text-shadow:
           0 0 12px rgba(250,204,21,0.45),
           0 0 28px rgba(250,204,21,0.18); }
}
@media (prefers-reduced-motion: reduce) {
  .fp-reveal-line1, .fp-reveal-line2 { animation: none !important; clip-path: none !important; }
  .fp-glow { animation: none !important; }
  .fp-scan-cursor { display: none !important; }
}
.fp-reveal-line1 {
  clip-path: inset(0 100% 0 0);
  animation: fp-scan 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.fp-reveal-line2 {
  clip-path: inset(0 100% 0 0);
  animation: fp-scan 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}
.fp-glow {
  animation: fp-glow-bloom 0.8s ease-out 1.15s forwards;
  text-shadow: none;
}
.fp-scan-cursor {
  position: absolute;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, rgba(250,204,21,0.9), transparent);
  pointer-events: none;
  animation: fp-scan-line-move 1.0s cubic-bezier(0.16,1,0.3,1) forwards;
}
.fp-scan-cursor-2 {
  animation-delay: 0.2s !important;
}
`;

let stylesInjected = false;

export default function HeadlineReveal() {
  const [mounted, setMounted] = useState(false);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);


  useEffect(() => {
    if (!stylesInjected) {
      const tag = document.createElement('style');
      tag.textContent = STYLES;
      document.head.appendChild(tag);
      stylesInjected = true;
    }

    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const baseClass =
    'text-4xl sm:text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter uppercase';

  return (
    <div className={`${baseClass} mb-4 sm:mb-6 relative`}>
      {}
      <div className="relative inline-block">
        <span
          ref={line1Ref}
          className={`text-yellow-400 inline-block relative ${mounted ? 'fp-reveal-line1 fp-glow' : 'opacity-0'}`}
        >
          The 69 Days
        </span>
        {}
        {mounted && (
          <span
            className="fp-scan-cursor"
            aria-hidden="true"
          />
        )}
      </div>

      <br />

      {}
      <div className="relative inline-block">
        <span
          ref={line2Ref}
          className={`text-white inline-block relative ${mounted ? 'fp-reveal-line2 fp-glow' : 'opacity-0'}`}
        >
          Flex Protocol
        </span>
        {mounted && (
          <span
            className="fp-scan-cursor fp-scan-cursor-2"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}




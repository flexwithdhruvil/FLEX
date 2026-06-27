import { motion } from 'motion/react';
import AnimatedBeamsBackground from '../components/AnimatedBeamsBackground';

export default function BeamsDemo() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      <AnimatedBeamsBackground />

      <div 
        className="absolute inset-0 z-[5] pointer-events-none animate-pulse-overlay"
        style={{ 
          background: 'rgba(10, 10, 10, 0.05)', 
          backdropFilter: 'blur(50px)' 
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white font-sans font-semibold tracking-[-2px] leading-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          FlexProtocol
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-white/70 font-sans mt-4"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}
        >
          The Future of Performance Engineering
        </motion.p>
      </div>

      <style>{`
        @keyframes pulse-overlay {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-pulse-overlay {
          animation: pulse-overlay 10s ease-in-out infinite;
        }
        body, html {
          margin: 0;
          padding: 0;
          background: #0a0a0a;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

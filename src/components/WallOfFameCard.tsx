import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { VIEWPORT, TRANSITION_IN } from '../motionPresets';

interface WallOfFameCardProps {
  key?: React.Key;
  hero: {
    id: number;
    image: string;
    cutoutImage?: string;
    label: string;
  };
  index: number;
}

export default function WallOfFameCard({ hero, index }: WallOfFameCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });


  const x = useMotionValue(0);
  const y = useMotionValue(0);



  const mouseXSpring = useSpring(x, { 
    stiffness: 200, 
    damping: 30, 
    mass: 0.8,
    restDelta: 0.001 
  });
  const mouseYSpring = useSpring(y, { 
    stiffness: 200, 
    damping: 30, 
    mass: 0.8,
    restDelta: 0.001 
  });


  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);


  const scale = useTransform(mouseXSpring, [-0.5, 0.5], [1, 1.08]);


  const lightX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const lightY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);


  const backgroundZ = useTransform(mouseYSpring, [-0.5, 0.5], [-40, -20]);
  const midZ = useTransform(mouseYSpring, [-0.5, 0.5], [80, 140]);
  const foregroundZ = useTransform(mouseYSpring, [-0.5, 0.5], [140, 200]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    

    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;
    
    setMousePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{
        delay: index * 0.15,
        ...TRANSITION_IN,
      }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 2000,
        willChange: "transform"
      }}
      className="relative group rounded-[2.5rem] w-full aspect-square cursor-pointer wall-fame-idle"
    >
      {}
      <div
        className="w-full h-full rounded-[2.5rem] absolute inset-0"
        style={{ 
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.05) inset
          `
        }}
      >
        {}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                circle at ${lightX}% ${lightY}%, 
                rgba(255,255,255,0.12) 0%, 
                rgba(255,255,255,0.05) 25%, 
                transparent 50%
              )
            `,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 50
          }}
        />

        {}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none mix-blend-screen opacity-0"
          animate={{
            opacity: isHovered ? 0.03 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 100%)`,
            zIndex: 45
          }}
        />

        {}
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-10">
          {}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" 
               style={{ opacity: isHovered ? 0.3 : 0.6, transition: "opacity 0.5s" }} />
          
          {}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
            animate={{ opacity: isHovered ? 0.7 : 0.9 }}
            transition={{ duration: 0.5 }}
          />
          
          {}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-tl-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-br-[2.5rem]" />
        </div>

        {}
        <motion.div
          className="w-full h-full absolute inset-0 rounded-[2.5rem] overflow-hidden"
          style={{ 
            transform: useMotionTemplate`translateZ(${backgroundZ}px)`,
            transformStyle: "preserve-3d"
          }}
          animate={{
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? "brightness(0.85) saturate(1.15)" : "brightness(0.65) saturate(0.85)"
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={hero.image}
            alt={hero.label}
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.05)" }}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </motion.div>

        {}
        <motion.div
          className="w-full h-full absolute inset-0 opacity-0 pointer-events-none z-20"
          style={{ 
            transform: useMotionTemplate`translateZ(${midZ}px)`,
            transformStyle: "preserve-3d"
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -15 : 0,
            scale: isHovered ? 1.15 : 1
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={(hero.cutoutImage || hero.image) + '?v=4'}
            alt={hero.label}
            className="w-[120%] h-[120%] -ml-[10%] -mt-[10%] object-cover"
            style={{
              filter: "drop-shadow(0px 40px 60px rgba(0,0,0,0.8))"
            }}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </motion.div>

        {}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(30px)", zIndex: 25 }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + (i % 4) * 15}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered
              ? "inset 0 0 40px rgba(255,255,255,0.1), 0 0 60px rgba(109, 73, 110, 0.4), 0 0 100px rgba(109, 73, 110, 0.2)"
              : "inset 0 0 0 rgba(255,255,255,0)"
          }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: 40 }}
        />

        {}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden"
          style={{ zIndex: 35 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: isHovered ? ["-100%", "200%"] : "-100%"
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5
            }}
            style={{
              transform: "skewX(-20deg)"
            }}
          />
        </motion.div>

        {}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full pointer-events-none"
          style={{ 
            transform: "translateZ(-100px)",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
            filter: "blur(18px)"
          }}
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
            scale: isHovered ? 1.25 : 1,
            y: isHovered ? -8 : 0
          }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}


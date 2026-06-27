import { motion } from 'motion/react';

export default function HeadlineReveal() {
  const baseClass =
    'text-4xl sm:text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter uppercase';

  return (
    <div className={`${baseClass} mb-4 sm:mb-6 relative`}>
      <div className="relative inline-block overflow-visible">
        <motion.span
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{
            clipPath: 'inset(0 0% 0 0)',
            textShadow: [
              'none',
              '0 0 30px rgba(250,204,21,0.9)',
              '0 0 12px rgba(250,204,21,0.45)'
            ]
          }}
          transition={{
            clipPath: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            textShadow: { duration: 0.8, delay: 1.15, ease: "easeOut" }
          }}
          className="text-yellow-400 inline-block relative"
        >
          The 69 Days
        </motion.span>
        <motion.span
          initial={{ left: '0%', opacity: 1 }}
          animate={{ left: '100%', opacity: [1, 1, 0] }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], times: [0, 0.95, 1] }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-yellow-400 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <br />

      <div className="relative inline-block overflow-visible mt-2">
        <motion.span
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{
            clipPath: 'inset(0 0% 0 0)',
            textShadow: [
              'none',
              '0 0 30px rgba(255,255,255,0.9)',
              '0 0 12px rgba(255,255,255,0.45)'
            ]
          }}
          transition={{
            clipPath: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            textShadow: { duration: 0.8, delay: 1.35, ease: "easeOut" }
          }}
          className="text-white inline-block relative headline-gradient-shift"
        >
          Flex Protocol
        </motion.span>
        <motion.span
          initial={{ left: '0%', opacity: 1 }}
          animate={{ left: '100%', opacity: [1, 1, 0] }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1], times: [0, 0.95, 1] }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}


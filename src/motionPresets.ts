import type { Transition, Variants, Viewport } from 'motion/react';

/** Unified scroll-reveal viewport */
export const VIEWPORT: Viewport = { once: true, margin: '-12% 0px -10% 0px' };

export const VIEWPORT_TIGHT: Viewport = { once: true, margin: '-8% 0px -6% 0px' };

/** Default section fade-up */
export const TRANSITION_IN: Transition = {
  duration: 0.55,
  ease: [0.25, 0.1, 0.25, 1],
};

/** Softer spring for secondary controls */
export const TRANSITION_SPRING_UI: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 32,
  mass: 0.85,
};

/** Snappier spring for primary CTAs */
export const TRANSITION_SPRING_CTA: Transition = {
  type: 'spring',
  stiffness: 440,
  damping: 28,
  mass: 0.9,
};

/** No bounce — nav chips, small buttons */
export const TRANSITION_TWEEN_SNAPPY: Transition = {
  duration: 0.32,
  ease: [0.4, 0, 0.2, 1],
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_IN,
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: TRANSITION_IN,
  },
};

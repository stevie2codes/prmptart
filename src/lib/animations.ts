import { Transition, Variants } from "framer-motion";

// Optimized animation configurations for smooth, performant animations
export const animations = {
  // Spring animations with optimized physics
  spring: {
    gentle: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
    responsive: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      mass: 0.6,
    },
    bouncy: {
      type: "spring" as const,
      stiffness: 500,
      damping: 20,
      mass: 0.5,
    },
    smooth: {
      type: "spring" as const,
      stiffness: 200,
      damping: 35,
      mass: 1,
    },
  },

  // Tween animations for precise control
  tween: {
    fast: {
      type: "tween" as const,
      duration: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
    medium: {
      type: "tween" as const,
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
    slow: {
      type: "tween" as const,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },

  // Layout animations
  layout: {
    smooth: {
      type: "spring" as const,
      stiffness: 350,
      damping: 35,
      mass: 0.8,
    },
    fast: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
      mass: 0.6,
    },
  },

  // Fade animations
  fade: {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    up: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    down: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  },

  // Slide animations
  slide: {
    left: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 },
    },
    right: {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 20, opacity: 0 },
    },
    up: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
    },
    down: {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    },
  },

  // Hover animations
  hover: {
    lift: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 },
    },
    scale: {
      scale: 1.05,
      transition: { duration: 0.15 },
    },
    glow: {
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 },
    },
  },

  // Tap animations
  tap: {
    scale: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    press: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  },

  // Stagger animations for lists
  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },

  // Modal animations
  modal: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    },
    content: {
      initial: { opacity: 0, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9, y: 20 },
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 30,
        mass: 0.8 
      },
    },
  },

  // Page transitions
  page: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// Performance optimizations
export const performance = {
  // Reduce motion for users who prefer it
  reducedMotion: {
    opacity: { duration: 0.1 },
    scale: { duration: 0.1 },
    y: { duration: 0.1 },
    x: { duration: 0.1 },
  },

  // Hardware acceleration hints
  willChange: {
    transform: "transform",
    opacity: "opacity",
    layout: "transform, opacity",
  },

  // Layout animation optimizations
  layoutOptimizations: {
    layoutId: true,
    layout: true,
    layoutDependency: true,
  },
};

// Common animation variants
export const variants: Record<string, Variants> = {
  // Fade variants
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  // Slide variants
  slideIn: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },

  // Scale variants
  scaleIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },

  // List variants with stagger
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },

  listItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

// Utility functions for common animation patterns
export const animationUtils = {
  // Create staggered delay for list items
  createStaggerDelay: (index: number, baseDelay: number = 0.05, maxDelay: number = 0.3) => {
    return Math.min(index * baseDelay, maxDelay);
  },

  // Create spring animation with custom parameters
  createSpring: (stiffness: number = 300, damping: number = 30, mass: number = 0.8): Transition => ({
    type: "spring",
    stiffness,
    damping,
    mass,
  }),

  // Create tween animation with custom easing
  createTween: (duration: number = 0.25, ease: number[] = [0.25, 0.46, 0.45, 0.94] as const): Transition => ({
    type: "tween",
    duration,
    ease,
  }),
};

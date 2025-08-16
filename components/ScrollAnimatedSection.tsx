import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { animations, performance } from "../src/lib/animations";

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animationType?: "slideUp" | "slideLeft" | "fadeIn" | "scaleIn";
}

export function ScrollAnimatedSection({ 
  children, 
  delay = 0, 
  className = "",
  animationType = "slideUp"
}: ScrollAnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px 0px -50px 0px",
    amount: 0.2 
  });

  const getAnimationVariants = () => {
    switch (animationType) {
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 30, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: -30, scale: 0.98 },
          visible: { opacity: 1, x: 0, scale: 1 }
        };
      case "fadeIn":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 }
        };
      case "scaleIn":
        return {
          hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
          visible: { opacity: 1, scale: 1, rotateY: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        ...animations.spring.responsive,
        delay: delay,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ 
        willChange: performance.willChange.transform,
        transformStyle: "preserve-3d"
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

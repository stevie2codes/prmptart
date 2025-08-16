import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

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
    margin: "-30px 0px -30px 0px", // Reduced margin for better performance
    amount: 0.1 // Reduced amount for faster triggering
  });

  const getAnimationVariants = () => {
    switch (animationType) {
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 20, scale: 0.99 }, // Reduced values for subtler animation
          visible: { opacity: 1, y: 0, scale: 1 }
        };
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: -20, scale: 0.99 }, // Reduced values for subtler animation
          visible: { opacity: 1, x: 0, scale: 1 }
        };
      case "fadeIn":
        return {
          hidden: { opacity: 0, scale: 0.98 }, // Reduced scale change
          visible: { opacity: 1, scale: 1 }
        };
      case "scaleIn":
        return {
          hidden: { opacity: 0, scale: 0.9 }, // Reduced scale change, removed rotateY
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 20, scale: 0.99 },
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
        type: "tween", // Use tween instead of spring for better performance
        duration: 0.5, // Reduced from 0.8
        ease: "easeOut", // Simplified easing
        delay: delay
      }}
      style={{ 
        willChange: "transform", // Simplified willChange
        transform: "translateZ(0)" // Force hardware acceleration
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

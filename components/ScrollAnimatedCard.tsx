import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PromptCard } from "./PromptCard";
import { Prompt } from "../data/prompts";

interface ScrollAnimatedCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
  index: number;
}

export function ScrollAnimatedCard({ prompt, onOpen, index }: ScrollAnimatedCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "0px 0px -100px 0px", // Positive top margin so cards show immediately
    amount: 0.01 // Very small amount to trigger faster
  });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 20, // Reduced from 50 for subtler animation
        scale: 0.98 // Reduced from 0.95 for subtler animation
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {
        opacity: 0,
        y: 20,
        scale: 0.98
      }}
      transition={{
        type: "tween", // Use tween instead of spring for better performance
        duration: 0.4, // Reduced from 0.6
        ease: "easeOut", // Simplified easing
        delay: index * 0.05 // Reduced stagger delay from 0.1 to 0.05
      }}
      style={{ 
        willChange: "transform", // Simplified willChange
        transform: "translateZ(0)",

       
      }}
      whileHover={{
        y: -4, // Reduced from -8 for subtler hover
        transition: { duration: 0.2, ease: "easeOut" } // Faster hover
      }}
      className="transform-gpu"
    >
      <PromptCard prompt={prompt} onOpen={onOpen} />
    </motion.div>
  );
}

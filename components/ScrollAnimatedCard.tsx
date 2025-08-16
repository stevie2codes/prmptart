import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PromptCard } from "./PromptCard";
import { Prompt } from "../data/prompts";
import { animations, variants, performance } from "../src/lib/animations";

interface ScrollAnimatedCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
  index: number;
}

export function ScrollAnimatedCard({ prompt, onOpen, index }: ScrollAnimatedCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px",
    amount: 0.3 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.95,
        rotateX: 15
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0
      } : {
        opacity: 0,
        y: 50,
        scale: 0.95,
        rotateX: 15
      }}
      transition={{
        ...animations.spring.responsive,
        delay: index * 0.1, // Stagger the animations
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ 
        willChange: performance.willChange.transform,
        transformStyle: "preserve-3d"
      }}
      whileHover={{
        y: -8,
        rotateX: 5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="transform-gpu"
    >
      <PromptCard prompt={prompt} onOpen={onOpen} />
    </motion.div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle, BookOpen, Tag, Zap } from "lucide-react";
import { Prompt } from "../data/prompts";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useState, useRef, useEffect } from "react";
import { animations, variants, performance } from "../src/lib/animations";
import { useSound } from "../src/contexts/SoundContext";

interface SidePanelProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SidePanel({ prompt, isOpen, onClose }: SidePanelProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  console.log('SidePanel render:', { prompt, isOpen });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt.content);
      setIsCopied(true);
      playSound('MOUSE_CLICK');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = prompt.content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      playSound('MOUSE_CLICK');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };



  const getPhaseColor = () => {
    if (!prompt) return "";
    
    const colors = {
      Research: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      IA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      Ideation: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      Prototyping: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      Stakeholder: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      "Flows & IA": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    } as const;
    return colors[prompt.phase as keyof typeof colors] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  if (!prompt) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="side-panel-overlay"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={animations.tween.fast}
          style={{ willChange: performance.willChange.opacity }}
        />
      )}
      
      <motion.div
        ref={panelRef}
        key="side-panel"
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border/30 shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={animations.spring.responsive}
        style={{ willChange: performance.willChange.transform }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between p-6 border-b border-border/30"
            variants={variants.slideIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            style={{ willChange: performance.willChange.transform }}
          >
            <motion.h2 
              className="text-xl font-semibold text-foreground font-syne"
              variants={variants.fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              style={{ willChange: performance.willChange.opacity }}
            >
              Prompt Details
            </motion.h2>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted/50 transition-colors duration-200"
              whileHover={animations.hover.scale}
              whileTap={animations.tap.press}
              style={{ willChange: performance.willChange.transform }}
            >
              <X className="h-5 w-5 text-foreground" />
            </motion.button>
          </motion.div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title and Badges */}
            <motion.div
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              style={{ willChange: performance.willChange.transform }}
            >
              <motion.h3 
                className="text-lg font-semibold text-foreground mb-4 font-syne"
                variants={variants.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.25 }}
                style={{ willChange: performance.willChange.opacity }}
              >
                {prompt.title}
              </motion.h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <motion.div
                  variants={variants.scaleIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`${getPhaseColor()} text-xs font-medium`}
                  >
                    {prompt.phase}
                  </Badge>
                </motion.div>
                

              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              style={{ willChange: performance.willChange.transform }}
            >
              <motion.p 
                className="text-sm text-foreground leading-relaxed"
                variants={variants.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                style={{ willChange: performance.willChange.opacity }}
              >
                {prompt.summary}
              </motion.p>
            </motion.div>

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <motion.div
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.25 }}
                style={{ willChange: performance.willChange.transform }}
              >
                <motion.div 
                  className="flex items-center gap-2 mb-3"
                  variants={variants.fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.45 }}
                  style={{ willChange: performance.willChange.opacity }}
                >
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground font-syne">Tags</span>
                </motion.div>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  {prompt.tags.map((tag) => (
                    <motion.div
                      key={tag}
                      variants={variants.listItem}
                      layout
                      whileHover={animations.hover.scale}
                      whileTap={animations.tap.press}
                      style={{ willChange: performance.willChange.transform }}
                    >
                      <Badge 
                        variant="outline" 
                        className="text-xs font-medium bg-accent/30 text-accent-foreground border-accent/50"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              style={{ willChange: performance.willChange.transform }}
            >
              <motion.div 
                className="flex items-center gap-2 mb-3"
                variants={variants.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                style={{ willChange: performance.willChange.opacity }}
              >
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground font-syne">Prompt Content</span>
              </motion.div>
              <motion.div
                className="bg-muted/30 rounded-lg p-4 border border-border/30"
                variants={variants.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                style={{ willChange: performance.willChange.opacity }}
              >
                <p className="text-sm text-foreground whitespace-pre-wrap font-mono">
                  {prompt.content}
                </p>
              </motion.div>
            </motion.div>

            {/* Example Output */}
            <AnimatePresence mode="wait">
              {showExample && prompt.exampleOutput && (
                <motion.div
                  key="example-output"
                  className="space-y-3"
                  variants={variants.fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={animations.tween.medium}
                  style={{ willChange: performance.willChange.layout }}
                >
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <Separator className="bg-border/50" />
                  </motion.div>
                  <motion.h4 
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.3 }}
                    whileHover={{ x: 2 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      style={{ willChange: performance.willChange.transform }}
                    >
                      ✨
                    </motion.div>
                    <span className="font-syne">Example Output</span>
                  </motion.h4>
                  <motion.div
                    className="bg-muted/30 rounded-lg p-4 border border-border/30"
                    variants={variants.fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4, duration: 0.3 }}
                    style={{ willChange: performance.willChange.opacity }}
                  >
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {prompt.exampleOutput}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Example Button */}
            {prompt.exampleOutput && (
              <motion.div
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                style={{ willChange: performance.willChange.transform }}
              >
                <motion.div
                  whileHover={animations.hover.scale}
                  whileTap={animations.tap.press}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setShowExample(!showExample)}
                    className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {showExample ? 'Hide' : 'Show'} Example Output
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <motion.div 
            className="p-6 border-t border-border/30"
            variants={variants.slideIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            style={{ willChange: performance.willChange.transform }}
          >
            <motion.div
              whileHover={animations.hover.scale}
              whileTap={animations.tap.press}
              style={{ willChange: performance.willChange.transform }}
            >
              <Button
                onClick={handleCopy}
                className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white border-0"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                  transition={animations.tween.fast}
                  style={{ willChange: performance.willChange.transform }}
                >
                  {isCopied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
import { motion } from "framer-motion";
import { ArrowRight, Copy, CheckCircle } from "lucide-react";
import { Prompt } from "../data/prompts";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { animations, variants, performance, animationUtils } from "../src/lib/animations";

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
}

export function PromptCard({ prompt, onOpen }: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(prompt.content);
      setIsCopied(true);
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
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getImpactIcon = () => {
    switch (prompt.impact) {
      case "High Impact":
        return "🔥";
      case "Quick Win":
        return "⚡";
      case "5-min Setup":
        return "⏱";
      default:
        return "💡";
    }
  };

  const getPhaseColor = () => {
    const colors = {
      Research: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      IA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      Ideation: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      Prototyping: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      Stakeholder: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      "Dev Handoff": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    };
    return colors[prompt.phase] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <motion.div
      className="prompt-card-container bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 cursor-pointer group"
      onClick={() => onOpen(prompt)}
      whileHover={animations.hover.lift}
      whileTap={animations.tap.scale}
      layout
      style={{ willChange: performance.willChange.layout }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Badge 
          variant="secondary" 
          className={`${getPhaseColor()} text-xs font-medium transition-colors duration-300`}
        >
          {prompt.phase}
        </Badge>
        
        <motion.div
          className="flex items-center gap-1 text-xs text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-full transition-colors duration-300"
          whileHover={animations.hover.scale}
          style={{ willChange: performance.willChange.transform }}
        >
          <span className="text-sm">{getImpactIcon()}</span>
          <span className="font-medium">{prompt.impact}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-6">
        <motion.h3 
          className="text-lg font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-300"
          layout
        >
          {prompt.title}
        </motion.h3>
        
        <motion.p 
          className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300"
          layout
        >
          {prompt.summary}
        </motion.p>

        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2"
          layout
        >
          {prompt.tags.slice(0, 3).map((tag, index) => (
            <motion.span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs bg-accent/50 text-accent-foreground/70 rounded-full transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: animationUtils.createStaggerDelay(index, 0.1, 0.3), 
                duration: 0.2 
              }}
              style={{ willChange: performance.willChange.transform }}
            >
              {tag}
            </motion.span>
          ))}
          {prompt.tags.length > 3 && (
            <motion.span
              className="inline-flex items-center px-2 py-1 text-xs bg-accent/30 text-accent-foreground/50 rounded-full transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              style={{ willChange: performance.willChange.transform }}
            >
              +{prompt.tags.length - 3} more
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 h-auto"
        >
          <motion.div
            className="flex items-center gap-1.5"
            whileHover={{ x: 2 }}
            transition={animations.tween.fast}
            style={{ willChange: performance.willChange.transform }}
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </motion.div>
        </Button>

        <Button
          className="tasty-gradient-button bg-transparent text-foreground text-xs px-4 py-2 h-auto rounded-xl border-2 transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-orange-500/10 hover:via-pink-500/10 hover:to-purple-600/10"
          style={{
            background: 'transparent',
            borderImage: 'linear-gradient(90deg, #f97316, #ec4899, #a855f7) 1',
            borderImageSlice: '1'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(prompt);
          }}
        >
          <motion.span
            className="flex items-center gap-1.5 relative z-10"
            whileHover={{ x: 2 }}
            transition={animations.tween.fast}
            style={{ willChange: performance.willChange.transform }}
          >
            <span>View Prompt</span>
            <ArrowRight className="h-3 w-3" />
          </motion.span>
          
          {/* Subtle gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, rgba(249, 115, 22, 0.1), rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))'
            }}
            style={{ willChange: performance.willChange.opacity }}
          />
        </Button>
      </div>
    </motion.div>
  );
}
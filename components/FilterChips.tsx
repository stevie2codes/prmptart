import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { mockPrompts } from "../data/prompts";
import { motion, AnimatePresence } from "framer-motion";
import { animations, variants, performance, animationUtils } from "../src/lib/animations";
import { useSound } from "../src/contexts/SoundContext";

interface FilterChipsProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
}

export function FilterChips({ selectedTags, onTagToggle, onClearTags }: FilterChipsProps) {
  const { playSound } = useSound();

  const handleTagToggle = (tag: string) => {
    playSound('FILTER_SELECT');
    onTagToggle(tag);
  };

  const handleClearTags = () => {
    playSound('BUTTON_PRESS');
    onClearTags();
  };

  // Get all unique tags from prompts with their counts
  const allTags = mockPrompts.reduce((acc, prompt) => {
    prompt.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort tags by frequency (most used first)
  const sortedTags = Object.entries(allTags)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);

  // Common tags to show first
  const commonTags = ['Persona-based', 'Quick Win', 'Deep Dive', 'Accessibility', 'Visual Output', 'Copywriting'];
  const prioritizedTags = [
    ...commonTags.filter(tag => allTags[tag]),
    ...sortedTags.filter(tag => !commonTags.includes(tag))
  ];

  return (
    <div className="space-y-3">
      {/* Active Filters Header */}
      <AnimatePresence mode="wait">
        {selectedTags.length > 0 && (
          <motion.div
            key="active-filters-header"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={animations.tween.medium}
            className="flex items-center justify-between"
            style={{ willChange: performance.willChange.layout }}
          >
            <motion.span 
              className="text-sm font-medium text-foreground"
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              style={{ willChange: performance.willChange.transform }}
            >
              Active Filters ({selectedTags.length})
            </motion.span>
            <motion.div
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              whileHover={animations.hover.scale}
              whileTap={animations.tap.press}
              style={{ willChange: performance.willChange.transform }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearTags}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Tags */}
      <AnimatePresence mode="wait">
        {selectedTags.length > 0 && (
          <motion.div
            key="selected-tags"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={animations.tween.medium}
            className="flex flex-wrap gap-2"
            style={{ willChange: performance.willChange.layout }}
          >
            {selectedTags.map((tag, index) => (
              <motion.div
                key={`selected-${tag}`}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ 
                  duration: 0.2,
                  delay: animationUtils.createStaggerDelay(index, 0.05, 0.2),
                  layout: animations.layout.smooth
                }}
                whileHover={animations.hover.scale}
                whileTap={animations.tap.press}
                style={{ willChange: performance.willChange.layout }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-primary/20 text-primary-foreground hover:bg-primary/30 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                  <X className="h-3 w-3 ml-1.5 opacity-70 hover:opacity-100 transition-opacity duration-200" />
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Available Tags */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={variants.list}
        initial="hidden"
        animate="visible"
        style={{ willChange: performance.willChange.layout }}
      >
        {prioritizedTags.map((tag, index) => (
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
              className={`text-xs font-medium cursor-pointer transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border-border/50'
              }`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
              <span className="ml-1.5 text-xs opacity-60">({allTags[tag]})</span>
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
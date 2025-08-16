import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { mockPrompts } from "../data/prompts";
import { motion, AnimatePresence } from "framer-motion";

interface FilterChipsProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
}

export function FilterChips({ selectedTags, onTagToggle, onClearTags }: FilterChipsProps) {
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
      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-between"
          >
            <motion.span 
              className="text-sm font-medium text-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Active Filters ({selectedTags.length})
            </motion.span>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearTags}
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
      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
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
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="default"
                  className="text-xs cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/20 shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={() => onTagToggle(tag)}
                >
                  <span className="mr-1">{tag}</span>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-3 w-3" />
                  </motion.div>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Available Tags */}
      <div>
        <motion.p 
          className="text-sm text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Filter by tags:
        </motion.p>
        
        <div className="flex flex-wrap gap-2">
          {prioritizedTags
            .filter(tag => !selectedTags.includes(tag))
            .map((tag, index) => (
              <motion.div
                key={`available-${tag}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.03,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -1,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200 border-border/40 bg-background/50 backdrop-blur-sm"
                  onClick={() => onTagToggle(tag)}
                >
                  <motion.span
                    whileHover={{ x: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {tag}
                  </motion.span>
                  <motion.span 
                    className="ml-1 text-muted-foreground"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    ({allTags[tag]})
                  </motion.span>
                </Badge>
              </motion.div>
            ))}
        </div>
      </div>

      {/* No results indicator */}
      <AnimatePresence>
        {selectedTags.length > 0 && prioritizedTags.filter(tag => !selectedTags.includes(tag)).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-center py-4"
          >
            <p className="text-xs text-muted-foreground">
              All available tags are currently selected
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
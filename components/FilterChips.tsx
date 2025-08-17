import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X, Filter, Tag } from "lucide-react";
import { mockPrompts } from "../data/prompts";
import { motion, AnimatePresence } from "framer-motion";
import { animations, performance, animationUtils } from "../src/lib/animations";
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

  // Group tags by category for better organization
  const tagCategories = {
    'Popular': sortedTags.slice(0, 6), // Top 6 most used tags
    'All Tags': sortedTags.slice(6) // Rest of the tags
  };

  return (
    <div className="space-y-6">
      {/* Active Filters Section */}
      <AnimatePresence mode="wait">
        {selectedTags.length > 0 && (
          <motion.div
            key="active-filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={animations.tween.medium}
            className="bg-primary/5 border border-primary/20 rounded-xl p-4"
            style={{ willChange: performance.willChange.layout }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Active Filters ({selectedTags.length})
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearTags}
                className="h-7 px-3 text-xs text-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <motion.div
                  key={`selected-${tag}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
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
                    className="text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 cursor-pointer px-3 py-1"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    <X className="h-3 w-3 ml-2 opacity-80 hover:opacity-100 transition-opacity duration-200" />
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popular Tags Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Popular Tags</h3>
          <span className="text-xs text-muted-foreground">({tagCategories['Popular'].length})</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tagCategories['Popular'].map((tag, index) => (
            <motion.div
              key={tag}
              layout
              whileHover={animations.hover.scale}
              whileTap={animations.tap.press}
              style={{ willChange: performance.willChange.transform }}
            >
              <Badge
                variant="outline"
                className={`text-xs font-medium cursor-pointer transition-all duration-200 px-3 py-1 ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                <span className="ml-1.5 text-xs opacity-60">({allTags[tag]})</span>
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Tags Section (Collapsible) */}
      {tagCategories['All Tags'].length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">All Tags</h3>
            <span className="text-xs text-muted-foreground">({tagCategories['All Tags'].length})</span>
          </div>
          
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {tagCategories['All Tags'].map((tag, index) => (
              <motion.div
                key={tag}
                layout
                whileHover={animations.hover.scale}
                whileTap={animations.tap.press}
                style={{ willChange: performance.willChange.transform }}
              >
                <Badge
                  variant="outline"
                  className={`text-xs font-medium cursor-pointer transition-all duration-200 px-2 py-1 ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                  <span className="ml-1.5 text-xs opacity-60">({allTags[tag]})</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
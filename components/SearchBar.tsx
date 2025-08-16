import { Search, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animations, variants, performance } from "../src/lib/animations";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search prompts..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={animations.spring.gentle}
        style={{ willChange: performance.willChange.transform }}
      >
        {/* Search Icon */}
        <motion.div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? 'rgb(59, 130, 246)' : undefined
          }}
          transition={animations.tween.fast}
          style={{ willChange: performance.willChange.transform }}
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </motion.div>

        {/* Input Field */}
        <motion.input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-12 text-foreground placeholder-muted-foreground bg-input-background/50 border border-border/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 backdrop-blur-sm transition-all duration-200"
          style={{ 
            fontSize: '16px',
            willChange: performance.willChange.transform 
          }}
          whileFocus={{
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
          }}
        />

        {/* Clear Button */}
        <AnimatePresence mode="wait">
          {value && (
            <motion.button
              key="clear-button"
              variants={variants.scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animations.spring.responsive}
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors duration-200"
              whileHover={animations.hover.scale}
              whileTap={animations.tap.press}
              style={{ willChange: performance.willChange.transform }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Focus Ring Animation */}
      <AnimatePresence mode="wait">
        {isFocused && (
          <motion.div
            key="focus-ring"
            className="absolute inset-0 rounded-2xl border-2 border-primary/40 pointer-events-none"
            variants={variants.scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={animations.tween.fast}
            style={{ willChange: performance.willChange.transform }}
          />
        )}
      </AnimatePresence>

      {/* Subtle glow effect on focus */}
      <AnimatePresence mode="wait">
        {isFocused && (
          <motion.div
            key="focus-glow"
            className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none"
            variants={variants.fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={animations.tween.medium}
            style={{ willChange: performance.willChange.opacity }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
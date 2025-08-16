import { Search, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.2
        }}
      >
        {/* Search Icon */}
        <motion.div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? 'rgb(59, 130, 246)' : undefined
          }}
          transition={{ duration: 0.2 }}
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
          style={{ fontSize: '16px' }}
          whileFocus={{
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
          }}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 10 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.15
              }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors duration-200"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'rgb(239, 68, 68)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Focus Ring Animation */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/40 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Subtle glow effect on focus */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
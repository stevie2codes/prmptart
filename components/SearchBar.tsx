import { Search, X } from "lucide-react";
import { useState, useRef, forwardRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder = "Search prompts..." }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const finalRef = ref || inputRef;

  const handleClear = () => {
    onChange("");
    if (typeof finalRef === 'object' && finalRef?.current) {
      finalRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Search className="h-5 w-5 text-orange-500" />
        </div>

        {/* Input Field */}
        <input
          ref={finalRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-12 text-foreground placeholder-muted-foreground bg-gray-100/90 dark:bg-gray-800/80 border border-orange-200/50 dark:border-orange-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/60 backdrop-blur-sm transition-all duration-200 shadow-lg shadow-orange-500/10"
          style={{ 
            fontSize: '16px'
          }}
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-500 hover:text-orange-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Focus Ring Animation */}
      {isFocused && (
        <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/40 pointer-events-none" />
      )}

      {/* Subtle glow effect on focus */}
      {isFocused && (
        <div className="absolute inset-0 rounded-2xl bg-orange-500/5 pointer-events-none" />
      )}
    </div>
  );
});
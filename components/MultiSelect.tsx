import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useSound } from '../src/contexts/SoundContext';

interface Option {
  value: string;
  label: string;
  count?: number;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({ 
  options, 
  selectedValues, 
  onSelectionChange, 
  placeholder = "Select options...",
  className = ""
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>('below');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { playSound } = useSound();

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate dropdown position to ensure it's always visible
  useEffect(() => {
    if (isOpen && triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 320; // Approximate height of dropdown
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('above');
      } else {
        setDropdownPosition('below');
      }
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleOptionToggle(filteredOptions[focusedIndex].value);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionToggle = (value: string) => {
    playSound('FILTER_SELECT');
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onSelectionChange(newSelection);
  };

  const handleClearAll = () => {
    playSound('BUTTON_PRESS');
    onSelectionChange([]);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(-1);
      setSearchQuery('');
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const selectedOptions = options.filter(option => selectedValues.includes(option.value));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        ref={triggerRef}
        variant="outline"
        onClick={toggleDropdown}
        className={`w-full justify-between h-12 border-orange-200/50 dark:border-orange-700/50 bg-white/80 dark:bg-gray-800/80 text-foreground placeholder-muted-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/60 backdrop-blur-sm transition-all duration-200 shadow-lg shadow-orange-500/10 ${
          isOpen ? 'ring-2 ring-orange-500/30 border-orange-500/60' : ''
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedValues.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex items-center gap-1 min-w-0">
              <Badge variant="secondary" className="text-xs">
                {selectedValues.length} selected
              </Badge>
              {selectedOptions.length > 0 && (
                <span className="text-sm text-foreground truncate">
                  • {selectedOptions[0].label}
                  {selectedOptions.length > 1 && ` +${selectedOptions.length - 1}`}
                </span>
              )}
            </div>
          )}
        </div>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 text-orange-500 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropdownPosition === 'below' ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropdownPosition === 'below' ? -10 : 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-10 w-full bg-background border border-orange-200/50 dark:border-orange-700/50 rounded-2xl shadow-lg  max-h-80 ${
              dropdownPosition === 'below' 
                ? 'top-full mt-2' 
                : 'bottom-full mb-2'
            }`}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-orange-200/30 dark:border-orange-700/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                <Input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tags..."
                  className="pl-10 pr-3 h-9 border-0 focus:ring-0 bg-transparent placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No tags found matching "{searchQuery}"
                </div>
              ) : (
                <div className="p-1">
                  {filteredOptions.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`
                        flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-150
                        ${focusedIndex === index ? 'bg-orange-50 dark:bg-orange-900/20' : 'hover:bg-orange-50/50 dark:hover:bg-orange-900/10'}
                        ${selectedValues.includes(option.value) ? 'bg-orange-100/50 dark:bg-orange-800/30' : ''}
                      `}
                      onClick={() => handleOptionToggle(option.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors duration-150 ${
                          selectedValues.includes(option.value) 
                            ? 'bg-orange-500 border-orange-500' 
                            : 'border-orange-200 dark:border-orange-700'
                        }`}>
                          {selectedValues.includes(option.value) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium truncate">
                          {option.label}
                        </span>
                      </div>
                      {option.count && (
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300">
                          {option.count}
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {selectedValues.length > 0 && (
              <div className="p-3 border-t border-orange-200/30 dark:border-orange-700/30 bg-orange-50/30 dark:bg-orange-900/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedValues.length} tag{selectedValues.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

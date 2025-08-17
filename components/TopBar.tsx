import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { SoundControl } from "./SoundControl";
import { Button } from "./ui/button";
import { useSound } from "../src/contexts/SoundContext";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onCreatePrompt: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopBar({ isSidebarCollapsed, onCreatePrompt, searchQuery, onSearchChange }: TopBarProps) {
  const { playSound } = useSound();

  const handleCreatePrompt = () => {
    playSound('BUTTON_PRESS');
    onCreatePrompt();
  };

  return (
    <header
      className="fixed top-0 z-20 bg-background/80 dark:bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm transition-all duration-300 ease-in-out"
      style={{ 
        left: isSidebarCollapsed ? 72 : 320,
        right: 0,
        height: 64,
        width: `calc(100vw - ${isSidebarCollapsed ? 72 : 320}px)`
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - App title/branding */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Pop-Tart Logo */}
          <motion.div
            className="w-16 h-16"
            animate={{ 
              scale: [1, 1.02, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            style={{ willChange: "transform" }}
          >
            <img
              src="/newlogo.svg"
              alt="PromptArt Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
          
          {/* App Title */}
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0"
            style={{ 
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            prmptart
          </h1>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search prompts by title, content, or tags..."
          />
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <SoundControl />
          <ThemeToggle />
          <Button 
            onClick={handleCreatePrompt} 
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 h-10"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">New Prompt</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
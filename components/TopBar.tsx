import { Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SoundControl } from "./SoundControl";
import { Button } from "./ui/button";
import { useSound } from "../src/contexts/SoundContext";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onCreatePrompt: () => void;
}

export function TopBar({ isSidebarCollapsed, onCreatePrompt }: TopBarProps) {
  const { playSound } = useSound();

  const handleCreatePrompt = () => {
    playSound('BUTTON_SOFT_DOUBLE');
    onCreatePrompt();
  };

  return (
    <header
      className="fixed top-0 z-30 bg-background/80 dark:bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm transition-all duration-300 ease-in-out"
      style={{ 
        left: isSidebarCollapsed ? 72 : 320,
        right: 0,
        height: 64,
        width: `calc(100vw - ${isSidebarCollapsed ? 72 : 320}px)`
      }}
    >
      <div className="flex items-center justify-between h-full px-6">


        {/* Center - Spacer (search moved to sidebar) */}
        <div className="flex-1" />

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
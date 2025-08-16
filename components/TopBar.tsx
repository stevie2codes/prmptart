import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onCreatePrompt: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopBar({ isSidebarCollapsed, onCreatePrompt, searchQuery, onSearchChange }: TopBarProps) {
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
        <div className="flex items-center gap-2">
          {/* Pop-Tart Logo */}
          <div className="w-32 h-24 flex-shrink-0">
            <img
              src="/Playful Food Brand Logo with Poptart Emblem.svg"
              alt="PromptArt Logo"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* App Title */}
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0"
            style={{ 
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            PromptArt
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

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <div className="hidden sm:block">
            <div className="p-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300">
              <ThemeToggle isCollapsed={true} />
            </div>
          </div>

          {/* Create Prompt Button */}
          <Button
            onClick={onCreatePrompt}
            className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-pink-500/30 border-0 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="flex items-center gap-2 relative z-10">
              <Plus className="h-4 w-4" />
              <span>Create Prompt</span>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
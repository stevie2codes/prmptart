import { ThemeToggle } from "./ThemeToggle";
import { SoundControl } from "./SoundControl";

interface TopBarProps {
  isSidebarCollapsed: boolean;
}

export function TopBar({ 
  isSidebarCollapsed
}: TopBarProps) {

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
        {/* Left side - Spacer */}
        <div className="flex-1" />

        {/* Right side controls */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <SoundControl />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSound } from "../src/contexts/SoundContext";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  isCollapsed?: boolean;
}

export function ThemeToggle({ isCollapsed = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { playSound } = useSound();

  const themes = [
    { id: 'light' as const, label: 'Light', icon: Sun, description: 'Clean and bright' },
    { id: 'dark' as const, label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { id: 'system' as const, label: 'System', icon: Monitor, description: 'Follows your OS' }
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  if (isCollapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground rounded-xl"
          >
            <CurrentIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent>
          {themes.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.id}
              onClick={() => {
                setTheme(themeOption.id);
                playSound("THEME_SWITCH");
              }}
            >
              {themeOption.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Full-width version for expanded sidebar
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="w-full p-3 rounded-xl hover:bg-sidebar-accent/50"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${
              theme === 'dark' 
                ? 'bg-blue-900/20 text-blue-400' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <CurrentIcon className="h-3.5 w-3.5" />
            </div>
            
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-sidebar-foreground">
                {currentTheme.label} Mode
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                Click to change theme
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent>
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.id}
            onClick={() => {
              setTheme(themeOption.id);
              playSound("THEME_SWITCH");
            }}
          >
            {themeOption.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
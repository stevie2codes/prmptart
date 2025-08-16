import { Moon, Sun, Monitor, ChevronDown, Check } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ThemeToggleProps {
  isCollapsed?: boolean;
}

export function ThemeToggle({ isCollapsed = false }: ThemeToggleProps) {
  const { theme, setTheme, isDark } = useTheme();

  const themes = [
    { id: "light" as const, icon: Sun, label: "Light" },
    { id: "dark" as const, icon: Moon, label: "Dark" },
    { id: "system" as const, icon: Monitor, label: "System" },
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
              onClick={() => setTheme(themeOption.id)}
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
              isDark 
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
            onClick={() => setTheme(themeOption.id)}
          >
            {themeOption.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
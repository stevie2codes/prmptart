import { motion } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

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

  const handleToggle = () => {
    const currentIndex = themes.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id);
  };

  if (isCollapsed) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="h-10 w-10 p-0 hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground rounded-xl"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              opacity: { duration: 0.2 }
            }}
          >
            <CurrentIcon className="h-4 w-4" />
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="w-full p-3 rounded-xl transition-all duration-200 hover:bg-sidebar-accent/50 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="relative"
          key={theme}
          initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            opacity: { duration: 0.2 }
          }}
        >
          <div className={`p-1.5 rounded-lg ${
            isDark 
              ? 'bg-blue-900/20 text-blue-400' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            <CurrentIcon className="h-3.5 w-3.5" />
          </div>
        </motion.div>
        
        <div className="flex-1 text-left">
          <motion.p 
            className="text-sm font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
            key={theme}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {currentTheme.label} Mode
          </motion.p>
          <motion.p 
            className="text-xs text-sidebar-foreground/60"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            Tap to cycle themes
          </motion.p>
        </div>

        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          {themes.map((t, index) => (
            <motion.div
              key={t.id}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                t.id === theme 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-sidebar-foreground/30'
              }`}
              animate={{ 
                scale: t.id === theme ? 1.25 : 1,
                opacity: t.id === theme ? 1 : 0.5
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.button>
  );
}
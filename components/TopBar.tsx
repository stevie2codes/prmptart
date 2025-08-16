import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { animations, variants, performance } from "../src/lib/animations";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onCreatePrompt: () => void;
}

export function TopBar({ isSidebarCollapsed, onCreatePrompt }: TopBarProps) {
  return (
    <motion.header
      className="fixed top-0 z-20 bg-background/80 dark:bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm transition-all duration-300 ease-in-out"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={animations.tween.medium}
      style={{ 
        left: isSidebarCollapsed ? 72 : 320,
        right: 0,
        height: 64,
        width: `calc(100vw - ${isSidebarCollapsed ? 72 : 320}px)`,
        willChange: performance.willChange.layout 
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - App title/branding */}
        <motion.div
          className="flex items-center gap-3"
          variants={variants.slideIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ willChange: performance.willChange.transform }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-sm"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: performance.willChange.transform }}
          />
          <h1 className="text-lg font-medium text-foreground transition-colors duration-300">
            PrmptArt
          </h1>
        </motion.div>

        {/* Right side - Actions */}
        <motion.div
          className="flex items-center gap-3"
          variants={variants.slideIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ willChange: performance.willChange.transform }}
        >
          {/* Theme Toggle */}
          <motion.div
            className="hidden sm:block"
            whileHover={animations.hover.scale}
            whileTap={animations.tap.press}
            style={{ willChange: performance.willChange.transform }}
          >
            <div className="p-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300">
              <ThemeToggle isCollapsed={true} />
            </div>
          </motion.div>

          {/* Create Prompt Button */}
          <motion.div
            whileHover={animations.hover.scale}
            whileTap={animations.tap.press}
            style={{ willChange: performance.willChange.transform }}
          >
            <Button
              onClick={onCreatePrompt}
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-pink-500/30 border-0 transition-all duration-300 relative overflow-hidden group"
            >
              <motion.span
                className="flex items-center gap-2 relative z-10"
                whileHover={{ x: 2 }}
                transition={animations.tween.fast}
                style={{ willChange: performance.willChange.transform }}
              >
                <Plus className="h-4 w-4" />
                <span>Create Prompt</span>
              </motion.span>
              
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  ],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
                style={{ willChange: performance.willChange.transform }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onCreatePrompt: () => void;
}

export function TopBar({ isSidebarCollapsed, onCreatePrompt }: TopBarProps) {
  return (
    <motion.header
      className="fixed top-0 right-0 z-20 bg-background/80 dark:bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm transition-all duration-300 ease-in-out"
      style={{
        left: isSidebarCollapsed ? 72 : 320,
        height: 64,
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        left: isSidebarCollapsed ? 72 : 320
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - App title/branding */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
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
          />
          <h1 className="text-lg font-medium text-foreground transition-colors duration-300">
            PrmptArt
          </h1>
        </motion.div>

        {/* Right side - Actions */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Theme Toggle */}
          <motion.div
            className="hidden sm:block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300">
              <ThemeToggle isCollapsed={true} />
            </div>
          </motion.div>

          {/* Create Prompt Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onCreatePrompt}
              className="tasty-gradient-button bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-pink-500/35 border-0 rounded-xl px-4 py-2 h-auto relative overflow-hidden"
              style={{ fontSize: '14px', fontWeight: '500' }}
            >
              <motion.span
                className="flex items-center gap-2 relative z-10"
                whileHover={{ x: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
                <span className="hidden sm:inline">Create Prompt</span>
                <span className="sm:hidden">Create</span>
              </motion.span>
              
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle bottom border gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
    </motion.header>
  );
}
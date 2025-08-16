import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface CreatePromptButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
}

export function CreatePromptButton({ onClick, isMenuOpen }: CreatePromptButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-8 z-30"
      style={{
        right: "32px",
      }}
      animate={{
        right: isMenuOpen ? "32px" : "32px",
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.8,
      }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Floating gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur-xl opacity-60 animate-gradient-flow" />
        
        {/* Main button */}
        <Button
          onClick={onClick}
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl h-14 px-6 rounded-2xl backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(147, 51, 234) 100%)",
            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(147, 51, 234, 0.3)",
          }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: isHovered ? 90 : 0,
                scale: isHovered ? 1.1 : 1 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
            >
              <Plus className="h-5 w-5" />
            </motion.div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">Create Prompt</span>
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                  scale: isHovered ? 1.1 : 1 
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: isHovered ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </Button>

        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
      </motion.div>

      <style>{`
        @keyframes gradient-flow {
          0%, 100% { background-size: 200% 200%; background-position: 0% 50%; }
          50% { background-size: 200% 200%; background-position: 100% 50%; }
        }
        
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }
      `}</style>
    </motion.div>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle, BookOpen, Tag, Zap } from "lucide-react";
import { Prompt } from "../data/prompts";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useState, useRef, useEffect } from "react";

interface SidePanelProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SidePanel({ prompt, isOpen, onClose }: SidePanelProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when prompt changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setShowExample(false);
  }, [prompt?.id]);

  const handleCopy = async () => {
    if (!prompt?.content) return;
    
    try {
      await navigator.clipboard.writeText(prompt.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = prompt.content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getImpactIcon = () => {
    if (!prompt) return "💡";
    switch (prompt.impact) {
      case "High Impact":
        return "🔥";
      case "Quick Win":
        return "⚡";
      case "5-min Setup":
        return "⏱";
      default:
        return "💡";
    }
  };

  const getPhaseColor = () => {
    if (!prompt) return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    const colors = {
      Research: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      IA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      Ideation: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      Prototyping: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      Stakeholder: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      "Dev Handoff": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    };
    return colors[prompt.phase] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  const formatPromptContent = (content: string | undefined) => {
    // Handle undefined or null content
    if (!content || typeof content !== 'string') {
      return (
        <motion.div
          className="bg-muted/30 rounded-xl p-4 border border-border/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            No content available for this prompt.
          </p>
        </motion.div>
      );
    }

    // Split content by RTCCF sections
    const sections = content.split(/(?=\*\*(?:Role|Task|Context|Constraints|Format):\*\*)/);
    
    return sections.map((section, index) => {
      if (section.trim() === '') return null;
      
      const lines = section.trim().split('\n');
      const heading = lines[0];
      const sectionContent = lines.slice(1).join('\n').trim();
      
      if (heading.includes('**') && heading.includes(':')) {
        const sectionName = heading.replace(/\*\*/g, '').replace(':', '');
        return (
          <motion.div
            key={index}
            className="space-y-3"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <motion.h4 
              className="text-sm font-medium text-foreground flex items-center gap-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
              >
                {sectionName === 'Role' && <BookOpen className="h-4 w-4 text-blue-500" />}
                {sectionName === 'Task' && <Zap className="h-4 w-4 text-orange-500" />}
                {sectionName === 'Context' && <Tag className="h-4 w-4 text-green-500" />}
                {sectionName === 'Constraints' && <X className="h-4 w-4 text-red-500" />}
                {sectionName === 'Format' && <Copy className="h-4 w-4 text-purple-500" />}
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
              >
                {sectionName}
              </motion.span>
            </motion.h4>
            <motion.div 
              className="synthwave-card bg-muted/30 rounded-xl p-4 border border-border/30 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <motion.p 
                className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
              >
                {sectionContent}
              </motion.p>
            </motion.div>
          </motion.div>
        );
      }
      
      return (
        <motion.div
          key={index}
          className="synthwave-card bg-muted/30 rounded-xl p-4 border border-border/30 relative overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.1, 
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          whileHover={{ scale: 1.01 }}
        >
          <motion.p 
            className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          >
            {section.trim()}
          </motion.p>
        </motion.div>
      );
    }).filter(Boolean);
  };

  return (
    <AnimatePresence>
      {isOpen && prompt && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[480px] bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.5
            }}
          >
            {/* Header - Fixed */}
            <motion.div
              className="flex-shrink-0 p-6 border-b border-border/30 bg-background/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-start justify-between">
                <motion.div 
                  className="space-y-3 flex-1 pr-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge className={`${getPhaseColor()} text-xs font-medium transition-all duration-300`}>
                        {prompt.phase}
                      </Badge>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full transition-all duration-300"
                      whileHover={{ scale: 1.05, backgroundColor: "var(--muted)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <motion.span
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        {getImpactIcon()}
                      </motion.span>
                      <span className="font-medium">{prompt.impact}</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-xl font-medium text-foreground pr-8 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    {prompt.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    {prompt.summary}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-8 w-8 p-0 hover:bg-accent rounded-xl transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Scrollable Content */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{
                scrollbarWidth: 'thin',
              }}
            >
              <motion.div
                className="p-6 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Tags */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <motion.h3 
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Tag className="h-4 w-4 text-blue-500" />
                    </motion.div>
                    Tags
                  </motion.h3>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags?.map((tag, index) => (
                      <motion.span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 text-xs bg-accent/50 text-accent-foreground/70 rounded-full transition-all duration-300 hover:bg-accent/70"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: 0.6 + index * 0.05, 
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.span>
                    )) || (
                      <motion.span 
                        className="text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        No tags available
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Separator className="bg-border/50" />
                </motion.div>

                {/* RTCCF Content */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <motion.h3 
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <BookOpen className="h-4 w-4 text-purple-500" />
                      </motion.div>
                      RTCCF Prompt
                    </motion.h3>
                    {prompt.exampleOutput && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowExample(!showExample)}
                          className="text-xs h-7 px-3 transition-all duration-200"
                        >
                          <motion.span
                            animate={{ opacity: showExample ? 0.7 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {showExample ? 'Hide Example' : 'Show Example'}
                          </motion.span>
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {formatPromptContent(prompt.content)}
                  </div>

                  {/* Example Output */}
                  <AnimatePresence>
                    {showExample && prompt.exampleOutput && (
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                        >
                          <Separator className="bg-border/50" />
                        </motion.div>
                        <motion.h4 
                          className="text-sm font-medium text-foreground flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          whileHover={{ x: 2 }}
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          >
                            ✨
                          </motion.div>
                          Example Output
                        </motion.h4>
                        <motion.div 
                          className="synthwave-card bg-muted/30 rounded-xl p-4 border border-border/30 relative overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <motion.p 
                            className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                          >
                            {prompt.exampleOutput}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>

            {/* Footer Actions - Fixed */}
            <motion.div
              className="flex-shrink-0 p-6 border-t border-border/30 bg-background/50 backdrop-blur-sm space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleCopy}
                  className="tasty-gradient-button w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-pink-500/35 border-0 rounded-xl py-3 h-auto relative overflow-hidden"
                  disabled={isCopied || !prompt?.content}
                >
                  <motion.span
                    className="flex items-center justify-center gap-2 relative z-10"
                    animate={{ 
                      scale: isCopied ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div
                          key="copied"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </motion.div>
                          <span>Copied to Clipboard!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ 
                              y: [0, -2, 0],
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </motion.div>
                          <span>{!prompt?.content ? 'No Content Available' : 'Copy Prompt'}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.span>
                  
                  {/* Animated gradient overlay */}
                  {!isCopied && prompt?.content && (
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
                    />
                  )}
                </Button>
              </motion.div>

              <motion.p 
                className="text-xs text-muted-foreground text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                {prompt?.content ? 'Remember to replace placeholder values before using' : 'This prompt has no content available'}
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
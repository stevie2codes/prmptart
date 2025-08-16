import { useState, useMemo } from "react";
import { PromptCard } from "./components/PromptCard";
import { SidePanel } from "./components/SidePanel";
import { SearchBar } from "./components/SearchBar";
import { FilterChips } from "./components/FilterChips";
import { NavigationSidebar } from "./components/NavigationSidebar";
import { TopBar } from "./components/TopBar";
import { CreatePromptModal } from "./components/CreatePromptModal";
import { ThemeProvider } from "./components/ThemeProvider";
import { mockPrompts, Prompt } from "./data/prompts";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

function AppContent() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('design');

  // Filter prompts based on search, category, and filters
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      // For now, only show design prompts since that's what we have
      if (selectedCategory !== 'design') return false;

      const matchesSearch =
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesPhase = !selectedPhase || prompt.phase === selectedPhase;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => prompt.tags.includes(tag));

      return matchesSearch && matchesPhase && matchesTags;
    });
  }, [searchQuery, selectedPhase, selectedTags, prompts, selectedCategory]);

  const handlePhaseSelect = (phase: string) => {
    setSelectedPhase((prev) => (prev === phase ? null : phase));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Clear phase selection when switching categories
    if (category !== 'design') {
      setSelectedPhase(null);
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const handleOpenPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleClosePanel = () => {
    setSelectedPrompt(null);
  };

  const handleCreatePrompt = () => {
    setIsCreateModalOpen(true);
  };

  const handleSavePrompt = (newPrompt: Omit<Prompt, 'id'>) => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const promptWithId: Prompt = { ...newPrompt, id };
    
    setPrompts(prev => [promptWithId, ...prev]);
    setIsCreateModalOpen(false);
    
    toast.success("Prompt created successfully!", {
      description: "Your custom prompt has been added to the library.",
    });
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Helper to get phase label for display
  const getPhaseLabel = () => {
    const phaseLabels = {
      Research: "Research & Discovery",
      IA: "User Flows & IA",
      Ideation: "Ideation & Concept Development",
      Prototyping: "Prototyping & Testing",
      Stakeholder: "Stakeholder & PM Conversations",
      "Dev Handoff": "Developer Handoff & QA",
    };
    return selectedPhase ? phaseLabels[selectedPhase] || selectedPhase : null;
  };

  // Helper to get category label for display
  const getCategoryLabel = () => {
    const categoryLabels = {
      design: "Design Prompts",
      pm: "PM Prompts", 
      engineering: "Engineering Prompts"
    };
    return categoryLabels[selectedCategory] || "Prompt Library";
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 ease-in-out synthwave-bg">
      {/* Synthwave Background Effects - Only in Dark Mode */}
      <div className="synthwave-background-effects">
        <div className="synthwave-grid"></div>
        <div className="synthwave-glow-orbs">
          <div className="synthwave-orb synthwave-orb-1"></div>
          <div className="synthwave-orb synthwave-orb-2"></div>
          <div className="synthwave-orb synthwave-orb-3"></div>
        </div>
      </div>

      {/* Top Bar */}
      <TopBar 
        isSidebarCollapsed={isSidebarCollapsed}
        onCreatePrompt={handleCreatePrompt}
      />

      {/* Navigation Sidebar */}
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
        selectedPhase={selectedPhase}
        onPhaseSelect={handlePhaseSelect}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content Area */}
      <motion.div
        className="main-content-area"
        style={{ 
          marginLeft: isSidebarCollapsed ? 72 : 320,
          marginTop: 64, // Account for top bar
          padding: '32px'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          marginLeft: isSidebarCollapsed ? 72 : 320
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <motion.header
          className="synthwave-card bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/20 mb-8 transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-none p-8">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h1
                className="synthwave-title text-3xl font-medium text-foreground mb-3 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                {selectedPhase ? getPhaseLabel() : getCategoryLabel()}
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-lg transition-colors duration-300"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {selectedCategory === 'design' ? (
                  selectedPhase
                    ? `RTCCF-compliant prompts for the ${getPhaseLabel()} phase of your design process.`
                    : "RTCCF-compliant prompts for product designers across every phase of your design process."
                ) : (
                  `${getCategoryLabel()} coming soon! Stay tuned for specialized prompts.`
                )}
              </motion.p>
            </motion.div>

            {selectedCategory === 'design' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search prompts by title, summary, or tags..."
                />

                <FilterChips
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearTags={handleClearTags}
                />
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Main Content */}
        <main>
          {selectedCategory === 'design' ? (
            <>
              {/* Results Count */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.1,
                }}
              >
                <p className="text-sm text-muted-foreground transition-colors duration-300">
                  <motion.span
                    key={filteredPrompts.length}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredPrompts.length}{" "}
                    {filteredPrompts.length === 1 ? "prompt" : "prompts"} found
                  </motion.span>
                  <AnimatePresence>
                    {selectedPhase && (
                      <motion.span
                        className="synthwave-badge ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium transition-colors duration-300"
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getPhaseLabel()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {selectedTags.length > 0 && (
                      <motion.span
                        className="synthwave-badge ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium transition-colors duration-300"
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {selectedTags.length}{" "}
                        {selectedTags.length === 1 ? "tag" : "tags"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </p>
              </motion.div>

              {/* Prompt Grid */}
              <AnimatePresence mode="wait">
                {filteredPrompts.length > 0 ? (
                  <motion.div
                    key="prompt-grid"
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    layout
                  >
                    <AnimatePresence>
                      {filteredPrompts.map((prompt, index) => (
                        <motion.div
                          key={prompt.id}
                          layout
                          initial={{
                            opacity: 0,
                            y: 40,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 20,
                          }}
                          transition={{
                            type: "tween",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.6,
                            delay: Math.min(index * 0.015, 0.3),
                            layout: {
                              type: "tween",
                              stiffness: 350,
                              damping: 35,
                            },
                          }}
                          style={{
                            willChange: "transform, opacity",
                          }}
                        >
                          <PromptCard prompt={prompt} onOpen={handleOpenPrompt} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    className="synthwave-card text-center bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg p-12 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="max-w-md mx-auto">
                      <motion.div
                        className="synthwave-icon-container w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl flex items-center justify-center transition-colors duration-300"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <SearchIcon className="h-8 w-8 text-muted-foreground" />
                      </motion.div>
                      <motion.p
                        className="text-muted-foreground text-lg mb-2 transition-colors duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        No prompts found
                      </motion.p>
                      <motion.p
                        className="text-sm text-muted-foreground transition-colors duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                        {selectedPhase
                          ? `Try searching within ${getPhaseLabel()} or select a different phase`
                          : "Try adjusting your search terms or selecting a design phase"}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            // Coming Soon for other categories
            <motion.div
              className="synthwave-card text-center bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg p-12 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  className="synthwave-icon-container w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-100/50 to-purple-200/50 dark:from-purple-700/50 dark:to-purple-800/50 rounded-2xl flex items-center justify-center transition-colors duration-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <ComingSoonIcon className="h-8 w-8 text-muted-foreground" />
                </motion.div>
                <motion.p
                  className="text-muted-foreground text-lg mb-2 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Coming Soon
                </motion.p>
                <motion.p
                  className="text-sm text-muted-foreground transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {getCategoryLabel()} are currently being developed and will be available in a future update.
                </motion.p>
              </div>
            </motion.div>
          )}
        </main>
      </motion.div>

      {/* Side Panel */}
      <SidePanel
        prompt={selectedPrompt}
        isOpen={selectedPrompt !== null}
        onClose={handleClosePanel}
      />

      {/* Overlay for side panel */}
      <AnimatePresence>
        {selectedPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-colors duration-300"
            onClick={handleClosePanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Create Prompt Modal */}
      <CreatePromptModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSavePrompt}
      />

      {/* Toast Container */}
      <Toaster
        position="top-center"
        offset={88} // Account for top bar height
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--background)",
            backdropFilter: "blur(12px)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "1.5",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            maxWidth: "420px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          className: "toast-notification",
          successStyle: {
            background: "rgba(240, 253, 244, 0.95)",
            backdropFilter: "blur(12px)",
            color: "#166534",
            border: "1px solid rgba(187, 247, 208, 0.3)",
            boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.1), 0 10px 10px -5px rgba(34, 197, 94, 0.04)",
          },
          errorStyle: {
            background: "rgba(254, 242, 242, 0.95)",
            backdropFilter: "blur(12px)",
            color: "#dc2626",
            border: "1px solid rgba(254, 202, 202, 0.3)",
            boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)",
          },
        }}
        toastClassName="toast-slide-in"
      />

      {/* Enhanced CSS for synthwave theme, smooth dark mode transitions, and tasty gradient buttons */}
      <style>{`
        /* Global transition for smooth theme changes */
        * {
          transition-property: background-color, border-color, color, fill, stroke, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
        
        /* Tasty Gradient Button Styling */
        .tasty-gradient-button {
          background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6) !important;
          background-size: 200% 200% !important;
          animation: tastyGradientShift 4s ease infinite !important;
          box-shadow: 
            0 4px 15px rgba(249, 115, 22, 0.3),
            0 0 20px rgba(236, 72, 153, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          border: none !important;
          color: white !important;
          font-weight: 600 !important;
          position: relative !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
        }
        
        .tasty-gradient-button:hover {
          background: linear-gradient(135deg, #ea580c, #db2777, #7c3aed) !important;
          box-shadow: 
            0 6px 20px rgba(249, 115, 22, 0.4),
            0 0 30px rgba(236, 72, 153, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-1px) !important;
        }
        
        .tasty-gradient-button:active {
          transform: translateY(0px) !important;
          box-shadow: 
            0 2px 10px rgba(249, 115, 22, 0.3),
            0 0 15px rgba(236, 72, 153, 0.2) !important;
        }
        
        .tasty-gradient-button:disabled {
          background: linear-gradient(135deg, #94a3b8, #64748b, #475569) !important;
          box-shadow: none !important;
          transform: none !important;
          animation: none !important;
        }
        
        @keyframes tastyGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Dark mode enhancements for tasty buttons */
        .dark .tasty-gradient-button {
          background: linear-gradient(135deg, #ff6b35, #ff0096, #9945ff) !important;
          box-shadow: 
            0 4px 20px rgba(255, 107, 53, 0.4),
            0 0 30px rgba(255, 0, 150, 0.3),
            0 0 40px rgba(153, 69, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        .dark .tasty-gradient-button:hover {
          background: linear-gradient(135deg, #ff5722, #e91e63, #673ab7) !important;
          box-shadow: 
            0 6px 25px rgba(255, 107, 53, 0.5),
            0 0 40px rgba(255, 0, 150, 0.4),
            0 0 50px rgba(153, 69, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        /* Synthwave Background Effects - Only visible in dark mode */
        .synthwave-background-effects {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        
        .dark .synthwave-background-effects {
          opacity: 1;
        }
        
        /* Synthwave Grid Background */
        .synthwave-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(90deg, rgba(255, 0, 150, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 100px 100px;
          animation: synthwaveGridMove 20s linear infinite;
        }
        
        @keyframes synthwaveGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        /* Synthwave Glowing Orbs */
        .synthwave-glow-orbs {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }
        
        .synthwave-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.1;
          animation: synthwaveFloat 15s ease-in-out infinite;
        }
        
        .synthwave-orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #ff0096, #00ffff);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .synthwave-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #9945ff, #ff6b9d);
          top: 60%;
          right: 15%;
          animation-delay: -5s;
        }
        
        .synthwave-orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #00ffff, #ff0096);
          bottom: 20%;
          left: 60%;
          animation-delay: -10s;
        }
        
        @keyframes synthwaveFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-30px) translateX(20px) scale(1.1); }
          50% { transform: translateY(-20px) translateX(-15px) scale(0.9); }
          75% { transform: translateY(-40px) translateX(25px) scale(1.05); }
        }
        
        /* Synthwave Background Gradient */
        .dark .synthwave-bg {
          background: 
            radial-gradient(ellipse at top, rgba(20, 20, 60, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(60, 20, 100, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 100%);
          background-attachment: fixed;
        }
        
        /* Synthwave Card Styling */
        .dark .synthwave-card {
          background: rgba(10, 10, 30, 0.6) !important;
          border: 1px solid rgba(255, 0, 150, 0.2) !important;
          box-shadow: 
            0 0 20px rgba(255, 0, 150, 0.1),
            0 0 40px rgba(0, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          position: relative;
          overflow: hidden;
        }
        
        .dark .synthwave-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 0, 150, 0.05) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0, 255, 255, 0.05) 100%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .dark .synthwave-card:hover::before {
          opacity: 1;
        }
        
        /* Synthwave Title Styling */
        .dark .synthwave-title {
          background: linear-gradient(135deg, #ff0096, #00ffff, #9945ff);
          background-size: 300% 300%;
          animation: synthwaveGradient 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes synthwaveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Synthwave Badge Styling */
        .dark .synthwave-badge {
          background: linear-gradient(135deg, rgba(255, 0, 150, 0.2), rgba(0, 255, 255, 0.2)) !important;
          border: 1px solid rgba(255, 0, 150, 0.3) !important;
          color: #ff6b9d !important;
          box-shadow: 0 0 10px rgba(255, 0, 150, 0.2);
        }
        
        /* Synthwave Icon Container */
        .dark .synthwave-icon-container {
          background: linear-gradient(135deg, rgba(255, 0, 150, 0.1), rgba(0, 255, 255, 0.1)) !important;
          border: 1px solid rgba(255, 0, 150, 0.2);
          box-shadow: 
            0 0 20px rgba(255, 0, 150, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        /* Toast animations */
        .toast-slide-in {
          animation: slideInFromTop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        /* Enhanced performance for card animations */
        .prompt-card-container {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Smooth transitions for all interactive elements */
        .grid > div {
          transform: translateZ(0);
          isolation: isolate;
        }
        
        /* Hardware acceleration for smoother animations */
        [data-motion-component] {
          transform: translateZ(0);
          will-change: transform, opacity;
        }
        
        /* Prevent layout shift during animations */
        .grid {
          contain: layout style;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .main-content-area {
            margin-left: 72px !important;
            padding: 1rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .main-content-area {
            margin-left: 0 !important;
            padding-top: 1rem !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
          }
          
          .synthwave-grid {
            background-size: 50px 50px;
          }
        }
        
        /* High contrast and reduced motion support */
        @media (prefers-contrast: high) {
          .toast-notification {
            border-width: 2px !important;
            font-weight: 600 !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .toast-slide-in,
          .synthwave-grid,
          .synthwave-orb,
          .synthwave-title,
          .tasty-gradient-button {
            animation: none !important;
          }
          
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Enhanced dark mode toast styling with synthwave elements */
        .dark .toast-notification {
          background: rgba(10, 10, 30, 0.95) !important;
          color: var(--card-foreground) !important;
          border: 1px solid rgba(255, 0, 150, 0.3) !important;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.4), 
            0 10px 10px -5px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(255, 0, 150, 0.1) !important;
        }
        
        .dark .toast-notification[data-type="success"] {
          background: rgba(15, 36, 25, 0.95) !important;
          color: #4ade80 !important;
          border: 1px solid rgba(0, 255, 150, 0.5) !important;
          box-shadow: 0 0 20px rgba(0, 255, 150, 0.2) !important;
        }
        
        .dark .toast-notification[data-type="error"] {
          background: rgba(45, 27, 27, 0.95) !important;
          color: #ff6b9d !important;
          border: 1px solid rgba(255, 0, 150, 0.5) !important;
          box-shadow: 0 0 20px rgba(255, 0, 150, 0.2) !important;
        }
        
        /* Scrollbar styling for synthwave theme */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
          transition: background-color 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, rgba(255, 0, 150, 0.3), rgba(0, 255, 255, 0.3));
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, rgba(255, 0, 150, 0.5), rgba(0, 255, 255, 0.5));
        }
        
        /* Sidebar responsive behavior */
        @media (max-width: 768px) {
          aside {
            transform: translateX(-100%);
          }
          
          aside.mobile-open {
            transform: translateX(0);
          }
        }
        
        /* Theme toggle specific styling */
        .theme-toggle-indicators {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Backdrop blur enhancement for better liquid glass effect */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        
        /* Enhanced button hover states for dark mode with synthwave */
        .dark button:hover {
          background-color: var(--sidebar-accent);
          color: var(--sidebar-accent-foreground);
          box-shadow: 0 0 15px rgba(255, 0, 150, 0.1);
        }
        
        /* Smooth border color transitions */
        .border-sidebar-border\\/30 {
          transition: border-color 0.3s ease;
        }
        
        /* Focus states for accessibility with synthwave glow */
        .dark button:focus-visible, 
        .dark input:focus-visible {
          outline: 2px solid rgba(255, 0, 150, 0.6);
          outline-offset: 2px;
          box-shadow: 0 0 20px rgba(255, 0, 150, 0.3);
        }
        
        button:focus-visible, input:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        
        /* Top bar specific styling */
        .top-bar-gradient {
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
        }
        
        /* Synthwave subtle background pattern */
        .dark .synthwave-bg::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 0, 150, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(153, 69, 255, 0.025) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
        }
        
        /* Light mode remains clean and minimal */
        .light .synthwave-card,
        .light .synthwave-title,
        .light .synthwave-badge,
        .light .synthwave-icon-container {
          /* Reset any synthwave styles for light mode */
          background: var(--card) !important;
          border: 1px solid var(--border) !important;
          color: var(--foreground) !important;
          text-shadow: none !important;
        }
        
        .light .synthwave-title {
          background: var(--foreground) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          text-shadow: none !important;
        }
        
        /* Light mode tasty button adjustments */
        .light .tasty-gradient-button {
          background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6) !important;
          box-shadow: 
            0 4px 15px rgba(249, 115, 22, 0.25),
            0 2px 8px rgba(236, 72, 153, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        .light .tasty-gradient-button:hover {
          box-shadow: 
            0 6px 20px rgba(249, 115, 22, 0.35),
            0 4px 12px rgba(236, 72, 153, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="figma-prompt-library-theme">
      <AppContent />
    </ThemeProvider>
  );
}

// Simple search icon component for empty state
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

// Coming soon icon component
function ComingSoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v6l4 2m6-6a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
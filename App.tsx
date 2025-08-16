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
import { animations, variants, performance, animationUtils } from "./src/lib/animations";
import { ScrollAnimatedCard } from "./components/ScrollAnimatedCard";
import { ScrollAnimatedSection } from "./components/ScrollAnimatedSection";

function AppContent() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'design' | 'pm' | 'engineering' | null>('design');

  // Filter prompts based on search, category, and filters
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchQuery === "" || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;
      
      const matchesPhase = selectedPhase === null || prompt.phase === selectedPhase;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => prompt.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesPhase && matchesTags;
    });
  }, [prompts, searchQuery, selectedCategory, selectedPhase, selectedTags]);

  const handleOpenPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleClosePrompt = () => {
    setSelectedPrompt(null);
  };

  const handleCreatePrompt = (newPrompt: any) => {
    setPrompts(prev => [newPrompt, ...prev]);
    toast.success("Prompt created successfully!", {
      description: "Your new prompt has been added to the library.",
      duration: 4000,
    });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const handlePhaseSelect = (phase: string) => {
    setSelectedPhase(prev => prev === phase ? null : phase);
  };

  const handleCategorySelect = (category: 'design' | 'pm' | 'engineering') => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Foggy gradient overlay for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 198, 255, 0.06) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Dark mode foggy gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 dark:block hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 198, 255, 0.12) 0%, transparent 50%)
          `
        }}
      />

      {/* Navigation Sidebar */}
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        selectedPhase={selectedPhase}
        onPhaseSelect={handlePhaseSelect}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ease-in-out`}
        style={{
          paddingLeft: isSidebarCollapsed ? '72px' : '320px',
          minHeight: '100vh',
          width: '100vw',
          maxWidth: '100vw',
          position: 'relative'
        }}
      >
        {/* Top Bar */}
        <TopBar
          isSidebarCollapsed={isSidebarCollapsed}
          onCreatePrompt={() => setIsCreateModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="pt-20 px-4 sm:px-6 pb-6 min-h-screen">
          {/* Search and Filters */}
          <ScrollAnimatedSection>
            <motion.div
              className="space-y-6 mb-8"
              variants={variants.fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              style={{ willChange: performance.willChange.opacity }}
            >
              {/* Filter Chips */}
              <motion.div
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                style={{ willChange: performance.willChange.transform }}
              >
                <FilterChips
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearTags={handleClearTags}
                />
              </motion.div>
            </motion.div>
          </ScrollAnimatedSection>

          {/* Results Summary */}
          <ScrollAnimatedSection>
            <motion.div
              className="mb-6"
              variants={variants.fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              style={{ willChange: performance.willChange.opacity }}
            >
              <motion.p
                className="text-sm text-muted-foreground"
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                style={{ willChange: performance.willChange.transform }}
              >
                Showing {filteredPrompts.length} of {prompts.length} prompts
              </motion.p>
            </motion.div>
          </ScrollAnimatedSection>

          {/* Prompt Grid */}
          <ScrollAnimatedSection>
            <AnimatePresence mode="wait">
              {filteredPrompts.length > 0 ? (
                <motion.div
                  key="prompt-grid"
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                    willChange: performance.willChange.layout
                  }}
                  variants={variants.fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={animations.tween.medium}
                  layout
                >
                  <AnimatePresence>
                    {filteredPrompts.map((prompt, index) => (
                      <motion.div
                        key={prompt.id}
                        layout
                        variants={variants.listItem}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{
                          ...animations.spring.responsive,
                          delay: animationUtils.createStaggerDelay(index, 0.015, 0.3),
                          layout: animations.layout.smooth
                        }}
                        style={{
                          willChange: performance.willChange.layout,
                        }}
                      >
                        <ScrollAnimatedCard 
                          prompt={prompt} 
                          onOpen={handleOpenPrompt} 
                          index={index}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  className="text-center py-12"
                  variants={variants.fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={animations.tween.medium}
                  style={{ willChange: performance.willChange.opacity }}
                >
                  {/* Logo with cute animation */}
                  <motion.div
                    className="w-96 h-80 mx-auto mb-10"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <img
                      src="/Playful Food Brand Logo with Poptart Emblem.svg"
                      alt="PromptArt Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  <motion.h3
                    className="text-xl font-medium text-foreground mb-3"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    No prompts found! 🍰
                  </motion.h3>
                  
                  <motion.p
                    className="text-muted-foreground mb-6 text-lg"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    Looks like your prompt pantry is empty! Time to bake some fresh ideas! ✨
                  </motion.p>
                  
                  <motion.div
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 font-medium text-base"
                    >
                      <span>🍰 Bake Your First Prompt</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollAnimatedSection>
        </main>
      </div>

      {/* Side Panel */}
      <SidePanel
        prompt={selectedPrompt}
        isOpen={!!selectedPrompt}
        onClose={handleClosePrompt}
      />

      {/* Create Prompt Modal */}
      <CreatePromptModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePrompt}
      />

      {/* Toaster */}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
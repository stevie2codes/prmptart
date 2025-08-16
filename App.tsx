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

function AppContent() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('research');

  // Filter prompts based on search, category, and filters
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchQuery === "" || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = true; // Temporarily show all prompts
      
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
        />

        {/* Main Content Area */}
        <main className="pt-20 px-4 sm:px-6 pb-6 min-h-screen">
          {/* Search and Filters */}
          <motion.div
            className="space-y-6 mb-8"
            variants={variants.fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            style={{ willChange: performance.willChange.opacity }}
          >
            {/* Search Bar */}
            <motion.div
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              style={{ willChange: performance.willChange.transform }}
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search prompts by title, content, or tags..."
              />
            </motion.div>

            {/* Filter Chips */}
            <motion.div
              variants={variants.slideIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              style={{ willChange: performance.willChange.transform }}
            >
              <FilterChips
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                onClearTags={handleClearTags}
              />
            </motion.div>
          </motion.div>

          {/* Results Summary */}
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

          {/* Prompt Grid */}
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
                      <PromptCard prompt={prompt} onOpen={handleOpenPrompt} />
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
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <span className="text-2xl">🔍</span>
                </motion.div>
                <motion.h3
                  className="text-lg font-medium text-foreground mb-2"
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  No prompts found
                </motion.h3>
                <motion.p
                  className="text-muted-foreground mb-4"
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  Try adjusting your search terms or filters
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  >
                    <span>Create Your First Prompt</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimatedCard } from "./components/ScrollAnimatedCard";
import { ScrollAnimatedSection } from "./components/ScrollAnimatedSection";
import { TopBar } from "./components/TopBar";
import { NavigationSidebar } from "./components/NavigationSidebar";
import { MultiSelect } from "./components/MultiSelect";
import { CreatePromptModal } from "./components/CreatePromptModal";
import { SidePanel } from "./components/SidePanel";
import { mockPrompts, Prompt } from "./data/prompts";
import { variants } from "./src/lib/animations";
import { ThemeProvider } from "./components/ThemeProvider";
import { SoundProvider } from "./src/contexts/SoundContext";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { useSound } from "./src/contexts/SoundContext";
import { Heart } from "lucide-react";

function AppContent() {
  const { playSound } = useSound();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'design' | 'pm' | 'engineering' | null>('design');
  const [showFavorites, setShowFavorites] = useState(false);

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
      
      const matchesFavorites = !showFavorites || (() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.includes(prompt.id);
      })();
      
      return matchesSearch && matchesCategory && matchesPhase && matchesTags && matchesFavorites;
    });
  }, [prompts, searchQuery, selectedCategory, selectedPhase, selectedTags, showFavorites]);

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

  const handleFavoritesToggle = () => {
    playSound('FILTER_SELECT');
    setShowFavorites(prev => !prev);
    // Clear other filters when showing favorites
    if (!showFavorites) {
      setSelectedCategory(null);
      setSelectedPhase(null);
      setSelectedTags([]);
    }
  };

  const handleCategorySelect = (category: 'design' | 'pm' | 'engineering') => {
    playSound('FILTER_SELECT');
    // If switching from favorites, turn off favorites mode
    if (showFavorites) {
      setShowFavorites(false);
    }
    // Toggle category selection
    setSelectedCategory(prev => prev === category ? null : category);
    // Clear phase when changing category
    setSelectedPhase(null);
  };

  const handlePhaseSelect = (phase: string) => {
    playSound('FILTER_SELECT');
    // If switching from favorites, turn off favorites mode
    if (showFavorites) {
      setShowFavorites(false);
    }
    // Toggle phase selection
    setSelectedPhase(prev => prev === phase ? null : phase);
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
            radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 198, 255, 0.12) 0%, transparent 50%)
          `
        }}
      />

      {/* Top Bar - Fixed at top */}
      <TopBar
        isSidebarCollapsed={isSidebarCollapsed}
        onCreatePrompt={() => setIsCreateModalOpen(true)}
      />

      {/* Navigation Sidebar */}
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        selectedPhase={selectedPhase}
        onPhaseSelect={handlePhaseSelect}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        showFavorites={showFavorites}
        onFavoritesToggle={handleFavoritesToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div 
        className="transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: isSidebarCollapsed ? '72px' : '320px',
          minHeight: '100vh',
          width: '100vw',
          maxWidth: '100vw',
          position: 'relative',
          contain: 'layout style paint', // CSS containment for better performance
          willChange: 'auto' // Only change when needed
        }}
      >
        {/* Main Content Area */}
        <main className="pt-24 px-4 sm:px-6 pb-6 min-h-screen">
          {/* Page Header */}
          <ScrollAnimatedSection>
            <div className="mb-8">
              <motion.h1 
                className="text-4xl font-medium text-foreground mb-2"
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                style={{ willChange: "transform" }}
              >
                {showFavorites 
                  ? 'Favorite Prompts' 
                  : selectedCategory 
                    ? `${selectedCategory === 'design' ? 'Design' : selectedCategory === 'pm' ? 'PM' : 'Engineering'} Prompts`
                    : 'Prompt Library'
                }
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground"
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                style={{ willChange: "transform" }}
              >
                {showFavorites 
                  ? 'Your saved and favorite prompts ✨' 
                  : selectedCategory
                    ? `Browse ${selectedCategory === 'design' ? 'design' : selectedCategory === 'pm' ? 'product management' : 'engineering'} prompts and workflows`
                    : 'Discover and organize your AI prompts for better workflows'
                }
              </motion.p>
            </div>
          </ScrollAnimatedSection>

          {/* Search and Filters */}
          {!showFavorites && (
            <div className="space-y-6 mb-8">
              {/* Tag Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-foreground">Filter by Tags</h3>
                  <span className="text-xs text-muted-foreground">
                    ({mockPrompts.flatMap(prompt => prompt.tags).filter((tag, index, self) => self.indexOf(tag) === index).length} available)
                  </span>
                </div>
                <MultiSelect
                  options={(() => {
                    const allTags = mockPrompts.flatMap(prompt => prompt.tags);
                    const tagCounts = allTags.reduce((acc, tag) => {
                      acc[tag] = (acc[tag] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    
                    return Object.entries(tagCounts)
                      .sort(([, a], [, b]) => b - a)
                      .map(([tag, count]) => ({
                        value: tag,
                        label: tag,
                        count
                      }));
                  })()}
                  selectedValues={selectedTags}
                  onSelectionChange={setSelectedTags}
                  placeholder="Select tags to filter..."
                  className="max-w-md"
                />
              </div>
            </div>
          )}

          {/* Results Summary */}
          <ScrollAnimatedSection>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {showFavorites ? (
                  <>
                    Showing {filteredPrompts.length} favorite prompts
                    <span className="ml-2 text-xs text-muted-foreground/70">
                      ({JSON.parse(localStorage.getItem('favorites') || '[]').length} total favorites)
                    </span>
                  </>
                ) : (
                  `Showing ${filteredPrompts.length} of ${prompts.length} prompts`
                )}
              </p>
              {showFavorites && filteredPrompts.length === 0 && (
                <div className="mt-4 p-6 text-center bg-muted/30 rounded-xl border border-border/30">
                  <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No favorites yet</h3>
                  <p className="text-sm text-muted-foreground/70">
                    Start adding prompts to your favorites by clicking the heart icon on any prompt card.
                  </p>
                </div>
              )}
            </div>
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
                    willChange: "layout"
                  }}
                  variants={variants.fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {filteredPrompts.map((prompt, index) => (
                    <div key={prompt.id}>
                      <ScrollAnimatedCard 
                        prompt={prompt} 
                        onOpen={handleOpenPrompt} 
                        index={index}
                      />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  className="text-center py-12"
                  variants={variants.fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ willChange: "opacity" }}
                >
                  {/* Logo with cute animation */}
                  <motion.div
                    className="w-96 h-80 mx-auto mb-10"
                    animate={{ 
                      scale: [1, 1.02, 1], // Reduced scale change for better performance
                      rotate: [0, 1, -1, 0] // Reduced rotation for better performance
                    }}
                    transition={{ 
                      duration: 4, // Increased duration for smoother animation
                      repeat: Infinity,
                      repeatDelay: 3 // Increased delay between repeats
                    }}
                    style={{ willChange: "transform" }}
                  >
                    <img
                      src="/newlogo.svg"
                      alt="PromptArt Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  <motion.h3
                    className="text-xl font-medium text-foreground mb-3"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1, duration: 0.3 }}
                    style={{ willChange: "transform" }}
                  >
                    No prompts found! 🍰
                  </motion.h3>
                  
                  <motion.p
                    className="text-muted-foreground mb-6 text-lg"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2, duration: 0.3 }}
                    style={{ willChange: "transform" }}
                  >
                    Looks like your prompt pantry is empty! Time to bake some fresh ideas! ✨
                  </motion.p>
                  
                  <motion.div
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.3 }}
                    style={{ willChange: "transform" }}
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
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ThemeProvider>
  );
}
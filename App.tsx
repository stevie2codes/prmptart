import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimatedCard } from "./components/ScrollAnimatedCard";
import { ScrollAnimatedSection } from "./components/ScrollAnimatedSection";

import { NavigationSidebar } from "./components/NavigationSidebar";
import { SearchBar } from "./components/SearchBar";
import { CreatePromptModal } from "./components/CreatePromptModal";
import { SidePanel } from "./components/SidePanel";
import { SoundControl } from "./components/SoundControl";
import { ThemeToggle } from "./components/ThemeToggle";
import { mockPrompts, Prompt } from "./data/prompts";
import { variants } from "./src/lib/animations";
import { ThemeProvider } from "./components/ThemeProvider";
import { SoundProvider } from "./src/contexts/SoundContext";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { useSound } from "./src/contexts/SoundContext";


function AppContent() {
  const { playSound } = useSound();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'research' | 'ideation' | 'flows' | 'prototyping' | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMyPrompts, setShowMyPrompts] = useState(false);

  // Filter prompts based on search, category, and filters
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchQuery === "" || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;
      
      const matchesPhase =
        selectedPhase === null ||
        prompt.subcategory === selectedPhase ||
        prompt.phase === selectedPhase;
      

      
      const matchesFavorites = !showFavorites || (() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.includes(prompt.id);
      })();
      
      const matchesMyPrompts = !showMyPrompts || prompt.isUserCreated;
      
      return matchesSearch && matchesCategory && matchesPhase && matchesFavorites && matchesMyPrompts;
    });
      }, [prompts, searchQuery, selectedCategory, selectedPhase, showFavorites, showMyPrompts]);

  const handleOpenPrompt = (prompt: Prompt) => {
    console.log('Opening prompt:', prompt);
    setSelectedPrompt(prompt);
  };

  const handleClosePrompt = () => {
    setSelectedPrompt(null);
  };

  const handleCreatePrompt = (newPrompt: any) => {
    try {
      // Mark the prompt as user-created and add missing required fields
      const userPrompt = {
        ...newPrompt,
        isUserCreated: true,
        tags: [], // Empty tags array
      };
      
      console.log('Creating new prompt:', userPrompt); // Debug log
      
      setPrompts(prev => [userPrompt, ...prev]);
      
      toast.success("Prompt created successfully!", {
        description: "Your new prompt has been added to the library.",
        duration: 4000,
      });
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast.error("Failed to create prompt", {
        description: "There was an error creating your prompt. Please try again.",
        duration: 4000,
      });
    }
  };

  const handleFavoritesToggle = () => {
    setShowFavorites(prev => !prev);
    // Clear other filters when showing favorites
    if (!showFavorites) {
      setSelectedCategory(null);
      setSelectedPhase(null);
    }
    // Clear my prompts when switching to favorites
    setShowMyPrompts(false);
  };

  const handleMyPromptsToggle = () => {
    setShowMyPrompts(prev => !prev);
    // Clear other filters when showing my prompts
    if (!showMyPrompts) {
      setSelectedCategory(null);
      setSelectedPhase(null);
    }
    // Clear favorites when switching to my prompts
    setShowFavorites(false);
  };

  const handleCategorySelect = (category: 'research' | 'ideation' | 'flows' | 'prototyping') => {
    // If switching from favorites or my prompts, turn them off
    if (showFavorites) {
      setShowFavorites(false);
    }
    if (showMyPrompts) {
      setShowMyPrompts(false);
    }
    // Toggle category selection
    setSelectedCategory(prev => prev === category ? null : category);
    // Clear phase when changing category
    setSelectedPhase(null);
  };

  const handlePhaseSelect = (phase: string) => {
    // If switching from favorites or my prompts, turn them off
    if (showFavorites) {
      setShowFavorites(false);
    }
    if (showMyPrompts) {
      setShowMyPrompts(false);
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
        showMyPrompts={showMyPrompts}
        onMyPromptsToggle={handleMyPromptsToggle}
        prompts={prompts}
        onCreatePrompt={() => setIsCreateModalOpen(true)}
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
        <main className="pt-8 px-4 sm:px-6 pb-6 min-h-screen">
          {/* Page Header */}
          <ScrollAnimatedSection>
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                                <motion.h1 
                className="text-4xl font-medium text-foreground mb-2 font-syne"
                variants={variants.slideIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                style={{ willChange: "transform" }}
              >
                {showFavorites 
                  ? 'Favorite Prompts' 
                  : showMyPrompts
                    ? 'My Prompts'
                    : selectedCategory 
                      ? (
                        <div className="flex items-center gap-3">
                          <span>Prompt Pantry</span>
                          <span className="text-2xl text-muted-foreground/50">/</span>
                          <span>{selectedCategory === 'research' ? 'Research' : selectedCategory === 'ideation' ? 'Ideation' : selectedCategory === 'flows' ? 'User Flows & IA' : 'Prototyping & Design'}</span>
                        </div>
                      )
                      : 'Prompt Pantry'
                }
              </motion.h1>
              
              {/* Breadcrumb Navigation */}
              {selectedCategory && (
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.15 }}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedPhase(null);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
                  >
                    Prompt Pantry
                  </button>
                  <span className="text-sm text-muted-foreground/50">/</span>
                  <span className="text-sm text-foreground">
                    {selectedCategory === 'research' ? 'Research' : selectedCategory === 'ideation' ? 'Ideation' : selectedCategory === 'flows' ? 'User Flows & IA' : 'Prototyping & Design'}
                  </span>
                </motion.div>
              )}
              
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
                  : showMyPrompts
                    ? 'Prompts you\'ve created and customized 🎨'
                    : selectedCategory
                      ? selectedCategory === 'research' ? 'Browse research prompts and workflows' : selectedCategory === 'ideation' ? 'Explore ideation and concept development prompts' : selectedCategory === 'flows' ? 'Design user flows and information architecture' : 'Create wireframes and high fidelity designs'
                      : 'AI prompts built for designers to enhance daily workflows'
                }
              </motion.p>
                </div>
                
                {/* Controls - Top Right */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <SoundControl />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </ScrollAnimatedSection>

          {/* Search and Filters */}
          {!showFavorites && !showMyPrompts && (
            <ScrollAnimatedSection>
              <div className="mb-8">
                                   <div className="flex items-end gap-4 mb-4">
                     {/* Search Bar */}
                     <div className="w-2/4 min-w-80 flex-shrink-0">
                       <SearchBar
                         value={searchQuery}
                         onChange={setSearchQuery}
                         placeholder="Search prompts..."
                       />
                     </div>
                   </div>
                
                                   {/* Separator Line */}
                   <div className="border-b border-border/30 pb-6"></div>
                 </div>
               </ScrollAnimatedSection>
             )}

          {/* Results Summary */}
          <ScrollAnimatedSection>
            <div className="mb-6">
              <p className="text-sm text-foreground">
                {showFavorites ? (
                  <>
                    Showing {filteredPrompts.length} favorite prompts
                    <span className="ml-2 text-xs text-foreground/70">
                      ({JSON.parse(localStorage.getItem('favorites') || '[]').length} total favorites)
                    </span>
                  </>
                ) : showMyPrompts ? (
                  <>
                    Showing {filteredPrompts.length} of your created prompts
                                         <span className="ml-2 text-xs text-muted-foreground/70">
                       ({prompts.filter(p => p.isUserCreated).length} total created)
                     </span>
                  </>
                ) : (
                  `Showing ${filteredPrompts.length} of ${prompts.length} prompts`
                )}
              </p>

            </div>
          </ScrollAnimatedSection>

          {/* Prompt Grid */}
          <div>
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
                    className="w-60 h-60 mx-auto mb-0"
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
                    className="text-xl font-medium text-foreground mb-3 font-syne"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1, duration: 0.3 }}
                    style={{ willChange: "transform" }}
                  >
                    {showMyPrompts ? 'No prompts created yet! 🎨' : 'No prompts found! 🍰'}
                  </motion.h3>
                  
                  <motion.p
                    className="text-muted-foreground mb-6 text-lg"
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2, duration: 0.3 }}
                    style={{ willChange: "transform" }}
                  >
                    {showMyPrompts 
                      ? 'Start creating your own prompts to build your personal library! ✨'
                      : 'Looks like your prompt pantry is empty! Time to bake some fresh ideas! ✨'
                    }
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
          </div>
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
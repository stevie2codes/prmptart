import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Users, Code, Plus, X, ChevronDown, Heart, PanelLeft, BookOpen } from "lucide-react";

import { useSound } from "../src/contexts/SoundContext";



interface NavigationSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedPhase: string | null;
  onPhaseSelect: (phase: string) => void;
  selectedCategory: 'research' | 'ideation' | 'flows' | 'prototyping' | null;
  onCategorySelect: (category: 'research' | 'ideation' | 'flows' | 'prototyping') => void;
  showFavorites: boolean;
  onFavoritesToggle: () => void;
  showMyPrompts: boolean;
  onMyPromptsToggle: () => void;
  prompts: any[];
  onCreatePrompt: () => void;
}

export function NavigationSidebar({ 
  isCollapsed, 
  onToggle, 
  selectedPhase, 
  onPhaseSelect, 
  selectedCategory,
  onCategorySelect,
  showFavorites,
  onFavoritesToggle,
  showMyPrompts,
  onMyPromptsToggle,
  prompts,
  onCreatePrompt
}: NavigationSidebarProps) {
  const { playSound } = useSound();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleToggle = () => {
    playSound('SIDEBAR_TOGGLE');
    onToggle();
  };

  const handleCategorySelect = (category: 'research' | 'ideation' | 'flows' | 'prototyping') => {
    playSound('MOUSE_CLICK');
    onCategorySelect(category);
  };

  const categories = [
    {
      id: 'research' as const,
      label: 'Research & Discovery',
      icon: Users,
      color: 'purple' as const,
      subcategories: [
        { 
          id: 'discovery', 
          title: 'Discovery', 
          color: 'blue' as const,
          prompts: ['Generative Interview Script', 'Competitive Analysis', 'Simulated Usability Interview', 'Stakeholder Interview Guide', 'Mock Usability Test Plan']
        },
        { 
          id: 'synthesis', 
          title: 'Synthesis', 
          color: 'green' as const,
          prompts: ['Surface User Frustrations', 'Cluster Messy Notes', 'From Patterns to Insights', 'User Journey Mapping', 'Thematic Trend Spotting']
        },
        { 
          id: 'storytelling', 
          title: 'Storytelling', 
          color: 'orange' as const,
          prompts: ['Reframe into Design Opportunities', 'Audience-Specific Insight Storytelling', 'Evidence Matrix Creation']
        },
        { 
          id: 'validation', 
          title: 'Validation', 
          color: 'pink' as const,
          prompts: ['Survey Generator', 'Persona Hypothesis Builder']
        }
      ]
    },
          {
        id: 'ideation' as const,
        label: 'Ideation',
        icon: Palette,
        color: 'blue' as const,
        subcategories: [
          { 
            id: 'brainstorming', 
            title: 'Brainstorming', 
            color: 'green' as const,
            prompts: ['Concept Sketch Prompts', 'Crazy 8s Expansion', 'Blue Sky Exploration']
          },
          { 
            id: 'opportunity-framing', 
            title: 'Opportunity Framing', 
            color: 'orange' as const,
            prompts: ['How Might We Generator', 'Constraint-Driven Ideation']
          },
          { 
            id: 'concept-development', 
            title: 'Concept Development', 
            color: 'purple' as const,
            prompts: ['Concept Sketch Prompts', 'Idea Remix Generator']
          },
          { 
            id: 'prioritization', 
            title: 'Prioritization', 
            color: 'cyan' as const,
            prompts: ['Impact/Effort Matrix', 'Dot Voting Simulation']
          }
        ]
      },
      {
        id: 'flows' as const,
        label: 'User Flows & IA',
        icon: Code,
        color: 'green' as const,
        subcategories: [
          { 
            id: 'navigation-ia', 
            title: 'Navigation & IA', 
            color: 'blue' as const,
            prompts: ['Information Architecture', 'Navigation Mapping', 'Wayfinding Scenarios']
          },
          { 
            id: 'task-flows', 
            title: 'Task Flows', 
            color: 'orange' as const,
            prompts: ['Task Flow Generator', 'Edge Case Flow Mapping', 'Alternate Pathways Exploration', 'User Flow Setup']
          },
          { 
            id: 'content-hierarchy', 
            title: 'Content Hierarchy', 
            color: 'purple' as const,
            prompts: ['Content Priority Mapping', 'Hierarchy Audit', 'Card Sorting Simulation']
          }
        ]
      },
      {
        id: 'prototyping' as const,
        label: 'Prototyping & Design',
        icon: Palette,
        color: 'purple' as const,
        subcategories: [
          { 
            id: 'wireframing', 
            title: 'Wireframing', 
            color: 'blue' as const,
            prompts: ['Wireframe Layout Generator', 'Screen Comparison Variants', 'Content-to-Wireframe Mapping']
          },
          { 
            id: 'high-fidelity-design', 
            title: 'High Fidelity Design', 
            color: 'orange' as const,
            prompts: ['UI Exploration Prompts', 'Design System Application', 'Accessibility-Focused Redesign']
          },
          { 
            id: 'design-crit', 
            title: 'Design Crit', 
            color: 'cyan' as const,
            prompts: ['Screenshot Usability Review', 'Before/After Comparison Crit', 'Accessibility Audit Crit', 'Design System Consistency Check', 'Content Clarity Crit', 'First Impression Crit']
          }
        ]
      }
  ];



  const getPhaseColorClasses = (color: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan', isSelected: boolean) => {
    const colors = {
      blue: isSelected 
        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700' 
        : 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:text-blue-700 dark:hover:text-blue-300',
      purple: isSelected 
        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-blue-700' 
        : 'hover:bg-purple-50/50 dark:hover:bg-purple-900/10 hover:text-purple-700 dark:hover:text-purple-300',
      green: isSelected 
        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' 
        : 'hover:bg-green-50/50 dark:hover:bg-green-900/10 hover:text-green-700 dark:hover:text-green-300',
      orange: isSelected 
        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700' 
        : 'hover:bg-orange-50/50 dark:hover:bg-orange-900/10 hover:text-orange-700 dark:hover:text-orange-300',
      pink: isSelected 
        ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700' 
        : 'hover:bg-pink-50/50 dark:hover:bg-pink-900/10 hover:text-pink-700 dark:hover:text-pink-300',
      cyan: isSelected 
        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700' 
        : 'hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 hover:text-cyan-700 dark:hover:text-cyan-300',
    };
    return colors[color] || 'hover:bg-muted/50';
  };



  return (
    <motion.aside
      className="fixed left-0 top-0 z-30 h-full bg-sidebar/80 dark:bg-sidebar/60 backdrop-blur-xl border-r border-sidebar-border/30 shadow-lg"
      initial={false}
      animate={{ width: isCollapsed ? 72 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div 
          className={`${isCollapsed ? 'flex flex-col items-center p-4' : 'flex items-center justify-between p-6'}`}
          // Account for top bar
          layout
        >
          {/* Logo and Title */}
          <motion.div
            className={`flex items-center gap-2 ${isCollapsed ? 'cursor-pointer mb-4 relative' : ''}`}
            onClick={isCollapsed ? handleToggle : undefined}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            whileHover={isCollapsed ? { scale: 1.05 } : {}}
            whileTap={isCollapsed ? { scale: 0.95 } : {}}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {isCollapsed ? (
                  isLogoHovered ? (
                    <motion.div
                      key="panel-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="h-12 w-12 flex items-center justify-center bg-sidebar-accent/50 rounded-lg border border-sidebar-border/30"
                    >
                      <PanelLeft className="h-5 w-5 text-sidebar-foreground" />
                    </motion.div>
                  ) : (
                    <motion.img
                      key="logo"
                      src="/newlogo.svg"
                      alt="Prompt Pantry"
                      className="h-12 w-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    />
                  )
                ) : (
                  <img src="/newlogo.svg" alt="Prompt Pantry" className="h-12 w-12" />
                )}
              </AnimatePresence>
              
              {/* Tooltip */}
              <AnimatePresence>
                {isCollapsed && isLogoHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-16 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                  >
                    Open sidebar
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <h1 
                className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0 font-syne"
                style={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                prmptart
              </h1>
              )}
            </AnimatePresence>
          </motion.div>


          
          {/* Toggle Button - Only visible when expanded */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={handleToggle}
                className="h-12 w-12 p-0 hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground rounded-xl flex items-center justify-center"
              >
                <PanelLeft className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Create New Button */}
        <div className="px-4 pb-4">
          <motion.button
            onClick={() => {
              if (isCollapsed) {
                onToggle(); // Expand sidebar first
              }
              playSound('BUTTON_SOFT_DOUBLE');
              onCreatePrompt();
            }}
            className={`${isCollapsed ? 'w-12 h-12 p-0' : 'w-auto px-4 py-3'} text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground rounded-xl transition-all duration-200 font-medium text-base border border-transparent`}
            style={{
              height: isCollapsed ? '48px' : '48px',
              minHeight: '48px'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            <motion.div 
              className="flex items-center justify-center gap-3"
              layout
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Plus className="h-4 w-4 text-white" />
              </div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Create new prompt
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4 pb-6 space-y-2">
            {/* Categories */}
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const hasSubcategories = category.subcategories && category.subcategories.length > 0;
              
              return (
                <div key={category.id} className="space-y-1">
                  <motion.button
                    onClick={() => {
                      if (isCollapsed) {
                        onToggle(); // Expand sidebar first
                      }
                      handleCategorySelect(category.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 font-medium text-base border border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground relative`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <Icon className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : ''}`} />
                        
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {category.label}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                          </div>
                        )}
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between flex-1"
                          >
                            <span>{category.label}</span>
                            {hasSubcategories && (
                              <motion.div
                                animate={{ rotate: isSelected ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>

                  {/* Subcategories submenu for selected category */}
                  <AnimatePresence>
                    {!isCollapsed && isSelected && hasSubcategories && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-7 space-y-1"
                      >
                        {category.subcategories.map((subcategory, index) => (
                          <motion.button
                            key={subcategory.id}
                            onClick={() => {
                              if (isCollapsed) {
                                onToggle(); // Expand sidebar first
                              }
                              onPhaseSelect(subcategory.id);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-sm text-s border ${
                              selectedPhase === subcategory.id 
                                ? `border ${getPhaseColorClasses(subcategory.color, true)}`
                                : `border-transparent text-sidebar-foreground/60 ${getPhaseColorClasses(subcategory.color, false)}`
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                                selectedPhase === subcategory.id 
                                  ? `bg-${subcategory.color}-500` 
                                  : 'bg-sidebar-foreground/30'
                              }`}></div>
                              <span>{subcategory.title}</span>
                            </div>
                          </motion.button>
                        ))}
                        
                        {/* Clear Selection Option */}
                        {selectedPhase && (
                          <motion.button
                            onClick={() => {
                              if (isCollapsed) {
                                onToggle(); // Expand sidebar first
                              }
                              onPhaseSelect(selectedPhase);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-xs border border-transparent text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground mt-2 border-t border-sidebar-border/20 pt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <X className="h-3 w-3" />
                              <span>Clear Phase</span>
                            </div>
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Coming Soon for categories without phases */}
                  <AnimatePresence>
                                            {!isCollapsed && isSelected && !hasSubcategories && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-7 px-3 py-4 text-xs text-sidebar-foreground/50 bg-sidebar-accent/20 rounded-lg border border-sidebar-border/20"
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="h-3 w-3" />
                          <span>Coming Soon</span>
                        </div>
                        <p className="mt-1 text-[10px] leading-relaxed">
                          {category.label} will be available in a future update.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Divider */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="my-4 border-t border-sidebar-border/30"
                />
              )}
            </AnimatePresence>

            {/* Favorites Section */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2"
                >
                  <span className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider font-syne">
                    Personal
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={() => {
                if (isCollapsed) {
                  onToggle(); // Expand sidebar first
                }
                onFavoritesToggle();
              }}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 font-medium text-sm border border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground relative ${
                showFavorites ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Heart className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : ''}`} />
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Favorites
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                    </div>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span>Favorites</span>
                        {(() => {
                          try {
                            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                            return favorites.length > 0 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full">
                                {favorites.length}
                              </span>
                            ) : null;
                          } catch {
                            return null;
                          }
                        })()}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* My Prompts Button */}
            <motion.button
              onClick={() => {
                if (isCollapsed) {
                  onToggle(); // Expand sidebar first
                }
                onMyPromptsToggle();
              }}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 font-medium text-sm border border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground relative ${
                showMyPrompts ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <BookOpen className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : ''}`} />
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      My Prompts
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                    </div>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span>My Prompts</span>
                        {(() => {
                          try {
                            const myPrompts = prompts.filter(prompt => (prompt as any).isUserCreated);
                            return myPrompts.length > 0 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full">
                                {myPrompts.length}
                              </span>
                            ) : null;
                          } catch {
                            return null;
                          }
                        })()}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="p-4 border-t border-sidebar-border/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xs text-sidebar-foreground/50 space-y-1">
                <p>Copyright prmptart 2025.</p>
                <p>Version 1.0</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
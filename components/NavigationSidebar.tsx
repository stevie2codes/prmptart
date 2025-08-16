import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Palette, Users, Code, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedPhase: string | null;
  onPhaseSelect: (phase: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export function NavigationSidebar({ 
  isCollapsed, 
  onToggle, 
  selectedPhase, 
  onPhaseSelect, 
  selectedCategory, 
  onCategorySelect 
}: NavigationSidebarProps) {
  const categories = [
    {
      id: 'design',
      label: 'Design Prompts',
      icon: Palette,
      color: 'blue',
      phases: [
        { id: 'Research', label: 'Research & Discovery', color: 'blue' },
        { id: 'IA', label: 'User Flows & IA', color: 'purple' },
        { id: 'Ideation', label: 'Ideation & Concept Development', color: 'green' },
        { id: 'Prototyping', label: 'Prototyping & Testing', color: 'orange' },
        { id: 'Stakeholder', label: 'Stakeholder & PM Conversations', color: 'pink' },
        { id: 'Dev Handoff', label: 'Developer Handoff & QA', color: 'cyan' }
      ]
    },
    {
      id: 'pm',
      label: 'PM Prompts',
      icon: Users,
      color: 'purple',
      phases: [] // Future implementation
    },
    {
      id: 'engineering',
      label: 'Engineering Prompts',
      icon: Code,
      color: 'green',
      phases: [] // Future implementation
    }
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  const getPhaseColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: isSelected 
        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700' 
        : 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:text-blue-700 dark:hover:text-blue-300',
      purple: isSelected 
        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700' 
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

  const getCategoryColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: isSelected 
        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700' 
        : 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:text-blue-700 dark:hover:text-blue-300',
      purple: isSelected 
        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700' 
        : 'hover:bg-purple-50/50 dark:hover:bg-purple-900/10 hover:text-purple-700 dark:hover:text-purple-300',
      green: isSelected 
        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' 
        : 'hover:bg-green-50/50 dark:hover:bg-green-900/10 hover:text-green-700 dark:hover:text-green-300',
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
          className="flex items-center justify-between p-6 border-b border-sidebar-border/30"
          // Account for top bar
          layout
        >
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-medium text-sidebar-foreground">
                  Prompt Library
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground rounded-xl"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4 space-y-2">
            {/* Categories */}
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const hasPhases = category.phases.length > 0;
              
              return (
                <div key={category.id} className="space-y-1">
                  <motion.button
                    onClick={() => onCategorySelect(category.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 font-medium text-sm border ${
                      isSelected 
                        ? `border ${getCategoryColorClasses(category.color, true)}`
                        : `border-transparent text-sidebar-foreground/70 ${getCategoryColorClasses(category.color, false)}`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : ''}`} />
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
                            {hasPhases && isSelected && selectedPhase && (
                              <motion.div
                                className="w-2 h-2 rounded-full bg-current"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>

                  {/* Phase submenu for selected category */}
                  <AnimatePresence>
                    {!isCollapsed && isSelected && hasPhases && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-7 space-y-1 overflow-hidden"
                      >
                        {category.phases.map((phase, index) => (
                          <motion.button
                            key={phase.id}
                            onClick={() => onPhaseSelect(phase.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-s border ${
                              selectedPhase === phase.id 
                                ? `border ${getPhaseColorClasses(phase.color, true)}`
                                : `border-transparent text-sidebar-foreground/60 ${getPhaseColorClasses(phase.color, false)}`
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                                selectedPhase === phase.id 
                                  ? `bg-${phase.color}-500` 
                                  : 'bg-sidebar-foreground/30'
                              }`}></div>
                              <span>{phase.label}</span>
                            </div>
                          </motion.button>
                        ))}
                        
                        {/* Clear Selection Option */}
                        {selectedPhase && (
                          <motion.button
                            onClick={() => onPhaseSelect('')}
                            className="w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-xs border border-transparent text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground mt-2 border-t border-sidebar-border/20 pt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-sidebar-foreground/30"></div>
                              <span>All Prompts</span>
                            </div>
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Coming Soon for categories without phases */}
                  <AnimatePresence>
                    {!isCollapsed && isSelected && !hasPhases && (
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
                <p>RTCCF-compliant prompts</p>
                <p>Version 1.0</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
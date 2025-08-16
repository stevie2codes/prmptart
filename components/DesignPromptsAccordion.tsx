import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface DesignPromptsAccordionProps {
  selectedPhase: string | null;
  onPhaseSelect: (phase: string) => void;
}

export function DesignPromptsAccordion({ selectedPhase, onPhaseSelect }: DesignPromptsAccordionProps) {
  const phases = [
    { id: 'Research', label: 'Research & Discovery', color: 'blue' },
    { id: 'IA', label: 'User Flows & IA', color: 'purple' },
    { id: 'Ideation', label: 'Ideation & Concept Development', color: 'green' },
    { id: 'Prototyping', label: 'Prototyping & Testing', color: 'orange' },
    { id: 'Stakeholder', label: 'Stakeholder & PM Conversations', color: 'pink' },
    { id: 'Dev Handoff', label: 'Developer Handoff & QA', color: 'cyan' }
  ];

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

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="design-prompts" className="border-none">
          <AccordionTrigger className="bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 px-6 py-4 hover:no-underline">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"></div>
              <span className="font-medium text-foreground" style={{ fontSize: '16px' }}>
                Design Prompts
              </span>
              {selectedPhase && (
                <motion.div
                  className="ml-auto px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {phases.find(p => p.id === selectedPhase)?.label}
                </motion.div>
              )}
            </motion.div>
          </AccordionTrigger>
          
          <AccordionContent className="pt-4 pb-2 px-0">
            <motion.div
              className="bg-card/60 dark:bg-card/40 backdrop-blur-lg border border-border/20 rounded-2xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="p-2 space-y-1">
                {phases.map((phase, index) => (
                  <motion.button
                    key={phase.id}
                    onClick={() => onPhaseSelect(phase.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm border ${
                      selectedPhase === phase.id 
                        ? `border ${getPhaseColorClasses(phase.color, true)}`
                        : `border-transparent text-muted-foreground ${getPhaseColorClasses(phase.color, false)}`
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + (index * 0.05) }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        selectedPhase === phase.id 
                          ? `bg-${phase.color}-500` 
                          : 'bg-muted-foreground/40'
                      }`}></div>
                      <span>{phase.label}</span>
                      {selectedPhase === phase.id && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full bg-current"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
                
                {/* Clear Selection Option */}
                {selectedPhase && (
                  <motion.button
                    onClick={() => onPhaseSelect('')}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm border border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground mt-2 border-t border-border/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></div>
                      <span>All Prompts</span>
                    </div>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
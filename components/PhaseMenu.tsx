import { useState } from "react";
import { 
  Search, 
  Network, 
  Lightbulb, 
  Play, 
  Users, 
  Code2,
  Sparkles,
  Menu,
  X,
  Home
} from "lucide-react";
import { phases } from "../data/prompts";

interface PhaseMenuProps {
  selectedPhase: string | null;
  onPhaseSelect: (phase: string) => void;
  onMenuStateChange?: (isOpen: boolean) => void;
}

export function PhaseMenu({ selectedPhase, onPhaseSelect, onMenuStateChange }: PhaseMenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuStateChange?.(newState);
  };

  const phaseConfig = {
    'Research': {
      icon: Search,
      label: 'Research & Discovery'
    },
    'IA': {
      icon: Network,
      label: 'User Flows & IA'
    },
    'Ideation': {
      icon: Lightbulb,
      label: 'Ideation & Concepts'
    },
    'Prototyping': {
      icon: Play,
      label: 'Prototyping & Testing'
    },
    'Stakeholder': {
      icon: Users,
      label: 'Stakeholder & PM'
    },
    'Dev Handoff': {
      icon: Code2,
      label: 'Dev Handoff & QA'
    }
  };

  const hasActiveSelection = selectedPhase !== null;

  return (
    <>
      {/* Backdrop blur overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-20 lg:hidden transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Menu */}
      <div 
        className={`fixed left-4 top-4 bottom-4 z-30 transition-all duration-500 ease-out ${
          isOpen ? 'w-80' : 'w-16'
        }`}
      >
        <div className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
          {/* Header */}
          <div className="relative" style={{ padding: '24px' }}>
            <div className="flex items-center justify-between">
              {isOpen && (
                <div className="flex items-center" style={{ gap: '12px' }}>
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Design Phases</h3>
                    {hasActiveSelection && (
                      <p className="text-xs text-muted-foreground">
                        Navigate between phases
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-700/50 dark:to-gray-800/50 backdrop-blur-sm hover:from-gray-200/60 hover:to-gray-300/60 dark:hover:from-gray-600/60 dark:hover:to-gray-700/60 transition-all duration-300 ${
                  !isOpen ? 'mx-auto' : ''
                }`}
              >
                {isOpen ? (
                  <X className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Menu className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto" style={{ padding: isOpen ? '0 24px 24px 24px' : '0 8px 24px 8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* All Prompts - Home navigation */}
              <button
                onClick={() => onPhaseSelect('')} // Empty string to clear selection
                className={`nav-item group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  selectedPhase === null
                    ? 'nav-item-selected' 
                    : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md hover:shadow-black/5'
                }`}
                style={{ 
                  padding: '12px 16px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* Liquid glass background for selected state */}
                {selectedPhase === null && (
                  <>
                    {/* Liquid glass base */}
                    <div className="absolute inset-0 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-2xl" />
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl" />
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl animate-gradient-flow-once" />
                    {/* Subtle highlight */}
                    <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-2xl" />
                  </>
                )}
                
                <div className={`relative flex items-center ${isOpen ? 'gap-2.5' : 'justify-center w-full'}`}>
                  <div className={`p-1.5 rounded-lg backdrop-blur-sm ${
                    selectedPhase === null
                      ? 'bg-white/40 dark:bg-white/20' 
                      : 'bg-white/40 dark:bg-gray-700/40'
                  }`}>
                    <Home className={`h-4 w-4 ${
                      selectedPhase === null
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-foreground'
                    }`} />
                  </div>
                  
                  {isOpen && (
                    <div className="flex-1 text-left">
                      <p className={`font-medium text-sm leading-tight ${
                        selectedPhase === null
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-foreground'
                      }`}>
                        All Prompts
                      </p>
                    </div>
                  )}
                  
                  {isOpen && selectedPhase === null && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-lg animate-pulse" />
                  )}
                </div>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-700/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
              </button>

              {/* Phase Navigation Items */}
              {phases.map((phase) => {
                const config = phaseConfig[phase];
                const Icon = config.icon;
                const isSelected = selectedPhase === phase;
                
                return (
                  <button
                    key={phase}
                    onClick={() => onPhaseSelect(phase)}
                    className={`nav-item group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                      isSelected 
                        ? 'nav-item-selected' 
                        : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md hover:shadow-black/5'
                    }`}
                    style={{ 
                      padding: '12px 16px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {/* Liquid glass background for selected state */}
                    {isSelected && (
                      <>
                        {/* Liquid glass base */}
                        <div className="absolute inset-0 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-2xl" />
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl" />
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl animate-gradient-flow-once" />
                        {/* Subtle highlight */}
                        <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-2xl" />
                      </>
                    )}
                    
                    <div className={`relative flex items-center ${isOpen ? 'gap-2.5' : 'justify-center w-full'}`}>
                      <div className={`p-1.5 rounded-lg backdrop-blur-sm ${
                        isSelected 
                          ? 'bg-white/40 dark:bg-white/20' 
                          : 'bg-white/40 dark:bg-gray-700/40'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          isSelected 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-foreground'
                        }`} />
                      </div>
                      
                      {isOpen && (
                        <div className="flex-1 text-left">
                          <p className={`font-medium text-sm leading-tight ${
                            isSelected 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-foreground'
                          }`}>
                            {config.label}
                          </p>
                        </div>
                      )}
                      
                      {isOpen && isSelected && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-lg animate-pulse" />
                      )}
                    </div>

                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-700/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer indicator - collapsed state */}
          {!isOpen && hasActiveSelection && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced CSS with single, subtle gradient flow animation and improved contrast */}
      <style>{`
        /* Single gradient flow animation for selected navigation items */
        @keyframes gradient-flow-once {
          0% {
            background-position: -200% 0;
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.2;
          }
        }
        
        .animate-gradient-flow-once {
          background-size: 200% 100%;
          animation: gradient-flow-once 1.2s ease-out;
          animation-fill-mode: forwards;
        }
        
        /* Enhanced selected state with liquid glass effects */
        .nav-item-selected {
          background: transparent !important;
          box-shadow: 0 8px 32px -8px rgba(59, 130, 246, 0.3), 0 4px 16px -4px rgba(147, 51, 234, 0.2);
        }
        
        /* Hover state enhancement */
        .nav-item:not(.nav-item-selected):hover {
          transform: translateY(-1px);
          transition: all 0.2s ease-out;
        }
        
        /* Focus states for accessibility */
        .nav-item:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-flow-once {
            animation: none;
            background: linear-gradient(90deg, 
              rgba(3, 2, 19, 0.15) 0%, 
              rgba(37, 99, 235, 0.15) 50%, 
              rgba(147, 51, 234, 0.15) 100%
            );
          }
          
          .nav-item:not(.nav-item-selected):hover {
            transform: none;
          }
        }
        
        /* Dark mode adjustments for gradient */
        .dark .animate-gradient-flow-once {
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 51, 234, 0.15) 35%,
            rgba(59, 130, 246, 0.15) 65%,
            rgba(147, 51, 234, 0.1) 100%
          ) !important;
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .nav-item-selected {
            box-shadow: 0 0 0 2px rgb(59, 130, 246) !important;
            background: rgba(59, 130, 246, 0.2) !important;
          }
          
          .nav-item-selected .animate-gradient-flow-once {
            background: rgba(59, 130, 246, 0.1) !important;
            animation: none !important;
          }
          
          .nav-item-selected * {
            color: rgb(59, 130, 246) !important;
          }
        }
        
        /* Liquid glass selected state colors */
        .nav-item-selected {
          color: rgb(37, 99, 235);
        }
        
        .dark .nav-item-selected {
          color: rgb(96, 165, 250);
        }
        
        /* Enhanced shadow for dark mode */
        .dark .nav-item-selected {
          box-shadow: 0 8px 32px -8px rgba(96, 165, 250, 0.4), 0 4px 16px -4px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </>
  );
}
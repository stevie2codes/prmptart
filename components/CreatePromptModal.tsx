import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X, Sparkles, Save, AlertCircle } from "lucide-react";
import { Prompt } from "../data/prompts";

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id'>) => void;
}

const phases = [
  { value: "Research", label: "Research & Discovery" },
  { value: "IA", label: "User Flows & IA" },
  { value: "Ideation", label: "Ideation & Concept Development" },
  { value: "Prototyping", label: "Prototyping & Testing" },
  { value: "Stakeholder", label: "Stakeholder & PM Conversations" },
  { value: "Dev Handoff", label: "Developer Handoff & QA" }
];

const impactBadges = [
  { value: "high", label: "🔥 High Impact", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  { value: "quick", label: "⚡ Quick Win", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { value: "setup", label: "⏱ 5-min Setup", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" }
];

const availableTags = [
  "Persona-based", "Quick Win", "Deep Dive", "Accessible Design", "Visual Output", 
  "Copywriting", "Competitive Analysis"
];

export function CreatePromptModal({ isOpen, onClose, onSave }: CreatePromptModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    phase: "",
    impact: "",
    summary: "",
    role: "You are ",
    task: "",
    context: "",
    constraints: "",
    format: "",
    tags: [] as string[],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.split(" ").length > 3) newErrors.title = "Title should be 2-3 words max";
    if (!formData.phase) newErrors.phase = "Phase is required";
    if (!formData.impact) newErrors.impact = "Impact badge is required";
    if (!formData.summary.trim()) newErrors.summary = "Summary is required";
    if (!formData.role.trim() || formData.role === "You are ") newErrors.role = "Role description is required";
    if (!formData.task.trim()) newErrors.task = "Task description is required";
    if (!formData.context.trim()) newErrors.context = "Context is required";
    if (!formData.constraints.trim()) newErrors.constraints = "Constraints are required";
    if (!formData.format.trim()) newErrors.format = "Format specification is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPrompt: Omit<Prompt, 'id'> = {
      title: formData.title,
      phase: formData.phase,
      impact: formData.impact as "high" | "quick" | "setup",
      summary: formData.summary,
      role: formData.role,
      task: formData.task,
      context: formData.context,
      constraints: formData.constraints,
      format: formData.format,
      tags: formData.tags,
    };
    
    onSave(newPrompt);
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      phase: "",
      impact: "",
      summary: "",
      role: "You are ",
      task: "",
      context: "",
      constraints: "",
      format: "",
      tags: [],
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const getImpactBadgeColor = (impact: string) => {
    return impactBadges.find(badge => badge.value === impact)?.color || "";
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div key="create-prompt-modal-instance" className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <div key="modal-container" className="fixed inset-0 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div
              key="modal-content"
              className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col"
              style={{ maxHeight: "calc(100vh - 32px)", minHeight: "400px" }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
            >
              {/* Header - Fixed */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-border/30 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <motion.div
                    key="header-icon"
                    className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div>
                    <motion.h2 
                      key="header-title"
                      className="text-xl font-medium text-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Create New Prompt
                    </motion.h2>
                    <motion.p 
                      key="header-subtitle"
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Build an RTCCF-compliant prompt for your design process
                    </motion.p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8 rounded-full hover:bg-muted/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6 scrollable-content">
                  {/* Basic Information */}
                  <motion.div 
                    key="basic-info-section"
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-medium text-foreground border-b border-border/20 pb-2">
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Research Synthesis"
                          className={`bg-input-background border-border/50 ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.title}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phase">Design Phase *</Label>
                        <Select value={formData.phase} onValueChange={(value) => setFormData(prev => ({ ...prev, phase: value }))}>
                          <SelectTrigger className={`bg-input-background border-border/50 ${errors.phase ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select phase" />
                          </SelectTrigger>
                          <SelectContent>
                            {phases.map((phase, index) => (
                              <SelectItem key={`phase-${index}-${phase.value}`} value={phase.value}>
                                {phase.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.phase && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phase}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Impact Badge *</Label>
                      <div className="flex gap-2">
                        {impactBadges.map((badge, index) => (
                          <button
                            key={`impact-${index}-${badge.value}`}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, impact: badge.value }))}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                              formData.impact === badge.value 
                                ? badge.color + " ring-2 ring-offset-2 ring-current"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {badge.label}
                          </button>
                        ))}
                      </div>
                      {errors.impact && (
                        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.impact}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Summary *</Label>
                      <Input
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Turns raw interview notes into patterns, insights, and HMWs."
                        className={`bg-input-background border-border/50 ${errors.summary ? 'border-red-500' : ''}`}
                      />
                      {errors.summary && (
                        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.summary}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* RTCCF Structure */}
                  <motion.div 
                    key="rtccf-section"
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-medium text-foreground border-b border-border/20 pb-2">
                      RTCCF Structure
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Textarea
                          id="role"
                          value={formData.role}
                          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                          placeholder="You are a senior UX researcher with expertise in qualitative analysis."
                          className={`bg-input-background border-border/50 min-h-[60px] resize-none ${errors.role ? 'border-red-500' : ''}`}
                        />
                        {errors.role && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.role}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="task">Task *</Label>
                        <Textarea
                          id="task"
                          value={formData.task}
                          onChange={(e) => setFormData(prev => ({ ...prev, task: e.target.value }))}
                          placeholder="Cluster qualitative interview notes into patterns and surface insights."
                          className={`bg-input-background border-border/50 min-h-[60px] resize-none ${errors.task ? 'border-red-500' : ''}`}
                        />
                        {errors.task && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.task}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="context">Context *</Label>
                        <Textarea
                          id="context"
                          value={formData.context}
                          onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                          placeholder="You have [X] user interview transcripts about [product/feature]. Include relevant background about the product and target audience."
                          className={`bg-input-background border-border/50 min-h-[80px] resize-none ${errors.context ? 'border-red-500' : ''}`}
                        />
                        {errors.context && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.context}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="constraints">Constraints *</Label>
                        <Textarea
                          id="constraints"
                          value={formData.constraints}
                          onChange={(e) => setFormData(prev => ({ ...prev, constraints: e.target.value }))}
                          placeholder="At least 3 patterns, each with 2+ verbatim quotes, link to HMW statements."
                          className={`bg-input-background border-border/50 min-h-[80px] resize-none ${errors.constraints ? 'border-red-500' : ''}`}
                        />
                        {errors.constraints && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.constraints}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="format">Format *</Label>
                        <Textarea
                          id="format"
                          value={formData.format}
                          onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                          placeholder="Table with columns: Pattern, Insight, Evidence, HMW"
                          className={`bg-input-background border-border/50 min-h-[60px] resize-none ${errors.format ? 'border-red-500' : ''}`}
                        />
                        {errors.format && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.format}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Tags */}
                  <motion.div 
                    key="tags-section"
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-medium text-foreground border-b border-border/20 pb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag, index) => (
                        <button
                          key={`tag-${index}-${tag}`}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                            formData.tags.includes(tag)
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-blue-500/50"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Footer - Fixed */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 md:p-6 border-t border-border/30 bg-muted/20 flex-shrink-0">
                  <p className="text-xs text-muted-foreground order-2 md:order-1 text-center md:text-left">
                    * Required fields
                  </p>
                  <div className="flex gap-3 order-1 md:order-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleClose}
                      className="flex-1 md:flex-none px-6"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 md:flex-none px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                    >
                      {isSubmitting ? (
                        <motion.div
                          key="loading-spinner"
                          className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Prompt
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Modal-specific styles */}
      <style>{`
        .scrollable-content {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }
        
        .scrollable-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollable-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        
        .dark .scrollable-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .dark .scrollable-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </AnimatePresence>
  );
}
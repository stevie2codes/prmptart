import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

import { variants, animations, performance } from "../src/lib/animations";
import { useSound } from "../src/contexts/SoundContext";

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: any) => void;
}

interface FormData {
  title: string;
  summary: string;
  role: string;
  task: string;
  context: string;
  constraints: string;
  format: string;
  phase: string;
  subcategory: string;
  category: string;
  content: string;
  exampleOutput: string;
}

export function CreatePromptModal({ isOpen, onClose, onSave }: CreatePromptModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    summary: "",
    role: "",
    task: "",
    context: "",
    constraints: "",
    format: "",
    phase: "Research",
    subcategory: "",
    category: "research",
    content: "",
    exampleOutput: ""
  });
  const [showExample, setShowExample] = useState(false);
  const { playSound } = useSound();

  // Play sound when modal opens
  useEffect(() => {
    if (isOpen) {
      playSound('MODAL_OPEN');
    }
  }, [isOpen, playSound]);

  const handleClose = () => {
    playSound('MOUSE_CLICK');
    setFormData({
      title: "",
      summary: "",
      role: "",
      task: "",
      context: "",
      constraints: "",
      format: "",
      phase: "Research",
      subcategory: "",
      category: "research",
      content: "",
      exampleOutput: ""
    });
    onClose();
  };

  const generatePromptContent = () => {
    return `Role: ${formData.role}

Task: ${formData.task}

Context: ${formData.context}

Constraints: ${formData.constraints}

Format: ${formData.format}

Please provide a comprehensive response based on the above framework.`;
  };

  const handleSave = () => {
    playSound('MOUSE_CLICK');
    if (formData.title && formData.role && formData.task && formData.context && formData.constraints && formData.format && formData.phase && formData.subcategory && formData.category) {
      // Map phase to category if not already set
      const mappedCategory = formData.category || 
        (formData.phase === "Research" ? "research" :
         formData.phase === "Ideation" ? "ideation" :
         formData.phase === "Flows & IA" ? "flows" :
         formData.phase === "Prototyping" ? "prototyping" : "research");
      
      onSave({
        ...formData,
        category: mappedCategory,
        content: generatePromptContent(), // Generate content from RTCCF fields
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
      handleClose();
    }
  };





  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div key="create-prompt-modal-instance" className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            variants={variants.fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={animations.modal.backdrop.transition}
            style={{ willChange: performance.willChange.opacity }}
          />

          {/* Modal */}
          <div key="modal-container" className="fixed inset-0 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div
              key="modal-content"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl md:rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col"
              style={{ 
                maxHeight: "calc(100vh - 32px)", 
                minHeight: "400px",
                willChange: performance.willChange.transform 
              }}
              variants={variants.scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animations.modal.content.transition}
            >
              {/* Header - Fixed */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <motion.h2 
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-syne"
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  Create New Prompt
                </motion.h2>
                <motion.button
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  whileHover={animations.hover.scale}
                  whileTap={animations.tap.press}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {/* Title */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                                        <Label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block font-syne">
                        Prompt Title *
                      </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a descriptive title for your prompt"
                    className="w-full"
                  />
                </motion.div>

                {/* Summary */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.15 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                                        <Label htmlFor="summary" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block font-syne">
                        Summary
                      </Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Brief description of what this prompt does"
                    rows={2}
                    className="w-full resize-none"
                  />
                </motion.div>

                {/* RTCCF Framework */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 block font-syne">
                    RTCCF Framework *
                  </Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                    Use the RTCCF framework to create structured, effective prompts: Role, Task, Context, Constraints, and Format.
                  </p>
                  
                  {/* Role */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="role" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g., UX Researcher, Product Designer, Design Strategist"
                      className="w-full"
                    />
                  </div>

                  {/* Task */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="task" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Task
                    </Label>
                    <Input
                      id="task"
                      value={formData.task}
                      onChange={(e) => setFormData(prev => ({ ...prev, task: e.target.value }))}
                      placeholder="e.g., Conduct user interviews, Create wireframes, Analyze user feedback"
                      className="w-full"
                    />
                  </div>

                  {/* Context */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="context" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Context
                    </Label>
                    <Textarea
                      id="context"
                      value={formData.context}
                      onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                      placeholder="e.g., Working on a mobile app redesign for a fintech startup targeting millennials"
                      rows={2}
                      className="w-full resize-none"
                    />
                  </div>

                  {/* Constraints */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="constraints" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Constraints
                    </Label>
                    <Textarea
                      id="constraints"
                      value={formData.constraints}
                      onChange={(e) => setFormData(prev => ({ ...prev, constraints: e.target.value }))}
                      placeholder="e.g., Limited budget, 2-week timeline, Must be accessible (WCAG 2.1 AA)"
                      rows={2}
                      className="w-full resize-none"
                    />
                  </div>

                  {/* Format */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="format" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Format
                    </Label>
                    <Input
                      id="format"
                      value={formData.format}
                      onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                      placeholder="e.g., Bullet points, Step-by-step guide, Checklist, Template"
                      className="w-full"
                    />
                  </div>
                </motion.div>

                {/* Phase */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.25 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                                                                             <Label htmlFor="phase" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block font-syne">
                       Design Phase *
                     </Label>
                  <Select value={formData.phase} onValueChange={(value) => {
                    // Map phase to category
                    const mappedCategory = 
                      value === "Research" ? "research" :
                      value === "Ideation" ? "ideation" :
                      value === "Flows & IA" ? "flows" :
                      value === "Prototyping" ? "prototyping" : "research";
                    
                    setFormData(prev => ({ 
                      ...prev, 
                      phase: value,
                      category: mappedCategory,
                      subcategory: "" // Reset subcategory when phase changes
                    }))
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Ideation">Ideation</SelectItem>
                      <SelectItem value="Flows & IA">User Flows & IA</SelectItem>
                      <SelectItem value="Prototyping">Prototyping & Design</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Subcategory */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Label htmlFor="subcategory" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block font-syne">
                    Subcategory
                  </Label>
                  <Select value={formData.subcategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.phase === "Research" && (
                        <>
                          <SelectItem value="discovery">Discovery</SelectItem>
                          <SelectItem value="synthesis">Synthesis</SelectItem>
                          <SelectItem value="storytelling">Storytelling</SelectItem>
                          <SelectItem value="validation">Validation</SelectItem>
                        </>
                      )}
                      {formData.phase === "Ideation" && (
                        <>
                          <SelectItem value="brainstorming">Brainstorming</SelectItem>
                          <SelectItem value="opportunity-framing">Opportunity Framing</SelectItem>
                          <SelectItem value="concept-development">Concept Development</SelectItem>
                          <SelectItem value="prioritization">Prioritization</SelectItem>
                        </>
                      )}
                      {formData.phase === "Flows & IA" && (
                        <>
                          <SelectItem value="navigation-ia">Navigation & IA</SelectItem>
                          <SelectItem value="task-flows">Task Flows</SelectItem>
                          <SelectItem value="content-hierarchy">Content Hierarchy</SelectItem>
                        </>
                      )}
                      {formData.phase === "Prototyping" && (
                        <>
                          <SelectItem value="wireframing">Wireframing</SelectItem>
                          <SelectItem value="high-fidelity-design">High Fidelity Design</SelectItem>
                          <SelectItem value="design-crit">Design Crit</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Category */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Label htmlFor="category" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block font-syne">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="ideation">Ideation</SelectItem>
                      <SelectItem value="flows">User Flows & IA</SelectItem>
                      <SelectItem value="prototyping">Prototyping & Design</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>



                {/* Example Output Toggle */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.35 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <motion.div
                    whileHover={animations.hover.scale}
                    whileTap={animations.tap.press}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => setShowExample(!showExample)}
                      className="w-full justify-start text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <Plus className={`h-4 w-4 mr-2 transition-transform duration-200 ${showExample ? 'rotate-45' : ''}`} />
                      <span className="font-syne">{showExample ? 'Hide' : 'Add'} Example Output</span>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Example Output */}
                <AnimatePresence mode="wait">
                  {showExample && (
                    <motion.div
                      key="example-output"
                      variants={variants.slideIn}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={animations.tween.medium}
                      style={{ willChange: performance.willChange.layout }}
                    >
                      <Label htmlFor="exampleOutput" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block font-syne">
                        Example Output
                      </Label>
                      <Textarea
                        id="exampleOutput"
                        value={formData.exampleOutput}
                        onChange={(e) => setFormData(prev => ({ ...prev, exampleOutput: e.target.value }))}
                        placeholder="Show an example of what this prompt produces..."
                        rows={4}
                        className="w-full resize-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer - Fixed */}
              <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border/30 flex-shrink-0">
                <motion.div
                  whileHover={animations.hover.scale}
                  whileTap={animations.tap.press}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={animations.hover.scale}
                  whileTap={animations.tap.press}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Button
                    onClick={handleSave}
                    disabled={!formData.title || !formData.role || !formData.task || !formData.context || !formData.constraints || !formData.format || !formData.phase || !formData.subcategory || !formData.category}
                    className="px-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white border-0"
                  >
                    Create Prompt
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
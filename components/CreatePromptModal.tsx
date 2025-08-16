import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { animations, variants, performance } from "../src/lib/animations";

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: any) => void;
}

export function CreatePromptModal({ isOpen, onClose, onSave }: CreatePromptModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    phase: "",
    impact: "",
    category: "",
    tags: [] as string[],
    exampleOutput: "",
  });

  const [newTag, setNewTag] = useState("");
  const [showExample, setShowExample] = useState(false);

  const handleClose = () => {
    setFormData({
      title: "",
      summary: "",
      content: "",
      phase: "",
      impact: "",
      category: "",
      tags: [],
      exampleOutput: "",
    });
    setNewTag("");
    setShowExample(false);
    onClose();
  };

  const handleSave = () => {
    if (formData.title && formData.content && formData.phase) {
      onSave({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
      handleClose();
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case "High Impact":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "Quick Win":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "5-min Setup":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
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
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100"
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
                  <Label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
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
                  <Label htmlFor="summary" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
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

                {/* Content */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Label htmlFor="content" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                    Prompt Content *
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter your prompt content here..."
                    rows={6}
                    className="w-full resize-none"
                  />
                </motion.div>

                {/* Phase and Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.25 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <Label htmlFor="phase" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                      Design Phase *
                    </Label>
                    <Select value={formData.phase} onValueChange={(value) => setFormData(prev => ({ ...prev, phase: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="IA">IA</SelectItem>
                        <SelectItem value="Ideation">Ideation</SelectItem>
                        <SelectItem value="Prototyping">Prototyping</SelectItem>
                        <SelectItem value="Stakeholder">Stakeholder</SelectItem>
                        <SelectItem value="Dev Handoff">Dev Handoff</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    variants={variants.slideIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    style={{ willChange: performance.willChange.transform }}
                  >
                    <Label htmlFor="impact" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                      Impact Level
                    </Label>
                    <Select value={formData.impact} onValueChange={(value) => setFormData(prev => ({ ...prev, impact: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select impact level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High Impact">High Impact</SelectItem>
                        <SelectItem value="Quick Win">Quick Win</SelectItem>
                        <SelectItem value="5-min Setup">5-min Setup</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Category */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.35 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Label htmlFor="category" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Tags */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  style={{ willChange: performance.willChange.transform }}
                >
                  <Label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
                    Tags
                  </Label>
                  <div className="space-y-3">
                    {/* Add Tag Input */}
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <motion.div
                        whileHover={animations.hover.scale}
                        whileTap={animations.tap.press}
                        style={{ willChange: performance.willChange.transform }}
                      >
                        <Button
                          onClick={addTag}
                          size="sm"
                          variant="outline"
                          className="px-3"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>

                    {/* Tags Display */}
                    {formData.tags.length > 0 && (
                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={variants.list}
                        initial="hidden"
                        animate="visible"
                        style={{ willChange: performance.willChange.layout }}
                      >
                        {formData.tags.map((tag, index) => (
                          <motion.div
                            key={tag}
                            variants={variants.listItem}
                            layout
                            whileHover={animations.hover.scale}
                            whileTap={animations.tap.press}
                            style={{ willChange: performance.willChange.transform }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium bg-accent/50 text-accent-foreground hover:bg-accent/70 transition-colors duration-200 cursor-pointer group"
                              onClick={() => removeTag(tag)}
                            >
                              {tag}
                              <X className="h-3 w-3 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Example Output Toggle */}
                <motion.div
                  variants={variants.slideIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.45 }}
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
                      {showExample ? 'Hide' : 'Add'} Example Output
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
                      <Label htmlFor="exampleOutput" className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">
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
                    disabled={!formData.title || !formData.content || !formData.phase}
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
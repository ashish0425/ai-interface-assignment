import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

export const PromptEditor: React.FC = () => {
  const { currentPrompt, templates, isLoading, dispatch, sendMessage, loadTemplate } = useApp();
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPrompt.trim()) {
      await sendMessage(currentPrompt.trim());
      dispatch({ type: 'SET_PROMPT', payload: '' });
    }
  };

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
          Prompt Editor
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTemplates(true)}
        >
          <BookmarkIcon className="h-4 w-4 mr-2" />
          Templates
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <textarea
            value={currentPrompt}
            onChange={(e) => dispatch({ type: 'SET_PROMPT', payload: e.target.value })}
            placeholder="Enter your prompt here..."
            className="w-full h-32 p-4 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-secondary-400">
            {currentPrompt.length} characters
          </div>
        </motion.div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={isLoading}
            disabled={!currentPrompt.trim() || isLoading}
            className="flex items-center space-x-2"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </form>

      <Modal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        title="Prompt Templates"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-secondary-200 dark:border-secondary-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 cursor-pointer transition-colors"
                onClick={() => {
                  loadTemplate(template);
                  setShowTemplates(false);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-secondary-900 dark:text-white">
                    {template.name}
                  </h4>
                  <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                  {template.description}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  {template.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
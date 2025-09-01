import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useApp } from '../contexts/AppContext';
import { AIModel } from '../types';

export const ModelSelector: React.FC = () => {
  const { selectedModel, models, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (model: AIModel) => {
    dispatch({ type: 'SELECT_MODEL', payload: model });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
        aria-label="Select AI model"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {selectedModel?.provider.charAt(0) || 'AI'}
            </span>
          </div>
          <div className="text-left">
            <div className="font-medium text-secondary-900 dark:text-white">
              {selectedModel?.name || 'Select Model'}
            </div>
            <div className="text-xs text-secondary-500">
              {selectedModel?.provider || 'Choose an AI model'}
            </div>
          </div>
        </div>
        <ChevronDownIcon 
          className={`h-5 w-5 text-secondary-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 w-full mt-2 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleSelect(model)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {model.provider.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-secondary-900 dark:text-white">
                        {model.name}
                      </div>
                      <div className="text-xs text-secondary-500">
                        {model.description}
                      </div>
                      <div className="text-xs text-primary-600 dark:text-primary-400">
                        {model.pricing}
                      </div>
                    </div>
                  </div>
                  {selectedModel?.id === model.id && (
                    <CheckIcon className="h-5 w-5 text-primary-600" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
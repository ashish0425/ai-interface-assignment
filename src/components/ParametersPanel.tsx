import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Slider } from './ui/Slider';

export const ParametersPanel: React.FC = () => {
  const { parameters, dispatch } = useApp();

  const updateParameter = (key: keyof typeof parameters, value: number) => {
    dispatch({ type: 'UPDATE_PARAMETERS', payload: { [key]: value } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700 p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
        Parameters
      </h3>
      
      <div className="space-y-6">
        <Slider
          label="Temperature"
          value={parameters.temperature}
          min={0}
          max={2}
          step={0.1}
          onChange={(value) => updateParameter('temperature', value)}
          description="Controls randomness. Higher values make output more creative."
        />
        
        <Slider
          label="Max Tokens"
          value={parameters.maxTokens}
          min={1}
          max={4096}
          step={1}
          onChange={(value) => updateParameter('maxTokens', value)}
          description="Maximum length of the response."
        />
        
        <Slider
          label="Top P"
          value={parameters.topP}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateParameter('topP', value)}
          description="Controls diversity via nucleus sampling."
        />
        
        <Slider
          label="Frequency Penalty"
          value={parameters.frequencyPenalty}
          min={-2}
          max={2}
          step={0.1}
          onChange={(value) => updateParameter('frequencyPenalty', value)}
          description="Reduces repetition of frequent tokens."
        />
        
        <Slider
          label="Presence Penalty"
          value={parameters.presencePenalty}
          min={-2}
          max={2}
          step={0.1}
          onChange={(value) => updateParameter('presencePenalty', value)}
          description="Encourages talking about new topics."
        />
      </div>
    </motion.div>
  );
};
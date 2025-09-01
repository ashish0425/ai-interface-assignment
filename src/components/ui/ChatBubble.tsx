import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ChatMessage } from '../../types';

interface ChatBubbleProps {
  message: ChatMessage;
  onCopy?: (content: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (onCopy) {
      onCopy(message.content);
    } else {
      await navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`
        max-w-[80%] group relative
        ${isUser 
          ? 'bg-primary-600 text-white' 
          : 'bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white border border-secondary-200 dark:border-secondary-700'
        }
        rounded-2xl px-4 py-3 shadow-sm
      `}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`text-xs mb-1 ${isUser ? 'text-primary-200' : 'text-secondary-500'}`}>
              {isUser ? 'You' : message.model || 'AI'}
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
            <div className={`text-xs mt-2 ${isUser ? 'text-primary-200' : 'text-secondary-400'}`}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`
              ml-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
              ${isUser 
                ? 'hover:bg-primary-700 text-primary-200' 
                : 'hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-500'
              }
            `}
            aria-label="Copy message"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <ClipboardIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
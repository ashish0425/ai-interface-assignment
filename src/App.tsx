import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  Bars3Icon, 
  XMarkIcon,
  CpuChipIcon 
} from '@heroicons/react/24/outline';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { ModelSelector } from './components/ModelSelector';
import { ParametersPanel } from './components/ParametersPanel';
import { PromptEditor } from './components/PromptEditor';
import { ChatArea } from './components/ChatArea';
import { Button } from './components/ui/Button';

const AppContent: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <CpuChipIcon className="h-8 w-8 text-primary-600" />
              <h1 className="text-xl font-bold text-secondary-900 dark:text-white">
                AI Interface
              </h1>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ 
            x: sidebarOpen ? 0 : '-100%',
            opacity: sidebarOpen ? 1 : 0 
          }}
          className={`
            fixed lg:relative lg:translate-x-0 lg:opacity-100 z-30
            w-80 h-full bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700
            lg:block ${sidebarOpen ? 'block' : 'hidden'}
          `}
        >
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <ModelSelector />
            <ParametersPanel />
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-4 p-4">
            {/* Prompt Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700 p-6 shadow-sm"
            >
              <PromptEditor />
            </motion.div>

            {/* Chat Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-sm overflow-hidden"
            >
              <ChatArea />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AIModel, PromptTemplate, ChatMessage, AIParameters } from '../types';
import { fetchModels, fetchTemplates, mockAIResponse } from '../data/mockData';

type AppAction = 
  | { type: 'SET_MODELS'; payload: AIModel[] }
  | { type: 'SET_TEMPLATES'; payload: PromptTemplate[] }
  | { type: 'SELECT_MODEL'; payload: AIModel }
  | { type: 'UPDATE_PARAMETERS'; payload: Partial<AIParameters> }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CHAT' };

interface AppContextType extends AppState {
  models: AIModel[];
  templates: PromptTemplate[];
  dispatch: React.Dispatch<AppAction>;
  sendMessage: (prompt: string) => Promise<void>;
  loadTemplate: (template: PromptTemplate) => void;
}

const initialState: AppState = {
  selectedModel: null,
  parameters: {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
  messages: [],
  currentPrompt: '',
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SELECT_MODEL':
      return { ...state, selectedModel: action.payload };
    case 'UPDATE_PARAMETERS':
      return { ...state, parameters: { ...state.parameters, ...action.payload } };
    case 'SET_PROMPT':
      return { ...state, currentPrompt: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_CHAT':
      return { ...state, messages: [], error: null };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [models, setModels] = React.useState<AIModel[]>([]);
  const [templates, setTemplates] = React.useState<PromptTemplate[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [modelsData, templatesData] = await Promise.all([
          fetchModels(),
          fetchTemplates()
        ]);
        setModels(modelsData);
        setTemplates(templatesData);
        if (modelsData.length > 0) {
          dispatch({ type: 'SELECT_MODEL', payload: modelsData[0] });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load initial data' });
      }
    };
    loadData();
  }, []);

  const sendMessage = async (prompt: string): Promise<void> => {
    if (!state.selectedModel || !prompt.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
      model: state.selectedModel.name
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await mockAIResponse(prompt, state.selectedModel.name);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        model: state.selectedModel.name
      };
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to get AI response' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadTemplate = (template: PromptTemplate): void => {
    dispatch({ type: 'SET_PROMPT', payload: template.content });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      models,
      templates,
      dispatch,
      sendMessage,
      loadTemplate
    }}>
      {children}
    </AppContext.Provider>
  );
};
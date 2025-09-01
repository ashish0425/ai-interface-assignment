export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  pricing?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface AIParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface AppState {
  selectedModel: AIModel | null;
  parameters: AIParameters;
  messages: ChatMessage[];
  currentPrompt: string;
  isLoading: boolean;
  error: string | null;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
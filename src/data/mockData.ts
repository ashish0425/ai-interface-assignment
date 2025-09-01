import { AIModel, PromptTemplate } from '../types';

export const mockModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable model for complex reasoning tasks',
    maxTokens: 8192,
    pricing: '$0.03/1K tokens'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient for most conversational tasks',
    maxTokens: 4096,
    pricing: '$0.002/1K tokens'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Highest level of intelligence and capability',
    maxTokens: 4096,
    pricing: '$15/1M tokens'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balance of intelligence and speed',
    maxTokens: 4096,
    pricing: '$3/1M tokens'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Multimodal AI with strong reasoning',
    maxTokens: 8192,
    pricing: '$0.5/1M tokens'
  },
  {
    id: 'llama-2-70b',
    name: 'Llama 2 70B',
    provider: 'Meta',
    description: 'Open-source large language model',
    maxTokens: 4096,
    pricing: 'Free'
  }
];

export const mockTemplates: PromptTemplate[] = [
  {
    id: 'creative-writing',
    name: 'Creative Writing Assistant',
    category: 'Creative',
    description: 'Help with stories, poems, and creative content',
    content: 'You are a creative writing assistant. Help me write engaging and imaginative content. Be creative, descriptive, and inspiring.'
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    category: 'Development',
    description: 'Review and improve code quality',
    content: 'You are an expert code reviewer. Analyze the following code for best practices, potential bugs, performance issues, and suggest improvements.'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Analytics',
    description: 'Analyze and interpret data patterns',
    content: 'You are a data analyst. Help me understand data patterns, create insights, and suggest actionable recommendations based on the data provided.'
  },
  {
    id: 'business-consultant',
    name: 'Business Consultant',
    category: 'Business',
    description: 'Strategic business advice and planning',
    content: 'You are a business consultant with expertise in strategy, operations, and growth. Provide practical and actionable business advice.'
  },
  {
    id: 'learning-tutor',
    name: 'Learning Tutor',
    category: 'Education',
    description: 'Personalized learning and teaching assistant',
    content: 'You are a patient and knowledgeable tutor. Break down complex topics into understandable parts and provide clear explanations with examples.'
  },
  {
    id: 'research-assistant',
    name: 'Research Assistant',
    category: 'Research',
    description: 'Help with research and fact-finding',
    content: 'You are a research assistant. Help me gather information, summarize findings, and provide well-sourced insights on various topics.'
  }
];

// Mock API functions
export const fetchModels = (): Promise<AIModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockModels), 800);
  });
};

export const fetchTemplates = (): Promise<PromptTemplate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTemplates), 600);
  });
};

export const mockAIResponse = (prompt: string, model: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        `This is a simulated response from ${model}. Your prompt was: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
        `I understand you're asking about "${prompt.substring(0, 30)}...". Here's a detailed response that would come from ${model}.`,
        `Based on your prompt, here's what ${model} would generate: This is a comprehensive answer that addresses your question about the topic you mentioned.`
      ];
      resolve(responses[Math.floor(Math.random() * responses.length)]);
    }, 2000);
  });
};
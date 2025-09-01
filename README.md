# AI Interface Prototype

A modern, responsive AI interface built with React.js, TypeScript, and Tailwind CSS. This prototype combines the best features from leading AI platforms into a unified, polished user experience.

## 🔬 Research

### Platforms Reviewed

**OpenAI Playground**: Clean parameter controls with real-time model switching and excellent prompt management. Standout features include intuitive sliders for temperature/tokens and seamless model comparison.

**Anthropic Claude UI**: Exceptional conversational flow with excellent message threading and context awareness. Notable for its clean typography and thoughtful spacing that enhances readability.

**Hugging Face Spaces**: Impressive model diversity with community-driven templates and robust filtering systems. Excels at showcasing different AI capabilities through organized categorization.

**Microsoft Copilot Lab**: Strong integration patterns with excellent accessibility features and comprehensive keyboard navigation. Notable for its responsive design and dark mode implementation.

**Google AI Studio**: Outstanding parameter visualization with real-time feedback and advanced export capabilities. Features excellent JSON download functionality and session management.

### Chosen Core Features

1. **Model Selector**: Dropdown interface for switching between AI models with provider information
2. **Parameter Controls**: Interactive sliders for temperature, tokens, and other AI parameters
3. **Prompt Templates**: Categorized template library with save/load functionality
4. **Chat Interface**: Clean conversation view with message threading and timestamps
5. **Export Functionality**: Copy individual messages and download full conversations as JSON
6. **Theme Toggle**: Persistent dark/light mode with system preference detection
7. **Responsive Design**: Mobile-first layout that adapts from phone to desktop
8. **Accessibility**: Full keyboard navigation with ARIA labels and focus management

## 🎨 Design

### Design Approach

The interface follows a clean, modern aesthetic inspired by productivity tools like Linear and Notion. The design emphasizes clarity, functionality, and visual hierarchy.

**Figma Mockup**: [Link to Figma file - create your mockup here]

### Tailwind Mapping

**Color System:**

- Primary: Blue-based (`primary-600`, `primary-700`) for actions and brand elements
- Secondary: Slate-based (`secondary-50` to `secondary-900`) for text and backgrounds
- Semantic colors for success, warning, and error states

**Typography:**

- Headers: `text-lg`, `font-semibold` for section titles
- Body: `text-sm`, `font-medium` for primary text
- Captions: `text-xs` for metadata and descriptions

**Spacing:**

- Container padding: `p-6` for main sections, `p-4` for compact areas
- Component gaps: `space-y-4` for vertical stacking, `space-x-3` for horizontal elements
- Grid gaps: `gap-4` for layout grids

**Layout:**

- Sidebar: Fixed `w-80` width with responsive collapse on mobile
- Main content: CSS Grid with `grid-cols-2` for desktop, `grid-rows-2` for mobile
- Chat area: Flexbox with `flex-1` for automatic height adjustment

## 🛠 Development

### Architecture

**State Management:**

- React Context for global state (theme, app state)
- useReducer for complex state updates
- Custom hooks for API interactions

**Component Structure:**

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── ModelSelector.tsx
│   ├── ParametersPanel.tsx
│   ├── PromptEditor.tsx
│   └── ChatArea.tsx
├── contexts/         # React Context providers
├── types/           # TypeScript definitions
├── data/            # Mock data and API functions
└── stories/         # Storybook stories
```

**Key Implementation Details:**

1. **Mock API**: Simulated async operations with loading states using Promises and setTimeout
2. **Theme Persistence**: localStorage integration with system preference detection
3. **Responsive Layout**: CSS Grid and Flexbox with Tailwind breakpoints
4. **Animations**: Framer Motion for smooth transitions and micro-interactions
5. **Accessibility**: ARIA labels, keyboard navigation, and focus management

### Mock API Setup

The application uses simulated API endpoints:

- `fetchModels()`: Returns list of AI models with provider info
- `fetchTemplates()`: Returns categorized prompt templates
- `mockAIResponse()`: Simulates AI response generation with realistic delays

### Known Limitations

- Mock data only - no real AI integration
- Local storage limited to theme preferences
- No user authentication or session persistence
- Simplified parameter controls (some advanced options omitted)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to Netlify/Vercel
npm run build && npm run deploy
```

## 📱 Features Implemented

- ✅ Model selection with provider information
- ✅ Interactive parameter controls (temperature, tokens, penalties)
- ✅ Prompt template library with categories
- ✅ Real-time chat interface with message history
- ✅ Copy/export functionality for conversations
- ✅ Persistent dark/light theme toggle
- ✅ Fully responsive mobile-desktop layout
- ✅ Comprehensive accessibility features
- ✅ Loading states and error handling

## 🔧 Tech Stack

- **Framework**: React.js 18 with TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion for smooth interactions
- **Icons**: Heroicons for consistent iconography
- **Development**: Storybook for component development
- **Build**: Create React App with TypeScript template

## 📦 Deployment

This project is optimized for deployment on:

- **Vercel**: Connect GitHub repository for automatic deployments
- **GitHub Pages**: Use `npm run build` and deploy the build folder

Built with ❤️ for the AI Interface Design Assessment

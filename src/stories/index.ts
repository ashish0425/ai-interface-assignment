import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/ui/Slider';
import { Modal } from '../components/ui/Modal';
import { ChatBubble } from '../components/ui/ChatBubble';

// Slider.stories.tsx
const sliderMeta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default sliderMeta;

export const SliderDefault: StoryObj<typeof sliderMeta> = {
  args: {
    label: 'Temperature',
    value: 0.7,
    min: 0,
    max: 2,
    step: 0.1,
    onChange: (value) => console.log(value),
    description: 'Controls randomness in AI responses'
  },
};

// Modal.stories.tsx
const modalMeta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const ModalDefault: StoryObj<typeof modalMeta> = {
  args: {
    isOpen: true,
    title: 'Example Modal',
    onClose: () => console.log('Modal closed'),
    children: React.createElement('div', {}, [
      React.createElement('p', { key: 'p' }, 'This is the modal content. You can put any React elements here.'),
      React.createElement('button', { 
        key: 'button',
        className: 'mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      }, 'Action Button')
    ]),
  },
};

// ChatBubble.stories.tsx
const chatBubbleMeta: Meta<typeof ChatBubble> = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const UserMessage: StoryObj<typeof chatBubbleMeta> = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'Hello, can you help me with my project?',
      timestamp: new Date(),
      model: 'GPT-4'
    },
  },
};

export const AssistantMessage: StoryObj<typeof chatBubbleMeta> = {
  args: {
    message: {
      id: '2',
      role: 'assistant',
      content: 'Of course! I\'d be happy to help you with your project. What specific aspect would you like assistance with?',
      timestamp: new Date(),
      model: 'GPT-4'
    },
  },
};
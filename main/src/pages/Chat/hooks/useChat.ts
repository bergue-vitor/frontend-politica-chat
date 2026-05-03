import { useState } from 'react';
import { getMockAssistantResponse } from '../mocks/chat.mock';
import type { ChatMessage } from '../types/chat.types';

export function useChat(selectedDepartment: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSendMessage() {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      const assistantResponse = getMockAssistantResponse(selectedDepartment);
      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'assistant',
        content: assistantResponse.content,
        createdAt: new Date().toISOString(),
        sources: assistantResponse.sources.map((source) => ({
          ...source,
          id: crypto.randomUUID(),
        })),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsSending(false);
    }
  }

  return {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    isSending,
  };
}

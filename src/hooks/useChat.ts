import { useState } from 'react';
import { sendMessageToAI } from '../utils/formatMessage';
import { mockMessages } from '../data/mockMessages';

export type Message = {
  isUser: boolean;
  type: 'text' | 'file' | 'code';
  content: string;
  avatar?: string;
  file?: File;
  codeLang?: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSend = async (msg: string, file?: File) => {
    if (!msg && !file) return;
    setMessages(prev => [...prev, { isUser: true, type: file ? 'file' : 'text', content: msg, file }]);
    setIsTyping(true);
    setLoading(true);
    try {
      const aiMsg = await sendMessageToAI(msg, file);
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { isUser: false, type: 'text', content: 'API error. Please try again.' }]);
    }
    setIsTyping(false);
    setLoading(false);
  };

  const onVoice = (text: string) => {
    onSend(text);
  };

  return {
    messages,
    isTyping,
    loading,
    onSend,
    onVoice,
  };
}

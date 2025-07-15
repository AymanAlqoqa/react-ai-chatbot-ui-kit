import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import { Message } from '../hooks/useChat';

const List = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: ${({ theme }) => theme.chatBackground};
`;

type Props = {
  messages: Message[];
};

const ChatMessageList: React.FC<Props> = ({ messages }) => {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <List ref={listRef}>
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
    </List>
  );
};

export default ChatMessageList;

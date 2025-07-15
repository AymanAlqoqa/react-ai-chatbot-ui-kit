import React from 'react';
import styled, { css } from 'styled-components';
import FilePreview from './FilePreview';
import { Message } from '../hooks/useChat';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Bubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 18px;
  background: ${({ isUser, theme }) => isUser ? theme.userBubble : theme.botBubble};
  color: ${({ isUser, theme }) => isUser ? theme.userText : theme.botText};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  ${({ isUser }) =>
    isUser
      ? css`border-bottom-right-radius: 4px;`
      : css`border-bottom-left-radius: 4px;`}
`;

const Avatar = styled.div<{ isUser: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ isUser, theme }) => isUser ? theme.userAvatarBg : theme.botAvatarBg};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: ${({ isUser }) => (isUser ? '0 0 0 8px' : '0 8px 0 0')};
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
`;

type Props = {
  message: Message;
};

const ChatMessage: React.FC<Props> = ({ message }) => {
  const { isUser, type, content, avatar, file, codeLang } = message;
  return (
    <Row style={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && <Avatar isUser={false}>{avatar || '🤖'}</Avatar>}
      <Bubble isUser={!!isUser}>
        {type === 'text' && content}
        {type === 'file' && file && <FilePreview file={file} />}
        {type === 'code' && (
          <SyntaxHighlighter language={codeLang || 'javascript'} style={atomDark}>
            {content}
          </SyntaxHighlighter>
        )}
      </Bubble>
      {isUser && <Avatar isUser>{avatar || 'U'}</Avatar>}
    </Row>
  );
};

export default ChatMessage;

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { defaultTheme } from '../themes/defaultTheme';
import { lightTheme } from '../themes/lightTheme';
import { darkTheme } from '../themes/darkTheme';
import { useChat } from '../hooks/useChat';

const Container = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.background};
`;


import { DefaultTheme } from 'styled-components';


import { validateLicenseKey } from '../utils/validateLicense';

type ChatContainerProps = {
  theme?: DefaultTheme;
  licenseKey: string;
  publicKey?: string;
};




const ChatContainer: React.FC<ChatContainerProps> = ({ theme, licenseKey, publicKey }) => {
  const [isDark, setIsDark] = useState(false);
  const [licenseValid, setLicenseValid] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const chat = useChat();
  const activeTheme = theme || (isDark ? darkTheme : lightTheme);


  React.useEffect(() => {
    setChecking(true);
    validateLicenseKey(licenseKey, publicKey).then(valid => {
      setLicenseValid(valid);
      setChecking(false);
    });
  }, [licenseKey, publicKey]);

  if (checking) {
    return <div>Validating license...</div>;
  }
  if (!licenseValid) {
    return <div style={{color: 'red', padding: 32, textAlign: 'center'}}>Invalid or missing license key. Please contact support.</div>;
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <Container>
        <button
          style={{
            alignSelf: 'flex-end',
            margin: '8px',
            padding: '4px 12px',
            borderRadius: 8,
            border: 'none',
            background: isDark ? '#333' : '#eee',
            color: isDark ? '#fff' : '#222',
            cursor: 'pointer',
            fontSize: 14,
          }}
          onClick={() => setIsDark(d => !d)}
        >
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </button>
        <ChatMessageList messages={chat.messages} />
        {chat.isTyping && <TypingIndicator />}
        <MessageInput {...chat} />
      </Container>
    </ThemeProvider>
  );
};

export default ChatContainer;

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    chatBackground: string;
    userBubble: string;
    botBubble: string;
    userText: string;
    botText: string;
    userAvatarBg: string;
    botAvatarBg: string;
    inputBackground: string;
    sendButtonBg: string;
    loadingColor: string;
    typingDot: string;
  }
}

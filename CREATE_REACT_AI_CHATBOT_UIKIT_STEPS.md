# Steps to Create React AI Chatbot UI Kit (MVP)

## 1. Project Setup
- Create a new folder for your project.
- Initialize with Vite + React + TypeScript:
  ```bash
  npm create vite@latest chat-bot -- --template react-ts
  cd chat-bot
  ```
- Install dependencies:
  ```bash
  npm install styled-components react-syntax-highlighter
  npm install --save-dev @types/styled-components
  npm install @vitejs/plugin-react
  ```

## 2. TypeScript & Vite Config
- Ensure `tsconfig.json` includes:
  ```json
  "types": ["vite/client"]
  ```
- Add `vite.config.ts`:
  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  export default defineConfig({ plugins: [react()] });
  ```
- Add `src/vite-env.d.ts`:
  ```ts
  /// <reference types="vite/client" />
  ```

## 3. Theme Types
- Add `src/styled.d.ts` to extend styled-components theme:
  ```ts
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
  ```

## 4. Theme Files
- Add `src/themes/defaultTheme.ts`, `lightTheme.ts`, and `darkTheme.ts` with your color palette.

## 5. Component Structure
- Create the following in `src/components/`:
  - `ChatContainer.tsx` (main wrapper, theme toggle)
  - `ChatMessageList.tsx` (scrollable list)
  - `ChatMessage.tsx` (bubble, avatar, code/file/text)
  - `MessageInput.tsx` (input, send, file, voice)
  - `FilePreview.tsx` (file/image preview)
  - `TypingIndicator.tsx` (animated dots)
  - `VoiceToTextButton.tsx` (Web Speech API)

## 6. Hooks & Utils
- `src/hooks/useChat.ts` (handles messages, API calls)
- `src/utils/formatMessage.ts` (formats messages, OpenAI integration)

## 7. Data
- `src/data/mockMessages.ts` (sample chat logs)

## 8. Main Entry
- `src/App.tsx` (renders `ChatContainer`)
- `src/main.tsx` (React root)
- `index.html` (root div)

## 9. OpenAI Integration
- Add `.env` file:
  ```env
  VITE_OPENAI_API_KEY=sk-...
  ```
- In `formatMessage.ts`, use `import.meta.env.VITE_OPENAI_API_KEY` for API calls.

## 10. Run & Test
- Start dev server:
  ```bash
  npm run dev
  ```
- Visit the local URL to test the chatbot UI.

## 11. Extra Features
- Add theme toggle in `ChatContainer` for light/dark mode.
- File upload and code snippet support in `formatMessage.ts` and `ChatMessage.tsx`.
- Customize themes, avatars, and UI as needed.

---

**To update:**
- Pull latest code, update dependencies, and follow the above structure for new features or fixes.
- Always keep theme types in sync with your theme files.

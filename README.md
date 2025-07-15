# React AI Chatbot UI Kit

A production-ready, customizable React chatbot UI component library with optional OpenAI integration demo.

## Features
- Chat bubble UI (user/bot, avatars, code, file, text)
- File upload & preview
- Code snippet with syntax highlighting
- Voice-to-text (Web Speech API)
- Light/dark themes
- OpenAI API demo integration
- Customizable via theme/props

## Usage
1. Install:
   ```bash
   npm install react-ai-chatbot-ui-kit
   # or
   yarn add react-ai-chatbot-ui-kit
   ```
2. Import in your app:
   ```tsx
   import { ChatContainer } from 'react-ai-chatbot-ui-kit';
   import { lightTheme, darkTheme } from 'react-ai-chatbot-ui-kit/themes';
   // ...
   <ChatContainer theme={lightTheme} />
   ```
3. To use OpenAI demo, set `VITE_OPENAI_API_KEY` in your environment.

## Development
- Build: `npm run build`
- Dev: `npm run dev`
- Publish: `npm publish --access public`

## License
MIT

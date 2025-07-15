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


2. Configure license key (required for commercial use):
   - You will receive a `VITE_LICENSE_KEY` (signed license key) and a `VITE_PUBLIC_KEY` (RSA public key) from the vendor.
   - Create a `.env` file in your project root:
     ```env
     VITE_LICENSE_KEY=AI-CHATBOT-UIKIT-2025-002.K0KBScotwXOL5UzR7AAaCJbJ59TXLeJcy8kX1jvuxy1uzXuU11h9lFNmXhzQnA1VGTWkC+e42Lsg/7cF25HKwcE41f77ypGg8ncjMUj9ZMSTXh1EWWziVYm98dJiyM5owfbHJZgq7PjlvDoIp5N+RoYkrDjtDis7u33IeOpzeXDQ5LLxpYEYeMHtvONT/jxzus0wtJmt8K3CUB4cedarUuboAfrvP17xZk9vNPFDeHQn4q4CHGH3ezUzsTUpC1wr1y4TLbXofXYml2waaLbdm7N38kOfX27UY9Lw//w/wR2AOyqBQpTFZWKXppXeumVh4QSuvCesR3xwDq4DcyBfkg==
     VITE_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvU76mMrKyI526huNblUU\nUu/PzymoKM1cu9PL9YQ4yFPsJiNSBEJiVjq5GJScfeRWZGobpHrg46AYU2WMqY+5\naA7LQAXMkwew2uxdIhlSot6zEnwaIn2ZhbYMTV4oIA+NtiK/osh8Y4m5x/GitV/P\nXW9EEtuwlhLH/SS5Kx9Es14HoJ2P18wuHkvmW/RrX5A5WQwk9T7sf86V3aIVELJp\nwg6nBUQMHTxHPbX+K11ToBtccbbpHEAfrHrw9go1GBlGpnHys/clmM7REHAqWTRm\nTa49RqreWBjLIoPSYZBexyE18E0CpoW/ouq6jlNo1X0RXuhDW+gYl+E+y83mwKsD\n4QIDAQAB\n-----END PUBLIC KEY-----"
     ```
   - **Important:**
     - `VITE_LICENSE_KEY` must be a single line (no line breaks).
     - `VITE_PUBLIC_KEY` must be a single line, with all newlines replaced by `\n` and wrapped in double quotes.
   - The UI kit will only work if the license key is valid for the provided public key.
   - If using Vite, you can access env variables via `import.meta.env.VITE_PUBLIC_KEY` and `import.meta.env.VITE_LICENSE_KEY`.

3. Import in your app:
   ```tsx

   import { ChatContainer } from 'react-ai-chatbot-ui-kit';
   import { lightTheme, darkTheme } from 'react-ai-chatbot-ui-kit/themes';
   // ...
   <ChatContainer
     licenseKey={import.meta.env.VITE_LICENSE_KEY}
     publicKey={import.meta.env.VITE_PUBLIC_KEY}
     theme={lightTheme}
   />
   ```

4. To use OpenAI demo, set `VITE_OPENAI_API_KEY` in your environment.

## Development
- Build: `npm run build`
- Dev: `npm run dev`
- Publish: `npm publish --access public`

## License
MIT

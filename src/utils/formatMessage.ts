import { Message } from '../hooks/useChat';

export async function sendMessageToAI(msg: string, file?: File): Promise<Message> {
  // If a file is provided, return a file message (no AI call)
  if (file) {
    // Optionally, preview file type for code or image
    let codeLang: string | undefined = undefined;
    // If file is a text or code file, try to detect language from extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext && ['js','ts','tsx','jsx','py','java','cpp','c','cs','rb','go','php','sh','json','html','css','md','sql','rs','swift','kt','dart'].includes(ext)) {
      codeLang = ext;
    }
    return {
      isUser: false,
      type: codeLang ? 'code' : 'file',
      content: file.name,
      file,
      codeLang,
      avatar: '🤖',
    };
  }

  // If the message looks like a code block, return as code message
  const codeBlockMatch = msg.match(/^```(\w+)?\n([\s\S]+)\n```$/);
  if (codeBlockMatch) {
    const codeLang = codeBlockMatch[1] || 'plaintext';
    const code = codeBlockMatch[2];
    return {
      isUser: false,
      type: 'code',
      content: code,
      codeLang,
      avatar: '🤖',
    };
  }

  // Otherwise, use OpenAI as before
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: msg }],
      }),
    });
    const data = await res.json();
    // If the AI response looks like a code block, parse it
    const aiContent: string = data.choices?.[0]?.message?.content || 'No response';
    const aiCodeBlock = aiContent.match(/^```(\w+)?\n([\s\S]+)\n```$/);
    if (aiCodeBlock) {
      return {
        isUser: false,
        type: 'code',
        content: aiCodeBlock[2],
        codeLang: aiCodeBlock[1] || 'plaintext',
        avatar: '🤖',
      };
    }
    return {
      isUser: false,
      type: 'text',
      content: aiContent,
      avatar: '🤖',
    };
  } catch (e) {
    return {
      isUser: false,
      type: 'text',
      content: 'API error. Please try again.',
      avatar: '🤖',
    };
  }
}

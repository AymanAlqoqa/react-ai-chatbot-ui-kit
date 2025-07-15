import React, { useState } from 'react';

type Props = {
  onVoice: (text: string) => void;
};

const VoiceToTextButton: React.FC<Props> = ({ onVoice }) => {
  const [listening, setListening] = useState(false);
  let recognition: any;

  if ('webkitSpeechRecognition' in window) {
    recognition = new (window as any).webkitSpeechRecognition();
  } else if ('SpeechRecognition' in window) {
    recognition = new (window as any).SpeechRecognition();
  }

  const handleClick = () => {
    if (!recognition) return alert('Speech recognition not supported');
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onVoice(transcript);
    };
    recognition.start();
  };

  return (
    <button onClick={handleClick} style={{ marginRight: 8 }} disabled={listening}>
      {listening ? '🎤...' : '🎤'}
    </button>
  );
};

export default VoiceToTextButton;

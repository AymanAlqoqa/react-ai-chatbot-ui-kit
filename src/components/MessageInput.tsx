import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import VoiceToTextButton from './VoiceToTextButton';
import FilePreview from './FilePreview';

type Props = {
  onSend: (msg: string, file?: File) => void;
  onVoice: (text: string) => void;
  loading: boolean;
};

const InputBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${({ theme }) => theme.inputBackground};
`;

const TextArea = styled.textarea`
  flex: 1;
  resize: none;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 1rem;
  margin-right: 8px;
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.sendButtonBg};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  margin-left: 8px;
  cursor: pointer;
`;

const Loading = styled.div`
  margin-left: 8px;
  color: ${({ theme }) => theme.loadingColor};
`;

const MessageInput: React.FC<Props> = ({ onSend, onVoice, loading }) => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (value.trim() || file) {
      onSend(value, file || undefined);
      setValue('');
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <InputBar>
      <VoiceToTextButton onVoice={onVoice} />
      <TextArea
        rows={1}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <FileLabel>
        📎
        <FileInput
          ref={fileRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />
      </FileLabel>
      {file && <FilePreview file={file} onRemove={() => setFile(null)} />}
      <SendButton onClick={handleSend} disabled={loading}>
        Send
      </SendButton>
      {loading && <Loading>...</Loading>}
    </InputBar>
  );
};

export default MessageInput;

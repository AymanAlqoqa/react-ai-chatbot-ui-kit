import React from 'react';

type Props = {
  file: File;
  onRemove?: () => void;
};

const FilePreview: React.FC<Props> = ({ file, onRemove }) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div style={{ display: 'inline-block', marginLeft: 8 }}>
      {preview ? (
        <img src={preview} alt={file.name} style={{ maxWidth: 60, maxHeight: 60, borderRadius: 4 }} />
      ) : (
        <span>{file.name}</span>
      )}
      {onRemove && (
        <button onClick={onRemove} style={{ marginLeft: 4 }}>✕</button>
      )}
    </div>
  );
};

export default FilePreview;

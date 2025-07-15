import React from 'react';
import ChatContainer from './components/ChatContainer';

// Get PUBLIC_KEY and LICENSE_KEY from env or config
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY || 'REPLACE_WITH_YOUR_PUBLIC_KEY';
const LICENSE_KEY = import.meta.env.VITE_LICENSE_KEY || '';

const App = () => (
  <ChatContainer licenseKey={LICENSE_KEY} publicKey={PUBLIC_KEY} />
);

export default App;

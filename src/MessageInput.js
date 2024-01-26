// MessageInput.jsx
import React from 'react';
import './Style.css';

const MessageInput = ({ input, setInput, sendMessage }) => {
  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;

// MessageInput.jsx
import React from 'react';
import './Style.css';

const MessageInput = ({ input, setInput, sendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="message-input-container">
      <input 
        type="text" 
        className="message-input"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;

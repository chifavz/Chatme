// MessageList.jsx
import React from 'react';
import './Style.css';


const MessageList = ({ messages }) => {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;

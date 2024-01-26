// Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import MessageList from './useChatMessages'; // Import MessageList
import MessageInput from './MessageInput'; // Import MessageInput


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    // Add user message to the state
    setMessages([...messages, { text: input, user: true }]);
    
    // Make a request to the backend (replace URL with your API endpoint)
    const response = await axios.post('/api/chatbot', { input });

    // Add the bot's response to the state
    setMessages([...messages, { text: response.data, user: false }]);
    
    // Clear the input field
    setInput('');
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
};

export default Chatbot;

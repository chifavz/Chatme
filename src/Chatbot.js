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
    if (!input.trim()) return; // Don't send empty messages
    
    // Add user message to the state
    const newMessages = [...messages, { text: input, user: true }];
    setMessages(newMessages);
    
    // Clear the input field immediately
    setInput('');
    
    try {
      // Make actual API call to backend
      const response = await axios.post('/api/chatbot', { input });
      const botResponse = response.data.response;
      setMessages(prev => [...prev, { text: botResponse, user: false }]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', user: false }]);
    }
  };

  return (
    <div className="chatbot-container">
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
};

export default Chatbot;

// Chatbot.jsx
import React, { useState } from 'react';
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
      // Mock backend response for demo (replace with actual API call when backend is ready)
      // const response = await axios.post('/api/chatbot', { input });
      
      // Simulate API delay and response
      setTimeout(() => {
        const botResponse = `Echo: ${input}`;
        setMessages(prev => [...prev, { text: botResponse, user: false }]);
      }, 1000);
      
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

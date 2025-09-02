const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Chatbot API endpoint
app.post('/api/chatbot', (req, res) => {
  const { input } = req.body;
  
  if (!input || !input.trim()) {
    return res.status(400).json({ error: 'Message input is required' });
  }

  // Simple chatbot logic - you can replace this with more sophisticated AI/ML logic
  let response;
  const userInput = input.toLowerCase().trim();
  
  if (userInput.includes('hello') || userInput.includes('hi')) {
    response = 'Hello! How can I help you today?';
  } else if (userInput.includes('how are you')) {
    response = 'I\'m doing great! Thanks for asking. How about you?';
  } else if (userInput.includes('bye') || userInput.includes('goodbye')) {
    response = 'Goodbye! Have a great day!';
  } else if (userInput.includes('help')) {
    response = 'I\'m here to help! You can ask me questions or just chat with me.';
  } else if (userInput.includes('name')) {
    response = 'I\'m your friendly chatbot assistant!';
  } else {
    response = `Thanks for your message: "${input}". I'm still learning, so I might not have the perfect response yet!`;
  }

  // Simulate some processing time
  setTimeout(() => {
    res.json({ response });
  }, 500);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
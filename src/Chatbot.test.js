import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chatbot from './Chatbot';

describe('Chatbot Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders chatbot container', () => {
    render(<Chatbot />);
    const chatbotContainer = document.querySelector('.chatbot-container');
    expect(chatbotContainer).toBeInTheDocument();
  });

  test('renders MessageList and MessageInput components', () => {
    render(<Chatbot />);
    
    // Check for MessageList container
    const messagesContainer = document.querySelector('.messages-container');
    expect(messagesContainer).toBeInTheDocument();
    
    // Check for MessageInput components
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    expect(inputField).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test('starts with empty messages and input', () => {
    render(<Chatbot />);
    
    const messagesContainer = document.querySelector('.messages-container');
    const inputField = screen.getByPlaceholderText(/type your message/i);
    
    expect(messagesContainer).toBeEmptyDOMElement();
    expect(inputField).toHaveValue('');
  });

  test('allows user to type in input field', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(inputField, 'Hello, bot!');
    
    expect(inputField).toHaveValue('Hello, bot!');
  });

  test('does not send empty or whitespace-only messages', async () => {
    render(<Chatbot />);
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    const inputField = screen.getByPlaceholderText(/type your message/i);
    
    // Try to send empty message
    await userEvent.click(sendButton);
    
    let messagesContainer = document.querySelector('.messages-container');
    expect(messagesContainer).toBeEmptyDOMElement();
    
    // Try to send whitespace-only message
    await userEvent.type(inputField, '   ');
    await userEvent.click(sendButton);
    
    messagesContainer = document.querySelector('.messages-container');
    expect(messagesContainer).toBeEmptyDOMElement();
  });

  test('sends message when send button is clicked', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    // Type and send a message
    await userEvent.type(inputField, 'Hello, bot!');
    await userEvent.click(sendButton);
    
    // Check that user message appears
    expect(screen.getByText('Hello, bot!')).toBeInTheDocument();
    const userMessage = screen.getByText('Hello, bot!');
    expect(userMessage).toHaveClass('user-message');
    
    // Check that input is cleared
    expect(inputField).toHaveValue('');
  });

  test('sends message when Enter key is pressed', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    
    // Type a message
    await userEvent.type(inputField, 'Test message');
    
    // Press Enter
    fireEvent.keyPress(inputField, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Check that user message appears
    expect(screen.getByText('Test message')).toBeInTheDocument();
    const userMessage = screen.getByText('Test message');
    expect(userMessage).toHaveClass('user-message');
    
    // Check that input is cleared
    expect(inputField).toHaveValue('');
  });

  test('generates bot response after user message', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    // Send a user message
    await userEvent.type(inputField, 'Hello!');
    await userEvent.click(sendButton);
    
    // Advance timers to trigger bot response
    jest.advanceTimersByTime(1000);
    
    // Check that bot response appears
    await waitFor(() => {
      expect(screen.getByText('Echo: Hello!')).toBeInTheDocument();
    });
    
    const botMessage = screen.getByText('Echo: Hello!');
    expect(botMessage).toHaveClass('bot-message');
  });

  test('displays multiple messages in conversation order', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    // Send first message
    await userEvent.type(inputField, 'First message');
    await userEvent.click(sendButton);
    
    // Wait for bot response
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('Echo: First message')).toBeInTheDocument();
    });
    
    // Send second message
    await userEvent.type(inputField, 'Second message');
    await userEvent.click(sendButton);
    
    // Wait for second bot response
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('Echo: Second message')).toBeInTheDocument();
    });
    
    // Check all messages are present
    expect(screen.getByText('First message')).toBeInTheDocument();
    expect(screen.getByText('Echo: First message')).toBeInTheDocument();
    expect(screen.getByText('Second message')).toBeInTheDocument();
    expect(screen.getByText('Echo: Second message')).toBeInTheDocument();
  });

  test('handles error state gracefully', async () => {
    // Mock console.error to avoid output in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    // Send a message
    await userEvent.type(inputField, 'Test message');
    await userEvent.click(sendButton);
    
    // The user message should still appear
    expect(screen.getByText('Test message')).toBeInTheDocument();
    
    // Clean up
    consoleSpy.mockRestore();
  });

  test('input field clears immediately after sending', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    await userEvent.type(inputField, 'Quick message');
    expect(inputField).toHaveValue('Quick message');
    
    await userEvent.click(sendButton);
    
    // Input should be cleared immediately, before bot response
    expect(inputField).toHaveValue('');
    
    // User message should still appear
    expect(screen.getByText('Quick message')).toBeInTheDocument();
  });
});
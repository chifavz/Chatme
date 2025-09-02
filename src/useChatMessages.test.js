import { render, screen } from '@testing-library/react';
import MessageList from './useChatMessages';

describe('MessageList Component', () => {
  test('renders empty message list', () => {
    render(<MessageList messages={[]} />);
    const messagesContainer = document.querySelector('.messages-container');
    expect(messagesContainer).toBeInTheDocument();
    expect(messagesContainer).toBeEmptyDOMElement();
  });

  test('renders user messages with correct styling', () => {
    const messages = [
      { text: 'Hello, bot!', user: true }
    ];
    render(<MessageList messages={messages} />);
    
    const userMessage = screen.getByText('Hello, bot!');
    expect(userMessage).toBeInTheDocument();
    expect(userMessage).toHaveClass('user-message');
  });

  test('renders bot messages with correct styling', () => {
    const messages = [
      { text: 'Hello, user!', user: false }
    ];
    render(<MessageList messages={messages} />);
    
    const botMessage = screen.getByText('Hello, user!');
    expect(botMessage).toBeInTheDocument();
    expect(botMessage).toHaveClass('bot-message');
  });

  test('renders multiple messages in correct order', () => {
    const messages = [
      { text: 'First message', user: true },
      { text: 'Bot response', user: false },
      { text: 'Second user message', user: true }
    ];
    render(<MessageList messages={messages} />);
    
    const firstMessage = screen.getByText('First message');
    const botResponse = screen.getByText('Bot response');
    const secondMessage = screen.getByText('Second user message');
    
    expect(firstMessage).toBeInTheDocument();
    expect(botResponse).toBeInTheDocument();
    expect(secondMessage).toBeInTheDocument();
    
    expect(firstMessage).toHaveClass('user-message');
    expect(botResponse).toHaveClass('bot-message');
    expect(secondMessage).toHaveClass('user-message');
  });

  test('displays message text correctly', () => {
    const messages = [
      { text: 'Test message with special characters: !@#$%^&*()', user: true },
      { text: 'Multi-line\nmessage\ntest', user: false }
    ];
    render(<MessageList messages={messages} />);
    
    expect(screen.getByText('Test message with special characters: !@#$%^&*()')).toBeInTheDocument();
    // For multi-line text, use a custom text matcher that normalizes whitespace
    expect(screen.getByText((content, element) => {
      return element && element.textContent === 'Multi-line\nmessage\ntest';
    })).toBeInTheDocument();
  });
});
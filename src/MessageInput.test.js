import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageInput from './MessageInput';

describe('MessageInput Component', () => {
  const mockSendMessage = jest.fn();
  const mockSetInput = jest.fn();

  beforeEach(() => {
    mockSendMessage.mockClear();
    mockSetInput.mockClear();
  });

  test('renders input field and send button', () => {
    render(
      <MessageInput 
        input="" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    expect(inputField).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test('displays current input value', () => {
    render(
      <MessageInput 
        input="Hello, world!" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const inputField = screen.getByDisplayValue('Hello, world!');
    expect(inputField).toBeInTheDocument();
  });

  test('calls setInput when user types', async () => {
    render(
      <MessageInput 
        input="" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(inputField, 'Test message');
    
    expect(mockSetInput).toHaveBeenCalled();
  });

  test('calls sendMessage when send button is clicked', async () => {
    render(
      <MessageInput 
        input="Test message" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(sendButton);
    
    expect(mockSendMessage).toHaveBeenCalledTimes(1);
  });

  test('calls sendMessage when Enter key is pressed', () => {
    render(
      <MessageInput 
        input="Test message" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    fireEvent.keyPress(inputField, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    expect(mockSendMessage).toHaveBeenCalledTimes(1);
  });

  test('does not send message on other key presses', () => {
    render(
      <MessageInput 
        input="Test message" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const inputField = screen.getByPlaceholderText(/type your message/i);
    fireEvent.keyPress(inputField, { key: 'Space', code: 'Space' });
    fireEvent.keyPress(inputField, { key: 'a', code: 'KeyA' });
    
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  test('has correct CSS classes for styling', () => {
    render(
      <MessageInput 
        input="" 
        setInput={mockSetInput} 
        sendMessage={mockSendMessage} 
      />
    );
    
    const container = document.querySelector('.message-input-container');
    const inputField = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    
    expect(container).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });
});
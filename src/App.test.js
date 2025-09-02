import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the main app header', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { name: /your chatbot app/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    render(<App />);
    const welcomeMessage = screen.getByText(/welcome to your chatbot application!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('has proper app structure with container and header', () => {
    render(<App />);
    const appContainer = document.querySelector('.app-container');
    const appHeader = document.querySelector('.app-header');
    const appContent = document.querySelector('.app-content');
    
    expect(appContainer).toBeInTheDocument();
    expect(appHeader).toBeInTheDocument();
    expect(appContent).toBeInTheDocument();
  });
});
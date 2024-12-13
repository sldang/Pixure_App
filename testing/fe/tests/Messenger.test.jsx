import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Messenger from '../../../src/pages/Messenger';
import { AuthContext } from '../../../src/contexts/AuthContext';
import axios from 'axios';
import { vi } from 'vitest';

// Mock necessary components
vi.mock('../../../src/components/HomeComponents/Sidebar', () => ({
  __esModule: true,
  default: () => <div>Sidebar</div>,
}));

vi.mock('../../../src/components/MessengerComponents/Conversation', () => ({
  __esModule: true,
  default: () => <div>Conversation</div>,
}));

vi.mock('../../../src/components/MessengerComponents/Message', () => ({
  __esModule: true,
  default: () => <div>Message</div>,
}));

vi.mock('../../../src/components/MessengerComponents/ChatOnline', () => ({
  __esModule: true,
  default: () => <div>ChatOnline</div>,
}));

// Mock axios
vi.spyOn(axios, 'get').mockResolvedValue({ data: [] }); // For the axios calls used in Messenger

describe('Messenger Component', () => {
  const mockUser = {
    user: {
      id: 'testUserId',
      email: 'test@example.com',
    },
    token: 'testToken',
  };

  const renderMessenger = () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Messenger />
      </AuthContext.Provider>
    );
  };

  test('renders Messenger component correctly', () => {
    renderMessenger();

    // Check if Sidebar is rendered
    expect(screen.getByText('Sidebar')).toBeInTheDocument();

    // Check if the conversation UI is rendered
    expect(screen.getByText('Conversation')).toBeInTheDocument();

    // Check if ChatOnline is rendered
    expect(screen.getByText('ChatOnline')).toBeInTheDocument();
  });

  test('handles new conversation creation', async () => {
    renderMessenger();

    const inputField = screen.getByPlaceholderText('Converse with friend');
    const submitButton = screen.getByText('Make Conversation with this fellow');

    fireEvent.change(inputField, { target: { value: 'friend@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.get).toHaveBeenCalled()); // Verify API call for creating a conversation
  });

  test('handles sending a new message', async () => {
    renderMessenger();

    const messageInput = screen.getByPlaceholderText('Write something...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(messageInput, { target: { value: 'Hello, World!' } });
    fireEvent.click(sendButton);

    await waitFor(() => expect(axios.get).toHaveBeenCalled()); // Ensure message sending API is triggered
  });

  test('displays "No Conversation" when no conversation is selected', () => {
    renderMessenger();

    // Check if the "No Conversation" message appears when no conversation is selected
    expect(screen.getByText('Open a conversation to start a chat. 📬')).toBeInTheDocument();
  });

  test('sets current chat when a conversation is clicked', () => {
    renderMessenger();

    const conversationElement = screen.getByText('Conversation');
    fireEvent.click(conversationElement);

    // Ensure the current chat is set
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  test('uses cached messages when available', () => {
    renderMessenger();

    // Simulate setting a cached conversation
    const cachedMessages = [{ sender: 'testUserId', text: 'Cached message', createdAt: Date.now() }];
    axios.get.mockResolvedValueOnce({ data: cachedMessages });

    const conversationElement = screen.getByText('Conversation');
    fireEvent.click(conversationElement);

    // Verify that cached messages are displayed
    expect(screen.getByText('Cached message')).toBeInTheDocument();
  });
});

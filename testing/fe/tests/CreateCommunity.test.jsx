import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCommunity from '../../../src/components/CreateCommunity';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

// Mocking the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mocking the ToastContainer to prevent actual toasts during testing
jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => null),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mocking the global fetch function for API calls
global.fetch = jest.fn();

describe('CreateCommunity Component', () => {
  let navigate;

  beforeEach(() => {
    // Reset the mock before each test
    navigate = useNavigate();
    fetch.mockClear();
  });

  test('renders CreateCommunity form correctly', () => {
    render(<CreateCommunity />);

    // Check for the presence of form fields and buttons
    expect(screen.getByLabelText(/Community Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Community Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Community Type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Community/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('displays error message when API fails', async () => {
    // Set up fetch to simulate an error
    fetch.mockResolvedValueOnce({ ok: false, json: () => ({ error: 'Server error' }) });

    render(<CreateCommunity />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Community Name/i), {
      target: { value: 'Test Community' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Community/i }));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/Community creation failed/i));

    // Check if error message is displayed
    expect(screen.getByText('Community creation failed. Please try again.')).toBeInTheDocument();
  });

  test('navigates to /explore on successful community creation', async () => {
    // Set up fetch to simulate a successful response
    fetch.mockResolvedValueOnce({ ok: true });

    render(<CreateCommunity />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Community Name/i), {
      target: { value: 'Test Community' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Community/i }));

    // Wait for the success message to appear
    await waitFor(() => screen.getByText(/Community created/i));

    // Check if the navigate function is called
    expect(navigate).toHaveBeenCalledWith('/explore');
  });

  test('displays success message after community is created', async () => {
    // Set up fetch to simulate a successful response
    fetch.mockResolvedValueOnce({ ok: true });

    render(<CreateCommunity />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Community Name/i), {
      target: { value: 'Test Community' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Community/i }));

    // Wait for the success message
    await waitFor(() => screen.getByText(/Community created/i));

    // Check if the success message is shown
    expect(screen.getByText('Community created !')).toBeInTheDocument();
  });

  test('shows loading state while creating community', () => {
    // Set up fetch to simulate a pending request
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<CreateCommunity />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Community Name/i), {
      target: { value: 'Test Community' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    });

    // Submit the form and check loading state
    fireEvent.click(screen.getByRole('button', { name: /Create Community/i }));

    expect(screen.getByRole('button', { name: /Creating.../i })).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../../src/components/Login';
import { AuthContext } from '../../../src/hooks/useAuthContext';

vi.mock('../../../src/hooks/useAuthContext', () => ({
  useAuthContext: vi.fn(() => ({ dispatch: vi.fn() })),
}));

describe('Login Component', () => {
  const mockDispatch = vi.fn();
  const mockServerUrl = 'http://mockserver.com/api/login';

  beforeAll(() => {
    vi.stubGlobal('process', {
      env: {
        REACT_APP_SERVER_URL: 'http://mockserver.com',
      },
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form fields', () => {
    render(
      <AuthContext.Provider value={{ dispatch: mockDispatch }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/login to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('displays error message for invalid fake login', async () => {
    render(
      <AuthContext.Provider value={{ dispatch: mockDispatch }}>
        <Login />
      </AuthContext.Provider>
    );

    // Toggle fake login
    const fakeLoginCheckbox = screen.getByLabelText(/use fake login/i);
    fireEvent.click(fakeLoginCheckbox);

    // Fill form with invalid credentials
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  it('handles successful fake login', async () => {
    render(
      <AuthContext.Provider value={{ dispatch: mockDispatch }}>
        <Login />
      </AuthContext.Provider>
    );

    // Toggle fake login
    const fakeLoginCheckbox = screen.getByLabelText(/use fake login/i);
    fireEvent.click(fakeLoginCheckbox);

    // Fill form with valid fake credentials
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/logged in successfully \(fake\)!/i)).toBeInTheDocument();
    });

    // Ensure dispatch was called
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOGIN',
      payload: expect.objectContaining({ email: 'test@test.com', token: 'fake-jwt-token' }),
    });
  });

  it('handles failed real login', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'login failed' }),
    });

    render(
      <AuthContext.Provider value={{ dispatch: mockDispatch }}>
        <Login />
      </AuthContext.Provider>
    );

    // Fill form with invalid credentials
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  it('handles successful real login', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ email: 'test@test.com', token: 'valid-jwt-token' }),
    });

    render(
      <AuthContext.Provider value={{ dispatch: mockDispatch }}>
        <Login />
      </AuthContext.Provider>
    );

    // Fill form with valid credentials
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/logged in successfully!/i)).toBeInTheDocument();
    });

    // Ensure dispatch was called
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOGIN',
      payload: expect.objectContaining({ email: 'test@test.com', token: 'valid-jwt-token' }),
    });
  });
});

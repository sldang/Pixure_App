import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import EditProfile from '../../../src/components/EditProfile'; 
import { ToastContainer } from 'react-toastify';

// Mocking react-router-dom's useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mocking react-toastify's ToastContainer and toast
vi.mock('react-toastify', () => ({
  ToastContainer: () => <div>ToastContainer</div>,
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('EditProfile Component', () => {
  let navigate;

  beforeEach(() => {
    navigate = vi.fn(); // Reset the mock before each test
  });

  it('should render the form correctly', () => {
    render(<EditProfile />);

    // Check that the form fields are rendered
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/)).toBeInTheDocument();
  });

  it('should show error if required fields are empty', async () => {
    render(<EditProfile />);

    // Simulate form submission with empty fields
    fireEvent.click(screen.getByText(/Save Changes/));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please fill out all required fields!");
    });
  });

  it('should show error if passwords do not match', async () => {
    render(<EditProfile />);

    // Fill out the form with matching values except passwords
    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/Zip Code/), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/), { target: { value: 'Password321!' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Save Changes/));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Passwords do not match!");
    });
  });

  it('should successfully update profile and navigate', async () => {
    render(<EditProfile />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/Zip Code/), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/), { target: { value: 'Password123!' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Save Changes/));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Profile updated successfully!");
      expect(navigate).toHaveBeenCalledWith('/profile');
    });
  });
});

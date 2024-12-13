import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Signup from '../../../src/components/Signup';  
import { signupFields } from '../../../src/constants/formFields';  

vi.mock('../../../src/constants/formFields', () => ({
  signupFields: [
    { id: 'firstname', labelText: 'First Name', labelFor: 'firstname', name: 'firstname', type: 'text', isRequired: true, placeholder: 'Enter first name' },
    { id: 'lastname', labelText: 'Last Name', labelFor: 'lastname', name: 'lastname', type: 'text', isRequired: true, placeholder: 'Enter last name' },
    { id: 'email-address', labelText: 'Email Address', labelFor: 'email-address', name: 'email', type: 'email', isRequired: true, placeholder: 'Enter email' },
    { id: 'password', labelText: 'Password', labelFor: 'password', name: 'password', type: 'password', isRequired: true, placeholder: 'Enter password' },
    { id: 'zipcode', labelText: 'Zip Code', labelFor: 'zipcode', name: 'zipcode', type: 'text', isRequired: true, placeholder: 'Enter zipcode' }
  ]
}));

describe('Signup Component', () => {
  it('should render all input fields', () => {
    render(<Signup />);

    // Check if the input fields are rendered correctly
    signupFields.forEach(field => {
      expect(screen.getByLabelText(field.labelText)).toBeInTheDocument();
    });
  });

  it('should update state when input fields are changed', () => {
    render(<Signup />);
    const firstNameInput = screen.getByLabelText('First Name');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    expect(firstNameInput.value).toBe('John');
  });

  it('should handle successful form submission', async () => {
    // Mock the fetch function
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<Signup />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } });

    // Submit the form
    fireEvent.click(screen.getByText('signup'));

    // Wait for the success message to appear
    await waitFor(() => screen.getByText('Account created successfully!'));

    // Check if the success message is displayed
    expect(screen.getByText('Account created successfully!')).toBeInTheDocument();
  });

  it('should handle error during form submission', async () => {
    // Mock the fetch function to simulate an error
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Account creation failed' }),
    });

    render(<Signup />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } });

    // Submit the form
    fireEvent.click(screen.getByText('signup'));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText('Account creation failed. Please try again.'));

    // Check if the error message is displayed
    expect(screen.getByText('Account creation failed. Please try again.')).toBeInTheDocument();
  });

  it('should show loading spinner during submission', async () => {
    // Mock the fetch function to simulate a delay
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<Signup />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } });

    // Submit the form
    fireEvent.click(screen.getByText('signup'));

    // Check if the loading spinner is shown
    expect(screen.getByText('Creating account...')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import SignupPage from '../../../src/pages/SignupPage'; 

describe('SignupPage Component', () => {

  test('renders Signup component', () => {
    render(<SignupPage />);

    // Check if the Signup component is rendered
    expect(screen.getByText('Sign Up')).toBeInTheDocument(); // Adjust if "Sign Up" text exists or change it accordingly
  });

  test('renders Signup container with correct class', () => {
    render(<SignupPage />);

    // Check if the container element has the correct class
    const container = screen.getByClass('signup-container');
    expect(container).toBeInTheDocument();
  });

  test('renders the entire SignupPage layout', () => {
    render(<SignupPage />);

    // Check if the page elements are correctly laid out
    expect(screen.getByText('Sign Up')).toBeInTheDocument(); // Again, adjust the text selector if necessary
    expect(screen.getByClass('signup-page')).toBeInTheDocument();
  });
});

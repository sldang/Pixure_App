import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FormAction from './FormAction'; // Adjust the path as needed

describe('FormAction Component', () => {
  it('should render a button with the correct text', () => {
    // Create a mock handleSubmit function
    const handleSubmit = vi.fn();

    // Render the component
    render(<FormAction handleSubmit={handleSubmit} text="Submit Form" />);

    // Check if the button is rendered with the correct text
    const button = screen.getByRole('button', { name: /submit form/i });
    expect(button).toBeInTheDocument();
  });

  it('should call handleSubmit on button click', () => {
    const handleSubmit = vi.fn();

    render(<FormAction handleSubmit={handleSubmit} text="Submit Form" />);

    const button = screen.getByRole('button', { name: /submit form/i });

    // Simulate button click (which triggers handleSubmit)
    fireEvent.click(button);

    // Check if handleSubmit was called
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not render anything if type is not "Button"', () => {
    const handleSubmit = vi.fn();

    // Render the component with a type other than "Button"
    const { container } = render(<FormAction handleSubmit={handleSubmit} type="Link" text="Submit Form" />);

    // Ensure no button is rendered
    expect(container.querySelector('button')).toBeNull();
  });
});

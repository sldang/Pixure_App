import { render, screen, fireEvent } from 'vitest';
import FormExtra from '../../../src/components/FormExtra';

describe('FormExtra Component', () => {
  it('renders the checkbox with the correct label', () => {
    render(<FormExtra />);

    // Verify checkbox and label are present
    const checkbox = screen.getByRole('checkbox', { name: /remember me/i });
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
  });

  it('toggles the checkbox state on click', () => {
    render(<FormExtra />);

    const checkbox = screen.getByRole('checkbox', { name: /remember me/i });

    // Initial state: unchecked
    expect(checkbox).not.toBeChecked();

    // Click to check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click to uncheck
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../src/components/Input';

describe('Input Component', () => {
  const mockHandleChange = vi.fn();

  it('renders the input with all provided props', () => {
    render(
      <Input
        handleChange={mockHandleChange}
        value="test value"
        labelText="Test Label"
        labelFor="test-input"
        id="test-input"
        name="testName"
        type="text"
        isRequired={true}
        placeholder="Enter text"
        customClass=" additional-class"
      />
    );

    // Check if the label exists
    const label = screen.getByLabelText('Test Label');
    expect(label).toBeInTheDocument();

    // Check input attributes
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'testName');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveValue('test value');
    expect(input).toHaveClass('rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm additional-class');
  });

  it('handles onChange event correctly', () => {
    render(
      <Input
        handleChange={mockHandleChange}
        value=""
        labelText="Test Input"
        labelFor="test-input"
        id="test-input"
        name="testName"
        type="text"
        placeholder="Type here"
      />
    );

    const input = screen.getByRole('textbox');

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('renders with minimal required props', () => {
    render(
      <Input
        handleChange={mockHandleChange}
        value=""
        labelText="Minimal Input"
        labelFor="minimal-input"
        id="minimal-input"
        name="minimalName"
        type="text"
      />
    );

    const input = screen.getByRole('textbox');

    // Check input attributes
    expect(input).toHaveAttribute('id', 'minimal-input');
    expect(input).toHaveAttribute('name', 'minimalName');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toHaveAttribute('required');
    expect(input).toHaveValue('');
  });
});

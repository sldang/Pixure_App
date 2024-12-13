import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../../client/src/App';
import axios from 'axios';
import { vi } from 'vitest';

// Mock the axios module using Vitest's mocking capabilities
vi.mock('axios');

describe('App Component', () => {
  it('renders the buttons and initial state', () => {
    // Mock data for the API response
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Test Data' }] });

    render(<App />);

    // Check that buttons are rendered
    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements).toHaveLength(12); // Assumes you have 12 buttons in `App.jsx`
  });

  it('fetches data and renders the table when a button is clicked', async () => {
    // Mock data for the API response
    const mockData = [{ id: 1, name: 'Test Data' }];
    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);

    // Wait for the initial fetch to be completed
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // Simulate a button click
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    // Wait for the data to appear in the document
    await waitFor(() => {
      expect(screen.getByText(/Test Data/i)).toBeInTheDocument();
    });

    // Check if the table is rendered with the correct data
    expect(screen.getByText(/id/i)).toBeInTheDocument(); // Column header check
    expect(screen.getByText(/1/i)).toBeInTheDocument(); // Data check
  });

  it('displays an error message if data fetching fails', async () => {
    // Mock axios to reject with an error
    axios.get.mockRejectedValue(new Error('Failed to fetch data.'));

    render(<App />);

    // Simulate a button click
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch data./i)).toBeInTheDocument();
    });
  });
});

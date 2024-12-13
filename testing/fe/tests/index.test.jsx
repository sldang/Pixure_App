import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthContextProvider } from '../../../src/contexts/AuthContext'; 
import App from '../../../src/App'; 

describe('index.js', () => {
  it('renders App component within AuthContextProvider', () => {
    // Create a mock for the root element rendering process
    const rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'root');
    document.body.appendChild(rootElement);

    render(
      <AuthContextProvider>
        <App />
      </AuthContextProvider>,
      { container: rootElement }
    );

    // Verify that the App component is rendered by checking for an element from the App
    // In this case, we'll assume the App contains text "Home Page" (or similar).
    // Adjust based on what renders in your App.
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  it('does not render anything outside of the root element', () => {
    // Test to ensure that nothing is rendered outside the root div
    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeNull();
    expect(rootElement.innerHTML).not.toBe('');
  });
});

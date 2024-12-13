import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../../src/components/Header';

describe('Header Component', () => {
  it('renders the header with the correct heading and paragraph', () => {
    render(
      <Router>
        <Header
          heading="Welcome to Pixure"
          paragraph="Already have an account?"
          linkName="Sign in"
          linkUrl="/signin"
        />
      </Router>
    );

    // Check heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome to Pixure');

    // Check paragraph text
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();

    // Check link text
    const link = screen.getByRole('link', { name: 'Sign in' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signin');
  });

  it('renders with default linkUrl when no linkUrl is provided', () => {
    render(
      <Router>
        <Header
          heading="Welcome to Pixure"
          paragraph="Don't have an account?"
          linkName="Sign up"
        />
      </Router>
    );

    // Check default link URL
    const link = screen.getByRole('link', { name: 'Sign up' });
    expect(link).toHaveAttribute('href', '#');
  });

  it('renders with only required props', () => {
    render(
      <Router>
        <Header heading="Welcome to Pixure" />
      </Router>
    );

    // Check if only the heading is rendered
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome to Pixure');

    // Check that optional elements are not rendered
    expect(screen.queryByText(/Already have an account?/i)).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});

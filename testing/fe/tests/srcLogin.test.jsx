import { render, screen } from '@testing-library/react';
import LoginPage from '../../../src/pages/LoginPage';
import Login from '../../../src/components/Login';

// Mock Login component
vi.mock('../../../src/components/Login', () => ({
  __esModule: true,
  default: () => <div>Login Component</div>,
}));

describe('LoginPage Component', () => {
  test('renders LoginPage with Login component', () => {
    render(<LoginPage />);

    // Check if the Login component is rendered
    expect(screen.getByText('Login Component')).toBeInTheDocument();

    // Check if the container divs are rendered
    expect(screen.getByClassName('login-page')).toBeInTheDocument();
    expect(screen.getByClassName('login-container')).toBeInTheDocument();
  });
});

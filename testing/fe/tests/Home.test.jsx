import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '../../../src/pages/Home';

// Mock child components
vi.mock('../../../src/components/HomeComponents/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar Component</div>,
}));

vi.mock('../../../src/components/HomeComponents/NewsFeed', () => ({
  default: () => <div data-testid="newsfeed">NewsFeed Component</div>,
}));

vi.mock('../../../src/components/HomeComponents/Rightbar', () => ({
  default: () => <div data-testid="rightbar">Rightbar Component</div>,
}));

describe('Home Component', () => {
  it('renders all three sections: Sidebar, NewsFeed, and Rightbar', () => {
    render(<Home />);

    // Check if Sidebar is rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    // Check if NewsFeed is rendered
    expect(screen.getByTestId('newsfeed')).toBeInTheDocument();

    // Check if Rightbar is rendered
    expect(screen.getByTestId('rightbar')).toBeInTheDocument();
  });

  it('has a parent container with the "flex" class', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toHaveClass('flex');
  });
});

// // // // import React, { useRef } from 'react';
// // // // import { render, screen, waitFor } from '@testing-library/react';
// // // // import { describe, it, vi, expect } from 'vitest';
// // // // import { MemoryRouter } from 'react-router-dom';
// // // // import { AuthContext } from '../../../src/contexts/AuthContext';
// // // // import App from '../../../src/App';

// // // // // Mock the components used in the App to isolate tests
// // // // vi.mock('./components/HomeComponents/Sidebar', () => ({
// // // //   default: () => <div>Sidebar</div>,
// // // // }));
// // // // vi.mock('./pages/Signup', () => ({
// // // //   default: () => <div>Signup Page</div>,
// // // // }));
// // // // vi.mock('./pages/Login', () => ({
// // // //   default: () => <div>Login Page</div>,
// // // // }));
// // // // vi.mock('./pages/Home', () => ({
// // // //   default: () => <div>Home Page</div>,
// // // // }));
// // // // vi.mock('./pages/Messenger', () => ({
// // // //   default: () => <div>Messenger Page</div>,
// // // // }));
// // // // vi.mock('./pages/Explore', () => ({
// // // //   default: () => <div>Explore Page</div>,
// // // // }));
// // // // vi.mock('./pages/Communities', () => ({
// // // //   default: () => <div>Communities Page</div>,
// // // // }));
// // // // vi.mock('./components/CreateCommunity', () => ({
// // // //   default: () => <div>Create Community</div>,
// // // // }));
// // // // vi.mock('./components/EditProfile', () => ({
// // // //   default: () => <div>Edit Profile</div>,
// // // // }));

// // // // describe('App Component', () => {
// // // //   it('renders public routes correctly when not authenticated', () => {
// // // //     render(
// // // //       <MemoryRouter initialEntries={['/signup']}>
// // // //         <AuthContext.Provider value={{ user: null }}>
// // // //           <App />
// // // //         </AuthContext.Provider>
// // // //       </MemoryRouter>
// // // //     );

// // // //     // Check if the Signup page is rendered
// // // //     expect(screen.getByText('Signup Page')).toBeInTheDocument();
// // // //   });

// // // //   it('redirects to home if user is authenticated and tries to access login', async () => {
// // // //     render(
// // // //       <MemoryRouter initialEntries={['/login']}>
// // // //         <AuthContext.Provider value={{ user: { name: 'Test User' } }}>
// // // //           <App />
// // // //         </AuthContext.Provider>
// // // //       </MemoryRouter>
// // // //     );

// // // //     // Wait for the component to render and check if redirected to home
// // // //     await waitFor(() => {
// // // //       expect(screen.getByText('Home Page')).toBeInTheDocument();
// // // //     });
// // // //   });

// // // //   it('renders the sidebar when the user is authenticated', () => {
// // // //     render(
// // // //       <MemoryRouter>
// // // //         <AuthContext.Provider value={{ user: { name: 'Test User' } }}>
// // // //           <App />
// // // //         </AuthContext.Provider>
// // // //       </MemoryRouter>
// // // //     );

// // // //     // Check if the Sidebar is rendered
// // // //     expect(screen.getByText('Sidebar')).toBeInTheDocument();
// // // //   });

// // // //   it('renders protected routes only when user is authenticated', async () => {
// // // //     render(
// // // //       <MemoryRouter initialEntries={['/messenger']}>
// // // //         <AuthContext.Provider value={{ user: null }}>
// // // //           <App />
// // // //         </AuthContext.Provider>
// // // //       </MemoryRouter>
// // // //     );

// // // //     // Check if user is redirected to login when not authenticated
// // // //     await waitFor(() => {
// // // //       expect(screen.getByText('Login Page')).toBeInTheDocument();
// // // //     });
// // // //   });
// // // // });

// // // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // // import { BrowserRouter } from 'react-router-dom';
// // // import { AuthContext } from '../../../src/contexts/AuthContext'; // Correct path for AuthContext
// // // import App from '../../../src/App'; // Correct path for App component
// // // import { vi } from 'vitest';

// // // describe('App Component', () => {
// // //   let mockUser;

// // //   beforeEach(() => {
// // //     mockUser = null; // Reset mock user state before each test
// // //   });

// // //   const renderWithAuthContext = (user) => {
// // //     return render(
// // //       <AuthContext.Provider value={{ user }}>
// // //         <BrowserRouter>
// // //           <App />
// // //         </BrowserRouter>
// // //       </AuthContext.Provider>
// // //     );
// // //   };

// // //   test('renders public routes when user is not authenticated', () => {
// // //     renderWithAuthContext(mockUser);

// // //     // Ensure that Login and Signup are rendered when user is not logged in
// // //     expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
// // //     expect(screen.getByText(/Log In/i)).toBeInTheDocument();

// // //     // Check if Sidebar is not rendered
// // //     expect(screen.queryByText(/Sidebar/i)).not.toBeInTheDocument();
// // //   });

// // //   test('renders protected routes when user is authenticated', async () => {
// // //     mockUser = { user: { id: '123', email: 'user@example.com' } };

// // //     renderWithAuthContext(mockUser);

// // //     // Ensure that HomePage and protected routes are rendered
// // //     expect(screen.getByText(/Home/i)).toBeInTheDocument();
// // //     expect(screen.getByText(/Messenger/i)).toBeInTheDocument();

// // //     // Check if Sidebar is rendered when user is logged in
// // //     expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
// // //   });

// // //   test('redirects to login page when trying to access protected route without authentication', async () => {
// // //     mockUser = null;

// // //     renderWithAuthContext(mockUser);

// // //     // Try to visit a protected route directly
// // //     fireEvent.click(screen.getByText(/Home/i)); // Assuming "Home" link is present

// // //     // Wait for the redirection to occur (check for login page)
// // //     await waitFor(() => expect(screen.getByText(/Log In/i)).toBeInTheDocument());
// // //   });

// // //   test('navigates to login page when user is already logged in and tries to visit login route', async () => {
// // //     mockUser = { user: { id: '123', email: 'user@example.com' } };

// // //     renderWithAuthContext(mockUser);

// // //     fireEvent.click(screen.getByText(/Log In/i));

// // //     // Check if the route redirects to HomePage when logged in
// // //     await waitFor(() => expect(screen.getByText(/Home/i)).toBeInTheDocument());
// // //   });

// // //   test('should render protected routes based on context value', async () => {
// // //     mockUser = { user: { id: '123', email: 'user@example.com' } };
// // //     renderWithAuthContext(mockUser);

// // //     // Test if HomePage is rendered as part of the protected routes
// // //     expect(screen.getByText(/Home/i)).toBeInTheDocument();
// // //   });

// // //   test('Sidebar is not rendered when user is not logged in', () => {
// // //     mockUser = null;

// // //     renderWithAuthContext(mockUser);

// // //     // Check if Sidebar is not visible when user is not logged in
// // //     expect(screen.queryByText(/Sidebar/i)).not.toBeInTheDocument();
// // //   });

// // //   test('Sidebar is rendered when user is logged in', () => {
// // //     mockUser = { user: { id: '123', email: 'user@example.com' } };

// // //     renderWithAuthContext(mockUser);

// // //     // Sidebar should be visible
// // //     expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
// // //   });
// // // });

// // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // import { MemoryRouter } from 'react-router-dom';
// // import { AuthContext } from '../../../src/contexts/AuthContext';
// // import { vi } from 'vitest';
// // import App from '../../../src/App';

// // // Mock the Community Provider to prevent errors
// // vi.mock('../../../src/contexts/CommunityContext', () => ({
// //   CommunityProvider: ({ children }) => children
// // }));

// // // Mock all imported page components to simplify testing
// // vi.mock('../../../src/pages/Signup', () => ({
// //   default: () => <div>Sign Up</div>
// // }));
// // vi.mock('../../../src/pages/Login', () => ({
// //   default: () => <div>Log In</div>
// // }));
// // vi.mock('../../../src/pages/Home', () => ({
// //   default: () => <div>Home</div>
// // }));
// // vi.mock('../../../src/pages/Home2', () => ({
// //   default: () => <div>Home2</div>
// // }));
// // vi.mock('../../../src/pages/Messenger', () => ({
// //   default: () => <div>Messenger</div>
// // }));
// // vi.mock('../../../src/components/HomeComponents/Sidebar', () => ({
// //   default: () => <div>Sidebar</div>
// // }));

// // describe('App Component', () => {
// //   const renderWithAuthContext = (user) => {
// //     return render(
// //       <AuthContext.Provider value={{ user }}>
// //         <MemoryRouter>
// //           <App />
// //         </MemoryRouter>
// //       </AuthContext.Provider>
// //     );
// //   };

// //   test('renders public routes when user is not authenticated', () => {
// //     renderWithAuthContext(null);

// //     expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
// //     expect(screen.queryByText(/Sidebar/i)).not.toBeInTheDocument();
// //   });

// //   test('renders protected routes when user is authenticated', () => {
// //     const mockUser = { id: '123', email: 'user@example.com' };
// //     renderWithAuthContext(mockUser);

// //     expect(screen.getByText(/Home/i)).toBeInTheDocument();
// //     expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
// //   });

// //   test('redirects to login page when trying to access protected route without authentication', async () => {
// //     renderWithAuthContext(null);

// //     // This assumes you have a way to navigate to a protected route in the test
// //     // You might need to adjust this based on your specific routing setup
// //     renderWithAuthContext(null, '/messenger');

// //     await waitFor(() => {
// //       expect(screen.getByText(/Log In/i)).toBeInTheDocument();
// //     });
// //   });

// //   test('redirects to home when logged in user tries to access login', () => {
// //     const mockUser = { id: '123', email: 'user@example.com' };
// //     renderWithAuthContext(mockUser);

// //     expect(screen.getByText(/Home/i)).toBeInTheDocument();
// //   });
// // });

// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { vi } from 'vitest';
// import App from '../../../src/App';
// import { AuthContext } from '../../../src/contexts/AuthContext';

// // Mock all page components
// vi.mock('../../src/pages/Signup', () => ({
//   default: () => <div>Sign Up Page</div>
// }));
// vi.mock('../../src/pages/Login', () => ({
//   default: () => <div>Login Page</div>
// }));
// vi.mock('../../src/pages/Home', () => ({
//   default: () => <div>Home Page</div>
// }));
// vi.mock('../../src/pages/Home2', () => ({
//   default: () => <div>Home2 Page</div>
// }));
// vi.mock('../../src/pages/Messenger', () => ({
//   default: () => <div>Messenger Page</div>
// }));
// vi.mock('../../src/components/HomeComponents/Sidebar', () => ({
//   default: () => <div>Sidebar</div>
// }));

// // Mock Community Provider to prevent context errors
// vi.mock('../../src/contexts/CommunityContext', () => ({
//   CommunityProvider: ({ children }) => children
// }));

// describe('App Component Routing', () => {
//   const renderWithAuthContext = (contextValue, initialRoute = '/') => {
//     return render(
//       <AuthContext.Provider value={contextValue}>
//         <MemoryRouter initialEntries={[initialRoute]}>
//           <App />
//         </MemoryRouter>
//       </AuthContext.Provider>
//     );
//   };

//   test('renders public routes when user is not authenticated', () => {
//     renderWithAuthContext({ user: null }, '/signup');
    
//     expect(screen.getByText(/Sign Up Page/i)).toBeInTheDocument();
//     expect(screen.queryByText(/Sidebar/i)).not.toBeInTheDocument();
//   });

//   test('renders protected routes when user is authenticated', () => {
//     const mockUser = { id: '123', email: 'user@example.com' };
//     renderWithAuthContext({ user: mockUser, dispatch: vi.fn() }, '/home');
    
//     expect(screen.getByText(/Home2 Page/i)).toBeInTheDocument();
//     expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
//   });

//   test('redirects to login page when trying to access protected route without authentication', async () => {
//     renderWithAuthContext({ user: null }, '/messenger');
    
//     await waitFor(() => {
//       expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
//     });
//   });

//   test('redirects to home when logged in user tries to access login', () => {
//     const mockUser = { id: '123', email: 'user@example.com' };
//     renderWithAuthContext({ user: mockUser, dispatch: vi.fn() }, '/login');
    
//     expect(screen.getByText(/Home2 Page/i)).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../../../src/App';
import { AuthContext } from '../../../src/contexts/AuthContext';

// Mock all page components
vi.mock('../../../src/pages/Signup', () => ({
  default: () => <div>Sign Up Page</div>
}));
vi.mock('../../../src/pages/Login', () => ({
  default: () => <div>Login Page</div>
}));
vi.mock('../../../src/pages/Home', () => ({
  default: () => <div>Home Page</div>
}));
vi.mock('../../../src/pages/Home2', () => ({
  default: () => <div>Home2 Page</div>
}));
vi.mock('../../../src/pages/Messenger', () => ({
  default: () => <div>Messenger Page</div>
}));
vi.mock('../../../src/components/HomeComponents/Sidebar', () => ({
  default: () => <div>Sidebar</div>
}));

// Mock Community Provider to prevent context errors
vi.mock('../../../src/contexts/CommunityContext', () => ({
  CommunityProvider: ({ children }) => children
}));

describe('App Component Routing', () => {
  const renderWithAuthContext = (contextValue, initialRoute = '/') => {
    return render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  const renderWithRouting = (contextValue, initialRoute = '/') => {
    return render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  test('renders public routes when user is not authenticated', () => {
    renderWithRouting({ user: null }, '/signup');
    
    expect(screen.getByText(/Sign Up Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sidebar/i)).not.toBeInTheDocument();
  });

  test('renders protected routes when user is authenticated', () => {
    const mockUser = { id: '123', email: 'user@example.com' };
    renderWithRouting({ user: mockUser, dispatch: vi.fn() }, '/home');
    
    expect(screen.getByText(/Home2 Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
  });

  test('redirects to login page when trying to access protected route without authentication', async () => {
    renderWithRouting({ user: null }, '/messenger');
    
    await waitFor(() => {
      expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });
  });

  test('redirects to home when logged in user tries to access login', () => {
    const mockUser = { id: '123', email: 'user@example.com' };
    renderWithRouting({ user: mockUser, dispatch: vi.fn() }, '/login');
    
    expect(screen.getByText(/Home2 Page/i)).toBeInTheDocument();
  });
});
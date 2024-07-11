import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@components/Root';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DocumentPage from './pages/DocumentPage';
import Document from '@components/document/Document';
import LogoutPage from './pages/LogoutPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <AuthPage /> },
      { path: 'signup', element: <AuthPage /> },
      { path: 'document', element: <DocumentPage /> },
      { path: 'document/:id', element: <Document /> },
      { path: 'logout', element: <LogoutPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

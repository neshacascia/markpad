import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@components/Root';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import './App.css';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <AuthPage /> },
      { path: 'signup', element: <AuthPage /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

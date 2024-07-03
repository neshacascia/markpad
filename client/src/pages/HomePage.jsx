import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { storeAuthValue } = useContext(AuthContext);

  return (
    <main>
      <h1>Welcome to Markpad!</h1>

      <div>
        <Link to="/signup" onClick={() => storeAuthValue('signup')}>
          Signup
        </Link>
        <Link to="/login" onClick={() => storeAuthValue('login')}>
          Login
        </Link>
      </div>
    </main>
  );
}

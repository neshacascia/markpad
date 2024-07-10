import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

export default function HomePage() {
  const { storeAuthValue, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      navigate('/document');
      setIsLoggedIn(true);
    }
  }, []);

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

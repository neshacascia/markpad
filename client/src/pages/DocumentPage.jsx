import { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import { AuthContext } from '../context/AuthContext';

export default function DocumentPage() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      setUser(true);
    }
  }, []);

  return (
    <>
      {user ? (
        <section>
          <h1>YOU HAVE BEEN AUTHENTICATED!!!!</h1>
          <Link to="/logout">Logout</Link>
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

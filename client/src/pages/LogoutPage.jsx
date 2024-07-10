import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function handleLogout() {
      try {
        const res = await axios.get('/api/auth/logout', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(res);
        setIsLoggedIn(false);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }

    handleLogout();
  }, []);

  return <p>Logging out...</p>;
}

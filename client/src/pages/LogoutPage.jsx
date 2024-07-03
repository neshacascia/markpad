import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LogoutPage() {
  const navigate = useNavigate();

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
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }

    handleLogout();
  }, []);

  return <p>Logging out...</p>;
}

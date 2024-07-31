import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import axios from 'axios';
import { baseURL } from '../utils/api';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function handleLogout() {
      try {
        const res = await axios.get(`${baseURL}/auth/logout`, {
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

  return (
    <main className="text-bloodOrange w-screen h-screen flex flex-col items-center justify-center">
      <p>Logging out...</p>;
      <LoadingSpinner />
    </main>
  );
}

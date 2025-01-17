import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

import homeImg from '../../public/assets/document.svg';
import axios from 'axios';
import { baseURL } from '../utils/api';

export default function HomePage() {
  const { storeAuthValue, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      navigate('/document');
      setIsLoggedIn(true);
    }
  }, []);

  async function handleDemoLogin() {
    try {
      const res = await axios.post(
        `${baseURL}/auth/login`,
        {
          email: import.meta.env.VITE_DEMO_USER_EMAIL,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        navigate('/document');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="bg-white w-screen h-screen flex flex-col-reverse justify-center md:flex-row md:justify-between items-center gap-4 px-10 pt-14 md:pt-[72px]">
      <div className="w-full flex flex-col items-center gap-5 md:w-3/4 md:items-start">
        <h1 className="text-2xl font-robotoSlab font-bold pb-5 md:text-4xl lg:text-[44px]">
          Welcome to Markpad!
        </h1>
        <p className="text-center leading-6 md:w-[85%] md:text-left">
          Effortlessly create and manage your Markdown documents with our
          user-friendly interface. Write your content and instantly view a
          formatted preview side by side. Easily save your formatted documents
          as PDFs.
        </p>
        <div className="w-full flex justify-center gap-6 pt-10 md:justify-start">
          <Link
            to="/signup"
            onClick={() => storeAuthValue('signup')}
            className="text-white bg-[#E46643] font-light flex justify-center items-center py-3 px-6 rounded hover:bg-orangeHover"
          >
            Get Started
          </Link>
          <button
            to="/login"
            onClick={handleDemoLogin}
            className="text-bloodOrange border-bloodOrange font-bold border-[1px] rounded py-3 px-8"
          >
            Explore Demo
          </button>
        </div>
      </div>

      <div className="w-1/2">
        <a href="https://storyset.com/work">
          <img
            src={homeImg}
            className="w-full"
            alt="Work illustrations by Storyset"
          />
        </a>
      </div>
    </main>
  );
}

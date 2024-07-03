import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function AuthPage(props) {
  const authValue = localStorage.getItem('authValue');
  const { storeAuthValue } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormInputs(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `/api/auth/${authValue}`,
        {
          email: formInputs.email,
          password: formInputs.password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res);

      if (res.status === 200 || res.status === 201) {
        navigate('/document');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <div>
        <h2>{authValue === 'login' ? 'Login' : 'Create an Account'}</h2>

        <form onSubmit={submitHandler}>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="name@email.com"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleInputChange}
            />
          </label>
          {authValue === 'signup' && (
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                onChange={handleInputChange}
              />
            </label>
          )}
          <button type="submit">
            {authValue === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        <p>
          {authValue === 'signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <Link
            to={authValue === 'signup' ? '/login' : '/signup'}
            onClick={() =>
              storeAuthValue(authValue === 'signup' ? 'login' : 'signup')
            }
          >
            {authValue === 'signup' ? 'Login' : 'Signup'} Now
          </Link>
        </p>
      </div>
    </section>
  );
}

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

  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function handleInputTouched(e) {
    const { name } = e.target;

    setFormTouched(prevState => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  const validationSchema = {
    email: value => value.trim() !== '' && value.includes('@'),
    password: value => value.trim() !== '' && value.length >= 8,
    confirmPassword: (value, formInputs) => value === formInputs.password,
  };

  function validateField(name, value, formInputs) {
    return validationSchema[name](value, formInputs);
  }

  function isFieldNotValid(name, value, formInputs, touched) {
    return !validateField(name, value, formInputs) && touched[name];
  }

  const emailNotValid = isFieldNotValid(
    'email',
    formInputs.email,
    formInputs,
    formTouched
  );

  const passwordNotValid = isFieldNotValid(
    'password',
    formInputs.password,
    formInputs,
    formTouched
  );

  const confirmPasswordLengthValid =
    formInputs.confirmPassword.trim() !== '' &&
    formInputs.confirmPassword.length >= 8;

  const confirmPasswordNotValid =
    !confirmPasswordLengthValid && formTouched.confirmPassword;

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function submitHandler(e) {
    e.preventDefault();

    const newErrors = {};

    if (emailNotValid) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (passwordNotValid) {
      newErrors.password = 'Password must have a minimum of 8 characters.';
    }

    if (confirmPasswordNotValid) {
      newErrors.confirmPassword =
        'Password must have a minimum of 8 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(prevState => ({
        ...prevState,
        ...newErrors,
      }));
    } else {
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
  }

  return (
    <section>
      <div>
        <h2>{authValue === 'login' ? 'Login' : 'Create an Account'}</h2>

        <form onSubmit={submitHandler} noValidate>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="name@email.com"
              onChange={handleInputChange}
              onBlur={handleInputTouched}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleInputChange}
              onBlur={handleInputTouched}
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
                onBlur={handleInputTouched}
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

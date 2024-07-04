import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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

  const passwordsMatch = formInputs.password === formInputs.confirmPassword;

  const [errorMessages, setErrorMessages] = useState({});

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  function handleTogglePassword(name) {
    setPasswordVisibility(prevState => {
      return {
        ...prevState,
        [name]: !prevState[name],
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const newErrors = {};

    if (emailNotValid || !formTouched.email) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (passwordNotValid || !formTouched.password) {
      newErrors.password = 'Password must have a minimum of 8 characters.';
    }

    if (confirmPasswordNotValid || !formTouched.confirmPassword) {
      newErrors.confirmPassword =
        'Password must have a minimum of 8 characters.';
    }

    if (!passwordsMatch) {
      newErrors.passwordsMatch =
        'Uh oh! The passwords you entered do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
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

        if (err.response.status === 409) {
          newErrors.email = err.response.data.msg;
          setErrorMessages(newErrors);
        }

        if (err.response.status === 401) {
          newErrors.password = err.response.data.msg;
          setErrorMessages(newErrors);
        }
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
            {errorMessages.email && <p>{errorMessages.email}</p>}
          </label>
          <label>
            Password
            <div>
              <input
                type={passwordVisibility.password ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                onChange={handleInputChange}
                onBlur={handleInputTouched}
              />
              <FontAwesomeIcon
                icon={passwordVisibility.password ? faEyeSlash : faEye}
                onClick={() => handleTogglePassword('password')}
              />
            </div>
            {errorMessages.password && <p>{errorMessages.password}</p>}
          </label>
          {authValue === 'signup' && (
            <label>
              Confirm Password
              <div>
                <input
                  type={
                    passwordVisibility.confirmPassword ? 'text' : 'password'
                  }
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleInputChange}
                  onBlur={handleInputTouched}
                />
                <FontAwesomeIcon
                  icon={passwordVisibility.confirmPassword ? faEyeSlash : faEye}
                  onClick={() => handleTogglePassword('confirmPassword')}
                />
              </div>
              {errorMessages.confirmPassword && (
                <p>{errorMessages.confirmPassword}</p>
              )}
            </label>
          )}
          {formTouched.password &&
            formTouched.confirmPassword &&
            !passwordsMatch && <p>{errorMessages.passwordsMatch}</p>}
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

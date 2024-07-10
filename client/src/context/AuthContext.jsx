import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function storeAuthValue(value) {
    if (value === 'signup') {
      localStorage.setItem('authValue', 'signup');
    } else if (value === 'login') {
      localStorage.setItem('authValue', 'login');
    }
  }

  return (
    <AuthContext.Provider
      value={{ storeAuthValue, user, setUser, isLoggedIn, setIsLoggedIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

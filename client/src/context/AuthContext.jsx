import { createContext } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
  function storeAuthValue(value) {
    if (value === 'signup') {
      localStorage.setItem('authValue', 'signup');
    } else if (value === 'login') {
      localStorage.setItem('authValue', 'login');
    }
  }

  return (
    <AuthContext.Provider value={{ storeAuthValue }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

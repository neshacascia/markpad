import { createContext, useState, useEffect } from 'react';

const UIContext = createContext();

function UIContextProvider(props) {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [modal, setModal] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [userSettings, setUserSettings] = useState(false);

  function openModal(modalKey) {
    setModal(modalKey);
  }

  function closeModal() {
    setModal(null);
  }

  const initialTheme = localStorage.getItem('theme') || 'light';
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleTheme() {
    setIsDarkMode(prevState => !prevState);
  }

  return (
    <UIContext.Provider
      value={{
        displaySidebar,
        setDisplaySidebar,
        modal,
        setModal,
        openModal,
        closeModal,
        showPreview,
        setShowPreview,
        userSettings,
        setUserSettings,
        toggleTheme,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}

export { UIContext, UIContextProvider };

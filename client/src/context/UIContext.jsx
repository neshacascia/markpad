import { createContext, useState } from 'react';

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
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}

export { UIContext, UIContextProvider };

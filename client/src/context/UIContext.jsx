import { createContext, useState } from 'react';

const UIContext = createContext();

function UIContextProvider(props) {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [modal, setModal] = useState(null);

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
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}

export { UIContext, UIContextProvider };

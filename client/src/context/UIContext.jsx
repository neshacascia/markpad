import { createContext, useState } from 'react';

const UIContext = createContext();

function UIContextProvider(props) {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [modal, setModal] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}

export { UIContext, UIContextProvider };

import { createContext, useState } from 'react';

const UIContext = createContext();

function UIContextProvider(props) {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <UIContext.Provider value={{ displaySidebar, setDisplaySidebar }}>
      {props.children}
    </UIContext.Provider>
  );
}

export { UIContext, UIContextProvider };

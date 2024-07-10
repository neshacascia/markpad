import { createContext, useState } from 'react';

const DocumentContext = createContext();

function DocumentContextProvider(props) {
  const [document, setDocument] = useState({
    name: '',
    content: '',
  });

  return (
    <DocumentContext.Provider value={{ document, setDocument }}>
      {props.children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentContextProvider };

import { createContext, useState } from 'react';

const DocumentContext = createContext();

function DocumentContextProvider(props) {
  const [document, setDocument] = useState({
    name: '',
    content: '',
  });
  const [allDocuments, setAllDocuments] = useState();

  return (
    <DocumentContext.Provider
      value={{ document, setDocument, allDocuments, setAllDocuments }}
    >
      {props.children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentContextProvider };

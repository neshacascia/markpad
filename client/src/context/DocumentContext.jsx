import { createContext, useState } from 'react';

const DocumentContext = createContext();

function DocumentContextProvider(props) {
  const [document, setDocument] = useState({
    name: '',
    content: '',
  });
  const [allDocuments, setAllDocuments] = useState();
  const [isDocumentUpdated, setIsDocumentUpdated] = useState();

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
        allDocuments,
        setAllDocuments,
        isDocumentUpdated,
        setIsDocumentUpdated,
      }}
    >
      {props.children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentContextProvider };

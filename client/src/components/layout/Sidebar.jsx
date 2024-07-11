import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import { UIContext } from '../../context/UIContext';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { setDocument, allDocuments } = useContext(DocumentContext);
  const { setDisplaySidebar } = useContext(UIContext);

  function createNewDocument() {
    setDocument({ name: '', content: '' });
    setDisplaySidebar(false);
  }

  const documentList = allDocuments.map(document => (
    <Link
      to={`/document/${document.id}`}
      key={document.id}
      onClick={() => {
        setDocument(document);
        setDisplaySidebar(false);
      }}
    >
      {document.name}
    </Link>
  ));

  return (
    <div>
      <span>Markpad</span>
      <div>
        <span>My Documents</span>
        {documentList}
        <button onClick={createNewDocument}>New Document</button>
      </div>
    </div>
  );
}

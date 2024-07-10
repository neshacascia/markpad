import { useContext } from 'react';
import { DocumentContext } from '../context/DocumentContext';
import { UIContext } from '../context/UIContext';

export default function Sidebar() {
  const { setDocument } = useContext(DocumentContext);
  const { setDisplaySidebar } = useContext(UIContext);

  function createNewDocument() {
    setDocument({ name: '', content: '' });
    setDisplaySidebar(false);
  }

  return (
    <div>
      <span>Markpad</span>
      <div>
        <span>My Documents</span>
        <button onClick={createNewDocument}>New Document</button>
      </div>
    </div>
  );
}

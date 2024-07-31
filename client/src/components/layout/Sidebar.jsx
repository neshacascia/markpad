import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import { UIContext } from '../../context/UIContext';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const { setDocument, allDocuments } = useContext(DocumentContext);
  const { setDisplaySidebar } = useContext(UIContext);

  function createNewDocument() {
    setDocument({ name: '', content: '' });
    setDisplaySidebar(false);
  }

  const documentList = allDocuments?.map(document => (
    <li className="flex items-center">
      <Link
        to={`/document/${document.id}`}
        key={document.id}
        onClick={() => {
          setDocument(document);
          setDisplaySidebar(false);
        }}
        className="flex items-center gap-4"
      >
        <FontAwesomeIcon icon={faFile} className="text-base" />
        <div className="flex flex-col justify-center">
          <span className="text-bodyGray text-[13px] font-light">
            {document.created_at}
          </span>
          <p className="text-[14px] -mt-[2px]">{document.name}</p>
        </div>
      </Link>
    </li>
  ));

  return (
    <div className="text-white bg-[#1D1F22] w-[250px] h-screen fixed left-0 top-0 bottom-0 py-7 px-6">
      <span className="font-title text-[15px] tracking-[8px] uppercase lg:hidden">
        Markpad
      </span>

      <div className="flex flex-col lg:-mt-7">
        <span className="text-bodyGray text-sm tracking-widest uppercase py-7">
          My Documents
        </span>
        <button
          onClick={createNewDocument}
          className="bg-bloodOrange text-[15px] rounded py-3 hover:bg-orangeHover"
        >
          + New Document
        </button>

        <ul className="flex flex-col gap-7 py-7">{documentList}</ul>
      </div>
    </div>
  );
}

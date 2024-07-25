import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentContext } from '../../context/DocumentContext';
import { AuthContext } from '../../context/AuthContext';
import { UIContext } from '../../context/UIContext';
import { getCookie } from '../../utils/cookies';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFile,
  faTrashCan,
  faFloppyDisk,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navigate = useNavigate();
  const { document, setDocument, setIsDocumentUpdated } =
    useContext(DocumentContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { setDisplaySidebar, openModal } = useContext(UIContext);

  function handleInputChange(e) {
    setDocument(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  }

  async function handleSaveDocument(e) {
    e.preventDefault();

    const currentDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    try {
      if (document.id) {
        const updatedDocumentData = {
          id: document.id,
          name: document.name.includes('.md')
            ? document.name
            : document.name + '.md',
          content: document.content,
        };

        const res = await axios.put(
          '/api/document/updateDocument',
          { updatedDocumentData },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
          }
        );

        console.log(res);
      } else {
        const documentData = {
          createdAt: formattedDate,
          name: document.name + '.md',
          content: document.content,
        };

        const res = await axios.post(
          '/api/document/saveDocument',
          { documentData },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
          }
        );

        const documentId = res.data.document_id;
        navigate(`/document/${documentId}`);
      }
      setIsDocumentUpdated(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav className="text-white bg-[#2B2D31] text-[15px] font-light w-full h-14 flex items-center gap-6 py-[19px] pr-6">
      {isLoggedIn && (
        <>
          <div className="text-white bg-blueGray w-14 h-14 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setDisplaySidebar(true)}
              className="text-xl"
            />
          </div>
          <div className="flex items-center gap-4 mr-auto">
            <FontAwesomeIcon icon={faFile} />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="welcome.md"
              value={document.name ? document.name : ''}
              onChange={handleInputChange}
              className="bg-transparent placeholder:text-white"
            />
          </div>
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => openModal('delete')}
            className="text-[#7C8187]"
          />
          <div className="bg-[#E46643] flex justify-center items-center p-3 rounded">
            <FontAwesomeIcon
              icon={faFloppyDisk}
              onClick={handleSaveDocument}
              className="text-xl"
            />
          </div>
          <FontAwesomeIcon icon={faUser} />{' '}
        </>
      )}
    </nav>
  );
}

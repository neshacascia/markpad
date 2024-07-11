import { useContext } from 'react';
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
  const { document, setDocument, setIsDocumentUpdated } =
    useContext(DocumentContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { setDisplaySidebar } = useContext(UIContext);

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

    const documentData = {
      createdAt: formattedDate,
      name: document.name + '.md',
      content: document.content,
    };

    const updatedDocumentData = {
      id: document.id,
      name: document.name + '.md',
      content: document.content,
    };

    try {
      if (document.id) {
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

        console.log(res);
      }
      setIsDocumentUpdated(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav>
      {isLoggedIn && (
        <>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setDisplaySidebar(true)}
          />
          <div>
            <FontAwesomeIcon icon={faFile} />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="welcome.md"
              value={document.name ? document.name : ''}
              onChange={handleInputChange}
            />
          </div>
          <FontAwesomeIcon icon={faTrashCan} />
          <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSaveDocument} />
          <FontAwesomeIcon icon={faUser} />{' '}
        </>
      )}
    </nav>
  );
}

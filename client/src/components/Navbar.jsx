import { useContext } from 'react';
import { DocumentContext } from '../context/DocumentContext';
import { AuthContext } from '../context/AuthContext';
import { UIContext } from '../context/UIContext';
import { getCookie } from '../utils/cookies';

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
  const { document, setDocument } = useContext(DocumentContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { setDisplaySidebar } = useContext(UIContext);

  function handleInputChange(e) {
    setDocument(prevState => {
      return {
        ...prevState,
        name: e.target.value + '.md',
      };
    });
  }

  async function handleSaveDocument(e) {
    e.preventDefault();

    const currentDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    const documentData = {
      userId: user.user_id,
      createdAt: formattedDate,
      name: document.name,
      content: document.content,
    };

    try {
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

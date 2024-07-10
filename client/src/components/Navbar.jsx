import { useContext } from 'react';
import { DocumentContext } from '../context/DocumentContext';
import { AuthContext } from '../context/AuthContext';

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
  const { user } = useContext(AuthContext);

  function handleInputChange(e) {
    setDocument(prevState => {
      return {
        ...prevState,
        name: e.target.value + '.md',
      };
    });
  }

  return (
    <nav>
      <FontAwesomeIcon icon={faBars} />

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
      <FontAwesomeIcon icon={faFloppyDisk} />
      <FontAwesomeIcon icon={faUser} />
    </nav>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFile,
  faTrashCan,
  faFloppyDisk,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [documentName, setDocumentName] = useState('welcome.md');

  function handleInputChange(e) {
    setDocumentName(e.target.value + '.md');
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
          placeholder={documentName}
          onChange={handleInputChange}
        />
      </div>

      <FontAwesomeIcon icon={faTrashCan} />
      <FontAwesomeIcon icon={faFloppyDisk} />
      <FontAwesomeIcon icon={faUser} />
    </nav>
  );
}

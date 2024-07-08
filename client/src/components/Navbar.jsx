import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFile,
  faTrashCan,
  faFloppyDisk,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav>
      <FontAwesomeIcon icon={faBars} />

      <div>
        <FontAwesomeIcon icon={faFile} />
        <input type="text" name="name" id="name" />
      </div>

      <FontAwesomeIcon icon={faTrashCan} />

      <FontAwesomeIcon icon={faFloppyDisk} />

      <FontAwesomeIcon icon={faUser} />
    </nav>
  );
}

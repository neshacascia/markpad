import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../utils/cookies';

export default function Delete() {
  const { document } = useContext(DocumentContext);
  const navigate = useNavigate();

  async function handleDeleteDocument() {
    try {
      const res = await axios.delete(
        `/api/document/deleteDocument/${document.id}`,
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
    <div>
      <h2>Delete this document?</h2>
      <p>
        Are you sure you want to delete the {`'${document.name}'`} document and
        its contents? This action cannot be reversed.
      </p>
      <button onClick={handleDeleteDocument}>Confirm & Delete</button>
    </div>
  );
}

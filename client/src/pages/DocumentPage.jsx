import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import { AuthContext } from '../context/AuthContext';
import { DocumentContext } from '../context/DocumentContext';
import Document from '@components/document/Document';

import { defaultMarkdown } from '../defaultMarkdown';
import axios from 'axios';
import { baseURL } from '../utils/api';

export default function DocumentPage() {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);
  const { setDocument, setAllDocuments } = useContext(DocumentContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      setIsLoggedIn(true);
    }

    async function getAllDocuments() {
      try {
        const res = await axios.get(`${baseURL}/document/getAllDocuments`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
          },
        });

        const { documents, user } = res.data;
        setAllDocuments(documents);
        setUser(user);

        if (documents?.length > 0) {
          navigate(`/document/${documents[0].id}`);
        } else {
          setDocument(defaultMarkdown);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getAllDocuments();
  }, []);

  return (
    <main>
      {isLoggedIn ? (
        <section>
          <Document />
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </main>
  );
}

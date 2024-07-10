import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import { AuthContext } from '../context/AuthContext';
import { DocumentContext } from '../context/DocumentContext';
import { UIContext } from '../context/UIContext';
import Editor from '@components/Editor';
import Preview from '@components/Preview';
import Sidebar from '../components/Sidebar';

import { defaultMarkdown } from '../defaultMarkdown';
import axios from 'axios';

export default function DocumentPage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { document, setDocument, setAllDocuments } =
    useContext(DocumentContext);
  const { displaySidebar } = useContext(UIContext);

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      setDocument(defaultMarkdown);
      setIsLoggedIn(true);
    }

    async function getAllDocuments() {
      try {
        const res = await axios.get('/api/document/getAllDocuments', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
          },
        });

        setAllDocuments(res.data.documents);
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
          <span>Markdown</span>
          <Editor document={document} setDocument={setDocument} />{' '}
          <span>Preview</span>
          <Preview markdown={document.content} />
          {displaySidebar && <Sidebar />}
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </main>
  );
}

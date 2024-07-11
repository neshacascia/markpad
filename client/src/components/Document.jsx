import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentContext } from '../context/DocumentContext';
import { AuthContext } from '../context/AuthContext';
import { UIContext } from '../context/UIContext';
import Editor from './Editor';
import Preview from './Preview';
import Sidebar from './Sidebar';
import { getCookie } from '../utils/cookies';
import axios from 'axios';

export default function Document() {
  const { id } = useParams();
  const { document, setDocument, setAllDocuments } =
    useContext(DocumentContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { displaySidebar } = useContext(UIContext);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      setIsLoggedIn(true);
    }

    if (id) {
      setLoadingData(true);
      async function fetchData() {
        try {
          const [documentRes, allDocumentsRes] = await Promise.all([
            axios.get(`/api/document/${id}`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
              },
            }),
            axios.get('/api/document/getAllDocuments', {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
              },
            }),
          ]);

          const { document } = documentRes.data;
          const { documents } = allDocumentsRes.data;

          setDocument(document);
          setAllDocuments(documents);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingData(false);
        }
      }
      fetchData();
    }
  }, [id]);

  return (
    <main>
      {loadingData ? (
        <p>Loading...</p>
      ) : (
        <section>
          <span>Markdown</span>
          <Editor document={document} setDocument={setDocument} />{' '}
          <span>Preview</span>
          <Preview markdown={document.content} />
        </section>
      )}
      {displaySidebar && <Sidebar />}
    </main>
  );
}

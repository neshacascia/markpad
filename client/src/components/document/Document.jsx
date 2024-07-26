import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentContext } from '../../context/DocumentContext';
import { AuthContext } from '../../context/AuthContext';
import { UIContext } from '../../context/UIContext';
import Editor from './Editor';
import Preview from './Preview';
import Sidebar from '@components/layout/Sidebar';
import Delete from './Delete';
import { getCookie } from '../../utils/cookies';
import axios from 'axios';

export default function Document() {
  const { id } = useParams();
  const {
    document,
    setDocument,
    setAllDocuments,
    isDocumentUpdated,
    setIsDocumentUpdated,
  } = useContext(DocumentContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { displaySidebar, modal, showPreview, setShowPreview } =
    useContext(UIContext);
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
          setIsDocumentUpdated(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingData(false);
        }
      }
      fetchData();
    }
  }, [id, isDocumentUpdated]);

  const modalComponents = {
    delete: Delete,
  };

  const ModalComponent = modalComponents[modal];

  return (
    <main className="w-screen flex pt-14">
      {displaySidebar && <Sidebar />}
      {loadingData ? (
        <p>Loading...</p>
      ) : (
        <section>
          <section className="w-screen md:hidden">
            {!showPreview ? (
              <Editor
                document={document}
                setDocument={setDocument}
                setShowPreview={setShowPreview}
              />
            ) : (
              <Preview
                markdown={document.content}
                setShowPreview={setShowPreview}
              />
            )}
          </section>
          <section className="hidden w-screen md:flex">
            <Editor
              document={document}
              setDocument={setDocument}
              setShowPreview={setShowPreview}
            />
            <Preview
              markdown={document.content}
              setShowPreview={setShowPreview}
            />
          </section>
        </section>
      )}
      {ModalComponent && <ModalComponent />}
    </main>
  );
}

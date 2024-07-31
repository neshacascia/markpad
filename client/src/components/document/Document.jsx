import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentContext } from '../../context/DocumentContext';
import { AuthContext } from '../../context/AuthContext';
import { UIContext } from '../../context/UIContext';
import Editor from './Editor';
import Preview from './Preview';
import Sidebar from '@components/layout/Sidebar';
import Delete from './Delete';
import LoadingSpinner from '../ui/LoadingSpinner';
import { getCookie } from '../../utils/cookies';
import axios from 'axios';
import { baseURL } from '../../utils/api';

export default function Document() {
  const { id } = useParams();
  const {
    document,
    setDocument,
    setAllDocuments,
    isDocumentUpdated,
    setIsDocumentUpdated,
  } = useContext(DocumentContext);
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const {
    displaySidebar,
    modal,
    showPreview,
    setShowPreview,
    setUserSettings,
  } = useContext(UIContext);
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
            axios.get(`${baseURL}/document/${id}`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
              },
            }),
            axios.get(`${baseURL}/document/getAllDocuments`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
              },
            }),
          ]);

          const { document } = documentRes.data;
          const { documents, user } = allDocumentsRes.data;

          setDocument(document);
          setAllDocuments(documents);
          setIsDocumentUpdated(false);
          setUser(user);
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
    <main
      onClick={() => setUserSettings(false)}
      className="w-screen flex pt-14 md:pt-[72px]"
    >
      {displaySidebar && <Sidebar />}
      {loadingData ? (
        <LoadingSpinner />
      ) : (
        <section className="w-screen">
          <section
            className={`w-screen md:hidden ${
              displaySidebar ? 'pl-[250px] w-auto' : ''
            }`}
          >
            {!showPreview ? (
              <Editor
                document={document}
                setDocument={setDocument}
                setShowPreview={setShowPreview}
              />
            ) : (
              <Preview
                markdown={document.content}
                document={document}
                setShowPreview={setShowPreview}
              />
            )}
          </section>
          <section
            className={`hidden w-screen md:flex ${
              displaySidebar ? 'md:pl-[250px] md:w-auto' : ''
            }`}
          >
            <Editor
              document={document}
              setDocument={setDocument}
              showPreview={showPreview}
              setShowPreview={setShowPreview}
            />
            <Preview
              markdown={document.content}
              document={document}
              showPreview={showPreview}
              setShowPreview={setShowPreview}
            />
          </section>
        </section>
      )}
      {ModalComponent && <ModalComponent />}
    </main>
  );
}

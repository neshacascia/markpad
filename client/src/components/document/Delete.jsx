import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import { UIContext } from '../../context/UIContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import axios from 'axios';
import { getCookie } from '../../utils/cookies';
import { defaultMarkdown } from '../../defaultMarkdown';

export default function Delete() {
  const { document, allDocuments, setDocument } = useContext(DocumentContext);
  const { closeModal } = useContext(UIContext);
  const navigate = useNavigate();

  const documentIndex = allDocuments.findIndex(doc => doc.id === document.id);

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

      closeModal();

      if (allDocuments.length === 1) {
        setDocument(defaultMarkdown);
        navigate('/document');
      } else if (documentIndex === 0) {
        navigate(`/document/${allDocuments[1].id}`);
      } else {
        navigate(`/document/${allDocuments[documentIndex - 1].id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Modal>
      <div className="bg-white w-[343px] flex flex-col gap-4 rounded p-6">
        <h2 className="text-blueGray font-robotoSlab text-xl font-bold">
          Delete this document?
        </h2>
        <p className="font-bodyGray text-sm font-robotoSlab leading-6">
          Are you sure you want to delete the {`'${document.name}'`} document
          and its contents? This action cannot be reversed.
        </p>
        <button
          onClick={handleDeleteDocument}
          className="text-white bg-bloodOrange text-[15px] font-light w-full rounded py-3"
        >
          Confirm & Delete
        </button>
      </div>
    </Modal>
  );
}

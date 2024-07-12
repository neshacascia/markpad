import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';

export default function Delete() {
  const { document } = useContext(DocumentContext);

  return (
    <div>
      <h2>Delete this document?</h2>
      <p>
        Are you sure you want to delete the {`'${document.name}'`} document and
        its contents? This action cannot be reversed.
      </p>
      <button>Confirm & Delete</button>
    </div>
  );
}

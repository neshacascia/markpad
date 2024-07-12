import { useContext } from 'react';
import { UIContext } from '../../context/UIContext';

export default function Modal({ children }) {
  const { closeModal } = useContext(UIContext);

  function handleModalClick(e) {
    e.stopPropagation();
  }

  return (
    <div onClick={closeModal}>
      <div onClick={handleModalClick}>{children}</div>
    </div>
  );
}

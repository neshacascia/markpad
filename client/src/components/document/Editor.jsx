import { useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function Editor({
  document,
  setDocument,
  showPreview,
  setShowPreview,
}) {
  const textareaRef = useRef(null);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setDocument(prevDocument => ({
      ...prevDocument,
      [name]: value,
    }));

    adjustTextareaHeight(e.target);
  }

  function adjustTextareaHeight(textarea) {
    const savedScrollTop = window.scrollY;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    window.scrollTo(0, savedScrollTop);
  }

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }

    // recalculates the textare height whenver the window is resized
    const handleResize = () => adjustTextareaHeight(textareaRef.current);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener;
  }, [document.content]);

  return (
    <section
      className={`w-screen flex flex-col px-4 ${
        showPreview ? 'hidden' : 'md:w-1/2'
      } md:border-r-[1px] border-[#E4E4E4]`}
    >
      <div className="text-[#7C8187] bg-[#F5F5F5] flex justify-between items-center py-3 px-3 -mx-4">
        <span className="text-[14px] font-medium tracking-wider uppercase">
          Markdown
        </span>
        <FontAwesomeIcon
          icon={faEye}
          onClick={() => setShowPreview(true)}
          className="md:hidden hover:cursor-pointer"
        />
      </div>
      <textarea
        ref={textareaRef}
        name="content"
        value={document.content}
        onChange={handleInputChange}
        rows={10}
        className="text-blueGray bg-white font-markdown text-sm leading-6 py-4 resize-none overflow-hidden mb-6 focus:outline-none"
      />
    </section>
  );
}

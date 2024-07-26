import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function Editor({ document, setDocument, setShowPreview }) {
  function handleInputChange(e) {
    const { name, value } = e.target;

    setDocument(prevDocument => ({
      ...prevDocument,
      [name]: value,
    }));
  }

  return (
    <section className="w-screen h-screen flex flex-col px-4 md:w-1/2 md:border-r-[1px] border-[#E4E4E4]">
      <div className="text-[#7C8187] bg-[#F5F5F5] flex justify-between items-center py-3 px-3 -mx-4">
        <span className="text-[14px] font-medium tracking-wider uppercase">
          Markdown
        </span>
        <FontAwesomeIcon icon={faEye} onClick={() => setShowPreview(true)} />
      </div>
      <textarea
        name="content"
        value={document.content}
        onChange={handleInputChange}
        rows={10}
        className="text-blueGray bg-white font-markdown text-sm leading-6 h-screen py-4"
      />
    </section>
  );
}

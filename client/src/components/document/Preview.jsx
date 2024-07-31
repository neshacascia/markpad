import Markdown from 'react-markdown';
import html2pdf from 'html2pdf.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';

export default function Preview({
  markdown,
  document,
  showPreview,
  setShowPreview,
}) {
  function downloadAsPDF() {
    const element = window.document.getElementById('preview-content');
    const opt = {
      margin: [0, 0.5, 0.5, 0.5],
      filename: `${document.name.slice(0, -3)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  }

  return (
    <section
      className={`w-screen h-screen flex flex-col px-4 ${
        showPreview ? 'w-screen' : 'md:w-1/2'
      }`}
    >
      <div className="text-[#7C8187] dark:text-lightGray bg-[#F5F5F5] dark:bg-[#1D1F22] text-[14px] flex justify-between  gap-6 items-center py-3 px-3 -mx-4">
        <span className="font-medium tracking-wider uppercase mr-auto">
          Preview
        </span>
        <button
          onClick={downloadAsPDF}
          className="flex items-center gap-2 border-[1px] rounded px-3 py-[1px] hover:border-gray-600 hover:text-gray-600 dark:hover:border-gray-400 dark:hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faFileArrowDown} />
          Save as PDF
        </button>
        <FontAwesomeIcon
          icon={faEyeSlash}
          onClick={() => setShowPreview(false)}
          className="md:hidden"
        />
        <FontAwesomeIcon
          icon={showPreview ? faEyeSlash : faEye}
          onClick={() => setShowPreview(prevState => !prevState)}
          className="hidden md:block hover:cursor-pointer"
        />
      </div>
      <div id="preview-content">
        <Markdown
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-blueGray dark:text-white text-[32px] font-bold"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-blueGray dark:text-white text-[28px] font-light"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-blueGray dark:text-white text-2xl font-bold"
                {...props}
              />
            ),
            h4: ({ node, ...props }) => (
              <h4
                className="text-blueGray dark:text-white text-xl font-bold"
                {...props}
              />
            ),
            h5: ({ node, ...props }) => (
              <h5
                className="text-blueGray dark:text-white text-base font-bold"
                {...props}
              />
            ),
            h6: ({ node, ...props }) => (
              <h6 className="text-bloodOrange text-sm font-bold" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-bodyGray dark:text-lightGray text-sm leading-6"
                {...props}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                className="text-bodyGray dark:text-lightGray text-sm leading-6 list-decimal pl-6 list-outside"
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="text-bodyGray dark:text-lightGray text-sm leading-6 list-disc pl-6 list-outside"
                {...props}
              />
            ),
            li: ({ node, ...props }) => <li className="pl-2" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="dark:text-white bg-[#F5F5F5] dark:bg-[#2B2D31] font-bold text-sm leading-6 rounded border-l-4 border-bloodOrange p-6"
                {...props}
              />
            ),
            a: ({ node, ...props }) => <a className="underline" {...props} />,
            code: ({ node, ...props }) => (
              <code
                className="text-blueGray dark:text-white text-sm leading-6 w-full"
                {...props}
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                className="text-blueGray bg-[#F5F5F5] dark:bg-[#2B2D31] text-sm leading-6 rounded p-6 overflow-auto"
                {...props}
              />
            ),
          }}
          className={`font-robotoSlab flex flex-col gap-5 py-4 ${
            showPreview ? 'md:py-6 md:px-12 lg:px-96' : 'md:py-[22px] md:px-2'
          }`}
        >
          {markdown}
        </Markdown>
      </div>
    </section>
  );
}

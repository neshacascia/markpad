import Markdown from 'react-markdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Preview({ markdown, showPreview, setShowPreview }) {
  return (
    <section
      className={`w-screen h-screen flex flex-col px-4 ${
        showPreview ? 'w-screen' : 'md:w-1/2'
      }`}
    >
      <div className="text-[#7C8187] bg-[#F5F5F5] flex justify-between items-center py-3 px-3 -mx-4">
        <span className="text-[14px] font-medium tracking-wider uppercase">
          Preview
        </span>
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
      <Markdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-blueGray text-[32px] font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-blueGray text-[28px] font-light" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-blueGray text-2xl font-bold" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-blueGray text-xl font-bold" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-blueGray text-base font-bold" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-bloodOrange text-sm font-bold" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-bodyGray text-sm leading-6" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="text-bodyGray text-sm leading-6 list-decimal pl-6 list-outside"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="text-bodyGray text-sm leading-6 list-disc pl-6 list-outside"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="pl-2" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="bg-[#F5F5F5] font-bold text-sm leading-6 rounded border-l-4 border-bloodOrange p-6"
              {...props}
            />
          ),
          a: ({ node, ...props }) => <a className="underline" {...props} />,
          code: ({ node, ...props }) => (
            <code
              className="text-blueGray text-sm leading-6 w-full"
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              className="text-blueGray bg-[#F5F5F5] text-sm leading-6 rounded p-6 overflow-auto"
              {...props}
            />
          ),
        }}
        className={`font-robotoSlab flex flex-col gap-5 py-4 ${
          showPreview
            ? 'md:py-6 md:px-12 lg:px-[384px]'
            : 'md:py-[22px] md:px-2'
        }`}
      >
        {markdown}
      </Markdown>
    </section>
  );
}

import Markdown from 'react-markdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Preview({ markdown, setShowPreview }) {
  return (
    <section className="h-screen flex flex-col px-4">
      <div className="text-[#7C8187] bg-[#F5F5F5] flex justify-between items-center py-3 px-3 -mx-4">
        <span className="text-[14px] font-medium tracking-wider uppercase">
          Preview
        </span>
        <FontAwesomeIcon
          icon={faEyeSlash}
          onClick={() => setShowPreview(false)}
        />
      </div>
      <Markdown>{markdown}</Markdown>
    </section>
  );
}

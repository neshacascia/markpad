import Markdown from 'react-markdown';

export default function Preview({ markdown }) {
  return (
    <section>
      <Markdown>{markdown}</Markdown>
    </section>
  );
}

export default function Editor({ markdown, setMarkdown }) {
  function handleEditorChange(e) {
    setMarkdown(e.target.value);
  }

  return (
    <section>
      <textarea value={markdown} onChange={handleEditorChange} />
    </section>
  );
}

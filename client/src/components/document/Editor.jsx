export default function Editor({ document, setDocument }) {
  function handleInputChange(e) {
    const { name, value } = e.target;

    setDocument(prevDocument => ({
      ...prevDocument,
      [name]: value,
    }));
  }

  return (
    <section>
      <textarea
        name="content"
        value={document.content}
        onChange={handleInputChange}
        rows={10}
        cols={50}
      />
    </section>
  );
}

import { Link } from 'react-router-dom';

export default function DocumentPage() {
  return (
    <section>
      <h1>YOU HAVE BEEN AUTHENTICATED!!!!</h1>
      <Link to="/logout">Logout</Link>
    </section>
  );
}

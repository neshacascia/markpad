import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import { AuthContext } from '../context/AuthContext';
import Editor from '@components/Editor';
import Preview from '@components/Preview';

import { defaultMarkdown } from '../defaultMarkdown';

export default function DocumentPage() {
  const { user, setUser } = useContext(AuthContext);
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      setUser(true);
    }
  }, []);

  return (
    <>
      {user ? (
        <main>
          <Editor markdown={markdown} setMarkdown={setMarkdown} />{' '}
          <Preview markdown={markdown} />
        </main>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

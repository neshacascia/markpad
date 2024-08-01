import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DocumentContext } from '../../context/DocumentContext';
import { AuthContext } from '../../context/AuthContext';
import { UIContext } from '../../context/UIContext';
import { getCookie } from '../../utils/cookies';

import axios from 'axios';
import { baseURL } from '../../utils/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faX,
  faFile,
  faTrashCan,
  faFloppyDisk,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navigate = useNavigate();
  const { document, setDocument, setIsDocumentUpdated, allDocuments } =
    useContext(DocumentContext);
  const { isLoggedIn, user, storeAuthValue } = useContext(AuthContext);
  const {
    displaySidebar,
    setDisplaySidebar,
    openModal,
    userSettings,
    setUserSettings,
  } = useContext(UIContext);
  const [error, setError] = useState();

  function handleInputChange(e) {
    setDocument(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  }

  async function handleSaveDocument(e) {
    e.preventDefault();

    const currentDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    if (document.name.trim() === '') {
      setError('Document name is required.');
      return;
    }

    try {
      setError('');
      if (document.id) {
        const updatedDocumentData = {
          id: document.id,
          name: document.name.includes('.md')
            ? document.name
            : document.name + '.md',
          content: document.content,
        };

        const res = await axios.put(
          `${baseURL}/document/updateDocument`,
          { updatedDocumentData },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
          }
        );

        console.log(res);
        setIsDocumentUpdated(true);
      } else {
        const documentData = {
          createdAt: formattedDate,
          name: document.name.includes('.md')
            ? document.name
            : document.name + '.md',
          content: document.content,
        };

        const res = await axios.post(
          `${baseURL}/document/saveDocument`,
          { documentData },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
          }
        );

        const documentId = res.data.document_id;
        navigate(`/document/${documentId}`);
      }
      setIsDocumentUpdated(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav
      className={`text-white bg-[#2B2D31] text-[15px] font-light w-full h-14 flex items-center gap-6 py-[19px] pr-6 fixed md:h-[72px] ${
        displaySidebar ? 'pl-[250px] w-auto lg:w-full' : ''
      }`}
    >
      {isLoggedIn ? (
        <>
          <div
            className={`text-white bg-blueGray w-14 h-14 flex justify-center items-center md:w-[72px] md:h-[72px] ${
              displaySidebar ? 'px-7' : ''
            }`}
          >
            <FontAwesomeIcon
              icon={!displaySidebar ? faBars : faX}
              onClick={() => setDisplaySidebar(prevState => !prevState)}
              className="text-lg md:text-2xl hover:cursor-pointer"
            />
          </div>
          <div
            className={`flex items-center gap-4 mr-auto ${
              displaySidebar ? 'pr-[250px]' : ''
            }`}
          >
            <span className="hidden lg:block font-title text-[15px] tracking-[8px] uppercase">
              Markpad
            </span>
            <span className="hidden lg:block border-[#5A6069] h-10 border-r-[1px] mr-2"></span>

            <FontAwesomeIcon icon={faFile} className="md:text-lg" />
            <div className="flex flex-col">
              <span className="hidden md:block text-bodyGray text-[13px] font-light">
                Document Name
              </span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="welcome.md"
                value={document.name ? document.name : ''}
                onChange={handleInputChange}
                className="bg-transparent text-white placeholder:text-white/50 border-b border-b-transparent hover:border-b-neutral-300 focus:outline-none"
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs font-semibold text-center -ml-16 md:-ml-2 md:text-sm">
                {error}
              </p>
            )}
          </div>
          <button
            onClick={() => openModal('delete')}
            disabled={allDocuments?.length === 0}
            className="hover:cursor-pointer disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-[#7C8187] text-lg"
            />
          </button>

          <button
            onClick={handleSaveDocument}
            className="bg-[#E46643] flex justify-center items-center p-[10px] rounded md:gap-3 lg:px-4 hover:bg-orangeHover"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="text-xl" />
            <p className="hidden md:block text-[15px]">Save Changes</p>
          </button>
          <span className="hidden lg:block border-[#5A6069] h-10 border-r-[1px]"></span>
          <button
            onClick={() => setUserSettings(prevState => !prevState)}
            className="bg-[#e37455] flex justify-center items-center rounded-full"
          >
            <FontAwesomeIcon icon={faUser} className="text-lg p-3" />{' '}
          </button>
        </>
      ) : (
        <div className="w-full flex items-center">
          <Link
            to="/"
            className={`${
              isLoggedIn ? 'hidden ' : 'block'
            } font-title text-[15px] tracking-[8px] uppercase pl-6`}
          >
            Markpad
          </Link>

          <ul className="flex items-center gap-5 ml-auto">
            <li>
              <Link to="/login" onClick={() => storeAuthValue('login')}>
                Login
              </Link>
            </li>
            <li className="bg-[#E46643] flex justify-center items-center py-[10px] px-3 rounded md:gap-3 lg:px-4 hover:bg-orangeHover">
              <Link to="/signup" onClick={() => storeAuthValue('signup')}>
                Signup
              </Link>
            </li>
          </ul>
        </div>
      )}

      {userSettings && (
        <div className="bg-blueGray w-[343px] absolute flex flex-col gap-6 right-0 top-[74px] rounded p-6 mr-6">
          <div className="flex items-center gap-6">
            <div className="bg-[#e37455] w-14 h-14 flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faUser} className="text-2xl" />{' '}
            </div>
            <p className="font-medium">{user}</p>
          </div>

          <div className="hover:bg-[#565c65] -mx-6 px-6 py-3">
            <Link
              to="logout"
              onClick={() => setUserSettings(false)}
              className="text-[15px] font-medium flex items-center gap-12 pl-4"
            >
              {' '}
              <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

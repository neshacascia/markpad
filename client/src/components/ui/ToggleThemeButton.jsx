import { useContext } from 'react';
import { UIContext } from '../../context/UIContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ToggleThemeButton() {
  const { toggleTheme, isDarkMode } = useContext(UIContext);

  return (
    <div className="flex justify-center items-center gap-4 rounded-md py-3">
      <FontAwesomeIcon
        icon={faMoon}
        className={`${isDarkMode ? 'text-white' : 'text-[#5A6069]'}`}
      />

      <label className="w-12 h-6 relative inline-block">
        <input type="checkbox" className=" w-0 h-0 opacity-0" />
        <span
          onClick={toggleTheme}
          className={`slider round ${
            isDarkMode
              ? 'before:left-[4px] leftSlider'
              : 'before:right-[4px] rightSlider'
          }`}
        ></span>
      </label>

      <FontAwesomeIcon
        icon={faSun}
        className={`${!isDarkMode ? 'text-white' : 'text-[#5A6069]'}`}
      />
    </div>
  );
}

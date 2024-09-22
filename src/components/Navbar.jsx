// Navbar.jsx
import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    if (lang !== language) {
      changeLanguage(lang);
    }
    setIsOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-4 absolute w-full z-[100000000000000] font-bold uppercase">
      <div className="relative inline-block text-left h-[36px]">
        <button
          onClick={toggleDropdown}
          className="h-full flex items-center justify-center text-black focus:outline-none dark:text-white border-2 border-[#0a0a0a] w-[60px] dark:border-white bg-white dark:bg-[#0a0a0a]"
        >
          {language === "en" ? <span>EN</span> : <span>ES</span>}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={`absolute right-0 mt-2 bg-white border-2 border-black shadow-lg overflow-hidden dark:bg-black dark:border-white w-[60px]`}
          >
            <button
              onClick={() => handleLanguageChange("en")}
              className={`block text-left pl-1 py-1 w-full ${
                language === "en"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#333]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("es")}
              className={`block text-left pl-1 py-1 w-full ${
                language === "es"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#333]"
              }`}
            >
              ES
            </button>
          </div>
        )}
      </div>
      <button
        onClick={toggleTheme}
        className="ml-4 p-1 border-2 border-[#0a0a0a] dark:border-white bg-white dark:bg-[#0a0a0a]"
      >
        {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;

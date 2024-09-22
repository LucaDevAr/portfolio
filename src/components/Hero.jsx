import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Book from "./Book";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Alert } from "./Alert.jsx";
import { useEffect, useState } from "react";

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkIsTouchDevice = () => {
      setIsTouchDevice(navigator.maxTouchPoints > 0);
    };

    checkIsTouchDevice();

    window.addEventListener("resize", checkIsTouchDevice);

    return () => {
      window.removeEventListener("resize", checkIsTouchDevice);
    };
  }, []);

  return isTouchDevice;
}

const Hero = () => {
  const { language } = useLanguage();
  const isTouchDevice = useIsTouchDevice();

  const texts = {
    en: {
      bienvenida: "Welcome",
      a: "To",
      portafolio: "My Portfolio",
      gracias: "Thank You",
      agradecimiento:
        "I really appreciate you taking the time to check out my work. Feel free to reach out or explore more of my projects!",
    },
    es: {
      bienvenida: "Bienvenido",
      a: "a",
      portafolio: "Mi Portafolio",
      gracias: "Gracias",
      agradecimiento:
        "Agradezco mucho que te tomes el tiempo para revisar mi trabajo. ¡No dudes en contactarme o explorar más de mis proyectos!",
    },
  };

  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center overflow-hidden relative select-none"
    >
      <div className="absolute -left-10 top-1/2 -translate-y-[52%] hero-text">
        <span className="text-[#0a0a0a] dark:text-white opacity-15 text-[300px] font-bold">
          設計
        </span>
      </div>
      <div className="absolute left-1/2 -translate-x-[calc(100%+2rem)] top-1/2 -translate-y-[35%] welcome">
        <div className="z-10 text-[#0a0a0a] dark:text-white text-left">
          <h2 className="text-[4.5rem] mb-8 font-black text-center flex flex-col leading-[1]">
            <span>{texts[language].bienvenida}</span>
            <span>{texts[language].a}</span>
          </h2>
        </div>
      </div>
      <div className="absolute right-1/2 translate-x-[calc(100%+2rem)] flex flex-col max-w-[350px] thanks">
        <h2 className="text-6xl font-bold text-center mb-8 thanks-h">
          {texts[language].gracias}
        </h2>
        <p className="text-center text-2xl thanks-t">
          {texts[language].agradecimiento}
        </p>
      </div>
      <div className="book-sm absolute z-[10000000]">
        <Book isTouchDevice={isTouchDevice} />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 social z-[1000000000]">
        <div className="flex flex-col gap-4 items-end">
          <a
            href="https://github.com/LucaDevAr"
            target="_blank"
            className="group text-[#0a0a0a] dark:text-white flex gap-2"
          >
            <span className="text-base font-shuriken text-[#FF2200] hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 leading-[1.5]">
              Github
            </span>
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.instagram.com/luca.devarg/"
            target="_blank"
            className="group text-[#0a0a0a] dark:text-white flex gap-2"
          >
            <span className="text-base font-shuriken text-[#FF2200] hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300">
              Instagram
            </span>
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/luca-almir%C3%B3n-b270752b2/"
            target="_blank"
            className="group text-[#0a0a0a] dark:text-white flex gap-2"
          >
            <span className="text-base font-shuriken text-[#FF2200] hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300">
              Linkedin
            </span>
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <Alert isTouchDevice={isTouchDevice} />
    </section>
  );
};

export default Hero;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const Alert = ({ isTouchDevice }) => {
  const [isVisible, setIsVisible] = useState(false);

  const texts = {
    en: {
      alert: `Interact by tapping the screen. To turn the page, double-tap.`,
    },
    es: {
      alert: `Interactúa tocando la pantalla. Para pasar de página, haz un doble toque.`,
    },
  };

  useEffect(() => {
    if (isTouchDevice && !sessionStorage.getItem("alertShown")) {
      // Mostrar alerta después de 2 segundos
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      // Ocultar alerta después de 5.6 segundos
      const finalHideTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("alertShown", "true");
      }, 5600);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(finalHideTimer);
      };
    }
  }, [isTouchDevice]);

  return (
    <div
      className={`fixed flex bg-black justify-center items-center z-[999999999999] dark:bg-white w-screen h-screen transition-all duration-1000 ${
        isVisible
          ? "bg-opacity-50 dark:bg-opacity-10 opacity-100"
          : "bg-opacity-0 dark:bg-opacity-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-2xl w-[80%] max-w-[500px] absolute top-[30%] left-1/2 -translate-x-1/2 p-8 max-h-[600px] dark:bg-[#0a0a0a] dark:text-white transition-transform duration-1000 flex flex-col items-center justify-center gap-6 ${
          isVisible ? "translate-y-0" : "-translate-y-8"
        }`}
      >
        <p className="text-center text-lg">{texts.es.alert}</p>
        <hr className="w-1/2 h-[2px] bg-[#0a0a0a] dark:bg-white" />
        <p className="text-center text-lg">{texts.en.alert}</p>
      </div>
    </div>
  );
};

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../styles/book.css";
import { projectData } from "../data/projectData.js";
import {
  SiBootstrap,
  SiCss3,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import ProjectsSlider from "./Slider";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTheme } from "../context/ThemeContext.jsx";
import { RiMailSendLine } from "react-icons/ri";
import { useLanguage } from "../context/LanguageContext.jsx";
import emailjs from "emailjs-com";

const Book = ({ isTouchDevice }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isTurningPage, setIsTurningPage] = useState(true);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [buttonState, setButtonState] = useState("idle");
  const [active, setActive] = useState(null);

  const handleTouchClick = (e) => {
    if (!(active === "915" || active === "921" || active === "925")) {
      if (active === "925") {
        if (!isFormHovered) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    } else {
      handleSubmit();
    }
  };

  const isFormHovered = Boolean(
    formData.nombre || formData.email || formData.mensaje
  );

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (formData.nombre.length > 20) {
      newErrors.nombre = "El nombre no puede tener más de 20 caracteres.";
    }

    if (!formData.email) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Ingresa un correo válido.";
    }

    if (!formData.mensaje) {
      newErrors.mensaje = "El mensaje es obligatorio.";
    } else if (formData.mensaje.length > 500) {
      newErrors.mensaje = "El mensaje no puede tener más de 500 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? undefined : prevErrors[name],
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setButtonState("sending");

    const serviceID = "service_p2s301u";
    const templateID = "template_05xshbs";
    const userID = "BijIaHfu-hu_5KZ7e";

    const templateParams = {
      name: formData.nombre,
      email: formData.email,
      message: formData.mensaje,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setButtonState("success");
        setFormData({ nombre: "", email: "", mensaje: "" });

        setTimeout(() => {
          setButtonState("idle");
        }, 2000);
      },
      (err) => {
        console.error("FAILED...", err);
        setErrors({
          submit:
            "Hubo un problema al enviar el formulario. Inténtalo de nuevo.",
        });
        setButtonState("error");

        setTimeout(() => {
          setButtonState("idle");
        }, 2000);
      }
    );
  };

  const texts = {
    en: {
      portafolio: "My Portfolio",
      yo: "About Me",
      yoT: "I’m Luca, a Fullstack Developer. I specialize in frontend, but I also maintain a balanced focus on backend. I am constantly honing my skills and seeking new learning opportunities.",
      metas: "Goals",
      metasT:
        "My goal is to enter the development industry to enhance my skills and gain experience. I aspire to contribute to the growth of the tech sector in Argentina, lead emerging teams, and promote the expansion of the industry in the country.",
      tecnologias: "Technologies",
      proyectos: "Projects",
      contacto: "Contact",
      nombre: "Name",
      mensaje: "Write your message",
      enviar: "Send",
    },
    es: {
      portafolio: "Mi Portafolio",
      yo: "Sobre Mí",
      yoT: `Soy Luca, Fullstack Developer. Me especializo en frontend, pero también tengo un enfoque equilibrado en backend. Siempre estoy perfeccionando mis habilidades y buscando nuevas oportunidades de aprendizaje.`,
      metas: "Metas",
      metasT: `Mi objetivo es ingresar al mundo laboral del desarrollo para mejorar mis habilidades y adquirir experiencia. Aspiro a contribuir al crecimiento del sector tecnológico en Argentina, liderar equipos emergentes y fomentar la expansión de la industria en el país.`,
      tecnologias: "Tecnologías",
      proyectos: "Proyectos",
      contacto: "Contacto",
      nombre: "Nombre",
      mensaje: "Escribe tu mensaje",
      enviar: "Enviar",
    },
  };

  const DoubleTap = (callback) => {
    let lastTap = 0;

    return (e) => {
      const currentTime = new Date().getTime();
      const tapGap = currentTime - lastTap;

      if (tapGap < 300 && tapGap > 0) {
        callback(e);
      }

      lastTap = currentTime;
    };
  };

  useEffect(() => {
    const pages = document.getElementsByClassName("page");
    const totalPages = pages.length;
    var lastPageId = null;

    const removeFlippedFromPair = (index) => {
      if (index >= 0) {
        if (index >= 1) {
          pages[index - 1].classList.remove("flipped");
          pages[index].classList.remove("flipped");
        }
        setTimeout(() => removeFlippedFromPair(index - 2), 100);
        setTimeout(() => {
          setIsTurningPage(false);
        }, 1600);
      }
    };

    for (let i = 0; i < totalPages; i++) {
      const page = pages[i];
      if (i % 2 === 0) {
        page.style.zIndex = totalPages - i;
      }
    }

    removeFlippedFromPair(totalPages - 1);

    const handlePageClick = (e) => {
      const page = e.target.closest(".page");
      if (!page) setActive(null);
      const pageNum = parseInt(page.id, 10);

      if (isTouchDevice) {
        if (e.target.closest(".cont")) {
          setActive(e.target.closest(".cont").id);
        } else if (e.target) {
          setActive(e.target.id);
        } else {
          setActive(null);
        }
      } else {
        if (window.innerWidth < 1000) {
          if (pageNum === 1 || pageNum === 11) {
            page.classList.add("flipped");
            if (page.nextElementSibling) {
              page.nextElementSibling.classList.add("flipped");
            }
          }
          if (pageNum === 2 || pageNum === 10 || pageNum === 12) {
            page.classList.remove("flipped");
            if (page.previousElementSibling) {
              page.previousElementSibling.classList.remove("flipped");
            }
            if (pageNum === 10) {
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(0)";
              }, 300);
            }
            if (pageNum === 12) {
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(50%)";
              }, 300);
            }
          }
          if (pageNum === 3) {
            page.classList.add("flipped");
            if (page.nextElementSibling) {
              page.nextElementSibling.classList.add("flipped");
            }
            lastPageId = pageNum;
            setTimeout(() => {
              document.querySelector(".book").style.transform =
                "translateX(50%)";
            }, 300);
          }
          if (pageNum === 4) {
            if (lastPageId === 3 || lastPageId === 4) {
              page.classList.remove("flipped");
              if (page.previousElementSibling) {
                page.previousElementSibling.classList.remove("flipped");
              }
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(0)";
              }, 300);
            } else {
              document.querySelector(".book").style.transform =
                "translateX(50%)";
              lastPageId = pageNum;
            }
          }
          if (pageNum === 5) {
            if (lastPageId === 4 || lastPageId === 3) {
              document.querySelector(".book").style.transform = "translateX(0)";
              lastPageId = pageNum;
            } else {
              page.classList.add("flipped");
              if (page.nextElementSibling) {
                page.nextElementSibling.classList.add("flipped");
              }
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(50%)";
              }, 300);
            }
          }
          if (pageNum === 6) {
            if (lastPageId === 5 || lastPageId === 6) {
              page.classList.remove("flipped");
              if (page.previousElementSibling) {
                page.previousElementSibling.classList.remove("flipped");
              }
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(0)";
              }, 300);
            } else {
              document.querySelector(".book").style.transform =
                "translateX(50%)";
              lastPageId = pageNum;
            }
          }
          if (pageNum === 7) {
            if (lastPageId === 6 || lastPageId === 5) {
              document.querySelector(".book").style.transform = "translateX(0)";
              lastPageId = pageNum;
            } else {
              page.classList.add("flipped");
              if (page.nextElementSibling) {
                page.nextElementSibling.classList.add("flipped");
              }
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(50%)";
              }, 300);
            }
          }
          if (pageNum === 8) {
            if (lastPageId === 7 || lastPageId === 8) {
              page.classList.remove("flipped");
              if (page.previousElementSibling) {
                page.previousElementSibling.classList.remove("flipped");
              }
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(0)";
              }, 300);
            } else {
              document.querySelector(".book").style.transform =
                "translateX(50%)";
              lastPageId = pageNum;
            }
          }
          if (pageNum === 9) {
            if (lastPageId === 8 || lastPageId === 7) {
              document.querySelector(".book").style.transform = "translateX(0)";
              lastPageId = pageNum;
            } else {
              page.classList.add("flipped");
              if (page.nextElementSibling) {
                page.nextElementSibling.classList.add("flipped");
              }
              lastPageId = pageNum;
              setTimeout(() => {
                document.querySelector(".book").style.transform =
                  "translateX(50%)";
              }, 300);
            }
          }
          if (pageNum === 11) {
            setTimeout(() => {
              document.querySelector(".book").style.transform = "translateX(0)";
            }, 1000);
          }
        } else {
          if (pageNum % 2 === 0) {
            page.classList.remove("flipped");
            page.previousElementSibling.classList.remove("flipped");
          } else {
            page.classList.add("flipped");
            page.nextElementSibling.classList.add("flipped");
            setSliderIndex(0);
          }
        }
      }
    };

    const handleDoubleTap = DoubleTap((e) => {
      const page = e.target.closest(".page");
      const pageNum = parseInt(page.id, 10);
      console.log(isTouchDevice);

      if (pageNum === 1 || pageNum === 11) {
        page.classList.add("flipped");
        if (page.nextElementSibling) {
          page.nextElementSibling.classList.add("flipped");
        }
      }
      if (pageNum === 2 || pageNum === 10 || pageNum === 12) {
        page.classList.remove("flipped");
        if (page.previousElementSibling) {
          page.previousElementSibling.classList.remove("flipped");
        }
        if (pageNum === 10) {
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(0)";
          }, 300);
        }
        if (pageNum === 12) {
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(50%)";
          }, 300);
        }
      }
      if (pageNum === 3) {
        page.classList.add("flipped");
        if (page.nextElementSibling) {
          page.nextElementSibling.classList.add("flipped");
        }
        lastPageId = pageNum;
        setTimeout(() => {
          document.querySelector(".book").style.transform = "translateX(50%)";
        }, 300);
      }
      if (pageNum === 4) {
        if (lastPageId === 3 || lastPageId === 4) {
          page.classList.remove("flipped");
          if (page.previousElementSibling) {
            page.previousElementSibling.classList.remove("flipped");
          }
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(0)";
          }, 300);
        } else {
          document.querySelector(".book").style.transform = "translateX(50%)";
          lastPageId = pageNum;
        }
      }
      if (pageNum === 5) {
        if (lastPageId === 4 || lastPageId === 3) {
          document.querySelector(".book").style.transform = "translateX(0)";
          lastPageId = pageNum;
        } else {
          page.classList.add("flipped");
          if (page.nextElementSibling) {
            page.nextElementSibling.classList.add("flipped");
          }
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(50%)";
          }, 300);
        }
      }
      if (pageNum === 6) {
        if (lastPageId === 5 || lastPageId === 6) {
          page.classList.remove("flipped");
          if (page.previousElementSibling) {
            page.previousElementSibling.classList.remove("flipped");
          }
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(0)";
          }, 300);
        } else {
          document.querySelector(".book").style.transform = "translateX(50%)";
          lastPageId = pageNum;
        }
      }
      if (pageNum === 7) {
        if (lastPageId === 6 || lastPageId === 5) {
          document.querySelector(".book").style.transform = "translateX(0)";
          lastPageId = pageNum;
        } else {
          page.classList.add("flipped");
          if (page.nextElementSibling) {
            page.nextElementSibling.classList.add("flipped");
          }
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(50%)";
          }, 300);
        }
      }
      if (pageNum === 8) {
        if (lastPageId === 7 || lastPageId === 8) {
          page.classList.remove("flipped");
          if (page.previousElementSibling) {
            page.previousElementSibling.classList.remove("flipped");
          }
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(0)";
          }, 300);
        } else {
          document.querySelector(".book").style.transform = "translateX(50%)";
          lastPageId = pageNum;
        }
      }
      if (pageNum === 9) {
        if (lastPageId === 8 || lastPageId === 7) {
          document.querySelector(".book").style.transform = "translateX(0)";
          lastPageId = pageNum;
        } else {
          page.classList.add("flipped");
          if (page.nextElementSibling) {
            page.nextElementSibling.classList.add("flipped");
          }
          lastPageId = pageNum;
          setTimeout(() => {
            document.querySelector(".book").style.transform = "translateX(50%)";
          }, 300);
        }
      }
      if (pageNum === 11) {
        setTimeout(() => {
          document.querySelector(".book").style.transform = "translateX(0)";
        }, 1000);
      }
    });

    const handleTouchOrClick = (e) => {
      handleDoubleTap(e);
      handlePageClick(e);
    };

    if (isTouchDevice) {
      console.log(isTouchDevice);
      document.addEventListener("click", handleTouchOrClick);
    } else {
      console.log(isTouchDevice);
      document.addEventListener("click", handlePageClick);
    }

    return () => {
      document.removeEventListener("click", handleTouchOrClick);
      document.removeEventListener("click", handlePageClick);
    };
  }, [isTouchDevice]);

  return (
    <div className={`book ${isTurningPage ? "no-hover" : ""}`}>
      <div id="pages" className="pages">
        <div id="1" className="page flipped group">
          <div
            className="w-full h-full bg-[#0a0a0a] dark:bg-white p-2 flex flex-col items-center justify-start relative cont"
            id="100"
          >
            <h1 className="font-deathNote text-5xl text-center text-white dark:text-[#0a0a0a] mt-20">
              <span>{texts[language].portafolio}</span>
            </h1>
            <img
              src={
                theme == "dark" ? "/img/mugiwaras.svg" : "/img/mugiwaras.png"
              }
              alt=""
              className={`absolute w-[40px] h-[40px] bottom-4 opacity-0  transition-opacity duration-1000 ${
                !isTouchDevice
                  ? "group-hover:opacity-100"
                  : active === "100" || active === "1"
                  ? "opacity-100"
                  : ""
              }`}
            />
          </div>
        </div>
        <div id="2" className="page flipped">
          <div className="w-full h-full bg-white dark:bg-[#0a0a0a] relative border border-black dark:border-white border-r-0">
            <div className="book-shadow bg-gradient-to-l dark:from-[rgba(0,0,0,0.2)] from-[0%] dark:to-[rgba(0,0,0,0)] to-[15%] from-[rgba(0,0,0,0.2)] to-transparent"></div>
            <img
              src={theme == "dark" ? "/img/bg-d.png" : "/img/bg.png"}
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        <div id="3" className="page flipped">
          <div className="w-full h-full bg-[#0a0a0a] dark:bg-white relative z-50">
            <div className="book-shadow bg-gradient-to-r dark:from-[rgba(0,0,0,0.2)] from-[0%] dark:to-[rgba(0,0,0,0)] to-[15%] from-[rgba(0,0,0,0.2)] to-transparent">
              <div
                className={`w-[66.42156862745098%] h-[29.4314381270903%] absolute bg-white dark:bg-black z-[10000] left-[4.901960784313725%] top-[3.344481605351171%] bg-opacity-0 transition-colors duration-300 flex flex-col group dark:bg-opacity-0 p-1 cont ${
                  !isTouchDevice
                    ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                    : active === "200" && "bg-opacity-70 dark:bg-opacity-70"
                }`}
                id="200"
              >
                <h2
                  className={`header-about text-2xl font-bold opacity-0 transition-opacity duration-500 text-black dark:text-white text-center ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "200" && "opacity-100"
                  }`}
                >
                  {texts[language].yo}
                </h2>
                <p
                  className={`text-about opacity-0 transition-opacity duration-500 text-black dark:text-white leading-[1.2] text-center ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "200" && "opacity-100"
                  }`}
                >
                  {texts[language].yoT}
                </p>
              </div>
              <div
                className={`w-[45.83333333333333%] h-[45.9866220735786%] absolute bg-white dark:bg-black z-[10000] right-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex flex-col group dark:bg-opacity-0 p-1 cont ${
                  !isTouchDevice
                    ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                    : active === "300" && "bg-opacity-70 dark:bg-opacity-70"
                }`}
                id="300"
              >
                <h2
                  className={`header-about text-2xl font-bold opacity-0 transition-opacity duration-500 text-black dark:text-white text-center ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "300" && "opacity-100"
                  }`}
                >
                  {texts[language].metas}
                </h2>
                <p
                  className={`text-goals text-about opacity-0 transition-opacity duration-500 text-black dark:text-white leading-[1.2] text-center ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "300" && "opacity-100"
                  }`}
                >
                  {texts[language].metasT}
                </p>
              </div>
              <div
                className={`absolute bottom-[3.010033444816054%] left-[4.901960784313725%] h-[18.561872909699%] w-[41.91176470588235%] opacity-0 transition-opacity duration-500 flex items-center justify-center cont ${
                  !isTouchDevice
                    ? "hover:opacity-100 dark:hover:opacity-100"
                    : active === "400" && "opacity-100"
                }`}
                id="400"
              >
                <img src="/img/arg.webp" alt="" className="w-full" />
              </div>
              <img src="/img/aboutme.png" alt="" className="" />
            </div>
          </div>
        </div>
        <div id="4" className="page flipped">
          <div className="w-full h-full relative z-50 bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-l dark:from-[rgba(0,0,0,0.2)] from-[0%] dark:to-[rgba(0,0,0,0)] to-[15%] from-[rgba(0,0,0,0.5)] to-transparent"></div>
            <div
              className={`w-[calc(100%-9.803921568627451%)] h-[26.58862876254181%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[3.344481605351171%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "500" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="500"
            >
              <h2
                className={`text-tech text-5xl font-bold opacity-0 transition-opacity duration-500 ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "500" && "opacity-100"
                }`}
              >
                {texts[language].tecnologias}
              </h2>
            </div>
            <div
              className={`w-[28.43137254901961%] h-[17.55852842809365%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[31.77257525083612%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group clip-nami dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "600" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="600"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "600" && "opacity-100"
                }`}
              >
                <SiBootstrap className="icon-sm" />
                <h2 className="font-bold tech-h">Bootstrap</h2>
              </div>
            </div>
            <div
              className={`w-[30.88235294117647%] h-[17.55852842809365%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[28.18627450980392%] top-[31.77257525083612%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group clip-usopp dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "700" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="700"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "700" && "opacity-100"
                }`}
              >
                <SiSass className="icon-sm" />
                <h2 className="font-bold tech-h">Sass</h2>
              </div>
            </div>
            <div
              className={`w-[59.31372549019608%] h-[45.31772575250836%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[51.17056856187291%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group clip-luffy dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "800" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="800"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 w-full h-full relative ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "800" && "opacity-100"
                }`}
              >
                <div className="absolute top-[25.83025830258303%] left-[22.31404958677686%] z-[100001] flex flex-col items-center justify-center">
                  <SiHtml5 className="icon-sm" />
                  <h2 className="font-bold tech-h">Html</h2>
                </div>

                <div className="absolute top-[25.83025830258303%] right-[26.44628099173554%] z-[100001] flex flex-col items-center justify-center">
                  <SiCss3 className="icon-sm" />
                  <h2 className="font-bold tech-h">Css</h2>
                </div>
                <div className="absolute bottom-[22.14022140221402%] z-[100001] flex flex-col items-center justify-center left-1/2 -translate-x-1/2">
                  <SiJavascript className="icon-sm" />
                  <h2 className="font-bold tech-h">Javascript</h2>
                </div>
              </div>
            </div>
            <div
              className={`w-[33.33333333333333%] h-[30.60200668896321%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] right-[4.901960784313725%] top-[31.77257525083612%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "900" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="900"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "900" && "opacity-100"
                }`}
              >
                <SiReact className="icon-sm" />
                <h2 className="font-bold tech-h">React</h2>
              </div>
            </div>
            <div
              className={`w-[33.33333333333333%] h-[10.53511705685619%] absolute z-[10000] right-[4.901960784313725%] top-[64.04682274247492%] opacity-0 transition-opacity duration-500 flex items-center justify-center clip-merry cont ${
                !isTouchDevice
                  ? "hover:opacity-100 dark:hover:opacity-100"
                  : active === "901" && "opacity-100"
              }`}
              id="901"
            >
              <img src="/img/merry.png" alt="" className="h-full" />
            </div>
            <div
              className={`w-[33.33333333333333%] h-[20.23411371237458%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] right-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "902" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="902"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "902" && "opacity-100"
                }`}
              >
                <SiTailwindcss className="icon-sm" />
                <h2 className="font-bold tech-h">Tailwind</h2>
              </div>
            </div>
            <img src="/img/technologies1.png" alt="" className="" />
          </div>
        </div>
        <div id="5" className="page flipped">
          <div className="w-full h-full relative z-50 bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-r dark:from-[rgba(0,0,0,0.2)] from-[0%] dark:to-[rgba(0,0,0,0)] to-[15%] from-[rgba(0,0,0,0.5)] to-transparent"></div>
            <div
              className={`w-[39.2156862745098%] h-[21.23745819397993%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[3.344481605351171%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "903" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="903"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "903" && "opacity-100"
                }`}
              >
                <SiNodedotjs className="icon-sm" />
                <h2 className="font-bold tech-h">Node Js</h2>
              </div>
            </div>
            <div
              className={`w-[48.52941176470588%] h-[27.4247491638796%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] right-[4.901960784313725%] top-[3.344481605351171%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "904" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="904"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "904" && "opacity-100"
                }`}
              >
                <SiMongodb className="icon-sm" />
                <h2 className="font-bold tech-h">Mongo Db</h2>
              </div>
            </div>
            <div
              className={`w-[48.52941176470588%] h-[20.5685618729097%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] right-[4.901960784313725%] top-[32.44147157190635%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group clip-chopper dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "905" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="905"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "905" && "opacity-100"
                }`}
              >
                <SiExpress className="icon-sm" />
                <h2 className="font-bold tech-h">Express</h2>
              </div>
            </div>
            <div
              className={`w-[34.31372549019608%] h-[25.08361204013378%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] right-[4.901960784313725%] top-[54.51505016722408%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "906" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="906"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "906" && "opacity-100"
                }`}
              >
                <SiTypescript className="icon-sm" />
                <h2 className="font-bold tech-h">Typescript</h2>
              </div>
            </div>
            <div
              className={`w-[38.97058823529412%] h-[25.08361204013378%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "907" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="907"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "907" && "opacity-100"
                }`}
              >
                <SiFigma className="icon-sm" />
                <h2 className="font-bold tech-h">Figma</h2>
              </div>
            </div>
            <div
              className={`w-[53.67647058823529%] h-[43.31103678929766%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[26.25418060200669%] bg-opacity-0 transition-colors duration-300 flex flex-col gap-10 items-center justify-center group clip-jimbe pr-12 dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "908" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="908"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "908" && "opacity-100"
                }`}
              >
                <SiGit className="icon-sm" />
                <h2 className="font-bold tech-h">Git</h2>
              </div>
              <div
                className={`opacity-0 transition-opacity duration-500 flex flex-col items-center ml-20 ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "908" && "opacity-100"
                }`}
              >
                <SiGithub className="icon-sm" />
                <h2 className="font-bold tech-h">Github</h2>
              </div>
            </div>
            <div
              className={`w-[12.25490196078431%] h-[8.361204013377926%] absolute z-[10000] left-[46.32352941176471%] top-[71.23745819397993%] opacity-0 transition-opacity duration-500 flex items-center justify-center cont ${
                !isTouchDevice
                  ? "hover:opacity-100 dark:hover:opacity-100"
                  : active === "909" && "opacity-100"
              }`}
              id="909"
            >
              <img src="/img/jollyroger.png" alt="" className="h-full" />
            </div>
            <div
              className={`w-[48.77450980392157%] h-[15.38461538461538%] absolute z-[10000] right-[4.901960784313725%] bottom-[3.511705685618729%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group bg-white dark:bg-[#0a0a0a] dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "910" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="910"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex items-center justify-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "910" && "opacity-100"
                }`}
              >
                <h2 className="font-bold text-3xl proy-h">
                  {texts[language].proyectos}
                </h2>
                <MdKeyboardArrowRight className="mt-[6px] arrow" />
              </div>
            </div>
            <img src="/img/technologies2.png" alt="" className="" />
          </div>
        </div>
        <div id="6" className="page flipped">
          <div className="w-full h-full relative z-50  bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-l from-[rgba(0,0,0,0.2)] from-[0%] to-[rgba(0,0,0,0)] to-[15%]"></div>
            <div
              className={`w-[58.33333333333333%] h-[15.88628762541806%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[3.344481605351171%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "911" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="911"
            >
              <h2
                className={`text-4xl font-bold opacity-0 transition-opacity duration-500 proy-h ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "911" && "opacity-100"
                }`}
              >
                {projectData["Twitter Clone"].name}
              </h2>
            </div>
            <div
              className={`w-[63.23529411764706%] h-[59.36454849498328%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[20.73578595317726%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "912" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="912"
            >
              <p
                className={`text-lg opacity-0 transition-opacity duration-500 p-3 font-semibold leading-[1.2] p-proy ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "912" && "opacity-100"
                }`}
              >
                {projectData["Twitter Clone"].description[language]}
              </p>
            </div>
            <div
              className={`w-[63.23529411764706%] h-[14.71571906354515%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "913" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="913"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 grid grid-rows-2 grid-cols-4 gap-x-[1.96078431372549%] gap-y-[1.337792642140468%] w-full h-full px-[1.96078431372549%] py-[1.337792642140468%] ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "913" && "opacity-100"
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <SiReact size={20} />
                  <h2 className="font-bold text-xs t-sm">React</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiTailwindcss size={20} />
                  <h2 className="font-bold text-xs t-sm">Tailwind</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiMongodb size={20} />
                  <h2 className="font-bold text-xs t-sm">MongoDb</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiExpress size={20} />
                  <h2 className="font-bold text-xs t-sm">Express</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiGit size={20} />
                  <h2 className="font-bold text-xs t-sm">Git</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiGithub size={20} />
                  <h2 className="font-bold text-xs t-sm">Github</h2>
                </div>
              </div>
            </div>
            <img src="/img/project-1.1.png" alt="" className="" />
          </div>
        </div>
        <div id="7" className="page flipped">
          <div className="w-full h-full relative z-50 bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-r from-[rgba(0,0,0,0.2)] from-[0%] to-[rgba(0,0,0,0)] to-[15%]"></div>
            <div
              className={`absolute z-[10000] left-[4.901960784313725%] top-[43.1438127090301%] w-[calc(100%-9.803921568627451%)] h-[35.11705685618729%] flex items-center justify-center opacity-0 transition-opacity duration-500 peer cont ${
                !isTouchDevice
                  ? "hover:opacity-100 dark:hover:opacity-100"
                  : active === "914" && "opacity-100"
              }`}
              id="914"
              onClick={(e) => {
                if (!isTouchDevice) {
                  e.stopPropagation();
                }
              }}
            >
              <ProjectsSlider
                imgs={projectData["Twitter Clone"].images}
                index={sliderIndex}
              />
            </div>
            <img
              src="/img/project-1.3.png"
              alt=""
              className={`contrast-125 absolute z-[1000] left-[4.901960784313725%] top-[43.1438127090301%] w-[calc(100%-9.803921568627451%)] h-[35.11705685618729%] transition-opacity duration-500 ${
                !isTouchDevice
                  ? "peer-hover:opacity-0"
                  : active === "914" && "opacity-0"
              }`}
            />
            <div
              className={`w-[43.62745098039216%] h-[16.38795986622074%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "915" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="915"
            >
              <a
                target="_blank"
                href={projectData["Twitter Clone"].link}
                className={`text-4xl font-bold opacity-0 transition-opacity duration-500 flex items-center gap-4 justify-center demo ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "915" && "opacity-100"
                }`}
                onClick={(e) => {
                  if (isTouchDevice) {
                    handleTouchClick(e);
                  } else {
                    e.stopPropagation();
                  }
                }}
              >
                Demo
                <FaExternalLinkAlt className="demo-i" />
              </a>
            </div>
            <div
              className={`w-[20.83333333333333%] h-[16.38795986622074%] absolute z-[10000] right-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group bg-white dark:bg-[#0a0a0a] dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "916" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="916"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex items-center justify-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "916" && "opacity-100"
                }`}
              >
                <MdKeyboardArrowRight className="next-i" />
              </div>
            </div>
            <img src="/img/project-1.2.png" alt="" className="" />
          </div>
        </div>
        <div id="8" className="page flipped">
          <div className="w-full h-full relative z-50 bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-l from-[rgba(0,0,0,0.2)] from-[0%] to-[rgba(0,0,0,0)] to-[15%]"></div>
            <div
              className={`w-[58.33333333333333%] h-[15.88628762541806%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[3.344481605351171%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "917" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="917"
            >
              <h2
                className={`text-4xl font-bold opacity-0 transition-opacity duration-500 proy-h ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "917" && "opacity-100"
                }`}
              >
                {projectData["Pokedev"].name}
              </h2>
            </div>
            <div
              className={`w-[63.23529411764706%] h-[59.36454849498328%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] top-[20.73578595317726%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "918" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="918"
            >
              <p
                className={`text-lg opacity-0 transition-opacity duration-500 p-3 font-semibold leading-[1.2] p-proy-2 ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "918" && "opacity-100"
                }`}
              >
                {projectData["Pokedev"].description[language]}
              </p>
            </div>
            <div
              className={`w-[63.23529411764706%] h-[14.71571906354515%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "919" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="919"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 grid grid-rows-2 grid-cols-4 gap-x-[1.96078431372549%] gap-y-[1.337792642140468%] w-full h-full px-[1.96078431372549%] py-[1.337792642140468%] ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "919" && "opacity-100"
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <SiHtml5 size={20} />
                  <h2 className="font-bold text-xs t-sm">Html</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiCss3 size={20} />
                  <h2 className="font-bold text-xs t-sm">Css</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiJavascript size={20} />
                  <h2 className="font-bold text-xs t-sm">Javascript</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiGit size={20} />
                  <h2 className="font-bold text-xs t-sm">Git</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiGithub size={20} />
                  <h2 className="font-bold text-xs t-sm">Github</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SiFigma size={20} />
                  <h2 className="font-bold text-xs t-sm">Figma</h2>
                </div>
              </div>
            </div>
            <img src="/img/project-2.1.png" alt="" className="" />
          </div>
        </div>
        <div id="9" className="page flipped">
          <div className="w-full h-full relative z-50 bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-r from-[rgba(0,0,0,0.2)] from-[0%] to-[rgba(0,0,0,0)] to-[15%]"></div>
            <div
              className={`absolute z-[10000] left-[4.901960784313725%] top-[43.1438127090301%] w-[calc(100%-9.803921568627451%)] h-[35.11705685618729%] flex items-center justify-center opacity-0 transition-opacity duration-500 peer cont ${
                !isTouchDevice
                  ? "hover:opacity-100"
                  : active === "920" && "opacity-100"
              }`}
              id="920"
              onClick={(e) => {
                if (!isTouchDevice) {
                  e.stopPropagation();
                }
              }}
            >
              <ProjectsSlider
                imgs={projectData["Pokedev"].images}
                index={sliderIndex}
              />
            </div>
            <img
              src="/img/project-2.3.png"
              alt=""
              className={`absolute z-[1000] left-[4.901960784313725%] top-[43.1438127090301%] w-[calc(100%-9.803921568627451%)] h-[35.11705685618729%] transition-opacity duration-500 ${
                !isTouchDevice
                  ? "peer-hover:opacity-0"
                  : active === "920" && "opacity-0"
              }`}
            />
            <div
              className={`w-[43.62745098039216%] h-[16.38795986622074%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "921" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="921"
            >
              <a
                target="_blank"
                href={projectData["Pokedev"].link}
                className={`text-4xl font-bold opacity-0 transition-opacity duration-500 flex items-center gap-4 justify-center demo ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "921" && "opacity-100"
                }`}
                onClick={(e) => {
                  if (isTouchDevice) {
                    handleTouchClick(e);
                  } else {
                    e.stopPropagation();
                  }
                }}
              >
                Demo
                <FaExternalLinkAlt className="demo-i" />
              </a>
            </div>
            <div
              className={`w-[20.83333333333333%] h-[16.38795986622074%] absolute z-[10000] right-[4.901960784313725%] bottom-[3.678929765886288%] bg-opacity-0 transition-colors duration-300 flex items-center justify-center group bg-white dark:bg-[#0a0a0a] dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "922" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="922"
            >
              <div
                className={`opacity-0 transition-opacity duration-500 flex items-center justify-center ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "922" && "opacity-100"
                }`}
              >
                <MdKeyboardArrowRight className="next-i" />
              </div>
            </div>
            <img src="/img/project-2.2.png" alt="" className="" />
          </div>
        </div>
        <div id="10" className="page flipped">
          <div className="w-full h-full relative z-50 bg-[#0a0a0a] dark:bg-white">
            <div className="book-shadow bg-gradient-to-l from-[rgba(0,0,0,0.2)] from-[0%] to-[rgba(0,0,0,0)] to-[15%]"></div>
            <div
              className={`w-[57.84313725490196%] h-[29.09698996655518%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[5.392156862745098%] top-[3.344481605351171%] transition-colors duration-300 flex items-center justify-center group dark:bg-opacity-0 bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "923" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="923"
            >
              <h2
                className={`text-5xl font-bold opacity-0 transition-opacity duration-500 contact-h ${
                  !isTouchDevice
                    ? "group-hover:opacity-100"
                    : active === "923" && "opacity-100"
                }`}
              >
                {texts[language].contacto}
              </h2>
            </div>
            <div
              className={`text-black w-[58.57843137254902%] h-[61.87290969899666%] absolute bg-white dark:bg-[#0a0a0a] z-[10000] left-[4.901960784313725%] bottom-[3.678929765886288%] transition-colors duration-300 flex flex-col items-center justify-center gap-x-[3.92156862745098%] px-[3.92156862745098%] gap-y-[2.675585284280936%] py-[2.675585284280936%] group ${
                isFormHovered
                  ? "bg-opacity-70 dark:bg-opacity-70"
                  : "bg-opacity-0"
              } dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "924" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="924"
              onClick={(e) => {
                if (!isTouchDevice) {
                  e.stopPropagation();
                }
              }}
            >
              <div className="w-full">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  maxLength={20}
                  onChange={handleChange}
                  placeholder={texts[language].nombre}
                  className={`w-full rounded-md px-[1.96078431372549%] py-[0.6688963210702341%] border border-[#0a0a10] transition-opacity duration-500 input ${
                    isFormHovered || formData.nombre
                      ? "opacity-100"
                      : "opacity-0"
                  } ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "924" && "opacity-100"
                  }`}
                />
                {errors.nombre && (
                  <p
                    className={`text-red-500 ${
                      isFormHovered || formData.mensaje
                        ? "opacity-100"
                        : "opacity-0"
                    } ${
                      !isTouchDevice
                        ? "group-hover:opacity-100"
                        : active === "924" && "opacity-100"
                    }`}
                  >
                    {errors.nombre}
                  </p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  maxLength={30}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full rounded-md px-[1.96078431372549%] py-[0.6688963210702341%] border border-[#0a0a10] transition-opacity duration-500 input ${
                    isFormHovered || formData.email
                      ? "opacity-100"
                      : "opacity-0"
                  } ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "924" && "opacity-100"
                  }`}
                />
                {errors.email && (
                  <p
                    className={`text-red-500 ${
                      isFormHovered || formData.mensaje
                        ? "opacity-100"
                        : "opacity-0"
                    } ${
                      !isTouchDevice
                        ? "group-hover:opacity-100"
                        : active === "924" && "opacity-100"
                    }`}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-full h-full flex flex-col">
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  maxLength={300}
                  onChange={handleChange}
                  placeholder={texts[language].mensaje}
                  className={`w-full h-full rounded-md px-[1.96078431372549%] py-[0.6688963210702341%] border border-[#0a0a10] transition-opacity duration-500 resize-none custom-scrollbar input ${
                    isFormHovered || formData.mensaje
                      ? "opacity-100"
                      : "opacity-0"
                  } ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "924" && "opacity-100"
                  }`}
                />
                {errors.mensaje && (
                  <p
                    className={`text-red-500 ${
                      isFormHovered || formData.mensaje
                        ? "opacity-100"
                        : "opacity-0"
                    } ${
                      !isTouchDevice
                        ? "group-hover:opacity-100"
                        : active === "924" && "opacity-100"
                    }`}
                  >
                    {errors.mensaje}
                  </p>
                )}

                {errors.submit && (
                  <p
                    className={`text-red-500 ${
                      isFormHovered || formData.mensaje
                        ? "opacity-100"
                        : "opacity-0"
                    } ${
                      !isTouchDevice
                        ? "group-hover:opacity-100"
                        : active === "924" && "opacity-100"
                    }`}
                  >
                    {errors.submit}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`w-[28.43137254901961%] h-[12.04013377926421%] absolute z-[10000] right-[5.147058823529412%] bottom-[3.678929765886288%] transition-colors duration-300 flex items-center justify-center group ${
                isFormHovered
                  ? "bg-opacity-70 dark:bg-opacity-70"
                  : "bg-opacity-0"
              } bg-white dark:bg-[#0a0a0a] dark:bg-opacity-0 cont ${
                !isTouchDevice
                  ? "hover:bg-opacity-70 dark:hover:bg-opacity-70"
                  : active === "925" && "bg-opacity-70 dark:bg-opacity-70"
              }`}
              id="925"
            >
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={(e) => {
                  if (isTouchDevice) {
                    handleTouchClick(e);
                  } else {
                    e.stopPropagation();
                    handleSubmit();
                  }
                }}
              >
                <input
                  type="button"
                  className={`text-2xl font-bold transition-opacity duration-500 w-full h-full cursor-pointer send  ${
                    isFormHovered ? "opacity-100" : "opacity-0"
                  } ${
                    buttonState === "sending" ||
                    buttonState === "success" ||
                    buttonState === "error"
                      ? "pr-0"
                      : "pr-[17.64705882352941%]"
                  } ${
                    !isTouchDevice
                      ? "group-hover:opacity-100"
                      : active === "925" && "opacity-100"
                  }`}
                  value={
                    buttonState === "sending"
                      ? "Enviando..."
                      : buttonState === "success"
                      ? "¡Enviado!"
                      : buttonState === "error"
                      ? "Error"
                      : texts[language].enviar
                  }
                  readOnly
                />
                {buttonState !== "sending" &&
                  buttonState !== "success" &&
                  buttonState !== "error" && (
                    <RiMailSendLine
                      className={`absolute opacity-0 transition-opacity duration-500 right-[2.450980392156863%] top-1/2 -translate-y-1/2 send-i ${
                        isFormHovered ? "opacity-100" : "opacity-0"
                      } ${
                        !isTouchDevice
                          ? "group-hover:opacity-100"
                          : active === "925" && "opacity-100"
                      }`}
                    />
                  )}
              </div>
            </div>
            <img src="/img/contact.png" alt="" className="" />
          </div>
        </div>
        <div id="11" className="page">
          <div className="w-full h-full relative z-50 bg-white dark:bg-[#0a0a0a] border border-black dark:border-white border-l-0">
            <div className="book-shadow bg-gradient-to-r dark:from-[rgba(0,0,0,0.2)] from-[0%] dark:to-[rgba(0,0,0,0)] to-[15%] from-[rgba(0,0,0,0.2)] to-transparent"></div>
            <img
              src={theme == "dark" ? "/img/bg-d.png" : "/img/bg.png"}
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        <div
          id="12"
          className="page bg-[#0A0A0A] dark:bg-white relative group flex items-center justify-center"
        >
          <img
            src={theme == "dark" ? "/img/db-logo.svg" : "/img/db-logo-d.png"}
            alt=""
            className={`w-[300px] h-[300px] transition-opacity duration-1000 ${
              !isTouchDevice
                ? "group-hover:opacity-0 group-hover:hidden"
                : active === "12" && "opacity-0 hidden"
            }`}
          />
          <img
            src={
              theme == "dark"
                ? "/img/uzumaki-clan.svg"
                : "/img/uzumaki-clan-d.png"
            }
            alt=""
            className={`w-[270px] h-[270px] hidden opacity-0 transition-opacity duration-1000 ${
              !isTouchDevice
                ? "group-hover:opacity-100 group-hover:block"
                : active === "12" && "opacity-100 blok"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Book;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white relative overflow-x-hidden font-koho font-semibold">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

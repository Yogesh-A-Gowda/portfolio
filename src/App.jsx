import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works } from "./components";
import Experiences from "./components/canvas/Experiences";
import { ProjectButton } from "./components/ProjectButton";
const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Navbar />
        <Routes>
          {/* Main Route */}
          <Route
            path="/"
            element={
              <>
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
              <ProjectButton/>
                <Contact />
                <StarsCanvas />
              </>
            }
          />
          {/* Projects Route */}
          <Route path="/projects" element={<Works />} />
          <Route path="/experiences" element={<Experiences />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

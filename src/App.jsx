import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works } from "./components";
import Experiences from "./components/canvas/Experiences";
import { ProjectButton } from "./components/ProjectButton";
import AdminDashboard from "./components/AdminDashboard";
import DebugOverlay from "./components/DebugOverlay";

const showDebugOverlay =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("debug") === "1";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {showDebugOverlay && <DebugOverlay />}
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
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

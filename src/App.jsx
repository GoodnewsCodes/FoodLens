import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar/Navbar";
import Button from "./components/Button/Button";
import "./App.css";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-text">Know more about your food in one Snap📸</h1>
          <Button
            action="Get Started
              "
            onClick={() => {}}
          />
        </div>
      </section>

      <section className="feature">
        <h1 className="hero-text">Features</h1>
        <div className="features">
          <div className="feature-item"></div>
        </div>
      </section>

      <section className="about">
        <h1 className="hero-text">About & Contact</h1>
        <div className="about-container">
          <div className="about-item"></div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
}

export default App;

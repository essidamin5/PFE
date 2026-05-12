import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Contact from "./Contact";
import Services from "./Services";
import Secteurs from "./Secteurs.jsx";
import Actu from "./Actu";
import "./Accueil.css";
import ChatBot from "./ChatBot.jsx";

export default function Accueil() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <NavBar />

      <section className="hero">
  <div className="hero-content">
    <h1>BE CARTH AI</h1>
    <b>Carthage is reborn. Data. Consulting. Victory.

</b>
  </div>
</section>

      {/* ACTU */}
      <Actu />

      {/* SERVICES */}
      <div id="services">
        <Services />
      </div>

      {/* SECTEURS */}
      <div id="secteurs">
        <Secteurs />
      </div>

      {/* ABOUT */}
      <div id="about" className="about-section">
        <br></br>
        <h1>About Us</h1>
        <div className="about-card">
          <b>Fondée en 2025, BE CARTHAI Consulting est un cabinet spécialisé dans l'accompagnement des institutions financières et bancaires dans leur transformation digitale. Nous combinons expertise en développement d'applications informatiques, business intelligence et intelligence artificielle pour aider nos clients à transformer leurs données en avantage stratégique durable. Notre approche s'appuie sur les standards internationaux en gestion de projets informatiques et une connaissance approfondie des exigences réglementaires du secteur financier, notamment les circulaires BCT et les normes IFRS. Basés à Tunis, nous accompagnons les organisations de la région MENA dans la structuration de leur SI, la mise en conformité réglementaire et le développement d'une culture data-driven orientée vers la performance et l'innovation. </b>
        </div>
      </div>
<ChatBot />
      {/* CONTACT */}
      <Contact />
    </div>
  );
}
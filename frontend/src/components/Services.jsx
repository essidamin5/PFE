import "./Services.css";
import { useEffect } from "react";

export default function Services() {

  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));
  }, []);

  return (
    <section className="services">
      <div className="container">

        <h2 className="title">Nos Services</h2>

        <div className="services-grid">

          <div className="service-card">
            <div className="img-wrapper">
              <img src="photo-1552664730-d307ca884978.jpeg" />
            </div>

            <div className="service-content">
              <h3>Consulting</h3>
              <b>
                Nous accompagnons les entreprises dans leur transformation digitale 
                à travers des stratégies innovantes adaptées à leurs besoins métiers. 
                Nos experts interviennent dans la définition des feuilles de route IT, 
                l’optimisation des processus et la mise en conformité avec les standards internationaux.
              </b>
            </div>
          </div>

          <div className="service-card">
            <div className="img-wrapper">
              <img src="photo-1519389950473-47ba0277781c.jpeg" />
            </div>

            <div className="service-content">
              <h3>Développement</h3>
              <b>
                Conception et développement d’applications web et mobiles performantes, 
                sécurisées et évolutives. Nous mettons en place des solutions sur mesure 
                garantissant une expérience utilisateur optimale et une haute disponibilité.
              </b>
            </div>
          </div>

          <div className="service-card">
            <div className="img-wrapper">
              <img src="photo-1677442136019-21780ecad995.jpeg" />
            </div>

            <div className="service-content">
              <h3>AI & Data</h3>
              <b>
                Exploitation des données à travers des solutions avancées d’intelligence artificielle 
                et de data analytics. Nous aidons les entreprises à transformer leurs données 
                en avantage stratégique pour améliorer la prise de décision.
              </b>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
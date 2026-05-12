import "./Secteurs.css";
import { useEffect, useState } from "react";

export default function Secteurs() {
  const [active, setActive] = useState(1);

  const secteurs = [
    {
      id: 1,
      title: "Banque & Finance",
      img: "secteur_bancaire_New.jpg",
      desc: "Transformation digitale, conformité réglementaire et optimisation des systèmes financiers."
    },
    {
      id: 2,
      title: "Assurance",
      img: "PX1000_180e63d9-1557-4198-9e71-d0c0a74aca64_b.jpg",
      desc: "Digitalisation des processus et amélioration de l'expérience client."
    },
    {
      id: 3,
      title: "Industrie",
      img: "Sans-titre-1-3.jpg",
      desc: "Optimisation des opérations grâce à l'IA et aux données."
    },
    {
      id: 4,
      title: "Secteur Public",
      img: "ab20250605-tunisie-berd-aide-secteur-prive-1.webp",
      desc: "Modernisation digitale et amélioration des services publics."
    }
  ];

  useEffect(() => {
    const items = document.querySelectorAll(".secteur-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 120);
        }
      });
    });

    items.forEach(el => observer.observe(el));
  }, []);

  const selected = secteurs.find(s => s.id === active);

  return (
    <section className="secteurs">
      <h2 className="title">Secteurs</h2>

      <div className="secteurs-grid">
        {secteurs.map((s) => (
         <div
  key={s.id}
  className={`secteur-card ${active === s.id ? "active" : ""}`}
  onClick={() => setActive(s.id)}
>
            <img src={s.img} alt={s.title} />

            <div className="overlay">
              <h3>{s.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="secteur-desc">
        {selected.desc}
      </div>
    </section>
  );
}
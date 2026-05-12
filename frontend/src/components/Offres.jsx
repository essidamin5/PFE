import { useEffect, useState } from "react";
import "./Offres.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const navigate = useNavigate();

  const categories = ["Tous", "Site Web", "App Mobile", "SaaS"];

  useEffect(() => {
    const data = [
      {
        id: 1,
        title: "Système e-Fatoora",
        category: "SaaS",
        desc: "Solution de facturation électronique pour TPE/PME tunisiennes, conforme aux normes fiscales.",
        price: 1200,
        icon: "💳",
        duree: "12 mois",
        features: ["Génération PDF", "Envoi automatique", "Tableau de bord"]
      },
      {
        id: 2,
        title: "Gestion intelligente des stocks",
        category: "SaaS",
        desc: "Suivi en temps réel des stocks avec optimisation par intelligence artificielle.",
        price: 2500,
        icon: "📦",
        duree: "12 mois",
        features: ["Alertes stock", "Rapports IA", "Multi-entrepôt"]
      },
      {
        id: 3,
        title: "Plateforme E-KYC",
        category: "SaaS",
        desc: "Vérification d'identité en ligne avec détection de fraude en temps réel.",
        price: 4000,
        icon: "🔐",
        duree: "12 mois",
        features: ["OCR documents", "Liveness check", "API REST"]
      },
      {
        id: 4,
        title: "Site Vitrine Pro",
        category: "Site Web",
        desc: "Site web professionnel responsive avec SEO optimisé et panel d'administration.",
        price: 1800,
        icon: "🌐",
        duree: "Livraison 3 semaines",
        features: ["Design moderne", "SEO avancé", "CMS intégré"]
      },
      {
        id: 5,
        title: "E-Commerce Complet",
        category: "Site Web",
        desc: "Boutique en ligne avec paiement, gestion commandes et suivi livraison.",
        price: 5500,
        icon: "🛒",
        duree: "Livraison 6 semaines",
        features: ["Paiement en ligne", "Gestion catalogue", "Tableau de bord ventes"]
      },
      {
        id: 6,
        title: "Portail RH en ligne",
        category: "Site Web",
        desc: "Gestion des employés, congés, fiches de paie et évaluations en ligne.",
        price: 3200,
        icon: "👥",
        duree: "Livraison 4 semaines",
        features: ["Gestion congés", "Fiches de paie", "Évaluations"]
      },
      {
        id: 7,
        title: "Application Mobile iOS & Android",
        category: "App Mobile",
        desc: "Application cross-platform React Native avec notifications push et mode hors-ligne.",
        price: 7000,
        icon: "📱",
        duree: "Livraison 8 semaines",
        features: ["iOS + Android", "Notifications push", "Mode offline"]
      },
      {
        id: 8,
        title: "App Mobile E-Commerce",
        category: "App Mobile",
        desc: "Application mobile dédiée à votre boutique avec panier, paiement et suivi commande.",
        price: 6000,
        icon: "🛍️",
        duree: "Livraison 7 semaines",
        features: ["Catalogue produits", "Paiement intégré", "Tracking commandes"]
      },
      {
        id: 9,
        title: "App Mobile de Réservation",
        category: "App Mobile",
        desc: "Système de réservation en temps réel pour restaurants, hôtels ou cliniques.",
        price: 5000,
        icon: "📅",
        duree: "Livraison 6 semaines",
        features: ["Calendrier temps réel", "SMS/Email confirmation", "Dashboard admin"]
      },
      {
        id: 10,
        title: "CRM Cloud",
        category: "SaaS",
        desc: "Gestion relation client avec pipeline de ventes, emails automatiques et rapports.",
        price: 3500,
        icon: "📊",
        duree: "12 mois",
        features: ["Pipeline ventes", "Email automation", "Rapports avancés"]
      },
      {
        id: 11,
        title: "Plateforme E-Learning",
        category: "Site Web",
        desc: "Plateforme de formation en ligne avec cours vidéo, quiz et certificats.",
        price: 4500,
        icon: "🎓",
        duree: "Livraison 5 semaines",
        features: ["Cours vidéo", "Quiz interactifs", "Certificats auto"]
      },
      {
        id: 12,
        title: "SaaS Multi-tenant",
        category: "SaaS",
        desc: "Solution blanche multi-clients avec gestion des abonnements et facturation automatique.",
        price: 9000,
        icon: "🏢",
        duree: "12 mois",
        features: ["Multi-tenant", "Abonnements", "White label"]
      }
    ];

    setOffres(data);
  }, []);

  const handleSelect = (offre) => {
    navigate("/panier", { state: { offre } });
  };

  const offresFiltrees =
    filter === "Tous" ? offres : offres.filter((o) => o.category === filter);

  return (
    <div className="offres-page">
      <NavBar />

      <div className="offres-container">
        <h1 className="offres-title">Nos Offres 🚀</h1>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn-filter ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Offres Grid */}
        <div className="offres-grid">
          {offresFiltrees.map((offre) => (
            <div key={offre.id} className="offre-card">

              <span className="badge">{offre.category}</span>

              <div className="icon">{offre.icon}</div>

              <h3>{offre.title}</h3>
              <p>{offre.desc}</p>

              <ul className="features-list">
                {offre.features.map((f, i) => (
                  <li key={i}>✅ {f}</li>
                ))}
              </ul>

              <div className="price">{offre.price} TND</div>
              <small className="duree">⏱ {offre.duree}</small>

              <button
                className="btn-offre"
                onClick={() => handleSelect(offre)}
              >
                Choisir
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
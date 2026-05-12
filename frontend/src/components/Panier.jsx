import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./Panier.css";

export default function Panier() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const offre = state?.offre;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    date: new Date().toISOString().slice(0, 10),
    details: ""
  });

  if (!offre) {
    return <h2 style={{ textAlign: "center" }}>❌ Offre introuvable</h2>;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/commandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({
  ...form,
  service: offre.category, // 🔥 هذا المهم
  offre: {
    title: offre.title,
    price: offre.price,
    category: offre.category
  }
})
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Commande envoyée !");
      navigate("/");
    } else {
      alert("❌ erreur");
    }

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="panier-container">

      <div className="panier-card">

        <h2>🛒 Commander Offre</h2>

        {/* OFFER INFO */}
        <div className="offre-box">
          <h3>{offre.title}</h3>
          <p>{offre.desc}</p>
          <strong>{offre.price} TND</strong>
        </div>

        {/* FORM */}
        <div className="form">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <textarea
            name="details"
            placeholder="Plus de détails sur votre demande..."
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            🚀 Confirmer Commande
          </button>

        </div>

      </div>

    </div>
  );
}
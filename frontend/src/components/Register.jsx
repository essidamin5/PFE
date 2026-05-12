import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", form);
      setMessage("✅ Compte créé avec succès");

      // 🔥 redirect après inscription
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch {
      setMessage("❌ Erreur serveur");
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h1>BE CARTH AI</h1>
        <p className="subtitle">Créer votre compte 🚀</p>

        {message && <p className="msg">{message}</p>}

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="birthdate"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer mot de passe"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-register">
            S'inscrire
          </button>

        </form>

        {/* 🔗 ACTIONS */}
        <div className="actions">

          <Link to="/login" className="link-btn">
            🔐 Déjà un compte ? Login
          </Link>

          <Link to="/" className="link-btn home">
            🏠 Retour à l'accueil
          </Link>

        </div>

      </div>

    </div>
  );
}
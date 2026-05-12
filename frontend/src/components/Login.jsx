import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleSubmit = (e) => {
  e.preventDefault();

  // ADMIN LOGIN
  if (
    form.email === "Admin@gmail.com" &&
    form.password === "admin00"
  ) {
    login({
      name: "Admin",
      email: form.email,
      role: "admin"
    });

    navigate("/admin");
    return;
  }

  // USER LOGIN
  if (form.email && form.password) {
    login({
      name: "User",
      email: form.email,
      role: "user"
    });

    navigate("/profile");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>BE CARTH AI</h1>
        <p>Welcome 👋</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" className="btn-login-main">
            Login
          </button>
        </form>

        {/* ACTIONS */}
        <div className="login-actions">

          {/* 🔙 back home */}
          <Link to="/" className="btn-back">
            ⬅ Accueil
          </Link>

          {/* 🆕 register */}
          <Link to="/register" className="btn-register">
            Créer un compte
          </Link>

        </div>

      </div>
    </div>
  );
}
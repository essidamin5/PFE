import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import "./Account.css";

export default function Account() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* 🔥 REDIRECT IF ADMIN */
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin"); // يهبط مباشرة للادمين
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>BE CARTH AI</h2>

        <nav>
          <Link to="profile">👤 Profile</Link>
          <Link to="settings">⚙️ Settings</Link>
          <Link to="/">🏠 Accueil</Link>
        </nav>

        <div className="sidebar-actions">
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          <button
            className="logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="main">
        <div className="topbar">
          <h1>Welcome {user?.name}</h1>
        </div>

        <Outlet />
      </main>

    </div>
  );
}
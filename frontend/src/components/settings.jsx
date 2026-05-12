import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./settings.css";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notif") === "true"
  );
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");

  /* 🌙 DARK MODE */
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* 🔔 NOTIFICATIONS */
  useEffect(() => {
    localStorage.setItem("notif", notifications);
  }, [notifications]);

  /* 🌍 LANGUAGE */
  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  /* 🔥 SMART NAVIGATION */
  const goToProfile = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="settings-container">

      <div className="settings-card">
        <h2>⚙️ Settings</h2>

        {/* DARK MODE */}
        <div className="setting-row">
          <span>🌙 Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* NOTIFICATIONS */}
        <div className="setting-row">
          <span>🔔 Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* LANGUAGE */}
        <div className="setting-row">
          <span>🌍 Language</span>
          <div className="lang-buttons">
            <button
              className={lang === "EN" ? "active" : ""}
              onClick={() => changeLang("EN")}
            >
              EN
            </button>
            <button
              className={lang === "FR" ? "active" : ""}
              onClick={() => changeLang("FR")}
            >
              FR
            </button>
          </div>
        </div>

        {/* RESET IMAGE */}
        <div className="setting-row">
          <span>🖼️ Reset Profile Image</span>
          <button
            className="danger"
            onClick={() => localStorage.removeItem("profileImage")}
          >
            Reset
          </button>
        </div>

        {/* 🔙 GO TO PROFILE / ADMIN */}
        <div className="setting-row">
          <span>👤 Profile</span>
          <button className="primary" onClick={goToProfile}>
            {user?.role === "admin" ? "Admin Dashboard" : "My Profile"}
          </button>
        </div>


      </div>
    </div>
  );
}
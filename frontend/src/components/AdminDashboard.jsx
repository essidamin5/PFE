import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const [commandes, setCommandes] = useState([]);
  const [demandes, setDemandes] = useState([]); // ✅ لازم يكون فوق

  const navigate = useNavigate();
  const { logout } = useAuth();

  /* 🔥 FETCH DEMANDES */
  useEffect(() => {
    fetch("http://localhost:5000/api/demande")
      .then(res => res.json())
      .then(data => setDemandes(data));
  }, []);

  /* 🔥 FETCH COMMANDES */
  useEffect(() => {
    fetch("http://localhost:5000/api/commandes")
      .then(res => res.json())
      .then(data => setCommandes(data));
  }, []);

  /* 📊 STATS */
  const total = commandes
    .filter(c => c.status === "accepted")
    .reduce((acc, c) => acc + (c.offre?.price || 0), 0);

  const countByCategory = (cat) =>
    commandes.filter(c => c.service === cat).length;

  /* 🔔 NOTIF */
  const pendingCount = demandes.filter(d => d.status === "pending").length;

  /* 🔥 UPDATE STATUS */
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/commandes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    setCommandes(prev =>
      prev.map(c =>
        c._id === id ? { ...c, status } : c
      )
    );
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>⚡ Admin</h2>

        <button onClick={() => navigate("/admin")}>🏠 Dashboard</button>
        <button onClick={() => navigate("/users")}>👥 Users</button>
        <button onClick={() => navigate("/analytics")}>📊 Analytics</button>

        {/* ✅ BUTTON DEMANDES */}
        <button onClick={() => navigate("/admin/demandes")}>
          📩 Demandes {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
        </button>

        <button
          className="logout"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="content">

        <h1>Dashboard</h1>

        {/* 🔔 NOTIFICATION */}
        <div className="notif-box">
          🔔 Nouvelles demandes: {pendingCount}
        </div>

        {/* CARDS */}
        <div className="cards">
          <div className="card">
            <h3>📦 Commandes</h3>
            <p>{commandes.length}</p>
          </div>

          <div className="card">
            <h3>💰 Revenue</h3>
            <p>{total} TND</p>
          </div>

          <div className="card">
            <h3>📱 App</h3>
            <p>{countByCategory("App Mobile")}</p>
          </div>

          <div className="card">
            <h3>🌐 Web</h3>
            <p>{countByCategory("Site Web")}</p>
          </div>

          <div className="card">
            <h3>☁️ SaaS</h3>
            <p>{countByCategory("SaaS")}</p>
          </div>
        </div>

       

        {/* TABLE COMMANDES */}
        <div className="table-container">
  <table className="admin-table">
    <thead>
      <tr>
        <th>Client</th>
        <th>Email</th>
        <th>Service</th>
        <th>Offre</th>
        <th>Prix</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {commandes.map(c => (
        <tr key={c._id}>
          <td>{c.name}</td>
          <td>{c.email}</td>
          <td>{c.service}</td>
          <td>{c.offre?.title}</td>
          <td>{c.offre?.price} TND</td>

          <td>
            <span className={`status ${c.status}`}>
              {c.status}
            </span>

            {c.status === "pending" && (
              <div className="actions">
                <button onClick={() => updateStatus(c._id, "accepted")}>✅</button>
                <button onClick={() => updateStatus(c._id, "refused")}>❌</button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}
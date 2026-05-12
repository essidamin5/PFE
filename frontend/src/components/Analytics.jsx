import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from "recharts";
import "./Analytics.css";
import { useNavigate } from "react-router-dom";
export default function Analytics() {
  const [commandes, setCommandes] = useState([]);
  const [users, setUsers] = useState([]);

  /* FETCH */
  useEffect(() => {
    fetch("http://localhost:5000/api/commandes")
      .then(res => res.json())
      .then(data => setCommandes(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  /* 📊 COMMANDES PAR MOIS */
  const groupByMonth = () => {
    const map = {};

    commandes.forEach(c => {
      const month = new Date(c.createdAt).toLocaleString("default", {
        month: "short"
      });

      if (!map[month]) {
        map[month] = { month, commandes: 0, revenue: 0 };
      }

      map[month].commandes += 1;
      map[month].revenue += c.offre?.price || 0;
    });

    return Object.values(map);
  };

  /* 👥 USERS PAR MOIS */
  const groupUsers = () => {
    const map = {};

    users.forEach(u => {
      const month = new Date(u.createdAt).toLocaleString("default", {
        month: "short"
      });

      map[month] = (map[month] || 0) + 1;
    });

    return Object.keys(map).map(m => ({
      month: m,
      users: map[m]
    }));
  };

  /* 📊 STATUS */
  const statusData = [
    { name: "Pending", value: commandes.filter(c => c.status === "pending").length },
    { name: "Accepted", value: commandes.filter(c => c.status === "accepted").length },
    { name: "Refused", value: commandes.filter(c => c.status === "refused").length }
  ];

  /* 🧠 TOP SERVICES */
  const getTopServices = () => {
    const map = {};
    commandes.forEach(c => {
      const service = c.offre?.title || "Other";
      map[service] = (map[service] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
  };

  /* 🔢 KPIs */
  const totalUsers = users.length;
  const totalCommandes = commandes.length;
const navigate = useNavigate();
  const totalRevenue = commandes
    .filter(c => c.status === "accepted")
    .reduce((acc, c) => acc + (c.offre?.price || 0), 0);

  /* 🧠 INSIGHTS */
  const getInsight = () => {
    if (totalCommandes > 20) return "📈 Forte activité ce mois";
    if (totalUsers > 50) return "🔥 Bonne croissance utilisateurs";
    return "📊 Activité normale";
  };

  const commandesData = groupByMonth();
  const usersData = groupUsers();
  const topServices = getTopServices();

  return (
    
    <div className="analytics-container">
<div className="top-bar">
  <button className="back-btn" onClick={() => navigate("/admin")}>
    ⬅️ Retour Admin
  </button>
</div>

<h1>📊 BI Dashboard</h1>
    

      {/* 🔢 KPI */}
      <div className="cards">
        <div className="card">
          <h3>👥 Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div className="card">
          <h3>📦 Commandes</h3>
          <p>{totalCommandes}</p>
        </div>

        <div className="card">
          <h3>💰 Revenue</h3>
          <p>{totalRevenue} DT</p>
        </div>
      </div>

      {/* 🧠 INSIGHT */}
      <div className="insight-box">
        {getInsight()}
      </div>

      {/* 📊 CHARTS */}
      <div className="charts">

        {/* COMMANDES */}
        <div className="chart-box">
          <h2>📦 Commandes & Revenue</h2>
          <BarChart width={500} height={300} data={commandesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commandes" fill="#6366f1" />
            <Bar dataKey="revenue" fill="#22c55e" />
          </BarChart>
        </div>

        {/* USERS */}
        <div className="chart-box">
          <h2>👥 Users Growth</h2>
          <BarChart width={500} height={300} data={usersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#f59e0b" />
          </BarChart>
        </div>

        {/* PIE */}
        <div className="chart-box">
          <h2>📌 Status</h2>
          <PieChart width={300} height={300}>
            <Pie data={statusData} dataKey="value" outerRadius={100} label>
              {statusData.map((entry, index) => (
                <Cell key={index} fill={["#f59e0b","#22c55e","#ef4444"][index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

      </div>

      {/* 🏆 TOP SERVICES */}
      <div className="top-services">
        <h2>🏆 Top Services</h2>

        {topServices.map((s, i) => (
          <div key={i} className="service-item">
            {s.name} — {s.value}
          </div>
        ))}
      </div>

    </div>
  );
}
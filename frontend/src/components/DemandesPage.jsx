import { useEffect, useState } from "react";

export default function DemandesPage() {
  const [demandes, setDemandes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH */
  useEffect(() => {
    fetch("http://localhost:5000/api/demande")
      .then(res => res.json())
      .then(data => {
        // ❌ نحيو demandes متاع chatbot
        const cleanData = data.filter(d => d.source !== "chatbot");
        setDemandes(cleanData);
        setLoading(false);
      });
  }, []);

  /* 🔄 UPDATE STATUS */
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/demande/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    setDemandes(prev =>
      prev.map(d =>
        d._id === id ? { ...d, status } : d
      )
    );
  };

  /* 🎯 FILTER */
  const filtered = demandes.filter(d =>
    filter === "all" ? true : d.status === filter
  );

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>⚡ Admin</h2>

        <button onClick={() => window.location.href="/admin"}>🏠 Dashboard</button>
        <button>👥 Users</button>
        <button>📊 Analytics</button>

        <button className="active">
          📩 Demandes
        </button>
      </div>

      {/* CONTENT */}
      <div className="content">

        <h1>📩 Demandes</h1>

        {/* FILTER BUTTONS */}
        <div className="filters">
          <button onClick={() => setFilter("all")} className={filter==="all"?"active":""}>All</button>
          <button onClick={() => setFilter("pending")} className={filter==="pending"?"active":""}>Pending</button>
          <button onClick={() => setFilter("accepted")} className={filter==="accepted"?"active":""}>Accepted</button>
          <button onClick={() => setFilter("refused")} className={filter==="refused"?"active":""}>Refused</button>
        </div>

        {/* TABLE */}
        <div className="table-container">
          {loading ? (
            <p>Loading...</p>
          ) : filtered.length === 0 ? (
            <p>Aucune demande</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Projet</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(d => (
                  <tr key={d._id}>
                    <td>{d.fullName || d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.projectType || d.service}</td>

                    <td>
                      <span className={`status ${d.status}`}>
                        {d.status}
                      </span>
                    </td>

                    <td>
                      {d.status === "pending" && (
                        <div className="actions">
                          <button onClick={() => updateStatus(d._id, "accepted")}>
                            ✅
                          </button>
                          <button onClick={() => updateStatus(d._id, "refused")}>
                            ❌
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
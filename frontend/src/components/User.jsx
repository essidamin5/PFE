import { useEffect, useState } from "react";
import "./User.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  /* 🔍 FILTER */
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-container">

      <h1>👥 Users Management</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* TABLE */}
      <table className="users-table">
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>📧 Email</th>
            <th>🎂 Birthdate</th>
            <th>📅 Created</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.birthdate || "-"}</td>
              <td>
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
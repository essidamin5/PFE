import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>BE CARTH AI</h2>

      <NavLink to="/account" className="link">
        🏠 Dashboard
      </NavLink>

      <NavLink to="/profile" className="link">
        👤 Profile
      </NavLink>

      <NavLink to="/analytics" className="link">
        📊 Analytics
      </NavLink>

      <NavLink to="/users" className="link">
        👥 Users
      </NavLink>

      <NavLink to="/settings" className="link">
        ⚙️ Settings
      </NavLink>

      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  );
}
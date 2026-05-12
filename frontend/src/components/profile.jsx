import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import"./settings";
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: localStorage.getItem("profileImage")
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

 const handleSave = () => {
  setEdit(false);


  const updatedUser = {
    ...user,
    name: form.name,
    email: form.email
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));

  window.location.reload();
};

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">

  <div className="profile-card">

    {/* AVATAR */}
    <div className="avatar-section">
      <img
        src={form.image || "https://ui-avatars.com/api/?name=" + form.name}
        alt=""
      />

      <label className="upload-btn">
        Change
        <input type="file" onChange={handleImage} hidden />
      </label>
    </div>

    {/* INFO */}
    <div className="info-section">
      <h2>My Profile 👤</h2>

      <div className="input-group">
        <input
          name="name"
          value={form.name}
          disabled={!edit}
          onChange={handleChange}
          required
        />
        <label>Name</label>
      </div>

      <div className="input-group">
        <input
          name="email"
          value={form.email}
          disabled={!edit}
          onChange={handleChange}
          required
        />
        <label>Email</label>
      </div>

      <div className="btns">
        {!edit ? (
          <button className="btn edit" onClick={() => setEdit(true)}>
            ✏️ Edit
          </button>
        ) : (
          <button className="btn save" onClick={handleSave}>
            💾 Save
          </button>
        )}

        <button className="btn home" onClick={() => navigate("/")}>
          🏠 Accueil
        </button>
<button className="btn home" onClick={() => navigate("/settings")}>
          🏠 setting
        </button>
        <button className="btn offers" onClick={() => navigate("/offres")}>
          🚀 Offres
        </button>

        <button className="btn logout" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>

    </div>
  </div>
</div>
  );
}
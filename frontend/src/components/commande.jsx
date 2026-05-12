import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Commande() {
  const { cart } = useAuth();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Commande:", form, cart);

    alert("✅ Commande envoyée !");
  };

  return (
    <div className="commande">
      <h1>Finaliser la commande</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Adresse"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Téléphone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button>Valider</button>
      </form>
    </div>
  );
}
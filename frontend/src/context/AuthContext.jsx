import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  /* 🔥 LOAD USER AFTER REFRESH */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /* 🔐 LOGIN */
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
  };

  /* 🛒 CART */
  const addToCart = (offer) => {
    setCart((prev) => [...prev, offer]);
  };

  /* 📦 ADD DEMANDE (API) */
  const addDemande = async (demande) => {
    try {
      const res = await fetch("http://localhost:5000/api/commandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(demande)
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        login,
        logout,
        addToCart,
        addDemande,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
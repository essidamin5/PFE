import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/Login";
import Account from "./components/Account";
import Profile from "./components/Profile";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Users from "./components/User";
import Accueil from "./components/Accueil";
import Register from "./components/Register";
import Offres from "./components/Offres";
import Demande from "./components/Demande";
import AdminDashboard from "./components/AdminDashboard";
import Panier from "./components/Panier";
import DemandesPage from "./components/DemandesPage";
/* 🔒 Protected Route */
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; 

  return user ? children : <Navigate to="/login" />;
}

/* 👑 Admin Route */
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return user.role === "admin"
    ? children
    : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🏠 HOME */}
          <Route path="/" element={<Accueil />} />

          {/* 🔓 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 📦 OFFRES */}
          <Route path="/offres" element={<Offres />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/demande" element={<Demande />} />

          {/* 🔒 USER */}
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />

          <Route path="/analytics" element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          } />

          {/* 👥 USERS (ADMIN) */}
          <Route path="/users" element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          } />

          {/* 👑 ADMIN DASHBOARD */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
<Route path="/admin/demandes" element={<DemandesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
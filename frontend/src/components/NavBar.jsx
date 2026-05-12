import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';
import Logo from './LOGO.png';
export default function NavBar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      // Déjà sur Accueil → scroll direct
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Autre page → navigate vers Accueil avec state
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
   <nav className="navbar">
  <div className="navbar-container">

    <div className="navbar-logo">
      <Link to="/">
        <img className='logo' src={Logo} alt="Logo" />
        BE CARTHAI Consulting
      </Link>
    </div>

    {/* ✅ MENU */}
    <ul className="nav-menu">

      <li className="nav-item">
        <button
          className="nav-link"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Accueil
        </button>
      </li>

      <li className="nav-item">
        <button className="nav-link" onClick={() => scrollToSection("services")}>
          Services
        </button>
      </li>

      <li className="nav-item">
        <button className="nav-link" onClick={() => scrollToSection("secteurs")}>
          Secteurs
        </button>
      </li>

      <li className="nav-item">
        <button className="nav-link" onClick={() => scrollToSection("about")}>
          Qui sommes-nous
        </button>
      </li>

    
      <li className="nav-item">
        <Link to="/Demande" className="nav-link">Demande</Link>
      </li>

      <li className="nav-item">
        {isAuthenticated ? (
          <Link to="/profile" className="nav-link btn-nav">Account</Link>
        ) : (
          <Link to="/login" className="nav-link btn-nav">Connexion</Link>
        )}
      </li>

    </ul>

  </div>
</nav>
  )
}
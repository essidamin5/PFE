import { useState } from 'react';
import NavBar from './NavBar';
import './Demande.css';

export default function Demande() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
    requirements: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.projectType) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/demande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur serveur');
      }

      /* SUCCESS */
      setSubmitted(true);

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        description: '',
        budget: '',
        timeline: '',
        requirements: '',
        message: ''
      });

      setTimeout(() => setSubmitted(false), 4000);

    } catch (err) {
      console.log(err);
      setError('❌ Erreur connexion serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demande-page">
      <NavBar />

      <div className="demande-container">
        <div className="demande-header">
          <h1>Demande de Service</h1>
          <p>Remplissez ce formulaire et notre équipe vous contactera rapidement.</p>
        </div>

        <div className="form-section">

          {submitted && (
            <div className="success-message">
              ✅ Demande envoyée avec succès
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="demande-form">

            {/* CONTACT */}
            <input
              type="text"
              name="fullName"
              placeholder="Nom complet *"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Téléphone *"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="text"
              name="company"
              placeholder="Entreprise"
              value={formData.company}
              onChange={handleChange}
              disabled={loading}
            />

            {/* PROJECT */}
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Type de projet *</option>
              <option value="website">Site Web</option>
              <option value="mobile">App Mobile</option>
              <option value="ecommerce">E-commerce</option>
              <option value="saas">SaaS</option>
            </select>

            <textarea
              name="description"
              placeholder="Description *"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Budget</option>
              <option value="0-1000">0-1000</option>
              <option value="1000-5000">1000-5000</option>
            </select>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer 🚀"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
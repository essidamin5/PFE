import React, { useState } from 'react';
import './Contact.css';
import Services from './Services';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    alert('Votre message a été envoyé avec succès!');
  };

  return (
    <div className="contact-container">
      <section className="contact-section">
        <h1>Nous Contacter</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Informations de Contact</h2>
            <div className="info-item">
              <strong>Adresse:</strong>
              <p>12 Av. de la République, Hammam-Lif 2050</p>
            </div>
            <div className="info-item">
              <strong>Téléphone:</strong>
              <p>+216 24 949 495</p>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <p>becarthai@gmail.com</p>
            </div>
            <div className="info-item">
              <strong>Horaires:</strong>
              <p>Lundi - Vendredi: 9h00 - 18h00</p>
              <p>Samedi: 10h00 - 16h00</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Formulaire de Contact</h2>
            
            <div className="form-group">
              <label htmlFor="name">Nom Complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+216 12 345 678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Objet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Votre message ici..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Envoyer</button>
          </form>
        </div>
      </section>

{/* Footer Section */}
<footer className="contact-footer">
  <div className="footer-content">
    <div className="footer-column">
      <h3>À Propos</h3>
      <ul>
        <li><a href="#mission" target="_blank" rel="noopener noreferrer">Notre Mission</a></li>
        <li><a href="#team" target="_blank" rel="noopener noreferrer">Notre Équipe</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Services</h3>
      <ul>
        <li><a href="<services>" target="_blank" rel="noopener noreferrer">Tous les Services</a></li>
        <li><a href="#pricing" target="_blank" rel="noopener noreferrer">Tarifs</a></li>
        <li><a href="#support" target="_blank" rel="noopener noreferrer">Support Client</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Ressources</h3>
      <ul>
        <li><a href="#blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
        <li><a href="#docs" target="_blank" rel="noopener noreferrer">Documentation</a></li>
        <li><a href="#faq" target="_blank" rel="noopener noreferrer">FAQ</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Légal</h3>
      <ul>
        <li><a href="#privacy" target="_blank" rel="noopener noreferrer">Politique de Confidentialité</a></li>
        <li><a href="#terms" target="_blank" rel="noopener noreferrer">Conditions d'Utilisation</a></li>
        <li><a href="#cookies" target="_blank" rel="noopener noreferrer">Gestion des Cookies</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Nous Suivre</h3>
      <div className="social-links">
        <a href="https://www.linkedin.com/company/be-carthai/" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2026 Votre Entreprise. Tous droits réservés.</p>
    <p>Conception et développement par <strong>Your Company</strong></p>
  </div>
</footer>
    </div>
  );
};

export default Contact;

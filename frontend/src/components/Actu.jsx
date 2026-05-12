import "./Actu.css";

export default function Actu() {
  return (
    <section className="actu">
      <div className="container">

        <h2 className="title">Suivez l’actualité</h2>

        <div className="actu-grid">

          <div className="actu-card">
            <img src="photo-1498050108023-c5249f4df085.jpeg" />
            <h3>Transformation digitale en 2026</h3>
            <p>Les entreprises investissent dans les technologies innovantes pour améliorer performance et compétitivité.
  </p>
          </div>

          <div className="actu-card">
            <img src="photo-1531746790731-6c087fecd65a.jpeg" />
            <h3>AI & Data révolution</h3>
            <p>Un levier stratégique pour optimiser les processus et la prise de décision.</p>
          </div>

          <div className="actu-card">
            <img src="photo.jpeg" />
            <h3>Cloud computing</h3>
            <p>Infrastructure agile, flexible et scalable pour les entreprises modernes.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
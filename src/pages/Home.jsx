import "./Home.css";
import { FaCalendarAlt, FaHeart, FaGlassCheers } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page-wrapper ">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
       <div className="hero-heading">
  <FaHeart className="hero-icon" />
  <h1>Tu evento, tu historia</h1>
</div>
          <p>
            Viví momentos inolvidables en un salón diseñado para vos.
            <br />
            <FaGlassCheers style={{ color: "#b39ddb", marginTop: "0.5rem" }} />
          </p>
          <Link to="/reserva" className="hero-reserva-btn">
  <FaCalendarAlt />
  Reservá tu fecha
</Link>

        </div>
      </section>

      {/* Testimonios Section */}
      <section className="testimonios">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonios-grid">
          <div className="testimonio fade-up">
            <p>"El salón es hermoso y la atención fue impecable. ¡Volveríamos sin dudarlo!"</p>
            <span>— Mariana G.</span>
          </div>
          <div className="testimonio fade-up">
            <p>"Celebramos el cumpleaños de mi hija y fue mágico. Todo salió perfecto."</p>
            <span>— Pablo R.</span>
          </div>
          <div className="testimonio fade-up">
            <p>"Excelente ambientación, limpieza y organización. ¡Gracias por todo!"</p>
            <span>— Lucía M.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
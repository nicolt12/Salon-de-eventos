import "./Footer.css";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-map-container">
          <div className="footer-map">
            <iframe
              title="Ubicación del salón"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.123456789!2d-58.456789!3d-34.603456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb123456789%3A0xabcdef123456789!2sAv.%20Siempre%20Viva%20123%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://wa.me/54911XXXXXXX" 
          aria-label="WhatsApp" target="_blank"
           rel="noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/tu_salon"
          aria-label="Instagram"
          target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/tu_salon" 
          aria-label="Facebook"target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} Salón Familiar. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
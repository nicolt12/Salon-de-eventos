import "./Contact.css";

function Contact() {
  return (
    <div className="page-wrapper contact-page">
      <div className="contact-container">
        <h2>Contacto</h2>
        <p className="contact-subtext">
          Estamos acá para ayudarte a crear momentos inolvidables.
          ¡Contactanos como prefieras!
        </p>

        <div className="contact-info">
    <ul>
  {[
    { icon: "📍", label: "Dirección:", content: "Av. Siempre Viva 123, Buenos Aires" },
    { icon: "📞", label: "Teléfono:", content: "+54 9 11 5555-5555" },
    {
      icon: "📧", label: "Email:",
      content: <a href="mailto:contacto@salonfamiliar.com">contacto@salonfamiliar.com</a>,
    },
    {
      icon: "📸", label: "Instagram:",
      content: <a href="https://www.instagram.com/tu_salon" target="_blank" rel="noreferrer">@tu_salon</a>,
    },
    {
      icon: "📍", label: "Ubicación en Google Maps:",
      content: <a href="https://goo.gl/maps/ejemplo" target="_blank" rel="noreferrer">Ver mapa</a>,
    },
  ].map((item, i) => (
    <li key={i} style={{ "--i": i }}>
      {item.icon} <strong>{item.label}</strong> {item.content}
    </li>
  ))}
</ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
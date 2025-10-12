import { useState, useEffect } from "react";
import "./Gallery.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const eventos = [
  {
    titulo: "Cumpleaños de Sofía",
    fotos: [
      "/galeria/cumplesofia1.jpg",
      "/galeria/cumplesofia2.jpg",
      "/galeria/cumplesofia3.jpeg",
    ],
  }, 
  /*C:\Users\Nico\salon-app\salon-de-eventos\public\galeria\egresaditos1.jpeg*/ 
  {
    titulo: "Boda en primavera",
    fotos: [
      "/galeria/bodaprimavera1.jpg",
      "/galeria/bodaprimavera2.jpg",
      "/galeria/bodaprimavera3.jpg",
    ],
  },
  {
    titulo: "Fiesta de egresados",
    fotos: [
      "/galeria/egresaditos3.jpeg",
      "/galeria/egresaditos2.jpeg",
      "/galeria/egresaditos1.jpeg",
    ],
  },
];

function Galeria() {
  const [eventoActivo, setEventoActivo] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setEventoActivo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [eventoActivo]);

  return (
    <div className="page-wrapper galeria-page">
      <section className="galeria-wrapper">
        <h2>Galería de Eventos</h2>
        <p className="galeria-subtitulo">
          Mirá algunos de los momentos inolvidables que se vivieron en nuestro salón ✨
        </p>

        <div className="galeria-grid">
          {eventos.map((evento, i) => (
            <div
              key={i}
              className="galeria-item fade-in"
              style={{ "--delay": `${i * 0.2}s` }}
              onClick={() => setEventoActivo(evento)}
            >
              <img src={evento.fotos[0]} alt={evento.titulo} />
              <p className="galeria-titulo">{evento.titulo}</p>
            </div>
          ))}
        </div>

        {eventoActivo && (
          <div
            className="modal"
            onClick={(e) => {
              if (e.target.classList.contains("modal")) {
                setEventoActivo(null);
              }
            }}
          >
            <button
              className="cerrar-modal"
              onClick={() => setEventoActivo(null)}
            >
              ❌
            </button>

            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={30}
              centeredSlides={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
            >
              {eventoActivo.fotos.map((src, i) => (
                <SwiperSlide key={i}>
                  <img src={src} alt={`Foto ${i + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="galeria-titulo">{eventoActivo.titulo}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Galeria;
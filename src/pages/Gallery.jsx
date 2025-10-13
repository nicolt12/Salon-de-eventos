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
      "/galeria/evento1a.jpg",
      "/galeria/evento1b.jpg",
      "/galeria/evento1c.jpg",
    ],
  },
  {
    titulo: "Boda en primavera",
    fotos: [
      "/galeria/evento2a.jpg",
      "/galeria/evento2b.jpg",
      "/galeria/evento2c.jpg",
    ],
  },
  {
    titulo: "Fiesta de egresados",
    fotos: [
      "/galeria/evento3a.jpg",
      "/galeria/evento3b.jpg",
      "/galeria/evento3c.jpg",
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
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom"; // ✅ sin BrowserRouter
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import PanelAdmin from "./pages/PanelAdmin";


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <PanelAdmin />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/reserva" element={<Booking />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
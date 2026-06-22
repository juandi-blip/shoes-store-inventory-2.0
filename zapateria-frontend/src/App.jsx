import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductosPage from './pages/ProductosPage'
import CategoriasPage from './pages/CategoriasPage'
import ProveedoresPage from './pages/ProveedoresPage'
import './App.css'

/**
 * Componente raíz de la aplicación Zapatería.
 * Configura el enrutamiento con React Router, el Navbar,
 * la barra de anuncio superior y el footer.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Barra de anuncio superior */}
        <div className="announcement-bar">
          PANEL DE ADMINISTRACIÓN INTERNO
        </div>

        {/* Barra de navegación */}
        <Navbar />

        {/* Contenido principal con rutas */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/proveedores" element={<ProveedoresPage />} />
          </Routes>
        </main>

        {/* Pie de página */}
        <footer className="footer">
          © 2026 Zapatería. Todos los derechos reservados.
          Sistema desarrollado para SENA GA7-220501096-AA3-EV01.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App

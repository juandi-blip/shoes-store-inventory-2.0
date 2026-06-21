import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductosPage from './pages/ProductosPage'
import CategoriasPage from './pages/CategoriasPage'
import ProveedoresPage from './pages/ProveedoresPage'
import './App.css'

/**
 * Componente principal de la aplicación Zapatería.
 * Configura el enrutamiento con React Router y el Navbar.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductosPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/proveedores" element={<ProveedoresPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

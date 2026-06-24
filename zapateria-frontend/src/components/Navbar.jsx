import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../services/api'

/**
 * Barra de navegación principal del sistema Shoes Store.
 * Muestra el estado de conexión con el backend en tiempo real.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function Navbar() {
  // Estado de conexión con el backend (true = conectado)
  const [conectado, setConectado] = useState(false)

  /**
   * Verifica la conexión con el backend al montar el componente.
   * Intenta obtener las categorías como prueba de conectividad.
   */
  useEffect(() => {
    const verificarConexion = async () => {
      try {
        await api.get('/categorias')
        setConectado(true)
      } catch {
        setConectado(false)
      }
    }

    verificarConexion()
    // Reverificar cada 30 segundos
    const intervalo = setInterval(verificarConexion, 30000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <nav className="navbar">
      {/* Marca / nombre del sistema */}
      <NavLink to="/" className="navbar-brand">
        SHOES<span className="brand-dot">.</span>STORE
      </NavLink>

      {/* Módulos de navegación */}
      <ul className="navbar-nav">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productos"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categorias"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Categorías
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/proveedores"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Proveedores
          </NavLink>
        </li>
      </ul>

      {/* Indicador de estado de conexión con el backend */}
      <div className="connection-badge">
        <span className={`connection-dot ${conectado ? 'online' : ''}`} />
        Conexión: {conectado ? 'Online' : 'Offline'}
      </div>
    </nav>
  )
}

export default Navbar

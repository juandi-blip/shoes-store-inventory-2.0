import { NavLink } from 'react-router-dom'

/**
 * Componente de barra de navegación principal.
 * Permite navegar entre las secciones del sistema de gestión de zapatería.
 * Utiliza NavLink de React Router para resaltar la ruta activa.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function Navbar() {
  return (
    <nav className="navbar">
      {/* Enlace al inicio / marca del sistema */}
      <NavLink to="/" className="navbar-brand">
        Zapatería
      </NavLink>

      {/* Enlaces de navegación a los módulos del sistema */}
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/productos"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Productos
        </NavLink>
        <NavLink
          to="/categorias"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Categorías
        </NavLink>
        <NavLink
          to="/proveedores"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Proveedores
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
